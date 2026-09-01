export type SoilType =
  | 'Alluvial'
  | 'Black (Regur)'
  | 'Red & Yellow'
  | 'Laterite'
  | 'Sandy Loam'
  | 'Clayey'
  | 'Loamy'
  | 'Saline/Alkaline';

export type CropCategory = 'Cereals' | 'Pulses' | 'Cash Crops' | 'Vegetables' | 'Fruits' | 'Spices' | 'Oilseeds';

export type GrowthStage =
  | 'Germination & Emergence'
  | 'Vegetative (Seedling)'
  | 'Tillering / Branching'
  | 'Flowering & Heading'
  | 'Grain / Fruit Formation'
  | 'Ripening & Maturation'
  | 'Harvest Ready';

export interface FarmProfile {
  id: string;
  name: string;
  locationName: string;
  lat: number;
  lng: number;
  soilType: SoilType;
  areaAcres: number;
  altitudeMeters: number;
  irrigationType: 'Drip' | 'Sprinkler' | 'Canal/Flood' | 'Rainfed' | 'Pivot';
  boundaryGeoJSON?: [number, number][];
  createdAt: string;
}

export interface CropRecord {
  id: string;
  farmId: string;
  cropName: string;
  variety?: string;
  category: CropCategory;
  sowingDate: string;
  expectedHarvestDate: string;
  growthStage: GrowthStage;
  areaPlantedAcres: number;
  targetYieldTonsPerAcre: number;
  status: 'active' | 'harvested' | 'failed';
  notes?: string;
}

export interface WeatherCondition {
  timestamp: string;
  temp: number; // Celsius
  feelsLike: number;
  humidity: number; // %
  rainfallMm: number;
  windSpeedKmh: number;
  windDirectionDeg: number;
  pressureHpa: number;
  solarRadiationWm2: number;
  cloudCoverPct: number;
  uvIndex: number;
  soilTemp: number;
  soilMoisture: number;
  weatherCode: number;
  weatherDescription: string;
  rainProbabilityPct: number;
}

export interface WeatherAlert {
  id: string;
  type: 'Storm' | 'Heatwave' | 'Frost/Cold Wave' | 'Heavy Rain' | 'High Wind' | 'Pest Outbreak Risk';
  severity: 'low' | 'moderate' | 'severe' | 'critical';
  title: string;
  description: string;
  recommendedAction: string;
  validFrom: string;
  validTo: string;
}

export interface WeatherForecastBundle {
  current: WeatherCondition;
  nextHour: {
    temp: number;
    rainProb: number;
    rainMm: number;
    summary: string;
  };
  tomorrow: {
    tempMax: number;
    tempMin: number;
    rainProb: number;
    rainSumMm: number;
    humidity: number;
    summary: string;
  };
  hourly: WeatherCondition[];
  daily: {
    date: string;
    tempMax: number;
    tempMin: number;
    rainProb: number;
    rainSumMm: number;
    weatherCode: number;
    windMaxKmh: number;
    solarRadiation: number;
    sprayingIndex: 'Optimal' | 'Caution' | 'Unfavorable';
  }[];
  monthlyTrends: {
    month: string;
    expectedAvgTemp: number;
    historicAvgTemp: number;
    tempAnomaly: number;
    expectedRainfallMm: number;
    historicRainfallMm: number;
    droughtRisk: 'Low' | 'Moderate' | 'High';
  }[];
  alerts: WeatherAlert[];
  aiAnalysis: {
    headline: string;
    summary: string;
    fieldAdvisory: string[];
    sprayingConditions: string;
    irrigationRecommendation: string;
  };
}

export interface CropManagementPlan {
  cropName: string;
  growthStage: GrowthStage;
  daysSinceSowing: number;
  stageProgressPct: number;
  dailyActivities: {
    morning: { time: string; task: string; rationale: string; priority: 'high' | 'medium' | 'normal' }[];
    afternoon: { time: string; task: string; rationale: string; priority: 'high' | 'medium' | 'normal' }[];
    evening: { time: string; task: string; rationale: string; priority: 'high' | 'medium' | 'normal' }[];
  };
  weeklySchedule: { day: string; task: string; category: string }[];
  monthlyMilestones: { weekNum: number; milestone: string; focus: string }[];
  irrigation: {
    frequency: string;
    volumeLitersPerAcre: number;
    nextWatering: string;
    method: string;
    smartNotes: string;
  };
  fertilizer: {
    stageRequirement: string;
    recommendedProduct: string;
    dosagePerAcre: string;
    applicationMethod: string;
    npkRatio: string;
    microNutrients: string[];
    timing: string;
  };
  cropProtection: {
    weedingAction: string;
    pesticideReminder: string;
    preventativeSpray: string;
  };
  harvestPreparation: string[];
}

