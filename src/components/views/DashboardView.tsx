import React from 'react';
import {
  CloudSun,
  Sprout,
  TrendingUp,
  Droplets,
  Wind,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  Plus,
  MapPin,
  Navigation,
  Loader2,
  Tent,
  Lightbulb,
  CircleDot
} from 'lucide-react';
import { FarmProfile, CropRecord, WeatherForecastBundle, DiseaseDetectionResult, YieldPredictionResult } from '../../types/agro';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';
import { getLocalizedDiseaseDiagnostic } from '../../lib/diseaseDictionary';
import {
  translateText,
  getLocalizedFarmName,
  getLocalizedLocation,
  getLocalizedSoilType,
  getLocalizedIrrigation,
  getLocalizedCropName,
  getLocalizedGrowthStage
} from '../../lib/universalTranslator';
import { FarmLandscapeBackground } from '../FarmLandscapeBackground';

interface DashboardViewProps {
  activeFarm: FarmProfile;
  crops: CropRecord[];
  weather: WeatherForecastBundle | null;
  scans: DiseaseDetectionResult[];
  yields: YieldPredictionResult[];
  lang: SupportedLang;
  onNavigate: (view: string) => void;
  onOpenAddCrop: () => void;
  onDetectLocation?: () => void;
  isDetectingLocation?: boolean;
  onOpenLocationModal?: () => void;
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
  onDetectLocation,
  isDetectingLocation,
  onOpenLocationModal,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const cur = weather?.current;
  const activeCrops = crops.filter((c) => c.farmId === activeFarm.id && c.status === 'active');
  const rawRecentScan = scans[0];
  const recentScan = rawRecentScan ? getLocalizedDiseaseDiagnostic(rawRecentScan, lang) : null;
  const latestYield = yields[0];

  const totalAcres = activeCrops.reduce((sum, c) => sum + (c.areaPlantedAcres || 0), 0) || activeFarm.areaAcres;
  const displayTemp = cur ? Math.round(cur.temp) : 33;
  const displayCondition = cur?.weatherDescription ? translateText(cur.weatherDescription, lang) : translateText('Partly Cloudy', lang);
  const displayHumidity = cur ? Math.round(cur.humidity) : 56;
  const displayWind = cur ? Math.round(cur.windSpeedKmh) : 9;

  const displaySeverity = recentScan ? (recentScan.isHealthy ? 0 : recentScan.severityPercentage || 36) : 36;
  const displayCropGuess = recentScan
    ? `${recentScan.cropGuess || translateText('Tomato', lang)} (${recentScan.diseaseName || translateText('Early Blight', lang)})`
    : `${translateText('Tomato', lang)} (Solanum lycopersicum)`;

  const displayProfit = latestYield ? Math.round(latestYield.estimatedProfit / 1000) : 550;
  const displayYieldTotal = latestYield ? latestYield.expectedYieldTotal : 1500.5;

