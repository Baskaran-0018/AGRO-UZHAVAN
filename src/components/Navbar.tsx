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
import { getLocalizedUserName, getLocalizedFarmName, getLocalizedRole, translateText } from '../lib/universalTranslator';

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
  const langMenuRef = useRef<HTMLDivElement>(null);
  const currentLangMeta = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  // Close dropdown on outside click or touch
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur-md px-2 sm:px-4 py-2 shadow-xs w-full max-w-full select-none">
      <div className="flex items-center justify-between gap-1.5 sm:gap-3 max-w-7xl mx-auto w-full min-w-0">
        {/* Brand & Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink">
          {onOpenMobileMenu && (
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="md:hidden p-1.5 rounded-xl text-slate-700 hover:bg-emerald-100 hover:text-emerald-800 transition-colors cursor-pointer shrink-0"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer focus:outline-none min-w-0"
          >
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-emerald-200 shadow-sm p-0.5 group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
              <img
                src="/logo.png"
                alt="Agro Uzhavan Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 hidden md:block">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 leading-none truncate block">
                Agro Uzhavan
              </span>
            </div>
          </button>
        </div>

        {/* Top Right Tabs & Quick Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0">
          {/* 1. Active Farm Selector */}
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
                type="button"
                onClick={onOpenAddFarm}
                title={t.addFarm}
                className="ml-1 p-1 rounded hover:bg-emerald-100 text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Live Weather Pill */}
          {currentTemp !== undefined && (
            <button
              type="button"
              onClick={() => onNavigate('weather')}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-[11px] sm:text-xs font-bold text-slate-700 hover:text-emerald-800 transition-all cursor-pointer shrink-0 active:scale-95"
              title={currentWeatherDesc ? `${Math.round(currentTemp)}°C - ${translateText(currentWeatherDesc, lang)}` : `${Math.round(currentTemp)}°C`}
            >
              <CloudSun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
              <span>{Math.round(currentTemp)}°C</span>
              {currentWeatherDesc && (
                <span className="hidden lg:inline text-slate-500 font-normal text-[11px] truncate max-w-[80px]">
                  {translateText(currentWeatherDesc, lang)}
                </span>
              )}
            </button>
          )}

          {/* 3. Multilingual Selector Tab */}
          <div className="relative shrink-0" ref={langMenuRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLangMenuOpen(prev => !prev);
                setIsUserMenuOpen(false);
              }}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border text-[11px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 active:scale-95 ${
                isLangMenuOpen
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-xs'
                  : 'bg-slate-50 hover:bg-emerald-50 border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800'
              }`}
              aria-label="Select Language"
              aria-expanded={isLangMenuOpen}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="max-w-[48px] xs:max-w-[70px] sm:max-w-none truncate">{currentLangMeta.nativeName}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 shrink-0 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180 text-emerald-600' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <>
                {/* Global Backdrop for outside click dismissal */}
                <div
                  className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-2xs"
                  onClick={() => setIsLangMenuOpen(false)}
                />
                <div className="fixed top-13 right-3 left-3 sm:left-auto sm:right-0 sm:absolute sm:top-full sm:mt-2 w-auto sm:w-60 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50 text-slate-900 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1.5 flex items-center justify-between">
                    <span>{t.chooseLanguage || 'Choose Language'}</span>
                    <span className="text-emerald-700 font-bold text-[9px] bg-emerald-50 px-1.5 py-0.5 rounded-md">{LANGUAGES.length} {t.languages || 'Languages'}</span>
                  </div>
                  <div className="space-y-1 max-h-72 overflow-y-auto overscroll-contain pr-0.5">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChangeLang(l.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                          lang === l.code
                            ? 'bg-emerald-600 text-white font-black shadow-xs ring-1 ring-emerald-500'
                            : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-950 active:bg-emerald-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="truncate">{l.nativeName}</span>
                          {lang === l.code && <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.2 rounded text-white">✓</span>}
                        </div>
                        <span className={`text-[10px] font-normal shrink-0 ml-2 ${lang === l.code ? 'text-emerald-100' : 'text-slate-400'}`}>
                          {l.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 4. Notifications Bell */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative p-1.5 sm:p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shrink-0 active:scale-95"
            title={t.alerts}
          >
            <Bell className="w-4 h-4" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                {alertCount}
              </span>
            )}
          </button>

          {/* 5. PWA Install Button */}
          {!isInstalled && (
            <button
              type="button"
              onClick={promptInstall}
              title={t.installMobileApp || 'Install AGRO AI App'}
              className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-extrabold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700 animate-bounce" />
              <span className="hidden sm:inline">{t.install || 'Install'}</span>
            </button>
          )}

          {/* 6. User Account / Profile Tab */}
          {user ? (
            <div className="relative shrink-0" ref={userMenuRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserMenuOpen(prev => !prev);
                  setIsLangMenuOpen(false);
                }}
                className={`flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border transition-all cursor-pointer select-none shrink-0 active:scale-95 ${
                  isUserMenuOpen
                    ? 'bg-emerald-100 border-emerald-400 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-emerald-300'
                }`}
                title={getLocalizedUserName(user.name, lang)}
                aria-label="Open User Profile Menu"
                aria-expanded={isUserMenuOpen}
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
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {/* User Account Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  {/* Global Backdrop for outside click dismissal */}
                  <div
                    className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-2xs"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="fixed top-13 right-3 left-3 sm:left-auto sm:right-0 sm:absolute sm:top-full sm:mt-2 w-auto sm:w-76 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 space-y-3 z-50 text-slate-900 animate-in fade-in zoom-in-95 duration-150">
                    {/* Clickable user card -> opens profile */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsUserMenuOpen(false);
                        onNavigate('profile');
                      }}
                      className="w-full flex items-center gap-3 pb-3 border-b border-slate-100 text-left hover:bg-slate-50 -m-1 p-2 rounded-xl transition-colors cursor-pointer"
                    >
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-extrabold text-slate-900 truncate">{getLocalizedUserName(user.name, lang)}</h4>
                          <span className="text-[10px] text-emerald-700 font-bold hover:underline">{t.edit || 'View'} &rarr;</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{user.phone || user.email || (user.isGuest ? (t.guestFarmer || 'Guest Farmer') : (t.verifiedUser || 'Verified User'))}</p>
                        <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 uppercase">
                          {getLocalizedRole(user.role, lang) || (user.isGuest ? (t.guestMode || 'Guest Mode') : user.provider === 'phone' ? (t.phoneVerified || 'Phone Verified') : user.provider)}
                        </span>
                      </div>
                    </button>

                    {user.isGuest && onOpenLogin && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                          onOpenLogin();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{t.linkGoogleApple || 'Link Google / Apple Account'}</span>
                      </button>
                    )}

                    <div className="space-y-1 text-xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
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
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
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
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
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
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
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
