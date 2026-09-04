import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Sprout,
  ShieldCheck,
  Save,
  CheckCircle2,
  QrCode,
  Download,
  Printer,
  Sparkles,
  Tractor,
  Layers,
  Droplets,
  Calendar,
  Landmark,
  Bell,
  Smartphone,
  Check,
  Camera,
  Award,
  IdCard,
  FileCheck,
  Activity,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, FarmProfile, SoilType } from '../../types/agro';
import { SupportedLang, TRANSLATIONS, LANGUAGES } from '../../lib/i18n';
import { getProfileTranslations } from '../../lib/profileTranslations';
import { translateText, getLocalizedLocation, getLocalizedUserName } from '../../lib/universalTranslator';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  activeFarm: FarmProfile;
  lang: SupportedLang;
}

const COMMON_CROPS = [
  'Paddy / Rice',
  'Wheat',
  'Cotton',
  'Sugarcane',
  'Maize / Corn',
  'Tomato',
  'Onion',
  'Banana',
  'Groundnut / Peanut',
  'Soybean',
  'Turmeric',
  'Chilli',
  'Pulses / Gram',
  'Coconut',
  'Mustard'
];

const LIVESTOCK_OPTIONS = [
  'Dairy Cattle',
  'Buffaloes',
  'Goats / Sheep',
  'Poultry / Chickens',
  'Fishery / Aquaculture',
  'None'
];

const MACHINERY_OPTIONS = [
  'Tractor',
  'Power Tiller',
  'Drip Fertigation System',
  'Rotavator',
  'Paddy Harvester',
  'Solar Water Pump',
  'Agricultural Drone Sprayer'
];

