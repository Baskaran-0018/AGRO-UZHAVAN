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
import { generateSyntheticCropPlan } from '../../lib/cropPlanGenerator';

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

  // Keep selected crop in sync whenever farm or crops list updates
  useEffect(() => {
    if (farmCrops.length > 0) {
      if (!selectedCropId || !farmCrops.some(c => c.id === selectedCropId)) {
        setSelectedCropId(farmCrops[0].id);
      }
    } else {
      setSelectedCropId('');
    }
  }, [farmCrops, selectedCropId]);

  const activeCrop = farmCrops.find(c => c.id === selectedCropId) || farmCrops[0];

  useEffect(() => {
    if (activeCrop) {
      fetchPlan();
    } else {
      setPlan(null);
    }
  }, [activeCrop?.id, activeCrop?.growthStage, activeFarm?.id, lang]);

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
      } else {
        // Fallback to rich client-side agronomic engine
        const fallback = generateSyntheticCropPlan(activeCrop, activeFarm, lang);
        setPlan(fallback);
      }
    } catch (err) {
      console.warn('Using client-side synthetic crop plan engine:', err);
      const fallback = generateSyntheticCropPlan(activeCrop, activeFarm, lang);
      setPlan(fallback);
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
              {t.cropLifecycleEngine || translateText('Crop Lifecycle Engine', lang)}
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">{t.cropManagement || translateText('Crop Planner', lang)}</h1>
            <p className="text-xs text-slate-500 font-medium">{t.manageStageWise || translateText('Manage stage-wise irrigation, fertilization, and pest protection protocols', lang)}</p>
          </div>
          <button
            onClick={onOpenAddCrop}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {t.addCrop || translateText('Add Crop Cycle', lang)}
          </button>
        </div>

        <div className="p-12 text-center rounded-2xl bg-white border border-emerald-100 space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
            <Sprout className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{t.noActiveCrops || translateText('No Active Crops in Farm', lang)}</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {t.addCropPrompt || translateText('Add your current seasonal crop planting to generate AI-backed daily irrigation and fertigation schedules.', lang)}
            </p>
          </div>
          <button
            onClick={onOpenAddCrop}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
          >
            + {t.addCrop || translateText('Register New Crop', lang)}
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
            {t.cropLifecycleEngine || translateText('Crop Lifecycle Engine', lang)}
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">{t.cropManagement || translateText('Crop Planner', lang)}</h1>
          <p className="text-xs text-slate-500 font-medium">{t.manageStageWise || translateText('Manage stage-wise irrigation, fertilization, and pest protection protocols', lang)}</p>
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
            {t.newCrop || translateText('New Crop', lang)}
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
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">{t.crop || translateText('Cultivated Crop', lang)}</span>
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
                  <span className="text-slate-500 font-medium">{t.growthPhaseProgress || translateText('Growth Phase Progress', lang)}</span>
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
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.plantedArea || translateText('Planted Area', lang)}</span>
                  <span className="font-bold text-slate-900">{activeCrop.areaPlantedAcres} {t.acres || translateText('Acres', lang)}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.growthStage || translateText('Growth Stage', lang)}</span>
                  <span className="font-bold text-emerald-700 truncate block">{getLocalizedGrowthStage(activeCrop.growthStage, lang)}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.sowingDate || translateText('Sowing Date', lang)}</span>
                  <span className="font-bold text-slate-900">{activeCrop.sowingDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.daysSinceSowing || translateText('Days Active', lang)}</span>
                  <span className="font-bold text-amber-700 font-mono">{plan?.daysSinceSowing || 28} {t.daysActive || translateText('Days', lang)}</span>
                </div>
              </div>
            </div>

            {/* Quick Irrigation & Nutrient Snippet */}
            {plan?.irrigation && (
              <div className="p-5 rounded-2xl bg-white border border-emerald-100 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
                  <Droplets className="w-4 h-4 text-sky-600" /> {t.nextIrrigationWindow || translateText('Next Irrigation Window', lang)}
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">{t.schedule || translateText('Scheduled', lang)}:</span>
                    <span className="font-bold text-slate-900">{translateText(plan.irrigation.nextWatering, lang)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">{t.volume || translateText('Volume', lang)}:</span>
                    <span className="font-mono text-sky-700 font-bold">{plan.irrigation.volumeLitersPerAcre.toLocaleString()} L/{t.acres || translateText('Acre', lang)}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed italic">{translateText(plan.irrigation.smartNotes, lang)}</p>
              </div>
            )}
          </div>

          {/* AI Growth Protocol & Interactive Action Plan (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {isLoading ? (
              <div className="p-12 rounded-2xl bg-white border border-emerald-100 flex flex-col items-center justify-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-full border-4 border-emerald-500/20 border-t-emerald-600 animate-spin"></div>
                <p className="text-xs text-slate-500 font-medium">{translateText('Synthesizing agronomic protocol for', lang)} {getLocalizedCropName(activeCrop.cropName, lang)}...</p>
              </div>
            ) : plan ? (
              <div className="p-6 rounded-2xl bg-white border border-emerald-100 space-y-5 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-900">{translateText('AI Agronomic Action Plan', lang)}</h3>
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
                        {t.dailyTasks || translateText('Daily Tasks', lang)}
                      </button>
                      <button
                        onClick={() => setActiveTab('weekly')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          activeTab === 'weekly' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.milestones || translateText('Milestones', lang)}
                      </button>
                      <button
                        onClick={() => setActiveTab('irrigation')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          activeTab === 'irrigation' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.irrigationFertilizer || translateText('Irrigation & Fertilizer', lang)}
                      </button>
                      <button
                        onClick={() => setActiveTab('protection')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          activeTab === 'protection' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.cropProtectionTab || translateText('Protection', lang)}
                      </button>
                    </div>

                    <button
                      onClick={fetchPlan}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 border border-slate-200 cursor-pointer transition-colors"
                      title={translateText('Refresh Plan', lang)}
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
                          <Sunrise className="w-4 h-4 text-amber-600" /> {translateText('Morning Session (06:00 - 11:00 AM)', lang)}
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
                                      {translateText(act.task, lang)}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{act.time}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{translateText(act.rationale, lang)}</p>
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
                          <Sun className="w-4 h-4 text-sky-600" /> {translateText('Afternoon Session (12:00 - 04:00 PM)', lang)}
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
                                      {translateText(act.task, lang)}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{act.time}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{translateText(act.rationale, lang)}</p>
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
                          <Moon className="w-4 h-4 text-indigo-600" /> {translateText('Evening & Post-Sunset (05:00 - 07:30 PM)', lang)}
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
                                      {translateText(act.task, lang)}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{act.time}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{translateText(act.rationale, lang)}</p>
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
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">{translateText('Weekly Agronomic Rhythm', lang)}</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {weeklyTasks.map((w, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-emerald-700">{translateText(w.day, lang)}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-semibold">
                                {translateText(w.category, lang)}
                              </span>
                            </div>
                            <p className="text-xs text-slate-800 font-medium">{translateText(w.task, lang)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Monthly Milestones */}
                    {monthlyMilestones.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">{translateText('Phased Monthly Milestones', lang)}</h4>
                        <div className="space-y-2">
                          {monthlyMilestones.map((m, idx) => (
                            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">
                                W{m.weekNum}
                              </div>
                              <div className="flex-1 min-w-0 text-xs">
                                <span className="font-bold text-slate-900 block">{translateText(m.milestone, lang)}</span>
                                <span className="text-slate-600 text-[11px] block mt-0.5"><b>{translateText('Focus:', lang)}</b> {translateText(m.focus, lang)}</span>
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
                          <Beaker className="w-4 h-4 text-emerald-600" /> {translateText('Recommended Nutrient & Fertilizer Formula', lang)}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">{translateText('Recommended Product', lang)}</span>
                            <span className="text-sm font-bold text-slate-900">{translateText(plan.fertilizer.recommendedProduct, lang)}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">{translateText('Dosage per Acre', lang)}</span>
                            <span className="text-sm font-bold text-amber-700 font-mono">{translateText(plan.fertilizer.dosagePerAcre, lang)}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">{translateText('Target NPK Ratio', lang)}</span>
                            <span className="text-sm font-bold text-emerald-700 font-mono">{plan.fertilizer.npkRatio}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">{translateText('Application Method & Timing', lang)}</span>
                            <span className="text-xs text-slate-800 font-medium">{translateText(plan.fertilizer.applicationMethod, lang)} ({translateText(plan.fertilizer.timing, lang)})</span>
                          </div>
                        </div>

                        {plan.fertilizer.microNutrients && plan.fertilizer.microNutrients.length > 0 && (
                          <div className="pt-2 border-t border-slate-200">
                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5">{translateText('Essential Micronutrients', lang)}</span>
                            <div className="flex flex-wrap gap-2">
                              {plan.fertilizer.microNutrients.map((n, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                                  {translateText(n, lang)}
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
                          <Droplets className="w-4 h-4 text-sky-600" /> {translateText('Hydraulic & Evapotranspiration Parameters', lang)}
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">{translateText('Watering Frequency', lang)}</span>
                            <span className="text-xs font-bold text-slate-900">{translateText(plan.irrigation.frequency, lang)}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">{translateText('Volume per Acre', lang)}</span>
                            <span className="text-xs font-bold text-sky-700 font-mono">{plan.irrigation.volumeLitersPerAcre.toLocaleString()} {translateText('Liters', lang)}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">{translateText('Distribution Method', lang)}</span>
                            <span className="text-xs font-bold text-slate-900">{translateText(plan.irrigation.method, lang)}</span>
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
                          <ShieldAlert className="w-4 h-4 text-rose-600" /> {translateText('Weed & Pathogen Defense', lang)}
                        </div>
                        <div className="space-y-2">
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">{translateText('Weeding Protocol', lang)}</span>
                            <span className="text-slate-800 font-medium">{translateText(plan.cropProtection.weedingAction, lang)}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">{translateText('Preventative Foliar Spray', lang)}</span>
                            <span className="text-slate-800 font-medium">{translateText(plan.cropProtection.preventativeSpray, lang)}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">{translateText('Pesticide / Bio-Agent Reminder', lang)}</span>
                            <span className="text-slate-800 font-medium">{translateText(plan.cropProtection.pesticideReminder, lang)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {harvestPrep.length > 0 && (
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">{translateText('Harvest Readiness Checklist', lang)}</h4>
                        <div className="space-y-1.5">
                          {harvestPrep.map((prep, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-800 font-medium">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{translateText(prep, lang)}</span>
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
                {translateText('Tap "Refresh Plan" to generate AI task schedules for this crop.', lang)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
