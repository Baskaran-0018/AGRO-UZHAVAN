import React, { useState } from 'react';
import { X, Sprout, Check } from 'lucide-react';
import { CropRecord, GrowthStage, CropCategory, FarmProfile } from '../types/agro';
import { CROPS_CATALOG } from '../data/cropsData';
import { SupportedLang, TRANSLATIONS } from '../lib/i18n';
import { getLocalizedCropName, getLocalizedGrowthStage } from '../lib/universalTranslator';

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

export const CropModal: React.FC<CropModalProps> = ({
  isOpen,
  onClose,
  onSaveCrop,
  activeFarm,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [selectedCropName, setSelectedCropName] = useState(CROPS_CATALOG[0].name);
  const [variety, setVariety] = useState('High-Yield Hybrid');
  const [growthStage, setGrowthStage] = useState<GrowthStage>('Vegetative (Seedling)');
  const [sowingDate, setSowingDate] = useState(new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString().slice(0, 10));
  const [areaPlantedAcres, setAreaPlantedAcres] = useState(String(Math.min(activeFarm.areaAcres, 5)));
  const [targetYield, setTargetYield] = useState('20');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const matchedCropInfo = CROPS_CATALOG.find(c => c.name === selectedCropName) || CROPS_CATALOG[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const durationDays = matchedCropInfo.growthDurationDays || 120;
    const sowingTime = new Date(sowingDate).getTime();
    const harvestDateStr = new Date(sowingTime + durationDays * 24 * 3600 * 1000).toISOString().slice(0, 10);

    const newCrop: CropRecord = {
      id: 'crop-' + Date.now(),
      farmId: activeFarm.id,
      cropName: selectedCropName,
      variety: variety.trim(),
      category: matchedCropInfo.category,
      sowingDate,
      expectedHarvestDate: harvestDateStr,
      growthStage,
      areaPlantedAcres: Number(areaPlantedAcres) || 1,
      targetYieldTonsPerAcre: Number(targetYield) || 2.0,
      status: 'active',
      notes: notes.trim() || undefined
    };

    onSaveCrop(newCrop);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">{t.addCropSeasonRecord || 'Add Crop Season Record'}</h2>
            <p className="text-xs text-slate-400">
              {t.assignCropCycle ? t.assignCropCycle.replace('{farmName}', activeFarm.name) : `Assign crop cycle to ${activeFarm.name}`}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.selectCropSpecies || 'Select Crop Species'}
            </label>
            <select
              value={selectedCropName}
              onChange={(e) => {
                setSelectedCropName(e.target.value);
                const info = CROPS_CATALOG.find(c => c.name === e.target.value);
                if (info) setTargetYield(String(info.baseYieldQuintalsPerAcre));
              }}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:border-emerald-500 outline-none cursor-pointer font-medium"
            >
              {CROPS_CATALOG.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.icon} {getLocalizedCropName(c.name, lang)} ({c.scientificName})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.varietyHybrid || 'Variety / Seed Hybrid'}
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. HD-3226"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.plantedArea || 'Planted Area'} ({t.acres})
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max={activeFarm.areaAcres}
                value={areaPlantedAcres}
                onChange={(e) => setAreaPlantedAcres(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.sowingDate}
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
                {t.growthStage}
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

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.notesAdvisory || 'Agronomic Field Notes (Optional)'}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Basal DAP applied, treated with Rhizobium culture..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              {t.cancel || 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              {t.saveCropCycle || 'Save Crop Season Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
