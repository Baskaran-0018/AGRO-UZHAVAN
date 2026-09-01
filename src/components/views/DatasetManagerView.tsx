import React, { useState } from 'react';
import { Database, Upload, FileText, CheckCircle2, Trash2, Plus, Sparkles, Filter } from 'lucide-react';
import { DatasetItem } from '../../types/agro';
import { PRELOADED_DATASETS } from '../../data/datasets';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';

interface DatasetManagerViewProps {
  datasets: DatasetItem[];
  onAddDataset: (ds: DatasetItem) => void;
  onDeleteDataset: (id: string) => void;
  lang: SupportedLang;
}

export const DatasetManagerView: React.FC<DatasetManagerViewProps> = ({
  datasets,
  onAddDataset,
  onDeleteDataset,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [selectedDs, setSelectedDs] = useState<DatasetItem>(datasets[0] || PRELOADED_DATASETS[0]);
  const [isUploading, setIsUploading] = useState(false);

  function handleSimulatedUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const newDs: DatasetItem = {
        id: 'ds-' + Date.now(),
        name: file.name.replace(/\.[^/.]+$/, '') + ' (User Upload)',
        category: 'Yield History',
        format: file.name.endsWith('.csv') ? 'CSV' : 'JSON',
        rowCount: Math.floor(Math.random() * 8000) + 1200,
        columnCount: 10,
        fileSizeBytes: file.size || 3400000,
        status: 'Cleaned',
        columns: [
          { name: 'farm_id', type: 'categorical', missingCount: 0, meanOrUnique: '3 Farms' },
          { name: 'crop', type: 'categorical', missingCount: 0, meanOrUnique: 'Wheat, Rice, Tomato' },
          { name: 'soil_ec', type: 'numeric', missingCount: 0, meanOrUnique: '0.81 dS/m' },
          { name: 'soil_ph', type: 'numeric', missingCount: 0, meanOrUnique: '6.78' },
          { name: 'rainfall_mm', type: 'numeric', missingCount: 0, meanOrUnique: '180.1 mm' },
          { name: 'gdd', type: 'numeric', missingCount: 0, meanOrUnique: '1450 °C-d' },
          { name: 'nitrogen_kg', type: 'numeric', missingCount: 0, meanOrUnique: '116.7 kg' },
          { name: 'phosphorus_kg', type: 'numeric', missingCount: 0, meanOrUnique: '45.0 kg' },
          { name: 'potash_kg', type: 'numeric', missingCount: 0, meanOrUnique: '38.5 kg' },
          { name: 'target_yield_q', type: 'numeric', missingCount: 0, meanOrUnique: '71.7 Q' },
        ],
        createdAt: new Date().toISOString().slice(0, 10),
        previewRows: [
          { farm_id: 'F-101', crop: 'Wheat', soil_ec: 0.85, soil_ph: 6.8, rainfall_mm: 142.5, nitrogen_kg: 120, target_yield_q: 22.4 },
          { farm_id: 'F-102', crop: 'Paddy Rice', soil_ec: 0.62, soil_ph: 7.1, rainfall_mm: 310.0, nitrogen_kg: 140, target_yield_q: 27.8 },
          { farm_id: 'F-103', crop: 'Tomato', soil_ec: 0.95, soil_ph: 6.4, rainfall_mm: 88.0, nitrogen_kg: 90, target_yield_q: 165.0 },
        ]
      };
      onAddDataset(newDs);
      setSelectedDs(newDs);
      setIsUploading(false);
    }, 1200);
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200 uppercase">
            {t.mlDataEngine || 'ML Data Engine'}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{t.datasetManager} & {t.featureStore || 'Feature Store'}</h1>
          <p className="text-xs text-slate-500">{t.automatedCleaning || 'Automated cleaning, z-score normalization, categorical one-hot encoding, and train/test splits'}</p>
        </div>

        <label className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-all">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? (t.loading || 'Ingesting Dataset...') : (t.uploadDataset || 'Upload CSV / JSON Dataset')}</span>
          <input type="file" accept=".csv,.json,.xlsx" onChange={handleSimulatedUpload} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dataset list (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.availableDatasets || 'Available Datasets'} ({datasets.length})</h2>
          <div className="space-y-2.5 max-h-[540px] overflow-y-auto pr-1">
            {datasets.map((ds) => {
              const isSelected = selectedDs?.id === ds.id;
              return (
                <div
                  key={ds.id}
                  onClick={() => setSelectedDs(ds)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/60 border-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate">{ds.name}</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                      {ds.format}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{ds.rowCount.toLocaleString()} {t.samples || 'rows'} · {ds.columnCount} {t.features || 'features'}</span>
                    <span>{(ds.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px]">
                    <span className="text-emerald-700 font-semibold">{ds.category}</span>
                    <span className="text-slate-400">{ds.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dataset Details & Preview Table (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {selectedDs ? (
            <div className="p-6 rounded-2xl bg-white border border-emerald-100 space-y-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedDs.name}</h3>
                  <p className="text-xs text-slate-500">{t.role || 'Category'}: <b className="text-emerald-700">{selectedDs.category}</b> · {t.status || 'Status'}: <b className="text-teal-700">{selectedDs.status}</b></p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-mono border border-emerald-200 font-bold">
                    Format: {selectedDs.format}
                  </span>
                </div>
              </div>

              {/* Data Pipeline Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.samples || 'Total Samples'}</span>
                  <span className="font-bold text-slate-900 text-base font-display">{selectedDs.rowCount.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.features || 'Feature Columns'}</span>
                  <span className="font-bold text-emerald-700 text-base font-display">{selectedDs.columnCount}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.healthy || 'Data Cleaning'}</span>
                  <span className="font-bold text-teal-700 text-xs">{t.zeroMissing || 'Zero Missing / Imputed'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.optimal || 'Normalization'}</span>
                  <span className="font-bold text-amber-700 text-xs">StandardScaler (μ=0, σ=1)</span>
                </div>
              </div>

              {/* Columns Chips */}
              <div>
                <span className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">{t.features || 'Features & Target Vector'}:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedDs.columns || []).map((col, i) => (
                    <span key={i} className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono">
                      {col.name} ({col.type})
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Rows Table */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">{t.dataSnapshot || 'Data Snapshot (First 5 Rows)'}:</span>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                      <tr>
                        {Object.keys((selectedDs.previewRows && selectedDs.previewRows[0]) || {}).map((k) => (
                          <th key={k} className="p-2.5">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {(selectedDs.previewRows || []).map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          {Object.values(row).map((val: any, j) => (
                            <td key={j} className="p-2.5">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white border border-emerald-100 text-slate-500 shadow-xs">
              {t.selectDatasetPrompt || 'Select a dataset to view feature analysis'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