const INDIAN_STATES = [
  'Tamil Nadu',
  'Punjab',
  'Maharashtra',
  'Andhra Pradesh',
  'Karnataka',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Gujarat',
  'Rajasthan',
  'Haryana',
  'West Bengal',
  'Bihar',
  'Telangana',
  'Kerala',
  'Odisha'
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  activeFarm,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const pt = getProfileTranslations(lang);
  const [activeTab, setActiveTab] = useState<'kyc' | 'land' | 'crops' | 'schemes' | 'alerts' | 'idcard'>('kyc');
  const [isSaved, setIsSaved] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  // Form State
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [email, setEmail] = useState(user.email || '');
  const [role, setRole] = useState(user.role || 'Farmer');
  const [farmerId, setFarmerId] = useState(user.farmerId || `UZHAVAN-${(user.state || 'TN').substring(0, 2).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [aadhaarOrGovId, setAadhaarOrGovId] = useState(user.aadhaarOrGovId || '');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | 'Prefer not to say'>(user.gender || 'Male');
  const [age, setAge] = useState<number | string>(user.age || 38);
  const [dob, setDob] = useState(user.dob || '1988-06-15');

  // Geography & Land
  const [state, setState] = useState(user.state || 'Tamil Nadu');
  const [district, setDistrict] = useState(user.district || 'Thanjavur');
  const [taluk, setTaluk] = useState(user.taluk || 'Kumbakonam');
  const [village, setVillage] = useState(user.village || 'Papanasam');
  const [pincode, setPincode] = useState(user.pincode || '614205');
  const [totalLandAcres, setTotalLandAcres] = useState<number | string>(user.totalLandAcres || activeFarm.areaAcres || 5.5);
  const [landOwnership, setLandOwnership] = useState<any>(user.landOwnership || 'Owner / Self-Cultivated');

  // Soil, Irrigation & Crops
  const [soilType, setSoilType] = useState<SoilType>(user.soilType || activeFarm.soilType || 'Alluvial');
  const [irrigationSource, setIrrigationSource] = useState<any>(user.irrigationSource || 'Borewell & Drip');
  const [farmingExperienceYears, setFarmingExperienceYears] = useState<number | string>(user.farmingExperienceYears || 15);
  const [farmingMethod, setFarmingMethod] = useState<any>(user.farmingMethod || 'Organic / Natural');
  const [primaryCrops, setPrimaryCrops] = useState<string[]>(user.primaryCrops || ['Paddy / Rice (நெல்)', 'Sugarcane (கரும்பு)', 'Groundnut / Peanut (வேர்க்கடலை)']);
  const [livestock, setLivestock] = useState<string[]>(user.livestock || ['Dairy Cattle (கறவை மாடுகள்)', 'Poultry / Chickens (நாட்டுக்கோழி / பிராய்லர்)']);
  const [machinery, setMachinery] = useState<string[]>(user.machinery || ['Tractor (டிராக்டர்)', 'Drip Fertigation System (சொட்டுநீர் உரம் அமைப்பு)']);

  // Welfare Schemes & Finance
  const [pmKisanBeneficiaryId, setPmKisanBeneficiaryId] = useState(user.pmKisanBeneficiaryId || 'PMK-2026-994821');
  const [kisanCreditCardHolder, setKisanCreditCardHolder] = useState<boolean>(user.kisanCreditCardHolder ?? true);
  const [cropInsurancePolicyNumber, setCropInsurancePolicyNumber] = useState(user.cropInsurancePolicyNumber || 'PMFBY-TN-8874129');
  const [bankName, setBankName] = useState(user.bankName || 'State Bank of India (Agri Branch)');
  const [accountNumberMasked, setAccountNumberMasked] = useState(user.accountNumberMasked || 'XXXX-XXXX-8921');
  const [ifscCode, setIfscCode] = useState(user.ifscCode || 'SBIN0001234');

  // Preferences & Emergency
  const [preferredLanguage, setPreferredLanguage] = useState(user.preferredLanguage || lang);
  const [voiceAdvisoryEnabled, setVoiceAdvisoryEnabled] = useState(user.voiceAdvisoryEnabled ?? true);
  const [weatherSmsAlerts, setWeatherSmsAlerts] = useState(user.weatherSmsAlerts ?? true);
  const [pestOutbreakAlerts, setPestOutbreakAlerts] = useState(user.pestOutbreakAlerts ?? true);
  const [marketPriceAlerts, setMarketPriceAlerts] = useState(user.marketPriceAlerts ?? true);
  const [emergencyContact, setEmergencyContact] = useState(user.emergencyContact || '+91 98765 43210');

  // Calculate Profile Completeness Percentage
  const calculateCompleteness = () => {
    let score = 0;
    const totalFields = 12;
    if (name) score++;
    if (phone || email) score++;
    if (state && district) score++;
    if (village && pincode) score++;
    if (totalLandAcres) score++;
    if (soilType) score++;
    if (irrigationSource) score++;
    if (primaryCrops.length > 0) score++;
    if (pmKisanBeneficiaryId) score++;
    if (bankName) score++;
    if (emergencyContact) score++;
    if (farmingExperienceYears) score++;
    return Math.round((score / totalFields) * 100);
  };

  const completenessPct = calculateCompleteness();

  const handleToggleCrop = (crop: string) => {
    if (primaryCrops.includes(crop)) {
      setPrimaryCrops(primaryCrops.filter(c => c !== crop));
    } else {
      setPrimaryCrops([...primaryCrops, crop]);
    }
  };

  const handleToggleLivestock = (item: string) => {
    if (livestock.includes(item)) {
      setLivestock(livestock.filter(l => l !== item));
    } else {
      setLivestock([...livestock, item]);
    }
  };

  const handleToggleMachinery = (item: string) => {
    if (machinery.includes(item)) {
      setMachinery(machinery.filter(m => m !== item));
    } else {
      setMachinery([...machinery, item]);
    }
  };

  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const updatedProfile: UserProfile = {
      ...user,
      name,
      phone,
      email,
      role: role as any,
      farmerId,
      aadhaarOrGovId,
      gender,
      age: Number(age) || 38,
      dob,
      state,
      district,
      taluk,
      village,
      pincode,
      totalLandAcres: Number(totalLandAcres) || 5,
      landOwnership,
      soilType,
      irrigationSource,
      farmingExperienceYears: Number(farmingExperienceYears) || 10,
      farmingMethod,
      primaryCrops,
      livestock,
      machinery,
      pmKisanBeneficiaryId,
      kisanCreditCardHolder,
      cropInsurancePolicyNumber,
      bankName,
      accountNumberMasked,
      ifscCode,
      preferredLanguage,
      voiceAdvisoryEnabled,
      weatherSmsAlerts,
      pestOutbreakAlerts,
      marketPriceAlerts,
      emergencyContact,
      location: `${village}, ${district}, ${state}`,
      lastLoginAt: new Date().toISOString()
    };

    onUpdateUser(updatedProfile);
    setIsSaved(true);
    setSaveSuccessMsg(t.profileSaved || 'Farmer Profile & Agricultural Data saved successfully!');
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
      setIsSaved(false);
    }, 4000);
  };

  const handlePrintIdCard = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16 max-w-5xl mx-auto">
      {/* Top Banner & Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/20 p-6 sm:p-8 text-white shadow-xl">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-56 h-56 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar & User Core Details */}
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 p-1 shadow-lg shadow-emerald-900/40">
                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-2xl sm:text-3xl font-black text-emerald-300">
                      {name ? name.substring(0, 2).toUpperCase() : 'AU'}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer transition-all hover:scale-105"
                title="Change Avatar"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{pt.kycVerifiedMember}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  ID: {farmerId}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span>{getLocalizedUserName(name, lang) || translateText('Farmer Member', lang)}</span>
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>{translateText(role, lang)} · {totalLandAcres} {pt.acres}</span>
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{village}, {district}, {translateText(state, lang)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Completeness Score */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <div className="w-full sm:w-48 bg-slate-800/80 rounded-2xl p-3 border border-slate-700">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
                <span>{pt.profileStrength}</span>
                <span className="text-emerald-400">{completenessPct}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${completenessPct}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              <button
                type="button"
                onClick={handleSaveProfile}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{pt.saveProfile}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('idcard')}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                title={translateText('View Smart Pass', lang)}
              >
                <IdCard className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">{pt.smartId}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Alert Toast */}
      {isSaved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold">{saveSuccessMsg}</span>
          </div>
          <button
            onClick={() => setIsSaved(false)}
            className="text-xs font-extrabold text-emerald-700 hover:underline cursor-pointer"
          >
            {pt.dismiss}
          </button>
        </div>
      )}

      {/* Tab Navigation Menu */}
      <div className="flex overflow-x-auto gap-2 p-1.5 rounded-2xl bg-white border border-emerald-100 shadow-xs no-scrollbar">
        {[
          { id: 'kyc', label: pt.farmerKycTab, icon: User },
          { id: 'land', label: pt.landGeoTab, icon: MapPin },
          { id: 'crops', label: pt.soilCropsTab, icon: Sprout },
          { id: 'schemes', label: pt.welfareBankTab, icon: Landmark },
          { id: 'alerts', label: pt.advisoryPrefTab, icon: Bell },
          { id: 'idcard', label: pt.smartPassTab, icon: IdCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content Canvas */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* ================= TAB 1: KYC & PERSONAL ================= */}
        {activeTab === 'kyc' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-100 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900">{pt.farmerPersonalTitle || translateText('Farmer Personal & Identity Details', lang)}</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {pt.farmerPersonalSub || translateText('Government KYC identification, contact channels, and farming role configuration.', lang)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.fullName || translateText('Full Name', lang)} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs font-semibold text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.primaryMobile || translateText('Primary Mobile Number', lang)} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs font-semibold text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.emailAddress || translateText('Email Address', lang)}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@domain.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs font-semibold text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.accountRole || translateText('Farmer Account Role', lang)}
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs font-semibold text-slate-900 outline-none bg-white cursor-pointer"
                >
                  <option value="Farmer">{translateText('Farmer (Crop & Field Owner)', lang)}</option>
                  <option value="Agronomist">{translateText('Agronomist (Crop Doctor / Consultant)', lang)}</option>
                  <option value="Farm Manager">{translateText('Farm Manager (Commercial Enterprise)', lang)}</option>
                  <option value="Researcher">{translateText('Agricultural Scientist / Researcher', lang)}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.farmerIdLabel || translateText('Farmer ID / Kisan Number', lang)}
                </label>
                <input
                  type="text"
                  value={farmerId}
                  onChange={(e) => setFarmerId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-mono font-bold text-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.aadhaarGovId || translateText('Aadhaar / Government ID (Masked)', lang)}
                </label>
                <input
                  type="text"
                  value={aadhaarOrGovId}
                  onChange={(e) => setAadhaarOrGovId(e.target.value)}
                  placeholder="XXXX-XXXX-4589"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{pt.gender || translateText('Gender', lang)}</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none bg-white cursor-pointer"
                >
                  <option value="Male">{translateText('Male', lang)}</option>
                  <option value="Female">{translateText('Female', lang)}</option>
                  <option value="Other">{translateText('Other', lang)}</option>
                  <option value="Prefer not to say">{translateText('Prefer not to say', lang)}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{pt.dateOfBirthAge || translateText('Date of Birth / Age', lang)}</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 outline-none"
                  />
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder={translateText('Age', lang)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: LAND & GEOGRAPHY ================= */}
        {activeTab === 'land' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-100 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900">{pt.landGeoTitle || translateText('Land Holding & Geospatial Location', lang)}</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {pt.landGeoSub || translateText('Cultivated land acreage, ownership type, village/taluk jurisdiction, and pin code.', lang)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.totalLandArea || translateText('Total Land Holding in Acres', lang)} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={totalLandAcres}
                    onChange={(e) => setTotalLandAcres(e.target.value)}
                    placeholder="e.g. 5.5"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{pt.landOwnership || translateText('Land Ownership Status', lang)}</label>
                <select
                  value={landOwnership}
                  onChange={(e) => setLandOwnership(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none bg-white cursor-pointer"
                >
                  <option value="Owner / Self-Cultivated">{translateText('Owner / Self-Cultivated', lang)}</option>
                  <option value="Tenant Farmer">{translateText('Tenant Farmer', lang)}</option>
                  <option value="Leased Land">{translateText('Leased Land', lang)}</option>
                  <option value="Sharecropper">{translateText('Sharecropper', lang)}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{pt.stateProvince || translateText('State', lang)}</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none bg-white cursor-pointer"
                >
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{translateText(s, lang)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{pt.district || translateText('District', lang)}</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Thanjavur / Ludhiana"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{pt.talukMandal || translateText('Taluk / Block', lang)}</label>
                <input
                  type="text"
                  value={taluk}
                  onChange={(e) => setTaluk(e.target.value)}
                  placeholder="e.g. Kumbakonam"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{pt.villagePanchayat || translateText('Village / Locality', lang)}</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Papanasam"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{pt.pinCode || translateText('Postal PIN Code', lang)}</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 614205"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{translateText('Farming Experience (Years)', lang)}</label>
                <input
                  type="number"
                  value={farmingExperienceYears}
                  onChange={(e) => setFarmingExperienceYears(e.target.value)}
                  placeholder="e.g. 15"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: CROPS, SOIL & LIVESTOCK ================= */}
        {activeTab === 'crops' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-100 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900">{pt.soilCropsTitle || translateText('Soil, Irrigation & Agricultural Assets', lang)}</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {pt.soilCropsSub || translateText('Configure your primary soil texture, irrigation machinery, crop portfolio, and livestock holdings.', lang)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{pt.primarySoilType || translateText('Primary Soil Type', lang)}</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value as SoilType)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none bg-white cursor-pointer"
                >
                  <option value="Alluvial">{translateText('Alluvial Soil', lang)}</option>
                  <option value="Black (Regur)">{translateText('Black Soil / Regur', lang)}</option>
                  <option value="Red & Yellow">{translateText('Red & Yellow Soil', lang)}</option>
                  <option value="Laterite">{translateText('Laterite Soil', lang)}</option>
                  <option value="Sandy Loam">{translateText('Sandy Loam', lang)}</option>
                  <option value="Clayey">{translateText('Clayey Soil', lang)}</option>
                  <option value="Loamy">{translateText('Loamy Soil', lang)}</option>
                  <option value="Saline/Alkaline">{translateText('Saline / Alkaline Soil', lang)}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{pt.irrigationSource || translateText('Primary Irrigation Source', lang)}</label>
                <select
                  value={irrigationSource}
                  onChange={(e) => setIrrigationSource(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none bg-white cursor-pointer"
                >
                  <option value="Borewell & Drip">{translateText('Borewell with Drip Irrigation', lang)}</option>
                  <option value="Canal & Flood">{translateText('Canal / River Surface Flood', lang)}</option>
                  <option value="Sprinkler">{translateText('Overhead Sprinkler System', lang)}</option>
                  <option value="Open Well">{translateText('Open Agri Well', lang)}</option>
                  <option value="Rainfed">{translateText('Rainfed / Monsoon Dependant', lang)}</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{pt.cultivationMethodology || translateText('Cultivation Methodology', lang)}</label>
                <select
                  value={farmingMethod}
                  onChange={(e) => setFarmingMethod(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none bg-white cursor-pointer"
                >
                  <option value="Organic / Natural">{translateText('Certified Organic / Natural Farming', lang)}</option>
                  <option value="Zero Budget Natural Farming (ZBNF)">{translateText('Zero Budget Natural Farming', lang)}</option>
                  <option value="Conventional / Integrated">{translateText('Integrated Pest Management & Conventional', lang)}</option>
                  <option value="Hydroponic">{translateText('Protected Greenhouse / Hydroponic', lang)}</option>
                </select>
              </div>
            </div>

            {/* Major Crops Selection Chips */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {pt.majorCrops || translateText('Major Crops Grown', lang)}
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_CROPS.map((crop) => {
                  const isSelected = primaryCrops.includes(crop);
                  return (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => handleToggleCrop(crop)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-xs font-bold border border-emerald-600'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{translateText(crop, lang)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Livestock Holdings */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {pt.livestock || translateText('Livestock & Animal Husbandry', lang)}
              </label>
              <div className="flex flex-wrap gap-2">
                {LIVESTOCK_OPTIONS.map((item) => {
                  const isSelected = livestock.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleToggleLivestock(item)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-xs font-bold border border-amber-600'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{translateText(item, lang)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Farm Machinery */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {pt.farmMachinery || translateText('Farm Machinery & Implements', lang)}
              </label>
              <div className="flex flex-wrap gap-2">
                {MACHINERY_OPTIONS.map((item) => {
                  const isSelected = machinery.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleToggleMachinery(item)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-sky-600 text-white shadow-xs font-bold border border-sky-600'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{translateText(item, lang)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: WELFARE SCHEMES & BANK ================= */}
        {activeTab === 'schemes' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-100 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900">{pt.welfareBankTitle || translateText('Government Welfare Schemes & Banking Verification', lang)}</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {pt.welfareBankSub || translateText('Link your PM-KISAN, Kisan Credit Card, crop insurance policy, and DBT direct benefit bank credentials.', lang)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.pmKisanId || translateText('PM-KISAN Samman Nidhi ID', lang)}
                </label>
                <div className="relative">
                  <Award className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={pmKisanBeneficiaryId}
                    onChange={(e) => setPmKisanBeneficiaryId(e.target.value)}
                    placeholder="PMK-2026-994821"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-mono font-bold text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.cropInsurance || translateText('Crop Insurance Policy (PMFBY)', lang)}
                </label>
                <div className="relative">
                  <FileCheck className="w-4 h-4 text-sky-600 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={cropInsurancePolicyNumber}
                    onChange={(e) => setCropInsurancePolicyNumber(e.target.value)}
                    placeholder="PMFBY-TN-8874129"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-mono font-bold text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.kccCardHolder || translateText('Kisan Credit Card (KCC) Holder?', lang)}
                </label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="kcc"
                      checked={kisanCreditCardHolder === true}
                      onChange={() => setKisanCreditCardHolder(true)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{translateText('Yes, Active KCC Holder', lang)}</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="kcc"
                      checked={kisanCreditCardHolder === false}
                      onChange={() => setKisanCreditCardHolder(false)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{translateText('No / Not Applied', lang)}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.dbtBankName || translateText('Direct Benefit Bank Name', lang)}
                </label>
                <div className="relative">
                  <Landmark className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g. State Bank of India / Indian Bank"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.bankAccountNo || translateText('Bank Account Number (Masked)', lang)}
                </label>
                <input
                  type="text"
                  value={accountNumberMasked}
                  onChange={(e) => setAccountNumberMasked(e.target.value)}
                  placeholder="XXXX-XXXX-8921"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-mono font-semibold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.ifscCode || translateText('Bank Branch IFSC Code', lang)}
                </label>
                <input
                  type="text"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  placeholder="SBIN0001234"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-mono font-bold text-slate-900 outline-none uppercase"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: ADVISORY & ALERTS ================= */}
        {activeTab === 'alerts' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-100 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900">{pt.advisoryTitle || translateText('Communication & Agronomic Advisory Preferences', lang)}</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {pt.advisorySub || translateText('Customize advisory delivery channels, emergency contacts, and multilingual voice settings.', lang)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.preferredLanguage || translateText('Preferred Advisory Language', lang)}
                </label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none bg-white cursor-pointer"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.nativeName} ({l.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {pt.emergencyContact || translateText('Emergency Field Contact Number', lang)}
                </label>
                <input
                  type="tel"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{pt.smsWeatherAlerts || translateText('Daily Weather & Rain Forecast via SMS', lang)}</h4>
                    <p className="text-[11px] text-slate-500">{pt.smsWeatherDesc || translateText('Receive morning precipitation and wind speed warnings.', lang)}</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={weatherSmsAlerts}
                  onChange={(e) => setWeatherSmsAlerts(e.target.checked)}
                  className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-100 text-rose-800">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{pt.pestAlerts || translateText('Pest & Fungal Outbreak Warnings', lang)}</h4>
                    <p className="text-[11px] text-slate-500">{pt.pestAlertsDesc || translateText('Regional crop disease alerts in your district.', lang)}</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={pestOutbreakAlerts}
                  onChange={(e) => setPestOutbreakAlerts(e.target.checked)}
                  className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{pt.voiceReadout || translateText('AgriVoice AI Audio Readout Enabled', lang)}</h4>
                    <p className="text-[11px] text-slate-500">{pt.voiceReadoutDesc || translateText('Auto-speak agronomic solutions using native voice synthesis.', lang)}</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={voiceAdvisoryEnabled}
                  onChange={(e) => setVoiceAdvisoryEnabled(e.target.checked)}
                  className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: DIGITAL SMART ID CARD ================= */}
        {activeTab === 'idcard' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Printable Pass Card Container */}
            <div className="flex flex-col items-center justify-center p-4 sm:p-8">
              <div
                ref={printRef}
                className="w-full max-w-md rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-6 sm:p-7 border-2 border-emerald-500/30 text-white shadow-2xl relative overflow-hidden"
              >
                {/* Decorative Hologram Foil Header */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl" />

                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white p-0.5 flex items-center justify-center overflow-hidden">
                      <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black tracking-tight text-white leading-none">AGRO UZHAVAN</h3>
                      <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5">{pt.smartPassTitle || translateText('Farmer Smart Pass', lang)}</p>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[9px] font-extrabold uppercase">
                    {pt.govApproved || translateText('KYC Verified', lang)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-18 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 p-0.5 shrink-0 shadow-md">
                    <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-xl font-black text-emerald-300">
                      {name ? name.substring(0, 2).toUpperCase() : 'AU'}
                    </div>
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <h4 className="text-base font-black text-white truncate">{getLocalizedUserName(name, lang) || translateText('Farmer Member', lang)}</h4>
                    <p className="text-[11px] text-emerald-300 font-bold">{translateText(role, lang)} · {totalLandAcres} {pt.acres}</p>
                    <p className="text-[10px] text-slate-400 truncate">{village}, {district}, {translateText(state, lang)}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{translateText('Primary Mobile Number', lang)}: {phone || '+91 98765 43210'}</p>
                  </div>
                </div>

                {/* Key Badges Matrix */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/20 text-[10px] mb-5">
                  <div>
                    <span className="text-slate-400 block">{translateText('Kisan ID:', lang)}</span>
                    <strong className="text-emerald-300 font-mono">{farmerId}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{translateText('Soil Type:', lang)}</span>
                    <strong className="text-slate-200">{translateText(soilType, lang)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{translateText('PM-KISAN Status:', lang)}</span>
                    <strong className="text-teal-300 font-mono">{translateText('Linked', lang)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{translateText('Crop Scheme:', lang)}</span>
                    <strong className="text-slate-200">{translateText('PMFBY Insured', lang)}</strong>
                  </div>
                </div>

                {/* Footer with QR Code */}
                <div className="flex items-center justify-between border-t border-emerald-500/20 pt-4 text-[10px] text-slate-400">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500">{translateText('Authorized Digital Pass', lang)}</span>
                    <span className="text-emerald-400 font-mono">{translateText('Valid thru 2028', lang)}</span>
                  </div>
                  <div className="p-1 rounded-xl bg-white text-slate-950 shadow-sm">
                    <QrCode className="w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>

            {/* Print & Download Triggers */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePrintIdCard}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>{pt.printSmartPass || translateText('Print Digital Farmer ID', lang)}</span>
              </button>

              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{pt.saveProfile || translateText('Save All Details', lang)}</span>
              </button>
            </div>
          </div>
        )}

        {/* Global Save Button Banner for all form tabs */}
        {activeTab !== 'idcard' && (
          <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>{translateText('All updates are synchronized across your active farm and AI recommendations.', lang)}</span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{pt.saveProfile || translateText('Save Farmer Profile', lang)}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
