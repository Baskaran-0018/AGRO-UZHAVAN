import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Sliders,
  DollarSign,
  Sprout,
  Calendar,
  Layers,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { FarmProfile, CropRecord, YieldPredictionResult } from '../../types/agro';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';
import { getLocalizedCropName, getLocalizedSoilType, translateText } from '../../lib/universalTranslator';
import { CROPS_CATALOG } from '../../data/cropsData';
import { calculateYieldSimulation } from '../../lib/yieldEngine';

interface YieldPredictorViewProps {
  activeFarm: FarmProfile;
  crops: CropRecord[];
  yields: YieldPredictionResult[];
  onAddYield: (result: YieldPredictionResult) => void;
  lang: SupportedLang;
}

export const YieldPredictorView: React.FC<YieldPredictorViewProps> = ({
  activeFarm,
  crops,
  yields,
  onAddYield,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const farmCrops = crops.filter(c => c.farmId === activeFarm.id);

  const initialCropName = farmCrops[0]?.cropName || CROPS_CATALOG[0].name;
  const initialAcreage = farmCrops[0]?.areaPlantedAcres || activeFarm.areaAcres || 2;

  const [selectedCrop, setSelectedCrop] = useState(initialCropName);
  const [acreage, setAcreage] = useState(initialAcreage);
  const [fertilizerAdjPct, setFertilizerAdjPct] = useState(5);
  const [irrigationCount, setIrrigationCount] = useState(6);
  const [modelType, setModelType] = useState<'XGBoost' | 'RandomForest' | 'DNN'>('XGBoost');
  const [isPredicting, setIsPredicting] = useState(false);

  // Initialize or compute current result
  const [currentResult, setCurrentResult] = useState<YieldPredictionResult>(() => {
    return yields[0] || calculateYieldSimulation({
      cropName: initialCropName,
      soilType: activeFarm.soilType,
      areaAcres: initialAcreage,
      locationName: activeFarm.locationName,
      fertilizerModPct: 5,
      irrigationCount: 6,
      modelType: 'XGBoost',
    });
  });

  // Re-run simulation when parameters change
  useEffect(() => {
    runSimulation(false);
  }, [selectedCrop, acreage, fertilizerAdjPct, irrigationCount, modelType, activeFarm.soilType, activeFarm.locationName]);

  function runSimulation(isManualClick = true) {
    if (isManualClick) setIsPredicting(true);
    try {
      const res = calculateYieldSimulation({
        cropName: selectedCrop,
        soilType: activeFarm.soilType,
        areaAcres: acreage,
        locationName: activeFarm.locationName,
        fertilizerModPct: fertilizerAdjPct,
        irrigationCount,
        modelType,
      });
      setCurrentResult(res);
      onAddYield(res);
    } catch (err) {
      console.error('Yield prediction error:', err);
    } finally {
      if (isManualClick) {
        setTimeout(() => setIsPredicting(false), 200);
      }
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full max-w-full min-w-0">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider">
            {t.predictiveYieldEngine || 'AI Yield & Profit Simulation Engine'}
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            {t.yieldPrediction || 'Yield & Profit'}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {t.basedOnYield || 'Simulate production yield, gross revenues, and input cost optimization based on active acreage'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            {currentResult.accuracyScore}% {t.accuracy || 'Accuracy'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Configuration (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-emerald-100 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-600" />
              {t.simulateDifferentScenario || 'Simulate Parameter Changes'}
            </h2>
            <span className="text-[11px] text-slate-500 font-medium">
              {getLocalizedSoilType(activeFarm.soilType, lang)}
            </span>
          </div>

          {/* Crop Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              {t.crop || 'Crop'}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:border-emerald-500 focus:outline-none cursor-pointer"
            >
              {farmCrops.map(c => (
                <option key={c.id} value={c.cropName}>
                  {getLocalizedCropName(c.cropName, lang)} ({t.activeFarm || 'Active Farm'})
                </option>
              ))}
              {CROPS_CATALOG.map(c => (
                <option key={c.name} value={c.name}>
                  {getLocalizedCropName(c.name, lang)}
                </option>
              ))}
            </select>
          </div>

          {/* Planted Acreage Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">{t.plantedArea || 'Planted Area'} ({t.acres || 'Acres'})</span>
              <span className="font-bold text-emerald-700 font-mono">{acreage} {t.acres || 'Acres'}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max={Math.max(50, activeFarm.areaAcres * 2)}
              step="0.5"
              value={acreage}
              onChange={(e) => setAcreage(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Fertilizer & Nutrition Modifier */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">{t.fertilizerCost || 'Fertilizer & Nutrition Cost'}</span>
              <span className="font-bold text-amber-700 font-mono">{fertilizerAdjPct > 0 ? `+${fertilizerAdjPct}` : fertilizerAdjPct}%</span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              step="5"
              value={fertilizerAdjPct}
              onChange={(e) => setFertilizerAdjPct(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-30% ({t.lowSeverity || 'Low Input'})</span>
              <span>{t.optimal || 'Optimal'}</span>
              <span>+30% ({t.highSeverity || 'High Input'})</span>
            </div>
          </div>

          {/* Irrigation Rounds */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">{t.irrigationSchedule || 'Irrigation Schedule'}</span>
              <span className="font-bold text-sky-700 font-mono">{irrigationCount} Cycles</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={irrigationCount}
              onChange={(e) => setIrrigationCount(parseInt(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>

          {/* Model Architecture Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">{t.modelZoo || 'Model Registry'}</label>
            <div className="grid grid-cols-3 gap-2">
              {(['XGBoost', 'RandomForest', 'DNN'] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setModelType(m)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    modelType === m
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => runSimulation(true)}
            disabled={isPredicting}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isPredicting ? 'animate-spin' : ''}`} />
            <span>{isPredicting ? (t.loading || 'Calculating...') : (t.runSimulation || 'Recalculate Simulation')}</span>
          </button>
        </div>

        {/* Right Output Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 rounded-2xl bg-white border border-emerald-100 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                  {t.yieldPrediction || 'Simulation Output'}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {getLocalizedCropName(currentResult.crop, lang)}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {currentResult.modelUsed}
              </span>
            </div>

            {/* 4 Primary Financial & Yield Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {/* Total Yield */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-600 block mb-1">
                  {t.expectedYield || 'Total Yield'}
                </span>
                <span className="text-xl font-black text-emerald-800 block font-display">
                  {currentResult.expectedYieldTotal} Q
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">{acreage} {t.acres || 'Acres'}</span>
              </div>

              {/* Yield per Acre */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  {t.projectedYield || 'Yield / Acre'}
                </span>
                <span className="text-xl font-black text-slate-900 block font-display">
                  {currentResult.yieldPerAcre} Q/Ac
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">{t.optimal || 'Optimal Rate'}</span>
              </div>

              {/* Estimated Revenue */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <span className="text-[10px] uppercase font-bold text-amber-900 block mb-1">
                  {t.projectedRevenue || 'Est. Revenue'}
                </span>
                <span className="text-xl font-black text-amber-700 block font-display">
                  ₹{Math.round(currentResult.estimatedRevenue).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-amber-800 font-medium">{t.grossRevenue || 'Gross Return'}</span>
              </div>

              {/* Net Profit */}
              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80">
                <span className="text-[10px] uppercase font-bold text-teal-900 block mb-1">
                  {t.projectedIncome || 'Net Profit'}
                </span>
                <span className="text-xl font-black text-teal-800 block font-display">
                  ₹{Math.round(currentResult.estimatedProfit).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-teal-700 font-semibold">{t.netProfitMargin || 'Net Margin'}</span>
              </div>
            </div>

            {/* Harvest Window & Target Dates */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">{t.harvestSchedule || 'Optimal Harvest Window'}</span>
                  <span className="font-bold text-slate-800">
                    {currentResult.harvestDateWindow?.optimal} ({currentResult.harvestDateWindow?.daysRemaining} {t.daysRemaining || 'Days Remaining'})
                  </span>
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-500">
                <span>{t.earliest || 'Earliest'}: <b>{currentResult.harvestDateWindow?.earliest}</b></span>
                <span className="mx-2">•</span>
                <span>{t.latest || 'Latest'}: <b>{currentResult.harvestDateWindow?.latest}</b></span>
              </div>
            </div>

            {/* Top ML Feature Drivers */}
            {currentResult.topDrivers && currentResult.topDrivers.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {t.topYieldDrivers || 'Top Model Feature Drivers'}
                </h4>
                <div className="space-y-2">
                  {currentResult.topDrivers.map((driver, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-800 truncate pr-2">{driver.feature}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-20 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${Math.min(100, driver.impactPct * 2.5)}%` }}
                          />
                        </div>
                        <span className="font-bold text-emerald-700 font-mono text-[11px]">+{driver.impactPct}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scenario Comparative Analysis */}
            {currentResult.scenarios && currentResult.scenarios.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {t.scenarioAnalysis || 'Scenario Comparison'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {currentResult.scenarios.map((sc, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-xs space-y-1 ${
                        i === 0 ? 'bg-emerald-50/50 border-emerald-200' :
                        i === 1 ? 'bg-slate-50 border-slate-200' :
                        'bg-amber-50/50 border-amber-200'
                      }`}
                    >
                      <span className="font-bold text-slate-900 block truncate">{sc.name}</span>
                      <div className="text-[11px] text-slate-600 flex justify-between">
                        <span>{t.expectedYield || 'Yield'}:</span>
                        <b className="text-emerald-700">{sc.projectedYield} Q</b>
                      </div>
                      <div className="text-[11px] text-slate-600 flex justify-between">
                        <span>{t.netProfitMargin || 'Profit'}:</span>
                        <b className="text-teal-800">₹{Math.round(sc.projectedProfit).toLocaleString('en-IN')}</b>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
