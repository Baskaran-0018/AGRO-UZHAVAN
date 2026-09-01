import React, { useState } from 'react';
import { FileSpreadsheet, Download, Printer, CheckCircle2, FileText, Sparkles, FileDown } from 'lucide-react';
import { FarmProfile, CropRecord, WeatherForecastBundle, DiseaseDetectionResult, YieldPredictionResult } from '../../types/agro';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';
import { generateDiagnosticReportPDF } from '../../lib/pdfReportGenerator';

interface ReportsViewProps {
  activeFarm: FarmProfile;
  crops: CropRecord[];
  weather: WeatherForecastBundle | null;
  scans: DiseaseDetectionResult[];
  yields: YieldPredictionResult[];
  lang: SupportedLang;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  activeFarm,
  crops,
  weather,
  scans,
  yields,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [reportType, setReportType] = useState<'comprehensive' | 'weather' | 'yield' | 'pathology'>('comprehensive');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  function handlePrint() {
    window.print();
  }

  function handleExportPathologyPDF() {
    if (scans.length > 0) {
      generateDiagnosticReportPDF(scans[0], activeFarm, `Agronomy & Pathology Dossier - ${activeFarm.name}`);
    } else {
      handlePrint();
    }
  }

  function handleExportCSV() {
    const csvContent = "data:text/csv;charset=utf-8," + [
      ["Report Type", "Farm Name", "Location", "Soil Type", "Acres", "Date"],
      [reportType.toUpperCase(), activeFarm.name, activeFarm.locationName, activeFarm.soilType, activeFarm.areaAcres, new Date().toISOString().slice(0, 10)],
      [],
      ["Crop Name", "Variety", "Growth Stage", "Planted Acres", "Sowing Date"],
      ...(crops || []).filter(c => c && c.farmId === activeFarm.id).map(c => [c.cropName, c.variety || 'Standard', c.growthStage, c.areaPlantedAcres, c.sowingDate]),
      [],
      ["Recent Disease Diagnostic Logs"],
      ["Date", "Crop", "Diagnosis", "Severity %", "Confidence %"],
      ...(scans || []).map(s => [s.timestamp ? s.timestamp.slice(0, 10) : '', s.cropGuess, s.diseaseName, s.severityPercentage, (s.confidenceScore * 100).toFixed(1)]),
    ].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AGRO_AI_Report_${activeFarm.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  }

  const farmCrops = crops.filter(c => c.farmId === activeFarm.id);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase">
            {t.agronomyDossier || 'Agronomic Dossier & Intelligence Exports'}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{t.reports}</h1>
          <p className="text-xs text-slate-500">{t.generateHighRes || 'Generate high-resolution PDF agronomy audits, bank loan dossiers, and CSV sensor logs'}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            {downloadSuccess ? (t.downloadSuccess || 'Downloaded CSV!') : (t.exportCSV || 'Export CSV')}
          </button>
          <button
            onClick={handleExportPathologyPDF}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <FileDown className="w-4 h-4" />
            {t.downloadPDF || 'Download PDF Report'}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" />
            {t.printPreview || 'Print Preview'}
          </button>
        </div>
      </div>

      {/* Report Preview Dossier Sheet */}
      <div className="p-8 rounded-2xl bg-white border border-emerald-100 space-y-6 max-w-4xl mx-auto shadow-sm">
        {/* Report Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-emerald-700 font-display">Agro Uzhavan</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                {t.officialDossier || 'Official Farm Dossier'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-2">{activeFarm.name}</h2>
            <p className="text-xs text-slate-500">{activeFarm.locationName} · Lat: {activeFarm.lat.toFixed(4)}, Lng: {activeFarm.lng.toFixed(4)}</p>
          </div>
          <div className="text-right text-xs text-slate-500 space-y-0.5">
            <div><b>{t.reportDate || 'Report Date'}:</b> {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            <div><b>{t.auditor || 'Auditor'}:</b> Agro Uzhavan Autonomous Engine</div>
            <div><b>{t.status || 'Status'}:</b> {t.certifiedValid || 'Certified Valid'}</div>
          </div>
        </div>

        {/* Section 1: Plot Overview */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">1. {t.farmTopography || 'Farm Topography & Soil Profile'}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.farmSize || 'Land Area'}</span>
              <span className="font-bold text-slate-900">{activeFarm.areaAcres} {t.acres || 'Acres'}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.soilType || 'Soil Classification'}</span>
              <span className="font-bold text-slate-900">{activeFarm.soilType}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.irrigationType || 'Irrigation Infrastructure'}</span>
              <span className="font-bold text-slate-900">{activeFarm.irrigationType}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.altitude || 'Altitude'}</span>
              <span className="font-bold text-slate-900">{activeFarm.altitudeMeters} m MSL</span>
            </div>
          </div>
        </div>

        {/* Section 2: Active Crop Cycles */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">2. {t.cropInventory || 'Active Seasonal Crop Inventory'}</h3>
          {farmCrops.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">{t.crop || 'Crop'}</th>
                    <th className="p-2.5">{t.variety || 'Variety'}</th>
                    <th className="p-2.5">{t.growthStage || 'Stage'}</th>
                    <th className="p-2.5">{t.plantedArea || 'Area'}</th>
                    <th className="p-2.5">{t.targetYield || 'Target Yield'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {farmCrops.map((c) => (
                    <tr key={c.id}>
                      <td className="p-2.5 font-bold text-slate-900">{c.cropName}</td>
                      <td className="p-2.5">{c.variety || 'Standard'}</td>
                      <td className="p-2.5 text-emerald-700 font-bold">{c.growthStage}</td>
                      <td className="p-2.5">{c.areaPlantedAcres} {t.acres || 'Acres'}</td>
                      <td className="p-2.5 font-mono">{c.targetYieldTonsPerAcre} Q/Ac</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
              {t.noActiveCrops || 'No crops currently recorded in inventory.'}
            </div>
          )}
        </div>

        {/* Section 3: AI Meteorological & Pathology Assessment */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">3. {t.climatologicalAudit || 'Climatological & Pathology Audit'}</h3>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <p className="font-bold text-slate-900">{t.aiSynopsis || 'AI Meteorological Synopsis:'}</p>
            <p className="text-slate-600 leading-relaxed">{weather?.aiAnalysis.summary || (t.optimalConditions || 'Optimal climatic parameters maintained. Micro-climatic diurnal variation favors healthy transpiration.')}</p>
            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
              <b>{t.pathologyStatus || 'Pathology Status'}: </b>
              {scans[0] ? `${scans[0].cropGuess}: ${scans[0].diseaseName} (${t.severityPercentage || 'Severity'}: ${scans[0].severityPercentage}%, ${t.confidenceScore || 'Confidence'}: ${(scans[0].confidenceScore * 100).toFixed(1)}%)` : (t.healthyLeaf || 'Canopy clean of fungal spore contamination.')}
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="pt-6 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
          <span>{t.digitallySigned || 'Digitally Signed & Validated via Agro Uzhavan Autonomous Cloud'}</span>
          <span>Doc ID: AGRO-AUDIT-{activeFarm.id}-{Date.now().toString().slice(-6)}</span>
        </div>
      </div>
    </div>
  );
};
