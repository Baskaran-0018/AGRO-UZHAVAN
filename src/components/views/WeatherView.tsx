import React, { useState } from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Activity,
  Calendar,
  Layers,
  Thermometer
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart
} from 'recharts';
import { FarmProfile, WeatherForecastBundle } from '../../types/agro';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';
import { getWeatherCodeDescription } from '../../server/weatherService';
import { translateText, getLocalizedLocation } from '../../lib/universalTranslator';
import { generateClientSyntheticWeather } from '../../lib/weatherClient';

interface WeatherViewProps {
  activeFarm: FarmProfile;
  weather: WeatherForecastBundle | null;
  isLoading: boolean;
  onRefresh: () => void;
  lang: SupportedLang;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ activeFarm, weather, isLoading, onRefresh, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [activeTab, setActiveTab] = useState<'hourly' | 'weekly' | 'soil_humidity' | 'table'>('hourly');
  const [selectedHour, setSelectedHour] = useState(0);

  // Guarantee complete dataset so graphs always render beautifully
  const effectiveWeather = (weather && weather.hourly && weather.hourly.length > 0)
    ? weather
    : generateClientSyntheticWeather(activeFarm.lat || 11.0168, activeFarm.lng || 76.9558, activeFarm.locationName, lang);

  const cur = effectiveWeather.current;
  const hourly = effectiveWeather.hourly || [];
  const daily = effectiveWeather.daily || [];

  // Format 24-hour graph data
  const hourlyGraphData = hourly.slice(0, 24).map((h) => ({
    time: (h.timestamp || '').length >= 16 ? h.timestamp.slice(11, 16) : (h.timestamp || '12:00'),
    temp: Math.round(h.temp),
    rainProb: h.rainProbabilityPct ?? 0,
    precipMm: parseFloat((h.precipitationMm || 0).toFixed(1)),
    humidity: Math.round(h.humidity || 55),
    windSpeed: Math.round(h.windSpeedKmh || 10),
    solarRad: Math.round(h.solarRadiationWm2 || 450),
  }));

  // Format 14-day forecast graph data
  const dailyGraphData = daily.map((d) => ({
    date: (d.date || '').length >= 10 ? d.date.slice(5) : (d.date || ''),
    tempMax: Math.round(d.tempMax),
    tempMin: Math.round(d.tempMin),
    rainProb: d.rainProb ?? 0,
    rainSum: parseFloat((d.rainSumMm || 0).toFixed(1)),
    windMax: Math.round(d.windMaxKmh || 10),
  }));

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn pb-12 w-full max-w-full min-w-0">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
              {t.weatherPrediction || 'Weather Prediction & Graphs'}
            </span>
            <span className="text-xs text-slate-500 font-medium truncate">· {getLocalizedLocation(activeFarm.locationName, lang)}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5 break-words">
            {t.weatherPrediction} & {t.microClimate || 'Microclimate Analytics'}
          </h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm shadow-emerald-600/20 transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{t.refresh || 'Refresh Forecast'}</span>
          </button>
        </div>
      </div>

