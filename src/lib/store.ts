import {
  FarmProfile,
  CropRecord,
  DiseaseDetectionResult,
  YieldPredictionResult,
  DatasetItem,
  ModelZooItem,
  MLTrainingConfig,
  WeatherAlert,
  UserProfile
} from '../types/agro';
import { PRELOADED_DATASETS } from '../data/datasets';
import { MODELS_ZOO } from '../data/modelsZoo';
import { SupportedLang } from './i18n';

// Clean initial state without mock/demo entries - starts with user's primary farm
const INITIAL_FARMS: FarmProfile[] = [
  {
    id: 'farm-main-01',
    name: 'Primary Farm Estate',
    locationName: 'Tamil Nadu, India',
    lat: 12.8351,
    lng: 79.7001,
    soilType: 'Alluvial',
    areaAcres: 10.0,
    altitudeMeters: 80,
    irrigationType: 'Drip',
    boundaryGeoJSON: [
      [12.8351, 79.7001],
      [12.838, 79.703],
      [12.836, 79.706],
      [12.832, 79.702]
    ],
    createdAt: new Date().toISOString()
  }
];

export class AgroStore {
  private static FARMS_KEY = 'agro_ai_farms_v2';
  private static ACTIVE_FARM_KEY = 'agro_ai_active_farm_id_v2';
  private static CROPS_KEY = 'agro_ai_crops_v2';
  private static SCANS_KEY = 'agro_ai_scans_v2';
  private static YIELDS_KEY = 'agro_ai_yields_v2';
  private static DATASETS_KEY = 'agro_ai_datasets_v2';
  private static MODELS_KEY = 'agro_ai_models_v2';
  private static LANG_KEY = 'agro_ai_lang_v2';

