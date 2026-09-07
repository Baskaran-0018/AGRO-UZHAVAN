import React, { useState, useMemo, useEffect } from 'react';
import { X, Sprout, Check, Search, Calendar, Plus, Sparkles, AlertCircle, ChevronRight, Layers, DollarSign, TrendingUp } from 'lucide-react';
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

const CATEGORIES: { id: 'All' | CropCategory | 'Custom'; label: string; icon: string }[] = [
  { id: 'All', label: 'All Crops', icon: '🌱' },
  { id: 'Cereals', label: 'Cereals & Millets', icon: '🌾' },
  { id: 'Pulses', label: 'Pulses & Legumes', icon: '🫘' },
  { id: 'Cash Crops', label: 'Cash Crops', icon: '🎋' },
  { id: 'Oilseeds', label: 'Oilseeds', icon: '🌻' },
  { id: 'Vegetables', label: 'Vegetables', icon: '🥬' },
  { id: 'Spices', label: 'Spices & Herbs', icon: '🫚' },
  { id: 'Fruits', label: 'Fruits & Orchard', icon: '🍎' },
  { id: 'Flowers', label: 'Flowers & Flora', icon: '🌸' },
  { id: 'Fodder', label: 'Fodder & Cover', icon: '🌿' },
  { id: 'Custom', label: '+ Custom Crop', icon: '✨' },
];

