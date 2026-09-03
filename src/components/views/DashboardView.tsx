import React from 'react';
import {
  CloudSun,
  Sprout,
  TrendingUp,
  Droplets,
  Wind,
  ShieldCheck,
  ArrowRight,
  Plus
} from 'lucide-react';
import { FarmProfile, CropRecord, WeatherForecastBundle, DiseaseDetectionResult, YieldPredictionResult } from '../../types/agro';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';
import { getLocalizedDiseaseDiagnostic } from '../../lib/diseaseDictionary';
import { translateText, getLocalizedFarmName, getLocalizedLocation } from '../../lib/universalTranslator';

interface DashboardViewProps {
  activeFarm: FarmProfile;
  crops: CropRecord[];
  weather: WeatherForecastBundle | null;
  scans: DiseaseDetectionResult[];
  yields: YieldPredictionResult[];
  lang: SupportedLang;
  onNavigate: (view: string) => void;
  onOpenAddCrop: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  activeFarm,
  crops,
  weather,
  scans,
  yields,
  lang,
  onNavigate,
  onOpenAddCrop,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const cur = weather?.current;
  const activeCrops = crops.filter(c => c.farmId === activeFarm.id && c.status === 'active');
  const rawRecentScan = scans[0];
  const recentScan = rawRecentScan ? getLocalizedDiseaseDiagnostic(rawRecentScan, lang) : null;
  const latestYield = yields[0];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner / Farm Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 border border-emerald-500/30 p-6 sm:p-8 shadow-md text-white">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div className="flex flex-wrap items-start justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">
                {t.activeFarm || 'Active Farm'}
              </span>
              <span className="text-xs text-emerald-100 font-medium">· {activeFarm.locationName}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {activeFarm.name}
            </h1>
            <div className="text-xs sm:text-sm text-emerald-100 mt-2 flex flex-wrap items-center gap-3 font-medium">
              <span>🌾 <b className="text-white">{activeFarm.areaAcres}</b> {t.acres || 'Acres'}</span>
              <span>•</span>
              <span>🌱 {t.soilType || 'Soil'}: <b className="text-white">{activeFarm.soilType}</b></span>
              <span>•</span>
              <span>💧 {t.irrigationType || 'Irrigation'}: <b className="text-white">{activeFarm.irrigationType}</b></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weather KPI */}
        <div
          onClick={() => onNavigate('weather')}
          className="p-5 rounded-2xl bg-white border border-emerald-100/90 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.weatherPrediction || 'Weather Forecast'}</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <CloudSun className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">
              {cur ? Math.round(cur.temp) : 28}°C
            </span>
            <span className="text-xs text-slate-600 font-medium">
              {cur?.weatherDescription || t.optimal || 'Clear'}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 pt-2.5 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-sky-500" /> {cur ? Math.round(cur.humidity) : 55}% {t.humidity || 'Humidity'}
            </span>
            <span className="flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-teal-600" /> {cur ? Math.round(cur.windSpeedKmh) : 10} km/h
            </span>
          </div>
        </div>

        {/* Active Crops KPI */}
        <div
          onClick={() => onNavigate('cropplanner')}
          className="p-5 rounded-2xl bg-white border border-emerald-100/90 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.cropManagement || 'Active Crops'}</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Sprout className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">
              {activeCrops.length}
            </span>
            <span className="text-xs text-emerald-700 font-bold">
              {activeCrops.length > 0 ? `${activeCrops.reduce((sum, c) => sum + c.areaPlantedAcres, 0)} ${t.acres || 'Acres'}` : (t.newCrop || 'No crops')}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 pt-2.5 border-t border-slate-100">
            <span className="truncate font-medium">{activeCrops[0]?.cropName || t.addCrop || 'Register Crop'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Plant Disease Health Alert KPI */}
        <div
          onClick={() => onNavigate('diseasescanner')}
          className="p-5 rounded-2xl bg-white border border-emerald-100/90 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.diseaseDetection || 'Crop Health'}</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700 font-display">
              {recentScan ? (recentScan.isHealthy ? (t.healthy || 'Healthy') : `${recentScan.severityPercentage}%`) : (t.healthy || 'Healthy')}
            </span>
            <span className="text-xs text-slate-600 font-medium">
              {recentScan ? (recentScan.isHealthy ? (t.healthy || 'Healthy') : (t.severity || 'Severity')) : (t.accuracy || '98.4% Acc')}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 pt-2.5 border-t border-slate-100">
            <span className="truncate font-medium">{recentScan ? `${recentScan.cropGuess}: ${recentScan.diseaseName}` : (t.recentScans || 'AI Vision Ready')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Yield & Revenue KPI */}
        <div
          onClick={() => onNavigate('yieldpredictor')}
          className="p-5 rounded-2xl bg-white border border-emerald-100/90 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.yieldPrediction || 'Yield Forecast'}</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600 font-display">
              {latestYield ? `₹${(latestYield.estimatedProfit / 1000).toFixed(0)}k` : '₹--'}
            </span>
            <span className="text-xs text-slate-600 font-medium">{t.netProfitMargin || 'Net Margin'}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 pt-2.5 border-t border-slate-100">
            <span className="font-medium">{latestYield ? `${latestYield.expectedYieldTotal} Q ${t.expectedYield || 'Yield'}` : (t.yieldPrediction || 'Forecast Yield')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Row 2: AI Weather Advisory & Active Crop Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Weather & Micro-Climate Intelligence */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-emerald-100 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <CloudSun className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t.weatherPrediction || 'Weather & Microclimate Advisory'}</h2>
                  <p className="text-xs text-slate-500">{getLocalizedLocation(activeFarm.locationName, lang)}</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('weather')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                {t.sevenDayForecast || 'Full Graph & Forecast'} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Headline and advisory */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <h3 className="text-sm font-bold text-emerald-950">
                  {translateText(weather?.aiAnalysis?.headline, lang) || (t.optimal || 'Optimal Farm Climate Conditions')}
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {translateText(weather?.aiAnalysis?.summary || 'Atmospheric metrics are favorable for active photosynthesis and field irrigation.', lang)}
              </p>
            </div>

            {/* Weather Quick Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.rainProb || 'Rain Prob'}</span>
                <span className="text-sm font-bold text-slate-800 block">{translateText(weather?.nextHour?.summary, lang) || (t.optimal || 'Clear')}</span>
                <span className="text-[10px] text-emerald-700 font-bold">{weather?.nextHour?.rainProb || 0}%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.sprayingIndex || 'Spraying Window'}</span>
                <span className="text-sm font-bold text-emerald-700 block">{translateText(weather?.daily?.[0]?.sprayingIndex || 'Optimal', lang)}</span>
                <span className="text-[10px] text-slate-500">&lt; 14 km/h</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.solarRad || 'Solar Irradiance'}</span>
                <span className="text-sm font-bold text-amber-700 block">{cur?.solarRadiationWm2 || 650} W/m²</span>
                <span className="text-[10px] text-slate-500">{translateText('Index', lang)}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.soilMoistureLayer || 'Soil Moisture'}</span>
                <span className="text-sm font-bold text-sky-700 block">{cur ? (cur.soilMoisture * 100).toFixed(0) : '30'}%</span>
                <span className="text-[10px] text-slate-500">{t.optimal || 'Target'}</span>
              </div>
            </div>

            {/* Field Advisory */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.fieldAdvisory || 'Agronomic Advisories'}</h4>
              <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
                {(weather?.aiAnalysis?.fieldAdvisory || [
                  'Irrigate during early morning hours to minimize evaporative losses.',
                  'Schedule fertilizer application according to current growth phase.',
                  'Perform routine foliar canopy checks for early pest signals.',
                  'Ensure proper drainage channels across lower quadrant zones.'
                ]).slice(0, 4).map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{translateText(item, lang)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Farm Crops & Quick Actions */}
        <div className="space-y-6">
          {/* Active Crops Card */}
          <div className="p-6 rounded-2xl bg-white border border-emerald-100 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">{t.cropManagement || 'Registered Crops'}</h3>
              </div>
              <button
                onClick={onOpenAddCrop}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> {t.addCrop || 'Add Crop'}
              </button>
            </div>

            <div className="space-y-2.5">
              {activeCrops.length > 0 ? (
                activeCrops.map((crop) => (
                  <div
                    key={crop.id}
                    onClick={() => onNavigate('cropplanner')}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{crop.cropName}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                        {crop.growthStage.split(' ')[0]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>{t.variety || 'Variety'}: {crop.variety || 'Standard'}</span>
                      <span className="font-bold text-slate-800">{crop.areaPlantedAcres} {t.acres || 'Acres'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-3">
                  <p className="text-xs text-slate-500 font-medium">{t.newCrop || 'No crops registered yet.'}</p>
                  <button
                    onClick={onOpenAddCrop}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 cursor-pointer"
                  >
                    + {t.addCrop || 'Register Crop'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
