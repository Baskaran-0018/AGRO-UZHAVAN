import { CropRecord, FarmProfile, CropManagementPlan, GrowthStage } from '../types/agro';
import { CROPS_CATALOG } from '../data/cropsData';
import { SupportedLang } from './i18n';
import { getLocalizedCropName, getLocalizedGrowthStage, translateText } from './universalTranslator';

export function generateSyntheticCropPlan(
  crop: CropRecord,
  farm: FarmProfile,
  lang: SupportedLang
): CropManagementPlan {
  const matched = CROPS_CATALOG.find(c => c.name.toLowerCase() === crop.cropName.toLowerCase()) || {
    name: crop.cropName,
    scientificName: 'Plantae spp.',
    category: crop.category,
    optimalSoil: [farm?.soilType || 'Loamy'],
    tempRangeC: [20, 32],
    rainfallRangeMm: [500, 900],
    growthDurationDays: 120,
    baseYieldQuintalsPerAcre: 25,
    averageMarketPricePerQuintalINR: 2500,
    stages: [],
    fertilizerGuide: {
      basal: 'DAP 50 kg + MOP 25 kg + Zinc 10 kg/acre',
      vegetative: 'Urea 30 kg top dressing + micronutrient foliar spray',
      flowering: '19:19:19 + Boron 20% foliar spray for maximum fruit set',
      grainFilling: '0:0:50 (Potassium Sulphate) @ 2 kg/acre for bold grain/fruit'
    },
    commonPests: ['Aphids / Whitefly', 'Stem Borer', 'Fungal Leaf Spot', 'Root Rot'],
    icon: '🌱'
  };

  const sowingDateMs = new Date(crop.sowingDate || Date.now() - 30 * 24 * 3600 * 1000).getTime();
  const nowMs = Date.now();
  const daysSinceSowing = Math.max(1, Math.floor((nowMs - sowingDateMs) / (24 * 3600 * 1000)));
  const totalDays = matched.growthDurationDays || 120;
  const stageProgressPct = Math.min(98, Math.max(8, Math.round((daysSinceSowing / totalDays) * 100)));

  const localizedCrop = getLocalizedCropName(crop.cropName, lang);
  const localizedStage = getLocalizedGrowthStage(crop.growthStage, lang);

  return {
    cropName: crop.cropName,
    growthStage: crop.growthStage,
    daysSinceSowing,
    stageProgressPct,
    dailyActivities: {
      morning: [
        {
          time: '06:30 - 08:30 AM',
          task: `${translateText('Canopy moisture & root zone inspection for', lang)} ${localizedCrop}`,
          rationale: translateText('Early morning scouting prevents dew-induced spore propagation and checks soil moisture tensiometer reading.', lang),
          priority: 'high'
        },
        {
          time: '08:30 - 10:30 AM',
          task: `${translateText('Fertigation & stage-wise nutrient dosing', lang)} (${matched.fertilizerGuide.vegetative})`,
          rationale: translateText('Optimal transpiration suction occurs during morning sun exposure, promoting maximum nutrient absorption.', lang),
          priority: 'medium'
        }
      ],
      afternoon: [
        {
          time: '01:00 - 03:00 PM',
          task: translateText('Monitor heat stress, leaf wilting, and micro-sprinkler misting', lang),
          rationale: translateText('High VPD (Vapor Pressure Deficit) mid-day hours require careful observation to avoid permanent wilting point.', lang),
          priority: 'normal'
        }
      ],
      evening: [
        {
          time: '05:00 - 06:45 PM',
          task: `${translateText('Targeted bio-protection / neem oil prophylactic spray for', lang)} ${matched.commonPests[0] || 'common pests'}`,
          rationale: translateText('Evening foliar application protects beneficial pollinators and allows prolonged leaf wetness without UV degradation.', lang),
          priority: 'high'
        },
        {
          time: '06:45 - 07:30 PM',
          task: translateText('Record daily water meter discharge and log pest trap counts', lang),
          rationale: translateText('Maintains farm audit trail and triggers early warning if insect threshold exceeds ETL.', lang),
          priority: 'normal'
        }
      ]
    },
    weeklySchedule: [
      { day: translateText('Monday', lang), task: translateText('Sub-surface soil compaction and weed removal along drip lines', lang), category: translateText('Soil Health', lang) },
      { day: translateText('Wednesday', lang), task: translateText('Foliar micronutrient booster spray (Zinc + Boron + Magnesium)', lang), category: translateText('Nutrition', lang) },
      { day: translateText('Friday', lang), task: translateText('Flush sub-main drip filters and check emitter discharge uniformity', lang), category: translateText('Irrigation', lang) },
      { day: translateText('Sunday', lang), task: translateText('Weekly growth vigor measurement and crown node counting', lang), category: translateText('Agronomy Audit', lang) },
    ],
    monthlyMilestones: [
      { weekNum: 1, milestone: `${translateText('Phase', lang)} 1: ${localizedStage} ${translateText('Establishment', lang)}`, focus: translateText('Root anchoring and vegetative leaf count expansion', lang) },
      { weekNum: 2, milestone: `${translateText('Phase', lang)} 2: ${translateText('Active Tillering & Biomass Bulking', lang)}`, focus: translateText('Nutrient uptake acceleration with nitrogen and organic carbon', lang) },
      { weekNum: 3, milestone: `${translateText('Phase', lang)} 3: ${translateText('Inflorescence & Reproductive Induction', lang)}`, focus: translateText('High phosphorus and potassium for flowering cluster retention', lang) },
      { weekNum: 4, milestone: `${translateText('Phase', lang)} 4: ${translateText('Yield Maturation & Quality Hardening', lang)}`, focus: translateText('Water taper-off and sucrose / starch accumulation', lang) },
    ],
    irrigation: {
      frequency: `${farm?.irrigationType || 'Drip'} · ${translateText('Every 2-3 Days', lang)}`,
      volumeLitersPerAcre: Math.round(18000 + daysSinceSowing * 120),
      nextWatering: translateText('Tomorrow, 06:30 AM (Morning cycle)', lang),
      method: `${farm?.irrigationType || 'Drip'} ${translateText('Precision System', lang)}`,
      smartNotes: `${translateText('Optimized for', lang)} ${farm?.soilType || 'Loamy'} ${translateText('soil with high infiltration capacity. Maintain field capacity at 70-80%.', lang)}`
    },
    fertilizer: {
      stageRequirement: `${localizedStage} ${translateText('Nutrient Demand', lang)}`,
      recommendedProduct: matched.fertilizerGuide.vegetative || '19:19:19 + Micronutrients',
      dosagePerAcre: `${Math.round(crop.areaPlantedAcres * 4.5)} kg / ${translateText('application', lang)}`,
      applicationMethod: farm?.irrigationType === 'Drip' ? translateText('Fertigation via Venturi injector', lang) : translateText('Broadcasting with soil incorporation', lang),
      npkRatio: '19:19:19 / 12:61:00',
      microNutrients: ['Zinc (Zn 12%)', 'Boron (B 20%)', 'Ferrous Sulphate (Fe)', 'Magnesium (MgSO4)'],
      timing: translateText('Early morning split application every 7 days', lang)
    },
    cropProtection: {
      weedingAction: translateText('Manual hand hoeing around crop root crown + organic paddy straw mulch maintenance', lang),
      pesticideReminder: `${translateText('Monitor for', lang)} ${matched.commonPests.slice(0, 2).join(', ')}. ${translateText('Apply botanical neem formulation (10,000 ppm @ 2 ml/L) as first line of defense.', lang)}`,
      preventativeSpray: translateText('Trichoderma viride + Pseudomonas fluorescens bio-agent drenching to protect against root rot and damping off.', lang)
    },
    harvestPreparation: [
      translateText('Calibrate harvesting moisture meter and prepare clean dry storage crates', lang),
      translateText('Cease chemical applications 14 days prior to harvest (observe Pre-Harvest Interval PHI)', lang),
      translateText('Arrange cold chain transport or local APMC mandi logistics', lang),
      translateText('Pre-clean processing threshers / sorting tables to prevent mechanical damage', lang)
    ]
  };
}
