import React from 'react';
import { Settings, Cpu, Activity, Database, ShieldCheck, Zap, Server } from 'lucide-react';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';

interface AdminPanelProps {
  lang: SupportedLang;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
            Platform Infrastructure
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">{t.adminPanel} & Cluster Health</h1>
          <p className="text-xs text-slate-400">GPU compute allocation, PyTorch distributed cluster nodes, and API runtime telemetry</p>
        </div>
      </div>

      {/* Cluster Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
            <span>GPU Cluster (NVIDIA)</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-slate-100 font-display">8x RTX 4090</span>
          <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            <span>VRAM Utilization</span>
            <span className="text-emerald-400 font-mono">18.4% (35.3 GB / 192 GB)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
            <span>Inference Throughput</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-extrabold text-amber-300 font-display">2,480 req/min</span>
          <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            <span>Average Latency</span>
            <span className="text-emerald-400 font-mono">14.2 ms (ONNX)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
            <span>Gemini API Quota</span>
            <Activity className="w-4 h-4 text-sky-400" />
          </div>
          <span className="text-2xl font-extrabold text-sky-400 font-display">99.98% OK</span>
          <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            <span>Model: gemini-3.7-flash</span>
            <span className="text-emerald-400">Active</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
            <span>Dataset Feature Store</span>
            <Database className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl font-extrabold text-purple-300 font-display">48.2 GB</span>
          <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            <span>Z-Score Parquet Store</span>
            <span className="text-slate-400">12 Datasets</span>
          </div>
        </div>
      </div>

      {/* Node Status Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100">Distributed Compute Nodes</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="p-3">Node ID</th>
                <th className="p-3">Role</th>
                <th className="p-3">Hardware</th>
                <th className="p-3">Load</th>
                <th className="p-3">Memory</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr>
                <td className="p-3 font-bold text-slate-200">agro-node-us-01</td>
                <td className="p-3">ViT Vision Inference</td>
                <td className="p-3">NVIDIA A100 (80GB)</td>
                <td className="p-3 text-emerald-400">22%</td>
                <td className="p-3">14.2 / 80 GB</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">HEALTHY</span></td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-200">agro-node-in-02</td>
                <td className="p-3">LSTM Weather Time-Series</td>
                <td className="p-3">NVIDIA RTX 4090</td>
                <td className="p-3 text-emerald-400">15%</td>
                <td className="p-3">6.1 / 24 GB</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">HEALTHY</span></td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-200">agro-node-eu-03</td>
                <td className="p-3">XGBoost Yield Engine</td>
                <td className="p-3">AMD EPYC 64-Core</td>
                <td className="p-3 text-emerald-400">8%</td>
                <td className="p-3">12.8 / 128 GB</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">HEALTHY</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
