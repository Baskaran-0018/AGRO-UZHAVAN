import React from 'react';
import {
  LayoutDashboard,
  CloudSun,
  CalendarCheck,
  ScanLine,
  TrendingUp,
  Pill,
  Mic,
  Database,
  Cpu,
  Boxes,
  Map,
  FileText,
  Shield,
  Download,
  X,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { SupportedLang, TRANSLATIONS } from '../lib/i18n';
import { usePwa } from '../lib/pwa';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  lang: SupportedLang;
  onCloseMobile?: () => void;
  trainingRunning?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  lang,
  onCloseMobile,
  trainingRunning = false,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const { isInstalled, promptInstall } = usePwa();

  const NAV_SECTIONS = [
    {
      group: t.coreIntelligence || 'Smart Agriculture',
      items: [
        { id: 'dashboard', label: t.dashboard || 'Dashboard', icon: LayoutDashboard, badge: 'Live' },
        { id: 'weather', label: t.weatherPrediction || 'Weather & Forecast', icon: CloudSun, badge: 'Graphs' },
        { id: 'cropplanner', label: t.cropManagement || 'Crop Planner', icon: CalendarCheck },
        { id: 'diseasescanner', label: t.diseaseDetection || 'AI Leaf Doctor', icon: ScanLine, badge: 'Vision' },
        { id: 'yieldpredictor', label: t.yieldPrediction || 'Yield Estimator', icon: TrendingUp },
        { id: 'medicineguide', label: t.medicineGuide || 'Pesticide & Remedies', icon: Pill },
        { id: 'assistant', label: t.aiAssistant || 'Voice AI Advisor', icon: Mic, badge: 'Voice' },
      ]
    },
    {
      group: 'Tools & Analytics',
      items: [
        { id: 'datasetmanager', label: 'Dataset Manager', icon: Database },
        { id: 'modeltraining', label: 'ML Training Studio', icon: Cpu, badge: trainingRunning ? 'Training' : undefined },
        { id: 'modelzoo', label: 'Model Zoo', icon: Boxes },
        { id: 'map', label: 'GIS Farm Map', icon: Map },
        { id: 'reports', label: 'PDF Farm Reports', icon: FileText },
        { id: 'admin', label: 'System Admin', icon: Shield },
      ]
    }
  ];

  const handleItemClick = (id: string) => {
    onSelectView(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-72 shrink-0 border-r border-emerald-100 bg-white flex flex-col justify-between select-none shadow-sm h-full">
      {/* Mobile Drawer Header */}
      {onCloseMobile && (
        <div className="md:hidden flex items-center justify-between p-4 border-b border-emerald-100 bg-emerald-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-emerald-200 shadow-xs p-1 flex items-center justify-center shrink-0">
              <img
                src="/favicon.svg"
                alt="AGRO UZHAVAN"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 leading-none">AGRO UZHAVAN</h3>
              <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider mt-0.5">Intelligent Agriculture</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-emerald-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <div className="py-4 px-3 space-y-5 overflow-y-auto flex-1">
        {NAV_SECTIONS.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 text-[11px] font-bold tracking-wider text-emerald-800 uppercase">
              {section.group}
            </h4>
            <div className="space-y-0.5 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-bold'
                        : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/80 border border-transparent'
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
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : item.badge === 'Training'
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : 'bg-emerald-100 text-emerald-800'
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

      {/* Footer System Status & Install Button */}
      <div className="p-3 border-t border-emerald-100 bg-emerald-50/40 space-y-2">
        {!isInstalled && (
          <button
            onClick={() => {
              promptInstall();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install Mobile App (PWA)</span>
          </button>
        )}

        <div className="p-2.5 rounded-xl bg-white border border-emerald-100 text-[11px] text-slate-600 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.aiCoreOnline || 'AI Engine Online'}
            </span>
            <span className="text-[10px] text-emerald-600 font-mono font-bold">99.8%</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span>Vision & Climate ML</span>
            <span className="text-emerald-700 font-semibold">Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
