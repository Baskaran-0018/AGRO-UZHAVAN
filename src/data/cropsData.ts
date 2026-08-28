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
  }
];
