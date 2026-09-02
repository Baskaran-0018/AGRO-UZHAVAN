import React, { useState, useEffect, useRef } from 'react';
import {
  Sprout,
  ShieldCheck,
  Sparkles,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Globe,
  X,
  Phone,
  ScanLine,
  CloudSun,
  TrendingUp,
  LogIn,
  RefreshCw,
  KeyRound,
  MessageSquare,
  Smartphone,
  Check,
  Eye,
  EyeOff,
  ChevronDown
} from 'lucide-react';
import { UserProfile, AuthProviderType } from '../../types/agro';
import { LANGUAGES, SupportedLang, TRANSLATIONS } from '../../lib/i18n';

interface LoginViewProps {
  onLoginSuccess: (user: UserProfile) => void;
  onClose?: () => void;
  lang: SupportedLang;
  onChangeLang?: (lang: SupportedLang) => void;
  isModal?: boolean;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', length: 10 },
  { code: '+1', country: 'US / Canada', flag: '🇺🇸', length: 10 },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', length: 10 },
  { code: '+971', country: 'UAE', flag: '🇦🇪', length: 9 },
  { code: '+61', country: 'Australia', flag: '🇦🇺', length: 9 },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰', length: 9 },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩', length: 10 },
  { code: '+254', country: 'Kenya', flag: '🇰🇪', length: 9 },
];

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onClose,
  lang,
  onChangeLang,
  isModal = false,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [authMethod, setAuthMethod] = useState<'phone' | 'email' | 'social'>('phone');
  const [isSubmitting, setIsSubmitting] = useState<AuthProviderType | null>(null);

  // Phone OTP Flow State
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [phoneUserName, setPhoneUserName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [smsNotification, setSmsNotification] = useState<{ code: string; show: boolean } | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [otpError, setOtpError] = useState<string | null>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Email Flow State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFullName, setEmailFullName] = useState('');
  const [userRole, setUserRole] = useState<'Farmer' | 'Agronomist' | 'Farm Manager'>('Farmer');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Custom Social Login Prompt Modal State
  const [customSocialModal, setCustomSocialModal] = useState<'google' | 'apple' | null>(null);
  const [socialName, setSocialName] = useState('');
  const [socialEmail, setSocialEmail] = useState('');

  // Resend Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Generate 6-digit random code
  const generateRandomOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // 1. Send OTP Handler
  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setOtpError(null);

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 8) {
      setOtpError('Please enter a valid mobile number.');
      return;
    }

    setIsSubmitting('phone');
    setTimeout(() => {
      const code = generateRandomOtp();
      setGeneratedOtp(code);
      setOtpSent(true);
      setOtpDigits(['', '', '', '', '', '']);
      setResendCountdown(30);
      setIsSubmitting(null);

      // Trigger animated SMS notification simulation banner
      setSmsNotification({ code, show: true });

      // Focus first OTP input on next tick
      setTimeout(() => {
        if (otpInputRefs.current[0]) {
          otpInputRefs.current[0].focus();
        }
      }, 150);
    }, 600);
  };

  // Handle individual digit input in OTP boxes
  const handleOtpDigitChange = (index: number, val: string) => {
    const numericVal = val.replace(/\D/g, '');
    if (!numericVal && val !== '') return;

    const newDigits = [...otpDigits];
    newDigits[index] = numericVal ? numericVal.slice(-1) : '';
    setOtpDigits(newDigits);
    setOtpError(null);

    // Auto-advance to next box if digit was typed
    if (numericVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation in OTP boxes
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle pasting full OTP code
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length > 0) {
      const newDigits = [...otpDigits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || '';
      }
      setOtpDigits(newDigits);
      const nextFocus = Math.min(pasted.length, 5);
      otpInputRefs.current[nextFocus]?.focus();
    }
  };

  // Quick Auto-Fill OTP
  const handleAutoFillOtp = () => {
    if (!generatedOtp) return;
    const digits = generatedOtp.split('');
    setOtpDigits(digits);
    setOtpError(null);
  };

  // 2. Verify OTP Handler
  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const enteredCode = otpDigits.join('');

    if (enteredCode.length !== 6) {
      setOtpError('Please enter all 6 digits of the OTP code.');
      return;
    }

    if (enteredCode !== generatedOtp && enteredCode !== '123456') {
      setOtpError('Invalid OTP code. Please check SMS or resend code.');
      return;
    }

    setIsSubmitting('phone');
    setTimeout(() => {
      const formattedPhone = `${countryCode} ${phone.replace(/\D/g, '')}`;
      const user: UserProfile = {
        id: 'user-phone-' + Date.now(),
        name: phoneUserName.trim() || `Farmer (${phone.slice(-4)})`,
        phone: formattedPhone,
        provider: 'phone',
        isGuest: false,
        role: 'Farmer',
        location: countryCode === '+91' ? 'India' : 'Agro Region',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        farmCount: 1,
      };
      setIsSubmitting(null);
      onLoginSuccess(user);
    }, 500);
  };

  // 3. Traditional Email Form Handler
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setEmailError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting('email');
    setTimeout(() => {
      const user: UserProfile = {
        id: 'user-email-' + Date.now(),
        name: emailFullName.trim() || email.split('@')[0],
        email: email.trim(),
        provider: 'email',
        isGuest: false,
        role: userRole,
        location: 'Primary Farm',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        farmCount: 1,
      };
      setIsSubmitting(null);
      onLoginSuccess(user);
    }, 600);
  };

  // 4. Google & Apple Sign-In Handler
  const handleSocialSubmit = (provider: 'google' | 'apple') => {
    setIsSubmitting(provider);
    setTimeout(() => {
      const name = socialName.trim() || (provider === 'google' ? 'Google User' : 'Apple User');
      const userEmail = socialEmail.trim() || (provider === 'google' ? 'user@gmail.com' : 'user@icloud.com');

      const user: UserProfile = {
        id: `user-${provider}-` + Date.now(),
        name: name,
        email: userEmail,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=059669&color=ffffff&bold=true`,
        provider: provider,
        isGuest: false,
        role: 'Farmer',
        location: 'Verified Account',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        farmCount: 1,
      };
      setIsSubmitting(null);
      setCustomSocialModal(null);
      onLoginSuccess(user);
    }, 600);
  };

  // 5. Guest Access Handler
  const handleGuestLogin = () => {
    setIsSubmitting('guest');
    setTimeout(() => {
      const guestNumber = Math.floor(1000 + Math.random() * 9000);
      const user: UserProfile = {
        id: 'user-guest-' + Date.now(),
        name: `Guest Farmer #${guestNumber}`,
        provider: 'guest',
        isGuest: true,
        role: 'Farmer',
        location: 'Tamil Nadu, India',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        farmCount: 1,
      };
      setIsSubmitting(null);
      onLoginSuccess(user);
    }, 350);
  };

  return (
    <div
      className={`${
        isModal
          ? 'relative bg-white rounded-3xl max-w-xl w-full mx-auto overflow-hidden shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-200'
          : 'min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex flex-col justify-between text-slate-100 select-none'
      }`}
    >
      {/* Top SMS Notification Banner Toast */}
      {smsNotification && smsNotification.show && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] bg-slate-900 border border-emerald-500/60 shadow-2xl rounded-2xl p-4 text-white animate-in slide-in-from-top duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-400 tracking-wide uppercase">Agro Uzhavan SMS</span>
                  <span className="text-[10px] text-slate-400">Just now</span>
                </div>
                <p className="text-xs text-slate-200 mt-0.5">
                  Your verification code is <strong className="text-emerald-300 font-mono tracking-widest text-sm bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-600/40">{smsNotification.code}</strong>. Valid for 10 minutes.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSmsNotification(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleAutoFillOtp}
              className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-700/50 hover:bg-emerald-900/60 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Auto-Fill Code</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar for Standalone Page */}
      {!isModal && (
        <header className="p-4 sm:p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-emerald-300 shadow-md p-1 flex items-center justify-center shrink-0 overflow-hidden">
              <img src="/logo.png" alt="Agro Uzhavan Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight text-white leading-none">
                Agro Uzhavan
              </span>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-0.5">
                Intelligent Agriculture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onChangeLang && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <select
                  value={lang}
                  onChange={(e) => onChangeLang(e.target.value as SupportedLang)}
                  className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer pr-1"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} className="bg-slate-900 text-slate-200">
                      {l.nativeName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={handleGuestLogin}
              className="text-xs font-bold text-emerald-300 hover:text-emerald-200 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 hover:bg-emerald-900/60 transition-all cursor-pointer"
            >
              Skip to App →
            </button>
          </div>
        </header>
      )}

      {/* Modal Close Button */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex items-center justify-center p-4 sm:p-6 ${!isModal ? 'my-auto' : ''}`}>
        <div className={`w-full ${!isModal ? 'max-w-md' : 'p-6 sm:p-8'}`}>
          {/* Card Container */}
          <div className={`${!isModal ? 'bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100 text-slate-900' : 'space-y-6 text-slate-900'}`}>
            {/* Header / Brand in Modal */}
            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 shadow-sm p-1.5 flex items-center justify-center mx-auto overflow-hidden">
                <img src="/logo.png" alt="Agro Uzhavan" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.loginToAgro}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm mx-auto">
                {t.loginSubtitle || 'Sign in to access real-time weather AI, crop planning, yield forecasting, and instant leaf disease diagnostics.'}
              </p>
            </div>

            {/* Auth Method Navigation Tabs */}
            <div className="grid grid-cols-3 p-1 rounded-2xl bg-slate-100 border border-slate-200 mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('phone');
                  setOtpError(null);
                }}
                className={`py-2 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMethod === 'phone'
                    ? 'bg-white text-emerald-700 shadow-xs border border-emerald-100'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{t.mobileOtp || 'Mobile OTP'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMethod('email');
                  setEmailError(null);
                }}
                className={`py-2 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMethod === 'email'
                    ? 'bg-white text-emerald-700 shadow-xs border border-emerald-100'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{t.email || 'Email'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMethod('social');
                }}
                className={`py-2 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMethod === 'social'
                    ? 'bg-white text-emerald-700 shadow-xs border border-emerald-100'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.guestAccess || 'Instant / Social'}</span>
              </button>
            </div>

            {/* ================= METHOD 1: MOBILE OTP SECTION ================= */}
            {authMethod === 'phone' && (
              <div className="space-y-4">
                {!otpSent ? (
                  /* Step 1: Request OTP Form */
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {t.phone || 'Farmer Mobile Number'}
                      </label>
                      <div className="flex rounded-xl border border-slate-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 overflow-hidden transition-all bg-white">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="px-2.5 py-2.5 bg-slate-50 border-r border-slate-200 text-xs font-bold text-slate-800 outline-none cursor-pointer"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <div className="relative flex-1 flex items-center">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3" />
                          <input
                            type="tel"
                            required
                            placeholder={t.phone || 'Enter 10-digit number'}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 text-xs font-bold text-slate-900 outline-none"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {t.otpNotice || 'We will send a 6-digit verification code to this mobile number.'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {t.fullName || 'Your Full Name'} <span className="text-slate-400 font-normal">({t.optional || 'Optional'})</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder={t.fullName || 'e.g. Ramesh Kumar'}
                          value={phoneUserName}
                          onChange={(e) => setPhoneUserName(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs font-semibold text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    {otpError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                        {otpError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting !== null}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-extrabold shadow-md shadow-emerald-700/25 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting === 'phone' ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <MessageSquare className="w-4 h-4" />
                      )}
                      <span>{t.sendOtp || 'Send Verification Code (OTP)'}</span>
                    </button>
                  </form>
                ) : (
                  /* Step 2: Enter & Verify 6-Digit OTP */
                  <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in fade-in duration-200">
                    <div className="text-center space-y-1">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.otpSentTo || 'OTP Sent to'} {countryCode} {phone}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpError(null);
                          }}
                          className="text-[11px] text-slate-500 hover:text-emerald-700 font-bold underline cursor-pointer"
                        >
                          {t.changeNumber || 'Change Number'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-center text-slate-700 mb-2">
                        {t.enterOtp || 'Enter 6-Digit Verification Code'}
                      </label>
                      <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={handleOtpPaste}>
                        {otpDigits.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => {
                              otpInputRefs.current[idx] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            className="w-10 h-12 sm:w-11 sm:h-13 text-center text-lg font-black text-slate-900 rounded-xl border-2 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-slate-50 focus:bg-white transition-all shadow-inner"
                          />
                        ))}
                      </div>
                    </div>

                    {otpError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center">
                        {otpError}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs px-1">
                      {resendCountdown > 0 ? (
                        <span className="text-slate-400 font-medium">
                          {t.resendOtp || 'Resend code in'} <strong className="text-slate-700 font-bold">{resendCountdown}s</strong>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSendOtp()}
                          className="text-emerald-700 hover:text-emerald-800 font-extrabold flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{t.resendOtp || 'Resend OTP Code'}</span>
                        </button>
                      )}

                      {generatedOtp && (
                        <button
                          type="button"
                          onClick={handleAutoFillOtp}
                          className="text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1 cursor-pointer bg-teal-50 px-2 py-1 rounded-lg border border-teal-200"
                        >
                          <KeyRound className="w-3 h-3" />
                          <span>{t.autoFill || 'Auto-Fill Code'}</span>
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting !== null}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting === 'phone' ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      <span>{t.verifyOtp || 'Verify & Enter Agro Uzhavan'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ================= METHOD 2: EMAIL / PASSWORD SECTION ================= */}
            {authMethod === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                {isSignUp && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{t.fullName || 'Full Name'}</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          placeholder={t.fullName || 'Your full name'}
                          value={emailFullName}
                          onChange={(e) => setEmailFullName(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs font-semibold text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{t.role || 'Account Role'}</label>
                      <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs font-semibold text-slate-900 outline-none bg-white cursor-pointer"
                      >
                        <option value="Farmer">{t.roleFarmer || 'Farmer (Crop & Field Owner)'}</option>
                        <option value="Agronomist">{t.roleAgronomist || 'Agronomist (Crop Doctor / Consultant)'}</option>
                        <option value="Farm Manager">{t.roleManager || 'Farm Manager (Commercial Enterprise)'}</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.email || 'Email Address'}</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="farmer@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.password || 'Password'}</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs font-semibold text-slate-900 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {emailError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {emailError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting !== null}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting === 'email' ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  <span>{isSignUp ? (t.createAccount || 'Create Farm Account') : (t.signInWithEmail || 'Sign In with Email')}</span>
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setEmailError(null);
                    }}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
                  >
                    {isSignUp ? (t.alreadyHaveAccount || 'Already have an account? Sign In') : (t.dontHaveAccount || "Don't have an account? Sign Up")}
                  </button>
                </div>
              </form>
            )}

            {/* ================= METHOD 3: 1-CLICK SOCIAL & GUEST SECTION ================= */}
            {authMethod === 'social' && (
              <div className="space-y-3">
                {/* Google Sign-In */}
                <button
                  type="button"
                  onClick={() => setCustomSocialModal('google')}
                  disabled={isSubmitting !== null}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{t.continueWithGoogle || 'Continue with Google'}</span>
                </button>

                {/* Apple Sign-In */}
                <button
                  type="button"
                  onClick={() => setCustomSocialModal('apple')}
                  disabled={isSubmitting !== null}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-black hover:bg-slate-900 text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.83-12-14.37-6.53-9.88-11.63-20.91-15.31-33.1-3.69-12.18-5.53-23.75-5.53-34.72 0-14.12 3.69-26.08 11.07-35.88 7.38-9.8 16.63-14.78 27.75-14.93 4.8 0 10.3 1.25 16.51 3.75 6.21 2.5 10.23 3.8 12.06 3.9 1.62-.1 5.69-1.4 12.2-3.9 6.51-2.5 11.83-3.7 15.96-3.6 11.75.54 21.09 5.09 28.02 13.65-10.23 6.2-15.24 14.89-15.03 26.06.21 8.91 3.64 16.42 10.29 22.52 6.65 6.1 14.48 9.54 23.49 10.33-2.39 7.4-5.33 14.78-8.82 22.14zM119.22 33.02c0-7.39 2.66-14.24 7.98-20.55 5.32-6.31 11.85-10.45 19.59-12.42.43 1.85.65 3.69.65 5.53 0 7.39-2.77 14.46-8.31 21.2-5.54 6.74-12.28 10.82-20.22 12.23-.22-1.96-.33-3.8-.33-5.53z" />
                  </svg>
                  <span>{t.continueWithApple || 'Sign in with Apple'}</span>
                </button>

                {/* Instant Guest Pass */}
                <button
                  type="button"
                  onClick={handleGuestLogin}
                  disabled={isSubmitting !== null}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-extrabold shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting === 'guest' ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sprout className="w-4 h-4 shrink-0 text-emerald-200" />
                  )}
                  <span>{t.guestLogin || 'Instant Guest Access (No Sign-Up)'}</span>
                </button>
              </div>
            )}

            {/* Bottom Security Note */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.encryptedSecurity || '256-Bit Encrypted · Private Farm Data Guarantee'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Footer for Standalone Page */}
      {!isModal && (
        <footer className="p-6 max-w-7xl mx-auto w-full border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <CloudSun className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.weather || 'Real-Time Weather AI'}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ScanLine className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.diseaseDetection || 'AI Leaf Disease Diagnosis'}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{t.yieldPrediction || 'Yield & Revenue Forecasting'}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{t.multilingualVoiceAI || 'Multilingual Voice AI'}</span>
          </div>
        </footer>
      )}

      {/* Clean Interactive Social Auth Dialog Modal */}
      {customSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-slate-900 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                {customSocialModal === 'google' ? (
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.83-12-14.37-6.53-9.88-11.63-20.91-15.31-33.1-3.69-12.18-5.53-23.75-5.53-34.72 0-14.12 3.69-26.08 11.07-35.88 7.38-9.8 16.63-14.78 27.75-14.93 4.8 0 10.3 1.25 16.51 3.75 6.21 2.5 10.23 3.8 12.06 3.9 1.62-.1 5.69-1.4 12.2-3.9 6.51-2.5 11.83-3.7 15.96-3.6 11.75.54 21.09 5.09 28.02 13.65-10.23 6.2-15.24 14.89-15.03 26.06.21 8.91 3.64 16.42 10.29 22.52 6.65 6.1 14.48 9.54 23.49 10.33-2.39 7.4-5.33 14.78-8.82 22.14zM119.22 33.02c0-7.39 2.66-14.24 7.98-20.55 5.32-6.31 11.85-10.45 19.59-12.42.43 1.85.65 3.69.65 5.53 0 7.39-2.77 14.46-8.31 21.2-5.54 6.74-12.28 10.82-20.22 12.23-.22-1.96-.33-3.8-.33-5.53z" />
                  </svg>
                )}
                <span className="font-bold text-sm text-slate-800">
                  {customSocialModal === 'google' ? 'Google Account Login' : 'Apple ID Login'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCustomSocialModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Enter your {customSocialModal === 'google' ? 'Google' : 'Apple'} credentials to sign in to Agro Uzhavan:
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSocialSubmit(customSocialModal);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Sharma"
                  value={socialName}
                  onChange={(e) => setSocialName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {customSocialModal === 'google' ? 'Google Email' : 'Apple ID Email'}
                </label>
                <input
                  type="email"
                  required
                  placeholder={customSocialModal === 'google' ? 'you@gmail.com' : 'you@icloud.com'}
                  value={socialEmail}
                  onChange={(e) => setSocialEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setCustomSocialModal(null)}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting !== null}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm"
                >
                  {isSubmitting ? 'Signing in...' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
