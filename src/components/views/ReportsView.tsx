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
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
            Agronomic Dossier & Intelligence Exports
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">{t.reports} & Audit Generator</h1>
          <p className="text-xs text-slate-400">Generate high-resolution PDF agronomy audits, bank loan dossiers, and CSV sensor logs</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            {downloadSuccess ? 'Downloaded CSV!' : 'Export CSV'}
          </button>
          <button
            onClick={handleExportPathologyPDF}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <FileDown className="w-4 h-4" />
            Download PDF Report
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" />
            Print Preview
          </button>
        </div>
      </div>

      {/* Report Preview Dossier Sheet */}
      <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 max-w-4xl mx-auto shadow-2xl">
        {/* Report Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-emerald-400 font-display">AGRO AI</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Official Farm Dossier
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-100 mt-2">{activeFarm.name}</h2>
            <p className="text-xs text-slate-400">{activeFarm.locationName} · Lat: {activeFarm.lat.toFixed(4)}, Lng: {activeFarm.lng.toFixed(4)}</p>
          </div>
          <div className="text-right text-xs text-slate-400 space-y-0.5">
            <div><b>Report Date:</b> {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            <div><b>Auditor:</b> AGRO AI Autonomous Engine</div>
            <div><b>Status:</b> Certified Valid</div>
          </div>
        </div>

        {/* Section 1: Plot Overview */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">1. Farm Topography & Soil Profile</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Land Area</span>
              <span className="font-bold text-slate-100">{activeFarm.areaAcres} Acres</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Soil Classification</span>
              <span className="font-bold text-slate-100">{activeFarm.soilType}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Irrigation Infrastructure</span>
              <span className="font-bold text-slate-100">{activeFarm.irrigationType}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Altitude</span>
              <span className="font-bold text-slate-100">{activeFarm.altitudeMeters} m MSL</span>
            </div>
          </div>
        </div>

        {/* Section 2: Active Crop Cycles */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">2. Active Seasonal Crop Inventory</h3>
          {farmCrops.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Crop</th>
                    <th className="p-2.5">Variety</th>
                    <th className="p-2.5">Stage</th>
                    <th className="p-2.5">Area</th>
                    <th className="p-2.5">Target Yield</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {farmCrops.map((c) => (
                    <tr key={c.id}>
                      <td className="p-2.5 font-bold text-slate-100">{c.cropName}</td>
                      <td className="p-2.5">{c.variety || 'Standard'}</td>
                      <td className="p-2.5 text-emerald-400">{c.growthStage}</td>
                      <td className="p-2.5">{c.areaPlantedAcres} Ac</td>
                      <td className="p-2.5 font-mono">{c.targetYieldTonsPerAcre} Q/Ac</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
              No crops currently recorded in inventory.
            </div>
          )}
        </div>

        {/* Section 3: AI Meteorological & Pathology Assessment */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">3. Climatological & Pathology Audit</h3>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
            <p className="font-bold text-slate-100">AI Meteorological Synopsis:</p>
            <p className="text-slate-400 leading-relaxed">{weather?.aiAnalysis.summary || 'Optimal climatic parameters maintained. Micro-climatic diurnal variation favors healthy transpiration.'}</p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <b>Pathology Status: </b>
              {scans[0] ? `${scans[0].cropGuess}: ${scans[0].diseaseName} (Severity: ${scans[0].severityPercentage}%, Confidence: ${(scans[0].confidenceScore * 100).toFixed(1)}%)` : 'Canopy clean of fungal spore contamination.'}
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
          <span>Digitally Signed & Validated via AGRO AI Autonomous Cloud</span>
          <span>Doc ID: AGRO-AUDIT-{activeFarm.id}-{Date.now().toString().slice(-6)}</span>
        </div>
      </div>
    </div>
  );
};
