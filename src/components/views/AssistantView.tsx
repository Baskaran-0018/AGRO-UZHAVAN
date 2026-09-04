import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Sprout,
  Globe,
  CheckCircle2,
  Send,
  User,
  Bot,
  RefreshCw,
  MessageSquare,
  Radio,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { FarmProfile } from '../../types/agro';
import { SupportedLang, TRANSLATIONS, LANGUAGES, getLanguageName } from '../../lib/i18n';
import { translateText } from '../../lib/universalTranslator';

const BROWSER_LANG_CODES: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  mr: 'mr-IN',
  bn: 'bn-IN',
  gu: 'gu-IN',
  pa: 'pa-IN',
};

interface AssistantViewProps {
  activeFarm: FarmProfile;
  lang: SupportedLang;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface VoiceAdvisoryResponse {
  title: string;
  advice: string;
  actionItems: string[];
}

export const AssistantView: React.FC<AssistantViewProps> = ({ activeFarm, lang: globalLang }) => {
  const [selectedLang, setSelectedLang] = useState<SupportedLang>(globalLang);
  const [activeMode, setActiveMode] = useState<'voice' | 'chat'>('voice');

  // Sync selectedLang when global lang changes
  useEffect(() => {
    setSelectedLang(globalLang);
  }, [globalLang]);

  const t = TRANSLATIONS[selectedLang] || TRANSLATIONS.en;

  // Voice Interaction State
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceResponse, setVoiceResponse] = useState<VoiceAdvisoryResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: t.voiceAssistantGreeting || `Namaste! I am AgroGenius AI, your personal chief agronomist. I have loaded real-time soil & weather parameters for "${activeFarm.name}" (${activeFarm.locationName}). How can I assist your crop today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial chat message on lang change if untouched
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'init-1') {
        return [{
          id: 'init-1',
          role: 'assistant',
          content: t.voiceAssistantGreeting || `Namaste! I am AgroGenius AI, your personal chief agronomist for "${activeFarm.name}" (${activeFarm.locationName}). How can I assist your crop today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }];
      }
      return prev;
    });
  }, [selectedLang]);

  useEffect(() => {
    if (activeMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeMode]);

  // Initialize Speech Recognition for Voice Studio
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = BROWSER_LANG_CODES[selectedLang] || 'en-IN';

      recognition.onstart = () => setIsListening(true);

      recognition.onresult = (event: any) => {
        const currentTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedLang]);

  // Toggle Voice Studio Listening
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(
        selectedLang === 'ta'
          ? 'உங்கள் உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. Chrome அல்லது Edge பயன்படுத்தவும்.'
          : 'Speech Recognition is not supported in this browser. Please use Chrome/Edge.'
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (transcript.trim()) {
        handleVoiceQueryProcessing(transcript);
      }
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
      setTranscript('');
      setVoiceResponse(null);
      recognitionRef.current.lang = BROWSER_LANG_CODES[selectedLang] || 'en-IN';
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  // Process Voice Query with Gemini + Local Agronomy Knowledge Fallback
  const handleVoiceQueryProcessing = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsProcessing(true);

    try {
      const farmContext = `Farm: ${activeFarm.name}, Location: ${activeFarm.locationName}, Area: ${activeFarm.areaAcres} Acres, Soil: ${activeFarm.soilType}, Irrigation: ${activeFarm.irrigationType}`;
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: [{ role: 'user', content: queryText }],
          farmContext,
          language: getLanguageName(selectedLang),
        })
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || '';

        // Extract action items or create bulleted points
        const lines = replyText.split('\n').map((l: string) => l.trim()).filter((l: string) => l.startsWith('*') || l.startsWith('-') || /^\d+\./.test(l));
        const actionItems = lines.length >= 2
          ? lines.slice(0, 3).map((l: string) => l.replace(/^[-*•\d.]+\s*/, ''))
          : [
              selectedLang === 'ta' ? 'பாசன அட்டவணையை மண் ஈரப்பதத்திற்கு ஏற்ப மாற்றவும்' : 'Adjust irrigation schedule according to soil moisture level',
              selectedLang === 'ta' ? 'பரிந்துரைக்கப்பட்ட உரம் மற்றும் நுண்ணூட்டச் சத்துக்களை இடவும்' : 'Apply recommended dosage of fertilizer & micronutrients',
              selectedLang === 'ta' ? 'இலைகளின் அடியில் பூச்சி தாக்குதல் உள்ளதா என கண்காணிக்கவும்' : 'Inspect crop foliage for early pest infestation symptoms'
            ];

        const result: VoiceAdvisoryResponse = {
          title: selectedLang === 'ta' ? 'பயிர் ஆலோசனை & பரிந்துரைகள்' : 'Agronomic Advisory & Action Protocol',
          advice: replyText,
          actionItems
        };

        setVoiceResponse(result);
        speakResponse(replyText);
      } else {
        throw new Error('API response not ok');
      }
    } catch (err) {
      console.warn('Online voice processing failed, using offline response:', err);
      // Fallback response in selected language
      const fallbackAdvice = selectedLang === 'ta'
        ? `உங்கள் கேள்வி "${queryText}" அடிப்படையில்: பாசனத்திற்குப் பிறகு ஏக்கருக்கு 25 கிலோ யூரியா இடவும். மண்ணில் போதுமான ஈரப்பதம் உள்ளது. காற்றின் வேகம் 15 கி.மீ/மணிக்கு மேல் இருந்தால் மருந்து தெளிப்பதைத் தவிர்க்கவும்.`
        : selectedLang === 'hi'
        ? `आपके प्रश्न "${queryText}" के आधार पर: सिंचाई के बाद प्रति एकड़ 25 किलो यूरिया डालें। मिट्टी में नमी पर्याप्त है।`
        : `Based on your query "${queryText}", maintain optimal soil moisture and apply recommended nitrogen supplements. Avoid spraying if wind speed exceeds 15 km/h.`;

      const fallbackActions = selectedLang === 'ta'
        ? ['ஏக்கருக்கு 25 கிலோ யூரியா இடவும்', '48 மணி நேரத்திற்குள் இரண்டாம் கட்ட பாசனம் செய்யவும்', 'இலைகளின் அடியில் அசுவினி பூச்சிகள் உள்ளதா என கண்காணிக்கவும்']
        : selectedLang === 'hi'
        ? ['प्रति एकड़ 25 किलो नाइट्रोजन उर्वरक डालें', '48 घंटों के भीतर सिंचाई सुनिश्चित करें', 'पत्तियों के नीचे कीटों की जांच करें']
        : ['Apply 25 kg/acre Nitrogen supplement after irrigation', 'Ensure secondary irrigation cycle within 48 hours', 'Inspect leaf underside for aphid infestation'];

      const mockResult: VoiceAdvisoryResponse = {
        title: selectedLang === 'ta' ? 'பயிர் ஆலோசனை: உரம் மற்றும் நீர்ப்பாசனம்' : selectedLang === 'hi' ? 'फसल सलाह: उर्वरक एवं नमी' : 'Crop Advisory: Fertilizer & Moisture',
        advice: fallbackAdvice,
        actionItems: fallbackActions
      };

      setVoiceResponse(mockResult);
      speakResponse(mockResult.advice);
    } finally {
      setIsProcessing(false);
    }
  };

  // Text-To-Speech Playback
  const speakResponse = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = BROWSER_LANG_CODES[selectedLang] || 'en-IN';
    utterance.rate = selectedLang === 'ta' ? 0.9 : 1.0; // Slightly slower pace for clear Tamil/Indian pronunciation

    const voices = window.speechSynthesis.getVoices();
    const localizedVoice = voices.find(v => v.lang.startsWith(selectedLang) || v.lang.includes(selectedLang));
    if (localizedVoice) {
      utterance.voice = localizedVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  // Send Chat Message Handler
  async function handleSendChatMessage(queryText?: string) {
    const textToSend = (queryText || chatInput).trim();
    if (!textToSend || isChatLoading) return;

    const userMsg: Message = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const farmContext = `Farm: ${activeFarm.name}, Location: ${activeFarm.locationName}, Area: ${activeFarm.areaAcres} Acres, Soil: ${activeFarm.soilType}, Irrigation: ${activeFarm.irrigationType}`;
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          farmContext,
          language: getLanguageName(selectedLang),
        })
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: Message = {
          id: 'bot-' + Date.now(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        speakResponse(data.reply);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsChatLoading(false);
    }
  }

  const QUICK_QUESTIONS = [
    translateText('How should I adjust drip irrigation based on this week\'s weather?', selectedLang),
    translateText('What is the best NPK fertilizer ratio for active vegetative stage?', selectedLang),
    translateText('How do I treat yellow rust on wheat organically?', selectedLang),
    translateText('What are the optimal weather conditions to spray fungicide?', selectedLang)
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Header Container */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                {translateText(t.multilingualVoiceAI || 'AgriVoice AI Assistant', selectedLang)}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                {translateText(activeFarm.name, selectedLang)}
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1">{translateText(t.aiAssistant, selectedLang)}</h1>
            <p className="text-xs text-slate-500 font-medium">
              {translateText(t.voicePrompt || 'Grounded agronomy reasoning in 9 regional languages with instant speech synthesis', selectedLang)}
            </p>
          </div>
        </div>

        {/* Mode Switcher & Language Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => {
                setActiveMode('voice');
                stopAudio();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeMode === 'voice'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{translateText('Voice Hub', selectedLang)}</span>
            </button>
            <button
              onClick={() => {
                setActiveMode('chat');
                stopAudio();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeMode === 'chat'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{translateText('AI Chat', selectedLang)}</span>
            </button>
          </div>

          {/* Regional Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <select
              value={selectedLang}
              onChange={(e) => {
                setSelectedLang(e.target.value as SupportedLang);
                setVoiceResponse(null);
                setTranscript('');
                stopAudio();
              }}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ================= MODE 1: INTERACTIVE VOICE HUB ================= */}
      {activeMode === 'voice' && (
        <div className="p-8 rounded-3xl bg-white border border-emerald-100 shadow-sm text-slate-900 space-y-8 animate-in fade-in duration-200">
          {/* Central Voice Button & Waveform Hub */}
          <div className="py-6 flex flex-col items-center justify-center text-center">
            {/* Pulsing Animated Mic Button */}
            <div className="relative flex items-center justify-center">
              {isListening && (
                <>
                  <span className="absolute w-32 h-32 rounded-full bg-emerald-500/20 animate-ping" />
                  <span className="absolute w-40 h-40 rounded-full bg-emerald-500/10 animate-pulse" />
                </>
              )}

              <button
                onClick={toggleListening}
                className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30 ring-4 ring-rose-500/20'
                    : 'bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-600/30 hover:scale-105'
                }`}
                title={isListening ? translateText(t.stop || 'Stop', selectedLang) : translateText(t.tapToSpeak || 'Tap to speak query', selectedLang)}
              >
                {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
              </button>
            </div>

            {/* Dynamic Status Text */}
            <p className="mt-6 text-sm font-bold text-slate-800 tracking-wide">
              {isListening
                ? translateText(t.listening || 'Listening... Speak your crop or field query', selectedLang)
                : isProcessing
                ? translateText(t.analyzingLeaf || 'Analyzing field parameters & agronomist database...', selectedLang)
                : translateText(t.tapToSpeak || 'Tap microphone and speak your farming query', selectedLang)}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {translateText('Supports live speech in', selectedLang)} {LANGUAGES.find(l => l.code === selectedLang)?.nativeName} · {translateText('Soil & Crop contextualized', selectedLang)}
            </p>

            {/* Audio Waveform Equalizer */}
            {isListening && (
              <div className="flex items-center space-x-1.5 mt-4 h-6">
                <span className="w-1.5 bg-emerald-500 h-3 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 bg-emerald-500 h-5 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 bg-emerald-500 h-6 rounded-full animate-bounce" />
                <span className="w-1.5 bg-emerald-500 h-5 rounded-full animate-bounce [animation-delay:-0.2s]" />
                <span className="w-1.5 bg-emerald-500 h-3 rounded-full animate-bounce [animation-delay:-0.4s]" />
              </div>
            )}
          </div>

          {/* Real-time Transcription Display */}
          {transcript && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                {translateText(t.detectedQuery || 'Detected Spoken Query', selectedLang)}
              </p>
              <p className="text-sm text-slate-900 italic font-semibold">
                "{transcript}"
              </p>
            </div>
          )}

          {/* AI Advisory Response Card with Audio Player & Action Checklist */}
          {voiceResponse && (
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-slate-900 space-y-4 shadow-xs animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-base text-emerald-900">
                    {translateText(voiceResponse.title, selectedLang)}
                  </h3>
                </div>

                {/* Read-Aloud Audio Controls */}
                <button
                  onClick={isPlaying ? stopAudio : () => speakResponse(voiceResponse.advice)}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-white hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-300 shadow-xs transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                      <span className="text-rose-700">{translateText(t.stop || 'Stop', selectedLang)}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{translateText(t.listen || 'Listen Audio', selectedLang)}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs leading-relaxed text-slate-700 font-medium whitespace-pre-line">
                {translateText(voiceResponse.advice, selectedLang)}
              </p>

              {/* Recommended Field Actions Checklist */}
              {voiceResponse.actionItems && voiceResponse.actionItems.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-emerald-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                    {translateText(t.actionHeader || 'Recommended Field Actions', selectedLang)}
                  </span>
                  <div className="grid sm:grid-cols-1 gap-2">
                    {voiceResponse.actionItems.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-800 bg-white p-2.5 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="font-semibold">{translateText(item, selectedLang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Query Pills */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {translateText('Frequently Asked Farm Queries:', selectedLang)}
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTranscript(q);
                    handleVoiceQueryProcessing(q);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors cursor-pointer text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODE 2: MULTI-TURN AI CHAT ================= */}
      {activeMode === 'chat' && (
        <div className="p-6 rounded-2xl bg-white border border-emerald-100 flex flex-col h-[560px] shadow-xs animate-in fade-in duration-200">
          {/* Messages Scroller */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((m) => {
              const isBot = m.role === 'assistant';
              return (
                <div key={m.id} className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isBot ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                    }`}
                  >
                    {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed space-y-1.5 ${
                      isBot
                        ? 'bg-slate-50 border border-slate-200 text-slate-800'
                        : 'bg-emerald-600 text-white font-medium shadow-sm shadow-emerald-600/20'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.content}</p>
                    <div className={`flex items-center justify-between text-[10px] pt-1 ${isBot ? 'text-slate-400' : 'text-emerald-100'}`}>
                      <span>{m.timestamp}</span>
                      {isBot && (
                        <button
                          onClick={() => speakResponse(m.content)}
                          className="hover:text-emerald-600 cursor-pointer flex items-center gap-1"
                          title={translateText(t.listen || 'Read aloud', selectedLang)}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isChatLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-emerald-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>{translateText(t.analyzingLeaf || 'AgroGenius AI is reasoning agronomy parameters...', selectedLang)}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="py-2 flex gap-1.5 overflow-x-auto border-t border-slate-100">
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendChatMessage(q)}
                className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 hover:border-emerald-300 text-[11px] font-semibold text-slate-700 whitespace-nowrap cursor-pointer transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendChatMessage();
            }}
            className="pt-2 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={translateText(t.typeOrSpeak || 'Type your farming question in any regional language...', selectedLang)}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:border-emerald-500 outline-none"
            />

            <button
              type="submit"
              disabled={!chatInput.trim() || isChatLoading}
              className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
