import React from 'react';
import {
  LayoutDashboard,
  CloudSun,
  Sprout,
  ShieldCheck,
  CircleDollarSign,
  Pill,
  Bot,
  CalendarDays,
  Info,
  X,
  Smartphone,
  Globe,
  Zap
} from 'lucide-react';
import { SupportedLang, TRANSLATIONS, LANGUAGES } from '../lib/i18n';
import { usePwa } from '../lib/pwa';
import { translateText } from '../lib/universalTranslator';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  lang: SupportedLang;
  onChangeLang?: (lang: SupportedLang) => void;
  onCloseMobile?: () => void;
  trainingRunning?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  lang,
  onChangeLang,
  onCloseMobile,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const { isInstalled, promptInstall } = usePwa();

  const NAV_ITEMS = [
    {
      id: 'dashboard',
      label: t.dashboard || 'Dashboard',
      subText: 'Smart Center',
      icon: LayoutDashboard,
      isPrimaryWood: true,
    },
    {
      id: 'weather',
      label: t.weatherPrediction || 'Weather Advisory',
      subText: 'Rain & Climate',
      icon: CloudSun,
    },
    {
      id: 'cropplanner',
      label: t.cropManagement || 'Crop Planner',
      subText: 'Stages & Sowing',
      icon: Sprout,
    },
    {
      id: 'diseasescanner',
      label: t.diseaseDetection || 'Disease Diagnostics',
      subText: 'AI Leaf Scan',
      icon: ShieldCheck,
    },
    {
      id: 'yieldpredictor',
      label: t.yieldPrediction || 'Yield & Profit',
      subText: 'Net Margin & Return',
      icon: CircleDollarSign,
    },
    {
      id: 'medicineguide',
      label: t.medicineGuide || 'Treatment Guide',
      subText: 'Organic Remedies',
      icon: Pill,
    },
    {
      id: 'assistant',
      label: t.aiAssistant || 'Agronomy Assistant',
      subText: 'Voice AI Help',
      icon: Bot,
    },
    {
      id: 'map',
      label: translateText('Weather Planner', lang) || 'Weather Planner',
      subText: 'Field Operations',
      icon: CalendarDays,
    },
    {
      id: 'profile',
      label: t.farmerProfile || 'About Us',
      subText: 'Agro Uzhavan Core',
      icon: Info,
    },
  ];

  const handleItemClick = (id: string) => {
    onSelectView(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="cyber-tree-sidebar flex flex-col justify-between py-3 select-none relative z-20 h-full">
      {/* Mobile Drawer Header */}
      {onCloseMobile && (
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-emerald-100 bg-emerald-50/80 z-30 relative">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white border border-emerald-200 shadow-xs p-0.5 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src="/logo.png"
                alt="Agro Uzhavan"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 leading-none">Agro Uzhavan</h3>
              <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider mt-0.5">
                {t.intelligentAgriculture || 'Intelligent Agriculture'}
              </p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-emerald-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Background Cybernetic Tree SVG with Gnarled Trunk, Branches & Glowing Circuits */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 310 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="trunkBarkBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22130a" />
            <stop offset="20%" stopColor="#3d2112" />
            <stop offset="45%" stopColor="#5a331c" />
            <stop offset="65%" stopColor="#8c5a36" />
            <stop offset="85%" stopColor="#422514" />
            <stop offset="100%" stopColor="#1e1008" />
          </linearGradient>

          <linearGradient id="twistStrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#734729" />
            <stop offset="50%" stopColor="#4a2a16" />
            <stop offset="100%" stopColor="#24130a" />
          </linearGradient>

          <linearGradient id="cyberCircuitGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00cc66" />
            <stop offset="50%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#39ff14" />
          </linearGradient>
        </defs>

        {/* Spreading Roots */}
        <g id="tree-roots" fill="url(#trunkBarkBase)">
          <path d="M 80 900 C 110 840 150 820 190 770 L 310 770 L 310 900 Z" />
          <path d="M 40 900 Q 100 860 140 820 Q 180 780 200 730 L 310 730 L 310 900 Z" opacity="0.9" />
        </g>

        {/* Main Gnarled Tree Trunk */}
        <g id="gnarled-main-trunk">
          <path
            d="M 210 0 C 160 110 270 230 185 380 C 120 500 240 650 190 800 C 170 850 220 900 310 900 L 310 0 Z"
            fill="url(#trunkBarkBase)"
          />
          <path
            d="M 210 0 C 180 40 160 70 120 80 L 120 95 C 160 85 185 55 220 0 Z"
            fill="url(#twistStrandGrad)"
          />
          <path
            d="M 210 110 C 170 140 160 190 200 230 C 240 270 250 330 200 380 C 160 420 180 480 220 520 Z"
            fill="url(#twistStrandGrad)"
          />
        </g>

        {/* Tree Branches Extending to Left Badges */}
        <g id="tree-branches" fill="none" stroke="url(#twistStrandGrad)" strokeLinecap="round">
          <path d="M 175 72 C 140 70 110 50 70 48" strokeWidth="12" />
          <path d="M 160 138 Q 115 142 80 145" strokeWidth="10" />
          <path d="M 170 212 Q 120 216 80 220" strokeWidth="9" />
          <path d="M 185 288 Q 130 292 80 295" strokeWidth="9" />
          <path d="M 195 362 Q 135 366 80 370" strokeWidth="8" />
          <path d="M 210 438 Q 140 442 80 445" strokeWidth="8" />
          <path d="M 200 512 Q 135 516 80 520" strokeWidth="8" />
          <path d="M 190 588 Q 130 592 80 595" strokeWidth="7" />
          <path d="M 185 662 Q 125 666 80 670" strokeWidth="7" />
        </g>

        {/* Glowing Circuit Lines */}
        <g id="cyber-circuits" stroke="url(#cyberCircuitGrad)" strokeWidth="2.5" fill="none" className="circuit-trace">
          <path d="M 220 870 L 220 780 L 200 730 L 230 640 L 210 550 L 240 470 L 220 390 L 230 330 L 205 240 L 225 150 L 210 80" />
          <circle cx="210" cy="80" r="3.5" fill="#00ff88" className="circuit-node" />
          <circle cx="205" cy="240" r="3.5" fill="#00ff88" className="circuit-node" />
          <circle cx="220" cy="390" r="3.5" fill="#00ff88" className="circuit-node" />
          <circle cx="210" cy="550" r="3.5" fill="#00ff88" className="circuit-node" />
        </g>
      </svg>

      {/* Navigation Leaf Menu Nodes */}
      <nav className="flex-1 px-3 space-y-2 relative z-10 flex flex-col justify-start pt-2 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          // Padding right steps to match branch curvature
          const prClasses = [
            'pr-6',
            'pr-10',
            'pr-12',
            'pr-14',
            'pr-16',
            'pr-16',
            'pr-14',
            'pr-12',
            'pr-10',
          ];
          const prClass = prClasses[index] || 'pr-8';

          if (item.id === 'dashboard') {
            return (
              <div key={item.id} className={prClass} onClick={() => handleItemClick(item.id)}>
                <div
                  className={`dashboard-wood-badge ${isActive ? 'active' : ''} p-2.5 flex items-center justify-between cursor-pointer transition-all`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 border border-emerald-400/40">
                      <Icon className="w-4 h-4 text-emerald-300" />
                    </div>
                    <span className="text-xs font-black text-white tracking-wide">{item.label}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
              </div>
            );
          }

          return (
            <div key={item.id} className={prClass} onClick={() => handleItemClick(item.id)}>
              <div className={`tree-leaf-badge ${isActive ? 'active' : ''}`}>
                <div className="leaf-icon-box">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="leaf-label-text text-xs font-bold text-emerald-950 truncate">
                    {item.label}
                  </span>
                  <span className="leaf-sub-text text-[9px] text-emerald-700 font-semibold truncate">
                    {item.subText}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom Footer Status & Controls */}
      <div className="px-3 pt-2 relative z-10 border-t border-gray-200/80 space-y-2">
        {onChangeLang && (
          <div className="p-2 rounded-xl bg-white/90 backdrop-blur-xs border border-emerald-200/80 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 px-1">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-emerald-600" />
                {t.chooseLanguage || 'Language'}
              </span>
              <span className="text-[9px] text-emerald-700 font-bold uppercase">
                {LANGUAGES.find((l) => l.code === lang)?.nativeName}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 pt-0.5">
              {LANGUAGES.slice(0, 6).map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    onChangeLang(l.code);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`px-1 py-0.5 rounded-md text-[9px] font-bold truncate transition-colors cursor-pointer text-center ${
                    lang === l.code
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                  }`}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>
          </div>
        )}

        {!isInstalled && (
          <button
            onClick={() => {
              promptInstall();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] font-extrabold shadow-sm transition-all cursor-pointer"
          >
            <Smartphone className="w-3 h-3" />
            <span>{t.installMobileApp || 'Install PWA'}</span>
          </button>
        )}

        {/* Bio-Cyber Tree Status */}
        <div className="flex items-center justify-between text-[10px] text-emerald-800 font-bold bg-emerald-50/90 p-2 rounded-xl border border-emerald-200/60 shadow-2xs">
          <span className="flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-600 animate-pulse fill-emerald-500" />
            <span>Bio-Cyber Tree Active</span>
          </span>
          <span className="bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded text-[8px] uppercase font-mono font-bold">
            v4.3
          </span>
        </div>
      </div>
    </aside>
  );
};
