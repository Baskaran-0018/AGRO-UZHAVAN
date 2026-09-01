import React from 'react';
import {
  LayoutDashboard,
  CloudSun,
  ScanLine,
  CalendarCheck,
  Menu,
  Sparkles
} from 'lucide-react';
import { SupportedLang, TRANSLATIONS } from '../lib/i18n';

interface MobileBottomNavProps {
  currentView: string;
  onSelectView: (view: string) => void;
  onOpenMenu: () => void;
  lang: SupportedLang;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onSelectView,
  onOpenMenu,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const isScanActive = currentView === 'diseasescanner';

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-emerald-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-bottom"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {/* 1. Dashboard */}
        <button
          onClick={() => onSelectView('dashboard')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all cursor-pointer ${
            currentView === 'dashboard'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              currentView === 'dashboard' ? 'bg-emerald-100 text-emerald-700' : ''
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[56px]">
            {t.dashboard || 'Home'}
          </span>
        </button>

        {/* 2. Weather */}
        <button
          onClick={() => onSelectView('weather')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all cursor-pointer ${
            currentView === 'weather'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              currentView === 'weather' ? 'bg-emerald-100 text-emerald-700' : ''
            }`}
          >
            <CloudSun className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[56px]">
            {t.weatherPrediction || 'Weather'}
          </span>
        </button>

        {/* 3. Central Floating AI Scan Button */}
        <div className="relative -top-4 flex flex-col items-center">
          <button
            onClick={() => onSelectView('diseasescanner')}
            className={`relative flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-600/40 border-4 border-slate-950 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              isScanActive ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950 scale-105' : ''
            }`}
            title={t.scanPlantLeaf || 'Scan Plant Leaf Disease'}
          >
            <ScanLine className="w-6 h-6 animate-pulse" />
          </button>
          <span className="text-[10px] font-extrabold text-emerald-600 mt-1 tracking-tight">
            {t.aiScan || 'AI Scan'}
          </span>
        </div>

        {/* 4. Crop Planner */}
        <button
          onClick={() => onSelectView('cropplanner')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all cursor-pointer ${
            currentView === 'cropplanner'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              currentView === 'cropplanner' ? 'bg-emerald-100 text-emerald-700' : ''
            }`}
          >
            <CalendarCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[56px]">
            {t.crops || t.cropManagement || 'Crops'}
          </span>
        </button>

        {/* 5. More / Menu Drawer Toggle */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center w-14 py-1 rounded-xl text-slate-500 hover:text-emerald-700 transition-all cursor-pointer"
        >
          <div className="p-1 rounded-lg">
            <Menu className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[56px]">
            {t.more || t.menu || 'More'}
          </span>
        </button>
      </div>
    </nav>
  );
};
