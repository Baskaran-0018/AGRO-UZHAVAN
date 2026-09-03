import React, { useState, useRef, useEffect } from 'react';
import {
  Sprout,
  CloudSun,
  Bell,
  Globe,
  Plus,
  MapPin,
  Sparkles,
  Download,
  Menu,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Shield,
  Smartphone,
  LogIn
} from 'lucide-react';
import { FarmProfile, UserProfile } from '../types/agro';
import { LANGUAGES, SupportedLang, TRANSLATIONS } from '../lib/i18n';
import { usePwa } from '../lib/pwa';
import { getLocalizedUserName, getLocalizedFarmName, getLocalizedRole } from '../lib/universalTranslator';

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
  onOpenMobileMenu?: () => void;
  user?: UserProfile | null;
  onOpenLogin?: () => void;
  onLogout?: () => void;
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
  onOpenMobileMenu,
  user,
  onOpenLogin,
  onLogout,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const { isInstalled, promptInstall } = usePwa();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const currentLangMeta = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2 shadow-xs">
      <div className="flex items-center justify-between gap-2 sm:gap-4 max-w-7xl mx-auto">
        {/* Brand & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-emerald-100 hover:text-emerald-800 transition-colors cursor-pointer"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-emerald-200 shadow-sm p-0.5 group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
              <img
                src="/logo.png"
                alt="Agro Uzhavan Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 leading-none">
                Agro Uzhavan
              </span>
            </div>
          </button>
        </div>

        {/* Farm Switcher & Quick Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
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
                className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer max-w-[150px] truncate"
              >
                {farms.map((f) => (
                  <option key={f.id} value={f.id} className="bg-white text-slate-800">
                    {getLocalizedFarmName(f.name, lang)} ({f.areaAcres} {t.acres || 'Ac'})
                  </option>
                ))}
              </select>
              <button
                onClick={onOpenAddFarm}
                title={t.addFarm}
                className="ml-1 p-1 rounded hover:bg-emerald-100 text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Live Weather Pill */}
          {currentTemp !== undefined && (
            <button
              onClick={() => onNavigate('weather')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-700 hover:text-emerald-800 transition-all cursor-pointer"
            >
              <CloudSun className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{Math.round(currentTemp)}°C</span>
              {currentWeatherDesc && (
                <span className="hidden lg:inline text-slate-500 font-normal text-[11px] truncate max-w-[80px]">
                  {currentWeatherDesc}
                </span>
              )}
            </button>
          )}

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{currentLangMeta.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                  {t.chooseLanguage || 'Choose Language'}
                </div>
                <div className="space-y-0.5 max-h-60 overflow-y-auto">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onChangeLang(l.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        lang === l.code
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{l.nativeName}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{l.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title={t.alerts}
          >
            <Bell className="w-4 h-4" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                {alertCount}
              </span>
            )}
          </button>

          {/* PWA Install Button on Navbar */}
          {!isInstalled && (
            <button
              onClick={promptInstall}
              title={t.installMobileApp || 'Install AGRO AI App'}
              className="hidden xs:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-extrabold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700 animate-bounce" />
              <span className="hidden sm:inline">{t.install || 'Install'}</span>
            </button>
          )}

          {/* User Account / Login Pill */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer select-none"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover border border-emerald-300 shrink-0"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="hidden sm:flex flex-col text-left max-w-[100px]">
                  <span className="text-xs font-bold text-slate-800 truncate leading-none">
                    {getLocalizedUserName(user.name, lang)}
                  </span>
                  <span className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider mt-0.5">
                    {user.isGuest ? (t.guestPass || 'Guest Pass') : user.provider === 'phone' ? (t.mobileOtp || 'Mobile OTP') : user.provider}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* User Account Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 space-y-3 z-50 text-slate-900 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-extrabold text-slate-900 truncate">{getLocalizedUserName(user.name, lang)}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{user.phone || user.email || (user.isGuest ? (t.guestFarmer || 'Guest Farmer') : (t.verifiedUser || 'Verified User'))}</p>
                      <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 uppercase">
                        {getLocalizedRole(user.role, lang) || (user.isGuest ? (t.guestMode || 'Guest Mode') : user.provider === 'phone' ? (t.phoneVerified || 'Phone Verified') : user.provider)}
                      </span>
                    </div>
                  </div>

                  {user.isGuest && onOpenLogin && (
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.linkGoogleApple || 'Link Google / Apple Account'}</span>
                    </button>
                  )}

                  <div className="space-y-1 text-xs">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigate('profile');
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-lg text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50 font-bold transition-colors text-left cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-emerald-600" />
                      <span>{t.farmerProfile || 'Farmer Profile & KYC'}</span>
                    </button>

                    {onOpenLogin && (
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenLogin();
                        }}
                        className="w-full flex items-center gap-2.5 p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium transition-colors text-left cursor-pointer"
                      >
                        <LogIn className="w-4 h-4 text-slate-400" />
                        <span>{t.switchToLogin || 'Switch Account'}</span>
                      </button>
                    )}

                    {onLogout && (
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 p-2 rounded-lg text-rose-600 hover:bg-rose-50 font-bold transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>{t.logout || 'Log Out'}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.login || 'Sign In'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
