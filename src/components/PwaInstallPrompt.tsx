import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  WifiOff,
  Sparkles,
  CheckCircle2,
  X,
  Share2,
  PlusSquare,
  Star,
  ShieldCheck,
  RefreshCw,
  Zap,
  Check
} from 'lucide-react';
import { usePwa } from '../lib/pwa';
import { SupportedLang, TRANSLATIONS } from '../lib/i18n';
import confetti from 'canvas-confetti';

interface PwaInstallPromptProps {
  lang: SupportedLang;
}

export const PwaInstallPrompt: React.FC<PwaInstallPromptProps> = ({ lang }) => {
  const { isInstallable, isInstalled, isOnline, hasUpdate, platform, promptInstall, updateApp } = usePwa();
  const [showPopup, setShowPopup] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Automatically show the mobile install popup after 2 seconds if not yet installed and not previously dismissed in this session
  useEffect(() => {
    if (isInstalled) return;

    const dismissed = sessionStorage.getItem('agro_pwa_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isInstalled]);

  // Listen for custom global event to trigger install popup from any button
  useEffect(() => {
    const handleOpenInstall = () => setShowPopup(true);
    window.addEventListener('agro:open-install-popup', handleOpenInstall);
    return () => window.removeEventListener('agro:open-install-popup', handleOpenInstall);
  }, []);

  const handleInstallClick = async () => {
    if (platform === 'ios') {
      // Keep popup open showing iOS instructions
      return;
    }

    const success = await promptInstall();
    if (success) {
      setInstalledSuccess(true);
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleDismiss = () => {
    setShowPopup(false);
    sessionStorage.setItem('agro_pwa_dismissed', 'true');
  };

  return (
    <>
      {/* 1. Offline Mode Alert Banner (Top of Screen) */}
      {!isOnline && (
        <div className="bg-amber-600 text-white px-3 py-2 text-xs font-semibold flex items-center justify-between shadow-md z-50 fixed top-0 left-0 right-0 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 max-w-4xl mx-auto w-full justify-center text-center">
            <WifiOff className="w-4 h-4 shrink-0 animate-pulse text-amber-200" />
            <span>
              <strong>Offline Mode Active:</strong> Operating without internet. Farm records, weather advisories & ML calculations remain fully accessible.
            </span>
          </div>
        </div>
      )}

      {/* 2. New Version Available Toast */}
      {hasUpdate && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-sm bg-slate-900 text-white border border-emerald-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex items-start gap-3 animate-in slide-in-from-bottom-5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-100">Update Available</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              A new version of AGRO AI with enhanced models is ready.
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

      {/* 3. Mobile PWA Installation Popup & Bottom Sheet */}
      {showPopup && !isInstalled && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-slate-900 border-t sm:border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl text-white space-y-4 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-6 duration-300">
            
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header: App Icon & Verified Badge */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 shrink-0 border border-emerald-400/30">
                <Smartphone className="w-7 h-7" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-[10px] font-black shadow">
                  ✓
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-extrabold text-white tracking-tight truncate">
                    AGRO AI
                  </h3>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider">
                    Official App
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium truncate">
                  Smart Farming & Weather Intelligence
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-amber-400 font-bold">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-300 text-[10px]">4.9 • 100% Free & Offline</span>
                </div>
              </div>
            </div>

            {/* Success Message if installed */}
            {installedSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-center space-y-2 animate-in zoom-in-95">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto font-bold">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-sm text-white">App Installed Successfully!</h4>
                <p className="text-xs text-emerald-300">
                  You can now launch AGRO AI directly from your mobile home screen.
                </p>
              </div>
            ) : (
              <>
                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-2">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100 block text-[11px]">Instant Launch</strong>
                      <span className="text-slate-400 text-[10px]">Zero loading time</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100 block text-[11px]">Works Offline</strong>
                      <span className="text-slate-400 text-[10px]">Use anywhere in field</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100 block text-[11px]">AI Leaf Doctor</strong>
                      <span className="text-slate-400 text-[10px]">Camera vision scan</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100 block text-[11px]">0 MB Storage</strong>
                      <span className="text-slate-400 text-[10px]">No app store hassle</span>
                    </div>
                  </div>
                </div>

                {/* Platform Specific Step Instructions */}
                {platform === 'ios' ? (
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                    <h4 className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>How to Install on iPhone / iPad</span>
                    </h4>
                    <ol className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0">1</span>
                        <span>
                          Tap the <strong className="text-white inline-flex items-center gap-1 px-1 rounded bg-slate-800"><Share2 className="w-3.5 h-3.5 text-blue-400" /> Share</strong> icon at the bottom of Safari.
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0">2</span>
                        <span>
                          Scroll down and tap <strong className="text-white inline-flex items-center gap-1 px-1 rounded bg-slate-800"><PlusSquare className="w-3.5 h-3.5 text-emerald-400" /> Add to Home Screen</strong>.
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0">3</span>
                        <span>
                          Tap <strong className="text-white">Add</strong> on the top right. Done!
                        </span>
                      </li>
                    </ol>
                  </div>
                ) : (
                  <div className="pt-1">
                    <button
                      onClick={handleInstallClick}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <Download className="w-5 h-5 text-slate-950" />
                      <span>Install App on Device (1-Tap)</span>
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Footer Dismiss Link */}
            <div className="text-center pt-1">
              <button
                onClick={handleDismiss}
                className="text-xs text-slate-400 hover:text-white underline transition-colors cursor-pointer"
              >
                Continue in browser
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
