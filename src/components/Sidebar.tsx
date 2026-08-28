import React from 'react';
import {
  LayoutDashboard,
  CloudSun,
  CalendarCheck,
  ScanLine,
  TrendingUp,
  Pill,
  Mic,
  Activity
} from 'lucide-react';
import { SupportedLang, TRANSLATIONS } from '../lib/i18n';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  lang: SupportedLang;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const NAV_ITEMS = [
    {
      group: t.coreIntelligence || 'Smart Agriculture',
      items: [
        { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard, badge: 'Live' },
        { id: 'weather', label: t.weatherPrediction, icon: CloudSun, badge: 'Graphs' },
        { id: 'cropplanner', label: t.cropManagement, icon: CalendarCheck },
        { id: 'diseasescanner', label: t.diseaseDetection, icon: ScanLine, badge: 'AI Vision' },
        { id: 'yieldpredictor', label: t.yieldPrediction, icon: TrendingUp },
        { id: 'medicineguide', label: t.medicineGuide, icon: Pill },
        { id: 'assistant', label: t.aiAssistant, icon: Mic, badge: 'Voice' },
      ]
    }
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-emerald-100 bg-white flex flex-col justify-between select-none shadow-sm">
      <div className="py-4 px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-60px)]">
        {NAV_ITEMS.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="px-3 text-[11px] font-bold tracking-wider text-emerald-800 uppercase">
              {section.group}
            </h3>
            <div className="space-y-1 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectView(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : 'bg-emerald-100/80 text-emerald-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer System Status Banner */}
      <div className="p-3 border-t border-emerald-100 bg-emerald-50/50">
        <div className="p-3 rounded-xl bg-white border border-emerald-100 text-[11px] text-slate-600 space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.aiCoreOnline || 'AI Engine Online'}
            </span>
            <span className="text-[10px] text-emerald-600 font-mono font-bold">99.8%</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>Vision & Climate ML</span>
            <span className="text-emerald-700 font-semibold">Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
