import React, { useState, useEffect } from 'react';
import { PlayCircle, StopCircle, RotateCcw, Download, Cpu, Activity, Zap, CheckCircle2, Sliders } from 'lucide-react';
import { MLTrainingConfig, MLTrainingState, ModelZooItem } from '../../types/agro';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';

interface ModelTrainingViewProps {
  trainingState: MLTrainingState;
  onStartTraining: (config: MLTrainingConfig) => void;
  onStopTraining: () => void;
  onSaveModelToZoo: (model: ModelZooItem) => void;
  lang: SupportedLang;
}

export const ModelTrainingView: React.FC<ModelTrainingViewProps> = ({
  trainingState,
  onStartTraining,
  onStopTraining,
  onSaveModelToZoo,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [modelType, setModelType] = useState<MLTrainingConfig['modelType']>('LSTM');
  const [targetTask, setTargetTask] = useState<'Weather Forecast' | 'Yield Prediction' | 'Disease Detection'>('Weather Forecast');
  const [epochs, setEpochs] = useState(25);
  const [batchSize, setBatchSize] = useState(32);
  const [learningRate, setLearningRate] = useState(0.001);
  const [optimizer, setOptimizer] = useState<'AdamW' | 'Adam' | 'SGD' | 'RMSprop'>('AdamW');
  const [lossFunction, setLossFunction] = useState<'MSE' | 'CrossEntropy' | 'Huber' | 'FocalLoss'>('MSE');
  const [datasetName, setDatasetName] = useState('India-Agro-Climate-2020-2025.csv');
  const [exported, setExported] = useState(false);

  function handleStart() {
    const config: MLTrainingConfig = {
      id: 'job-' + Date.now(),
      modelType: targetTask === 'Weather Forecast'
        ? 'Weather Forecast (LSTM-Transformer)'
        : targetTask === 'Disease Detection'
        ? 'Disease Classifier (EfficientNet-ViT)'
        : 'Yield Predictor (XGBoost/DNN)',
      datasetName,
      datasetSizeRows: 4800,
      architecture: modelType,
      epochs,
      batchSize,
      learningRate,
      optimizer: optimizer === 'AdamW' ? 'AdamW' : 'SGD',
      validationSplit: 0.2,
      earlyStoppingPatience: 5,
      dropoutRate: 0.15,
    };
    onStartTraining(config);
    setExported(false);
  }

  function handleExportModel() {
    const newZooItem: ModelZooItem = {
      id: 'custom-' + Date.now(),
      name: `Custom ${modelType} (${targetTask})`,
      targetTask: targetTask,
      framework: 'PyTorch',
      fileFormat: '.onnx',
      version: 'v1.0.0',
      accuracyPct: Math.round(trainingState.trainAccuracy * 1000) / 10,
      latencyMs: 12,
      sizeMb: 24.5,
      parametersCount: '14.8M',
      status: 'Production',
      trainedOn: datasetName,
      supportedInputSchema: ['temperature', 'humidity', 'soil_ec', 'nitrogen_kg'],
    };
    onSaveModelToZoo(newZooItem);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  }

  const isRunning = trainingState.status === 'running';

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
            Deep Learning Training Studio (Module 8)
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">{t.modelTraining} & Fine-Tuning</h1>
          <p className="text-xs text-slate-400">Train custom PyTorch / ONNX models with live epoch-by-epoch loss & validation curves</p>
        </div>

        <div className="flex items-center gap-2">
          {isRunning ? (
            <button
              onClick={onStopTraining}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
            >
              <StopCircle className="w-4 h-4" /> Stop Training
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" /> Start ML Training
            </button>
          )}

          {trainingState.status === 'completed' && (
            <button
              onClick={handleExportModel}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {exported ? 'Saved to Model Zoo!' : 'Save & Export ONNX'}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hyperparameters Configurator (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-slate-100">Model Hyperparameters</h3>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Task</label>
            <select
              disabled={isRunning}
              value={targetTask}
              onChange={(e) => setTargetTask(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 outline-none cursor-pointer"
            >
              <option value="Weather Forecast">Weather Time-Series Forecast (ClimaX / LSTM)</option>
              <option value="Yield Prediction">Yield Regression (XGBoost / TabNet)</option>
              <option value="Disease Detection">Plant Pathology Vision (ViT / EfficientNet)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Model Architecture</label>
            <select
              disabled={isRunning}
              value={modelType}
              onChange={(e) => setModelType(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 outline-none cursor-pointer"
            >
              <option value="LSTM">Bi-Directional LSTM (Recurrent)</option>
              <option value="Transformer">Spatial-Temporal Transformer</option>
              <option value="ClimaX">ClimaX Foundation Model (Global Meso-Scale)</option>
              <option value="EfficientNet">EfficientNet-V2 (Pathology Vision)</option>
              <option value="VisionTransformer">Vision Transformer (ViT-B16)</option>
              <option value="XGBoost">XGBoost 2.0 Regressor</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Epochs</label>
              <input
                type="number"
                disabled={isRunning}
                min="5"
                max="100"
                value={epochs}
                onChange={(e) => setEpochs(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Batch Size</label>
              <input
                type="number"
                disabled={isRunning}
                min="8"
                max="256"
                step="8"
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Learning Rate</label>
              <input
                type="number"
                disabled={isRunning}
                step="0.0001"
                value={learningRate}
                onChange={(e) => setLearningRate(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Optimizer</label>
              <select
                disabled={isRunning}
                value={optimizer}
                onChange={(e) => setOptimizer(e.target.value as any)}
                className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 outline-none"
              >
                <option value="AdamW">AdamW</option>
                <option value="Adam">Adam</option>
                <option value="SGD">SGD + Momentum</option>
                <option value="RMSprop">RMSprop</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Dataset</label>
            <select
              disabled={isRunning}
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 outline-none cursor-pointer"
            >
              <option value="India-Agro-Climate-2020-2025.csv">India-Agro-Climate-2020-2025.csv (4,800 rows)</option>
              <option value="Punjab-Wheat-Yield-Historical.csv">Punjab-Wheat-Yield-Historical.csv (2,400 rows)</option>
              <option value="PlantVillage-Tomato-Pathology-ViT.json">PlantVillage-Tomato-Pathology-ViT.json (8,200 rows)</option>
            </select>
          </div>
        </div>

        {/* Live Training Telemetry & Epoch Curves (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Status Bar */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className={`w-3 h-3 rounded-full ${isRunning ? 'bg-amber-400 animate-ping' : trainingState.status === 'completed' ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                <h3 className="text-base font-bold text-slate-100">
                  Status: <span className="uppercase text-emerald-400">{trainingState.status}</span>
                </h3>
              </div>
              <span className="font-mono text-xs text-slate-400">
                Epoch {trainingState.currentEpoch} / {trainingState.totalEpochs} ({trainingState.progressPct}%)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${trainingState.progressPct}%` }}
              ></div>
            </div>

            {/* GPU / Metrics stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Training Loss</span>
                <span className="font-bold text-amber-300 text-sm font-mono">{trainingState.trainLoss.toFixed(4)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Val Accuracy</span>
                <span className="font-bold text-emerald-400 text-sm font-mono">{(trainingState.trainAccuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">GPU VRAM</span>
                <span className="font-bold text-sky-400 text-sm font-mono">4.2 / 24 GB</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Throughput</span>
                <span className="font-bold text-slate-200 text-sm font-mono">1,420 samples/s</span>
              </div>
            </div>
          </div>

          {/* Loss & Accuracy Curve Chart Representation */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-100">Epoch Convergence Telemetry</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Loss Curve (Cross-Entropy / MSE):</span>
                <span className="text-amber-400 font-mono">Converging at rate η = {learningRate}</span>
              </div>
              <div className="h-28 rounded-xl bg-slate-950 border border-slate-800 p-3 flex items-end gap-1 overflow-x-auto">
                {Array.from({ length: Math.max(1, trainingState.currentEpoch) }).map((_, i) => {
                  const h = Math.max(8, 100 - (i / trainingState.totalEpochs) * 85);
                  return (
                    <div
                      key={i}
                      className="flex-1 min-w-[12px] bg-gradient-to-t from-amber-600 to-amber-400 rounded-t transition-all duration-300"
                      style={{ height: `${h}%` }}
                      title={`Epoch ${i + 1}: Loss ${(h / 100).toFixed(3)}`}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
