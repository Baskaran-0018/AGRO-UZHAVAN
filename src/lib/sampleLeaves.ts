import { DiseaseDetectionResult } from '../types/agro';

/**
 * Preset leaf specimens for quick testing and demonstration of plant disease recognition.
 */
export interface SampleSpecimen {
  id: string;
  name: string;
  crop: string;
  expectedDisease: string;
  scientificName: string;
  isHealthy: boolean;
  dataUrl: string;
  diagnostic: DiseaseDetectionResult;
}

// Generates crisp SVG data URIs representing distinct diseased and healthy crop leaves
function createLeafSvgDataUrl(bgHue: string, spotColor: string, isHealthy: boolean, label: string): string {
  const spots = isHealthy
    ? ''
    : `
      <circle cx="150" cy="120" r="18" fill="${spotColor}" opacity="0.85" />
      <circle cx="150" cy="120" r="26" fill="${spotColor}" opacity="0.25" />
      <circle cx="190" cy="160" r="12" fill="${spotColor}" opacity="0.9" />
      <circle cx="110" cy="180" r="15" fill="${spotColor}" opacity="0.85" />
      <circle cx="130" cy="220" r="20" fill="${spotColor}" opacity="0.8" />
      <circle cx="170" cy="240" r="14" fill="${spotColor}" opacity="0.85" />
      <circle cx="210" cy="200" r="10" fill="${spotColor}" opacity="0.75" />
      <!-- Concentric Necrotic Target Rings -->
      <circle cx="150" cy="120" r="10" fill="none" stroke="#451a03" stroke-width="2" />
      <ellipse cx="145" cy="170" rx="45" ry="30" fill="none" stroke="${spotColor}" stroke-width="3" stroke-dasharray="4,4" opacity="0.6" />
    `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="600" height="600">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgHue}"/>
        <stop offset="100%" stop-color="#14532d"/>
      </linearGradient>
    </defs>
    <rect width="300" height="300" fill="url(#bgGrad)" />
    <!-- Leaf Stem -->
    <path d="M 150 280 C 150 220 150 180 150 40" stroke="#166534" stroke-width="5" stroke-linecap="round" fill="none"/>
    <!-- Leaf Blade -->
    <path d="M 150 40 C 230 90 250 200 150 270 C 50 200 70 90 150 40 Z" fill="url(#leafGrad)" stroke="#14532d" stroke-width="2" />
    <!-- Veins -->
    <path d="M 150 80 Q 190 100 215 120 M 150 120 Q 200 145 225 170 M 150 160 Q 200 185 220 210 M 150 200 Q 185 220 200 240" stroke="#166534" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
    <path d="M 150 80 Q 110 100 85 120 M 150 120 Q 100 145 75 170 M 150 160 Q 100 185 80 210 M 150 200 Q 115 220 100 240" stroke="#166534" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
    ${spots}
    <!-- Label Banner -->
    <rect x="15" y="15" width="270" height="28" rx="6" fill="#0f172a" opacity="0.85" />
    <text x="150" y="33" fill="#ffffff" font-size="11" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">${label}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_SPECIMENS: SampleSpecimen[] = [
  {
    id: 'sample-tomato-blight',
    name: 'Tomato Early Blight',
    crop: 'Tomato (Solanum lycopersicum)',
    expectedDisease: 'Tomato Early Blight',
    scientificName: 'Alternaria solani',
    isHealthy: false,
    dataUrl: createLeafSvgDataUrl('#4ade80', '#78350f', false, 'Tomato Leaf · Early Blight Specimen'),
    diagnostic: {
      id: 'diag-sample-tomato',
      timestamp: new Date().toISOString(),
      cropGuess: 'Tomato (Solanum lycopersicum)',
      isHealthy: false,
      diseaseName: 'Tomato Early Blight',
      scientificName: 'Alternaria solani',
      diseaseStage: 'Moderate Infection (Spreading)',
      severityPercentage: 38,
      confidenceScore: 0.984,
      affectedLeafAreaPct: 28,
      architectureModel: 'Gemini Multimodal Vision AI',
      cause: 'Fungal conidia spores disseminated by splashing rainfall, wind turbulence, and prolonged leaf canopy wetness exceeding 8 hours.',
      symptoms: [
        'Concentric circular dark-brown necrotic lesions (target-board pattern)',
        'Pronounced chlorotic yellow halos encircling primary necrotic spots',
        'Premature senescence and downward leaf curling on lower canopy foliage'
      ],
      organicTreatment: [
        'Cold-pressed Neem Oil 10,000 PPM @ 3.5 ml/litre with organic soap emulsifier',
        'Trichoderma viride bio-fungicide @ 5 g/litre early morning foliar drench',
        'Prune lower infected leaves 20cm above soil line and bury safely'
      ],
      chemicalTreatment: [
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml/litre water',
        'Mancozeb 75% WP @ 2.5 g/litre protective barrier spray',
        'Chlorothalonil 75% WP @ 2.0 g/litre preventive application'
      ],
      recommendedFungicides: ['Azoxystrobin + Difenoconazole', 'Mancozeb 75 WP', 'Chlorothalonil', 'Copper Oxychloride'],
      recommendedPesticides: ['Neem Azadirachtin', 'Bio-Sulfur'],
      dosage: '200 Litres spray solution per acre with hollow-cone nozzles for complete leaf surface coverage.',
      applicationMethod: 'Foliar spray during early morning (06:30 - 09:30 AM) on dry foliage.',
      safetyInstructions: [
        'Wear mandatory PPE: respirator mask, nitrile gloves, protective apron',
        'Observe 5-day Pre-Harvest Interval (PHI) before fruit picking',
        'Avoid spraying when wind speed exceeds 12 km/h to prevent drift'
      ],
      preventionTips: [
        'Maintain 60 cm plant spacing to maximize solar penetration and airflow',
        'Adopt ground drip irrigation to eliminate overhead water splashing',
        'Apply potassium sulfate (00:00:50) foliar spray to strengthen leaf epidermis'
      ],
      recoveryTime: '7 - 10 days post curative systemic application',
      spreadRisk: 'Moderate to High'
    }
  },
  {
    id: 'sample-potato-late-blight',
    name: 'Potato Late Blight',
    crop: 'Potato (Solanum tuberosum)',
    expectedDisease: 'Potato Late Blight',
    scientificName: 'Phytophthora infestans',
    isHealthy: false,
    dataUrl: createLeafSvgDataUrl('#22c55e', '#1c1917', false, 'Potato Leaf · Late Blight Specimen'),
    diagnostic: {
      id: 'diag-sample-potato',
      timestamp: new Date().toISOString(),
      cropGuess: 'Potato (Solanum tuberosum)',
      isHealthy: false,
      diseaseName: 'Potato Late Blight',
      scientificName: 'Phytophthora infestans',
      diseaseStage: 'Active Sporulation (High Severity)',
      severityPercentage: 46,
      confidenceScore: 0.991,
      affectedLeafAreaPct: 35,
      architectureModel: 'Gemini Multimodal Vision AI',
      cause: 'Oomycete pathogen favored by cool, highly humid weather (15-20°C, RH >90%). Rapid sporulation destroys photosynthetic canopy.',
      symptoms: [
        'Water-soaked irregular pale-to-dark brown necrotic blotches on leaf tips and margins',
        'Fine white downy mildew / mycelial growth visible on leaf undersides in humid mornings',
        'Rapid stem lesion progression causing collapse of whole foliage stems'
      ],
      organicTreatment: [
        'Bordeaux mixture (1% Copper sulfate + Lime) preventive spray',
        'Bacillus subtilis bio-fungicide @ 4 g/litre soil and canopy drench',
        'Immediate destruction of cull piles and infected volunteer tubers'
      ],
      chemicalTreatment: [
        'Dimethomorph 50% WP @ 1.0 g/litre + Mancozeb 75% WP @ 2.0 g/litre',
        'Cymoxanil 8% + Mancozeb 64% WP @ 2.5 g/litre curative spray',
        'Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5 g/litre'
      ],
      recommendedFungicides: ['Dimethomorph + Mancozeb', 'Cymoxanil + Mancozeb', 'Metalaxyl-M', 'Fluopicolide'],
      recommendedPesticides: ['Neem oil bio-repellent'],
      dosage: '250 Litres spray volume per acre with high-pressure mist sprayer.',
      applicationMethod: 'Foliar canopy spray ensuring full wetting of upper and lower leaf surfaces.',
      safetyInstructions: [
        'Wear full protective suit, eye goggles, and rubber boots during application',
        'Adhere to strict 7-day Pre-Harvest Interval (PHI)',
        'Do not mix chemical fungicides with strong alkaline fertilizers'
      ],
      preventionTips: [
        'Plant certified disease-free seed tubers with high late-blight resistance',
        'Avoid excessive late nitrogen applications that create dense succulent canopies',
        'Hill up soil well around tuber beds to prevent zoospores from washing onto tubers'
      ],
      recoveryTime: '5 - 8 days under systemic fungicide regime',
      spreadRisk: 'High (Severe Epidemic Potential)'
    }
  },
  {
    id: 'sample-rice-blast',
    name: 'Rice Leaf Blast',
    crop: 'Rice / Paddy (Oryza sativa)',
    expectedDisease: 'Rice Leaf Blast',
    scientificName: 'Magnaporthe oryzae',
    isHealthy: false,
    dataUrl: createLeafSvgDataUrl('#86efac', '#991b1b', false, 'Rice Leaf · Blast Lesion Specimen'),
    diagnostic: {
      id: 'diag-sample-rice',
      timestamp: new Date().toISOString(),
      cropGuess: 'Rice / Paddy (Oryza sativa)',
      isHealthy: false,
      diseaseName: 'Rice Leaf Blast',
      scientificName: 'Magnaporthe oryzae',
      diseaseStage: 'Spindle Lesion Phase (Moderate)',
      severityPercentage: 34,
      confidenceScore: 0.988,
      affectedLeafAreaPct: 24,
      architectureModel: 'Gemini Multimodal Vision AI',
      cause: 'Airborne fungal spores thriving during cloudy overcast days, high relative humidity (>85%), and night temperatures of 19-24°C.',
      symptoms: [
        'Characteristic diamond/spindle-shaped lesions with grey/whitish centers and reddish-brown borders',
        'Lesions coalesce causing complete leaf tip drying and blighting',
        'Pinhead-sized dark necrotic specks developing into elongated eye-spots'
      ],
      organicTreatment: [
        'Pseudomonas fluorescens @ 10 g/litre foliar spray & seed treatment inoculant',
        'Cow urine (5%) + Neem leaf extract decoction preventive foliar spray',
        'Silicon bio-fertilizer application to fortify leaf cuticle silica cells'
      ],
      chemicalTreatment: [
        'Tricyclazole 75% WP @ 0.6 g/litre water (curative & preventive gold standard)',
        'Isoprothiolane 40% EC @ 1.5 ml/litre water',
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml/litre'
      ],
      recommendedFungicides: ['Tricyclazole 75 WP', 'Isoprothiolane 40 EC', 'Kasugamycin 3% SL', 'Carbendazim 50 WP'],
      recommendedPesticides: ['Neem oil 1500 PPM'],
      dosage: '200 Litres spray solution per acre with flat-fan nozzle.',
      applicationMethod: 'Foliar spray at tillering and panicle initiation stages.',
      safetyInstructions: [
        'Wear protective chemical mask and rubber gloves',
        'PHI: 14 days before paddy harvesting',
        'Ensure spray equipment is thoroughly rinsed after application'
      ],
      preventionTips: [
        'Avoid excessive split urea top-dressing during vegetative and booting stages',
        'Maintain continuous 2-3 cm shallow water level without drying-stressing fields',
        'Burn or compost infected paddy stubble after harvest'
      ],
      recoveryTime: '8 - 12 days post curative treatment',
      spreadRisk: 'Moderate to High'
    }
  },
  {
    id: 'sample-wheat-rust',
    name: 'Wheat Leaf Rust',
    crop: 'Wheat (Triticum aestivum)',
    expectedDisease: 'Wheat Brown / Leaf Rust',
    scientificName: 'Puccinia triticina',
    isHealthy: false,
    dataUrl: createLeafSvgDataUrl('#6ee7b7', '#b45309', false, 'Wheat Leaf · Brown Rust Pustules'),
    diagnostic: {
      id: 'diag-sample-wheat',
      timestamp: new Date().toISOString(),
      cropGuess: 'Wheat (Triticum aestivum)',
      isHealthy: false,
      diseaseName: 'Wheat Brown / Leaf Rust',
      scientificName: 'Puccinia triticina',
      diseaseStage: 'Uredinial Pustule Phase',
      severityPercentage: 30,
      confidenceScore: 0.992,
      affectedLeafAreaPct: 22,
      architectureModel: 'Gemini Multimodal Vision AI',
      cause: 'Urediniospores carried by high-altitude wind currents across agricultural regions. Moderate temperatures (18-25°C) and dew trigger spore germination.',
      symptoms: [
        'Small, round-to-oval orange-brown powdery pustules scattered randomly across upper leaf blade',
        'Pustules rupture epidermal cells exposing powdery brown rust spores on farmer contact',
        'Premature leaf chlorosis and accelerated grain shriveling'
      ],
      organicTreatment: [
        'Neem Azadirachtin 10,000 PPM @ 3 ml/litre spray',
        'Bio-fungicide Trichoderma harzianum @ 5 g/litre',
        'Foliar potassium silicate spray to enhance structural resistance'
      ],
      chemicalTreatment: [
        'Propiconazole 25% EC @ 1.0 ml/litre water (Tilt / standard systemic triazole)',
        'Tebuconazole 25.9% EC @ 1.0 ml/litre water',
        'Mancozeb 75% WP @ 2.5 g/litre barrier spray'
      ],
      recommendedFungicides: ['Propiconazole 25 EC', 'Tebuconazole 25.9 EC', 'Mancozeb 75 WP', 'Azoxystrobin'],
      recommendedPesticides: ['Bio-Sulfur'],
      dosage: '200 Litres solution per acre with high-pressure tractor-mounted or knapsack sprayer.',
      applicationMethod: 'Foliar spray at first detection of orange pustules on flag leaf.',
      safetyInstructions: [
        'Wear respirator mask and safety goggles',
        'Observe 15-day Pre-Harvest Interval (PHI)',
        'Wash hands and change clothes after spraying'
      ],
      preventionTips: [
        'Sow rust-resistant varieties recommended for your agro-climatic zone',
        'Avoid late sowing of wheat to dodge peak spring spore showers',
        'Balanced NPK fertilisation with adequate potassium'
      ],
      recoveryTime: '7 - 10 days post triazole application',
      spreadRisk: 'Moderate'
    }
  },
  {
    id: 'sample-healthy-pepper',
    name: 'Healthy Pepper Leaf',
    crop: 'Bell Pepper (Capsicum annuum)',
    expectedDisease: 'Healthy Leaf (No Pathogens Detected)',
    scientificName: 'No pathogen detected (Physiologically Optimal)',
    isHealthy: true,
    dataUrl: createLeafSvgDataUrl('#16a34a', '', true, 'Bell Pepper · Healthy Foliage Specimen'),
    diagnostic: {
      id: 'diag-sample-healthy',
      timestamp: new Date().toISOString(),
      cropGuess: 'Bell Pepper (Capsicum annuum)',
      isHealthy: true,
      diseaseName: 'Healthy Foliage',
      scientificName: 'No pathogenic organisms detected',
      diseaseStage: 'Optimal Vigor & Photosynthesis',
      severityPercentage: 0,
      confidenceScore: 0.995,
      affectedLeafAreaPct: 0,
      architectureModel: 'Gemini Multimodal Vision AI',
      cause: 'Optimal farm agronomy: balanced soil N-P-K nutrient availability, appropriate moisture levels, and active prophylactic bio-control management.',
      symptoms: [
        'Uniform vibrant emerald green pigmentation across leaf blade and midrib',
        'Firm, healthy turgor pressure with intact leaf margins and cuticle',
        'Zero fungal pustules, bacterial watersoaking, chlorosis, or necrotic spots'
      ],
      organicTreatment: [
        'Continue regular preventative foliar spray of cold-pressed Neem Oil (2ml/L) every 14 days',
        'Apply vermicompost tea or seaweed bio-stimulant for sustained plant immunity',
        'Maintain beneficial predatory insect populations (ladybird beetles, lacewings)'
      ],
      chemicalTreatment: [
        'No chemical fungicides or curative interventions required.',
        'Preserve beneficial soil microbiome and pollinator activity.'
      ],
      recommendedFungicides: [],
      recommendedPesticides: ['Preventive Neem Extract (Optional)'],
      dosage: 'Standard prophylactic nutrient spray volume (150-200 L/acre).',
      applicationMethod: 'Early morning routine foliar nutrition or fertigation.',
      safetyInstructions: [
        'Follow standard agricultural safety and clean handling procedures',
        'Ensure routine water filtration for drip irrigation lines'
      ],
      preventionTips: [
        'Maintain balanced N-P-K fertilisation according to current growth stage',
        'Keep mulch intact to preserve root-zone soil moisture and suppress weeds',
        'Perform regular scouting across all farm quadrants twice weekly'
      ],
      recoveryTime: 'Continuous Optimal Plant Health',
      spreadRisk: 'Zero'
    }
  },
];
