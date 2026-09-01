import React, { useState } from 'react';
import { Pill, Search, ShieldCheck, AlertTriangle, Calculator, Sparkles } from 'lucide-react';
import { FarmProfile } from '../../types/agro';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';

interface MedicineGuideViewProps {
  activeFarm: FarmProfile;
  lang: SupportedLang;
}

const MEDICINES_DATABASE = [
  {
    id: 'med-1',
    brandName: 'Amistar Top (Syngenta)',
    activeIngredient: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
    category: 'Fungicide',
    targetPests: ['Yellow Rust', 'Sheath Blight', 'Anthracnose', 'Early Blight'],
    targetCrops: ['Wheat', 'Rice', 'Tomato', 'Chili', 'Maize'],
    dosagePerAcre: '200 ml in 200 Litres Water',
    dosagePerLitre: '1.0 ml / Litre',
    type: 'Chemical',
    phiDays: 7,
    toxicity: 'Green (Low Mammalian Toxicity)',
    usageInstructions: 'Apply foliar spray during early morning or evening. Ensure uniform coverage of upper and lower leaf surfaces.',
  },
  {
    id: 'med-2',
    brandName: 'Tilt 25 EC',
    activeIngredient: 'Propiconazole 25% EC',
    category: 'Fungicide',
    targetPests: ['Karnal Bunt', 'Leaf Spot', 'Rusts', 'Tikka Disease'],
    targetCrops: ['Wheat', 'Groundnut', 'Soybean', 'Tea'],
    dosagePerAcre: '200 ml in 200 Litres Water',
    dosagePerLitre: '1.0 ml / Litre',
    type: 'Chemical',
    phiDays: 14,
    toxicity: 'Blue (Moderately Toxic)',
    usageInstructions: 'Spray at first sign of rust pustules. Repeat after 14 days if spore pressure persists.',
  },
  {
    id: 'med-3',
    brandName: 'Neem Gold 10,000 PPM',
    activeIngredient: 'Azadirachtin 1.0% EC (Cold-Pressed Organic Neem)',
    category: 'Bio-Pesticide',
    targetPests: ['Aphids', 'Whiteflies', 'Thrips', 'Spider Mites', 'Caterpillars'],
    targetCrops: ['All Vegetables', 'Cotton', 'Pulses', 'Fruits'],
    dosagePerAcre: '500 ml in 200 Litres Water',
    dosagePerLitre: '2.5 ml / Litre',
    type: 'Organic',
    phiDays: 0,
    toxicity: 'Green (100% Organic & Bee-Safe)',
    usageInstructions: 'Acts as anti-feedant, oviposition deterrent, and insect growth regulator. Safe for beneficial pollinators.',
  },
  {
    id: 'med-4',
    brandName: 'TrichoShield Bio-Fungicide',
    activeIngredient: 'Trichoderma viride 1.5% WP (2x10^8 CFU/g)',
    category: 'Bio-Fungicide',
    targetPests: ['Root Rot', 'Fusarium Wilt', 'Damping Off', 'Collar Rot'],
    targetCrops: ['Tomato', 'Potato', 'Pulses', 'Oilseeds', 'Rice'],
    dosagePerAcre: '1.0 kg in 50 kg Farmyard Manure or 5g / Litre spray',
    dosagePerLitre: '5.0 g / Litre',
    type: 'Organic',
    phiDays: 0,
    toxicity: 'Green (Organic Bio-Agent)',
    usageInstructions: 'Incorporate into soil near root zone during land prep or apply via drip fertigation.',
  },
  {
    id: 'med-5',
    brandName: 'Coragen (FMC)',
    activeIngredient: 'Chlorantraniliprole 18.5% SC',
    category: 'Insecticide',
    targetPests: ['Stem Borer', 'Fruit Borer (Helicoverpa)', 'Fall Armyworm', 'Diamondback Moth'],
    targetCrops: ['Rice', 'Maize', 'Tomato', 'Cabbage', 'Sugarcane'],
    dosagePerAcre: '60 ml in 200 Litres Water',
    dosagePerLitre: '0.3 ml / Litre',
    type: 'Chemical',
    phiDays: 3,
    toxicity: 'Green (Low Non-Target Toxicity)',
    usageInstructions: 'Translaminar activity protects both sides of leaves. Spray at early larval instar stage.',
  },
  {
    id: 'med-6',
    brandName: 'Blue Copper 50 WP',
    activeIngredient: 'Copper Oxychloride 50% WP',
    category: 'Fungicide / Bactericide',
    targetPests: ['Bacterial Leaf Blight', 'Downy Mildew', 'Canker', 'Black Rot'],
    targetCrops: ['Paddy', 'Citrus', 'Tomato', 'Potato', 'Grapes'],
    dosagePerAcre: '500 g in 200 Litres Water',
    dosagePerLitre: '2.5 g / Litre',
    type: 'Chemical',
    phiDays: 5,
    toxicity: 'Blue (Moderately Toxic)',
    usageInstructions: 'Broad spectrum contact bactericide. Do not mix with acidic fertilizers or alkaline chemicals.',
  }
];