  static getFarms(): FarmProfile[] {
    try {
      const data = localStorage.getItem(this.FARMS_KEY);
      if (data) {
        const parsed: FarmProfile[] = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If any farm has legacy placeholder Ludhiana, sanitize it
          let hasMigration = false;
          const cleaned = parsed.map(farm => {
            if (farm.locationName?.includes('Ludhiana') || Math.abs(farm.lat - 30.901) < 0.05) {
              hasMigration = true;
              return {
                ...farm,
                locationName: 'Tamil Nadu, India',
                lat: 12.8351,
                lng: 79.7001,
                boundaryGeoJSON: [
                  [12.8351, 79.7001],
                  [12.838, 79.703],
                  [12.836, 79.706],
                  [12.832, 79.702]
                ]
              };
            }
            return farm;
          });
          if (hasMigration) {
            localStorage.setItem(this.FARMS_KEY, JSON.stringify(cleaned));
          }
          return cleaned;
        }
      }
      return INITIAL_FARMS;
    } catch {
      return INITIAL_FARMS;
    }
  }

  static saveFarms(farms: FarmProfile[]) {
    localStorage.setItem(this.FARMS_KEY, JSON.stringify(farms));
  }

  static updateFarmLocation(farmId: string, locationName: string, lat: number, lng: number): FarmProfile[] {
    const farms = this.getFarms();
    const updated = farms.map(f => {
      if (f.id === farmId) {
        return {
          ...f,
          locationName,
          lat,
          lng,
          boundaryGeoJSON: [
            [lat, lng],
            [lat + 0.003, lng + 0.003],
            [lat + 0.001, lng + 0.005],
            [lat - 0.002, lng + 0.002]
          ]
        };
      }
      return f;
    });
    this.saveFarms(updated);
    return updated;
  }

  static getActiveFarm(): FarmProfile {
    const farms = this.getFarms();
    const activeId = localStorage.getItem(this.ACTIVE_FARM_KEY);
    return farms.find(f => f.id === activeId) || farms[0] || INITIAL_FARMS[0];
  }

  static setActiveFarmId(id: string) {
    localStorage.setItem(this.ACTIVE_FARM_KEY, id);
  }

  static getCrops(farmId?: string): CropRecord[] {
    try {
      const data = localStorage.getItem(this.CROPS_KEY);
      const all: CropRecord[] = data ? JSON.parse(data) : [];
      return farmId ? all.filter(c => c.farmId === farmId) : all;
    } catch {
      return [];
    }
  }

  static saveCrop(crop: CropRecord) {
    const crops = this.getCrops();
    const existingIndex = crops.findIndex(c => c.id === crop.id);
    if (existingIndex >= 0) {
      crops[existingIndex] = crop;
    } else {
      crops.unshift(crop);
    }
    localStorage.setItem(this.CROPS_KEY, JSON.stringify(crops));
  }

  static deleteCrop(cropId: string) {
    const crops = this.getCrops().filter(c => c.id !== cropId);
    localStorage.setItem(this.CROPS_KEY, JSON.stringify(crops));
  }

  static getDiseaseScans(): DiseaseDetectionResult[] {
    try {
      const data = localStorage.getItem(this.SCANS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static addDiseaseScan(scan: DiseaseDetectionResult) {
    const scans = this.getDiseaseScans();
    scans.unshift(scan);
    localStorage.setItem(this.SCANS_KEY, JSON.stringify(scans.slice(0, 50)));
  }

  static clearDiseaseScans() {
    localStorage.setItem(this.SCANS_KEY, JSON.stringify([]));
  }

  static getYieldPredictions(): YieldPredictionResult[] {
    try {
      const data = localStorage.getItem(this.YIELDS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static addYieldPrediction(yieldResult: YieldPredictionResult) {
    const yields = this.getYieldPredictions();
    yields.unshift(yieldResult);
    localStorage.setItem(this.YIELDS_KEY, JSON.stringify(yields.slice(0, 50)));
  }

  static getDatasets(): DatasetItem[] {
    try {
      const data = localStorage.getItem(this.DATASETS_KEY);
      return data ? JSON.parse(data) : PRELOADED_DATASETS;
    } catch {
      return PRELOADED_DATASETS;
    }
  }

  static addDataset(item: DatasetItem) {
    const ds = this.getDatasets();
    ds.unshift(item);
    localStorage.setItem(this.DATASETS_KEY, JSON.stringify(ds));
  }

  static deleteDataset(id: string) {
    const ds = this.getDatasets().filter(d => d.id !== id);
    localStorage.setItem(this.DATASETS_KEY, JSON.stringify(ds));
  }

  static getModels(): ModelZooItem[] {
    try {
      const data = localStorage.getItem(this.MODELS_KEY);
      return data ? JSON.parse(data) : MODELS_ZOO;
    } catch {
      return MODELS_ZOO;
    }
  }

  static addModel(item: ModelZooItem) {
    const models = this.getModels();
    models.unshift(item);
    localStorage.setItem(this.MODELS_KEY, JSON.stringify(models));
  }

  static getLanguage(): SupportedLang {
    try {
      const lang = localStorage.getItem(this.LANG_KEY) as SupportedLang;
      return lang || 'en';
    } catch {
      return 'en';
    }
  }

  static setLanguage(lang: SupportedLang) {
    localStorage.setItem(this.LANG_KEY, lang);
  }

  private static USER_KEY = 'agro_ai_user_profile_v2';

  static getUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(this.USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static setUser(user: UserProfile | null) {
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.USER_KEY);
    }
  }

  static updateUserProfile(partial: Partial<UserProfile>): UserProfile {
    const current = this.getUser() || {
      id: 'usr-' + Date.now(),
      name: 'Farmer Member',
      provider: 'guest',
      isGuest: true,
      role: 'Farmer',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };
    const updated: UserProfile = { ...current, ...partial, lastLoginAt: new Date().toISOString() };
    this.setUser(updated);
    return updated;
  }

  static logout() {
    localStorage.removeItem(this.USER_KEY);
  }

  static resetAllData() {
    localStorage.removeItem(this.FARMS_KEY);
    localStorage.removeItem(this.ACTIVE_FARM_KEY);
    localStorage.removeItem(this.CROPS_KEY);
    localStorage.removeItem(this.SCANS_KEY);
    localStorage.removeItem(this.YIELDS_KEY);
    localStorage.removeItem(this.DATASETS_KEY);
    localStorage.removeItem(this.MODELS_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