export const CropModal: React.FC<CropModalProps> = ({
  isOpen,
  onClose,
  onSaveCrop,
  activeFarm,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customCropName, setCustomCropName] = useState('');
  const [customCategory, setCustomCategory] = useState<CropCategory>('Vegetables');
  const [customDurationDays, setCustomDurationDays] = useState('120');

  const [selectedCropName, setSelectedCropName] = useState<string>(CROPS_CATALOG[0]?.name || 'Wheat');
  const [selectedCategory, setSelectedCategory] = useState<'All' | CropCategory | 'Custom'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [variety, setVariety] = useState('High-Yield Hybrid');
  const [growthStage, setGrowthStage] = useState<GrowthStage>('Vegetative (Seedling)');
  const [sowingDate, setSowingDate] = useState(new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString().slice(0, 10));
  const [areaPlantedAcres, setAreaPlantedAcres] = useState(String(Math.min(activeFarm?.areaAcres || 5, 5)));
  const [targetYield, setTargetYield] = useState('20');
  const [notes, setNotes] = useState('');

  // Update planted area when activeFarm changes
  useEffect(() => {
    if (activeFarm?.areaAcres) {
      setAreaPlantedAcres(String(Math.min(activeFarm.areaAcres, 5)));
    }
  }, [activeFarm?.id]);

  // Filter crops based on category and search query
  const filteredCrops = useMemo(() => {
    return CROPS_CATALOG.filter((crop) => {
      if (selectedCategory !== 'All' && selectedCategory !== 'Custom' && crop.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const localizedName = getLocalizedCropName(crop.name, lang).toLowerCase();
      const engName = crop.name.toLowerCase();
      const sciName = crop.scientificName?.toLowerCase() || '';
      const catName = crop.category.toLowerCase();

      return localizedName.includes(q) || engName.includes(q) || sciName.includes(q) || catName.includes(q);
    });
  }, [selectedCategory, searchQuery, lang]);

  // Auto-sync selected crop if current selection is not in filtered list
  useEffect(() => {
    if (isCustomMode) return;
    if (filteredCrops.length > 0) {
      const exists = filteredCrops.some(c => c.name === selectedCropName);
      if (!exists) {
        setSelectedCropName(filteredCrops[0].name);
        setTargetYield(String(filteredCrops[0].baseYieldQuintalsPerAcre || 20));
      }
    }
  }, [filteredCrops, isCustomMode, selectedCropName]);

  if (!isOpen) return null;

  const matchedCropInfo = CROPS_CATALOG.find(c => c.name === selectedCropName) || CROPS_CATALOG[0];

  function handleSelectCrop(crop: CropInfo) {
    setIsCustomMode(false);
    setSelectedCropName(crop.name);
    setTargetYield(String(crop.baseYieldQuintalsPerAcre || 20));
  }

  function handleCategoryClick(catId: 'All' | CropCategory | 'Custom') {
    setSelectedCategory(catId);
    if (catId === 'Custom') {
      setIsCustomMode(true);
    } else {
      setIsCustomMode(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cropNameToUse = isCustomMode
      ? (customCropName.trim() || 'Custom Crop')
      : selectedCropName;

    const categoryToUse: CropCategory = isCustomMode
      ? customCategory
      : (matchedCropInfo?.category || 'Vegetables');

    const durationDays = isCustomMode
      ? (Number(customDurationDays) || 120)
      : (matchedCropInfo?.growthDurationDays || 120);

    const sowingTime = new Date(sowingDate).getTime();
    const harvestDateStr = new Date(sowingTime + durationDays * 24 * 3600 * 1000).toISOString().slice(0, 10);

    const newCrop: CropRecord = {
      id: 'crop-' + Date.now(),
      farmId: activeFarm?.id || 'farm-primary',
      cropName: cropNameToUse,
      variety: variety.trim() || 'Standard Variety',
      category: categoryToUse,
      sowingDate,
      expectedHarvestDate: harvestDateStr,
      growthStage,
      areaPlantedAcres: Math.max(0.1, Number(areaPlantedAcres) || 1),
      targetYieldTonsPerAcre: Number(targetYield) ? Number(targetYield) / 10 : 2.0,
      status: 'active',
      notes: notes.trim() || undefined
    };

    onSaveCrop(newCrop);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-white border border-emerald-100 shadow-2xl p-5 sm:p-6 relative max-h-[94vh] flex flex-col my-auto text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 shrink-0 pr-8">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-xs">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-black text-slate-900">
                {t.addCropSeasonRecord || 'Add Crop Season Record'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {CROPS_CATALOG.length}+ {translateText('Crops Available', lang) || 'Crops'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {activeFarm?.name ? `Assign crop planting cycle to ${activeFarm.name}` : 'Assign seasonal crop planting cycle'}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1">
          {/* Category Tabs */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>{translateText('Crop Category', lang) || 'Crop Category'}</span>
              <span className="text-[11px] text-slate-500 font-medium">
                {isCustomMode ? 'Custom Mode' : `${filteredCrops.length} ${translateText('varieties', lang) || 'varieties'}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{translateText(cat.label, lang) || cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Crop Input Mode */}
          {isCustomMode ? (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{translateText('Custom Crop Direct Entry', lang) || 'Custom Crop Direct Entry'}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {translateText('Crop Name', lang) || 'Crop Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customCropName}
                    onChange={(e) => setCustomCropName(e.target.value)}
                    placeholder="e.g. Betel Leaf, Tea, Coffee, Stevia, Mushroom..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 outline-none shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {translateText('Crop Category', lang) || 'Category'}
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value as CropCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:border-emerald-600 outline-none cursor-pointer shadow-xs"
                  >
                    <option value="Cereals">Cereals & Millets</option>
                    <option value="Pulses">Pulses & Legumes</option>
                    <option value="Cash Crops">Cash Crops</option>
                    <option value="Oilseeds">Oilseeds</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Spices">Spices & Herbs</option>
                    <option value="Fruits">Fruits & Orchard</option>
                    <option value="Flowers">Flowers & Floriculture</option>
                    <option value="Fodder">Fodder & Cover Crops</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {translateText('Growth Lifecycle Duration (Days)', lang) || 'Growth Lifecycle Duration (Days)'}
                </label>
                <input
                  type="number"
                  min="30"
                  max="400"
                  value={customDurationDays}
                  onChange={(e) => setCustomDurationDays(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:border-emerald-600 outline-none shadow-xs"
                />
              </div>
            </div>
          ) : (
            /* Standard Catalog Picker */
            <div className="space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={translateText('Search any crop by English or regional name (e.g. Turmeric, Paddy, Tomato)...', lang) || 'Search crops...'}
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 outline-none transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-700 px-1.5 py-0.5 rounded bg-slate-200"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Quick Visual Grid (Top 6 matches) */}
              {filteredCrops.length > 0 && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    {translateText('Quick Select Crop', lang) || 'Select Crop Species'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 bg-slate-50/70 rounded-xl border border-slate-200">
                    {filteredCrops.map((crop) => {
                      const isSelected = selectedCropName === crop.name;
                      return (
                        <button
                          key={crop.name}
                          type="button"
                          onClick={() => handleSelectCrop(crop)}
                          className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-1 ring-emerald-500 text-emerald-950'
                              : 'bg-white border-slate-200/80 hover:border-emerald-300 hover:bg-slate-50/80 text-slate-800'
                          }`}
                        >
                          <span className="text-xl shrink-0 p-1 rounded-lg bg-slate-100/80">{crop.icon || '🌱'}</span>
                          <div className="min-w-0 flex-1">
                            <span className="text-xs font-bold truncate block">
                              {getLocalizedCropName(crop.name, lang)}
                            </span>
                            <span className="text-[10px] text-slate-500 block truncate">
                              {crop.growthDurationDays} {translateText('Days', lang) || 'Days'} · {crop.baseYieldQuintalsPerAcre} Q/Ac
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {filteredCrops.length === 0 && (
                <div className="p-4 text-center rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="text-xs text-slate-600 font-medium">
                    No matching catalog crop found for "{searchQuery}".
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomMode(true);
                      setCustomCropName(searchQuery);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add "{searchQuery}" as Custom Crop
                  </button>
                </div>
              )}

              {/* Selected Crop Overview Banner */}
              {matchedCropInfo && !isCustomMode && (
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-1.5 rounded-xl bg-white border border-emerald-200 shadow-xs">
                      {matchedCropInfo.icon || '🌱'}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900">
                          {getLocalizedCropName(matchedCropInfo.name, lang)}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {matchedCropInfo.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 italic mt-0.5">
                        {matchedCropInfo.scientificName} · {matchedCropInfo.growthDurationDays} {translateText('Days Lifecycle', lang) || 'Days Lifecycle'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-emerald-800 font-mono">
                      ~{matchedCropInfo.baseYieldQuintalsPerAcre} Q/{t.acres || 'Acre'}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      ₹{matchedCropInfo.averageMarketPricePerQuintalINR?.toLocaleString('en-IN')}/Q
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Variety & Planted Area */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.varietyHybrid || 'Variety / Seed Hybrid'}
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Co-86032 / Hybrid-1 / Local"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none shadow-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.plantedArea || 'Planted Area'} ({t.acres || 'Acres'}) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                max={Math.max(500, (activeFarm?.areaAcres || 5) * 2)}
                value={areaPlantedAcres}
                onChange={(e) => setAreaPlantedAcres(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none shadow-xs"
              />
            </div>
          </div>

          {/* Sowing Date & Growth Stage */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.sowingDate || 'Sowing / Planting Date'} *
              </label>
              <input
                type="date"
                required
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none shadow-xs cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.growthStage || 'Current Growth Stage'}
              </label>
              <select
                value={growthStage}
                onChange={(e) => setGrowthStage(e.target.value as GrowthStage)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none cursor-pointer shadow-xs"
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>{getLocalizedGrowthStage(s, lang)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Target Yield Benchmark & Harvest Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {translateText('Target Yield (Quintals/Acre)', lang) || 'Target Yield (Q/Acre)'}
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={targetYield}
                onChange={(e) => setTargetYield(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-none shadow-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {translateText('Estimated Harvest Date', lang) || 'Expected Harvest'}
              </label>
              <div className="px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-800 font-mono font-bold flex items-center gap-1.5 shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                {new Date(
                  new Date(sowingDate).getTime() +
                  (isCustomMode ? Number(customDurationDays) || 120 : matchedCropInfo?.growthDurationDays || 120) * 24 * 3600 * 1000
                ).toISOString().slice(0, 10)}
              </div>
            </div>
          </div>

          {/* Agronomic Field Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.notesAdvisory || 'Agronomic Field Notes (Optional)'}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Basal DAP & Zinc applied, drip spacing 4x1 ft, bio-fertilizer treated..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 outline-none resize-none placeholder:text-slate-400 shadow-xs"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {t.cancel || 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
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