export const MedicineGuideView: React.FC<MedicineGuideViewProps> = ({ activeFarm, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Organic' | 'Chemical'>('All');
  const [calcAcreage, setCalcAcreage] = useState(activeFarm.areaAcres);

  const filtered = MEDICINES_DATABASE.filter((m) => {
    const matchSearch =
      m.brandName.toLowerCase().includes(search.toLowerCase()) ||
      m.activeIngredient.toLowerCase().includes(search.toLowerCase()) ||
      m.targetPests.some(p => p.toLowerCase().includes(search.toLowerCase())) ||
      m.targetCrops.some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchType = filterType === 'All' || m.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200 uppercase tracking-wider">
            {t.pesticideDirectory || 'Agronomic Pharmacy Directory'}
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">{t.medicineGuide} & {t.dosage || 'Safe Dosages'}</h1>
          <p className="text-xs text-slate-500 font-medium">{t.searchMedicines || 'Search fungicides, pesticides, bio-controls with automated farm dosage calculators'}</p>
        </div>
      </div>

      {/* Filter and Calculator Bar */}
      <div className="p-4 rounded-2xl bg-white border border-emerald-100 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center shadow-xs">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder={t.searchMedicines || 'Search by disease, crop (e.g. Wheat, Tomato), or chemical name...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:border-emerald-500 outline-none"
          />
        </div>

        <div className="sm:col-span-3 flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['All', 'Organic', 'Chemical'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`flex-1 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filterType === f ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f === 'All' ? (t.allCategories || 'All') : f === 'Organic' ? (t.organic || 'Organic') : (t.chemical || 'Chemical')}
            </button>
          ))}
        </div>

        <div className="sm:col-span-3 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700">
          <Calculator className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-slate-500 shrink-0 font-medium">{t.farmSize || 'Farm Area'}:</span>
          <input
            type="number"
            step="0.5"
            min="0.5"
            value={calcAcreage}
            onChange={(e) => setCalcAcreage(Number(e.target.value))}
            className="w-16 bg-white border border-slate-300 px-1.5 py-0.5 rounded text-center text-xs font-bold text-emerald-700 outline-none"
          />
          <span className="text-slate-500">{t.acres || 'Acres'}</span>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((med) => {
          const isOrg = med.type === 'Organic';
          return (
            <div
              key={med.id}
              className="p-5 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      isOrg
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {isOrg ? (t.organic || 'Organic') : (t.chemical || 'Chemical')} · {med.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{t.waitingPeriod || 'PHI'}: {med.phiDays} {t.daysActive || 'Days'}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{med.brandName}</h3>
                <p className="text-xs text-emerald-700 font-mono mt-0.5">{med.activeIngredient}</p>

                {/* Target Pests & Crops */}
                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase block">{t.targetPests || 'Target Pests / Pathogens:'}</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {(med.targetPests || []).map((p, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-50 text-slate-700 text-[10px] border border-slate-200">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase block">{t.approvedCrops || 'Approved Crops:'}</span>
                    <span className="text-slate-700 text-[11px] font-medium">{(med.targetCrops || []).join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Dosage for Farm Area */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{t.dosage || 'Dosage per Litre'}:</span>
                  <span className="font-mono font-bold text-slate-800">{med.dosagePerLitre}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                  <span className="text-emerald-700 font-bold">{t.totalFor || 'Total for'} {calcAcreage} {t.acres || 'Acres'}:</span>
                  <span className="font-mono font-black text-amber-700">
                    {med.dosagePerAcre.includes('ml')
                      ? `${(parseFloat(med.dosagePerAcre) * calcAcreage).toFixed(0)} ml in ${(200 * calcAcreage).toFixed(0)}L`
                      : `${(parseFloat(med.dosagePerAcre) * calcAcreage).toFixed(1)} kg`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
