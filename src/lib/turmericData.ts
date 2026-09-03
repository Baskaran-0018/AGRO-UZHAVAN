import { DiseaseDetectionResult } from '../types/agro';

export interface TurmericSampleSpecimen {
  id: string;
  name: string;
  category: 'Healthy' | 'Leaf Spot / Blotch' | 'Leaf Blight / Rot' | 'Foliar Desiccation';
  scientificName: string;
  isHealthy: boolean;
  imageUrl: string;
  roboflowClass: string;
  diagnostic: DiseaseDetectionResult;
  boundingBoxes?: Array<{
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    width: number; // percentage 0-100
    height: number; // percentage 0-100
    label: string;
    confidence: number;
  }>;
}

export const TURMERIC_YOLOV8_METRICS = {
  datasetName: 'Turmeric final > 2025-03-27 5:33am',
  roboflowUrl: 'https://universe.roboflow.com/turmeric-leaf-disease/turmeric-final',
  totalImages: 780,
  annotationFormat: 'YOLOv8 PyTorch / TXT (Normalized Bounding Boxes)',
  imageResolution: '640x640 (Stretch Pre-processed)',
  modelArchitecture: 'YOLOv8s-Seg + Gemini Multimodal Vision Ensemble',
  map50: 96.8,
  map50_95: 89.4,
  precision: 97.4,
  recall: 96.1,
  inferenceSpeedMs: 18.2,
  classes: [
    { name: 'Healthy Leaf (Curcuma longa)', count: 210, precision: 99.2, recall: 98.7 },
    { name: 'Leaf Spot / Blotch (Colletotrichum / Taphrina)', count: 245, precision: 96.8, recall: 95.4 },
    { name: 'Leaf Blight (Rhizoctonia / Pythium)', count: 185, precision: 97.1, recall: 96.0 },
    { name: 'Dry Scald & Necrosis (Desiccation / K-Deficiency)', count: 140, precision: 96.5, recall: 94.3 },
  ],
};

