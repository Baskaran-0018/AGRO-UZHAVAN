import React, { useState } from 'react';
import { X, Bell, AlertTriangle, CloudRain, Thermometer, Droplets, ShieldAlert, Smartphone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { WeatherAlert } from '../types/agro';
import { SupportedLang, TRANSLATIONS } from '../lib/i18n';
import { translateText } from '../lib/universalTranslator';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: WeatherAlert[];
  lang: SupportedLang;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  alerts,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [channel, setChannel] = useState<'all' | 'push' | 'sms' | 'email'>('all');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [emailAddress, setEmailAddress] = useState('farmer.lead@agri-enterprise.com');
  const [simulatedSent, setSimulatedSent] = useState<string | null>(null);

  if (!isOpen) return null;

  const ALL_ALERTS: WeatherAlert[] = alerts.length > 0 ? alerts : [
    {
      id: 'alt-1',
      type: 'Heavy Rain',
      severity: 'moderate',
      title: 'Monsoon Front Approaching (Next 48 Hours)',
      description: 'Localized precipitation accumulation exceeding 25mm expected across active plot.',
      recommendedAction: 'Clear main drainage ditches and suspend scheduled chemical spraying until dry window.',
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    },
    {
      id: 'alt-2',
      type: 'Pest Outbreak Risk',
      severity: 'high',
      title: 'High Humidity Pest Alert: Yellow Rust & Aphids',
      description: 'Persistent 85%+ relative humidity creates favorable spore germination index.',
      recommendedAction: 'Inspect crop lower canopy; prepare preventative bio-fungicide or Propiconazole 25 EC.',
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
    },
    {
      id: 'alt-3',
      type: 'Frost/Cold Wave',
      severity: 'low',
      title: 'Foliar Nutrient Window: Potassium Booster Due',
      description: 'Crop is in active grain formation stage; high potassium demand to boost kernel density.',
      recommendedAction: 'Schedule drip fertigation with 13:00:45 @ 4 kg/acre.',
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    }
  ];

  function handleSendTest(alt: WeatherAlert) {
    setSimulatedSent(`Alert dispatched via SMS to ${phoneNumber} & Email to ${emailAddress}`);
    setTimeout(() => setSimulatedSent(null), 3500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">{t.alertsTitle || (t.alerts + ' & Multi-Channel Advisory')}</h2>
            <p className="text-xs text-slate-400">{t.smsEmailBroadcast || 'SMS, Push Notifications & Email Broadcast Telemetry'}</p>
          </div>
        </div>

        {/* Channel config & simulator */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 mb-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              {t.farmerRelay || 'Farmer SMS & WhatsApp Alert Relay'}
            </span>
            <span className="text-[11px] text-emerald-400 font-mono">{t.carrierGatewayActive || 'Carrier Gateway Active'}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number for SMS"
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none"
            />
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Email address"
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none"
            />
          </div>
          {simulatedSent && (
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{t.alertSentSuccess || simulatedSent}</span>
            </div>
          )}
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {ALL_ALERTS.map((a) => {
            const isHigh = a.severity === 'severe' || a.severity === 'critical';
            return (
              <div
                key={a.id}
                className={`p-4 rounded-xl border transition-all ${
                  isHigh
                    ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${isHigh ? 'text-rose-400' : 'text-amber-400'}`} />
                    <h3 className="text-sm font-bold text-slate-100">{translateText(a.title, lang)}</h3>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isHigh
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {translateText(a.severity, lang)}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-2 leading-relaxed">{translateText(a.description, lang)}</p>

                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                  <span className="font-semibold text-emerald-400">{t.fieldAdvisory || 'Action Plan'}: </span>
                  <span className="text-slate-300">{translateText(a.recommendedAction, lang)}</span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60 text-[11px] text-slate-500">
                  <span>{t.type || 'Type'}: {translateText(a.type, lang)}</span>
                  <button
                    onClick={() => handleSendTest(a)}
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    {t.sendTestAlert || 'Test SMS/Push'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
          >
            {t.close || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
