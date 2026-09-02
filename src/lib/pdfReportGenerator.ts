import { DiseaseDetectionResult, FarmProfile } from '../types/agro';
import { SupportedLang, TRANSLATIONS } from './i18n';
import { getLocalizedDiseaseDiagnostic } from './diseaseDictionary';

export function generateDiagnosticReportPDF(
  rawResult: DiseaseDetectionResult,
  farm?: FarmProfile,
  reportTitle?: string,
  lang: SupportedLang = 'en'
) {
  const result = getLocalizedDiseaseDiagnostic(rawResult, lang);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const titleText = reportTitle || `${t.diseaseDetection || 'Plant Pathology & Agronomic Prescription'} - ${result.cropGuess}`;

  const dateStr = new Date(result.timestamp || Date.now()).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const docId = `AGRO-DX-${result.id ? result.id.slice(-8).toUpperCase() : Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${titleText}</title>
  <style>
    @media print {
      body { margin: 0; padding: 15mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
      .page-break { page-break-before: always; }
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 30px;
      line-height: 1.5;
      font-size: 13px;
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #059669;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      color: #065f46;
      letter-spacing: -0.5px;
      margin: 0;
    }
    .brand-subtitle {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 600;
      color: #059669;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
    .doc-meta {
      text-align: right;
      font-size: 11px;
      color: #64748b;
    }
    .doc-meta strong {
      color: #0f172a;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-healthy {
      background-color: #d1fae5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }
    .badge-diseased {
      background-color: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
    .badge-warning {
      background-color: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px;
    }
    .card-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 6px;
    }
    .card-value {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #065f46;
      border-left: 3px solid #059669;
      padding-left: 8px;
      margin: 18px 0 10px 0;
    }
    .image-preview-container {
      display: flex;
      gap: 16px;
      align-items: center;
      background: #f1f5f9;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .image-preview {
      width: 140px;
      height: 140px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
    }
    ul {
      margin: 4px 0 0 0;
      padding-left: 18px;
    }
    li {
      margin-bottom: 4px;
      color: #334155;
    }
    .footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      color: #94a3b8;
    }
    .print-button {
      background: #059669;
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; text-align: right;">
    <button class="print-button" onclick="window.print()">Print or Save as PDF</button>
  </div>

  <div class="header-bar">
    <div>
      <h1 class="brand-title">Agro Uzhavan</h1>
      <div class="brand-subtitle">${t.intelligentAgriculture || 'Intelligent Agriculture & Precision Diagnostics'}</div>
    </div>
    <div class="doc-meta">
      <div>${t.reportId || 'Report ID'}: <strong>${docId}</strong></div>
      <div>${t.reportDate || 'Date & Time'}: <strong>${dateStr}</strong></div>
      <div>${t.modelEngine || 'Model Engine'}: <strong>${result.architectureModel || 'Gemini Vision AI'}</strong></div>
    </div>
  </div>

  ${farm ? `
  <div class="card" style="margin-bottom: 16px;">
    <div class="card-title">${t.farmLocation || 'Target Farm Location & Metadata'}</div>
    <div style="display: flex; justify-content: space-between; font-size: 12px;">
      <div><strong>${t.farm || 'Farm'}:</strong> ${farm.name}</div>
      <div><strong>${t.location || 'Location'}:</strong> ${farm.locationName}</div>
      <div><strong>${t.soilType || 'Soil Type'}:</strong> ${farm.soilType}</div>
      <div><strong>${t.farmSize || 'Area'}:</strong> ${farm.areaAcres} ${t.acres || 'Acres'}</div>
    </div>
  </div>
  ` : ''}

  ${result.imageUrl ? `
  <div class="image-preview-container">
    <img src="${result.imageUrl}" alt="Crop Specimen" class="image-preview" />
    <div style="flex: 1;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
        <span class="badge ${result.isHealthy ? 'badge-healthy' : 'badge-diseased'}">
          ${result.isHealthy ? (t.healthyLeaf || 'HEALTHY SPECIMEN') : (result.diseaseStage || t.infected || 'INFECTED')}
        </span>
        <span style="font-size: 11px; color: #64748b;">${t.confidenceScore || 'Confidence'}: <strong>${(result.confidenceScore * 100).toFixed(1)}%</strong></span>
      </div>
      <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">
        ${result.diseaseName}
      </div>
      <div style="font-size: 12px; color: #475569; font-style: italic;">
        ${t.cropSpecies || 'Identified Specimen'}: ${result.cropGuess} · <em>${result.scientificName || ''}</em>
      </div>
    </div>
  </div>
  ` : ''}

  <div class="grid-4">
    <div class="card">
      <div class="card-title">${t.severityPercentage || 'Severity Level'}</div>
      <div class="card-value" style="color: ${result.severityPercentage > 40 ? '#b91c1c' : result.severityPercentage > 15 ? '#b45309' : '#047857'}">
        ${result.severityPercentage}%
      </div>
    </div>
    <div class="card">
      <div class="card-title">${t.affectedArea || 'Affected Canopy'}</div>
      <div class="card-value">${result.affectedLeafAreaPct}%</div>
    </div>
    <div class="card">
      <div class="card-title">${t.infectionStage || 'Infection Stage'}</div>
      <div class="card-value" style="font-size: 12px;">${result.diseaseStage}</div>
    </div>
    <div class="card">
      <div class="card-title">${t.riskLevel || 'Spread Risk'}</div>
      <div class="card-value" style="font-size: 12px; color: ${result.spreadRisk === 'High' ? '#b91c1c' : '#047857'}">
        ${result.spreadRisk || 'Moderate'}
      </div>
    </div>
  </div>

  <div class="section-title">1. ${t.causalPathogen || 'Causal Agent & Epidemiology'}</div>
  <p style="margin: 0 0 12px 0; color: #334155; line-height: 1.6;">
    ${result.cause}
  </p>

  <div class="section-title">2. ${t.visualSymptoms || 'Visual Foliar Diagnostic Symptoms'}</div>
  <ul>
    ${result.symptoms.map(s => `<li>${s}</li>`).join('')}
  </ul>

  <div class="grid-2" style="margin-top: 16px;">
    <div class="card" style="border-left: 4px solid #10b981;">
      <div class="card-title" style="color: #047857;">🌱 ${t.organicTreatments || 'Biological & Organic Protocol'}</div>
      <ul>
        ${result.organicTreatment.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>
    <div class="card" style="border-left: 4px solid #ef4444;">
      <div class="card-title" style="color: #b91c1c;">🧪 ${t.chemicalTreatments || 'Chemical Protection & Fungicides'}</div>
      <ul>
        ${result.chemicalTreatment.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>
  </div>

  ${result.dosage ? `
  <div class="card" style="margin-top: 16px; background-color: #f0fdf4; border-color: #bbf7d0;">
    <div class="card-title" style="color: #166534;">📐 ${t.dosageAdvice || 'Recommended Spray Dosage & Application Timing'}</div>
    <p style="margin: 0; color: #14532d; font-weight: 500;">
      ${result.dosage} ${result.applicationMethod ? `(${result.applicationMethod})` : ''}
    </p>
  </div>
  ` : ''}

  ${result.ppePrecautions && result.ppePrecautions.length > 0 ? `
  <div class="section-title">3. ${t.safetyGuidelines || 'Personal Protective Equipment (PPE) & Harvest Safety'}</div>
  <ul>
    ${result.ppePrecautions.map(p => `<li>${p}</li>`).join('')}
  </ul>
  ` : ''}

  <div class="footer">
    <div>
      ${t.digitallySigned || 'Digitally Generated by Agro Uzhavan Autonomous AI Engine'} · ${t.certifiedValid || 'Certified Agronomy Dossier'}
    </div>
    <div>
      ${t.page || 'Page'} 1 / 1
    </div>
  </div>
</body>
</html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}
