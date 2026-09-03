import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Sprout,
  Droplets,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Sun,
  Moon,
  Sunrise,
  Plus,
  Flame,
  Layers,
  Calendar,
  AlertTriangle,
  Beaker,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { FarmProfile, CropRecord, CropManagementPlan } from '../../types/agro';
import { SupportedLang, TRANSLATIONS, getLanguageName } from '../../lib/i18n';
import { getLocalizedCropName, getLocalizedGrowthStage, translateText } from '../../lib/universalTranslator';
import { CROPS_CATALOG } from '../../data/cropsData';

interface CropPlannerViewProps {
  activeFarm: FarmProfile;
  crops: CropRecord[];
  onOpenAddCrop: () => void;
  lang: SupportedLang;
}

export const CropPlannerView: React.FC<CropPlannerViewProps> = ({ activeFarm, crops, onOpenAddCrop, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const farmCrops = crops.filter(c => c.farmId === activeFarm.id);
  const [selectedCropId, setSelectedCropId] = useState(farmCrops[0]?.id || '');
  const [plan, setPlan] = useState<CropManagementPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'irrigation' | 'protection'>('daily');

  const activeCrop = farmCrops.find(c => c.id === selectedCropId) || farmCrops[0];

  useEffect(() => {
    if (farmCrops[0] && !selectedCropId) {
      setSelectedCropId(farmCrops[0].id);
    }
  }, [farmCrops]);

  useEffect(() => {
    if (activeCrop) {
      fetchPlan();
    } else {
      setPlan(null);
    }
  }, [activeCrop?.id, lang]);

  async function fetchPlan() {
    if (!activeCrop) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/gemini/crop-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: activeCrop.cropName,
          variety: activeCrop.variety,
          soilType: activeFarm.soilType,
          location: activeFarm.locationName,
          sowingDate: activeCrop.sowingDate,
          growthStage: activeCrop.growthStage,
          areaAcres: activeCrop.areaPlantedAcres,
          lang: getLanguageName(lang),
        })
      });
      if (res.ok) {
        const data = await res.json();
        setPlan(data);
      }
    } catch (err) {
      console.error('Error fetching crop plan:', err);
    } finally {
      setIsLoading(false);
    }
  }

  function toggleTask(id: string) {
    setCompletedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  }

  if (farmCrops.length === 0) {
    return (
      <div className="space-y-6 animate-fadeIn pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs">
          <div>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
              {t.cropLifecycleEngine || 'Crop Lifecycle Engine'}
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">{t.cropManagement}</h1>
            <p className="text-xs text-slate-500 font-medium">{t.manageStageWise || 'Manage stage-wise irrigation, fertilization, and pest protection protocols'}</p>
          </div>
          <button
            onClick={onOpenAddCrop}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {t.addCrop || 'Add Crop Cycle'}
          </button>
        </div>

        <div className="p-12 text-center rounded-2xl bg-white border border-emerald-100 space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
            <Sprout className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{t.noActiveCrops || 'No Active Crops in Farm'}</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {t.addCropPrompt || 'Add your current seasonal crop planting to generate AI-backed daily irrigation and fertigation schedules.'}
            </p>
          </div>
          <button
            onClick={onOpenAddCrop}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
          >
            + {t.addCrop || 'Register New Crop'}
          </button>
        </div>
      </div>
    );
  }

  const morningTasks = plan?.dailyActivities?.morning || [];
  const afternoonTasks = plan?.dailyActivities?.afternoon || [];
  const eveningTasks = plan?.dailyActivities?.evening || [];
  const weeklyTasks = plan?.weeklySchedule || [];
  const monthlyMilestones = plan?.monthlyMilestones || [];
  const harvestPrep = plan?.harvestPreparation || [];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
            {t.cropLifecycleEngine || 'Crop Lifecycle Engine'}
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">{t.cropManagement}</h1>
          <p className="text-xs text-slate-500 font-medium">{t.manageStageWise || 'Manage stage-wise irrigation, fertilization, and pest protection protocols'}</p>
        </div>

        <div className="flex items-center gap-2">
          {farmCrops.length > 1 && (
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 outline-none cursor-pointer"
            >
              {farmCrops.map(c => (
                <option key={c.id} value={c.id}>
                  {getLocalizedCropName(c.cropName, lang)} ({translateText(c.variety, lang) || 'Standard'})
                </option>
              ))}
            </select>
          )}
          <button
            onClick={onOpenAddCrop}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {t.newCrop || 'New Crop'}
          </button>
        </div>
      </div>

      {activeCrop && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Crop Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-emerald-100 space-y-4 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">{t.crop || 'Cultivated Crop'}</span>
                  <h2 className="text-xl font-black text-slate-900 mt-0.5">{getLocalizedCropName(activeCrop.cropName, lang)}</h2>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">{translateText(activeCrop.variety, lang) || 'Standard Variety'}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {translateText(activeCrop.status, lang).toUpperCase()}
                </span>
              </div>

              {/* Stage Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{t.growthPhaseProgress || 'Growth Phase Progress'}</span>
                  <span className="font-bold font-mono text-emerald-700">{plan?.stageProgressPct || 45}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${plan?.stageProgressPct || 45}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.plantedArea || 'Planted Area'}</span>
                  <span className="font-bold text-slate-900">{activeCrop.areaPlantedAcres} {t.acres || 'Acres'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.growthStage || 'Growth Stage'}</span>
                  <span className="font-bold text-emerald-700 truncate block">{getLocalizedGrowthStage(activeCrop.growthStage, lang)}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.sowingDate || 'Sowing Date'}</span>
                  <span className="font-bold text-slate-900">{activeCrop.sowingDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.daysSinceSowing || 'Days Active'}</span>
                  <span className="font-bold text-amber-700 font-mono">{plan?.daysSinceSowing || 28} {t.daysActive || 'Days'}</span>
                </div>
              </div>
            </div>

            {/* Quick Irrigation & Nutrient Snippet */}
            {plan?.irrigation && (
              <div className="p-5 rounded-2xl bg-white border border-emerald-100 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
                  <Droplets className="w-4 h-4 text-sky-600" /> {t.nextIrrigationWindow || 'Next Irrigation Window'}
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">{t.schedule || 'Scheduled'}:</span>
                    <span className="font-bold text-slate-900">{plan.irrigation.nextWatering}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">{t.volume || 'Volume'}:</span>
                    <span className="font-mono text-sky-700 font-bold">{plan.irrigation.volumeLitersPerAcre.toLocaleString()} L/{t.acres || 'Acre'}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed italic">{plan.irrigation.smartNotes}</p>
              </div>
            )}
          </div>

          {/* AI Growth Protocol & Interactive Action Plan (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {isLoading ? (
              <div className="p-12 rounded-2xl bg-white border border-emerald-100 flex flex-col items-center justify-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-full border-4 border-emerald-500/20 border-t-emerald-600 animate-spin"></div>
                <p className="text-xs text-slate-500 font-medium">Synthesizing agronomic protocol for {activeCrop.cropName}...</p>
              </div>
            ) : plan ? (
              <div className="p-6 rounded-2xl bg-white border border-emerald-100 space-y-5 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-900">AI Agronomic Action Plan</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Navigation Tabs */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                      <button
                        onClick={() => setActiveTab('daily')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          activeTab === 'daily' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.dailyTasks || 'Daily Tasks'}
                      </button>
                      <button
                        onClick={() => setActiveTab('weekly')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          activeTab === 'weekly' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.milestones || 'Milestones'}
                      </button>
                      <button
                        onClick={() => setActiveTab('irrigation')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          activeTab === 'irrigation' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.irrigationFertilizer || 'Irrigation & Fertilizer'}
                      </button>
                      <button
                        onClick={() => setActiveTab('protection')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          activeTab === 'protection' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.cropProtectionTab || 'Protection'}
                      </button>
                    </div>

                    <button
                      onClick={fetchPlan}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 border border-slate-200 cursor-pointer transition-colors"
                      title="Refresh Plan"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Tab Content: Daily Operational Schedule */}
                {activeTab === 'daily' && (
                  <div className="space-y-4">
                    {/* Morning Tasks */}
                    {morningTasks.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
                          <Sunrise className="w-4 h-4 text-amber-600" /> Morning Session (06:00 - 11:00 AM)
                        </div>
                        <div className="space-y-2">
                          {morningTasks.map((act, i) => {
                            const taskId = `morn-${i}`;
                            const done = completedTasks[taskId];
                            return (
                              <div
                                key={i}
                                onClick={() => toggleTask(taskId)}
                                className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                                  done ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-slate-50/50 border-slate-200 hover:border-emerald-400'
                                }`}
                              >
                                <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                                  done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white text-transparent'
                                }`}>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className={`text-xs font-bold ${done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                      {act.task}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{act.time}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{act.rationale}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Afternoon Tasks */}
                    {afternoonTasks.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider">
                          <Sun className="w-4 h-4 text-sky-600" /> Afternoon Session (12:00 - 04:00 PM)
                        </div>
                        <div className="space-y-2">
                          {afternoonTasks.map((act, i) => {
                            const taskId = `aft-${i}`;
                            const done = completedTasks[taskId];
                            return (
                              <div
                                key={i}
                                onClick={() => toggleTask(taskId)}
                                className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                                  done ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-slate-50/50 border-slate-200 hover:border-emerald-400'
                                }`}
                              >
                                <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                                  done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white text-transparent'
                                }`}>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className={`text-xs font-bold ${done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                      {act.task}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{act.time}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{act.rationale}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Evening Tasks */}
                    {eveningTasks.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                          <Moon className="w-4 h-4 text-indigo-600" /> Evening & Post-Sunset (05:00 - 07:30 PM)
                        </div>
                        <div className="space-y-2">
                          {eveningTasks.map((act, i) => {
                            const taskId = `eve-${i}`;
                            const done = completedTasks[taskId];
                            return (
                              <div
                                key={i}
                                onClick={() => toggleTask(taskId)}
                                className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                                  done ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-slate-50/50 border-slate-200 hover:border-emerald-400'
                                }`}
                              >
                                <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                                  done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white text-transparent'
                                }`}>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className={`text-xs font-bold ${done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                      {act.task}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{act.time}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{act.rationale}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Content: Weekly Schedule & Monthly Milestones */}
                {activeTab === 'weekly' && (
                  <div className="space-y-5">
                    {/* Weekly recurring plan */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Weekly Agronomic Rhythm</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {weeklyTasks.map((w, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-emerald-700">{w.day}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-semibold">
                                {w.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-800 font-medium">{w.task}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Monthly Milestones */}
                    {monthlyMilestones.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Phased Monthly Milestones</h4>
                        <div className="space-y-2">
                          {monthlyMilestones.map((m, idx) => (
                            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">
                                W{m.weekNum}
                              </div>
                              <div className="flex-1 min-w-0 text-xs">
                                <span className="font-bold text-slate-900 block">{m.milestone}</span>
                                <span className="text-slate-600 text-[11px] block mt-0.5"><b>Focus:</b> {m.focus}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Content: Irrigation & Fertilizer */}
                {activeTab === 'irrigation' && (
                  <div className="space-y-5">
                    {/* Fertilizer Card */}
                    {plan.fertilizer && (
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                          <Beaker className="w-4 h-4 text-emerald-600" /> Recommended Nutrient & Fertilizer Formula
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Recommended Product</span>
                            <span className="text-sm font-bold text-slate-900">{plan.fertilizer.recommendedProduct}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Dosage per Acre</span>
                            <span className="text-sm font-bold text-amber-700 font-mono">{plan.fertilizer.dosagePerAcre}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Target NPK Ratio</span>
                            <span className="text-sm font-bold text-emerald-700 font-mono">{plan.fertilizer.npkRatio}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Application Method & Timing</span>
                            <span className="text-xs text-slate-800 font-medium">{plan.fertilizer.applicationMethod} ({plan.fertilizer.timing})</span>
                          </div>
                        </div>

                        {plan.fertilizer.microNutrients && plan.fertilizer.microNutrients.length > 0 && (
                          <div className="pt-2 border-t border-slate-200">
                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5">Essential Micronutrients</span>
                            <div className="flex flex-wrap gap-2">
                              {plan.fertilizer.microNutrients.map((n, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                                  {n}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Irrigation Details */}
                    {plan.irrigation && (
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
                          <Droplets className="w-4 h-4 text-sky-600" /> Hydraulic & Evapotranspiration Parameters
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Watering Frequency</span>
                            <span className="text-xs font-bold text-slate-900">{plan.irrigation.frequency}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Volume per Acre</span>
                            <span className="text-xs font-bold text-sky-700 font-mono">{plan.irrigation.volumeLitersPerAcre.toLocaleString()} Liters</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Distribution Method</span>
                            <span className="text-xs font-bold text-slate-900">{plan.irrigation.method}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Content: Crop Protection & Harvest Prep */}
                {activeTab === 'protection' && (
                  <div className="space-y-4">
                    {plan.cropProtection && (
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                        <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                          <ShieldAlert className="w-4 h-4 text-rose-600" /> Weed & Pathogen Defense
                        </div>
                        <div className="space-y-2">
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Weeding Protocol</span>
                            <span className="text-slate-800 font-medium">{plan.cropProtection.weedingAction}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Preventative Foliar Spray</span>
                            <span className="text-slate-800 font-medium">{plan.cropProtection.preventativeSpray}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Pesticide / Bio-Agent Reminder</span>
                            <span className="text-slate-800 font-medium">{plan.cropProtection.pesticideReminder}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {harvestPrep.length > 0 && (
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Harvest Readiness Checklist</h4>
                        <div className="space-y-1.5">
                          {harvestPrep.map((prep, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-800 font-medium">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{prep}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-emerald-100 text-center text-xs text-slate-500 font-medium shadow-xs">
                Tap "Refresh Plan" to generate AI task schedules for this crop.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
