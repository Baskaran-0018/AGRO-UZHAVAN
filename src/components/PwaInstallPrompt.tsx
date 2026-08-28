import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  WifiOff,
  Wifi,
  Sparkles,
  CheckCircle2,
  X,
  Share2,
  PlusSquare,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { usePwa } from '../lib/pwa';
import { SupportedLang, TRANSLATIONS } from '../lib/i18n';

interface PwaInstallPromptProps {
  lang: SupportedLang;
}

export const PwaInstallPrompt: React.FC<PwaInstallPromptProps> = ({ lang }) => {
  const { isInstallable, isInstalled, isOnline, hasUpdate, platform, promptInstall, updateApp } = usePwa();
  const [showModal, setShowModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const handleInstallClick = async () => {
    if (platform === 'ios') {
      setShowModal(true);
      return;
    }

    const success = await promptInstall();
    if (!success && !isInstalled) {
      // Fallback: show manual install guide modal
      setShowModal(true);
    }
  };

  return (
    <>
      {/* 1. Offline Network Status Banner (Crucial for agricultural field workers) */}
      {!isOnline && (
        <div className="bg-amber-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-md z-50 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 max-w-4xl mx-auto w-full justify-center">
            <WifiOff className="w-4 h-4 shrink-0 animate-pulse text-amber-200" />
            <span>
              <strong>Offline Mode Active:</strong> You are working without internet. Cached farm weather, crop schedules, and ML models remain fully accessible.
            </span>
          </div>
        </div>
      )}

      {/* 2. New Version Update Toast */}
      {hasUpdate && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 text-white border border-emerald-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-lg flex items-start gap-3 animate-in slide-in-from-bottom-5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-100">Update Available</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              A newer version of AGRO AI with upgraded models is available.
            </p>
            <button
              onClick={updateApp}
              className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Update Now
            </button>
          </div>
        </div>
      )}

      {/* 3. Sleek Floating Install Banner (If not installed and not dismissed) */}
      {!isInstalled && !bannerDismissed && (
        <aside
          aria-label="PWA install banner"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-40 bg-slate-900/95 border border-emerald-500/30 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl text-white flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-500"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs tracking-tight text-white truncate">
                  Install AGRO AI App
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                  PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate">
                Instant access & offline smart farm features
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
            <button
              onClick={() => setBannerDismissed(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* 4. Detailed Installation Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl text-white space-y-5">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-xl shadow-emerald-500/25">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold tracking-tight text-white">
                  Install AGRO AI Progressive Web App
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  Run directly on your Home Screen with zero app store downloads
                </p>
              </div>
            </div>

            {/* PWA Perks Grid */}
            <div className="grid grid-cols-2 gap-2.5 py-1">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Works 100% Offline</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Access crop calendars & AI advice even without cellular signal.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ultra Fast (Instant)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Instant launch from home screen with zero latency.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Full Screen UI</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Clean native app layout without browser address bars.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Weather Alerts</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Receive frost, rainfall, and storm push notifications.
                </p>
              </div>
            </div>

            {/* Platform-Specific Step-by-Step Instructions */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                {platform === 'ios' ? 'How to install on iOS / Safari' : 'Installation Instructions'}
              </h4>

              {platform === 'ios' ? (
                <ol className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold shrink-0">
                      1
                    </span>
                    <span>
                      Tap the <strong className="text-white inline-flex items-center gap-1"><Share2 className="w-3.5 h-3.5 text-emerald-400" /> Share</strong> button in Safari's bottom toolbar.
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold shrink-0">
                      2
                    </span>
                    <span>
                      Scroll down and tap <strong className="text-white inline-flex items-center gap-1"><PlusSquare className="w-3.5 h-3.5 text-emerald-400" /> Add to Home Screen</strong>.
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold shrink-0">
                      3
                    </span>
                    <span>
                      Tap <strong className="text-white">Add</strong> in the top right. Launch AGRO AI anytime from your Home screen!
                    </span>
                  </li>
                </ol>
              ) : (
                <ol className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold shrink-0">
                      1
                    </span>
                    <span>
                      Click the <strong className="text-white">"Install Now"</strong> button below or the install icon in your browser URL bar.
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold shrink-0">
                      2
                    </span>
                    <span>
                      Confirm the installation prompt when prompted by your browser.
                    </span>
                  </li>
                </ol>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
              {platform !== 'ios' && (
                <button
                  onClick={async () => {
                    await promptInstall();
                    setShowModal(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Install Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
