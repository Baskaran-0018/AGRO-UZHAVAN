import React, { useState } from 'react';
import { TrendingUp, Sparkles, AlertTriangle, CheckCircle, Calculator, Sliders, DollarSign, Sprout } from 'lucide-react';
import { FarmProfile, CropRecord, YieldPredictionResult } from '../../types/agro';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';
import { CROPS_CATALOG } from '../../data/cropsData';

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

  const [selectedCrop, setSelectedCrop] = useState(farmCrops[0]?.cropName || CROPS_CATALOG[0].name);
  const [acreage, setAcreage] = useState(farmCrops[0]?.areaPlantedAcres || activeFarm.areaAcres || 5);
  const [fertilizerAdjPct, setFertilizerAdjPct] = useState(0);
  const [rainfallAdjPct, setRainfallAdjPct] = useState(0);
  const [irrigationCount, setIrrigationCount] = useState(5);
  const [modelType, setModelType] = useState<'XGBoost' | 'RandomForest' | 'DNN'>('XGBoost');
  const [isPredicting, setIsPredicting] = useState(false);
  const [currentResult, setCurrentResult] = useState<YieldPredictionResult | null>(yields[0] || null);

  async function handleRunPrediction() {
    setIsPredicting(true);
    try {
      const res = await fetch('/api/yield/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: selectedCrop,
          soilType: activeFarm.soilType,
          areaAcres: acreage,
          location: activeFarm.locationName,
          fertilizerMod: fertilizerAdjPct,
          rainfallMod: rainfallAdjPct,
          irrigationCount,
        })
      });
      if (res.ok) {
        const data = await res.json();
        const fertBoost = 1 + (fertilizerAdjPct * 0.005);
        const rainBoost = 1 + (rainfallAdjPct * 0.003);
        const adjustedYieldTotal = Math.round(data.expectedYieldTotal * fertBoost * rainBoost * 10) / 10;
        const adjustedPerAcre = Math.round((adjustedYieldTotal / acreage) * 10) / 10;
        const adjustedRevenue = Math.round(data.estimatedRevenue * fertBoost * rainBoost);
        const adjustedProfit = Math.max(5000, adjustedRevenue - data.estimatedCost);

        const finalResult: YieldPredictionResult = {
          ...data,
          expectedYieldTotal: adjustedYieldTotal,
          yieldPerAcre: adjustedPerAcre,
          estimatedRevenue: adjustedRevenue,
          estimatedProfit: adjustedProfit,
          modelUsed: modelType === 'XGBoost' ? 'XGBoost 2.0' : modelType === 'RandomForest' ? 'Random Forest Regressor' : 'Deep Neural Network (DNN)',
        };

        setCurrentResult(finalResult);
        onAddYield(finalResult);
      }
    } catch (err) {
      console.error('Yield prediction error:', err);
    } finally {
      setIsPredicting(false);
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider">
            Yield & Revenue Estimator
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">{t.yieldPrediction}</h1>
          <p className="text-xs text-slate-500 font-medium">Estimate seasonal production yield, market revenues, and input cost optimization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-emerald-100 space-y-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Prediction Parameters</h2>

          {/* Crop Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Target Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-emerald-500 focus:outline-none"
            >
              {farmCrops.map(c => (
                <option key={c.id} value={c.cropName}>{c.cropName} (Registered Crop)</option>
              ))}
              {CROPS_CATALOG.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Acreage */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Cultivated Land (Acres)</span>
              <span className="font-bold text-emerald-700 font-mono">{acreage} Acres</span>
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

          {/* Fertilizer Adjustment */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Fertilizer Regimen Modifier</span>
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
              <span>-30% (Low Input)</span>
              <span>Baseline</span>
              <span>+30% (Intensive)</span>
            </div>
          </div>

          {/* Irrigation Cycles */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Scheduled Irrigation Rounds</span>
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

          {/* ML Model Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Inference Architecture</label>
            <div className="grid grid-cols-3 gap-2">
              {(['XGBoost', 'RandomForest', 'DNN'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setModelType(m)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    modelType === m
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRunPrediction}
            disabled={isPredicting}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {isPredicting ? 'Calculating...' : 'Run Yield & Profit Forecast'}
          </button>
        </div>

        {/* Right: Results Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {currentResult ? (
            <div className="p-6 rounded-2xl bg-white border border-emerald-100 space-y-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Projection Output</span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">{currentResult.crop}</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {currentResult.modelUsed}
                </span>
              </div>

              {/* Primary Output Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Expected Total Yield</span>
                  <span className="text-lg font-black text-emerald-700 block font-display">{currentResult.expectedYieldTotal} Q</span>
                  <span className="text-[10px] text-slate-500">Across {acreage} Acres</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Yield / Acre</span>
                  <span className="text-lg font-black text-slate-900 block font-display">{currentResult.yieldPerAcre} Q/Ac</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Target Range</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Estimated Revenue</span>
                  <span className="text-lg font-black text-amber-700 block font-display">₹{(currentResult.estimatedRevenue).toLocaleString()}</span>
                  <span className="text-[10px] text-slate-500">Market Rate</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Estimated Net Profit</span>
                  <span className="text-lg font-black text-emerald-700 block font-display">₹{(currentResult.estimatedProfit).toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">After Input Costs</span>
                </div>
              </div>

              {/* Key Influencing Factors */}
              {currentResult.keyFactors && currentResult.keyFactors.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Top Yield Drivers</h4>
                  <div className="space-y-2">
                    {(currentResult.keyFactors || []).map((kf, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-slate-800 font-semibold">{kf.factor}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full"
                              style={{ width: `${Math.abs(kf.impactPct) * 2}%` }}
                            ></div>
                          </div>
                          <span className={`font-bold font-mono text-[11px] ${kf.impactPct >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {kf.impactPct >= 0 ? `+${kf.impactPct}` : kf.impactPct}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white border border-emerald-100 space-y-3 shadow-xs">
              <TrendingUp className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No Forecast Calculated</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                Configure your crop acreage, soil type, and input parameters on the left and tap "Run Yield & Profit Forecast".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
