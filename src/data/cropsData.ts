import { SoilType, CropCategory, GrowthStage } from '../types/agro';

export interface CropInfo {
  name: string;
  scientificName: string;
  category: CropCategory;
  optimalSoil: SoilType[];
  tempRangeC: [number, number];
  rainfallRangeMm: [number, number];
  growthDurationDays: number;
  stages: { stage: GrowthStage; daysFromSowing: number; description: string; waterReqMm: number }[];
  baseYieldQuintalsPerAcre: number;
  averageMarketPricePerQuintalINR: number;
  fertilizerGuide: {
    basal: string;
    vegetative: string;
    flowering: string;
    grainFilling: string;
  };
  commonPests: string[];
  icon: string;
}

export const CROPS_CATALOG: CropInfo[] = [
  // ===================== CEREALS & MILLETS =====================
  {
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Cereals',
    optimalSoil: ['Loamy', 'Clayey', 'Alluvial', 'Black (Regur)'],
    tempRangeC: [12, 25],
    rainfallRangeMm: [350, 600],
    growthDurationDays: 125,
    baseYieldQuintalsPerAcre: 18.5,
    averageMarketPricePerQuintalINR: 2350,
    icon: '🌾',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'CRI (Crown Root Initiation) critical watering phase', waterReqMm: 50 },
      { stage: 'Tillering / Branching', daysFromSowing: 30, description: 'Vegetative stem count expansion and leaf emergence', waterReqMm: 70 },
      { stage: 'Flowering & Heading', daysFromSowing: 70, description: 'Spike emergence, anthesis, and pollen viability stage', waterReqMm: 90 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 95, description: 'Milking and dough stage; sensitive to terminal heat', waterReqMm: 80 },
      { stage: 'Ripening & Maturation', daysFromSowing: 115, description: 'Grain hardening and golden turning', waterReqMm: 30 },
      { stage: 'Harvest Ready', daysFromSowing: 125, description: 'Moisture below 12-14% ready for combine harvesting', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 50 kg + MOP 20 kg + Zinc Sulphate 10 kg per acre',
      vegetative: 'Urea 35 kg during 1st irrigation (21 DAS)',
      flowering: 'Urea 25 kg + 13:0:45 Potassium Nitrate foliar spray (1%)',
      grainFilling: 'Foliar spray of 0:0:50 (SOP) @ 1.5 kg/acre to bolster grain bolding'
    },
    commonPests: ['Yellow Rust (Puccinia striiformis)', 'Aphids (Rhopalosiphum)', 'Loose Smut', 'Armyworm']
  },
  {
    name: 'Paddy Rice',
    scientificName: 'Oryza sativa',
    category: 'Cereals',
    optimalSoil: ['Clayey', 'Alluvial', 'Loamy'],
    tempRangeC: [20, 36],
    rainfallRangeMm: [900, 1600],
    growthDurationDays: 135,
    baseYieldQuintalsPerAcre: 24.0,
    averageMarketPricePerQuintalINR: 2280,
    icon: '🍚',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 15, description: 'Nursery seedling and root development', waterReqMm: 120 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 35, description: 'Transplanting to puddled main field', waterReqMm: 250 },
      { stage: 'Tillering / Branching', daysFromSowing: 60, description: 'Maximum active tillers production', waterReqMm: 220 },
      { stage: 'Flowering & Heading', daysFromSowing: 90, description: 'Panicle initiation and booting stage', waterReqMm: 240 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 115, description: 'Milk to dough stage grain filling', waterReqMm: 150 },
      { stage: 'Harvest Ready', daysFromSowing: 135, description: '80-85% straw turns golden yellow', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'SSP 100 kg + MOP 30 kg + Urea 25 kg + Zinc 10 kg',
      vegetative: 'Urea 30 kg + Carbofuran or Cartap for stem borer prevention',
      flowering: 'Urea 25 kg + Potassium foliar spray 00:52:34',
      grainFilling: '00:00:50 spray to prevent panicle blast and increase kernel density'
    },
    commonPests: ['Brown Planthopper (BPH)', 'Bacterial Leaf Blight (Xanthomonas)', 'Stem Borer', 'Blast (Magnaporthe oryzae)']
  },
  {
    name: 'Maize / Corn',
    scientificName: 'Zea mays',
    category: 'Cereals',
    optimalSoil: ['Loamy', 'Alluvial', 'Red & Yellow', 'Black (Regur)'],
    tempRangeC: [18, 32],
    rainfallRangeMm: [500, 800],
    growthDurationDays: 105,
    baseYieldQuintalsPerAcre: 32.0,
    averageMarketPricePerQuintalINR: 2150,
    icon: '🌽',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 7, description: 'Coleoptile emergence and V2 stage', waterReqMm: 40 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Rapid stalk elongation (V6-V10 stage)', waterReqMm: 80 },
      { stage: 'Flowering & Heading', daysFromSowing: 55, description: 'Tasseling and silking (most drought-sensitive stage)', waterReqMm: 130 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 80, description: 'Blister to dough stage cob kernel filling', waterReqMm: 100 },
      { stage: 'Ripening & Maturation', daysFromSowing: 95, description: 'Black layer formation at kernel base', waterReqMm: 30 },
      { stage: 'Harvest Ready', daysFromSowing: 105, description: 'Dry husk ready for mechanical de-husking', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'NPK 12:32:16 75 kg + Zinc 10 kg per acre',
      vegetative: 'Urea 40 kg at knee-high stage (30 DAS)',
      flowering: 'Urea 30 kg at tasseling + Boron 20% foliar spray for kernel set',
      grainFilling: '0:0:50 spray to maximize test weight (1000-kernel weight)'
    },
    commonPests: ['Fall Armyworm (Spodoptera frugiperda)', 'Stem Borer', 'Maydis Leaf Blight', 'Downy Mildew']
  },
  {
    name: 'Pearl Millet / Bajra',
    scientificName: 'Pennisetum glaucum',
    category: 'Cereals',
    optimalSoil: ['Sandy Loam', 'Red & Yellow', 'Loamy'],
    tempRangeC: [25, 38],
    rainfallRangeMm: [300, 550],
    growthDurationDays: 85,
    baseYieldQuintalsPerAcre: 15.0,
    averageMarketPricePerQuintalINR: 2400,
    icon: '🌾',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Fast seedling emergence in dryland', waterReqMm: 25 },
      { stage: 'Tillering / Branching', daysFromSowing: 25, description: 'Basal tiller growth and root anchorage', waterReqMm: 50 },
      { stage: 'Flowering & Heading', daysFromSowing: 45, description: 'Panicle emergence and protogynous flowering', waterReqMm: 70 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 65, description: 'Dough stage and grain development', waterReqMm: 45 },
      { stage: 'Harvest Ready', daysFromSowing: 85, description: 'Earheads turn golden brown and hard', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 40 kg + Potash 15 kg + Zinc 5 kg per acre',
      vegetative: 'Urea 25 kg top-dressing at 25 DAS after weeding',
      flowering: 'Foliar spray of 19:19:19 @ 1 kg/acre during panicle emergence',
      grainFilling: '0:0:50 spray @ 1 kg/acre for earhead bolding'
    },
    commonPests: ['Downy Mildew / Green Ear', 'Ergot', 'Stem Borer', 'Shoot Fly']
  },
  {
    name: 'Sorghum / Jowar',
    scientificName: 'Sorghum bicolor',
    category: 'Cereals',
    optimalSoil: ['Black (Regur)', 'Clayey', 'Loamy', 'Red & Yellow'],
    tempRangeC: [24, 35],
    rainfallRangeMm: [400, 700],
    growthDurationDays: 105,
    baseYieldQuintalsPerAcre: 16.0,
    averageMarketPricePerQuintalINR: 3100,
    icon: '🌾',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 7, description: 'Seedling emergence and crown root development', waterReqMm: 35 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Rapid whorl leaf growth and culm development', waterReqMm: 65 },
      { stage: 'Flowering & Heading', daysFromSowing: 60, description: 'Booting and panicle exertion', waterReqMm: 100 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 85, description: 'Milk to hard dough grain filling', waterReqMm: 70 },
      { stage: 'Harvest Ready', daysFromSowing: 105, description: 'Glumes dry and grains achieve black spot maturity', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'NPK 20:20:0:13 50 kg + MOP 15 kg per acre',
      vegetative: 'Urea 30 kg top dressing with inter-cultivation',
      flowering: 'Foliar 13:0:45 Potassium Nitrate spray 1.5%',
      grainFilling: '0:0:50 spray for higher grain weight and fodder quality'
    },
    commonPests: ['Sorghum Shoot Fly', 'Stem Borer (Chilo partellus)', 'Grain Mold', 'Anthracnose']
  },
  {
    name: 'Finger Millet / Ragi',
    scientificName: 'Eleusine coracana',
    category: 'Cereals',
    optimalSoil: ['Red & Yellow', 'Laterite', 'Sandy Loam', 'Loamy'],
    tempRangeC: [20, 32],
    rainfallRangeMm: [500, 900],
    growthDurationDays: 110,
    baseYieldQuintalsPerAcre: 14.0,
    averageMarketPricePerQuintalINR: 3850,
    icon: '🥣',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Nursery bed emergence', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Mainfield transplantation and rooting', waterReqMm: 55 },
      { stage: 'Tillering / Branching', daysFromSowing: 55, description: 'Dense tillering and finger initiation', waterReqMm: 75 },
      { stage: 'Flowering & Heading', daysFromSowing: 80, description: 'Earmarked finger spreading and anthesis', waterReqMm: 80 },
      { stage: 'Harvest Ready', daysFromSowing: 110, description: 'Fingers turn dark brown and curl inwards', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 5 tons + DAP 35 kg + MOP 15 kg + Zinc 5 kg',
      vegetative: 'Urea 20 kg at first weeding (25 DAT)',
      flowering: 'Foliar 19:19:19 spray for finger density',
      grainFilling: 'Potassium spray 0:0:50 @ 1 kg/acre for seed filling'
    },
    commonPests: ['Blast (Magnaporthe grisea)', 'Stem Borer', 'Aphids', 'Root Aphid']
  },
  {
    name: 'Barley',
    scientificName: 'Hordeum vulgare',
    category: 'Cereals',
    optimalSoil: ['Loamy', 'Sandy Loam', 'Alluvial'],
    tempRangeC: [12, 24],
    rainfallRangeMm: [350, 500],
    growthDurationDays: 115,
    baseYieldQuintalsPerAcre: 16.5,
    averageMarketPricePerQuintalINR: 1950,
    icon: '🌾',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 8, description: 'Coleoptile emergence and early tillering', waterReqMm: 40 },
      { stage: 'Tillering / Branching', daysFromSowing: 30, description: 'Vegetative expansion and jointing', waterReqMm: 60 },
      { stage: 'Flowering & Heading', daysFromSowing: 65, description: 'Head emergence with prominent awns', waterReqMm: 75 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 90, description: 'Malt quality starch accumulation', waterReqMm: 65 },
      { stage: 'Harvest Ready', daysFromSowing: 115, description: 'Straw becomes golden yellow and brittle', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 40 kg + MOP 15 kg + Zinc Sulphate 8 kg per acre',
      vegetative: 'Urea 30 kg during first irrigation',
      flowering: '13:0:45 foliar spray 1% for grain boldness',
      grainFilling: '0:0:50 foliar spray for malting quality'
    },
    commonPests: ['Covered Smut', 'Rust', 'Aphids', 'Leaf Blight']
  },

  // ===================== PULSES & LEGUMES =====================
  {
    name: 'Chickpea / Bengal Gram',
    scientificName: 'Cicer arietinum',
    category: 'Pulses',
    optimalSoil: ['Black (Regur)', 'Clay Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [15, 28],
    rainfallRangeMm: [350, 600],
    growthDurationDays: 110,
    baseYieldQuintalsPerAcre: 9.5,
    averageMarketPricePerQuintalINR: 5400,
    icon: '🫘',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 7, description: 'Seedling emergence and taproot establishment', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Lateral branch proliferation and Rhizobium nodulation', waterReqMm: 50 },
      { stage: 'Flowering & Heading', daysFromSowing: 60, description: 'Peak pink/white blossom and pod initiation', waterReqMm: 70 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 85, description: 'Pod filling and seed enlargement', waterReqMm: 55 },
      { stage: 'Harvest Ready', daysFromSowing: 110, description: 'Leaves shed and pods turn yellow-brown with loose rattle', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 40 kg + Gypsum 50 kg (Sulfur source) + Rhizobium seed inoculation',
      vegetative: '19:19:19 foliar spray (1%) at 30 DAS for branch growth',
      flowering: '00:52:34 (MKP) + Boron 20% foliar spray to prevent flower drop',
      grainFilling: '13:00:45 (Potassium Nitrate) @ 1.5 kg/acre for bold grain size'
    },
    commonPests: ['Pod Borer (Helicoverpa armigera)', 'Fusarium Wilt', 'Ascochyta Blight', 'Dry Root Rot']
  },
  {
    name: 'Pigeon Pea / Arhar / Tur',
    scientificName: 'Cajanus cajan',
    category: 'Pulses',
    optimalSoil: ['Loamy', 'Black (Regur)', 'Red & Yellow', 'Alluvial'],
    tempRangeC: [20, 35],
    rainfallRangeMm: [600, 1000],
    growthDurationDays: 160,
    baseYieldQuintalsPerAcre: 8.5,
    averageMarketPricePerQuintalINR: 7000,
    icon: '🫘',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Deep taproot anchoring phase', waterReqMm: 40 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 50, description: 'Substantial bushy shrub vegetative growth', waterReqMm: 90 },
      { stage: 'Flowering & Heading', daysFromSowing: 100, description: 'Prolific yellow-red raceme blooming', waterReqMm: 120 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 130, description: 'Pod development and grain filling', waterReqMm: 90 },
      { stage: 'Harvest Ready', daysFromSowing: 160, description: '80% pods dry and turn dark brown', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 50 kg + MOP 15 kg + Sulfur 10 kg per acre',
      vegetative: 'Urea 15 kg top dress + Trichoderma soil application',
      flowering: 'Planofix (NAA) 4.5 SL @ 4 ml/15L water to curb flower drop',
      grainFilling: '0:0:50 foliar spray for seed boldness and weight'
    },
    commonPests: ['Pod Borer (Helicoverpa)', 'Pod Fly (Melanagromyza)', 'Sterility Mosaic Virus', 'Wilt']
  },
  {
    name: 'Green Gram / Moong',
    scientificName: 'Vigna radiata',
    category: 'Pulses',
    optimalSoil: ['Loamy', 'Sandy Loam', 'Alluvial'],
    tempRangeC: [25, 38],
    rainfallRangeMm: [350, 600],
    growthDurationDays: 65,
    baseYieldQuintalsPerAcre: 6.5,
    averageMarketPricePerQuintalINR: 8500,
    icon: '🫘',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 4, description: 'Quick epigeal germination', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 20, description: 'Rapid trifoliate branching and nodulation', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 35, description: 'Yellow flower clusters emergence', waterReqMm: 60 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 50, description: 'Linear black pod filling', waterReqMm: 40 },
      { stage: 'Harvest Ready', daysFromSowing: 65, description: 'Pods turn black and crisp ready for single/double picking', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 35 kg + MOP 10 kg + Rhizobium culture',
      vegetative: '19:19:19 foliar spray @ 1 kg/acre at 20 DAS',
      flowering: '00:52:34 + Boron spray for flower cluster retention',
      grainFilling: '13:0:45 foliar spray @ 1 kg/acre for uniform pod filling'
    },
    commonPests: ['Yellow Mosaic Virus (Whitefly transmitted)', 'Pod Borer', 'Powdery Mildew', 'Cercospora Leaf Spot']
  },
  {
    name: 'Black Gram / Urad',
    scientificName: 'Vigna mungo',
    category: 'Pulses',
    optimalSoil: ['Loamy', 'Black (Regur)', 'Alluvial'],
    tempRangeC: [25, 35],
    rainfallRangeMm: [400, 700],
    growthDurationDays: 75,
    baseYieldQuintalsPerAcre: 7.0,
    averageMarketPricePerQuintalINR: 7600,
    icon: '🫘',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Seedling emergence', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Dense low-growing vegetative canopy', waterReqMm: 50 },
      { stage: 'Flowering & Heading', daysFromSowing: 42, description: 'Peak blooming and pod setting', waterReqMm: 65 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 60, description: 'Cylindrical hairy pod maturation', waterReqMm: 45 },
      { stage: 'Harvest Ready', daysFromSowing: 75, description: 'Pods turn dull black ready for harvest', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 35 kg + Gypsum 40 kg per acre',
      vegetative: 'Foliar micronutrient spray (Fe + Zn)',
      flowering: '00:52:34 MKP spray 1% to boost pod set',
      grainFilling: '0:0:50 spray to prevent shattering and increase grain luster'
    },
    commonPests: ['Yellow Mosaic Virus', 'Aphids', 'Spotted Pod Borer', 'Root Rot']
  },
  {
    name: 'Lentil / Masoor',
    scientificName: 'Lens culinaris',
    category: 'Pulses',
    optimalSoil: ['Loamy', 'Alluvial', 'Clay Loam'],
    tempRangeC: [14, 25],
    rainfallRangeMm: [300, 500],
    growthDurationDays: 115,
    baseYieldQuintalsPerAcre: 7.5,
    averageMarketPricePerQuintalINR: 6400,
    icon: '🫘',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 8, description: 'Sub-surface root establishment', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 35, description: 'Erect fine-branching foliage growth', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 65, description: 'Small bluish-purple flower bloom', waterReqMm: 60 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 90, description: 'Two-seeded flat pod filling', waterReqMm: 40 },
      { stage: 'Harvest Ready', daysFromSowing: 115, description: 'Plants turn straw-yellow and dry', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 35 kg + MOP 15 kg + Sulfur 10 kg per acre',
      vegetative: '19:19:19 foliar spray at 30 DAS',
      flowering: 'Boron 20% foliar spray (1g/L) for pod setting',
      grainFilling: '13:00:45 foliar spray @ 1 kg/acre for bold grains'
    },
    commonPests: ['Rust (Uromyces fabae)', 'Wilt', 'Aphids', 'Pod Borer']
  },
  {
    name: 'Cowpea / Lobia',
    scientificName: 'Vigna unguiculata',
    category: 'Pulses',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Red & Yellow'],
    tempRangeC: [22, 35],
    rainfallRangeMm: [400, 750],
    growthDurationDays: 80,
    baseYieldQuintalsPerAcre: 8.0,
    averageMarketPricePerQuintalINR: 6200,
    icon: '🫛',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Vigorous seedling emergence', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Spreading vine and ground cover growth', waterReqMm: 50 },
      { stage: 'Flowering & Heading', daysFromSowing: 45, description: 'White/purple blossoms emergence', waterReqMm: 70 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 65, description: 'Long pendent pod filling', waterReqMm: 50 },
      { stage: 'Harvest Ready', daysFromSowing: 80, description: 'Pods become dry and straw-colored', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'SSP 80 kg + Urea 15 kg + MOP 15 kg per acre',
      vegetative: '19:19:19 foliar spray @ 1 kg/acre',
      flowering: '00:52:34 + Micronutrients foliar spray',
      grainFilling: '0:0:50 spray to promote grain density'
    },
    commonPests: ['Aphids', 'Pod Borer', 'Cercospora Leaf Spot', 'Anthracnose']
  },

  // ===================== CASH & INDUSTRIAL CROPS =====================
  {
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    category: 'Cash Crops',
    optimalSoil: ['Black (Regur)', 'Alluvial', 'Clayey'],
    tempRangeC: [21, 35],
    rainfallRangeMm: [500, 900],
    growthDurationDays: 160,
    baseYieldQuintalsPerAcre: 11.5,
    averageMarketPricePerQuintalINR: 7200,
    icon: '☁️',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Emergence and taproot anchoring', waterReqMm: 40 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 40, description: 'Main stem and sympodial branch development', waterReqMm: 80 },
      { stage: 'Flowering & Heading', daysFromSowing: 75, description: 'Squaring and yellow flower anthesis', waterReqMm: 140 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 110, description: 'Boll formation and seed fiber elongation', waterReqMm: 130 },
      { stage: 'Ripening & Maturation', daysFromSowing: 140, description: 'Boll bursting and lint fluffing', waterReqMm: 40 },
      { stage: 'Harvest Ready', daysFromSowing: 160, description: 'Manual picking of clean open bolls', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 60 kg + Potash 30 kg + Magnesium Sulphate 15 kg',
      vegetative: 'Urea 30 kg + Zinc chelate foliar spray',
      flowering: '19:19:19 foliar spray + Planofix (NAA) to stop square shedding',
      grainFilling: '13:00:45 Potassium Nitrate 2% spray for boll weight enhancement'
    },
    commonPests: ['Pink Bollworm (Pectinophora)', 'Whitefly (Bemisia tabaci)', 'Jassids', 'Bacterial Blight']
  },
  {
    name: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    category: 'Cash Crops',
    optimalSoil: ['Loamy', 'Clayey', 'Black (Regur)', 'Alluvial'],
    tempRangeC: [22, 38],
    rainfallRangeMm: [1200, 2000],
    growthDurationDays: 360,
    baseYieldQuintalsPerAcre: 380.0,
    averageMarketPricePerQuintalINR: 350,
    icon: '🎋',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 30, description: 'Sprouting from setts and root initiation', waterReqMm: 150 },
      { stage: 'Tillering / Branching', daysFromSowing: 100, description: 'High tiller proliferation and shoot count', waterReqMm: 350 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 240, description: 'Grand growth stage and rapid cane elongation', waterReqMm: 650 },
      { stage: 'Ripening & Maturation', daysFromSowing: 330, description: 'Sucrose accumulation and juice Brix enhancement', waterReqMm: 150 },
      { stage: 'Harvest Ready', daysFromSowing: 360, description: 'Peak Brix reading (18-20%) ready for cutting', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'SSP 150 kg + MOP 50 kg + Zinc Sulphate 25 kg + FYM 15 tons',
      vegetative: 'Urea 100 kg split across 45, 90, and 120 days during earthing up',
      flowering: 'Potash 30 kg top dressing during grand growth',
      grainFilling: 'Foliar spray of 0:0:50 for maximizing sucrose sugar recovery'
    },
    commonPests: ['Early Shoot Borer (Chilo infuscatellus)', 'Top Borer', 'Red Rot (Colletotrichum falcatum)', 'Pyrilla']
  },
  {
    name: 'Jute',
    scientificName: 'Corchorus olitorius',
    category: 'Cash Crops',
    optimalSoil: ['Alluvial', 'Loamy', 'Clay Loam'],
    tempRangeC: [24, 38],
    rainfallRangeMm: [1200, 1800],
    growthDurationDays: 120,
    baseYieldQuintalsPerAcre: 14.0,
    averageMarketPricePerQuintalINR: 5200,
    icon: '🧵',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Early seedling emergence', waterReqMm: 40 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 45, description: 'Rapid single stem elongation', waterReqMm: 120 },
      { stage: 'Flowering & Heading', daysFromSowing: 90, description: 'Small yellow flower initiation (ideal harvest stage for fiber)', waterReqMm: 150 },
      { stage: 'Harvest Ready', daysFromSowing: 120, description: 'Small pod stage for optimal fiber tensile strength', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'NPK 20:20:20 50 kg + FYM 4 tons per acre',
      vegetative: 'Urea 30 kg top dressed at 30 & 45 DAS after wheel weeding',
      flowering: 'Foliar micronutrient spray (Magnesium & Zinc)',
      grainFilling: 'Not required (harvested at early flowering for premium fiber)'
    },
    commonPests: ['Yellow Mite (Polyphagotarsonemus)', 'Semilooper', 'Stem Rot', 'Root Rot']
  },
  {
    name: 'Tobacco',
    scientificName: 'Nicotiana tabacum',
    category: 'Cash Crops',
    optimalSoil: ['Sandy Loam', 'Light Black', 'Alluvial'],
    tempRangeC: [20, 32],
    rainfallRangeMm: [500, 800],
    growthDurationDays: 120,
    baseYieldQuintalsPerAcre: 8.5,
    averageMarketPricePerQuintalINR: 14500,
    icon: '🍂',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Nursery seedling stage', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 40, description: 'Transplanting and broad leaf expansion', waterReqMm: 80 },
      { stage: 'Flowering & Heading', daysFromSowing: 75, description: 'Topping and de-suckering phase', waterReqMm: 110 },
      { stage: 'Harvest Ready', daysFromSowing: 120, description: 'Priming bottom leaves as they turn yellow-green', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 40 kg + Potassium Sulfate (SOP) 60 kg (Avoid MOP to prevent chloride burn)',
      vegetative: 'Ammonium Sulfate 40 kg top dressing',
      flowering: 'Suckercide application after topping',
      grainFilling: 'Foliar spray of Potassium Sulfate 1% for curing leaf quality'
    },
    commonPests: ['Tobacco Caterpillar (Spodoptera litura)', 'Aphids', 'Mosaic Virus', 'Damping Off']
  },

  // ===================== OILSEEDS =====================
  {
    name: 'Soybean',
    scientificName: 'Glycine max',
    category: 'Oilseeds',
    optimalSoil: ['Black (Regur)', 'Loamy', 'Alluvial'],
    tempRangeC: [20, 32],
    rainfallRangeMm: [600, 900],
    growthDurationDays: 100,
    baseYieldQuintalsPerAcre: 12.0,
    averageMarketPricePerQuintalINR: 4600,
    icon: '🌱',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 6, description: 'Hypocotyl arch straightening (VE stage)', waterReqMm: 40 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Trifoliate leaf expansion and Rhizobium nodulation', waterReqMm: 70 },
      { stage: 'Flowering & Heading', daysFromSowing: 50, description: 'Purple/white flowers blooming (R1-R2)', waterReqMm: 110 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 75, description: 'Pod elongation and seed filling (R5-R6)', waterReqMm: 120 },
      { stage: 'Harvest Ready', daysFromSowing: 100, description: 'Leaves drop, pods brown and rattle', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'SSP 100 kg (Sulfur rich) + MOP 25 kg + Rhizobium bio-inoculant',
      vegetative: '19:19:19 foliar spray at 30 DAS',
      flowering: '00:52:34 + Boron spray for flower retention',
      grainFilling: '13:0:45 foliar spray for high oil & protein content'
    },
    commonPests: ['Girdle Beetle (Oberia brevis)', 'Yellow Mosaic Virus (YMV)', 'Semilooper', 'Root Rot']
  },
  {
    name: 'Mustard / Rapeseed',
    scientificName: 'Brassica juncea',
    category: 'Oilseeds',
    optimalSoil: ['Loamy', 'Alluvial', 'Sandy Loam'],
    tempRangeC: [10, 25],
    rainfallRangeMm: [300, 500],
    growthDurationDays: 110,
    baseYieldQuintalsPerAcre: 8.5,
    averageMarketPricePerQuintalINR: 5650,
    icon: '🌼',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Cotyledon emergence and rosette formation', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Stalk branching and leaf canopy spread', waterReqMm: 55 },
      { stage: 'Flowering & Heading', daysFromSowing: 55, description: 'Bright yellow flower bloom and siliqua setting', waterReqMm: 80 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 80, description: 'Seed development and oil synthesis inside pods', waterReqMm: 60 },
      { stage: 'Harvest Ready', daysFromSowing: 110, description: '75-80% siliquae turn golden yellow', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 40 kg + MOP 15 kg + Gypsum 50 kg (Sulfur critical for oil content)',
      vegetative: 'Urea 35 kg top dress at 30 DAS with first irrigation',
      flowering: 'Foliar spray of 19:19:19 (1%) + Micronutrient Zinc',
      grainFilling: '0:0:50 foliar spray for higher oil percentage'
    },
    commonPests: ['Mustard Aphid (Lipaphis erysimi)', 'Sawfly', 'White Rust (Albugo candida)', 'Alternaria Blight']
  },
  {
    name: 'Groundnut / Peanut',
    scientificName: 'Arachis hypogaea',
    category: 'Oilseeds',
    optimalSoil: ['Sandy Loam', 'Red & Yellow', 'Loamy'],
    tempRangeC: [22, 34],
    rainfallRangeMm: [500, 800],
    growthDurationDays: 120,
    baseYieldQuintalsPerAcre: 11.0,
    averageMarketPricePerQuintalINR: 6700,
    icon: '🥜',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 8, description: 'Seedling emergence and anchoring', waterReqMm: 35 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Main stem and lateral branch canopy cover', waterReqMm: 60 },
      { stage: 'Flowering & Heading', daysFromSowing: 50, description: 'Yellow flower self-pollination and peg initiation', waterReqMm: 95 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 85, description: 'Sub-soil pod enlargement and kernel filling', waterReqMm: 110 },
      { stage: 'Harvest Ready', daysFromSowing: 120, description: 'Inner shell turns dark brown with prominent veins', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'SSP 100 kg + MOP 30 kg + Gypsum 150 kg at pegging stage for calcium pod filling',
      vegetative: '19:19:19 foliar spray + Zinc Sulphate 5 kg',
      flowering: 'Boron 20% spray to encourage strong peg penetration',
      grainFilling: '13:00:45 Potassium Nitrate for bold double-kernel formation'
    },
    commonPests: ['Tikka Disease (Cercospora)', 'Leaf Miner', 'White Grub', 'Collar Rot']
  },
  {
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    category: 'Oilseeds',
    optimalSoil: ['Loamy', 'Black (Regur)', 'Alluvial'],
    tempRangeC: [18, 32],
    rainfallRangeMm: [450, 750],
    growthDurationDays: 95,
    baseYieldQuintalsPerAcre: 9.0,
    averageMarketPricePerQuintalINR: 6500,
    icon: '🌻',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 6, description: 'Seedling emergence', waterReqMm: 35 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Broad ovate leaf growth and stem thickening', waterReqMm: 65 },
      { stage: 'Flowering & Heading', daysFromSowing: 55, description: 'Capitulum head opening and ray floret anthesis', waterReqMm: 110 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 75, description: 'Seed kernel filling and oil synthesis', waterReqMm: 80 },
      { stage: 'Harvest Ready', daysFromSowing: 95, description: 'Back of head turns lemon yellow and bracts turn brown', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'NPK 12:32:16 60 kg + Sulfur 10 kg + Zinc 5 kg per acre',
      vegetative: 'Urea 30 kg top dressing at star bud stage',
      flowering: 'Borax 0.2% spray on flower head to ensure 100% seed setting',
      grainFilling: '0:0:50 spray to prevent hollow chaffy seeds'
    },
    commonPests: ['Head Borer (Helicoverpa)', 'Alternaria Blight', 'Jassids', 'Downy Mildew']
  },
  {
    name: 'Sesame / Til',
    scientificName: 'Sesamum indicum',
    category: 'Oilseeds',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Red & Yellow'],
    tempRangeC: [25, 38],
    rainfallRangeMm: [350, 600],
    growthDurationDays: 85,
    baseYieldQuintalsPerAcre: 4.5,
    averageMarketPricePerQuintalINR: 12500,
    icon: '🌰',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 4, description: 'Fine seed emergence', waterReqMm: 20 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Erect stem branching', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 45, description: 'Bell-shaped flower blooming in leaf axils', waterReqMm: 60 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 65, description: 'Capsule pod development and seed filling', waterReqMm: 40 },
      { stage: 'Harvest Ready', daysFromSowing: 85, description: 'Bottom leaves shed and capsules turn yellowish before dehiscence', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 30 kg + MOP 15 kg + Gypsum 40 kg per acre',
      vegetative: 'Urea 20 kg top dress at 25 DAS',
      flowering: '19:19:19 foliar spray for capsule density',
      grainFilling: '13:0:45 foliar spray for oil content and seed luster'
    },
    commonPests: ['Phyllody (Mycoplasma transmitted by leafhoppers)', 'Leaf and Pod Caterpillar', 'Bacterial Leaf Spot']
  },
  {
    name: 'Castor',
    scientificName: 'Ricinus communis',
    category: 'Oilseeds',
    optimalSoil: ['Sandy Loam', 'Red & Yellow', 'Loamy'],
    tempRangeC: [20, 36],
    rainfallRangeMm: [450, 750],
    growthDurationDays: 160,
    baseYieldQuintalsPerAcre: 10.5,
    averageMarketPricePerQuintalINR: 6100,
    icon: '🌿',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Large cotyledon emergence and taproot establishment', waterReqMm: 35 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 45, description: 'Palmate broad leaf canopy and primary spike branching', waterReqMm: 80 },
      { stage: 'Flowering & Heading', daysFromSowing: 80, description: 'Primary and secondary spike flowering', waterReqMm: 100 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 120, description: 'Spiny capsule development and seed filling', waterReqMm: 80 },
      { stage: 'Harvest Ready', daysFromSowing: 160, description: 'Sequential spike picking as capsules turn brown', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 40 kg + MOP 20 kg + Zinc 5 kg per acre',
      vegetative: 'Urea 30 kg top dressed in two splits',
      flowering: '19:19:19 foliar spray during spike emergence',
      grainFilling: '0:0:50 spray to maximize ricinoleic oil content'
    },
    commonPests: ['Castor Semilooper', 'Capsule Borer (Dichocrocis)', 'Wilt', 'Botrytis Gray Mold']
  },

  // ===================== VEGETABLES =====================
  {
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Black (Regur)', 'Red & Yellow'],
    tempRangeC: [18, 30],
    rainfallRangeMm: [400, 750],
    growthDurationDays: 110,
    baseYieldQuintalsPerAcre: 140.0,
    averageMarketPricePerQuintalINR: 1800,
    icon: '🍅',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 12, description: 'Seedling emergence in pro-trays', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Transplanting with staking/mulching', waterReqMm: 60 },
      { stage: 'Tillering / Branching', daysFromSowing: 50, description: 'Canopy spread and side shooting', waterReqMm: 80 },
      { stage: 'Flowering & Heading', daysFromSowing: 70, description: 'Cluster blooming and fruit set', waterReqMm: 100 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 90, description: 'Fruit sizing, breaker stage coloring', waterReqMm: 90 },
      { stage: 'Harvest Ready', daysFromSowing: 110, description: 'Continuous selective picking (Red/Pink stage)', waterReqMm: 40 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 tons + 19:19:19 50 kg + Micronutrient mix 5 kg per acre',
      vegetative: '12:61:00 (MAP) via drip fertigation @ 4 kg/week',
      flowering: '13:00:45 + Calcium Nitrate + Boron 20% to prevent Blossom End Rot',
      grainFilling: '00:00:50 (Potassium Sulphate) @ 5 kg/week via fertigation'
    },
    commonPests: ['Early Blight (Alternaria solani)', 'Late Blight (Phytophthora)', 'Tomato Yellow Leaf Curl Virus', 'Fruit Borer (Helicoverpa)']
  },
  {
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [15, 24],
    rainfallRangeMm: [400, 600],
    growthDurationDays: 95,
    baseYieldQuintalsPerAcre: 110.0,
    averageMarketPricePerQuintalINR: 1450,
    icon: '🥔',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 15, description: 'Sprouting from eye buds and stolon emergence', waterReqMm: 45 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 35, description: 'Canopy closure and tuber initiation', waterReqMm: 75 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 65, description: 'Tuber bulking and starch accumulation', waterReqMm: 110 },
      { stage: 'Ripening & Maturation', daysFromSowing: 85, description: 'Skin curing and vine senescence (dehaulming)', waterReqMm: 20 },
      { stage: 'Harvest Ready', daysFromSowing: 95, description: 'Dry skin set ready for digger harvest', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'NPK 10:26:26 100 kg + FYM 12 tons per acre',
      vegetative: 'Urea 45 kg before earthing-up (30 DAS)',
      flowering: '13:00:45 spray + Micronutrient mix (Fe, Mn, Zn, B)',
      grainFilling: '00:00:50 SOP for tuber weight and shelf life'
    },
    commonPests: ['Late Blight (Phytophthora infestans)', 'Early Blight', 'Aphids', 'Potato Tuber Moth']
  },
  {
    name: 'Onion',
    scientificName: 'Allium cepa',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [15, 30],
    rainfallRangeMm: [400, 650],
    growthDurationDays: 120,
    baseYieldQuintalsPerAcre: 120.0,
    averageMarketPricePerQuintalINR: 2200,
    icon: '🧅',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 15, description: 'Nursery seedling development', waterReqMm: 35 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 40, description: 'Transplanting to flat beds and vegetative foliage growth', waterReqMm: 70 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 85, description: 'Bulb enlargement and neck formation', waterReqMm: 110 },
      { stage: 'Ripening & Maturation', daysFromSowing: 105, description: 'Neck fall (50-70% tops down)', waterReqMm: 20 },
      { stage: 'Harvest Ready', daysFromSowing: 120, description: 'Bulb curing and field drying', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'NPK 19:19:19 50 kg + Single Super Phosphate 50 kg + Sulfur 15 kg per acre',
      vegetative: 'Urea 30 kg top dressed in two splits (30 & 45 DAT)',
      flowering: '13:00:45 Potassium Nitrate spray 1% for bulb sizing',
      grainFilling: '00:00:50 Potassium Sulphate @ 4 kg/acre via drip'
    },
    commonPests: ['Thrips (Thrips tabaci)', 'Purple Blotch (Alternaria porri)', 'Stemphylium Leaf Blight', 'Basal Rot']
  },
  {
    name: 'Garlic',
    scientificName: 'Allium sativum',
    category: 'Vegetables',
    optimalSoil: ['Loamy', 'Sandy Loam', 'Alluvial'],
    tempRangeC: [12, 25],
    rainfallRangeMm: [400, 600],
    growthDurationDays: 140,
    baseYieldQuintalsPerAcre: 40.0,
    averageMarketPricePerQuintalINR: 8500,
    icon: '🧄',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Clove sprouting and root growth', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 45, description: 'Foliage leaf emergence and pseudo-stem growth', waterReqMm: 65 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 95, description: 'Clove differentiation and bulb swelling', waterReqMm: 95 },
      { stage: 'Harvest Ready', daysFromSowing: 140, description: 'Leaves turn yellow and dry; bulbs compact', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 tons + DAP 50 kg + MOP 30 kg + Sulfur 20 kg',
      vegetative: 'Urea 30 kg in two splits before bulb initiation',
      flowering: 'Micronutrient foliar spray (Zinc & Boron)',
      grainFilling: '0:0:50 spray to tighten clove wrapper skin'
    },
    commonPests: ['Thrips', 'Purple Blotch', 'Downy Mildew', 'Stem Nematode']
  },
  {
    name: 'Eggplant / Brinjal',
    scientificName: 'Solanum melongena',
    category: 'Vegetables',
    optimalSoil: ['Loamy', 'Black (Regur)', 'Alluvial'],
    tempRangeC: [20, 34],
    rainfallRangeMm: [500, 800],
    growthDurationDays: 120,
    baseYieldQuintalsPerAcre: 130.0,
    averageMarketPricePerQuintalINR: 1900,
    icon: '🍆',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 12, description: 'Seedling emergence in nursery', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 35, description: 'Transplanting and branching', waterReqMm: 60 },
      { stage: 'Flowering & Heading', daysFromSowing: 60, description: 'Violet flower cluster anthesis', waterReqMm: 90 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 85, description: 'Fruit development and glossy skin formation', waterReqMm: 110 },
      { stage: 'Harvest Ready', daysFromSowing: 120, description: 'Continuous pickings at tender glossy stage', waterReqMm: 30 },
    ],
    fertilizerGuide: {
      basal: 'FYM 8 tons + NPK 10:26:26 50 kg + Magnesium 10 kg',
      vegetative: 'Urea 25 kg top dress at 30 DAT',
      flowering: '19:19:19 foliar spray + Boron for fruit set',
      grainFilling: '0:0:50 + Calcium Nitrate for fruit firming'
    },
    commonPests: ['Shoot and Fruit Borer (Leucinodes orbonalis)', 'Phomopsis Blight', 'Epilachna Beetle', 'Little Leaf Disease']
  },
  {
    name: 'Chili Pepper / Mirchi',
    scientificName: 'Capsicum annuum',
    category: 'Vegetables',
    optimalSoil: ['Black (Regur)', 'Loamy', 'Sandy Loam', 'Red & Yellow'],
    tempRangeC: [20, 35],
    rainfallRangeMm: [600, 1000],
    growthDurationDays: 140,
    baseYieldQuintalsPerAcre: 35.0,
    averageMarketPricePerQuintalINR: 11000,
    icon: '🌶️',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 12, description: 'Nursery seedling development', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 35, description: 'Transplanting and lateral sympodial branching', waterReqMm: 60 },
      { stage: 'Flowering & Heading', daysFromSowing: 65, description: 'White star-shaped flower blooming and fruit setting', waterReqMm: 90 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 95, description: 'Chili pod elongation, capsaicin development, and green harvesting', waterReqMm: 100 },
      { stage: 'Harvest Ready', daysFromSowing: 140, description: 'Red ripe chili drying or continuous green pickings', waterReqMm: 20 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 tons + DAP 50 kg + MOP 30 kg + Zinc 10 kg per acre',
      vegetative: '19:19:19 foliar spray @ 4 kg/acre via drip',
      flowering: 'Planofix (NAA) + Calcium Boron spray to halt flower shedding',
      grainFilling: '13:00:45 Potassium Nitrate for high pungency and fruit shine'
    },
    commonPests: ['Chilli Thrips (Scirtothrips dorsalis)', 'Yellow Mite (Polyphagotarsonemus)', 'Anthracnose / Dieback (Colletotrichum)', 'Leaf Curl Virus']
  },
  {
    name: 'Okra / Lady Finger / Bhindi',
    scientificName: 'Abelmoschus esculentus',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [22, 36],
    rainfallRangeMm: [450, 750],
    growthDurationDays: 85,
    baseYieldQuintalsPerAcre: 55.0,
    averageMarketPricePerQuintalINR: 2600,
    icon: '🥒',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Direct seed emergence', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Single erect stalk and serrated leaf expansion', waterReqMm: 50 },
      { stage: 'Flowering & Heading', daysFromSowing: 45, description: 'Yellow hibiscus-like flower blooming in leaf axils', waterReqMm: 80 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 60, description: 'Rapid tender pod development', waterReqMm: 90 },
      { stage: 'Harvest Ready', daysFromSowing: 85, description: 'Alternate day picking of tender 3-4 inch pods', waterReqMm: 20 },
    ],
    fertilizerGuide: {
      basal: 'DAP 40 kg + MOP 20 kg + FYM 8 tons per acre',
      vegetative: 'Urea 25 kg top dress at 25 DAS after intercultural weeding',
      flowering: '19:19:19 foliar spray for continuous blooming',
      grainFilling: '0:0:50 foliar spray for crisp pod texture'
    },
    commonPests: ['Yellow Vein Mosaic Virus (YVMV transmitted by whiteflies)', 'Shoot and Fruit Borer (Earias)', 'Jassids', 'Powdery Mildew']
  },
  {
    name: 'Cabbage',
    scientificName: 'Brassica oleracea var. capitata',
    category: 'Vegetables',
    optimalSoil: ['Loamy', 'Sandy Loam', 'Clay Loam'],
    tempRangeC: [12, 22],
    rainfallRangeMm: [400, 600],
    growthDurationDays: 90,
    baseYieldQuintalsPerAcre: 130.0,
    averageMarketPricePerQuintalINR: 1200,
    icon: '🥬',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Nursery seedling emergence', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Transplanting and outer leaf frame building', waterReqMm: 55 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 65, description: 'Head cupping and compact leaf wrap', waterReqMm: 90 },
      { stage: 'Harvest Ready', daysFromSowing: 90, description: 'Firm, solid head ready for knife harvest', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 tons + NPK 12:32:16 60 kg + Boron 5 kg',
      vegetative: 'Urea 35 kg top dress at 30 DAT',
      flowering: 'Calcium Nitrate + Boron foliar spray for head density',
      grainFilling: '0:0:50 foliar spray to prevent head cracking'
    },
    commonPests: ['Diamondback Moth (Plutella xylostella)', 'Cabbage Aphid', 'Black Rot', 'Clubroot']
  },
  {
    name: 'Cauliflower',
    scientificName: 'Brassica oleracea var. botrytis',
    category: 'Vegetables',
    optimalSoil: ['Loamy', 'Sandy Loam', 'Alluvial'],
    tempRangeC: [12, 22],
    rainfallRangeMm: [400, 650],
    growthDurationDays: 95,
    baseYieldQuintalsPerAcre: 110.0,
    averageMarketPricePerQuintalINR: 1600,
    icon: '🥦',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Seedling emergence in nursery', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Transplanting and heavy leaf development', waterReqMm: 60 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 70, description: 'Curd initiation and expansion (blanching protection)', waterReqMm: 95 },
      { stage: 'Harvest Ready', daysFromSowing: 95, description: 'Compact white curd ready before riceyness/ricochet', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 tons + DAP 50 kg + MOP 30 kg + Borax 10 kg + Ammonium Molybdate 1 kg',
      vegetative: 'Urea 35 kg at 30 DAT',
      flowering: 'Boron 20% foliar spray to prevent brown rot (browning of curd)',
      grainFilling: 'Potassium Nitrate foliar spray for dense white curds'
    },
    commonPests: ['Diamondback Moth', 'Cabbage Borer', 'Whiptail (Molybdenum deficiency)', 'Downy Mildew']
  },
  {
    name: 'Carrot',
    scientificName: 'Daucus carota',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [12, 22],
    rainfallRangeMm: [350, 550],
    growthDurationDays: 85,
    baseYieldQuintalsPerAcre: 90.0,
    averageMarketPricePerQuintalINR: 1800,
    icon: '🥕',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 8, description: 'Direct fine seed emergence on raised ridges', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Feathery foliage expansion and taproot elongation', waterReqMm: 50 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 60, description: 'Root thickening and carotene pigment accumulation', waterReqMm: 75 },
      { stage: 'Harvest Ready', daysFromSowing: 85, description: 'Roots reach 1.5-2 inch crown diameter ready for pulling', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 8 tons + DAP 35 kg + MOP 30 kg per acre',
      vegetative: 'Urea 25 kg at 30 DAS after thinning',
      flowering: '19:19:19 foliar spray + Micronutrient mix',
      grainFilling: '0:0:50 foliar spray for root sweetness and crispness'
    },
    commonPests: ['Carrot Rust Fly', 'Alternaria Leaf Blight', 'Root Knot Nematode', 'Bacterial Soft Rot']
  },
  {
    name: 'Cucumber',
    scientificName: 'Cucumis sativus',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [20, 34],
    rainfallRangeMm: [400, 600],
    growthDurationDays: 60,
    baseYieldQuintalsPerAcre: 80.0,
    averageMarketPricePerQuintalINR: 1700,
    icon: '🥒',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 4, description: 'Direct sowing seedling emergence', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 20, description: 'Trailing vine branching and tendril staking', waterReqMm: 50 },
      { stage: 'Flowering & Heading', daysFromSowing: 35, description: 'Male and female yellow flower bloom', waterReqMm: 75 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 45, description: 'Rapid fruit elongation', waterReqMm: 90 },
      { stage: 'Harvest Ready', daysFromSowing: 60, description: 'Tender green fruit picking every 2 days', waterReqMm: 20 },
    ],
    fertilizerGuide: {
      basal: 'FYM 8 tons + NPK 19:19:19 40 kg per acre',
      vegetative: '12:61:00 MAP via drip fertigation @ 3 kg/week',
      flowering: '13:00:45 + Boron for fruit set without curvature',
      grainFilling: '00:00:50 SOP for straight, crisp fruits'
    },
    commonPests: ['Downy Mildew (Pseudoperonospora)', 'Powdery Mildew', 'Fruit Fly (Bactrocera)', 'Red Pumpkin Beetle']
  },
  {
    name: 'Bitter Gourd / Karela',
    scientificName: 'Momordica charantia',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [22, 36],
    rainfallRangeMm: [500, 800],
    growthDurationDays: 90,
    baseYieldQuintalsPerAcre: 60.0,
    averageMarketPricePerQuintalINR: 2800,
    icon: '🥒',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 6, description: 'Seedling emergence and trellis training', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Vigorous climber vine development', waterReqMm: 55 },
      { stage: 'Flowering & Heading', daysFromSowing: 45, description: 'Yellow bloom and female flower pollination', waterReqMm: 80 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 65, description: 'Ridged spiny fruit elongation', waterReqMm: 95 },
      { stage: 'Harvest Ready', daysFromSowing: 90, description: 'Continuous pickings at green crisp stage', waterReqMm: 20 },
    ],
    fertilizerGuide: {
      basal: 'FYM 8 tons + DAP 40 kg + MOP 20 kg per acre',
      vegetative: '19:19:19 foliar spray at 25 DAS',
      flowering: 'Planofix (NAA) + Boron spray for female flower ratio',
      grainFilling: '0:0:50 foliar spray for fruit weight and shelf life'
    },
    commonPests: ['Fruit Fly (Bactrocera cucurbitae)', 'Downy Mildew', 'Epilachna Beetle', 'Mosaic Virus']
  },
  {
    name: 'Spinach / Palak',
    scientificName: 'Spinacia oleracea',
    category: 'Vegetables',
    optimalSoil: ['Loamy', 'Sandy Loam', 'Alluvial'],
    tempRangeC: [12, 24],
    rainfallRangeMm: [300, 500],
    growthDurationDays: 45,
    baseYieldQuintalsPerAcre: 50.0,
    averageMarketPricePerQuintalINR: 1500,
    icon: '🥬',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 4, description: 'Dense seed sprouting on beds', waterReqMm: 20 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 20, description: 'Rosette succulent broad leaf expansion', waterReqMm: 45 },
      { stage: 'Harvest Ready', daysFromSowing: 45, description: 'First multi-cut leaf harvesting at 6-8 inch height', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 6 tons + DAP 30 kg + MOP 15 kg per acre',
      vegetative: 'Urea 20 kg top dressed after every cutting with light irrigation',
      flowering: 'Not allowed to flower (cut before bolting)',
      grainFilling: 'Foliar spray of 19:19:19 + Iron chelate for deep green color'
    },
    commonPests: ['Leaf Miner', 'Downy Mildew', 'Aphids', 'Damping Off']
  },
  {
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Red & Yellow', 'Laterite', 'Loamy'],
    tempRangeC: [20, 32],
    rainfallRangeMm: [1200, 2000],
    growthDurationDays: 240,
    baseYieldQuintalsPerAcre: 85.0,
    averageMarketPricePerQuintalINR: 6500,
    icon: '🫚',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 20, description: 'Sprouting from seed rhizomes and pseudostem emergence', waterReqMm: 60 },
      { stage: 'Tillering / Branching', daysFromSowing: 70, description: 'Tillering, shoot proliferation, and heavy leaf canopy', waterReqMm: 140 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 160, description: 'Rhizome enlargement and essential gingerol oil accumulation', waterReqMm: 200 },
      { stage: 'Ripening & Maturation', daysFromSowing: 210, description: 'Leaves turn yellow and begin to dry', waterReqMm: 50 },
      { stage: 'Harvest Ready', daysFromSowing: 240, description: 'Complete haulm drying ready for digger rhizome lifting', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 12 tons + DAP 60 kg + MOP 40 kg + Trichoderma enriched cake',
      vegetative: 'Urea 40 kg split at 45 & 90 DAS with earthing up and green mulching',
      flowering: 'Micronutrient cocktail (Zinc, Boron, Magnesium)',
      grainFilling: '0:0:50 foliar spray for dense rhizome fingers and aroma'
    },
    commonPests: ['Soft Rot / Rhizome Rot (Pythium)', 'Bacterial Wilt (Ralstonia)', 'Shoot Borer (Conogethes)', 'Rhizome Scale']
  },

  // ===================== SPICES & CONDIMENTS =====================
  {
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    category: 'Spices',
    optimalSoil: ['Loamy', 'Red & Yellow', 'Alluvial', 'Black (Regur)'],
    tempRangeC: [20, 35],
    rainfallRangeMm: [1000, 1800],
    growthDurationDays: 240,
    baseYieldQuintalsPerAcre: 90.0,
    averageMarketPricePerQuintalINR: 8200,
    icon: '🫚',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 25, description: 'Rhizome bud sprouting and coleoptile emergence', waterReqMm: 70 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 75, description: 'Broad glossy leaf blade expansion and pseudostem growth', waterReqMm: 160 },
      { stage: 'Tillering / Branching', daysFromSowing: 120, description: 'Multi-tiller expansion and primary finger rhizome initiation', waterReqMm: 200 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 180, description: 'Secondary/tertiary rhizome bulking and curcumin synthesis', waterReqMm: 180 },
      { stage: 'Ripening & Maturation', daysFromSowing: 215, description: 'Lower leaves yellowing and nutrient relocation to mother rhizome', waterReqMm: 40 },
      { stage: 'Harvest Ready', daysFromSowing: 240, description: 'Complete aerial foliage dry down ready for digging', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 15 tons + Neem Cake 250 kg + DAP 60 kg + MOP 50 kg + Zinc 10 kg',
      vegetative: 'Urea 35 kg + Micronutrient foliar spray at 45 & 90 DAS with earthing up',
      flowering: '19:19:19 drip fertigation for canopy health',
      grainFilling: '0:0:50 (Potassium Sulphate) @ 5 kg/week to bolster curcumin percentage'
    },
    commonPests: ['Rhizome Rot (Pythium aphanidermatum)', 'Leaf Spot / Leaf Blotch (Taphrina maculans)', 'Shoot Borer', 'Thrips']
  },
  {
    name: 'Cumin / Jeera',
    scientificName: 'Cuminum cyminum',
    category: 'Spices',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [10, 26],
    rainfallRangeMm: [200, 400],
    growthDurationDays: 105,
    baseYieldQuintalsPerAcre: 4.5,
    averageMarketPricePerQuintalINR: 24000,
    icon: '🧂',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 12, description: 'Slow delicate emergence requiring light misting', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 40, description: 'Fine dissected feathery foliage growth', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 70, description: 'White/pink compound umbel blooming', waterReqMm: 60 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 90, description: 'Schizocarp seed filling and cumin oil accumulation', waterReqMm: 35 },
      { stage: 'Harvest Ready', daysFromSowing: 105, description: 'Umbels turn brown and dry ready for early morning harvest', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 5 tons + DAP 30 kg + MOP 15 kg + Sulfur 15 kg per acre',
      vegetative: 'Urea 20 kg during second irrigation at 30 DAS',
      flowering: 'Foliar spray of Mancozeb + Carbendazim to guard against blight',
      grainFilling: '0:0:50 foliar spray (1%) for seed luster and essential oil'
    },
    commonPests: ['Blight (Alternaria burnsii)', 'Wilt (Fusarium oxysporum)', 'Powdery Mildew (Erysiphe polygoni)', 'Aphids']
  },
  {
    name: 'Coriander / Dhania',
    scientificName: 'Coriandrum sativum',
    category: 'Spices',
    optimalSoil: ['Loamy', 'Black (Regur)', 'Alluvial'],
    tempRangeC: [15, 28],
    rainfallRangeMm: [300, 600],
    growthDurationDays: 95,
    baseYieldQuintalsPerAcre: 6.5,
    averageMarketPricePerQuintalINR: 7500,
    icon: '🌿',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Seed splitting and emergence', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 35, description: 'Aromatic basal foliage leaf rosette', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 60, description: 'Umbel flower blooming', waterReqMm: 65 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 80, description: 'Globular seed development', waterReqMm: 45 },
      { stage: 'Harvest Ready', daysFromSowing: 95, description: 'Seeds turn brownish-green', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 35 kg + MOP 15 kg + FYM 6 tons per acre',
      vegetative: 'Urea 25 kg top dress at 30 DAS',
      flowering: '19:19:19 foliar spray + Wettable Sulfur for powdery mildew prevention',
      grainFilling: '0:0:50 spray to enhance seed aroma and test weight'
    },
    commonPests: ['Powdery Mildew', 'Stem Gall', 'Wilt', 'Aphids']
  },
  {
    name: 'Black Pepper',
    scientificName: 'Piper nigrum',
    category: 'Spices',
    optimalSoil: ['Laterite', 'Red & Yellow', 'Loamy'],
    tempRangeC: [20, 35],
    rainfallRangeMm: [1500, 2500],
    growthDurationDays: 240,
    baseYieldQuintalsPerAcre: 6.0,
    averageMarketPricePerQuintalINR: 58000,
    icon: '🌰',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 60, description: 'Runner shoot climbing on standard support trees', waterReqMm: 120 },
      { stage: 'Flowering & Heading', daysFromSowing: 120, description: 'Spike emergence and flowering during monsoon', waterReqMm: 250 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 180, description: 'Berry development and piperine synthesis along spikes', waterReqMm: 200 },
      { stage: 'Harvest Ready', daysFromSowing: 240, description: '1-2 berries on each spike turn bright orange-red', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 kg/vine + NPK 50:50:150g per vine + Neem cake 1 kg',
      vegetative: 'Trichoderma soil drenching + 1% Bordeaux mixture spray',
      flowering: '19:19:19 foliar spray during spike emergence',
      grainFilling: 'Potassium Nitrate 1% foliar spray for berry size'
    },
    commonPests: ['Quick Wilt / Foot Rot (Phytophthora capsici)', 'Pollu Beetle', 'Top Shoot Borer', 'Nematodes']
  },
  {
    name: 'Cardamom',
    scientificName: 'Elettaria cardamomum',
    category: 'Spices',
    optimalSoil: ['Forest Loam', 'Laterite', 'Red & Yellow'],
    tempRangeC: [15, 30],
    rainfallRangeMm: [1500, 3000],
    growthDurationDays: 270,
    baseYieldQuintalsPerAcre: 1.8,
    averageMarketPricePerQuintalINR: 185000,
    icon: '🌿',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 60, description: 'Tillering and pseudostem clump development in shade', waterReqMm: 150 },
      { stage: 'Flowering & Heading', daysFromSowing: 120, description: 'Panicle emergence from rhizome base and white-violet blooming', waterReqMm: 250 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 200, description: 'Trilocular capsule filling and seed maturation', waterReqMm: 220 },
      { stage: 'Harvest Ready', daysFromSowing: 270, description: 'Selective picking of plump green capsules at 30-day intervals', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'Compost 5 kg/clump + NPK 75:75:150 kg/ha in 2 splits',
      vegetative: 'Bio-fertilizers (Azospirillum + PSB) with organic mulch',
      flowering: 'Foliar micronutrient (Zinc + Boron + Magnesium) spray',
      grainFilling: 'Potassium sulfate spray for green capsule retention'
    },
    commonPests: ['Cardamom Thrips (Sciothrips cardamomi)', 'Shoot Borer (Conogethes)', 'Azhukal / Capsule Rot (Phytophthora)', 'Katte / Mosaic Disease']
  },
  {
    name: 'Fenugreek / Methi',
    scientificName: 'Trigonella foenum-graecum',
    category: 'Spices',
    optimalSoil: ['Loamy', 'Sandy Loam', 'Alluvial'],
    tempRangeC: [10, 25],
    rainfallRangeMm: [300, 500],
    growthDurationDays: 90,
    baseYieldQuintalsPerAcre: 6.0,
    averageMarketPricePerQuintalINR: 6800,
    icon: '🌿',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 4, description: 'Fast seedling emergence', waterReqMm: 20 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Trifoliate aromatic leafy growth (leaf cut option)', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 50, description: 'White/yellow papilionaceous flowers in axils', waterReqMm: 60 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 70, description: 'Slender beaked pod development and seed filling', waterReqMm: 40 },
      { stage: 'Harvest Ready', daysFromSowing: 90, description: 'Pods turn golden brown ready for seed threshing', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 35 kg + MOP 15 kg + Rhizobium culture',
      vegetative: 'Urea 20 kg top dress after first leaf cutting if dual-purpose',
      flowering: '19:19:19 foliar spray + Wettable Sulfur for powdery mildew',
      grainFilling: '0:0:50 spray for plump golden seeds'
    },
    commonPests: ['Powdery Mildew', 'Downy Mildew', 'Aphids', 'Root Rot']
  },

  // ===================== FRUITS & PLANTATION =====================
  {
    name: 'Mango',
    scientificName: 'Mangifera indica',
    category: 'Fruits',
    optimalSoil: ['Alluvial', 'Loamy', 'Red & Yellow', 'Laterite'],
    tempRangeC: [22, 38],
    rainfallRangeMm: [750, 1500],
    growthDurationDays: 140,
    baseYieldQuintalsPerAcre: 45.0,
    averageMarketPricePerQuintalINR: 4200,
    icon: '🥭',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Post-monsoon vegetative flush and shoot maturity', waterReqMm: 60 },
      { stage: 'Flowering & Heading', daysFromSowing: 60, description: 'Panicle emergence and blossom bloom', waterReqMm: 90 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 100, description: 'Pea stage fruit set, marble stage, and fruit sizing', waterReqMm: 130 },
      { stage: 'Ripening & Maturation', daysFromSowing: 130, description: 'Shoulder rounding and specific gravity maturation', waterReqMm: 40 },
      { stage: 'Harvest Ready', daysFromSowing: 140, description: 'Hand picking with pedicel intact to prevent latex drip', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 50 kg/tree + NPK 1000:500:1000g per tree per year',
      vegetative: 'Paclobutrazol soil application for flower induction (Sept-Oct)',
      flowering: 'Planofix + Carbendazim spray during panicle emergence',
      grainFilling: 'Potassium Nitrate 1.5% foliar spray for fruit size & sweetness (Brix)'
    },
    commonPests: ['Mango Hopper (Idioscopus)', 'Powdery Mildew (Oidium mangiferae)', 'Fruit Fly (Bactrocera dorsalis)', 'Anthracnose']
  },
  {
    name: 'Banana',
    scientificName: 'Musa acuminata',
    category: 'Fruits',
    optimalSoil: ['Loamy', 'Alluvial', 'Clay Loam'],
    tempRangeC: [20, 35],
    rainfallRangeMm: [1200, 2200],
    growthDurationDays: 330,
    baseYieldQuintalsPerAcre: 260.0,
    averageMarketPricePerQuintalINR: 1800,
    icon: '🍌',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 30, description: 'Sucker rooting and cigar leaf emergence', waterReqMm: 100 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 120, description: 'Pseudostem growth and rapid broad leaf emission', waterReqMm: 350 },
      { stage: 'Flowering & Heading', daysFromSowing: 210, description: 'Shooting (inflorescence bunch emergence) and male bud removal (denavelling)', waterReqMm: 380 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 280, description: 'Finger filling and bunch maturation under bunch sleeve', waterReqMm: 300 },
      { stage: 'Harvest Ready', daysFromSowing: 330, description: 'Angularity disappears and fingers become round/plump (75-80% maturity)', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 kg/plant + Neem cake 1 kg + SSP 200g per plant',
      vegetative: 'Urea 200g + MOP 300g per plant split monthly via fertigation',
      flowering: 'Sulfate of Potash (00:00:50) + Micronutrient spray (Banana special)',
      grainFilling: 'SOP spray on bunches @ 0.5% + bunch bagging'
    },
    commonPests: ['Sigatoka Leaf Spot (Mycosphaerella)', 'Panama Wilt (Fusarium oxysporum f. sp. cubense)', 'Banana Pseudostem Weevil', 'Aphids (Bunchy Top Vector)']
  },
  {
    name: 'Citrus / Lemon',
    scientificName: 'Citrus limon',
    category: 'Fruits',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial', 'Red & Yellow'],
    tempRangeC: [15, 35],
    rainfallRangeMm: [600, 1100],
    growthDurationDays: 160,
    baseYieldQuintalsPerAcre: 60.0,
    averageMarketPricePerQuintalINR: 4500,
    icon: '🍋',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Flushing of tender light green vegetative shoots', waterReqMm: 50 },
      { stage: 'Flowering & Heading', daysFromSowing: 65, description: 'White fragrant blossom flowering and fruit setting', waterReqMm: 80 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 120, description: 'Fruit sizing and juice vesicle expansion', waterReqMm: 120 },
      { stage: 'Harvest Ready', daysFromSowing: 160, description: 'Juice content > 35% and color break from dark to lemon yellow', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 25 kg/tree + NPK 500:250:500g per tree per year',
      vegetative: 'Zinc Sulphate (0.5%) + Manganese (0.2%) foliar spray on new flush',
      flowering: 'Planofix (NAA) 20 ppm to check fruit drop',
      grainFilling: 'Potassium Nitrate (13:0:45) spray 1.5% for fruit size and juice'
    },
    commonPests: ['Citrus Canker (Xanthomonas axonopodis)', 'Citrus Leaf Miner', 'Citrus Psylla (Greening Vector)', 'Gummosis (Phytophthora)']
  },
  {
    name: 'Guava',
    scientificName: 'Psidium guajava',
    category: 'Fruits',
    optimalSoil: ['Loamy', 'Sandy Loam', 'Alluvial', 'Red & Yellow'],
    tempRangeC: [15, 35],
    rainfallRangeMm: [600, 1000],
    growthDurationDays: 130,
    baseYieldQuintalsPerAcre: 70.0,
    averageMarketPricePerQuintalINR: 2800,
    icon: '🍈',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'New shoot emergence following pruning/withholding water (Bahar treatment)', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 55, description: 'White blooming in leaf axils', waterReqMm: 75 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 100, description: 'Fruit enlargement and pulp development', waterReqMm: 110 },
      { stage: 'Harvest Ready', daysFromSowing: 130, description: 'Color changes from dark green to greenish-yellow', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 20 kg/tree + NPK 500:200:500g per tree',
      vegetative: 'Urea top dressing after pruning',
      flowering: 'Zinc Sulphate + Boron foliar spray for fruit set',
      grainFilling: 'Potassium sulfate foliar spray for fruit sweetness and crispness'
    },
    commonPests: ['Guava Fruit Fly (Bactrocera)', 'Guava Wilt (Fusarium)', 'Mealybug', 'Anthracnose']
  },
  {
    name: 'Pomegranate',
    scientificName: 'Punica granatum',
    category: 'Fruits',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Black (Regur)'],
    tempRangeC: [18, 38],
    rainfallRangeMm: [500, 800],
    growthDurationDays: 160,
    baseYieldQuintalsPerAcre: 55.0,
    averageMarketPricePerQuintalINR: 7500,
    icon: '🍎',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Bahar induction and fresh leaf flushing', waterReqMm: 50 },
      { stage: 'Flowering & Heading', daysFromSowing: 65, description: 'Crimson red flower bloom and hermaphrodite setting', waterReqMm: 85 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 120, description: 'Aril expansion and ruby coloring inside rind', waterReqMm: 125 },
      { stage: 'Harvest Ready', daysFromSowing: 160, description: 'Calyx flattens and rind turns yellowish-red with metallic ring on tapping', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 25 kg/tree + NPK 625:250:250g per plant',
      vegetative: '19:19:19 fertigation @ 5 kg/week',
      flowering: 'Calcium Nitrate + Boron foliar spray to prevent fruit cracking',
      grainFilling: '00:00:50 + Phosphoric acid via drip for aril color and juice'
    },
    commonPests: ['Bacterial Blight / Telya (Xanthomonas axonopodis pv. punicae)', 'Pomegranate Butterfly / Fruit Borer (Virachola isocrates)', 'Fruit Spot (Cercospora)', 'Thrips']
  },
  {
    name: 'Papaya',
    scientificName: 'Carica papaya',
    category: 'Fruits',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [22, 35],
    rainfallRangeMm: [1000, 1600],
    growthDurationDays: 270,
    baseYieldQuintalsPerAcre: 220.0,
    averageMarketPricePerQuintalINR: 1500,
    icon: '🍈',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 15, description: 'Seedling emergence in polybags', waterReqMm: 40 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 60, description: 'Transplanting and rapid trunk height elongation', waterReqMm: 120 },
      { stage: 'Flowering & Heading', daysFromSowing: 110, description: 'Axillary flower bloom and sex determination (hermaphrodite/female)', waterReqMm: 180 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 200, description: 'Fruit clustering along main trunk and sizing', waterReqMm: 240 },
      { stage: 'Harvest Ready', daysFromSowing: 270, description: 'Color change from dark green to yellow striping at apex', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 kg/plant + SSP 200g + MOP 100g per pit',
      vegetative: 'NPK 250:250:500g per plant split into 6 bimonthly applications',
      flowering: 'Boron 20% spray to prevent bumpy fruits and flower drop',
      grainFilling: 'Potassium Nitrate spray for high fruit sugar sweetness'
    },
    commonPests: ['Papaya Ring Spot Virus (PRSV transmitted by aphids)', 'Damping Off (Pythium)', 'Mealybug', 'Anthracnose']
  },
  {
    name: 'Coconut',
    scientificName: 'Cocos nucifera',
    category: 'Fruits',
    optimalSoil: ['Sandy Loam', 'Alluvial', 'Laterite', 'Red & Yellow'],
    tempRangeC: [22, 34],
    rainfallRangeMm: [1300, 2500],
    growthDurationDays: 365,
    baseYieldQuintalsPerAcre: 50.0,
    averageMarketPricePerQuintalINR: 3200,
    icon: '🥥',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 90, description: 'Frond crown development and root basin maintenance', waterReqMm: 250 },
      { stage: 'Flowering & Heading', daysFromSowing: 180, description: 'Spadix opening and button flower pollination', waterReqMm: 350 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 280, description: 'Nut sizing, copra meat thickness, and tender water filling', waterReqMm: 400 },
      { stage: 'Harvest Ready', daysFromSowing: 365, description: '12-month-old fully mature brown husk nuts (or 7-month tender water nuts)', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 50 kg/palm + Urea 1.3 kg + SSP 2.0 kg + MOP 2.0 kg + Magnesium Sulfate 500g per palm per year',
      vegetative: 'Neem cake 5 kg per palm basin + Green manuring with Sunnhemp',
      flowering: 'Borax 100g/palm to prevent button shedding',
      grainFilling: 'Potassium chloride (MOP) application for kernel copra yield'
    },
    commonPests: ['Rhinoceros Beetle (Oryctes rhinoceros)', 'Red Palm Weevil (Rhynchophorus ferrugineus)', 'Eriophyid Mite', 'Bud Rot (Phytophthora)']
  },
  {
    name: 'Apple',
    scientificName: 'Malus domestica',
    category: 'Fruits',
    optimalSoil: ['Loamy', 'Clay Loam', 'Alluvial'],
    tempRangeC: [-5, 24],
    rainfallRangeMm: [1000, 1500],
    growthDurationDays: 150,
    baseYieldQuintalsPerAcre: 75.0,
    averageMarketPricePerQuintalINR: 6500,
    icon: '🍎',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 20, description: 'Silver tip, green tip, and tight cluster bud break', waterReqMm: 40 },
      { stage: 'Flowering & Heading', daysFromSowing: 45, description: 'Pink bud and full white-pink bloom (bee pollination)', waterReqMm: 70 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 95, description: 'Petal fall, fruitlet thinning, and rapid cell division', waterReqMm: 120 },
      { stage: 'Ripening & Maturation', daysFromSowing: 130, description: 'Anthocyanin color development and starch to sugar conversion', waterReqMm: 60 },
      { stage: 'Harvest Ready', daysFromSowing: 150, description: 'T-stage harvesting with fruit stem intact', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 30 kg/tree + NPK 700:350:700g per mature tree',
      vegetative: 'Urea spray at silver tip + Micronutrient Zinc & Boron',
      flowering: 'Calcium Chloride foliar spray (0.5%) to prevent Bitter Pit',
      grainFilling: 'Potassium Nitrate spray 1% for bright red skin blush and firmness'
    },
    commonPests: ['Apple Scab (Venturia inaequalis)', 'San Jose Scale', 'Woolly Apple Aphid', 'Powdery Mildew']
  },
  {
    name: 'Grapes',
    scientificName: 'Vitis vinifera',
    category: 'Fruits',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Black (Regur)'],
    tempRangeC: [15, 35],
    rainfallRangeMm: [500, 800],
    growthDurationDays: 140,
    baseYieldQuintalsPerAcre: 100.0,
    averageMarketPricePerQuintalINR: 4800,
    icon: '🍇',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 15, description: 'Bud sprouting after October foundation pruning', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 45, description: 'Inflorescence cluster emergence and cap fall blooming', waterReqMm: 75 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 90, description: 'Berry setting, GA3 dipping for berry elongation, and berry sizing', waterReqMm: 130 },
      { stage: 'Ripening & Maturation', daysFromSowing: 120, description: 'Veraison stage (softening and sugar accumulation)', waterReqMm: 50 },
      { stage: 'Harvest Ready', daysFromSowing: 140, description: 'Brix reaches 18-20° ready for bunch harvesting', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 20 tons + NPK 10:26:26 100 kg per acre',
      vegetative: 'Gibberellic Acid (GA3) dipping for rachis and berry elongation',
      flowering: 'Calcium Nitrate + Boron for uniform cluster berry set',
      grainFilling: '00:00:50 (Potassium Sulfate) fertigation for high TSS sugar'
    },
    commonPests: ['Downy Mildew (Plasmopara viticola)', 'Powdery Mildew (Uncinula necator)', 'Thrips', 'Mealybug']
  },
  {
    name: 'Watermelon',
    scientificName: 'Citrullus lanatus',
    category: 'Fruits',
    optimalSoil: ['Sandy Loam', 'Alluvial', 'Loamy'],
    tempRangeC: [22, 36],
    rainfallRangeMm: [400, 600],
    growthDurationDays: 85,
    baseYieldQuintalsPerAcre: 160.0,
    averageMarketPricePerQuintalINR: 1100,
    icon: '🍉',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Direct sowing emergence on plastic mulch beds', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Runner vine spread and lateral branching', waterReqMm: 55 },
      { stage: 'Flowering & Heading', daysFromSowing: 45, description: 'Yellow bloom and bee pollination', waterReqMm: 80 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 65, description: 'Rapid melon swelling and sugar accumulation', waterReqMm: 110 },
      { stage: 'Harvest Ready', daysFromSowing: 85, description: 'Ground spot turns creamy yellow and tendril withers completely', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 tons + DAP 50 kg + MOP 30 kg per acre under mulch',
      vegetative: '19:19:19 @ 3 kg/acre per week via drip',
      flowering: '13:00:45 + Boron for fruit set and preventing hollow heart',
      grainFilling: '00:00:50 SOP @ 5 kg/week for deep red flesh and high Brix'
    },
    commonPests: ['Fruit Fly (Bactrocera)', 'Fusarium Wilt', 'Downy Mildew', 'Anthracnose']
  },
  // ===================== ADDITIONAL CEREALS & MILLETS =====================
  {
    name: 'Barley',
    scientificName: 'Hordeum vulgare',
    category: 'Cereals',
    optimalSoil: ['Loamy', 'Clayey', 'Alluvial', 'Sandy Loam'],
    tempRangeC: [12, 25],
    rainfallRangeMm: [300, 500],
    growthDurationDays: 110,
    baseYieldQuintalsPerAcre: 16.0,
    averageMarketPricePerQuintalINR: 1950,
    icon: '🌾',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 8, description: 'Seedling emergence and root establishment', waterReqMm: 40 },
      { stage: 'Tillering / Branching', daysFromSowing: 30, description: 'Profuse tillering', waterReqMm: 60 },
      { stage: 'Flowering & Heading', daysFromSowing: 65, description: 'Earhead emergence and awn development', waterReqMm: 80 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 90, description: 'Grain filling and hardening', waterReqMm: 50 },
      { stage: 'Harvest Ready', daysFromSowing: 110, description: 'Golden earheads ready for combine harvest', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 40 kg + MOP 15 kg + Zinc 5 kg/acre',
      vegetative: 'Urea 30 kg top dress with 1st irrigation',
      flowering: '19:19:19 foliar spray @ 1 kg/acre',
      grainFilling: '0:0:50 spray @ 1 kg/acre for bold malting grain'
    },
    commonPests: ['Rust (Puccinia)', 'Powdery Mildew', 'Covered Smut', 'Aphids']
  },
  {
    name: 'Foxtail Millet',
    scientificName: 'Setaria italica',
    category: 'Cereals',
    optimalSoil: ['Red & Yellow', 'Sandy Loam', 'Loamy', 'Black (Regur)'],
    tempRangeC: [20, 34],
    rainfallRangeMm: [300, 500],
    growthDurationDays: 80,
    baseYieldQuintalsPerAcre: 10.0,
    averageMarketPricePerQuintalINR: 3500,
    icon: '🌾',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 6, description: 'Seedling emergence', waterReqMm: 30 },
      { stage: 'Tillering / Branching', daysFromSowing: 25, description: 'Active tillering', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 50, description: 'Bristly panicle emergence', waterReqMm: 60 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 68, description: 'Seed dough filling', waterReqMm: 40 },
      { stage: 'Harvest Ready', daysFromSowing: 80, description: 'Golden earheads ready for manual harvest', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 5 tons + DAP 25 kg + Potash 10 kg/acre',
      vegetative: 'Urea 15 kg after weeding',
      flowering: 'Foliar micronutrient spray',
      grainFilling: 'Foliar spray of 0:0:50 for grain boldness'
    },
    commonPests: ['Shoot Fly', 'Rust', 'Smut', 'Armyworm']
  },
  {
    name: 'Little Millet',
    scientificName: 'Panicum sumatrense',
    category: 'Cereals',
    optimalSoil: ['Red & Yellow', 'Laterite', 'Loamy'],
    tempRangeC: [22, 35],
    rainfallRangeMm: [350, 600],
    growthDurationDays: 75,
    baseYieldQuintalsPerAcre: 8.5,
    averageMarketPricePerQuintalINR: 4200,
    icon: '🌾',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Emergence on light soils', waterReqMm: 25 },
      { stage: 'Tillering / Branching', daysFromSowing: 22, description: 'Branching and root anchoring', waterReqMm: 40 },
      { stage: 'Flowering & Heading', daysFromSowing: 45, description: 'Open panicle blooming', waterReqMm: 55 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 62, description: 'Grain development', waterReqMm: 35 },
      { stage: 'Harvest Ready', daysFromSowing: 75, description: 'Straw yellowing', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 4 tons + NPK 20:20:0 30 kg/acre',
      vegetative: 'Urea 15 kg at 25 DAS',
      flowering: '19:19:19 foliar spray',
      grainFilling: 'Potash foliar spray'
    },
    commonPests: ['Shoot Fly', 'Leaf Blight', 'Grain Smut']
  },
  {
    name: 'Kodo Millet',
    scientificName: 'Paspalum scrobiculatum',
    category: 'Cereals',
    optimalSoil: ['Red & Yellow', 'Sandy Loam', 'Laterite'],
    tempRangeC: [22, 35],
    rainfallRangeMm: [400, 700],
    growthDurationDays: 100,
    baseYieldQuintalsPerAcre: 9.0,
    averageMarketPricePerQuintalINR: 3800,
    icon: '🌾',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 7, description: 'Seedling emergence', waterReqMm: 30 },
      { stage: 'Tillering / Branching', daysFromSowing: 30, description: 'Stooling and tillering', waterReqMm: 50 },
      { stage: 'Flowering & Heading', daysFromSowing: 60, description: 'Spikelet exertion', waterReqMm: 70 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 82, description: 'Hard dark seed development', waterReqMm: 50 },
      { stage: 'Harvest Ready', daysFromSowing: 100, description: 'Spikes turn dark grey/brown', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'Compost 5 tons + DAP 25 kg/acre',
      vegetative: 'Urea 15 kg at 30 DAS',
      flowering: 'Foliar micronutrient complex',
      grainFilling: '0:0:50 spray'
    },
    commonPests: ['Head Smut', 'Rust', 'Shoot Fly']
  },
  {
    name: 'Barnyard Millet',
    scientificName: 'Echinochloa frumentacea',
    category: 'Cereals',
    optimalSoil: ['Sandy Loam', 'Alluvial', 'Red & Yellow'],
    tempRangeC: [18, 32],
    rainfallRangeMm: [450, 750],
    growthDurationDays: 70,
    baseYieldQuintalsPerAcre: 11.0,
    averageMarketPricePerQuintalINR: 3600,
    icon: '🌾',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Rapid germination', waterReqMm: 25 },
      { stage: 'Tillering / Branching', daysFromSowing: 20, description: 'Erect tiller expansion', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 42, description: 'Dense compact panicle emergence', waterReqMm: 60 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 58, description: 'Grain ripening', waterReqMm: 35 },
      { stage: 'Harvest Ready', daysFromSowing: 70, description: 'Earheads turn golden brown', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 4 tons + DAP 30 kg + Potash 10 kg/acre',
      vegetative: 'Urea 20 kg at 20 DAS',
      flowering: '19:19:19 foliar spray',
      grainFilling: '0:0:50 spray'
    },
    commonPests: ['Grain Smut', 'Shoot Borer', 'Leaf Blast']
  },
  {
    name: 'Oats',
    scientificName: 'Avena sativa',
    category: 'Cereals',
    optimalSoil: ['Loamy', 'Clayey', 'Alluvial'],
    tempRangeC: [10, 24],
    rainfallRangeMm: [400, 650],
    growthDurationDays: 115,
    baseYieldQuintalsPerAcre: 15.0,
    averageMarketPricePerQuintalINR: 2800,
    icon: '🌾',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 8, description: 'Crown emergence', waterReqMm: 40 },
      { stage: 'Tillering / Branching', daysFromSowing: 30, description: 'Vegetative stem growth', waterReqMm: 65 },
      { stage: 'Flowering & Heading', daysFromSowing: 65, description: 'Panicle emergence', waterReqMm: 85 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 95, description: 'Milk to dough oat groats filling', waterReqMm: 60 },
      { stage: 'Harvest Ready', daysFromSowing: 115, description: 'Golden straw and hard groats', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'NPK 12:32:16 60 kg + Zinc 5 kg/acre',
      vegetative: 'Urea 30 kg with 1st irrigation',
      flowering: '13:0:45 foliar spray',
      grainFilling: '0:0:50 SOP spray'
    },
    commonPests: ['Crown Rust', 'Powdery Mildew', 'Aphids', 'Armyworm']
  },
  // ===================== ADDITIONAL PULSES =====================
  {
    name: 'Lentil / Masoor',
    scientificName: 'Lens culinaris',
    category: 'Pulses',
    optimalSoil: ['Loamy', 'Alluvial', 'Clayey', 'Black (Regur)'],
    tempRangeC: [12, 24],
    rainfallRangeMm: [300, 500],
    growthDurationDays: 110,
    baseYieldQuintalsPerAcre: 7.5,
    averageMarketPricePerQuintalINR: 6400,
    icon: '🥣',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Seedling emergence and nodulation', waterReqMm: 30 },
      { stage: 'Tillering / Branching', daysFromSowing: 35, description: 'Lateral branch development', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 65, description: 'Delicate purple/white flowering', waterReqMm: 65 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 90, description: 'Flat pod development and seed filling', waterReqMm: 45 },
      { stage: 'Harvest Ready', daysFromSowing: 110, description: 'Pods turn golden brown and rattle', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 35 kg + MOP 15 kg + Sulphur 10 kg + Rhizobium culture seed treatment',
      vegetative: 'Foliar spray of 19:19:19 (1%)',
      flowering: '2% DAP spray + Planofix (NAA) for preventing flower drop',
      grainFilling: '0:0:50 spray @ 1 kg/acre'
    },
    commonPests: ['Fusarium Wilt', 'Rust (Uromyces viciae-fabae)', 'Aphids', 'Pod Borer']
  },
  {
    name: 'Cowpea / Lobia',
    scientificName: 'Vigna unguiculata',
    category: 'Pulses',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Red & Yellow', 'Alluvial'],
    tempRangeC: [22, 35],
    rainfallRangeMm: [400, 700],
    growthDurationDays: 75,
    baseYieldQuintalsPerAcre: 6.5,
    averageMarketPricePerQuintalINR: 5800,
    icon: '🌱',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Rapid epigeal emergence', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Vine/bush vegetative spread and nitrogen fixing', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 45, description: 'Showy blossoms and pod initiation', waterReqMm: 65 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 60, description: 'Long green pod seed filling', waterReqMm: 50 },
      { stage: 'Harvest Ready', daysFromSowing: 75, description: 'Dry straw color pods ready for picking', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 30 kg + Potash 15 kg + Rhizobium culture',
      vegetative: 'Foliar micronutrient spray at 25 DAS',
      flowering: '13:0:45 foliar spray @ 1 kg/acre',
      grainFilling: '0:0:50 spray for bold grains'
    },
    commonPests: ['Aphids (Aphis craccivora)', 'Pod Borer (Maruca vitrata)', 'Yellow Mosaic Virus']
  },
  {
    name: 'Kidney Bean / Rajma',
    scientificName: 'Phaseolus vulgaris',
    category: 'Pulses',
    optimalSoil: ['Loamy', 'Alluvial', 'Deep Well-drained'],
    tempRangeC: [15, 26],
    rainfallRangeMm: [450, 700],
    growthDurationDays: 105,
    baseYieldQuintalsPerAcre: 9.0,
    averageMarketPricePerQuintalINR: 7800,
    icon: '🫘',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 8, description: 'Hypogeal emergence on ridges', waterReqMm: 35 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Bushy foliage and trifoliate leaf spread', waterReqMm: 60 },
      { stage: 'Flowering & Heading', daysFromSowing: 55, description: 'Dense pink/white bloom', waterReqMm: 80 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 80, description: 'Pod elongation and red kidney seed bolding', waterReqMm: 65 },
      { stage: 'Harvest Ready', daysFromSowing: 105, description: 'Pods dry completely and turn parchment white', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'NPK 12:32:16 60 kg + Zinc 5 kg per acre (Rajma lacks native rhizobia; needs extra N)',
      vegetative: 'Urea 25 kg top dressing at 25 DAS',
      flowering: '19:19:19 foliar spray + Boron 20%',
      grainFilling: '0:0:50 foliar spray for seed bolding'
    },
    commonPests: ['Bean Anthracnose', 'Angular Leaf Spot', 'Whitefly', 'Stem Fly']
  },
  {
    name: 'Horse Gram / Kulthi',
    scientificName: 'Macrotyloma uniflorum',
    category: 'Pulses',
    optimalSoil: ['Red & Yellow', 'Laterite', 'Sandy Loam'],
    tempRangeC: [20, 34],
    rainfallRangeMm: [300, 550],
    growthDurationDays: 100,
    baseYieldQuintalsPerAcre: 5.5,
    averageMarketPricePerQuintalINR: 4800,
    icon: '🌱',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 6, description: 'Seedling emergence', waterReqMm: 20 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Drought-hardy vine spreading', waterReqMm: 35 },
      { stage: 'Flowering & Heading', daysFromSowing: 60, description: 'Yellow bloom', waterReqMm: 50 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 80, description: 'Small flat curved pod filling', waterReqMm: 35 },
      { stage: 'Harvest Ready', daysFromSowing: 100, description: 'Entire crop dries for uprooting', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'SSP 50 kg + MOP 10 kg + Rhizobium culture',
      vegetative: 'Foliar spray of 19:19:19',
      flowering: 'Foliar micronutrient spray',
      grainFilling: '0:0:50 spray'
    },
    commonPests: ['Yellow Mosaic Virus', 'Root Rot', 'Pod Borer']
  },
  // ===================== ADDITIONAL CASH & PLANTATION =====================
  {
    name: 'Tobacco',
    scientificName: 'Nicotiana tabacum',
    category: 'Cash Crops',
    optimalSoil: ['Sandy Loam', 'Light Alluvial', 'Red & Yellow'],
    tempRangeC: [20, 32],
    rainfallRangeMm: [500, 800],
    growthDurationDays: 120,
    baseYieldQuintalsPerAcre: 8.5,
    averageMarketPricePerQuintalINR: 12500,
    icon: '🍂',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 15, description: 'Nursery seedling propagation', waterReqMm: 40 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 45, description: 'Transplanting and rapid broad leaf expansion', waterReqMm: 90 },
      { stage: 'Flowering & Heading', daysFromSowing: 75, description: 'Topping (removal of flower buds) and suckering', waterReqMm: 110 },
      { stage: 'Ripening & Maturation', daysFromSowing: 105, description: 'Leaf yellowing and gummy texture formation', waterReqMm: 50 },
      { stage: 'Harvest Ready', daysFromSowing: 120, description: 'Priming bottom to top mature leaves for flue curing', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'NPK 10:26:26 75 kg + Sulphur 15 kg per acre',
      vegetative: 'Urea 30 kg + Potash (SOP, no chloride)',
      flowering: 'Foliar Boron and Potassium spray',
      grainFilling: 'Topping maintenance to divert sugars to leaves'
    },
    commonPests: ['Tobacco Caterpillar (Spodoptera)', 'Aphids', 'Root Knot Nematode', 'Mosaic Virus (TMV)']
  },
  {
    name: 'Jute',
    scientificName: 'Corchorus olitorius',
    category: 'Cash Crops',
    optimalSoil: ['Alluvial', 'Clayey', 'Loamy'],
    tempRangeC: [24, 38],
    rainfallRangeMm: [1000, 1800],
    growthDurationDays: 120,
    baseYieldQuintalsPerAcre: 14.0,
    averageMarketPricePerQuintalINR: 5200,
    icon: '🌾',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 6, description: 'Emergence in flooded/moist silt seedbed', waterReqMm: 50 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 45, description: 'Rapid fibrous stalk height elongation (up to 3m)', waterReqMm: 180 },
      { stage: 'Flowering & Heading', daysFromSowing: 95, description: 'Small yellow floral initiation (ideal harvesting window)', waterReqMm: 150 },
      { stage: 'Harvest Ready', daysFromSowing: 120, description: 'Pod formation stage cutting for retting and fiber extraction', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'NPK 20:20:20 50 kg + Zinc 5 kg/acre',
      vegetative: 'Urea 25 kg top-dressing at 30 DAS',
      flowering: 'Foliar spray of 19:19:19',
      grainFilling: 'Foliar SOP spray before harvest'
    },
    commonPests: ['Stem Rot (Macrophomina)', 'Yellow Mite', 'Jute Semilooper', 'Hairy Caterpillar']
  },
  {
    name: 'Arecanut / Betel Nut',
    scientificName: 'Areca catechu',
    category: 'Cash Crops',
    optimalSoil: ['Laterite', 'Red & Yellow', 'Alluvial'],
    tempRangeC: [18, 35],
    rainfallRangeMm: [1500, 3000],
    growthDurationDays: 240,
    baseYieldQuintalsPerAcre: 12.0,
    averageMarketPricePerQuintalINR: 42000,
    icon: '🌴',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 60, description: 'Palm frond elongation and intercropping maintenance', waterReqMm: 150 },
      { stage: 'Flowering & Heading', daysFromSowing: 120, description: 'Spadix inflorescence blooming and spadix tying', waterReqMm: 220 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 180, description: 'Green tender nut development (Karakku) to Chali stage', waterReqMm: 260 },
      { stage: 'Ripening & Maturation', daysFromSowing: 220, description: 'Nut skin turns bright orange-yellow', waterReqMm: 120 },
      { stage: 'Harvest Ready', daysFromSowing: 240, description: 'Ripe bunch cutting for de-husking and sun drying', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 15 kg/palm + NPK 100:40:140 grams/palm/year',
      vegetative: 'Neem cake 2 kg/palm during pre-monsoon',
      flowering: 'Boron 20% foliar spray (2g/L) for fruit retention',
      grainFilling: 'Potassium Nitrate spray for heavy solid nut core'
    },
    commonPests: ['Fruit Rot / Mahali (Phytophthora meadii)', 'Yellow Leaf Disease', 'Spindle Bug', 'White Mite']
  },
  {
    name: 'Betel Leaf',
    scientificName: 'Piper betle',
    category: 'Cash Crops',
    optimalSoil: ['Clayey', 'Alluvial', 'Loamy'],
    tempRangeC: [20, 35],
    rainfallRangeMm: [1200, 2000],
    growthDurationDays: 180,
    baseYieldQuintalsPerAcre: 20.0,
    averageMarketPricePerQuintalINR: 18000,
    icon: '🍃',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 15, description: 'Cutting propagation on live trellises', waterReqMm: 80 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 60, description: 'Vine training on Sesbania (Agathi) live poles', waterReqMm: 160 },
      { stage: 'Tillering / Branching', daysFromSowing: 120, description: 'Continuous tender glossy heart-shaped leaf production', waterReqMm: 200 },
      { stage: 'Harvest Ready', daysFromSowing: 180, description: 'Regular multi-flush leaf picking every 15-20 days', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'Well-rotted FYM 10 tons + Mustard cake slurry + Wood ash',
      vegetative: 'Groundnut cake slurry application fortnightly',
      flowering: 'Panchagavya (3%) foliar spray for shiny green luster',
      grainFilling: 'Pseudomonas fluorescens root dip for wilt prevention'
    },
    commonPests: ['Foot Rot / Leaf Rot (Phytophthora parasitica)', 'Anthracnose', 'Mealybug', 'Whitefly']
  },
  // ===================== ADDITIONAL OILSEEDS =====================
  {
    name: 'Sesame / Gingelly',
    scientificName: 'Sesamum indicum',
    category: 'Oilseeds',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial', 'Red & Yellow'],
    tempRangeC: [25, 38],
    rainfallRangeMm: [350, 600],
    growthDurationDays: 85,
    baseYieldQuintalsPerAcre: 4.5,
    averageMarketPricePerQuintalINR: 8200,
    icon: '🌱',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Emergence and seedling thinning', waterReqMm: 20 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Stalk elongation and opposite leaf growth', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 45, description: 'Tubular bell-shaped flower bloom', waterReqMm: 65 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 68, description: 'Capsule pod setting and oil seed filling', waterReqMm: 40 },
      { stage: 'Harvest Ready', daysFromSowing: 85, description: 'Bottom leaves shed and capsules turn yellow', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 25 kg + MOP 15 kg + Sulphur 10 kg/acre (Sulphur boosts oil content)',
      vegetative: 'Urea 15 kg after 1st weeding',
      flowering: '19:19:19 foliar spray + Boron 20%',
      grainFilling: '0:0:50 spray @ 1 kg/acre for heavy capsules'
    },
    commonPests: ['Phyllody (Phytoplasma carried by leafhopper)', 'Antigastra Leaf Roller / Pod Borer', 'Powdery Mildew']
  },
  {
    name: 'Castor',
    scientificName: 'Ricinus communis',
    category: 'Oilseeds',
    optimalSoil: ['Sandy Loam', 'Red & Yellow', 'Loamy', 'Black (Regur)'],
    tempRangeC: [20, 36],
    rainfallRangeMm: [400, 750],
    growthDurationDays: 150,
    baseYieldQuintalsPerAcre: 8.0,
    averageMarketPricePerQuintalINR: 6100,
    icon: '🌿',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Emergence on wide spaced rows', waterReqMm: 35 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 45, description: 'Giant palmate leaf and primary raceme growth', waterReqMm: 80 },
      { stage: 'Flowering & Heading', daysFromSowing: 80, description: 'Monoecious raceme spike blooming', waterReqMm: 110 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 120, description: 'Spiny capsule development and mottled seed filling', waterReqMm: 90 },
      { stage: 'Harvest Ready', daysFromSowing: 150, description: 'Sequential harvesting of mature dried spikes', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 40 kg + MOP 20 kg + Sulphur 15 kg/acre',
      vegetative: 'Urea 25 kg at 35 DAS and 60 DAS',
      flowering: 'Foliar micronutrient spray + NAA',
      grainFilling: '00:00:50 spray for high ricinoleic oil content'
    },
    commonPests: ['Castor Semilooper (Achaea janata)', 'Capsule Borer', 'Botrytis Grey Mold', 'Wilt']
  },
  // ===================== ADDITIONAL VEGETABLES =====================
  {
    name: 'Cabbage',
    scientificName: 'Brassica oleracea var. capitata',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial', 'Clayey'],
    tempRangeC: [12, 24],
    rainfallRangeMm: [400, 600],
    growthDurationDays: 85,
    baseYieldQuintalsPerAcre: 150.0,
    averageMarketPricePerQuintalINR: 1400,
    icon: '🥬',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 6, description: 'Nursery seedling emergence', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Transplanting and loose frame leaf expansion', waterReqMm: 60 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 60, description: 'Head cupping, folding, and dense compact ball filling', waterReqMm: 110 },
      { stage: 'Harvest Ready', daysFromSowing: 85, description: 'Firm, rock-solid round cabbage head ready for cutting', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 tons + NPK 10:26:26 75 kg + Boron 5 kg/acre',
      vegetative: 'Urea 30 kg during frame growth',
      flowering: 'Calcium Nitrate + Boron foliar spray to prevent head tipburn',
      grainFilling: '0:0:50 spray @ 3 kg/acre for solid weight'
    },
    commonPests: ['Diamondback Moth (Plutella xylostella)', 'Cabbage Aphid', 'Black Rot (Xanthomonas)', 'Clubroot']
  },
  {
    name: 'Cauliflower',
    scientificName: 'Brassica oleracea var. botrytis',
    category: 'Vegetables',
    optimalSoil: ['Loamy', 'Clayey', 'Alluvial'],
    tempRangeC: [12, 22],
    rainfallRangeMm: [400, 600],
    growthDurationDays: 80,
    baseYieldQuintalsPerAcre: 130.0,
    averageMarketPricePerQuintalINR: 1600,
    icon: '🥦',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 6, description: 'Nursery tray raising', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Planting and broad vegetative frame formation', waterReqMm: 55 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 60, description: 'Buttoning and curd enlargement (blanching with leaves)', waterReqMm: 95 },
      { stage: 'Harvest Ready', daysFromSowing: 80, description: 'Compact, pure white curd cutting before riceyness', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 tons + DAP 50 kg + MOP 30 kg + Borax 10 kg + Ammonium Molybdate 1 kg/acre',
      vegetative: 'Urea 30 kg top dressing',
      flowering: 'Foliar Boron (0.2%) to prevent browning / hollow stem',
      grainFilling: '0:0:50 foliar spray for snow-white compact curds'
    },
    commonPests: ['Diamondback Moth', 'Aphids', 'Downy Mildew', 'Whiptail (Molybdenum deficiency)']
  },
  {
    name: 'Carrot',
    scientificName: 'Daucus carota',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Deep Loamy', 'Alluvial'],
    tempRangeC: [10, 22],
    rainfallRangeMm: [350, 500],
    growthDurationDays: 90,
    baseYieldQuintalsPerAcre: 110.0,
    averageMarketPricePerQuintalINR: 2100,
    icon: '🥕',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Direct sowing on ridges and emergence', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 35, description: 'Fern-like feather foliage and taproot initiation', waterReqMm: 55 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 65, description: 'Rapid cylindrical taproot thickening and beta-carotene accumulation', waterReqMm: 85 },
      { stage: 'Harvest Ready', daysFromSowing: 90, description: 'Deep orange/red smooth blunt root pulling', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'Well-rotted compost 8 tons (avoid fresh manure to prevent root forking) + NPK 12:32:16 50 kg',
      vegetative: 'Urea 20 kg at 30 DAS',
      flowering: 'Potassium Nitrate 13:0:45 foliar spray',
      grainFilling: '00:00:50 SOP fertigation for sweet crispy carrot roots'
    },
    commonPests: ['Carrot Rust Fly', 'Alternaria Leaf Blight', 'Root Knot Nematode', 'Cavity Spot']
  },
  {
    name: 'Beetroot',
    scientificName: 'Beta vulgaris',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [14, 25],
    rainfallRangeMm: [350, 550],
    growthDurationDays: 75,
    baseYieldQuintalsPerAcre: 90.0,
    averageMarketPricePerQuintalINR: 1900,
    icon: '🟣',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 8, description: 'Cluster seed emergence on ridges', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Thinning and maroon red foliage canopy expansion', waterReqMm: 45 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 50, description: 'Globular root bulb expansion and betalain pigment loading', waterReqMm: 70 },
      { stage: 'Harvest Ready', daysFromSowing: 75, description: 'Tender 5-7 cm diameter uniform globes ready for harvesting', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 6 tons + DAP 40 kg + MOP 30 kg + Borax 5 kg/acre',
      vegetative: 'Urea 20 kg at 25 DAS',
      flowering: 'Foliar Boron spray to prevent internal black rot',
      grainFilling: '0:0:50 spray for deep crimson flesh'
    },
    commonPests: ['Cercospora Leaf Spot', 'Flea Beetle', 'Downy Mildew', 'Heart Rot (Boron deficiency)']
  },
  {
    name: 'Capsicum / Bell Pepper',
    scientificName: 'Capsicum annuum',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [18, 30],
    rainfallRangeMm: [600, 900],
    growthDurationDays: 130,
    baseYieldQuintalsPerAcre: 120.0,
    averageMarketPricePerQuintalINR: 3200,
    icon: '🫑',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 12, description: 'Nursery plug tray germination', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 40, description: 'Drip/mulch transplanting and branching canopy', waterReqMm: 75 },
      { stage: 'Flowering & Heading', daysFromSowing: 70, description: 'Crown flower set and lateral blooms', waterReqMm: 110 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 100, description: 'Blocky 3-4 lobed thick wall fruit expansion', waterReqMm: 130 },
      { stage: 'Harvest Ready', daysFromSowing: 130, description: 'Glossy dark green or color break (red/yellow) picking', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 tons + NPK 10:26:26 75 kg + Magnesium Sulphate 10 kg/acre',
      vegetative: '19:19:19 weekly drip fertigation @ 3 kg/acre',
      flowering: 'Calcium Nitrate + Boron fertigation to prevent Blossom End Rot',
      grainFilling: '13:00:45 + 00:00:50 for thick pericarp walls and high luster'
    },
    commonPests: ['Thrips', 'Mites (Polyphagotarsonemus)', 'Anthracnose', 'Bacterial Spot', 'Leaf Curl Virus']
  },
  {
    name: 'Bitter Gourd',
    scientificName: 'Momordica charantia',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [22, 36],
    rainfallRangeMm: [500, 800],
    growthDurationDays: 110,
    baseYieldQuintalsPerAcre: 60.0,
    averageMarketPricePerQuintalINR: 2800,
    icon: '🥒',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 7, description: 'Direct sowing on bower trellis pits', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Tendril climbing onto wire bower', waterReqMm: 60 },
      { stage: 'Flowering & Heading', daysFromSowing: 50, description: 'Yellow bloom (male and female flowers)', waterReqMm: 85 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 75, description: 'Spiny ridged green fruit enlargement', waterReqMm: 110 },
      { stage: 'Harvest Ready', daysFromSowing: 110, description: 'Continuous tender green picking every 3-4 days', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 8 tons + DAP 40 kg + MOP 25 kg/acre',
      vegetative: '19:19:19 @ 2.5 kg/acre per week via drip',
      flowering: '13:00:45 + Ethrel (200 ppm) spray to increase female flower ratio',
      grainFilling: '00:00:50 for dark green crispy fruits'
    },
    commonPests: ['Fruit Fly (Bactrocera cucurbitae)', 'Downy Mildew', 'Powdery Mildew', 'Mites']
  },
  {
    name: 'Cucumber',
    scientificName: 'Cucumis sativus',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial'],
    tempRangeC: [20, 34],
    rainfallRangeMm: [400, 650],
    growthDurationDays: 70,
    baseYieldQuintalsPerAcre: 90.0,
    averageMarketPricePerQuintalINR: 1500,
    icon: '🥒',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 4, description: 'Direct emergence on mulch beds', waterReqMm: 25 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 20, description: 'Vigorous vine running and tendril development', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 35, description: 'Prolific yellow flowering', waterReqMm: 70 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 50, description: 'Cylindrical crisp green fruit elongation', waterReqMm: 90 },
      { stage: 'Harvest Ready', daysFromSowing: 70, description: 'Daily harvesting of tender cucumbers', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 6 tons + NPK 12:32:16 50 kg/acre under mulch',
      vegetative: '19:19:19 fertigation 3 kg/acre twice weekly',
      flowering: 'Calcium Nitrate + Boron for straight fruit set',
      grainFilling: '00:00:50 SOP for crunchy skin and high water content'
    },
    commonPests: ['Downy Mildew', 'Powdery Mildew', 'Fruit Fly', 'Red Pumpkin Beetle']
  },
  {
    name: 'Drumstick / Moringa',
    scientificName: 'Moringa oleifera',
    category: 'Vegetables',
    optimalSoil: ['Sandy Loam', 'Red & Yellow', 'Alluvial', 'Loamy'],
    tempRangeC: [22, 38],
    rainfallRangeMm: [300, 800],
    growthDurationDays: 180,
    baseYieldQuintalsPerAcre: 80.0,
    averageMarketPricePerQuintalINR: 3200,
    icon: '🌿',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Seed / cutting sprouting', waterReqMm: 30 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 60, description: 'Main stem topping at 1m to induce lateral branches', waterReqMm: 70 },
      { stage: 'Flowering & Heading', daysFromSowing: 110, description: 'Creamy fragrant flower panicles', waterReqMm: 95 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 150, description: 'Long tender green pod elongation', waterReqMm: 110 },
      { stage: 'Harvest Ready', daysFromSowing: 180, description: 'Continuous multi-flush drumstick harvesting', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 kg/tree + NPK 100:100:50 grams/tree',
      vegetative: 'Urea 50g/tree after 1st pinch',
      flowering: 'Panchagavya (3%) + Boron (2g/L) for flower retention',
      grainFilling: 'Potassium Nitrate 1% spray for fleshy pod thickness'
    },
    commonPests: ['Moringa Pod Fly (Gitona distigma)', 'Hairy Caterpillar', 'Bud Midge', 'Damping Off']
  },
  // ===================== ADDITIONAL SPICES =====================
  {
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    category: 'Spices',
    optimalSoil: ['Loamy', 'Sandy Loam', 'Laterite', 'Red & Yellow'],
    tempRangeC: [18, 32],
    rainfallRangeMm: [1200, 2200],
    growthDurationDays: 220,
    baseYieldQuintalsPerAcre: 70.0,
    averageMarketPricePerQuintalINR: 6800,
    icon: '🫚',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 20, description: 'Seed rhizome sprouting on raised beds under mulch', waterReqMm: 60 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 70, description: 'Pseudostem tiller emergence and earthing up', waterReqMm: 140 },
      { stage: 'Tillering / Branching', daysFromSowing: 130, description: 'Finger rhizome branching and aromatic oil accumulation', waterReqMm: 180 },
      { stage: 'Ripening & Maturation', daysFromSowing: 190, description: 'Foliage turns yellow and starts drying', waterReqMm: 60 },
      { stage: 'Harvest Ready', daysFromSowing: 220, description: 'Mature pungent plump rhizome harvesting', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 12 tons + DAP 50 kg + MOP 30 kg + Trichoderma viride',
      vegetative: 'Urea 25 kg + Micronutrient booster at 60 and 90 DAS during earthing up',
      flowering: '19:19:19 + Humic acid soil drenching',
      grainFilling: '0:0:50 spray @ 2 kg/acre for heavy bold rhizomes'
    },
    commonPests: ['Soft Rot / Rhizome Rot (Pythium aphanidermatum)', 'Bacterial Wilt (Ralstonia)', 'Shoot Borer', 'Rhizome Scale']
  },
  {
    name: 'Garlic',
    scientificName: 'Allium sativum',
    category: 'Spices',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial', 'Clayey'],
    tempRangeC: [12, 26],
    rainfallRangeMm: [400, 700],
    growthDurationDays: 130,
    baseYieldQuintalsPerAcre: 35.0,
    averageMarketPricePerQuintalINR: 9500,
    icon: '🧄',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Clove sprouting on flat/raised beds', waterReqMm: 35 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 45, description: 'Tubular leaf sheath expansion', waterReqMm: 70 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 90, description: 'Bulb differentiation into cloves and allicin synthesis', waterReqMm: 95 },
      { stage: 'Ripening & Maturation', daysFromSowing: 115, description: 'Top foliage turns yellow and falls over (50% neck fall)', waterReqMm: 30 },
      { stage: 'Harvest Ready', daysFromSowing: 130, description: 'Solid white/purple multi-clove bulb pulling', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 tons + NPK 12:32:16 75 kg + Sulphur 20 kg/acre (Sulphur essential for allicin pungency)',
      vegetative: 'Urea 30 kg at 30 and 45 DAS',
      flowering: '13:00:45 foliar spray + Boron 20%',
      grainFilling: '00:00:50 SOP fertigation for dense clove weight'
    },
    commonPests: ['Purple Blotch (Alternaria porri)', 'Stemphylium Blight', 'Thrips (Thrips tabaci)', 'Stem and Bulb Nematode']
  },
  {
    name: 'Cardamom',
    scientificName: 'Elettaria cardamomum',
    category: 'Spices',
    optimalSoil: ['Forest Loam', 'Laterite', 'Red & Yellow'],
    tempRangeC: [10, 30],
    rainfallRangeMm: [1500, 3500],
    growthDurationDays: 240,
    baseYieldQuintalsPerAcre: 2.5,
    averageMarketPricePerQuintalINR: 180000,
    icon: '🌿',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 60, description: 'Shade-grown clump tiller multiplication', waterReqMm: 180 },
      { stage: 'Flowering & Heading', daysFromSowing: 120, description: 'Panicle emergence from rhizome base and white-violet bloom', waterReqMm: 240 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 180, description: 'Tricarpellary aromatic capsule swelling', waterReqMm: 260 },
      { stage: 'Harvest Ready', daysFromSowing: 240, description: 'Selective picking of deep green ripe capsules for curing', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'Compost 5 kg/clump + Neem cake 1 kg + NPK 75:75:150 kg/ha/year',
      vegetative: 'Foliar micronutrient Zinc & Magnesium spray',
      flowering: 'Boron 20% (1g/L) for capsule setting',
      grainFilling: 'Potassium Nitrate 1% for deep green cured appearance'
    },
    commonPests: ['Cardamom Thrips (Sciothrips cardamomi)', 'Shoot and Capsule Borer', 'Capsule Rot / Azhukal', 'Kattee / Mosaic Virus']
  },
  {
    name: 'Black Pepper',
    scientificName: 'Piper nigrum',
    category: 'Spices',
    optimalSoil: ['Laterite', 'Red & Yellow', 'Loamy'],
    tempRangeC: [15, 36],
    rainfallRangeMm: [1800, 3000],
    growthDurationDays: 210,
    baseYieldQuintalsPerAcre: 8.0,
    averageMarketPricePerQuintalINR: 54000,
    icon: '🌿',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 50, description: 'Vine training on live standard trees (Silver oak/Erythrina)', waterReqMm: 120 },
      { stage: 'Flowering & Heading', daysFromSowing: 100, description: 'Spike inflorescence emergence with monsoon showers', waterReqMm: 190 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 160, description: 'Berry setting and piperine alkaloid accumulation', waterReqMm: 220 },
      { stage: 'Harvest Ready', daysFromSowing: 210, description: 'Whole spike plucking when 1-2 berries turn red-orange', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 kg/vine + NPK 100:40:140 grams/vine/year + Trichoderma',
      vegetative: 'Foliar 19:19:19 + Magnesium Sulphate (0.5%)',
      flowering: '1% Bordeaux mixture spray for quick wilt prevention',
      grainFilling: '0:0:50 spray for bold heavy berries'
    },
    commonPests: ['Quick Wilt / Foot Rot (Phytophthora capsici)', 'Pollu Beetle (Longitarsus nigripennis)', 'Slow Wilt Nematode', 'Scale Insects']
  },
  // ===================== ADDITIONAL FRUITS =====================
  {
    name: 'Papaya',
    scientificName: 'Carica papaya',
    category: 'Fruits',
    optimalSoil: ['Sandy Loam', 'Alluvial', 'Loamy'],
    tempRangeC: [20, 36],
    rainfallRangeMm: [800, 1500],
    growthDurationDays: 240,
    baseYieldQuintalsPerAcre: 220.0,
    averageMarketPricePerQuintalINR: 1500,
    icon: '🍈',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 15, description: 'Polybag nursery seedling raising', waterReqMm: 50 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 60, description: 'Transplanting and rapid hollow stem growth', waterReqMm: 120 },
      { stage: 'Flowering & Heading', daysFromSowing: 110, description: 'Sex identification and hermaphrodite flower set', waterReqMm: 160 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 180, description: 'Continuous melon-sized fruit development', waterReqMm: 220 },
      { stage: 'Harvest Ready', daysFromSowing: 240, description: 'Color break (slight yellow streak at apex) harvesting', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 kg/plant + NPK 10:26:26 150g/plant',
      vegetative: 'Urea 50g/plant monthly under drip',
      flowering: 'Boron 20% (1g/L) to prevent fruit bumpy distortion',
      grainFilling: '00:00:50 fertigation @ 5 kg/acre/week for sweet orange flesh'
    },
    commonPests: ['Papaya Ring Spot Virus (PRSV)', 'Papaya Mealybug (Paracoccus marginatus)', 'Anthracnose', 'Root Rot']
  },
  {
    name: 'Guava',
    scientificName: 'Psidium guajava',
    category: 'Fruits',
    optimalSoil: ['Alluvial', 'Loamy', 'Red & Yellow', 'Clayey'],
    tempRangeC: [15, 35],
    rainfallRangeMm: [600, 1200],
    growthDurationDays: 140,
    baseYieldQuintalsPerAcre: 100.0,
    averageMarketPricePerQuintalINR: 2800,
    icon: '🍈',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 40, description: 'Canopy pruning and bahar treatment (withholding water)', waterReqMm: 60 },
      { stage: 'Flowering & Heading', daysFromSowing: 70, description: 'White floral bloom along new flush shoots', waterReqMm: 95 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 110, description: 'Crisp globular fruit swelling and vitamin C synthesis', waterReqMm: 130 },
      { stage: 'Harvest Ready', daysFromSowing: 140, description: 'Fruit color changes from dark to yellowish-green', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 20 kg/tree + NPK 260:180:260 grams/tree/year',
      vegetative: 'Micronutrient Zinc & Boron foliar spray (0.3%)',
      flowering: '13:0:45 foliar spray for high fruit setting',
      grainFilling: '0:0:50 spray for crisp crunchy texture and high sugar'
    },
    commonPests: ['Fruit Fly (Bactrocera)', 'Guava Wilt (Fusarium oxysporum)', 'Tea Mosquito Bug', 'Mealybug']
  },
  {
    name: 'Pomegranate',
    scientificName: 'Punica granatum',
    category: 'Fruits',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial', 'Black (Regur)'],
    tempRangeC: [18, 38],
    rainfallRangeMm: [500, 800],
    growthDurationDays: 160,
    baseYieldQuintalsPerAcre: 60.0,
    averageMarketPricePerQuintalINR: 7500,
    icon: '🍎',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 40, description: 'Bahar regulation (Hasta/Ambe bahar) and pruning', waterReqMm: 60 },
      { stage: 'Flowering & Heading', daysFromSowing: 70, description: 'Brilliant scarlet-red bloom', waterReqMm: 90 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 120, description: 'Aril development and ruby red juice loading', waterReqMm: 140 },
      { stage: 'Harvest Ready', daysFromSowing: 160, description: 'Calyx closes, rind turns deep red, and metallic sound on tapping', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 25 kg/plant + NPK 250:125:250 grams/plant',
      vegetative: '19:19:19 weekly drip fertigation',
      flowering: 'Calcium Nitrate + Boron to prevent fruit cracking / splitting',
      grainFilling: '00:00:50 SOP for dark red arils and high TSS'
    },
    commonPests: ['Bacterial Blight / Telya (Xanthomonas axonopodis)', 'Pomegranate Butterfly / Fruit Borer (Virachola isocrates)', 'Fruit Spot (Colletotrichum)']
  },
  {
    name: 'Citrus / Lemon',
    scientificName: 'Citrus limon',
    category: 'Fruits',
    optimalSoil: ['Loamy', 'Sandy Loam', 'Alluvial', 'Red & Yellow'],
    tempRangeC: [15, 35],
    rainfallRangeMm: [600, 1000],
    growthDurationDays: 130,
    baseYieldQuintalsPerAcre: 70.0,
    averageMarketPricePerQuintalINR: 3600,
    icon: '🍋',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Spring flush emergence and light pruning', waterReqMm: 50 },
      { stage: 'Flowering & Heading', daysFromSowing: 60, description: 'Fragrant white blossoming', waterReqMm: 80 },
      { stage: 'Grain / Fruit Formation', daysFromSowing: 100, description: 'Juicy acidic fruit enlargement and rind oil development', waterReqMm: 110 },
      { stage: 'Harvest Ready', daysFromSowing: 130, description: 'Fruit turns smooth yellowish green with abundant juice', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 20 kg/tree + NPK 300:200:300 grams/tree/year',
      vegetative: 'Zinc Sulphate (0.5%) + Ferrous Sulphate (0.2%) foliar spray',
      flowering: '2,4-D (10 ppm) or Planofix for preventing fruit drop',
      grainFilling: '0:0:50 spray for juicy thin rind'
    },
    commonPests: ['Citrus Canker (Xanthomonas)', 'Citrus Butterfly (Papilio demoleus)', 'Citrus Psyllid (Greening vector)', 'Leaf Miner']
  },
  // ===================== FLOWERS & FLORICULTURE =====================
  {
    name: 'Jasmine / Madurai Malli',
    scientificName: 'Jasminum sambac',
    category: 'Flowers',
    optimalSoil: ['Sandy Loam', 'Red & Yellow', 'Clayey', 'Loamy'],
    tempRangeC: [20, 36],
    rainfallRangeMm: [700, 1200],
    growthDurationDays: 90,
    baseYieldQuintalsPerAcre: 35.0,
    averageMarketPricePerQuintalINR: 45000,
    icon: '🌸',
    stages: [
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Annual pruning in January to induce new flowering shoots', waterReqMm: 50 },
      { stage: 'Flowering & Heading', daysFromSowing: 55, description: 'Profuse fragrant white flower bud formation', waterReqMm: 85 },
      { stage: 'Harvest Ready', daysFromSowing: 90, description: 'Daily early morning bud plucking before opening', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 10 kg/bush + NPK 60:120:120 grams/bush after pruning',
      vegetative: 'Panchagavya (3%) + Humic acid foliar spray',
      flowering: '19:19:19 + Micronutrient spray for dense flower buds',
      grainFilling: 'Potassium Nitrate for firm heavy buds'
    },
    commonPests: ['Bud Worm (Hendecasis duplifascialis)', 'Red Spider Mite', 'Blossom Midge', 'Leaf Webworm']
  },
  {
    name: 'Marigold',
    scientificName: 'Tagetes erecta',
    category: 'Flowers',
    optimalSoil: ['Sandy Loam', 'Loamy', 'Alluvial', 'Red & Yellow'],
    tempRangeC: [15, 32],
    rainfallRangeMm: [400, 700],
    growthDurationDays: 75,
    baseYieldQuintalsPerAcre: 60.0,
    averageMarketPricePerQuintalINR: 4200,
    icon: '🌼',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 5, description: 'Nursery tray germination', waterReqMm: 20 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 25, description: 'Transplanting and terminal bud pinching at 30 DAS', waterReqMm: 45 },
      { stage: 'Flowering & Heading', daysFromSowing: 50, description: 'Dense yellow/orange ball blooms', waterReqMm: 70 },
      { stage: 'Harvest Ready', daysFromSowing: 75, description: 'Regular multi-flush flower plucking for festival markets', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 8 tons + DAP 40 kg + Potash 20 kg/acre',
      vegetative: 'Urea 20 kg at 25 DAS after pinching',
      flowering: '13:00:45 foliar spray @ 1 kg/acre for large bright flower heads',
      grainFilling: '00:00:50 spray for long post-harvest vase life'
    },
    commonPests: ['Alternaria Leaf Spot', 'Red Spider Mite', 'Helicoverpa Bud Borer', 'Damping Off']
  },
  // ===================== FODDER & COVER CROPS =====================
  {
    name: 'Napier Grass / Super Napier',
    scientificName: 'Pennisetum purpureum',
    category: 'Fodder',
    optimalSoil: ['Alluvial', 'Loamy', 'Clayey', 'Red & Yellow'],
    tempRangeC: [20, 38],
    rainfallRangeMm: [600, 1500],
    growthDurationDays: 60,
    baseYieldQuintalsPerAcre: 400.0,
    averageMarketPricePerQuintalINR: 250,
    icon: '🌱',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 10, description: 'Two-bud stem cutting planting on ridges', waterReqMm: 50 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Vigorous high-protein leafy tiller clumps (up to 3m)', waterReqMm: 110 },
      { stage: 'Harvest Ready', daysFromSowing: 60, description: 'Multi-cut harvesting every 45-60 days at ground level for cattle feed', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'FYM 15 tons + NPK 10:26:26 75 kg/acre',
      vegetative: 'Urea 35 kg after each cutting with immediate irrigation',
      flowering: 'Slurry application of biogas digestate / dung water',
      grainFilling: 'Foliar micronutrient spray for high crude protein content'
    },
    commonPests: ['Grasshopper', 'Stem Borer', 'Rust', 'Helminthosporium Leaf Spot']
  },
  {
    name: 'Lucerne / Alfalfa',
    scientificName: 'Medicago sativa',
    category: 'Fodder',
    optimalSoil: ['Loamy', 'Alluvial', 'Deep Well-drained', 'Black (Regur)'],
    tempRangeC: [15, 32],
    rainfallRangeMm: [450, 800],
    growthDurationDays: 50,
    baseYieldQuintalsPerAcre: 180.0,
    averageMarketPricePerQuintalINR: 450,
    icon: '🌿',
    stages: [
      { stage: 'Germination & Emergence', daysFromSowing: 6, description: 'Seed broadcast on flat beds with Rhizobium', waterReqMm: 35 },
      { stage: 'Vegetative (Seedling)', daysFromSowing: 30, description: 'Dense multi-stem canopy with 20%+ crude protein', waterReqMm: 70 },
      { stage: 'Harvest Ready', daysFromSowing: 50, description: 'First cutting at 10% bloom, recurring cuts every 25-30 days', waterReqMm: 0 },
    ],
    fertilizerGuide: {
      basal: 'DAP 50 kg + MOP 30 kg + Sulphur 15 kg + Rhizobium meliloti seed inoculation',
      vegetative: 'Single Super Phosphate 25 kg after every 2nd harvest cut',
      flowering: '19:19:19 foliar spray',
      grainFilling: '0:0:50 spray'
    },
    commonPests: ['Alfalfa Weevil', 'Aphids', 'Downy Mildew', 'Cuscuta Weed Parasite']
  }
];
