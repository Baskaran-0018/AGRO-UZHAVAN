import React, { useState, useMemo } from 'react';
import { X, Sprout, Check, Search, Filter, Calendar, MapPin, Sparkles, Shield, TrendingUp } from 'lucide-react';
import { CropRecord, GrowthStage, CropCategory, FarmProfile } from '../types/agro';
import { CROPS_CATALOG, CropInfo } from '../data/cropsData';
import { SupportedLang, TRANSLATIONS } from '../lib/i18n';
import { getLocalizedCropName, getLocalizedGrowthStage, translateText } from '../lib/universalTranslator';

interface CropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCrop: (crop: CropRecord) => void;
  activeFarm: FarmProfile;
  lang: SupportedLang;
}

const STAGES: GrowthStage[] = [
  'Germination & Emergence',
  'Vegetative (Seedling)',
  'Tillering / Branching',
  'Flowering & Heading',
  'Grain / Fruit Formation',
  'Ripening & Maturation',
  'Harvest Ready'
];

const CATEGORIES: { id: 'All' | CropCategory; label: string }[] = [
  { id: 'All', label: 'All Crops' },
  { id: 'Cereals', label: 'Cereals & Millets' },
  { id: 'Pulses', label: 'Pulses & Legumes' },
  { id: 'Cash Crops', label: 'Cash Crops' },
  { id: 'Oilseeds', label: 'Oilseeds' },
  { id: 'Vegetables', label: 'Vegetables' },
  { id: 'Spices', label: 'Spices & Herbs' },
  { id: 'Fruits', label: 'Fruits & Plantation' },
];