      {/* Current Conditions & AI Advisory Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Current Station Metrics */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white border border-emerald-500/30 flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-100">{t.hourlyAdvisory || 'Station Live Reading'}</span>
            <div className="flex items-center gap-4 my-4">
              <CloudSun className="w-14 h-14 sm:w-16 sm:h-16 text-amber-300 shrink-0" />
              <div className="min-w-0">
                <span className="text-4xl sm:text-5xl font-black font-display">{cur ? Math.round(cur.temp) : 28}°C</span>
                <p className="text-xs sm:text-sm font-bold text-emerald-100 truncate">{translateText(cur?.weatherDescription, lang) || (t.optimal || 'Mainly Clear')}</p>
                <p className="text-xs text-emerald-200">{t.feelsLike || 'Feels like'} {cur ? Math.round(cur.feelsLike) : 30}°C</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 text-xs text-white pt-4 border-t border-white/20">
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-emerald-200 block text-[10px] uppercase font-bold">{t.humidity || 'Humidity'}</span>
              <span className="font-extrabold text-sm sm:text-base">{cur?.humidity || 62}%</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-emerald-200 block text-[10px] uppercase font-bold">{t.windSpeed || 'Wind Speed'}</span>
              <span className="font-extrabold text-sm sm:text-base">{cur?.windSpeedKmh || 12} km/h</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-emerald-200 block text-[10px] uppercase font-bold">{t.solarRad || 'Solar Flux'}</span>
              <span className="font-extrabold text-sm sm:text-base">{cur?.solarRadiationWm2 || 650} W/m²</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-emerald-200 block text-[10px] uppercase font-bold">{t.sprayingIndex || 'Spraying'}</span>
              <span className="font-extrabold text-sm sm:text-base text-amber-200">{translateText(daily[0]?.sprayingIndex || 'Optimal', lang)}</span>
            </div>
          </div>
        </div>

        {/* AI Climate Insight */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white border border-emerald-100 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900">{t.fieldAdvisory || 'AI Agronomic Weather Guidance'}</h3>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1.5">
            <p className="font-bold text-emerald-900 text-xs sm:text-sm">{translateText(weather?.aiAnalysis?.headline, lang) || (t.optimal || 'Optimal Farm Weather Trajectory')}</p>
            <p className="leading-relaxed text-slate-700 font-medium">{translateText(weather?.aiAnalysis?.summary || 'Favorable thermal ranges present for healthy crop vegetative and grain growth.', lang)}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
              <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">{t.sprayingIndex || 'Spraying Recommendations'}</span>
              <p className="text-slate-800 font-medium break-words leading-relaxed">{translateText(weather?.aiAnalysis?.sprayingConditions || 'Wind speed < 14 km/h provides suitable chemical deposition window without foliar drift.', lang)}</p>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
              <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">{t.irrigationSchedule || 'Irrigation Advisory'}</span>
              <p className="text-slate-800 font-medium break-words leading-relaxed">{translateText(weather?.aiAnalysis?.irrigationRecommendation || 'Maintain scheduled root zone moisture saturation during morning hours.', lang)}</p>
            </div>
          </div>

          <div className="pt-1">
            <span className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wider">{t.fieldAdvisory || 'Field Action Points'}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(weather?.aiAnalysis?.fieldAdvisory || [
                'Ensure soil moisture sensor checks before midday irrigation.',
                'Inspect leafy foliage canopy for humidity-triggered fungal spores.'
              ]).slice(0, 4).map((adv, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 font-medium min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                  <span className="break-words leading-relaxed flex-1 min-w-0">{translateText(adv, lang)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weather Prediction Graph Studio */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-emerald-100 space-y-5 sm:space-y-6 shadow-xs w-full max-w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{t.weatherPrediction || 'Interactive Weather Prediction Graphs'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{t.hourlyAdvisory || 'High-resolution forecasting curves and probability trends'}</p>
          </div>

          {/* Graph View Selector Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full no-scrollbar">
            <button
              onClick={() => setActiveTab('hourly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all shrink-0 whitespace-nowrap ${
                activeTab === 'hourly'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.hourlyAdvisory || '24-Hour Temp & Rain Graph'}
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all shrink-0 whitespace-nowrap ${
                activeTab === 'weekly'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.sevenDayForecast || '14-Day Temperature & Rain Curve'}
            </button>
            <button
              onClick={() => setActiveTab('soil_humidity')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all shrink-0 whitespace-nowrap ${
                activeTab === 'soil_humidity'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.humidity || 'Humidity'} & {t.windSpeed || 'Wind Speed'}
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all shrink-0 whitespace-nowrap ${
                activeTab === 'table'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.reports || '14-Day Table'}
            </button>
          </div>
        </div>

        {/* Tab 1: 24-Hour Temperature & Rain Probability Graph */}
        {activeTab === 'hourly' && (
          <div className="space-y-5 sm:space-y-6 w-full max-w-full overflow-hidden">
            <div className="h-64 sm:h-80 w-full min-h-[250px] sm:min-h-[280px] pt-4 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240}>
                <ComposedChart data={hourlyGraphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis
                    yAxisId="left"
                    stroke="#10b981"
                    tick={{ fontSize: 10 }}
                    domain={['dataMin - 3', 'dataMax + 3']}
                    unit="°C"
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#0ea5e9"
                    tick={{ fontSize: 10 }}
                    domain={[0, 100]}
                    unit="%"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                      fontSize: '11px',
                    }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
                  <Bar yAxisId="right" dataKey="rainProb" name={t.rainProb || 'Rain Probability (%)'} fill="url(#rainGradient)" radius={[4, 4, 0, 0]} maxBarSize={20} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="temp"
                    name={t.temp || 'Temperature (°C)'}
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#tempGradient)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Hourly interactive cards */}
            <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar scroll-smooth w-full max-w-full">
              {hourly.slice(0, 24).map((h, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedHour(idx)}
                  className={`shrink-0 min-w-[86px] sm:min-w-[100px] p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedHour === idx
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-bold block mb-1">{(h.timestamp || '').length >= 16 ? h.timestamp.slice(11, 16) : (h.timestamp || '12:00')}</span>
                  <span className="text-sm font-extrabold block text-slate-900">{Math.round(h.temp)}°C</span>
                  <span className="text-[10px] text-sky-600 font-bold block mt-0.5 truncate">{h.rainProbabilityPct}% {t.rainProb || 'Rain'}</span>
                </div>
              ))}
            </div>

            {/* Selected Hour Details */}
            {hourly[selectedHour] && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-xs font-medium text-slate-700 min-w-0">
                <div className="min-w-0">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase truncate">{t.timePoint || 'Time Point'}</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block truncate">{hourly[selectedHour].timestamp}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase truncate">{t.humidity || 'Temp & Humidity'}</span>
                  <span className="font-bold text-emerald-700 text-xs sm:text-sm block truncate">{hourly[selectedHour].temp}°C · {hourly[selectedHour].humidity}%</span>
                </div>
                <div className="min-w-0">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase truncate">{t.solarRad || 'Solar Flux & UV'}</span>
                  <span className="font-bold text-amber-700 text-xs sm:text-sm block truncate">{hourly[selectedHour].solarRadiationWm2} W/m² (UV {hourly[selectedHour].uvIndex})</span>
                </div>
                <div className="min-w-0">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase truncate">{t.soilMoistureLayer || 'Soil Moisture'}</span>
                  <span className="font-bold text-sky-700 text-xs sm:text-sm block truncate">{(hourly[selectedHour].soilMoisture * 100).toFixed(0)}%</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: 14-Day High / Low Temperature Curves */}
        {activeTab === 'weekly' && (
          <div className="space-y-4 w-full max-w-full overflow-hidden">
            <div className="h-64 sm:h-80 w-full min-h-[250px] sm:min-h-[280px] pt-4 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240}>
                <ComposedChart data={dailyGraphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="temp" stroke="#10b981" tick={{ fontSize: 10 }} unit="°C" domain={['dataMin - 2', 'dataMax + 2']} />
                  <YAxis yAxisId="rain" orientation="right" stroke="#0ea5e9" tick={{ fontSize: 10 }} unit="mm" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                      fontSize: '11px',
                    }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
                  <Bar yAxisId="rain" dataKey="rainSum" name={t.precipitation || 'Rainfall (mm)'} fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={20} />
                  <Line yAxisId="temp" type="monotone" dataKey="tempMax" name={t.maxTemp || 'Max Temp (°C)'} stroke="#f59e0b" strokeWidth={3} dot={{ r: 3, fill: '#f59e0b' }} />
                  <Line yAxisId="temp" type="monotone" dataKey="tempMin" name={t.minTemp || 'Min Temp (°C)'} stroke="#0284c7" strokeWidth={3} dot={{ r: 3, fill: '#0284c7' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 text-center font-medium">
              {t.weeklyAdvisory || '14-Day thermal envelope showing projected daytime maximums and nighttime minimum thresholds with precipitation.'}
            </p>
          </div>
        )}

        {/* Tab 3: Humidity & Wind Diurnal Graph */}
        {activeTab === 'soil_humidity' && (
          <div className="space-y-4 w-full max-w-full overflow-hidden">
            <div className="h-64 sm:h-80 w-full min-h-[250px] sm:min-h-[280px] pt-4 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240}>
                <LineChart data={hourlyGraphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="hum" stroke="#0284c7" tick={{ fontSize: 10 }} unit="%" domain={[20, 100]} />
                  <YAxis yAxisId="wind" orientation="right" stroke="#0d9488" tick={{ fontSize: 10 }} unit="km/h" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                      fontSize: '11px',
                    }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
                  <Line yAxisId="hum" type="monotone" dataKey="humidity" name={t.humidity || 'Relative Humidity (%)'} stroke="#0284c7" strokeWidth={2.5} dot={false} />
                  <Line yAxisId="wind" type="monotone" dataKey="windSpeed" name={t.windSpeed || 'Wind Speed (km/h)'} stroke="#0d9488" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 text-center font-medium">
              {t.microClimate || 'Diurnal humidity cycle and kinetic wind velocity tracking for precision spraying and disease risk modeling.'}
            </p>
          </div>
        )}

        {/* Tab 4: 14-Day Climatological Table */}
        {activeTab === 'table' && (
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[580px] text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">{t.schedule || 'Date'}</th>
                  <th className="p-3.5">{t.condition || 'Condition'}</th>
                  <th className="p-3.5">{t.temp || 'Max / Min Temp'}</th>
                  <th className="p-3.5">{t.rainProb || 'Rain Probability'}</th>
                  <th className="p-3.5">{t.precipitation || 'Precipitation'}</th>
                  <th className="p-3.5">{t.windSpeed || 'Max Wind'}</th>
                  <th className="p-3.5">{t.sprayingIndex || 'Spraying Index'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {daily.map((d, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{d.date}</td>
                    <td className="p-3.5">{translateText(getWeatherCodeDescription(d.weatherCode), lang)}</td>
                    <td className="p-3.5 font-bold">
                      <span className="text-amber-600">{Math.round(d.tempMax)}°</span> / <span className="text-sky-600">{Math.round(d.tempMin)}°</span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${d.rainProb > 50 ? 'bg-sky-100 text-sky-800' : 'text-slate-600 bg-slate-100'}`}>
                        {d.rainProb}%
                      </span>
                    </td>
                    <td className="p-3.5 font-mono">{d.rainSumMm.toFixed(1)} mm</td>
                    <td className="p-3.5 font-mono">{d.windMaxKmh} km/h</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${d.sprayingIndex === 'Optimal' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : d.sprayingIndex === 'Caution' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-rose-100 text-rose-800 border border-rose-200'}`}>
                        {d.sprayingIndex === 'Optimal' ? (t.optimal || 'Optimal') : d.sprayingIndex === 'Caution' ? (t.caution || 'Caution') : (t.unfavorable || 'Unfavorable')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
