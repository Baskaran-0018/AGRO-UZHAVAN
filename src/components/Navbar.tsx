import React from 'react';
import {
  Sprout,
  CloudSun,
  Bell,
  Globe,
  Plus,
  MapPin,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Download
} from 'lucide-react';
import { FarmProfile } from '../types/agro';
import { LANGUAGES, SupportedLang, TRANSLATIONS } from '../lib/i18n';
import { usePwa } from '../lib/pwa';

interface NavbarProps {
  farms: FarmProfile[];
  activeFarm: FarmProfile;
  onSelectFarm: (farm: FarmProfile) => void;
  onOpenAddFarm: () => void;
  lang: SupportedLang;
  onChangeLang: (lang: SupportedLang) => void;
  onOpenNotifications: () => void;
  alertCount: number;
  currentTemp?: number;
  currentWeatherDesc?: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  farms,
  activeFarm,
  onSelectFarm,
  onOpenAddFarm,
  lang,
  onChangeLang,
  onOpenNotifications,
  alertCount,
  currentTemp,
  currentWeatherDesc,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const { isInstalled, promptInstall } = usePwa();

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  AGRO AI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Smart Farm
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </button>
        </div>

        {/* Farm Switcher & Quick Indicators */}
        <div className="flex items-center gap-2.5">
          {/* Active Farm Selector */}
          <div className="relative hidden md:flex items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <select
                value={activeFarm.id}
                onChange={(e) => {
                  const f = farms.find(farm => farm.id === e.target.value);
                  if (f) onSelectFarm(f);
                }}
                className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer max-w-[160px] truncate"
              >
                {farms.map((f) => (
                  <option key={f.id} value={f.id} className="bg-white text-slate-800">
                    {f.name} ({f.areaAcres} Ac)
                  </option>
                ))}
              </select>
              <button
                onClick={onOpenAddFarm}
                title={t.addFarm}
                className="ml-1 p-1 rounded hover:bg-emerald-100 text-slate-500 hover:text-emerald-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Live Weather Pill */}
          {currentTemp !== undefined && (
            <button
              onClick={() => onNavigate('weather')}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50/80 border border-amber-200 hover:border-amber-400 text-xs text-slate-700 hover:text-amber-900 transition-all cursor-pointer"
            >
              <CloudSun className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-slate-800">{Math.round(currentTemp)}°C</span>
              <span className="text-[11px] text-slate-500 truncate max-w-[110px]">
                {currentWeatherDesc || 'Clear'}
              </span>
            </button>
          )}

          {/* Clean Professional Language Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <select
              value={lang}
              onChange={(e) => onChangeLang(e.target.value as SupportedLang)}
              className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer pr-1"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-white text-slate-800">
                  {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
          </div>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 text-slate-600 hover:text-amber-600 transition-colors"
            aria-label="Alerts"
          >
            <Bell className="w-4 h-4" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-amber-500 rounded-full border-2 border-white">
                {alertCount}
              </span>
            )}
          </button>

          {/* PWA Install Button */}
          {!isInstalled && (
            <button
              onClick={promptInstall}
              title="Install AGRO AI App"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Install App</span>
            </button>
          )}

          {/* AI Assistant Button */}
          <button
            onClick={() => onNavigate('assistant')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.aiAssistant || 'AI Advisor'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