export interface DiseaseDetectionResult {
  id: string;
  timestamp: string;
  cropGuess: string;
  isHealthy: boolean;
  diseaseName: string;
  scientificName: string;
  diseaseStage: string;
  severityPercentage: number;
  confidenceScore: number;
  affectedLeafAreaPct: number;
  architectureModel: string;
  cause: string;
  symptoms: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  recommendedPesticides: string[];
  recommendedFungicides: string[];
  dosage: string;
  applicationMethod: string;
  safetyInstructions: string[];
  preventionTips: string[];
  recoveryTime: string;
  spreadRisk: string;
  imageUrl?: string;
  heatmapCoords?: { x: number; y: number; width: number; height: number; label: string }[];
}

export interface YieldPredictionResult {
  id: string;
  timestamp: string;
  crop: string;
  variety?: string;
  farmLocation: string;
  areaAcres: number;
  expectedYieldTotal: number; // in tons or quintals
  yieldPerAcre: number;
  unit: 'Quintals' | 'Metric Tons' | 'Kilograms' | 'Bags (50kg)';
  harvestDateWindow: {
    earliest: string;
    optimal: string;
    latest: string;
    daysRemaining: number;
  };
  estimatedRevenue: number;
  estimatedCost: number;
  estimatedProfit: number;
  currency: 'INR (₹)' | 'USD ($)' | 'EUR (€)';
  accuracyScore: number;
  modelUsed: 'Random Forest Regressor' | 'XGBoost 2.0' | 'Deep Neural Network (DNN)' | 'CatBoost Ensemble';
  topDrivers: { feature: string; impactPct: number; direction: 'positive' | 'negative' }[];
  risksAndMitigation: { risk: string; severity: 'low' | 'medium' | 'high'; mitigation: string }[];
  scenarios: {
    name: string;
    projectedYield: number;
    projectedProfit: number;
    condition: string;
  }[];
}

export interface MLTrainingConfig {
  id: string;
  modelType: 'Weather Forecast (LSTM-Transformer)' | 'Disease Classifier (EfficientNet-ViT)' | 'Yield Predictor (XGBoost/DNN)' | 'Crop Recommender (CatBoost)';
  datasetName: string;
  datasetSizeRows: number;
  architecture: string;
  epochs: number;
  batchSize: number;
  learningRate: number;
  optimizer: 'AdamW' | 'SGD' | 'RMSProp' | 'Adafactor';
  validationSplit: number;
  earlyStoppingPatience: number;
  dropoutRate: number;
}

export interface MLTrainingState {
  jobId: string;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'stopped';
  currentEpoch: number;
  totalEpochs: number;
  progressPct: number;
  elapsedSeconds: number;
  estimatedSecondsLeft: number;
  trainLoss: number;
  valLoss: number;
  trainAccuracy: number;
  valAccuracy: number;
  history: {
    epoch: number;
    trainLoss: number;
    valLoss: number;
    trainAcc: number;
    valAcc: number;
    lr: number;
  }[];
  hardware: {
    gpuName: string;
    gpuLoadPct: number;
    vramUsedGb: number;
    vramTotalGb: number;
    gpuTempC: number;
    cpuLoadPct: number;
    ramUsedGb: number;
    ramTotalGb: number;
    samplesPerSec: number;
  };
  metricsSummary?: {
    finalLoss: number;
    finalAccuracy: number;
    f1Score: number;
    rocAuc: number;
    precision: number;
    recall: number;
  };
}

export interface ModelZooItem {
  id: string;
  name: string;
  targetTask: string;
  framework: 'PyTorch' | 'TensorFlow' | 'ONNX' | 'Scikit-Learn';
  fileFormat: '.pth' | '.pt' | 'SavedModel' | '.onnx' | '.joblib' | '.pkl';
  version: string;
  accuracyPct: number;
  latencyMs: number;
  sizeMb: number;
  parametersCount: string;
  status: 'Production' | 'Staging' | 'Retraining' | 'Archived';
  trainedOn: string;
  supportedInputSchema: string[];
}

export interface DatasetItem {
  id: string;
  name: string;
  category: 'Weather' | 'Crop & Soil' | 'Yield History' | 'Plant Disease Images' | 'Nutrient Spectra';
  format: 'CSV' | 'JSON' | 'Excel' | 'Image Directory';
  rowCount: number;
  columnCount: number;
  fileSizeBytes: number;
  createdAt: string;
  status: 'Cleaned' | 'Raw' | 'Normalized' | 'Split (80/20)';
  columns: { name: string; type: 'numeric' | 'categorical' | 'datetime'; missingCount: number; meanOrUnique: string }[];
  previewRows: Record<string, any>[];
  cleaningSummary?: {
    duplicatesRemoved: number;
    outliersHandled: number;
    missingImputed: number;
    normalizedColumns: string[];
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language?: string;
  audioUrl?: string;
  suggestedActions?: string[];
  groundingSources?: string[];
}

export type AuthProviderType = 'google' | 'apple' | 'guest' | 'email' | 'phone';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  provider: AuthProviderType;
  isGuest: boolean;
  role?: 'Farmer' | 'Agronomist' | 'Farm Manager' | 'Researcher';
  location?: string;
  createdAt: string;
  lastLoginAt: string;
  farmCount?: number;
}
