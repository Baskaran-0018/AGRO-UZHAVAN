import { DatasetItem } from '../types/agro';

export const PRELOADED_DATASETS: DatasetItem[] = [
  {
    id: 'ds-crop-rec-001',
    name: 'ICAR_Crop_Recommendation_2025.csv',
    category: 'Crop & Soil',
    format: 'CSV',
    rowCount: 2200,
    columnCount: 8,
    fileSizeBytes: 184500,
    createdAt: '2025-06-12T10:30:00Z',
    status: 'Cleaned',
    columns: [
      { name: 'N (Nitrogen ratio)', type: 'numeric', missingCount: 0, meanOrUnique: '50.55 mg/kg' },
      { name: 'P (Phosphorus ratio)', type: 'numeric', missingCount: 0, meanOrUnique: '53.36 mg/kg' },
      { name: 'K (Potassium ratio)', type: 'numeric', missingCount: 0, meanOrUnique: '48.15 mg/kg' },
      { name: 'temperature', type: 'numeric', missingCount: 0, meanOrUnique: '25.62 °C' },
      { name: 'humidity', type: 'numeric', missingCount: 0, meanOrUnique: '71.48 %' },
      { name: 'ph', type: 'numeric', missingCount: 0, meanOrUnique: '6.47 pH' },
      { name: 'rainfall', type: 'numeric', missingCount: 0, meanOrUnique: '103.46 mm' },
      { name: 'label (Target Crop)', type: 'categorical', missingCount: 0, meanOrUnique: '22 crop classes' },
    ],
    cleaningSummary: {
      duplicatesRemoved: 14,
      outliersHandled: 32,
      missingImputed: 0,
      normalizedColumns: ['N', 'P', 'K', 'temperature', 'humidity', 'rainfall']
    },
    previewRows: [
      { N: 90, P: 42, K: 43, temperature: 20.88, humidity: 82.00, ph: 6.50, rainfall: 202.94, label: 'rice' },
      { N: 85, P: 58, K: 41, temperature: 21.77, humidity: 80.32, ph: 7.04, rainfall: 226.66, label: 'rice' },
      { N: 60, P: 55, K: 44, temperature: 23.00, humidity: 82.32, ph: 7.84, rainfall: 263.96, label: 'rice' },
      { N: 107, P: 34, K: 32, temperature: 26.77, humidity: 66.41, ph: 6.78, rainfall: 177.77, label: 'maize' },
      { N: 104, P: 18, K: 30, temperature: 25.22, humidity: 65.86, ph: 6.79, rainfall: 142.56, label: 'maize' },
      { N: 28, P: 76, K: 77, temperature: 18.25, humidity: 17.65, ph: 6.13, rainfall: 82.52, label: 'chickpea' },
      { N: 22, P: 67, K: 79, temperature: 17.25, humidity: 16.75, ph: 5.98, rainfall: 71.45, label: 'chickpea' },
      { N: 40, P: 72, K: 20, temperature: 27.60, humidity: 55.62, ph: 7.12, rainfall: 137.95, label: 'pigeonpeas' },
    ]
  },
  {
    id: 'ds-weather-time-002',
    name: 'India_HighRes_Weather_Historical_2015_2025.csv',
    category: 'Weather',
    format: 'CSV',
    rowCount: 87600,
    columnCount: 9,
    fileSizeBytes: 4890000,
    createdAt: '2025-08-01T14:15:00Z',
    status: 'Normalized',
    columns: [
      { name: 'timestamp', type: 'datetime', missingCount: 0, meanOrUnique: 'Hourly 2015-2025' },
      { name: 'temp_2m_celsius', type: 'numeric', missingCount: 0, meanOrUnique: '26.8 °C' },
      { name: 'relative_humidity_pct', type: 'numeric', missingCount: 0, meanOrUnique: '64.2 %' },
      { name: 'precipitation_mm', type: 'numeric', missingCount: 0, meanOrUnique: '0.14 mm/h' },
      { name: 'surface_pressure_hpa', type: 'numeric', missingCount: 0, meanOrUnique: '1011.4 hPa' },
      { name: 'wind_speed_10m_kmh', type: 'numeric', missingCount: 0, meanOrUnique: '12.6 km/h' },
      { name: 'shortwave_radiation_wm2', type: 'numeric', missingCount: 0, meanOrUnique: '194.2 W/m²' },
      { name: 'cloud_cover_pct', type: 'numeric', missingCount: 0, meanOrUnique: '38.4 %' },
      { name: 'soil_moisture_0_to_7cm', type: 'numeric', missingCount: 0, meanOrUnique: '0.28 m³/m³' },
    ],
    cleaningSummary: {
      duplicatesRemoved: 0,
      outliersHandled: 120,
      missingImputed: 48,
      normalizedColumns: ['temp_2m_celsius', 'relative_humidity_pct', 'shortwave_radiation_wm2']
    },
    previewRows: [
      { timestamp: '2025-07-01 00:00:00', temp_2m_celsius: 28.4, relative_humidity_pct: 78, precipitation_mm: 0.0, surface_pressure_hpa: 1008.2, wind_speed_10m_kmh: 8.5, shortwave_radiation_wm2: 0.0, cloud_cover_pct: 45, soil_moisture_0_to_7cm: 0.32 },
      { timestamp: '2025-07-01 06:00:00', temp_2m_celsius: 26.9, relative_humidity_pct: 88, precipitation_mm: 1.2, surface_pressure_hpa: 1009.1, wind_speed_10m_kmh: 10.2, shortwave_radiation_wm2: 120.5, cloud_cover_pct: 80, soil_moisture_0_to_7cm: 0.35 },
      { timestamp: '2025-07-01 12:00:00', temp_2m_celsius: 33.5, relative_humidity_pct: 62, precipitation_mm: 0.0, surface_pressure_hpa: 1007.4, wind_speed_10m_kmh: 14.8, shortwave_radiation_wm2: 890.0, cloud_cover_pct: 30, soil_moisture_0_to_7cm: 0.31 },
      { timestamp: '2025-07-01 18:00:00', temp_2m_celsius: 30.1, relative_humidity_pct: 71, precipitation_mm: 4.5, surface_pressure_hpa: 1008.0, wind_speed_10m_kmh: 18.2, shortwave_radiation_wm2: 45.0, cloud_cover_pct: 90, soil_moisture_0_to_7cm: 0.38 },
    ]
  },
  {
    id: 'ds-yield-history-003',
    name: 'MultiCrop_Yield_Acreage_AgriStats_2020_2025.json',
    category: 'Yield History',
    format: 'JSON',
    rowCount: 5400,
    columnCount: 11,
    fileSizeBytes: 980000,
    createdAt: '2025-07-20T08:00:00Z',
    status: 'Split (80/20)',
    columns: [
      { name: 'State_District', type: 'categorical', missingCount: 0, meanOrUnique: '240 districts' },
      { name: 'Crop', type: 'categorical', missingCount: 0, meanOrUnique: '18 major crops' },
      { name: 'Season', type: 'categorical', missingCount: 0, meanOrUnique: 'Kharif, Rabi, Zaid' },
      { name: 'Area_Acres', type: 'numeric', missingCount: 0, meanOrUnique: '4.85 avg' },
      { name: 'Fertilizer_NPK_kg_per_acre', type: 'numeric', missingCount: 0, meanOrUnique: '112.4 kg' },
      { name: 'Irrigation_Frequency', type: 'numeric', missingCount: 0, meanOrUnique: '4.2 irrigations' },
      { name: 'Total_Rainfall_Season_mm', type: 'numeric', missingCount: 0, meanOrUnique: '680 mm' },
      { name: 'GDD_Heat_Units', type: 'numeric', missingCount: 0, meanOrUnique: '1850 GDD' },
      { name: 'Pest_Incident_Score', type: 'numeric', missingCount: 0, meanOrUnique: '0.18 (0-1)' },
      { name: 'Yield_Quintals_Per_Acre', type: 'numeric', missingCount: 0, meanOrUnique: '22.8 Q/acre' },
    ],
    cleaningSummary: {
      duplicatesRemoved: 8,
      outliersHandled: 15,
      missingImputed: 12,
      normalizedColumns: ['Area_Acres', 'Fertilizer_NPK_kg_per_acre', 'Total_Rainfall_Season_mm', 'GDD_Heat_Units']
    },
    previewRows: [
      { State_District: 'Punjab_Ludhiana', Crop: 'Wheat', Season: 'Rabi', Area_Acres: 5.0, Fertilizer_NPK_kg_per_acre: 140, Irrigation_Frequency: 5, Total_Rainfall_Season_mm: 120, GDD_Heat_Units: 1920, Pest_Incident_Score: 0.05, Yield_Quintals_Per_Acre: 23.4 },
      { State_District: 'Haryana_Karnal', Crop: 'Wheat', Season: 'Rabi', Area_Acres: 3.5, Fertilizer_NPK_kg_per_acre: 135, Irrigation_Frequency: 4, Total_Rainfall_Season_mm: 98, GDD_Heat_Units: 1890, Pest_Incident_Score: 0.08, Yield_Quintals_Per_Acre: 22.1 },
      { State_District: 'Maharashtra_Nashik', Crop: 'Tomato', Season: 'Kharif', Area_Acres: 2.0, Fertilizer_NPK_kg_per_acre: 210, Irrigation_Frequency: 14, Total_Rainfall_Season_mm: 750, GDD_Heat_Units: 2100, Pest_Incident_Score: 0.15, Yield_Quintals_Per_Acre: 155.0 },
      { State_District: 'AndhraPradesh_Guntur', Crop: 'Cotton', Season: 'Kharif', Area_Acres: 4.0, Fertilizer_NPK_kg_per_acre: 160, Irrigation_Frequency: 6, Total_Rainfall_Season_mm: 820, GDD_Heat_Units: 2450, Pest_Incident_Score: 0.22, Yield_Quintals_Per_Acre: 12.8 },
    ]
  }
];
