import { DiseaseDetectionResult } from '../types/agro';

export interface SampleLeaf {
  id: string;
  name: string;
  crop: string;
  imageUrl: string;
  thumbnail: string;
  isHealthy: boolean;
  result: DiseaseDetectionResult;
}

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'sample-tomato-early-blight',
    name: 'Tomato — Early Blight (Alternaria solani)',
    crop: 'Tomato',
    imageUrl: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=200&q=80',
    isHealthy: false,
    result: {
      id: 'diag-eb-001',
      timestamp: new Date().toISOString(),
      cropGuess: 'Tomato (Solanum lycopersicum)',
      isHealthy: false,
      diseaseName: 'Early Blight',
      scientificName: 'Alternaria solani',
      diseaseStage: 'Moderate / Spreading',
      severityPercentage: 42,
      confidenceScore: 0.984,
      affectedLeafAreaPct: 38,
      architectureModel: 'Vision Transformer (ViT-B16)',
      cause: 'Fungal pathogen Alternaria solani thriving in alternating wet and dry conditions with high relative humidity (85%+) and warm temperatures (24-29°C).',
      symptoms: [
        'Dark brown to black necrotic spots with concentric "target-board" rings',
        'Yellow chlorotic halos surrounding lesions on older lower foliage',
        'Collar rot on stems and stem-end dry rot on green/ripe fruits',
        'Premature defoliation exposing fruit to sunscald'
      ],
      organicTreatment: [
        'Neem oil 1500 PPM @ 5ml/litre + sticker solution weekly',
        'Foliar spray of Trichoderma viride (10^8 cfu/g) @ 5g/litre',
        'Bordeaux mixture (1%) or Copper Oxychloride 50 WP @ 2.5g/L',
        'Prune lower 12 inches of infected leaves and burn/bury away from farm'
      ],
      chemicalTreatment: [
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1 ml/litre',
        'Mancozeb 75% WP @ 2.5 g/litre or Chlorothalonil 75% WP @ 2 g/litre',
        'Propineb 70% WP (Antracol) @ 2.5 g/litre as preventative protective spray'
      ],
      recommendedFungicides: ['Azoxystrobin + Difenoconazole', 'Mancozeb 75 WP', 'Chlorothalonil', 'Copper Hydroxide'],
      recommendedPesticides: ['Imidacloprid (for vector aphids/thrips)', 'Neem Azadirachtin 1%'],
      dosage: 'Apply 200 Litres spray solution per acre using hollow cone nozzle ensuring uniform coverage under leaves.',
      applicationMethod: 'Foliar spray during early morning (6:30 - 9:00 AM) or late evening (4:30 - 6:30 PM) on calm wind days.',
      safetyInstructions: [
        'Mandatory PPE: Wear rubber gloves, N95 respirator mask, and protective goggles during chemical mixing',
        'Withholding Period (Pre-Harvest Interval): 5 to 7 days before picking ripe tomatoes',
        'Do not spray during peak bee foraging hours to preserve pollinator biodiversity',
        'Triple rinse spray tank and dispose of containers responsibly'
      ],
      preventionTips: [
        'Practice 3-year crop rotation avoiding Solanaceae family (potato, brinjal, chilli)',
        'Use drip irrigation instead of overhead sprinklers to keep leaf canopy dry',
        'Maintain plant spacing (60 x 45 cm) and install silver/black plastic mulch'
      ],
      recoveryTime: '7 - 10 days post application with noticeable arrest of lesion margins',
      spreadRisk: 'High'
    }
  },
  {
    id: 'sample-potato-late-blight',
    name: 'Potato — Late Blight (Phytophthora infestans)',
    crop: 'Potato',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=200&q=80',
    isHealthy: false,
    result: {
      id: 'diag-lb-002',
      timestamp: new Date().toISOString(),
      cropGuess: 'Potato (Solanum tuberosum)',
      isHealthy: false,
      diseaseName: 'Late Blight',
      scientificName: 'Phytophthora infestans (Oomycete)',
      diseaseStage: 'Severe / Advanced',
      severityPercentage: 68,
      confidenceScore: 0.991,
      affectedLeafAreaPct: 62,
      architectureModel: 'EfficientNet-V2',
      cause: 'Devastating water-mold oomycete Phytophthora infestans triggered by cool, wet nights (10-15°C) and cloudy humid days (15-20°C with 90%+ RH).',
      symptoms: [
        'Water-soaked, pale to dark green lesions turning rapidly necrotic and black',
        'Delicate white fungal downy mildew growth visible on leaf undersides in morning dew',
        'Foul decaying odor in heavily infested field zones',
        'Dark brown dry rot penetrating tuber flesh'
      ],
      organicTreatment: [
        'Copper sulphate + hydrated lime (Bordeaux mixture 1:1:100)',
        'Bacillus subtilis bio-fungicide foliar drench @ 3g/L',
        'Immediate dehaulming (cutting off vines) 10 days before harvest to save tubers'
      ],
      chemicalTreatment: [
        'Cymoxanil 8% + Mancozeb 64% WP (Curzate) @ 3 g/litre',
        'Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 2.5 g/litre',
        'Dimethomorph 50% WP @ 1 g/litre or Mandipropamid 23.4% SC @ 1 ml/litre'
      ],
      recommendedFungicides: ['Cymoxanil + Mancozeb', 'Metalaxyl-M', 'Dimethomorph', 'Fluopicolide + Propamocarb'],
      recommendedPesticides: ['Spinetoram', 'Bio-sulfur'],
      dosage: '250 Litres spray solution per acre with high-pressure mist sprayer.',
      applicationMethod: 'Systemic curative foliar application every 5 to 7 days until dry weather resumes.',
      safetyInstructions: [
        'High toxicity caution: Full face shield and apron required during concentrate handling',
        'Pre-Harvest Interval (PHI): 10 days',
        'Do not dump washings in natural water bodies or ponds (aquatic organism toxicity)'
      ],
      preventionTips: [
        'Plant certified disease-free seed tubers treated with Trichoderma or Mancozeb seed dress',
        'Destroy volunteer potato plants and cull piles before season onset',
        'Avoid nitrogen over-fertilization which creates dense vulnerable foliage'
      ],
      recoveryTime: '12 - 14 days (curative halt; damaged leaf tissue will desiccate)',
      spreadRisk: 'Extremely Contagious'
    }
  },
  {
    id: 'sample-healthy-rice',
    name: 'Paddy Rice — Healthy Leaf (No Pathogen)',
    crop: 'Paddy Rice',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=200&q=80',
    isHealthy: true,
    result: {
      id: 'diag-rice-003',
      timestamp: new Date().toISOString(),
      cropGuess: 'Rice / Paddy (Oryza sativa)',
      isHealthy: true,
      diseaseName: 'Healthy Rice Crop',
      scientificName: 'N/A (No Pathogen Detected)',
      diseaseStage: 'Healthy Plant',
      severityPercentage: 0,
      confidenceScore: 0.996,
      affectedLeafAreaPct: 0,
      architectureModel: 'Vision Transformer (ViT-B16)',
      cause: 'Optimal agronomic management, robust chlorophyll photosynthesis, balanced NPK nutrition and disease-free environment.',
      symptoms: [
        'Uniform emerald-green leaf pigmentation without chlorotic lesions',
        'Vigorous leaf turgor and healthy vascular vein distribution',
        'Clean leaf sheath free from sheath blight (Rhizoctonia) lesions',
        'Optimal leaf area index (LAI)'
      ],
      organicTreatment: [
        'Continue regular monitoring and application of Panchagavya / Jeevamrutha @ 5% spray',
        'Maintain balanced water level (2-3 cm standing water during tillering)'
      ],
      chemicalTreatment: [
        'No chemical application needed.',
        'Apply scheduled preventative bio-fertilizer booster (Azospirillum + PSB)'
      ],
      recommendedFungicides: [],
      recommendedPesticides: [],
      dosage: 'N/A - Standard nutritional maintenance',
      applicationMethod: 'Routine irrigation and fertigation schedule',
      safetyInstructions: [
        'Store standard fertilizers in dry, ventilated storage away from direct sunlight'
      ],
      preventionTips: [
        'Maintain alternate wetting and drying (AWD) irrigation to improve root oxygenation',
        'Apply Zinc Sulphate 21% @ 10 kg/acre if micro-nutrient deficiency begins in nursery',
        'Monitor light traps weekly for brown planthopper (BPH) and yellow stem borer'
      ],
      recoveryTime: 'N/A - Healthy plant status',
      spreadRisk: 'Low'
    }
  },
  {
    id: 'sample-wheat-yellow-rust',
    name: 'Wheat — Stripe / Yellow Rust (Puccinia striiformis)',
    crop: 'Wheat',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=200&q=80',
    isHealthy: false,
    result: {
      id: 'diag-wr-004',
      timestamp: new Date().toISOString(),
      cropGuess: 'Wheat (Triticum aestivum)',
      isHealthy: false,
      diseaseName: 'Yellow / Stripe Rust',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      diseaseStage: 'Moderate / Spreading',
      severityPercentage: 54,
      confidenceScore: 0.978,
      affectedLeafAreaPct: 48,
      architectureModel: 'CNN-ResNet50',
      cause: 'Airborne fungal urediniospores carried by wind currents; thrives in cool humid conditions (10-18°C) with persistent fog or drizzle.',
      symptoms: [
        'Bright yellow to orange pustules arranged in prominent linear parallel stripes',
        'Yellow powder rubbing off easily on fingers upon touching the leaf surface',
        'Chlorosis and rapid leaf desiccation leading to shrivelled grains',
        'Stunted plant growth and premature ear emergence'
      ],
      organicTreatment: [
        'Foliar spray of sour buttermilk (diluted 5% in water) with cow urine',
        'Spray of bio-agent Verticillium lecanii @ 5 g/litre'
      ],
      chemicalTreatment: [
        'Propiconazole 25% EC (Tilt) @ 1 ml/litre (200 ml/acre) immediately upon first stripe sighting',
        'Tebuconazole 25.9% EC (Folicur) @ 1 ml/litre',
        'Azoxystrobin 18.2% + Cyproconazole 7.3% SC @ 1 ml/litre'
      ],
      recommendedFungicides: ['Propiconazole 25 EC', 'Tebuconazole 25.9 EC', 'Trifloxystrobin + Tebuconazole (Nativo)'],
      recommendedPesticides: [],
      dosage: '200 Litres water per acre with flat fan nozzle for complete canopy penetration.',
      applicationMethod: 'Immediate ground spraying as soon as yellow pustule stripes appear in foci patches.',
      safetyInstructions: [
        'Wear chemical-resistant gloves, boots, and face mask',
        'Re-entry interval: 24 hours after field spraying',
        'Do not graze livestock in treated fields for 15 days'
      ],
      preventionTips: [
        'Grow rust-resistant varieties like DBW 187, DBW 303, HD 3226, PBW 725',
        'Avoid late sowing; complete wheat sowing between Nov 1 - Nov 20',
        'Eradicate wild alternate weed hosts along field bunds'
      ],
      recoveryTime: '8 - 10 days to neutralize active spore pustules',
      spreadRisk: 'Extremely Contagious'
    }
  },
  {
    id: 'sample-corn-leaf-spot',
    name: 'Corn — Gray Leaf Spot (Cercospora zeae-maydis)',
    crop: 'Maize / Corn',
    imageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=200&q=80',
    isHealthy: false,
    result: {
      id: 'diag-corn-005',
      timestamp: new Date().toISOString(),
      cropGuess: 'Maize / Corn (Zea mays)',
      isHealthy: false,
      diseaseName: 'Gray Leaf Spot',
      scientificName: 'Cercospora zeae-maydis',
      diseaseStage: 'Early Stage',
      severityPercentage: 28,
      confidenceScore: 0.965,
      affectedLeafAreaPct: 22,
      architectureModel: 'YOLOv11-Agri',
      cause: 'Fungal pathogen overwintering on crop debris on soil surface, spreading upward in warm humid weather (25-32°C).',
      symptoms: [
        'Small tan spots expanding into rectangular, narrow lesions bound by leaf veins',
        'Lesions becoming grayish-tan with distinct parallel borders',
        'Extensive blighting of ear leaf during silking and grain fill',
        'Premature stalk lodging due to carbohydrate cannibalization'
      ],
      organicTreatment: [
        'Bio-fungicide spray of Bacillus amyloliquefaciens @ 2.5 g/L',
        'Deep moldboard ploughing to bury infested maize stubble residue'
      ],
      chemicalTreatment: [
        'Pyraclostrobin 133 g/L + Epoxiconazole 50 g/L @ 1.5 ml/litre',
        'Azoxystrobin 11% + Tebuconazole 18.3% SC (Custodia) @ 2 ml/litre',
        'Mancozeb 75 WP @ 2.5 g/litre'
      ],
      recommendedFungicides: ['Pyraclostrobin + Fluxapyroxad', 'Azoxystrobin + Tebuconazole', 'Mancozeb'],
      recommendedPesticides: ['Chlorantraniliprole 18.5 SC (if Fall Armyworm co-exists)'],
      dosage: '150 - 200 Litres of spray volume per acre.',
      applicationMethod: 'Foliar application targetting the mid-canopy and ear leaf before tassel (VT/R1 stage).',
      safetyInstructions: [
        'Wear eye protection and avoid skin contact with spray drift',
        'Pre-Harvest Interval (PHI): 14 days for sweet corn / grain'
      ],
      preventionTips: [
        'Rotate maize with non-grass crops like soybean, chickpea or groundnut',
        'Select hybrid varieties with high GLS tolerance ratings',
        'Avoid continuous no-till corn-on-corn cropping systems in high humidity valleys'
      ],
      recoveryTime: '7 days to stabilize lesion expansion',
      spreadRisk: 'Moderate'
    }
  }
];