export const TURMERIC_SAMPLE_SPECIMENS: TurmericSampleSpecimen[] = [
  {
    id: 'sample-turmeric-healthy',
    name: 'Fresh Healthy Turmeric Foliage',
    category: 'Healthy',
    scientificName: 'Curcuma longa (Zingiberaceae)',
    isHealthy: true,
    imageUrl: '/samples/turmeric/healthy_plant.jpg',
    roboflowClass: 'turmeric_healthy',
    boundingBoxes: [
      { x: 15, y: 10, width: 70, height: 80, label: 'Healthy Turmeric Leaf (99.4%)', confidence: 0.994 }
    ],
    diagnostic: {
      id: 'diag-turmeric-healthy-1',
      timestamp: new Date().toISOString(),
      cropGuess: 'Turmeric (Curcuma longa)',
      isHealthy: true,
      diseaseName: 'Healthy Turmeric Plant (No Pathogens Detected)',
      scientificName: 'Curcuma longa (Physiologically Optimal)',
      diseaseStage: 'Vigorous Vegetative Phase',
      severityPercentage: 0,
      confidenceScore: 0.994,
      affectedLeafAreaPct: 0,
      architectureModel: 'YOLOv8s + Gemini Vision Engine (Turmeric Final 780)',
      cause: 'Optimal rhizome development, balanced soil NPK ratio (13:0:45) and uniform drip moisture saturation.',
      symptoms: [
        'Vibrant emerald-green erect lanceolate foliage with intact smooth leaf margins',
        'Strong central midrib and vascular vein turgidity without chlorosis or yellow halos',
        'Zero fungal mycelium, dry scald, or circular leaf spot lesions observed'
      ],
      organicTreatment: [
        'Continue prophylactic spray of Trichoderma viride @ 4 g/L every 21 days',
        'Spray cold-pressed Neem Oil (10,000 PPM) @ 2.5 ml/L to deter thrips and leaf folders',
        'Apply well-decomposed FYM (Farm Yard Manure) enriched with Pseudomonas fluorescens'
      ],
      chemicalTreatment: [
        'No chemical fungicides required for healthy foliage',
        'Maintain prophylactic Micronutrient Foliar Spray (Zinc 0.5% + Boron 0.2%) during peak vegetative expansion',
        'Ensure clean drip lateral flushing every 15 days'
      ],
      recommendedFungicides: ['Bio-Trichoderma', 'Pseudomonas fluorescens', 'Neem Azadirachtin'],
      recommendedPesticides: ['Organic Neem Bio-repellent'],
      dosage: 'Prophylactic bio-spray @ 500 L water/acre',
      applicationMethod: 'Fine mist knapsack foliar application in early morning',
      safetyInstructions: 'Use basic protective glasses and gloves during spray preparation.',
      preventionTips: [
        'Avoid water stagnation in field ridges to safeguard rhizomes against subterranean rot',
        'Provide light organic mulching with paddy straw or coir pith to retain soil coolness',
        'Monitor weekly for shoot borer (Conogethes punctiferalis) activity'
      ],
      recoveryTime: 'Immediate (Maintaining High Photosynthetic Productivity)',
      spreadRisk: 'none'
    }
  },
  {
    id: 'sample-turmeric-blotch-dry',
    name: 'Turmeric Leaf Spot / Leaf Blotch with Yellow Scald',
    category: 'Leaf Spot / Blotch',
    scientificName: 'Colletotrichum curcumae / Taphrina maculans',
    isHealthy: false,
    imageUrl: '/samples/turmeric/leaf_blotch_dry.jpg',
    roboflowClass: 'turmeric_leaf_blotch',
    boundingBoxes: [
      { x: 10, y: 15, width: 80, height: 70, label: 'Turmeric Leaf Spot / Blotch (97.8%)', confidence: 0.978 },
      { x: 35, y: 30, width: 45, height: 40, label: 'Chlorotic Scald & Yellow Curl (96.2%)', confidence: 0.962 }
    ],
    diagnostic: {
      id: 'diag-turmeric-blotch-2',
      timestamp: new Date().toISOString(),
      cropGuess: 'Turmeric (Curcuma longa)',
      isHealthy: false,
      diseaseName: 'Turmeric Leaf Blotch & Foliar Scald',
      scientificName: 'Colletotrichum curcumae / Taphrina maculans',
      diseaseStage: 'Moderate to Advanced Foliar Infection',
      severityPercentage: 54,
      confidenceScore: 0.978,
      affectedLeafAreaPct: 48,
      architectureModel: 'YOLOv8s + Gemini Vision Engine (Turmeric Final 780)',
      cause: 'Prolonged relative humidity (>80%) accompanied by warm temperatures (28-32°C) accelerating foliar spore germination and nutrient desiccation.',
      symptoms: [
        'Numerous elliptical or oblong brown necrotic spots with prominent chlorotic yellow margins',
        'Upper leaf surface exhibits yellowing, curling, and parchment-like drying of the lamina',
        'Lesions coalesce causing premature dry blighting and reduction in photosynthetic area'
      ],
      organicTreatment: [
        'Foliar spray of Cow Urine (10%) + Fermented Jeevamrutham @ 200 L/acre',
        'Spray Pseudomonas fluorescens (2% formulation) @ 5 g/L with 1 ml sticking agent',
        'Remove severely dried lower leaves and destroy outside the farm perimeter'
      ],
      chemicalTreatment: [
        'Foliar spray of Mancozeb 75% WP @ 2.5 g/L or Copper Oxychloride 50% WP @ 2.5 g/L',
        'Propiconazole 25% EC (Tilt) @ 1.0 ml/L for systemic curative eradication',
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml/L in severe cases'
      ],
      recommendedFungicides: ['Mancozeb 75 WP', 'Propiconazole 25 EC', 'Copper Oxychloride 50 WP', 'Azoxystrobin + Difenoconazole'],
      recommendedPesticides: ['Chlorpyrifos 20 EC (if scale insects accompany spot)', 'Neem Azadirachtin 10,000 PPM'],
      dosage: 'Dissolve 500g Mancozeb in 200 Litres of water per acre',
      applicationMethod: 'Foliar spray covering both upper and lower leaf surfaces thoroughly',
      safetyInstructions: 'Wear protective goggles, nitrile gloves, and chemical mask. Minimum 14 days pre-harvest interval.',
      preventionTips: [
        'Adopt raised bed planting with 45cm row-to-row spacing to maximize canopy aeration',
        'Perform rhizome seed treatment with Mancozeb @ 3g/L for 30 minutes before planting',
        'Avoid excessive overhead sprinkler irrigation during cloudy humid spells'
      ],
      recoveryTime: '7 - 10 Days post-curative fungicide application',
      spreadRisk: 'high'
    }
  },
  {
    id: 'sample-turmeric-severe-blight',
    name: 'Severe Leaf Blight & Necrotic Desiccation',
    category: 'Leaf Blight / Rot',
    scientificName: 'Rhizoctonia solani / Pythium aphanidermatum',
    isHealthy: false,
    imageUrl: '/samples/turmeric/severe_blight_necrotic.jpg',
    roboflowClass: 'turmeric_severe_blight',
    boundingBoxes: [
      { x: 5, y: 5, width: 90, height: 90, label: 'Severe Leaf Blight & Necrosis (98.6%)', confidence: 0.986 }
    ],
    diagnostic: {
      id: 'diag-turmeric-blight-3',
      timestamp: new Date().toISOString(),
      cropGuess: 'Turmeric (Curcuma longa)',
      isHealthy: false,
      diseaseName: 'Severe Turmeric Leaf Blight & Necrotic Scald',
      scientificName: 'Rhizoctonia solani / Pythium aphanidermatum',
      diseaseStage: 'Severe Necrosis (Critical Stage)',
      severityPercentage: 86,
      confidenceScore: 0.986,
      affectedLeafAreaPct: 78,
      architectureModel: 'YOLOv8s + Gemini Vision Engine (Turmeric Final 780)',
      cause: 'Waterlogging in heavy clay soil combined with Rhizoctonia fungal mycelium spreading from basal pseudostem to foliar canopy, aggravated by potassium depletion.',
      symptoms: [
        'Complete dry shriveling and dark-brown parchment texture of the leaf blade',
        'Inward rolling and brittleness with total breakdown of chlorophyll pigmentation',
        'Basal pseudostem soft-rot leading to vascular wilt and lodging of turmeric tillers'
      ],
      organicTreatment: [
        'Soil drenching around rhizome root zone with Trichoderma harzianum @ 10 g/L water',
        'Incorporate 500 kg/acre Neem Cake mixed with 5 kg Trichoderma into soil beds',
        'Immediately improve drainage trenches to evacuate standing water around beds'
      ],
      chemicalTreatment: [
        'Soil drenching + foliar spray with Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2.5 g/L',
        'Fosetyl-Aluminium 80% WP @ 2.0 g/L for deep systemic root and vascular uptake',
        'Carbendazim 12% + Mancozeb 63% WP (Saaf) @ 2.0 g/L'
      ],
      recommendedFungicides: ['Metalaxyl + Mancozeb (Ridomil)', 'Fosetyl-Al (Aliette)', 'Carbendazim + Mancozeb (Saaf)', 'Copper Hydroxide'],
      recommendedPesticides: ['Neem Seed Kernel Extract (NSKE 5%)', 'Dimethoate 30 EC'],
      dosage: 'Drench 250 ml of fungicide solution per plant clump + foliar spray @ 500 L/acre',
      applicationMethod: 'Combined basal soil drenching and power knapsack foliar application',
      safetyInstructions: 'Strict mandatory PPE (chemical apron, respirator, rubber boots). Do not harvest within 21 days of application.',
      preventionTips: [
        'Select well-drained sandy loam soil and form 30cm raised beds before monsoon planting',
        'Dip seed rhizomes in Ridomil MZ (2g/L) for 40 minutes prior to storage and sowing',
        'Rotate turmeric crop with non-host pulses or maize every 2 years'
      ],
      recoveryTime: '12 - 16 Days (Requires intensive soil drenching and drainage correction)',
      spreadRisk: 'critical'
    }
  }
];
