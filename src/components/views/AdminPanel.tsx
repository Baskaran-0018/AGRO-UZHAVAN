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
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase">
            {t.platformInfrastructure || 'Platform Infrastructure'}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{t.adminPanel} & {t.clusterHealth || 'Cluster Health'}</h1>
          <p className="text-xs text-slate-500">{t.gpuComputeAllocation || 'GPU compute allocation, PyTorch distributed cluster nodes, and API runtime telemetry'}</p>
        </div>
      </div>

      {/* Cluster Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-emerald-100 space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
            <span>{t.gpuCluster || 'GPU Cluster (NVIDIA)'}</span>
            <Cpu className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 font-display">8x RTX 4090</span>
          <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>{t.vramUtilization || 'VRAM Utilization'}</span>
            <span className="text-emerald-700 font-mono font-bold">18.4% (35.3 GB / 192 GB)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-emerald-100 space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
            <span>{t.inferenceThroughput || 'Inference Throughput'}</span>
            <Zap className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-2xl font-extrabold text-amber-700 font-display">2,480 req/min</span>
          <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>{t.averageLatency || 'Average Latency'}</span>
            <span className="text-emerald-700 font-mono font-bold">14.2 ms (ONNX)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-emerald-100 space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
            <span>{t.apiQuota || 'Gemini API Quota'}</span>
            <Activity className="w-4 h-4 text-sky-600" />
          </div>
          <span className="text-2xl font-extrabold text-sky-700 font-display">99.98% OK</span>
          <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>Model: gemini-2.5-flash</span>
            <span className="text-emerald-700 font-bold">{t.activeFarm || 'Active'}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-emerald-100 space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
            <span>{t.featureStore || 'Dataset Feature Store'}</span>
            <Database className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl font-extrabold text-purple-700 font-display">48.2 GB</span>
          <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>Z-Score Parquet Store</span>
            <span className="text-slate-600 font-medium">12 Datasets</span>
          </div>
        </div>
      </div>

      {/* Node Status Table */}
      <div className="p-6 rounded-2xl bg-white border border-emerald-100 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">{t.distributedComputeNodes || 'Distributed Compute Nodes'}</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">{t.nodeId || 'Node ID'}</th>
                <th className="p-3">{t.role || 'Role'}</th>
                <th className="p-3">{t.hardware || 'Hardware'}</th>
                <th className="p-3">{t.load || 'Load'}</th>
                <th className="p-3">{t.memory || 'Memory'}</th>
                <th className="p-3">{t.status || 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr>
                <td className="p-3 font-bold text-slate-900">agro-node-us-01</td>
                <td className="p-3 text-slate-600">ViT Vision Inference</td>
                <td className="p-3 text-slate-600">NVIDIA A100 (80GB)</td>
                <td className="p-3 text-emerald-700 font-bold">22%</td>
                <td className="p-3 text-slate-600">14.2 / 80 GB</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">{t.healthy || 'HEALTHY'}</span></td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">agro-node-in-02</td>
                <td className="p-3 text-slate-600">LSTM Weather Time-Series</td>
                <td className="p-3 text-slate-600">NVIDIA RTX 4090</td>
                <td className="p-3 text-emerald-700 font-bold">15%</td>
                <td className="p-3 text-slate-600">6.1 / 24 GB</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">{t.healthy || 'HEALTHY'}</span></td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">agro-node-eu-03</td>
                <td className="p-3 text-slate-600">XGBoost Yield Engine</td>
                <td className="p-3 text-slate-600">AMD EPYC 64-Core</td>
                <td className="p-3 text-emerald-700 font-bold">8%</td>
                <td className="p-3 text-slate-600">12.8 / 128 GB</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">{t.healthy || 'HEALTHY'}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