export const CropModal: React.FC<CropModalProps> = ({
  isOpen,
  onClose,
  onSaveCrop,
  activeFarm,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [selectedCropName, setSelectedCropName] = useState(CROPS_CATALOG[0].name);
  const [selectedCategory, setSelectedCategory] = useState<'All' | CropCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [variety, setVariety] = useState('High-Yield Hybrid');
  const [growthStage, setGrowthStage] = useState<GrowthStage>('Vegetative (Seedling)');
  const [sowingDate, setSowingDate] = useState(new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString().slice(0, 10));
  const [areaPlantedAcres, setAreaPlantedAcres] = useState(String(Math.min(activeFarm.areaAcres, 5)));
  const [targetYield, setTargetYield] = useState('20');
  const [notes, setNotes] = useState('');

  // Filter crops based on category and search query
  const filteredCrops = useMemo(() => {
    return CROPS_CATALOG.filter((crop) => {
      const matchesCat = selectedCategory === 'All' || crop.category === selectedCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const localizedName = getLocalizedCropName(crop.name, lang).toLowerCase();
      const engName = crop.name.toLowerCase();
      const sciName = crop.scientificName.toLowerCase();
      const catName = crop.category.toLowerCase();

      return localizedName.includes(q) || engName.includes(q) || sciName.includes(q) || catName.includes(q);
    });
  }, [selectedCategory, searchQuery, lang]);

  if (!isOpen) return null;

  const matchedCropInfo = CROPS_CATALOG.find(c => c.name === selectedCropName) || CROPS_CATALOG[0];

  function handleSelectCrop(crop: CropInfo) {
    setSelectedCropName(crop.name);
    setTargetYield(String(crop.baseYieldQuintalsPerAcre));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const durationDays = matchedCropInfo.growthDurationDays || 120;
    const sowingTime = new Date(sowingDate).getTime();
    const harvestDateStr = new Date(sowingTime + durationDays * 24 * 3600 * 1000).toISOString().slice(0, 10);

    const newCrop: CropRecord = {
      id: 'crop-' + Date.now(),
      farmId: activeFarm.id,
      cropName: selectedCropName,
      variety: variety.trim() || 'Standard Variety',
      category: matchedCropInfo.category,
      sowingDate,
      expectedHarvestDate: harvestDateStr,
      growthStage,
      areaPlantedAcres: Number(areaPlantedAcres) || 1,
      targetYieldTonsPerAcre: Number(targetYield) ? Number(targetYield) / 10 : 2.0,
      status: 'active',
      notes: notes.trim() || undefined
    };

    onSaveCrop(newCrop);
    onClose();
  }

  // Group filtered crops by category for the select dropdown
  const groupedCrops = useMemo(() => {
    const groups: Record<string, CropInfo[]> = {};
    for (const crop of filteredCrops) {
      if (!groups[crop.category]) groups[crop.category] = [];
      groups[crop.category].push(crop);
    }
    return groups;
  }, [filteredCrops]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-5 sm:p-6 relative max-h-[92vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">
                {t.addCropSeasonRecord || 'Add Crop Season Record'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                {CROPS_CATALOG.length} {translateText('Crops Available', lang) || 'Crops'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {t.assignCropCycle ? t.assignCropCycle.replace('{farmName}', activeFarm.name) : `Assign crop planting cycle to ${activeFarm.name}`}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1">
          {/* Category Filter Pills */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>{translateText('Crop Category', lang) || 'Crop Category'}</span>
              <span className="text-[11px] text-slate-400 font-normal">
                {filteredCrops.length} {translateText('crops found', lang) || 'matching'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {translateText(cat.label, lang) || cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search + Select Species */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={translateText('Search any crop by English or regional name (e.g. Turmeric, Wheat, Chilli)...', lang) || 'Search any crop species...'}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:border-emerald-500 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-200 px-1.5 py-0.5 rounded bg-slate-800"
                >
                  ✕
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.selectCropSpecies || 'Select Crop Species'}
              </label>
              <select
                value={selectedCropName}
                onChange={(e) => {
                  const crop = CROPS_CATALOG.find(c => c.name === e.target.value);
                  if (crop) handleSelectCrop(crop);
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:border-emerald-500 outline-none cursor-pointer font-medium"
              >
                {Object.entries(groupedCrops).map(([cat, list]) => (
                  <optgroup key={cat} label={`─── ${translateText(cat, lang) || cat} (${list.length}) ───`}>
                    {list.map((c) => (
                      <option key={c.name} value={c.name} className="bg-slate-900 text-slate-100 py-1">
                        {c.icon} {getLocalizedCropName(c.name, lang)} ({c.scientificName})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Highlighted Crop Intelligence Card */}
          {matchedCropInfo && (
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-900/40 space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-1.5 rounded-lg bg-slate-900 border border-slate-800 shadow-inner">
                    {matchedCropInfo.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-100">
                        {getLocalizedCropName(matchedCropInfo.name, lang)}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {translateText(matchedCropInfo.category, lang) || matchedCropInfo.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic">
                      {matchedCropInfo.scientificName}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-emerald-400 font-mono">
                    ~{matchedCropInfo.baseYieldQuintalsPerAcre} Q/{t.acres || 'Acre'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    ₹{matchedCropInfo.averageMarketPricePerQuintalINR.toLocaleString('en-IN')}/Q
                  </div>
                </div>
              </div>

              {/* Quick Agronomic Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                <div className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800/50">
                  <span className="text-[10px] text-slate-400 block">{translateText('Lifecycle Duration', lang) || 'Growth Cycle'}</span>
                  <span className="font-semibold text-slate-200">{matchedCropInfo.growthDurationDays} {translateText('Days', lang) || 'Days'}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800/50">
                  <span className="text-[10px] text-slate-400 block">{translateText('Optimal Temperature', lang) || 'Temp Range'}</span>
                  <span className="font-semibold text-slate-200">{matchedCropInfo.tempRangeC[0]}°C - {matchedCropInfo.tempRangeC[1]}°C</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800/50">
                  <span className="text-[10px] text-slate-400 block">{translateText('Optimal Soil', lang) || 'Soil Fit'}</span>
                  <span className="font-semibold text-slate-200 truncate block" title={matchedCropInfo.optimalSoil.join(', ')}>
                    {matchedCropInfo.optimalSoil[0]}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Variety & Planted Area */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.varietyHybrid || 'Variety / Seed Hybrid'}
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Co-86032 / HD-3226 / Local"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.plantedArea || 'Planted Area'} ({t.acres || 'Acres'})
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max={Math.max(500, activeFarm.areaAcres * 2)}
                value={areaPlantedAcres}
                onChange={(e) => setAreaPlantedAcres(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Sowing Date & Growth Stage */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.sowingDate || 'Sowing / Planting Date'}
              </label>
              <input
                type="date"
                required
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.growthStage || 'Current Growth Stage'}
              </label>
              <select
                value={growthStage}
                onChange={(e) => setGrowthStage(e.target.value as GrowthStage)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none cursor-pointer"
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>{getLocalizedGrowthStage(s, lang)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Target Yield Benchmark */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {translateText('Target Yield (Quintals/Acre)', lang) || 'Target Yield (Q/Acre)'}
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                value={targetYield}
                onChange={(e) => setTargetYield(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {translateText('Estimated Harvest Date', lang) || 'Expected Harvest'}
              </label>
              <div className="px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {new Date(new Date(sowingDate).getTime() + (matchedCropInfo.growthDurationDays || 120) * 24 * 3600 * 1000).toISOString().slice(0, 10)}
              </div>
            </div>
          </div>

          {/* Agronomic Field Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.notesAdvisory || 'Agronomic Field Notes (Optional)'}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Basal DAP & Zinc applied, bio-fertilizer treated, drip spacing 4x1 ft..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none resize-none placeholder:text-slate-600"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              {t.cancel || 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              {t.saveCropCycle || 'Save Crop Season Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