  return (
    <div className="space-y-6 animate-fadeIn pb-12 relative min-h-screen">
      {/* Scenic Animated Farm Background (Tractor Ploughing & Farmer Sowing in slight view) */}
      <FarmLandscapeBackground />
      
      {/* HANGING WOODEN SIGN HERO SECTION */}
      <section className="relative pt-6 pb-2">
        {/* Overarching Heavy Tree Branch extending across dashboard top */}
        <div className="absolute -top-4 -left-6 right-0 h-16 pointer-events-none z-10 hidden sm:block overflow-visible">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 900 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroTwistStrand" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#734729" />
                <stop offset="50%" stopColor="#4a2a16" />
                <stop offset="100%" stopColor="#24130a" />
              </linearGradient>
            </defs>
            {/* Thick Wood Branch Body */}
            <path
              d="M -20 20 Q 200 -5 450 18 Q 700 35 920 10 L 920 32 Q 700 55 450 38 Q 200 15 -20 40 Z"
              fill="url(#heroTwistStrand)"
              stroke="#22130a"
              strokeWidth="2"
            />
            {/* Bark Texture Knots */}
            <path d="M 120 15 Q 180 25 240 12" stroke="#8c5a36" strokeWidth="3" fill="none" opacity="0.6" />
            <path d="M 520 25 Q 600 32 680 20" stroke="#8c5a36" strokeWidth="3" fill="none" opacity="0.6" />

            {/* Sprouting Leaves along Branch */}
            <path d="M 180 10 Q 170 -10 185 -18 Q 195 -5 180 10 Z" fill="#4caf50" />
            <path d="M 190 12 Q 205 -5 215 -2 Q 205 15 190 12 Z" fill="#66bb6a" />
            <path d="M 640 22 Q 630 2 645 -6 Q 655 7 640 22 Z" fill="#4caf50" />
            <path d="M 650 24 Q 665 7 675 10 Q 665 27 650 24 Z" fill="#66bb6a" />
          </svg>
        </div>

        {/* Metallic Chains / Ropes Extending Down from Branch */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Left Hanging Chain */}
          <div className="absolute -top-7 left-12 md:left-20 z-20 flex flex-col items-center pointer-events-none">
            <div className="w-4 h-4 rounded-full border-2 border-amber-800 bg-amber-950 shadow-inner"></div>
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-950 rounded-xs -mt-0.5"></div>
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-950 rounded-xs -mt-1"></div>
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-950 rounded-xs -mt-1"></div>
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-950 rounded-xs -mt-1"></div>
            <div className="w-5 h-5 rounded-full border-2 border-amber-500 bg-amber-700 shadow-md flex items-center justify-center -mt-1">
              <div className="w-2 h-2 rounded-full bg-amber-300"></div>
            </div>
          </div>

          {/* Right Hanging Chain */}
          <div className="absolute -top-7 right-12 md:right-20 z-20 flex flex-col items-center pointer-events-none">
            <div className="w-4 h-4 rounded-full border-2 border-amber-800 bg-amber-950 shadow-inner"></div>
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-950 rounded-xs -mt-0.5"></div>
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-950 rounded-xs -mt-1"></div>
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-950 rounded-xs -mt-1"></div>
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-950 rounded-xs -mt-1"></div>
            <div className="w-5 h-5 rounded-full border-2 border-amber-500 bg-amber-700 shadow-md flex items-center justify-center -mt-1">
              <div className="w-2 h-2 rounded-full bg-amber-300"></div>
            </div>
          </div>

          {/* CARVED RUSTIC WOODEN BOARD */}
          <div className="hanging-wooden-board p-5 md:p-6 text-amber-50 shadow-2xl relative overflow-hidden">
            {/* Wood Grain Lines Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Metallic Corner Rivets/Nails */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-900 border border-amber-950 shadow-md"></div>
            <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-900 border border-amber-950 shadow-md"></div>
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-900 border border-amber-950 shadow-md"></div>
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-900 border border-amber-950 shadow-md"></div>

            {/* Content Layout inside Board */}
            <div className="relative z-10">
              {/* Status Pill Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-emerald-300 border border-emerald-500/60 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {t.activeFarm || translateText('ACTIVE FARM', lang)}
                </span>

                <button
                  type="button"
                  onClick={onOpenLocationModal}
                  className="bg-black/30 hover:bg-black/45 text-amber-100 border border-amber-700/50 text-xs px-3 py-1 rounded-full flex items-center space-x-1.5 backdrop-blur-xs cursor-pointer transition shadow-inner"
                  title="Click to search or set exact farm location"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-bold">{getLocalizedLocation(activeFarm.locationName, lang) || translateText('Chennai, Tamil Nadu, India', lang)}</span>
                </button>

                {onDetectLocation && (
                  <button
                    type="button"
                    onClick={onDetectLocation}
                    disabled={isDetectingLocation}
                    className="bg-amber-900/40 hover:bg-amber-800/60 text-amber-200 border border-amber-600/50 text-xs px-3 py-1 rounded-full flex items-center space-x-1.5 transition shadow-xs cursor-pointer active:scale-95"
                    title="Detect live GPS location"
                  >
                    {isDetectingLocation ? (
                      <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin shrink-0" />
                    ) : (
                      <Navigation className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                    <span className="font-bold">
                      {isDetectingLocation ? translateText('Detecting GPS...', lang) : translateText('Auto-Detect GPS', lang)}
                    </span>
                  </button>
                )}
              </div>

              {/* Carved Wooden Sign Main Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-100 tracking-tight mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex items-center space-x-3 font-serif">
                <Tent className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
                <span>{getLocalizedFarmName(activeFarm.name, lang) || translateText('Primary Farm Estate', lang)}</span>
              </h1>

              {/* Key Agronomic Parameters */}
              <div className="pt-2 border-t border-amber-800/70 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm text-amber-200 font-semibold">
                <span className="flex items-center space-x-2 bg-black/20 px-2.5 py-1 rounded-lg border border-amber-900/50">
                  <span>🌾</span>
                  <span className="text-white font-extrabold">{activeFarm.areaAcres || 25} {t.acres || translateText('Acres', lang)}</span>
                </span>
                <span className="text-amber-700 hidden sm:inline">•</span>
                <span className="flex items-center space-x-2 bg-black/20 px-2.5 py-1 rounded-lg border border-amber-900/50">
                  <span>⛰️</span>
                  <span>{t.soilType || translateText('Soil Type', lang)}: <strong className="text-white font-black">{getLocalizedSoilType(activeFarm.soilType, lang) || translateText('Alluvial', lang)}</strong></span>
                </span>
                <span className="text-amber-700 hidden sm:inline">•</span>
                <span className="flex items-center space-x-2 bg-black/20 px-2.5 py-1 rounded-lg border border-amber-900/50">
                  <span>💧</span>
                  <span>{t.irrigationType || translateText('Irrigation System', lang)}: <strong className="text-white font-black">{getLocalizedIrrigation(activeFarm.irrigationType, lang) || translateText('Drip', lang)}</strong></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid: 4 Hanging Wooden Board Metric Cards with Ropes */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1 pb-2">
        
        {/* 1. Weather Advisory Hanging Wooden Card */}
        <div className="relative pt-6 sway-card-1">
          {/* Left Rope */}
          <div className="absolute top-0 left-6 z-10 flex flex-col items-center pointer-events-none">
            <div className="w-3 h-3 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
            <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
            <div className="w-3.5 h-3.5 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
            </div>
          </div>
          {/* Right Rope */}
          <div className="absolute top-0 right-6 z-10 flex flex-col items-center pointer-events-none">
            <div className="w-3 h-3 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
            <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
            <div className="w-3.5 h-3.5 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
            </div>
          </div>

          <div
            className="hanging-wood-card p-4 pt-5 cursor-pointer relative overflow-hidden"
            onClick={() => onNavigate('weather')}
          >
            {/* Corner Rivets */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-amber-300/90 uppercase tracking-wider">
                {t.weatherPrediction || translateText('WEATHER ADVISORY', lang)}
              </span>
              <div className="w-7 h-7 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 shadow-xs border border-amber-400/40">
                <CloudSun className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 my-1">
              <span className="text-2xl font-black text-amber-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{displayTemp}°C</span>
              <span className="text-xs font-bold text-amber-200">{displayCondition}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-amber-200/80 pt-2 border-t border-amber-800/60 mt-2">
              <span className="flex items-center space-x-1">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                <span>{displayHumidity}% {t.humidity || translateText('Humidity', lang)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Wind className="w-3.5 h-3.5 text-amber-300/80" />
                <span>{displayWind} km/h</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2. Crop Planner Hanging Wooden Card */}
        <div className="relative pt-6 sway-card-2">
          {/* Left Rope */}
          <div className="absolute top-0 left-6 z-10 flex flex-col items-center pointer-events-none">
            <div className="w-3 h-3 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
            <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
            <div className="w-3.5 h-3.5 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
            </div>
          </div>
          {/* Right Rope */}
          <div className="absolute top-0 right-6 z-10 flex flex-col items-center pointer-events-none">
            <div className="w-3 h-3 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
            <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
            <div className="w-3.5 h-3.5 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
            </div>
          </div>

          <div
            className="hanging-wood-card p-4 pt-5 cursor-pointer relative overflow-hidden"
            onClick={() => onNavigate('cropplanner')}
          >
            {/* Corner Rivets */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wider">
                {t.cropManagement || translateText('CROP PLANNER', lang)}
              </span>
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 shadow-xs border border-emerald-400/40">
                <Sprout className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 my-1">
              <span className="text-2xl font-black text-amber-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {activeCrops.length || 2}
              </span>
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-600/60 px-2 py-0.5 rounded-md">
                {totalAcres} {t.acres || translateText('Acres', lang)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-amber-200/80 pt-2 border-t border-amber-800/60 mt-2">
              <span className="font-medium truncate">
                {activeCrops[0] ? getLocalizedCropName(activeCrops[0].cropName, lang) : translateText('Maize / Corn', lang)}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* 3. Disease Diagnostics Hanging Wooden Card */}
        <div className="relative pt-6 sway-card-3">
          {/* Left Rope */}
          <div className="absolute top-0 left-6 z-10 flex flex-col items-center pointer-events-none">
            <div className="w-3 h-3 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
            <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
            <div className="w-3.5 h-3.5 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
            </div>
          </div>
          {/* Right Rope */}
          <div className="absolute top-0 right-6 z-10 flex flex-col items-center pointer-events-none">
            <div className="w-3 h-3 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
            <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
            <div className="w-3.5 h-3.5 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
            </div>
          </div>

          <div
            className="hanging-wood-card p-4 pt-5 cursor-pointer relative overflow-hidden"
            onClick={() => onNavigate('diseasescanner')}
          >
            {/* Corner Rivets */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-teal-300 uppercase tracking-wider">
                {t.diseaseDetection || translateText('DISEASE DIAGNOSTICS', lang)}
              </span>
              <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 shadow-xs border border-teal-400/40">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 my-1">
              <span className="text-2xl font-black text-amber-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{displaySeverity}%</span>
              <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-600/60 px-2 py-0.5 rounded-md">
                {t.severity || translateText('Severity', lang)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-amber-200/80 pt-2 border-t border-amber-800/60 mt-2">
              <span className="truncate font-medium">{displayCropGuess}</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-400 ml-1 shrink-0" />
            </div>
          </div>
        </div>

        {/* 4. Yield & Profit Hanging Wooden Card */}
        <div className="relative pt-6 sway-card-4">
          {/* Left Rope */}
          <div className="absolute top-0 left-6 z-10 flex flex-col items-center pointer-events-none">
            <div className="w-3 h-3 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
            <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
            <div className="w-3.5 h-3.5 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
            </div>
          </div>
          {/* Right Rope */}
          <div className="absolute top-0 right-6 z-10 flex flex-col items-center pointer-events-none">
            <div className="w-3 h-3 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
            <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
            <div className="w-3.5 h-3.5 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
            </div>
          </div>

          <div
            className="hanging-wood-card p-4 pt-5 cursor-pointer relative overflow-hidden"
            onClick={() => onNavigate('yieldpredictor')}
          >
            {/* Corner Rivets */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                {t.yieldPrediction || translateText('YIELD & PROFIT', lang)}
              </span>
              <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shadow-xs border border-amber-400/40">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 my-1">
              <span className="text-2xl font-black text-amber-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                ₹{displayProfit}k
              </span>
              <span className="text-xs font-bold text-amber-200/90">{t.netProfitMargin || translateText('Net Margin', lang)}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-amber-200/80 pt-2 border-t border-amber-800/60 mt-2">
              <span className="font-medium">{displayYieldTotal} Q {t.expectedYield || translateText('Expected Yield', lang)}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
        </div>

      </section>

      {/* Detailed Section Layout (2 Columns): Hanging Wooden Boards with Ropes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        
        {/* Left Column (2 Span): Weather & Agronomic Trajectory Board */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Weather Advisory Hanging Wooden Board */}
          <div className="relative pt-6 sway-board-slow">
            {/* Left Hanging Rope */}
            <div className="absolute top-0 left-10 z-10 flex flex-col items-center pointer-events-none">
              <div className="w-3.5 h-3.5 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
              <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
              <div className="w-4 h-4 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
              </div>
            </div>
            {/* Right Hanging Rope */}
            <div className="absolute top-0 right-10 z-10 flex flex-col items-center pointer-events-none">
              <div className="w-3.5 h-3.5 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
              <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
              <div className="w-4 h-4 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
              </div>
            </div>

            <div className="hanging-wood-card p-5 sm:p-6 space-y-5 relative overflow-hidden">
              {/* Corner Rivets */}
              <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
              <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
              <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>

              {/* Board Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-800/70">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-xs">
                    <CloudSun className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-amber-100 text-base font-serif tracking-wide">
                      {t.weatherPrediction || translateText('Weather Advisory', lang)}
                    </h3>
                    <p className="text-xs text-amber-200/80 font-medium">
                      {getLocalizedLocation(activeFarm.locationName, lang) || translateText('Chennai, Tamil Nadu, India', lang)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('weather')}
                  className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center space-x-1.5 bg-black/25 hover:bg-black/40 px-3 py-1.5 rounded-full border border-amber-700/50 transition cursor-pointer shadow-xs"
                >
                  <span>{t.sevenDayForecast || translateText('7-Day Agronomic Forecast', lang)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Microclimate Trajectory Banner inside Board */}
              <div className="bg-gradient-to-r from-emerald-950/90 via-emerald-900/80 to-emerald-950/90 border border-emerald-500/50 rounded-xl p-4 shadow-inner">
                <div className="flex items-start space-x-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 animate-ping"></span>
                  <div>
                    <h4 className="font-extrabold text-sm text-emerald-200 mb-1">
                      {translateText(weather?.aiAnalysis?.headline || 'Optimal Farm Weather & Microclimate Trajectory', lang)}
                    </h4>
                    <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                      {translateText(
                        weather?.aiAnalysis?.summary ||
                          'Atmospheric metrics at your estate are favorable for active photosynthesis and scheduled field operations.',
                        lang
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Weather Parameter Boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-black/35 rounded-xl p-3 border border-amber-800/60 text-center flex flex-col justify-between shadow-inner">
                  <span className="text-[9.5px] font-extrabold text-amber-300/80 uppercase tracking-wider block mb-1">
                    {t.rainProb || translateText('RAINFALL PROBABILITY', lang)}
                  </span>
                  <div>
                    <p className="font-bold text-xs text-amber-100 leading-tight">
                      {translateText(weather?.nextHour?.summary || 'Light Intermittent showers likely', lang)}
                    </p>
                    <p className="text-emerald-400 font-black text-sm mt-1">
                      {weather?.nextHour?.rainProb ?? 87}%
                    </p>
                  </div>
                </div>

                <div className="bg-black/35 rounded-xl p-3 border border-amber-800/60 text-center flex flex-col justify-between shadow-inner">
                  <span className="text-[9.5px] font-extrabold text-amber-300/80 uppercase tracking-wider block mb-1">
                    {t.sprayingIndex || translateText('SPRAYING WINDOW', lang)}
                  </span>
                  <div>
                    <p className="font-extrabold text-emerald-300 text-sm my-1">
                      {translateText(weather?.daily?.[0]?.sprayingIndex || 'Unfavorable', lang)}
                    </p>
                    <p className="text-[10px] text-amber-200/70 font-medium">&lt; 14 km/h</p>
                  </div>
                </div>

                <div className="bg-black/35 rounded-xl p-3 border border-amber-800/60 text-center flex flex-col justify-between shadow-inner">
                  <span className="text-[9.5px] font-extrabold text-amber-300/80 uppercase tracking-wider block mb-1">
                    {t.solarRad || translateText('SOLAR IRRADIANCE', lang)}
                  </span>
                  <div>
                    <p className="font-black text-amber-400 text-sm my-1">
                      {cur?.solarRadiationWm2 || 677} W/m²
                    </p>
                    <p className="text-[10px] text-amber-200/70 font-medium">{translateText('Index', lang)}</p>
                  </div>
                </div>

                <div className="bg-black/35 rounded-xl p-3 border border-amber-800/60 text-center flex flex-col justify-between shadow-inner">
                  <span className="text-[9.5px] font-extrabold text-amber-300/80 uppercase tracking-wider block mb-1">
                    {t.soilMoistureLayer || translateText('SOIL MOISTURE MAPPING', lang)}
                  </span>
                  <div>
                    <p className="font-black text-emerald-400 text-sm my-1">
                      {cur ? (cur.soilMoisture * 100).toFixed(0) : '27'}%
                    </p>
                    <p className="text-[10px] text-amber-200/70 font-medium">{t.optimal || translateText('Optimal', lang)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Agronomy Intelligence Hanging Wooden Plaque */}
          <div className="relative pt-5 sway-card-3">
            {/* Left Rope */}
            <div className="absolute top-0 left-8 z-10 flex flex-col items-center pointer-events-none">
              <div className="w-3 h-3 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
              <div className="rope-strand w-1.5 h-4.5 rounded-xs -mt-0.5"></div>
              <div className="w-3.5 h-3.5 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
              </div>
            </div>
            {/* Right Rope */}
            <div className="absolute top-0 right-8 z-10 flex flex-col items-center pointer-events-none">
              <div className="w-3 h-3 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
              <div className="rope-strand w-1.5 h-4.5 rounded-xs -mt-0.5"></div>
              <div className="w-3.5 h-3.5 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
              </div>
            </div>

            <div className="hanging-wood-card p-4.5 relative overflow-hidden">
              {/* Corner Rivets */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>

              <h4 className="font-bold text-sm text-amber-200 mb-1 flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>{translateText('Smart Agronomy Intelligence', lang)}</span>
              </h4>
              <p className="text-xs text-amber-100/90 leading-relaxed font-medium">
                {translateText(
                  'With an 87% rainfall forecast and current soil moisture at 32%, automated drip irrigation is temporarily paused for 24 hours to maximize water efficiency.',
                  lang
                )}
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Crop Planner Hanging Wooden Board */}
        <div className="space-y-6">
          <div className="relative pt-6 sway-board-right h-full">
            {/* Left Hanging Rope */}
            <div className="absolute top-0 left-8 z-10 flex flex-col items-center pointer-events-none">
              <div className="w-3.5 h-3.5 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
              <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
              <div className="w-4 h-4 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
              </div>
            </div>
            {/* Right Hanging Rope */}
            <div className="absolute top-0 right-8 z-10 flex flex-col items-center pointer-events-none">
              <div className="w-3.5 h-3.5 rounded-full border border-amber-800 bg-amber-950 shadow-inner"></div>
              <div className="rope-strand w-1.5 h-5.5 rounded-xs -mt-0.5"></div>
              <div className="w-4 h-4 rounded-full border border-amber-400 bg-amber-700 shadow-xs flex items-center justify-center -mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
              </div>
            </div>

            <div className="hanging-wood-card p-5 sm:p-6 h-full flex flex-col justify-between relative overflow-hidden">
              {/* Corner Rivets */}
              <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
              <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>
              <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-900 border border-amber-950 shadow-xs"></div>

              <div>
                {/* Board Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-800/70">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                      <Sprout className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-extrabold text-amber-100 text-base font-serif tracking-wide">
                      {t.cropManagement || translateText('Crop Planner', lang)}
                    </h3>
                  </div>
                  <button
                    onClick={onOpenAddCrop}
                    className="text-xs font-bold text-emerald-300 hover:text-emerald-200 flex items-center space-x-1.5 bg-emerald-950/80 hover:bg-emerald-900 px-3 py-1.5 rounded-full border border-emerald-500/60 transition shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t.addCrop || translateText('Add Crop', lang)}</span>
                  </button>
                </div>

                {/* Registered Crops List */}
                <div className="space-y-3" id="crop-item-list">
                  {activeCrops.length > 0 ? (
                    activeCrops.map((crop) => (
                      <div
                        key={crop.id}
                        onClick={() => onNavigate('cropplanner')}
                        className="bg-black/35 rounded-xl p-3.5 border border-amber-800/60 hover:border-emerald-400/80 transition flex items-center justify-between cursor-pointer shadow-inner"
                      >
                        <div>
                          <h4 className="font-bold text-sm text-amber-100">
                            {getLocalizedCropName(crop.cropName, lang)}
                          </h4>
                          <p className="text-xs text-amber-200/70 mt-0.5">
                            {t.variety || translateText('Variety', lang)}:{' '}
                            <span className="font-semibold text-amber-200">
                              {translateText(crop.variety, lang) || translateText('High-Yield Hybrid', lang)}
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-600/60 text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-1 shadow-2xs">
                            {getLocalizedGrowthStage(crop.growthStage, lang).split(' ')[0] || translateText('Germination', lang)}
                          </span>
                          <p className="text-xs font-extrabold text-amber-100">
                            {crop.areaPlantedAcres || 1} {t.acres || translateText('Acres', lang)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div
                        onClick={() => onNavigate('cropplanner')}
                        className="bg-black/35 rounded-xl p-3.5 border border-amber-800/60 hover:border-emerald-400/80 transition flex items-center justify-between cursor-pointer shadow-inner"
                      >
                        <div>
                          <h4 className="font-bold text-sm text-amber-100">{translateText('Maize / Corn', lang)}</h4>
                          <p className="text-xs text-amber-200/70 mt-0.5">
                            {t.variety || translateText('Variety', lang)}: <span className="font-semibold text-amber-200">{translateText('High-Yield Hybrid', lang)}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-600/60 text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-1 shadow-2xs">
                            {translateText('Germination', lang)}
                          </span>
                          <p className="text-xs font-extrabold text-amber-100">1 {t.acres || translateText('Acres', lang)}</p>
                        </div>
                      </div>

                      <div
                        onClick={() => onNavigate('cropplanner')}
                        className="bg-black/35 rounded-xl p-3.5 border border-amber-800/60 hover:border-emerald-400/80 transition flex items-center justify-between cursor-pointer shadow-inner"
                      >
                        <div>
                          <h4 className="font-bold text-sm text-amber-100">{translateText('Paddy', lang)}</h4>
                          <p className="text-xs text-amber-200/70 mt-0.5">
                            {t.variety || translateText('Variety', lang)}: <span className="font-semibold text-amber-200">ADT 37</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-600/60 text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-1 shadow-2xs">
                            {translateText('Germination', lang)}
                          </span>
                          <p className="text-xs font-extrabold text-amber-100">2 {t.acres || translateText('Acres', lang)}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => onNavigate('cropplanner')}
                className="w-full mt-4 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-950 to-teal-950 hover:from-emerald-900 hover:to-teal-900 text-emerald-200 border border-emerald-500/60 text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
              >
                <span>{translateText('Open Crop Management', lang)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

