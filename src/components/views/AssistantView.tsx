import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX, Sparkles, User, Bot, RefreshCw } from 'lucide-react';
import { FarmProfile } from '../../types/agro';
import { SupportedLang, TRANSLATIONS, getLanguageName } from '../../lib/i18n';

const BROWSER_LANG_CODES: Record<SupportedLang, string> = {
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

export const AssistantView: React.FC<AssistantViewProps> = ({ activeFarm, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Namaste! I am AgroGenius AI, your personal chief agronomist. I have loaded real-time soil & weather parameters for "${activeFarm.name}" (${activeFarm.locationName}). How can I assist your crop today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const QUICK_QUESTIONS = [
    'How should I adjust drip irrigation based on this week\'s weather?',
    'What is the best NPK fertilizer ratio for active vegetative stage?',
    'How do I treat yellow rust on wheat organically?',
    'What are the optimal weather conditions to spray fungicide?'
  ];

  function speakText(text: string) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = BROWSER_LANG_CODES[lang] || 'en-US';
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function toggleVoiceInput() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = BROWSER_LANG_CODES[lang] || 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          handleSendMessage(transcript);
        }
      };

      recognition.start();
    } catch (e) {
      console.warn('SpeechRecognition error:', e);
      setIsListening(false);
    }
  }

  async function handleSendMessage(queryText?: string) {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const farmContext = `Farm: ${activeFarm.name}, Location: ${activeFarm.locationName}, Area: ${activeFarm.areaAcres} Acres, Soil: ${activeFarm.soilType}, Irrigation: ${activeFarm.irrigationType}`;
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          farmContext,
          language: getLanguageName(lang),
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
        speakText(data.reply);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
            Multilingual Voice & Chat AI (Module 6)
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">{t.aiAssistant}</h1>
          <p className="text-xs text-slate-400">Grounded agronomy reasoning in 9 regional languages with instant speech synthesis</p>
        </div>

        {isSpeaking && (
          <button
            onClick={() => { window.speechSynthesis.cancel(); setIsSpeaking(false); }}
            className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <VolumeX className="w-4 h-4" /> Stop Voice
          </button>
        )}
      </div>

      {/* Chat Box Container */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col h-[520px]">
        {/* Messages scroller */}
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
                      ? 'bg-slate-950 border border-slate-800 text-slate-200'
                      : 'bg-emerald-600/90 text-white font-medium shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.content}</p>
                  <div className={`flex items-center justify-between text-[10px] pt-1 ${isBot ? 'text-slate-500' : 'text-emerald-200'}`}>
                    <span>{m.timestamp}</span>
                    {isBot && (
                      <button
                        onClick={() => speakText(m.content)}
                        className="hover:text-emerald-400 cursor-pointer flex items-center gap-1"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>AgroGenius AI is reasoning agronomy parameters...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Topic Chips */}
        <div className="py-2 flex gap-1.5 overflow-x-auto">
          {QUICK_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-[11px] text-slate-300 whitespace-nowrap cursor-pointer transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar with Voice Button */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="pt-2 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-emerald-400'
            }`}
            title="Voice Speech-To-Text"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            placeholder={t.askQuestion}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
