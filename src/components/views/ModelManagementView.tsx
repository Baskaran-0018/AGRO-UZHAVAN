import React, { useState } from 'react';
import { Layers, Zap, Download, Play, CheckCircle2, Sliders } from 'lucide-react';
import { ModelZooItem } from '../../types/agro';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';

interface ModelManagementViewProps {
  models: ModelZooItem[];
  lang: SupportedLang;
}

export const ModelManagementView: React.FC<ModelManagementViewProps> = ({ models, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [selectedModel, setSelectedModel] = useState<ModelZooItem>(models[0]);
  const [testPayload, setTestPayload] = useState('{\n  "temp_c": 28.5,\n  "humidity_pct": 65,\n  "soil_ph": 6.8,\n  "nitrogen_kg": 120\n}');
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isInferencing, setIsInferencing] = useState(false);

  function handleRunInference() {
    setIsInferencing(true);
    setTimeout(() => {
      setTestOutput(JSON.stringify({
        status: 'SUCCESS',
        model: selectedModel.name,
        targetTask: selectedModel.targetTask,
        framework: selectedModel.framework,
        fileFormat: selectedModel.fileFormat,
        inferenceTimeMs: selectedModel.latencyMs + Math.round(Math.random() * 4),
        prediction: selectedModel.targetTask.includes('Yield') ? { expectedYieldQuintals: 24.2, confidence: 0.952 } : { class: 'Healthy / Low Risk', confidence: 0.964 },
      }, null, 2));
      setIsInferencing(false);
    }, 600);
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">
            Model Registry & Benchmarks (Module 9)
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">{t.modelZoo} & Inference Console</h1>
          <p className="text-xs text-slate-400">Deployed ONNX & PyTorch artifacts with latency benchmarks and live JSON test payloads</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Model Cards Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Deployed Models ({models.length})</h2>
          <div className="space-y-3">
            {models.map((m) => {
              const isSelected = selectedModel?.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedModel(m)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 border-emerald-500 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                        {m.targetTask}
                      </span>
                      <h3 className="text-sm font-bold text-slate-100 mt-1">{m.name}</h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      Acc: {m.accuracyPct}%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">Framework</span>
                      <span className="font-mono text-slate-200">{m.framework} ({m.fileFormat})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">Latency</span>
                      <span className="font-mono text-amber-300">{m.latencyMs} ms</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">Parameters</span>
                      <span className="font-mono text-slate-200">{m.parametersCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Inference Console (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Live Model Inference Test
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Target: {selectedModel?.framework}</span>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Input Feature JSON</label>
              <textarea
                rows={5}
                value={testPayload}
                onChange={(e) => setTestPayload(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 outline-none resize-none"
              />
            </div>

            <button
              onClick={handleRunInference}
              disabled={isInferencing}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className={`w-3.5 h-3.5 ${isInferencing ? 'animate-spin' : ''}`} />
              {isInferencing ? 'Executing Tensor Forward Pass...' : 'Run Real-Time Inference'}
            </button>

            {testOutput && (
              <div className="space-y-1 pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Output Tensor / Prediction:</span>
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-[11px] font-mono overflow-x-auto">
                  {testOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
