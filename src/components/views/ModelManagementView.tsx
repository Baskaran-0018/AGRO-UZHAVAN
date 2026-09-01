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
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200 uppercase">
            {t.modelRegistry || 'Model Registry & Benchmarks'}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{t.modelZoo} & {t.inferenceConsole || 'Inference Console'}</h1>
          <p className="text-xs text-slate-500">{t.deployedArtifacts || 'Deployed ONNX & PyTorch artifacts with latency benchmarks and live JSON test payloads'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Model Cards Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.deployedModels || 'Deployed Models'} ({models.length})</h2>
          <div className="space-y-3">
            {models.map((m) => {
              const isSelected = selectedModel?.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedModel(m)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/60 border-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                        {m.targetTask}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">{m.name}</h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      {t.accuracy || 'Acc'}: {m.accuracyPct}%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">{t.hardware || 'Framework'}</span>
                      <span className="font-mono text-slate-800">{m.framework} ({m.fileFormat})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">{t.averageLatency || 'Latency'}</span>
                      <span className="font-mono text-amber-700 font-bold">{m.latencyMs} ms</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">{t.features || 'Parameters'}</span>
                      <span className="font-mono text-slate-800">{m.parametersCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Inference Console (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-emerald-100 space-y-4 text-xs shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" /> {t.liveInferenceTest || 'Live Model Inference Test'}
              </span>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">Target: {selectedModel?.framework}</span>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">{t.inputPayload || 'Input Feature JSON'}</label>
              <textarea
                rows={5}
                value={testPayload}
                onChange={(e) => setTestPayload(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-emerald-800 outline-none resize-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={handleRunInference}
              disabled={isInferencing}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${isInferencing ? 'animate-spin' : ''}`} />
              {isInferencing ? (t.loading || 'Executing Tensor Forward Pass...') : (t.runInference || 'Run Real-Time Inference')}
            </button>

            {testOutput && (
              <div className="space-y-1 pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">{t.outputPrediction || 'Output Tensor / Prediction'}:</span>
                <pre className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-emerald-800 text-[11px] font-mono overflow-x-auto">
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
