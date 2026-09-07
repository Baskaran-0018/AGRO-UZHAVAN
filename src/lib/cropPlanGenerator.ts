import { CropRecord, FarmProfile, CropManagementPlan, GrowthStage } from '../types/agro';
import { CROPS_CATALOG } from '../data/cropsData';
import { SupportedLang } from './i18n';
import { getLocalizedCropName, getLocalizedGrowthStage, getLocalizedSoilType, getLocalizedIrrigation, translateText } from './universalTranslator';

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
  const localizedSoil = getLocalizedSoilType(farm?.soilType || 'Loamy', lang);
  const localizedIrrigation = getLocalizedIrrigation(farm?.irrigationType || 'Drip', lang);

  // Localized template dictionaries
  const MORNING_SCOUT_MAP: Record<SupportedLang, { task: string; rationale: string }> = {
    ta: {
      task: `${localizedCrop} பயிருக்கான இலை ஈரப்பதம் மற்றும் வேர் மண்டல ஆய்வு`,
      rationale: 'அதிகாலை களப்பார்வை பனி ஈரப்பத நோய்த்தொற்றுகளைத் தடுத்து மண் ஈரப்பதம் மற்றும் வேர் வளர்ச்சியை உறுதி செய்கிறது.'
    },
    hi: {
      task: `${localizedCrop} के लिए पत्तियों की नमी एवं जड़ क्षेत्र का निरीक्षण`,
      rationale: 'सुबह का खेत निरीक्षण ओस जनित फफूंद संक्रमण को रोकता है और मिट्टी की नमी को मापता है।'
    },
    te: {
      task: `${localizedCrop} కోసం ఆకుల తేమ మరియు వేరు మండలం తనిఖీ`,
      rationale: 'ఉదయాన్నే పరిశీలన చేయడం వల్ల మంచు ద్వారా వచ్చే శిలీంధ్ర వ్యాధులను అరికట్టవచ్చు మరియు నేల తేమను అంచనా వేయవచ్చు.'
    },
    kn: {
      task: `${localizedCrop} ಬೆಳೆಗಾಗಿ ಎಲೆಗಳ ತೇವಾಂಶ ಮತ್ತು ಬೇರು ವಲಯ ತಪಾಸಣೆ`,
      rationale: 'ಮುಂಜಾನೆಯ ಪರಿಶೀಲನೆಯು ಇಬ್ಬನಿಯಿಂದ ಉಂಟಾಗುವ ಶಿಲೀಂಧ್ರ ರೋಗಗಳನ್ನು ತಡೆಯುತ್ತದೆ ಮತ್ತು ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪರೀಕ್ಷಿಸುತ್ತದೆ.'
    },
    mr: {
      task: `${localizedCrop} पिकासाठी पानांमधील ओलावा आणि मूळ क्षेत्राची पाहणी`,
      rationale: 'सकाळच्या वेळी शेताची पाहणी केल्याने दवबिंदूंमुळे होणारे बुरशीजन्य रोग टळतात आणि जमिनीतील ओलावा समजतो.'
    },
    bn: {
      task: `${localizedCrop} ফসলের পাতার আর্দ্রতা ও শিকড় অঞ্চল পরিদর্শন`,
      rationale: 'সকালের মাঠ পরিদর্শন শিশিরজনিত ছত্রাক সংক্রমণ রোধ করে এবং মাটির আর্দ্রতা নিশ্চিত করে।'
    },
    gu: {
      task: `${localizedCrop} પાક માટે પાંદડાંનો ભેજ અને મૂળ વિસ્તારનું નિરીક્ષણ`,
      rationale: 'સવારનું નિરીક્ષણ ઝાકળથી ફેલાતા ફૂગના રોગોને અટકાવે છે અને જમીનમાં ભેજનું પ્રમાણ તપાસે છે.'
    },
    pa: {
      task: `${localizedCrop} ਫਸਲ ਲਈ ਪੱਤਿਆਂ ਦੀ ਨਮੀ ਅਤੇ ਜੜ੍ਹ ਖੇਤਰ ਦੀ ਜਾਂਚ`,
      rationale: 'ਸਵੇਰ ਵੇਲੇ ਖੇਤ ਦਾ ਮੁਆਇਨਾ ਤਰੇਲ ਕਾਰਨ ਹੋਣ ਵਾਲੀਆਂ ਉੱਲੀ ਬਿਮਾਰੀਆਂ ਨੂੰ ਰੋਕਦਾ ਹੈ ਅਤੇ ਮਿੱਟੀ ਦੀ ਨਮੀ ਦੀ ਜਾਂਚ ਕਰਦਾ ਹੈ।'
    },
    en: {
      task: `Canopy moisture & root zone inspection for ${localizedCrop}`,
      rationale: 'Early morning scouting prevents dew-induced spore propagation and checks soil moisture tensiometer reading.'
    }
  };

  const MORNING_FERT_MAP: Record<SupportedLang, { task: string; rationale: string }> = {
    ta: {
      task: `பயிர் வளர்ச்சி நிலைக்கேற்ற நீர்ப்பாசன உரமிடுதல் (19:19:19 + நுண்சத்து கரைசல்)`,
      rationale: 'காலை சூரிய ஒளியில் இலைத்துளைகள் முழுமையாகத் திறந்து ஊட்டச்சத்துக்களை வேகமாக உறிஞ்சுகின்றன.'
    },
    hi: {
      task: `फसल वृद्धि चरण के अनुसार फर्टिगेशन एवं पोषक तत्व खुराक (19:19:19 + सूक्ष्म पोषक तत्व)`,
      rationale: 'सुबह की धूप में पौधों में वाष्पोत्सर्जन खिंचाव अधिकतम होता है, जिससे पोषक तत्वों का अवशोषण तेज होता है।'
    },
    te: {
      task: `పంట దశకు తగిన ఫెర్టిగేషన్ మరియు పోషకాల మోతాదు (19:19:19 + సూక్ష్మ పోషకాలు)`,
      rationale: 'ఉదయం ఎండలో మొక్కల పోషక శోషణ సామర్థ్యం గరిష్టంగా ఉండి వేగంగా ఎదుగుతాయి.'
    },
    kn: {
      task: `ಬೆಳವಣಿಗೆಯ ಹಂತಕ್ಕೆ ತಕ್ಕಂತೆ ಫಲವತ್ತತೆ ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಪೂರೈಕೆ (19:19:19 + ಲಘು ಪೋಷಕಾಂಶಗಳು)`,
      rationale: 'ಬೆಳಗಿನ ಬಿಸಿಲಿನಲ್ಲಿ ಸಸ್ಯಗಳು ಪೋಷಕಾಂಶಗಳನ್ನು ವೇಗವಾಗಿ ಹೀರಿಕೊಳ್ಳುತ್ತವೆ.'
    },
    mr: {
      task: `वाढीच्या टप्प्यानुसार ठिबक खत व्यवस्थापन (19:19:19 + सूक्ष्म अन्नद्रव्ये)`,
      rationale: 'सकाळच्या कोवळ्या उन्हात वनस्पतींमध्ये अन्नद्रव्ये शोषून घेण्याची क्षमता सर्वाधिक असते.'
    },
    bn: {
      task: `বৃদ্ধির ধাপ অনুযায়ী ফার্টিগেশন ও পুষ্টি প্রয়োগ (19:19:19 + অণুপুষ্টি)`,
      rationale: 'সকালের সূর্যের আলোতে উদ্ভিদের পুষ্টি শোষণ ক্ষমতা সর্বাধিক বৃদ্ধি পায়।'
    },
    gu: {
      task: `વૃદ્ધિ તબક્કા અનુસાર ફર્ટિગેશન અને પોષક તત્વોનો ડોઝ (19:19:19 + સૂક્ષ્મ પોષક તત્વો)`,
      rationale: 'સવારના સૂર્યપ્રકાશમાં છોડમાં પોષક તત્વો ઝડપથી શોષાય છે.'
    },
    pa: {
      task: `ਵਾਧੇ ਦੇ ਪੜਾਅ ਅਨੁਸਾਰ ਫਰਟੀਗੇਸ਼ਨ ਅਤੇ ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਖੁਰਾਕ (19:19:19 + ਸੂਖਮ ਤੱਤ)`,
      rationale: 'ਸਵੇਰ ਦੀ ਧੁੱਪ ਵਿੱਚ ਪੌਦੇ ਪੋਸ਼ਕ ਤੱਤਾਂ ਨੂੰ ਤੇਜ਼ੀ ਨਾਲ ਜਜ਼ਬ ਕਰਦੇ ਹਨ।'
    },
    en: {
      task: 'Fertigation & stage-wise nutrient dosing (19:19:19 + Micronutrients)',
      rationale: 'Optimal transpiration suction occurs during morning sun exposure, promoting maximum nutrient absorption.'
    }
  };

  const AFTERNOON_MAP: Record<SupportedLang, { task: string; rationale: string }> = {
    ta: {
      task: 'வெப்ப அழுத்தக் கண்காணிப்பு, இலை வாடல் தடுப்பு மற்றும் தெளிப்பான் பராமரிப்பு',
      rationale: 'நண்பகல் அதிக வெப்பத்தால் ஏற்படும் நீர் இழப்பைத் தடுத்து பயிர் வாடாமல் பாதுகாக்க உதவுகிறது.'
    },
    hi: {
      task: 'गर्मी के तनाव की निगरानी, पत्तियों के मुरझाने की रोकथाम और सूक्ष्म फुहार जांच',
      rationale: 'दोपहर की तेज धूप में वाष्पीकरण तनाव से फसलों को बचाने के लिए नमी संतुलन आवश्यक है।'
    },
    te: {
      task: 'ఎండ తీవ్రత పర్యవేక్షణ, ఆకుల వాడిపోవడం నివారణ మరియు సూక్ష్మ తుంపరల పరిశీలన',
      rationale: 'మధ్యాహ్నపు ఎండలో మొక్కలు వాడిపోకుండా నేల తేమను సమతుల్యంగా ఉంచాలి.'
    },
    kn: {
      task: 'ಶಾಖದ ಒತ್ತಡ ಮೇಲ್ವಿಚಾರಣೆ, ಎಲೆ ಬಾಡುವಿಕೆ ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ಸಿಂಪಡಕಗಳ ತಪಾಸಣೆ',
      rationale: 'ಮಧ್ಯಾಹ್ನದ ತೀವ್ರ ಬಿಸಿಲಿನಿಂದ ಬೆಳೆಗಳು ಬಾಡದಂತೆ ತೇವಾಂಶ ನಿರ್ವಹಣೆ ಮುಖ್ಯ.'
    },
    mr: {
      task: 'उष्णतेच्या ताणाची पाहणी, पाने कोमेजणे रोखणे आणि सूक्ष्म तुषार फवारणी',
      rationale: 'दुपारच्या तीव्र उन्हामुळे पिकांचे होणारे पाण्याचे नुकसान टाळण्यासाठी निरीक्षण आवश्यक आहे.'
    },
    bn: {
      task: 'তাপের চাপ পর্যবেক্ষণ, পাতা শুকিয়ে যাওয়া প্রতিরোধ এবং স্প্রিংকলার পরীক্ষা',
      rationale: 'দুপুরের অতিরিক্ত উত্তাপে ফসলের জলীয় ঘাটতি রোধ করতে সজাগ দৃষ্টি রাখা দরকার।'
    },
    gu: {
      task: 'ગરમીના તણાવનું નિરીક્ષણ, પાંદડા કરમાતા અટકાવવા અને માઇક્રો-સ્પ્રિંકલર ચકાસણી',
      rationale: 'બપોરના તડકામાં પાકને સુકાતો બચાવવા માટે યોગ્ય ભેજ જાળવવો જરૂરી છે.'
    },
    pa: {
      task: 'ਗਰਮੀ ਦੇ ਦਬਾਅ ਦੀ ਨਿਗਰਾਨੀ, ਪੱਤਿਆਂ ਦਾ ਮੁਰਝਾਉਣਾ ਰੋਕਣਾ ਅਤੇ ਮਾਈਕ੍ਰੋ-ਸਪ੍ਰਿੰਕਲਰ ਚੈੱਕ ਕਰਨਾ',
      rationale: 'ਦੁਪਹਿਰ ਦੀ ਤੇਜ਼ ਧੁੱਪ ਵਿੱਚ ਪਾਣੀ ਦੀ ਕਮੀ ਕਾਰਨ ਫਸਲ ਨੂੰ ਨੁਕਸਾਨ ਤੋਂ ਬਚਾਉਣਾ ਜ਼ਰੂਰੀ ਹੈ।'
    },
    en: {
      task: 'Monitor heat stress, leaf wilting, and micro-sprinkler misting',
      rationale: 'High VPD mid-day hours require careful observation to avoid permanent wilting point.'
    }
  };

  const EVENING_SPRAY_MAP: Record<SupportedLang, { task: string; rationale: string }> = {
    ta: {
      task: `பூச்சி & நோய் தடுப்புக்கான இயற்கை வேப்பெண்ணெய் கரைசல் (10,000 ppm) தெளித்தல்`,
      rationale: 'மாலை நேர தெளிப்பு நன்மை செய்யும் மகரந்தச் சேர்க்கை பூச்சிகளைப் பாதுகாத்து மருந்தின் செயல்திறனை கூட்டுகிறது.'
    },
    hi: {
      task: `कीट एवं रोग रोकथाम हेतु प्राकृतिक नीम तेल घोल (10,000 ppm) का छिड़काव`,
      rationale: 'शाम का छिड़काव मित्र कीटों की रक्षा करता है और दवा का प्रभाव लंबे समय तक बनाए रखता है।'
    },
    te: {
      task: `కీటకాలు & తెగుళ్ల నివారణకు సహజ వేప నూనె ద్రావణం (10,000 ppm) పిచికారీ`,
      rationale: 'సాయంత్రం వేళ పిచికారీ చేయడం వల్ల మిత్ర పురుగులకు హాని కలగదు మరియు మందు ప్రభావం పెరుగుతుంది.'
    },
    kn: {
      task: `ಕೀಟ & ರೋಗ ನಿಯಂತ್ರಣಕ್ಕಾಗಿ ನೈಸರ್ಗಿಕ ಬೇವಿನ ಎಣ್ಣೆ ದ್ರಾವಣ (10,000 ppm) ಸಿಂಪರಣೆ`,
      rationale: 'ಸಂಜೆಯ ಸಿಂಪರಣೆಯು ಉಪಯುಕ್ತ ಪರಾಗಸ್ಪರ್ಶಕ ಕೀಟಗಳನ್ನು ರಕ್ಷಿಸುತ್ತದೆ ಮತ್ತು ಔಷಧಿಯ ದಕ್ಷತೆಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.'
    },
    mr: {
      task: `कीड व रोग संरक्षणासाठी सेंद्रिय कडुनिंब तेल अर्क (10,000 ppm) फवारणी`,
      rationale: 'संध्याकाळची फवारणी मित्र कीटकांना सुरक्षित ठेवते आणि औषधाचा प्रभाव दीर्घकाळ टिकवून ठेवते.'
    },
    bn: {
      task: `কীটপতঙ্গ ও রোগ প্রতিরোধের জন্য প্রাকৃতিক নিম তেল স্প্রে (10,000 ppm)`,
      rationale: 'সন্ধ্যায় স্প্রে করলে উপকারী পরাগায়নকারী কীট সুরক্ষিত থাকে এবং ওষুধের কার্যকারিতা বাড়ে।'
    },
    gu: {
      task: `જીવાત અને રોગ નિયંત્રણ માટે કુદરતી લીમડાના તેલનો અર્ક (10,000 ppm) છંટકાવ`,
      rationale: 'સાંજનો છંટકાવ મિત્ર જીવાતોનું રક્ષણ કરે છે અને દવાની અસરકારકતા વધારે છે.'
    },
    pa: {
      task: `ਕੀੜੇ-ਮਕੌੜੇ ਅਤੇ ਬਿਮਾਰੀਆਂ ਦੀ ਰੋਕਥਾਮ ਲਈ ਕੁਦਰਤੀ ਨਿੰਮ ਤੇਲ ਘੋਲ (10,000 ppm) ਦਾ ਛਿੜਕਾਅ`,
      rationale: 'ਸ਼ਾਮ ਵੇਲੇ ਛਿੜਕਾਅ ਮਿੱਤਰ ਕੀੜਿਆਂ ਨੂੰ ਬਚਾਉਂਦਾ ਹੈ ਅਤੇ ਦਵਾਈ ਦਾ ਅਸਰ ਵਧਾਉਂਦਾ ਹੈ।'
    },
    en: {
      task: `Targeted bio-protection / neem oil prophylactic spray (10,000 ppm @ 2 ml/L)`,
      rationale: 'Evening foliar application protects beneficial pollinators and allows prolonged leaf wetness without UV degradation.'
    }
  };

  const EVENING_LOG_MAP: Record<SupportedLang, { task: string; rationale: string }> = {
    ta: {
      task: 'தினசரி நீர் வெளியேற்ற அளவு மற்றும் பூச்சிப் பொறிப் பதிவேடு பராமரிப்பு',
      rationale: 'துல்லியமான பண்ணைப் பதிவேடு பூச்சித் தாக்குதல் பொருளாதார சேத நிலையைத் தாண்டுவதை முன்கூட்டியே எச்சரிக்கிறது.'
    },
    hi: {
      task: 'दैनिक जल निकासी मीटर रीडिंग और कीट जाल (फेरोमोन ट्रैप) रिकॉर्ड संधारण',
      rationale: 'सटीक कृषि रिकॉर्ड कीटों के आर्थिक नुकसान स्तर (ETL) पार करने पर समय पर चेतावनी देता है।'
    },
    te: {
      task: 'రోజువారీ నీటి వినియోగం మరియు కీటకాల ఉచ్చుల (ఫెరమోన్ ట్రాప్స్) గణన నమోదు',
      rationale: 'ఖచ్చితమైన వ్యవసాయ రికార్డులు తెగుళ్ల తీవ్రతను ముందస్తుగా హెచ్చరించడానికి సహాయపడతాయి.'
    },
    kn: {
      task: 'ದೈನಂದಿನ ನೀರಿನ ಬಳಕೆ ಮತ್ತು ಕೀಟ ಬಲೆಗಳ (ಫೆರೋಮೋನ್ ಟ್ರ್ಯಾಪ್) ದಾಖಲಾತಿ',
      rationale: 'ನಿಖರವಾದ ಕೃಷಿ ದಾಖಲಾತಿಯು ಕೀಟಗಳ ಹಾನಿಕಾರಕ ಮಟ್ಟವನ್ನು ಮುಂಚಿತವಾಗಿ ಎಚ್ಚರಿಸುತ್ತದೆ.'
    },
    mr: {
      task: 'दैनिक पाणी वापर मीटर वाचन आणि कीड सापळा (फेरोमोन ट्रॅप) नोंद ठेवणे',
      rationale: 'अचूक शेती नोंदींमुळे किडींची आर्थिक नुकसान मर्यादा ओળखणे सोपे होते.'
    },
    bn: {
      task: 'দৈনিক জলের ব্যবহার এবং পোকা ফাঁদ (ফেরোমোন ট্র্যাপ) গণনা রেকর্ড রাখা',
      rationale: 'সঠিক খামার রেকর্ড ক্ষতিকর কীট আক্রমণের আগাম সতর্কতা প্রদানে সহায়তা করে।'
    },
    gu: {
      task: 'દૈનિક પાણી વપરાશ અને જીવાત ટ્રેપ (ફેરોમોન ટ્રેપ) ગણતરીની નોંધણી',
      rationale: 'ચોક્કસ ખેતી રેકોર્ડ જીવાતોના નુકસાનના સ્તરની અગાઉથી ચેતવણી આપે છે.'
    },
    pa: {
      task: 'ਰੋਜ਼ਾਨਾ ਪਾਣੀ ਦੀ ਖਪਤ ਅਤੇ ਕੀੜੇ ਫੜਨ ਵਾਲੇ ਜਾਲ (ਫੇਰੋਮੋਨ ਟਰੈਪ) ਦਾ ਰਿਕਾਰਡ ਰੱਖਣਾ',
      rationale: 'ਸਹੀ ਖੇਤੀ ਰਿਕਾਰਡ ਕੀੜਿਆਂ ਦੇ ਹਮਲੇ ਦੀ ਅਗਾਊਂ ਚੇਤਾਵਨੀ ਦੇਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।'
    },
    en: {
      task: 'Record daily water meter discharge and log pest trap counts',
      rationale: 'Maintains farm audit trail and triggers early warning if insect threshold exceeds ETL.'
    }
  };

  const WEEKLY_TASKS_MAP: Record<SupportedLang, { day: string; task: string; category: string }[]> = {
    ta: [
      { day: 'திங்கள்', task: 'சொட்டுநீர்க் குழாய்களைச் சுற்றியுள்ள களைகளை அகற்றுதல் மற்றும் மண் இளக்குதல்', category: 'மண் வளம்' },
      { day: 'புதன்', task: 'இலைவழி நுண்ணூட்டச்சத்து தெளிப்பு (துத்தநாகம் + போரான் + மெக்னீசியம்)', category: 'பயிர் ஊட்டச்சத்து' },
      { day: 'வெள்ளி', task: 'சொட்டுநீர்ப் பாசன வடிப்பான்களை (Filters) கழுவி நீர் விநியோகத்தைச் சரிபார்த்தல்', category: 'பாசனம்' },
      { day: 'ஞாயிறு', task: 'வாராந்திர பயிர் வளர்ச்சி வீரியம் மற்றும் கணுக்கள் எண்ணிக்கை தணிக்கை', category: 'பண்ணை தணிக்கை' }
    ],
    hi: [
      { day: 'सोमवार', task: 'ड्रिप लाइनों के पास खरपतवार नियंत्रण एवं मिट्टी की गुड़ाई', category: 'मृदा स्वास्थ्य' },
      { day: 'बुधवार', task: 'पत्तियों पर सूक्ष्म पोषक तत्व छिड़काव (जिंक + बोरॉन + मैग्नीशियम)', category: 'पोषण प्रबंधन' },
      { day: 'शुक्रवार', task: 'ड्रिप फिल्टर की सफाई और समान जल प्रवाह की जांच', category: 'सिंचाई' },
      { day: 'रविवार', task: 'साप्ताहिक फसल बढ़वार और शाखाओं की संख्या का मूल्यांकन', category: 'कृषि ऑडिट' }
    ],
    te: [
      { day: 'సోమవారం', task: 'డ్రిప్ పైపుల వద్ద కలుపు తీయడం మరియు నేల వదులు చేయడం', category: 'నేల ఆరోగ్యం' },
      { day: 'బుధవారం', task: 'ఆకులపై సూక్ష్మ పోషకాల పిచికారీ (జింక్ + బోరాన్ + మెగ్నీషియం)', category: 'పోషణ' },
      { day: 'శుక్రవారం', task: 'డ్రిప్ ఫిల్టర్లను శుభ్రం చేయడం మరియు నీటి పంపిణీని పరీక్షించడం', category: 'నీటిపారుదల' },
      { day: 'ఆదివారం', task: 'వారపు పంట పెరుగుదల మరియు కొమ్మల సంఖ్య పరిశీలన', category: 'వ్యవసాయ ఆడిట్' }
    ],
    kn: [
      { day: 'ಸೋಮವಾರ', task: 'ಹನಿ ನೀರಾವರಿ ಪೈಪ್‌ಗಳ ಸುತ್ತಲಿನ ಕಳೆ ಕೀಳುವುದು ಮತ್ತು ಮಣ್ಣು ಸಡಿಲಗೊಳಿಸುವುದು', category: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ' },
      { day: 'ಬುಧವಾರ', task: 'ಲಘು ಪೋಷಕಾಂಶಗಳ ಸಿಂಪರಣೆ (ಸತು + ಬೋರಾನ್ + ಮೆಗ್ನೀಸಿಯಮ್)', category: 'ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ' },
      { day: 'ಶುಕ್ರವಾರ', task: 'ಹನಿ ನೀರಾವರಿ ಫಿಲ್ಟರ್‌ಗಳ ಶುಚಿಗೊಳಿಸುವಿಕೆ ಮತ್ತು ನೀರಿನ ಹರಿವು ಪರಿಶೀಲನೆ', category: 'ನೀರಾವರಿ' },
      { day: 'ಭಾನುವಾರ', task: 'ವಾರದ ಬೆಳೆ ಬೆಳವಣಿಗೆ ಮತ್ತು ಕವಲುಗಳ ಎಣಿಕೆ ಆಡಿಟ್', category: 'ಕೃಷಿ ಪರಿಶೀಲನೆ' }
    ],
    mr: [
      { day: 'सोमवार', task: 'ठिबक नळ्यांजवळील तण नियंत्रण आणि जमिनीची खांदणी', category: 'मृदा आरोग्य' },
      { day: 'बुधवार', task: 'पानांवर सूक्ष्म अन्नद्रव्य फवारणी (झिंक + बोरॉन + मॅग्नेशियम)', category: 'पोषण' },
      { day: 'शुक्रवार', task: 'ठिबक सिंचन फिल्टर साफ करणे आणि पाण्याच्या दाबाची तपासणी', category: 'सिंचन' },
      { day: 'रविवार', task: 'साप्ताहिक पीक वाढ आणि फुटव्यांची संख्या तपासणे', category: 'कृषी ऑडिट' }
    ],
    bn: [
      { day: 'সোমবার', task: 'ড্রিপ লাইনের পাশে আগাছা পরিষ্কার ও মাটি আলগা করা', category: 'মাটির স্বাস্থ্য' },
      { day: 'বুধবার', task: 'পাতায় অণুপুষ্টি স্প্রে (জিঙ্ক + বোরন + ম্যাগনেসিয়াম)', category: 'পুষ্টি ব্যবস্থাপনা' },
      { day: 'শুক্রবার', task: 'ড্রিপ ফিল্টার পরিষ্কার এবং জল নির্গমন সমতা পরীক্ষা', category: 'সেচ' },
      { day: 'রবিবার', task: 'সাপ্তাহিক ফসলের বৃদ্ধি এবং কুশির সংখ্যা নিরীক্ষণ', category: 'খামার অডিট' }
    ],
    gu: { day: 'સોમવાર', task: 'ડ્રિપ લાઇન પાસે નીંદણ દૂર કરવું અને જમીનની ગોડ કરવી', category: 'જમીન સ્વાસ્થ્ય' },
    pa: { day: 'ਸੋਮਵਾਰ', task: 'ਡ੍ਰਿਪ ਲਾਈਨਾਂ ਦੇ ਨੇੜੇ ਨਦੀਨਾਂ ਦੀ ਰੋਕਥਾਮ ਅਤੇ ਗੋਡੀ ਕਰਨਾ', category: 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ' },
    en: [
      { day: 'Monday', task: 'Sub-surface soil compaction and weed removal along drip lines', category: 'Soil Health' },
      { day: 'Wednesday', task: 'Foliar micronutrient booster spray (Zinc + Boron + Magnesium)', category: 'Nutrition' },
      { day: 'Friday', task: 'Flush sub-main drip filters and check emitter discharge uniformity', category: 'Irrigation' },
      { day: 'Sunday', task: 'Weekly growth vigor measurement and crown node counting', category: 'Agronomy Audit' }
    ]
  };

  const MONTHLY_MILESTONES_MAP: Record<SupportedLang, { weekNum: number; milestone: string; focus: string }[]> = {
    ta: [
      { weekNum: 1, milestone: `கட்டம் 1: ${localizedStage} நிலை நிறுவுதல்`, focus: 'ஆழமான வேர் பதித்தல் மற்றும் இலைகளின் எண்ணிக்கை அதிகரிப்பு' },
      { weekNum: 2, milestone: 'கட்டம் 2: தீவிர கிளைத்தல் மற்றும் பயிர் வளர்ச்சி', focus: 'தழைச்சத்து மற்றும் கரிம ஊட்டச்சத்துக்கள் மூலம் பயிர் தடிமன் கூட்டுதல்' },
      { weekNum: 3, milestone: 'கட்டம் 3: பூக்கும் பருவம் மற்றும் காய்/தானிய உருவாக்கம்', focus: 'பூ உதிர்வதைத் தடுத்து மணி/காய் பிடிப்பை அதிகரிக்க மணிச்சத்து & சாம்பல் சத்து அளித்தல்' },
      { weekNum: 4, milestone: 'கட்டம் 4: அறுவடைக்கு முந்தைய முதிர்ச்சி & தரம் மேம்பாடு', focus: 'நீர் அளவைக் குறைத்து தரமான திரட்சியான மகசூல் பெறுதல்' }
    ],
    hi: [
      { weekNum: 1, milestone: `चरण 1: ${localizedStage} स्थापना`, focus: 'जड़ों की मजबूती और शुरुआती पत्तियों की संख्या में वृद्धि' },
      { weekNum: 2, milestone: 'चरण 2: कल्ले फूटना और वनस्पति द्रव्यमान विस्तार', focus: 'नाइट्रोजन और जैविक कार्बन द्वारा पौधों का सशक्त विकास' },
      { weekNum: 3, milestone: 'चरण 3: फूल आना एवं फल/दाने का विकास', focus: 'फूलों को झड़ने से रोकने और दाना भराव हेतु फास्फोरस व पोटाश' },
      { weekNum: 4, milestone: 'चरण 4: फसल परिपक्वता एवं गुणवत्ता सुधार', focus: 'पानी की मात्रा कम करना और दानों का ठोस भराव' }
    ],
    te: [
      { weekNum: 1, milestone: `దశ 1: ${localizedStage} స్థిరీకరణ`, focus: 'వేర్ల బలం మరియు ఆకుల సంఖ్య పెంపు' },
      { weekNum: 2, milestone: 'దశ 2: పిలకల విస్తరణ మరియు మొక్కల పెరుగుదల', focus: 'నత్రజని మరియు సేంద్రీయ పోషకాలతో మొక్కల వేగవంతమైన వృద్ధి' },
      { weekNum: 3, milestone: 'దశ 3: పూత మరియు కాయ/గింజల అభివృద్ధి', focus: 'పూత రాలకుండా ఉండేందుకు భాస్వరం మరియు పొటాష్ అందించడం' },
      { weekNum: 4, milestone: 'దశ 4: పంట పరిపక్వత మరియు దిగుబడి నాణ్యత', focus: 'నీటి పరిమాణాన్ని తగ్గించి నాణ్యమైన దిగుబడిని పొందడం' }
    ],
    kn: [
      { weekNum: 1, milestone: `ಹಂತ 1: ${localizedStage} ಸ್ಥಾಪನೆ`, focus: 'ಬೇರುಗಳ ಬಲವರ್ಧನೆ ಮತ್ತು ಎಲೆಗಳ ಸಂಖ್ಯೆ ಹೆಚ್ಚಳ' },
      { weekNum: 2, milestone: 'ಹಂತ 2: ಕವಲುಗಳ ವಿಸ್ತರಣೆ ಮತ್ತು ದೃಢ ಬೆಳವಣಿಗೆ', focus: 'ಸಾರಜನಕ ಮತ್ತು ಸಾವಯವ ಪೋಷಕಾಂಶಗಳ ಸಮರ್ಪಕ ನಿರ್ವಹಣೆ' },
      { weekNum: 3, milestone: 'ಹಂತ 3: ಹೂ ಬಿಡುವಿಕೆ ಮತ್ತು ಕಾಯಿ/ಕಾಳುಗಳ ಬೆಳವಣಿಗೆ', focus: 'ಹೂವು ಉದುರುವುದನ್ನು ತಡೆಯಲು ರಂಜಕ ಮತ್ತು ಪೊಟ್ಯಾಷ್ ಪೂರೈಕೆ' },
      { weekNum: 4, milestone: 'ಹಂತ 4: ಕೊಯ್ಲಿಗೆ ಮುನ್ನ ಪಕ್ವತೆ ಮತ್ತು ಗುಣಮಟ್ಟ ಸುಧಾರಣೆ', focus: 'ನೀರಿನ ಪ್ರಮಾಣ ಇಳಿಸಿ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಇಳುವರಿ ಪಡೆಯುವುದು' }
    ],
    mr: [
      { weekNum: 1, milestone: `टप्पा 1: ${localizedStage} स्थापना`, focus: 'मुळांची मजबुती आणि पानांची वाढ' },
      { weekNum: 2, milestone: 'टप्पा 2: फुटव्यांची जोमदार वाढ आणि शाकीय विकास', focus: 'नत्र आणि सेंद्रिय खतांचा समतोल वापर' },
      { weekNum: 3, milestone: 'टप्पा 3: फुलधारणा आणि फळ/दाणे भरणे', focus: 'फूलगळ रोखण्यासाठी स्फुरद व पालाशचा वापर' },
      { weekNum: 4, milestone: 'टप्पा 4: पक्वता आणि पीक गुणवत्ता सुधारणा', focus: 'पाणी कमी करणे आणि उत्पादनाची प्रत सुधारणे' }
    ],
    bn: [
      { weekNum: 1, milestone: `পর্যায় ১: ${localizedStage} প্রতিষ্ঠা`, focus: 'শিকড়ের দৃঢ়তা ও পাতার বিস্তার' },
      { weekNum: 2, milestone: 'পর্যায় ২: কুশি বিস্তার ও উদ্ভিদের দৃঢ় বৃদ্ধি', focus: 'নাইট্রোজেন ও জৈব পুষ্টি প্রয়োগ' },
      { weekNum: 3, milestone: 'পর্যায় ৩: ফুল ফোটা ও দানা/ফল গঠন', focus: 'ফুল ঝরা রোধ ও দানা পুষ্ট করতে ফসফরাস ও পটাশ' },
      { weekNum: 4, milestone: 'পর্যায় ৪: পরিপক্কতা ও ফসলের গুণমান বৃদ্ধি', focus: 'জল নিয়ন্ত্রণ ও পাকা ফসলের গুণমান নিশ্চিতকরণ' }
    ],
    gu: [
      { weekNum: 1, milestone: `તબક્કો ૧: ${localizedStage} સ્થાપના`, focus: 'મૂળિયાંની મજબૂતી અને પાંદડાંની સંખ્યામાં વધારો' },
      { weekNum: 2, milestone: 'તબક્કો ૨: ફૂટ અને ઝડપી વૃદ્ધિ', focus: 'નાઇટ્રોજન અને સેન્દ્રીય પોષક તત્વોની વ્યવસ્થા' },
      { weekNum: 3, milestone: 'તબક્કો ૩: ફૂલ આવવા અને ફળ/દાણાનો વિકાસ', focus: 'ફૂલ ખરતાં અટકાવવા ફોસ્ફરસ અને પોટાશ' },
      { weekNum: 4, milestone: 'તબક્કો ૪: પાક પરિપક્વતા અને ગુણવત્તા સુધારો', focus: 'પાણી નિયંત્રણ અને ઉત્કૃષ્ટ ઉત્પાદન' }
    ],
    pa: [
      { weekNum: 1, milestone: `ਪੜਾਅ 1: ${localizedStage} ਸਥਾਪਨਾ`, focus: 'ਜੜ੍ਹਾਂ ਦੀ ਮਜ਼ਬੂਤੀ ਅਤੇ ਪੱਤਿਆਂ ਦਾ ਵਾਧਾ' },
      { weekNum: 2, milestone: 'ਪੜਾਅ 2: ਸ਼ਾਖਾਵਾਂ ਦਾ ਫੁਟਾਰਾ ਅਤੇ ਪੌਦੇ ਦਾ ਵਿਕਾਸ', focus: 'ਨਾਈਟ੍ਰੋਜਨ ਅਤੇ ਜੈਵਿਕ ਖਾਦਾਂ ਦੀ ਸਹੀ ਵਰਤੋਂ' },
      { weekNum: 3, milestone: 'ਪੜਾਅ 3: ਫੁੱਲ ਆਉਣਾ ਅਤੇ ਦਾਣੇ/ਫਲ ਦਾ ਵਿਕਾਸ', focus: 'ਫੁੱਲਾਂ ਨੂੰ ਝੜਨ ਤੋਂ ਰੋਕਣ ਲਈ ਫਾਸਫੋਰਸ ਤੇ ਪੋਟਾਸ਼' },
      { weekNum: 4, milestone: 'ਪੜਾਅ 4: ਪਕਾਈ ਅਤੇ ਦਾਣਿਆਂ ਦੀ ਗੁਣਵੱਤਾ ਵਿੱਚ ਸੁਧਾਰ', focus: 'ਪਾਣੀ ਘਟਾਉਣਾ ਅਤੇ ਫਸਲ ਦੀ ਸਹੀ ਸਾਂਭ-ਸੰਭਾਲ' }
    ],
    en: [
      { weekNum: 1, milestone: `Phase 1: ${localizedStage} Establishment`, focus: 'Root anchoring and vegetative leaf count expansion' },
      { weekNum: 2, milestone: 'Phase 2: Active Tillering & Biomass Bulking', focus: 'Nutrient uptake acceleration with nitrogen and organic carbon' },
      { weekNum: 3, milestone: 'Phase 3: Inflorescence & Reproductive Induction', focus: 'High phosphorus and potassium for flowering cluster retention' },
      { weekNum: 4, milestone: 'Phase 4: Yield Maturation & Quality Hardening', focus: 'Water taper-off and sucrose / starch accumulation' }
    ]
  };

  const IRRIGATION_TEXT_MAP: Record<SupportedLang, { next: string; freq: string; notes: string; method: string }> = {
    ta: {
      next: 'நாளை, காலை 06:30 மணி (காலை முறை)',
      freq: `${localizedIrrigation} · 2-3 நாட்களுக்கு ஒருமுறை`,
      notes: `${localizedSoil} மண்ணிற்கு ஏற்ற நீர்ப்பாசன முறை. மண் ஈரப்பதத்தை 70-80% அளவில் சீராகப் பராமரிக்கவும்.`,
      method: `${localizedIrrigation} துல்லிய பாசன அமைப்பு`
    },
    hi: {
      next: 'कल, सुबह 06:30 बजे (सुबह का चक्र)',
      freq: `${localizedIrrigation} · हर 2-3 दिन में`,
      notes: `${localizedSoil} मिट्टी के लिए अनुकूलित सिंचाई। मिट्टी की नमी 70-80% बनाए रखें।`,
      method: `${localizedIrrigation} परिशुद्ध सिंचाई प्रणाली`
    },
    te: {
      next: 'రేపు, ఉదయం 06:30 గంటలకు (ఉదయపు సమయం)',
      freq: `${localizedIrrigation} · ప్రతి 2-3 రోజులకు ఒకసారి`,
      notes: `${localizedSoil} నేలకు అనుకూలమైన నీటిపారుదల. నేల తేమను 70-80% స్థాయిలో ఉంచండి.`,
      method: `${localizedIrrigation} ఖచ్చితమైన నీటిపారుదల వ్యవస్థ`
    },
    kn: {
      next: 'ನಾಳೆ, ಬೆಳಿಗ್ಗೆ 06:30 (ಮುಂಜಾನೆಯ ಸರದಿ)',
      freq: `${localizedIrrigation} · ಪ್ರತಿ 2-3 ದಿನಗಳಿಗೊಮ್ಮೆ`,
      notes: `${localizedSoil} ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಾದ ನೀರಾವರಿ ಪದ್ಧತಿ. ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು 70-80% ರಷ್ಟು ಕಾಪಾಡಿಕೊಳ್ಳಿ.`,
      method: `${localizedIrrigation} ನಿಖರ ನೀರಾವರಿ ವ್ಯವಸ್ಥೆ`
    },
    mr: {
      next: 'उद्या, सकाळी 06:30 वाजता (सकाळची वेळ)',
      freq: `${localizedIrrigation} · दर 2-3 दिवसांनी`,
      notes: `${localizedSoil} मातीसाठी अत्यंत योग्य सिंचन पद्धत. जमिनीतील ओलावा 70-80% राखणे आवश्यक आहे.`,
      method: `${localizedIrrigation} अचूक सिंचन प्रणाली`
    },
    bn: {
      next: 'আগামীকাল, সকাল ০৬:৩০ টায় (সকালের ধাপ)',
      freq: `${localizedIrrigation} · প্রতি ২-৩ দিন অন্তর`,
      notes: `${localizedSoil} মাটির জন্য উপযুক্ত সেচ ব্যবস্থা। মাটির আর্দ্রতা ৭০-৮০% বজায় রাখুন।`,
      method: `${localizedIrrigation} সুনির্দিষ্ট সেচ ব্যবস্থা`
    },
    gu: {
      next: 'આવતીકાલે, સવારે ૦૬:૩૦ વાગ્યે (સવારનો સમય)',
      freq: `${localizedIrrigation} · દર ૨-૩ દિવસે`,
      notes: `${localizedSoil} જમીન માટે અનુકૂળ સિંચાઈ પદ્ધતિ. જમીનમાં ૭૦-૮૦% ભેજ જાળવી રાખો.`,
      method: `${localizedIrrigation} ચોક્કસ સિંચાઈ પદ્ધતિ`
    },
    pa: {
      next: 'ਕੱਲ੍ਹ, ਸਵੇਰੇ 06:30 ਵਜੇ (ਸਵੇਰ ਦਾ ਸਮਾਂ)',
      freq: `${localizedIrrigation} · ਹਰ 2-3 ਦਿਨ ਬਾਅਦ`,
      notes: `${localizedSoil} ਮਿੱਟੀ ਲਈ ਢੁਕਵੀਂ ਸਿੰਚਾਈ ਪ੍ਰਣਾਲੀ। ਮਿੱਟੀ ਦੀ ਨਮੀ 70-80% ਬਣਾਈ ਰੱਖੋ।`,
      method: `${localizedIrrigation} ਸ਼ੁੱਧ ਸਿੰਚਾਈ ਪ੍ਰਣਾਲੀ`
    },
    en: {
      next: 'Tomorrow, 06:30 AM (Morning cycle)',
      freq: `${localizedIrrigation} · Every 2-3 Days`,
      notes: `Optimized for ${localizedSoil} soil with high infiltration capacity. Maintain field capacity at 70-80%.`,
      method: `${localizedIrrigation} Precision System`
    }
  };

  const FERTILIZER_TEXT_MAP: Record<SupportedLang, { stage: string; prod: string; dosage: string; method: string; timing: string }> = {
    ta: {
      stage: `${localizedStage} ஊட்டச்சத்து தேவை`,
      prod: '19:19:19 நீரில் கரையும் உரம் + நுண்சத்துக்கள்',
      dosage: `${Math.round(crop.areaPlantedAcres * 4.5)} கிலோ / ஒரு முறைக்கு`,
      method: farm?.irrigationType === 'Drip' ? 'வென்சுரி சொட்டுநீர் வழியாக உரமிடுதல்' : 'பாசன நீருடன் கலந்து இடுதல்',
      timing: 'அதிகாலை வேளையில் 7 நாட்களுக்கு ஒருமுறை'
    },
    hi: {
      stage: `${localizedStage} पोषक तत्व मांग`,
      prod: '19:19:19 जल में घुलनशील उर्वरक + सूक्ष्म पोषक तत्व',
      dosage: `${Math.round(crop.areaPlantedAcres * 4.5)} किग्रा / प्रति प्रयोग`,
      method: farm?.irrigationType === 'Drip' ? 'वेंचुरी ड्रिप सिंचाई द्वारा फर्टिगेशन' : 'सिंचाई के पानी के साथ भूमि में मिलाना',
      timing: 'सुबह के समय हर 7 दिन के अंतराल पर'
    },
    te: {
      stage: `${localizedStage} పోషకాల అవసరం`,
      prod: '19:19:19 నీటిలో కరిగే ఎరువులు + సూక్ష్మ పోషకాలు',
      dosage: `${Math.round(crop.areaPlantedAcres * 4.5)} కిలోలు / ఒక దఫాకు`,
      method: farm?.irrigationType === 'Drip' ? 'డ్రిప్ ఫెర్టిగేషన్ ద్వారా అందించడం' : 'నీటితో కలిపి అందించడం',
      timing: 'ఉదయం వేళ ప్రతి 7 రోజులకు ఒకసారి'
    },
    kn: {
      stage: `${localizedStage} ಪೋಷಕಾಂಶದ ಬೇಡಿಕೆ`,
      prod: '19:19:19 ನೀರಿನಲ್ಲಿ ಕರಗುವ ಗೊಬ್ಬರ + ಲಘು ಪೋಷಕಾಂಶಗಳು',
      dosage: `${Math.round(crop.areaPlantedAcres * 4.5)} ಕೆಜಿ / ಪ್ರತಿ ಬಾರಿಗೆ`,
      method: farm?.irrigationType === 'Drip' ? 'ಹನಿ ನೀರಾವರಿ ಮೂಲಕ ಗೊಬ್ಬರ ಪೂರೈಕೆ' : 'ಮಣ್ಣಿನಲ್ಲಿ ಮಿಶ್ರಣ ಮಾಡುವುದು',
      timing: 'ಮುಂಜಾನೆ ಪ್ರತಿ 7 ದಿನಗಳಿಗೊಮ್ಮೆ'
    },
    mr: {
      stage: `${localizedStage} खतांची गरज`,
      prod: '19:19:19 विद्राव्य खत + सूक्ष्म अन्नद्रव्ये',
      dosage: `${Math.round(crop.areaPlantedAcres * 4.5)} किलो / प्रति वापर`,
      method: farm?.irrigationType === 'Drip' ? 'ठिबक सिंचनाद्वारे खत देणे (व्हेंचुरी)' : 'जमिनीत मिसळून देणे',
      timing: 'सकाळच्या वेळी दर ७ दिवसांनी'
    },
    bn: {
      stage: `${localizedStage} পুষ্টির চাহিদা`,
      prod: '19:19:19 জলে দ্রবণীয় সার + অণুপুষ্টি',
      dosage: `${Math.round(crop.areaPlantedAcres * 4.5)} কেজি / প্রতি প্রয়োগে`,
      method: farm?.irrigationType === 'Drip' ? 'ড্রিপ ফার্টিগেশন দ্বারা প্রয়োগ' : 'মাটিতে মিশিয়ে প্রয়োগ',
      timing: 'সকালে প্রতি ৭ দিন অন্তর'
    },
    gu: {
      stage: `${localizedStage} પોષક તત્વોની જરૂરિયાત`,
      prod: '19:19:19 દ્રાવ્ય ખાતર + સૂક્ષ્મ પોષક તત્વો',
      dosage: `${Math.round(crop.areaPlantedAcres * 4.5)} કિગ્રા / એકવાર`,
      method: farm?.irrigationType === 'Drip' ? 'ડ્રિપ ફર્ટિગેશન દ્વારા ખાતર આપવું' : 'જમીનમાં મિશ્રણ કરવું',
      timing: 'સવારે દર ૭ દિવસે'
    },
    pa: {
      stage: `${localizedStage} ਖਾਦ ਦੀ ਲੋੜ`,
      prod: '19:19:19 ਘੁਲਣਸ਼ੀਲ ਖਾਦ + ਸੂਖਮ ਤੱਤ',
      dosage: `${Math.round(crop.areaPlantedAcres * 4.5)} ਕਿਲੋ / ਪ੍ਰਤੀ ਵਾਰ`,
      method: farm?.irrigationType === 'Drip' ? 'ਡ੍ਰਿਪ ਫਰਟੀਗੇਸ਼ਨ ਰਾਹੀਂ ਖਾਦ ਪਾਉਣਾ' : 'ਮਿੱਟੀ ਵਿੱਚ ਮਿਲਾਉਣਾ',
      timing: 'ਸਵੇਰੇ ਹਰ 7 ਦਿਨ ਬਾਅਦ'
    },
    en: {
      stage: `${localizedStage} Nutrient Demand`,
      prod: '19:19:19 Water Soluble Fertilizer + Micronutrients',
      dosage: `${Math.round(crop.areaPlantedAcres * 4.5)} kg / application`,
      method: farm?.irrigationType === 'Drip' ? 'Fertigation via Venturi injector' : 'Broadcasting with soil incorporation',
      timing: 'Early morning split application every 7 days'
    }
  };

  const CROP_PROTECTION_MAP: Record<SupportedLang, { weed: string; pest: string; spray: string }> = {
    ta: {
      weed: 'வேர்ப் பகுதியைச் சுற்றி கைக்களை எடுத்தல் மற்றும் வைக்கோல் மூடாக்கு பராமரிப்பு',
      pest: 'இலைப்பேன் மற்றும் அசுவினி தாக்குதலைக் கண்காணிக்கவும். வேப்பெண்ணெய் கரைசல் (10,000 ppm @ 2 மி.லி/லி) தெளிக்கவும்.',
      spray: 'வேரழுகல் மற்றும் நாற்றுக்கருகல் நோயைத் தடுக்க டிரைக்கோடெர்மா விரிடி உயிர் உர நனைப்பு மேற்கொள்ளவும்.'
    },
    hi: {
      weed: 'पौधों के चारों ओर हाथ से निराई-गुड़ाई और पुआल की मल्चिंग बनाए रखना',
      pest: 'माहू और थ्रिप्स कीटों पर नजर रखें। नीम तेल घोल (10,000 ppm @ 2 मिली/लीटर) का छिड़काव करें।',
      spray: 'जड़ गलन और आद्र-पतन से बचाव हेतु ट्राइकोडर्मा विरिडी जैव-कवकनाशी का प्रयोग करें।'
    },
    te: {
      weed: 'మొక్కల మొదళ్ల వద్ద చేతితో కలుపు తీయడం మరియు గడ్డితో మల్చింగ్ చేయడం',
      pest: 'తామర పురుగులు, పేనుబంకపై నిఘా ఉంచండి. వేప నూనె ద్రావణం (10,000 ppm @ 2 మి.లీ/లీటర్) పిచికారీ చేయండి.',
      spray: 'వేరుకుళ్ళు మరియు నారుకుళ్ళు తెగుళ్ల నివారణకు ట్రైకోడెర్మా విరిడిని ఉపయోగించండి.'
    },
    kn: {
      weed: 'ಗಿಡಗಳ ಸುತ್ತಲೂ ಕೈಯಿಂದ ಕಳೆ ಕೀಳುವುದು ಮತ್ತು ಒಣಹುಲ್ಲಿನ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ನಿರ್ವಹಣೆ',
      pest: 'ನುಸಿ ಮತ್ತು ಜಿಗಿಹುಳುಗಳ ಬಾಧೆಯನ್ನು ಗಮನಿಸಿ. ಬೇವಿನ ಎಣ್ಣೆ ದ್ರಾವಣ (10,000 ppm @ 2 ಮಿ.ಲೀ/ಲೀ) ಸಿಂಪಡಿಸಿ.',
      spray: 'ಬೇರುಕೊಳೆ ರೋಗ ತಡೆಗಟ್ಟಲು ಟ್ರೈಕೋಡರ್ಮ ವಿರಿಡಿ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ ಬಳಸಿ.'
    },
    mr: {
      weed: 'रोपांच्या खोडाभोवती खुरपणी करणे आणि गवताचे आच्छादन (मल्चिंग) राखणे',
      pest: 'मावा आणि तुडतुड्यांवर लक्ष ठेवा. कडुनिंब तेल अर्क (10,000 ppm @ 2 मिली/लीटर) फवारा.',
      spray: 'मूळकूज रोगापासून संरक्षणासाठी ट्रायकोडर्मा विरिडी जैविक बुरशीनाशकाचा वापर करा.'
    },
    bn: {
      weed: 'গাছের গোড়ায় নিড়ানি দিয়ে আগাছা দমন ও খড়ের মালচিং বজায় রাখা',
      pest: 'জাবপোকা ও থ্রিপসের আক্রমণ লক্ষ্য করুন। নিম তেল স্প্রে (10,000 ppm @ 2 মিলি/লিটার) প্রয়োগ করুন।',
      spray: 'শিকড় পচা ও ধসা রোগ প্রতিরোধে ট্রাইকোডার্মা ভিরিডি প্রয়োগ করুন।'
    },
    gu: {
      weed: 'છોડની આસપાસ હાથથી નીંદણ દૂર કરવું અને ઘાસનું મલ્ચિંગ જાળવવું',
      pest: 'મોલો-મસી અને થ્રીપ્સ પર નજર રાખો. લીમડાના તેલનો અર્ક (10,000 ppm @ 2 મિલી/લીટર) છાંટો.',
      spray: 'મૂળના સડાથી બચાવવા ટ્રાઇકોડર્મા વિરીડી જૈવિક ફૂગનાશક વાપરો.'
    },
    pa: {
      weed: 'ਬੂਟਿਆਂ ਦੇ ਦੁਆਲੇ ਹੱਥੀਂ ਗੋਡੀ ਕਰਨਾ ਅਤੇ ਪਰਾਲੀ ਦੀ ਮਲਚਿੰਗ ਬਣਾਈ ਰੱਖਣਾ',
      pest: 'ਤੇਲਾ ਅਤੇ ਚੇਪਾ ਕੀੜਿਆਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ। ਨਿੰਮ ਤੇਲ ਘੋਲ (10,000 ppm @ 2 ਮਿਲੀ/ਲੀਟਰ) ਛਿੜਕੋ।',
      spray: 'ਜੜ੍ਹ ਗਲਣ ਦੇ ਰੋਗ ਤੋਂ ਬਚਾਅ ਲਈ ਟ੍ਰਾਈਕੋਡਰਮਾ ਵਿਰੀਡੀ ਦੀ ਵਰਤੋਂ ਕਰੋ।'
    },
    en: {
      weed: 'Manual hand hoeing around crop root crown + organic straw mulch maintenance',
      pest: 'Monitor for sucking pests and borers. Apply botanical neem formulation (10,000 ppm @ 2 ml/L) as first defense.',
      spray: 'Trichoderma viride + Pseudomonas fluorescens bio-agent drenching to protect against root rot.'
    }
  };

  const HARVEST_PREP_MAP: Record<SupportedLang, string[]> = {
    ta: [
      'அறுவடை ஈரப்பதம் அளவிடும் கருவியை சரிபார்த்து தூய்மையான சேமிப்பு கூடைகளை தயார் செய்தல்',
      'அறுவடைக்கு 14 நாட்களுக்கு முன் பூச்சிக்கொல்லி மருந்து தெளிப்பதை முற்றிலும் நிறுத்துதல் (PHI விதி)',
      'விளைபொருட்களை சந்தைக்கு கொண்டு செல்ல போக்குவரத்து வாகனங்களை முன்கூட்டியே ஏற்பாடு செய்தல்',
      'சேதமின்றி தரம் பிரிக்கும் மேடைகள் மற்றும் களத்து மேடுகளை தூய்மையாக பராமரித்தல்'
    ],
    hi: [
      'फसल कटाई नमी मापक यंत्र की जांच करें और साफ क्रेट्स/बोरियों की व्यवस्था करें',
      'कटाई से 14 दिन पहले किसी भी रासायनिक दवा का छिड़काव बंद करें (PHI नियम)',
      'उपज को नजदीकी कृषि मंडी तक ले जाने के लिए परिवहन की अग्रिम व्यवस्था करें',
      'फसल की छंटाई और ग्रेडिंग के स्थान को साफ और सूखा रखें'
    ],
    te: [
      'కోత తేమ మీటర్ తనిఖీ చేసి శుభ్రమైన నిల్వ బుట్టలను సిద్ధం చేయండి',
      'కోతకు 14 రోజుల ముందు రసాయన మందుల పిచికారీని పూర్తిగా నిలిపివేయండి',
      'దిగుబడిని మార్కెట్‌కు తరలించడానికి రవాణా సౌకర్యాన్ని ముందుగానే ఏర్పాటు చేసుకోండి',
      'గ్రేడింగ్ మరియు ప్యాకింగ్ ప్రదేశాన్ని శుభ్రంగా ఉంచండి'
    ],
    kn: [
      'ಕೊಯ್ಲು ತೇವಾಂಶ ಮಾಪಕವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸ್ವಚ್ಛವಾದ ಶೇಖರಣಾ ಬುಟ್ಟಿಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ',
      'ಕೊಯ್ಲಿಗೆ 14 ದಿನಗಳ ಮೊದಲು ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆಯನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಿಲ್ಲಿಸಿ (PHI ನಿಯಮ)',
      'ಉತ್ಪನ್ನವನ್ನು ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆಗೆ ಸಾಗಿಸಲು ಮುಂಚಿತವಾಗಿ ವಾಹನ ವ್ಯವಸ್ಥೆ ಮಾಡಿ',
      'ವರ್ಗೀಕರಣ ಮತ್ತು ಪ್ಯಾಕಿಂಗ್ ಜಾಗವನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ'
    ],
    mr: [
      'काढणी ओलावा मीटर तपासा आणि स्वच्छ साठवणूक क्रेट्स तयार ठेवा',
      'काढणीच्या १४ दिवस आधी कोणत्याही रासायनिक फवारण्या पूर्णपणे थांबवा (PHI नियम)',
      'उत्पादन बाजारपेठेत नेण्यासाठी वाहतुकीची आगाऊ सोय करा',
      'प्रतवारी (ग्रेडिंग) करण्याचे ठिकाण स्वच्छ व कोरडे ठेवा'
    ],
    bn: [
      'ফসল কাটার আর্দ্রতা মাপার যন্ত্র পরীক্ষা ও পরিষ্কার ঝুড়ি প্রস্তুত রাখুন',
      'ফসল তোলার ১৪ দিন আগে সবরকম রাসায়নিক স্প্রে বন্ধ করুন (PHI নিয়ম)',
      'ফসল হাটে বা মান্ডিতে নেওয়ার জন্য পরিবহনের ব্যবস্থা রাখুন',
      'বাছাই ও গ্রেডিংয়ের জায়গা পরিষ্কার-পরিচ্ছন্ন রাখুন'
    ],
    gu: [
      'કાપણી ભેજ માપક તપાસો અને સ્વચ્છ સંગ્રહ ક્રેટ્સ તૈયાર રાખો',
      'કાપણીના ૧૪ દિવસ પહેલાં રાસાયણિક છંટકાવ બંધ કરો (PHI નિયમ)',
      'ઉત્પાદનને માર્કેટ યાર્ડ પહોંચાડવા વાહન વ્યવસ્થા અગાઉથી કરો',
      'ગ્રેડિંગ અને વર્ગીકરણની જગ્યા સાફ રાખો'
    ],
    pa: [
      'ਕਟਾਈ ਨਮੀ ਮੀਟਰ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਸਾਫ਼ ਸਟੋਰੇਜ ਬੋਰੀਆਂ ਤਿਆਰ ਰੱਖੋ',
      'ਕਟਾਈ ਤੋਂ 14 ਦਿਨ ਪਹਿਲਾਂ ਰਸਾਇਣਕ ਛਿੜਕਾਅ ਬੰਦ ਕਰੋ (PHI ਨਿਯਮ)',
      'ਉਪਜ ਨੂੰ ਮੰਡੀ ਵਿੱਚ ਲਿਜਾਣ ਲਈ ਵਾਹਨ ਦਾ ਪ੍ਰਬੰਧ ਪਹਿਲਾਂ ਹੀ ਕਰੋ',
      'ਗ੍ਰੇਡਿੰਗ ਅਤੇ ਛਾਂਟੀ ਵਾਲੀ ਥਾਂ ਨੂੰ ਸਾਫ਼-ਸੁਥਰਾ ਰੱਖੋ'
    ],
    en: [
      'Calibrate harvesting moisture meter and prepare clean dry storage crates',
      'Cease chemical applications 14 days prior to harvest (observe Pre-Harvest Interval PHI)',
      'Arrange cold chain transport or local APMC mandi logistics',
      'Pre-clean processing threshers / sorting tables to prevent mechanical damage'
    ]
  };

  const currentLang = lang || 'en';
  const morningScout = MORNING_SCOUT_MAP[currentLang] || MORNING_SCOUT_MAP.en;
  const morningFert = MORNING_FERT_MAP[currentLang] || MORNING_FERT_MAP.en;
  const afternoon = AFTERNOON_MAP[currentLang] || AFTERNOON_MAP.en;
  const eveningSpray = EVENING_SPRAY_MAP[currentLang] || EVENING_SPRAY_MAP.en;
  const eveningLog = EVENING_LOG_MAP[currentLang] || EVENING_LOG_MAP.en;
  const weekly = WEEKLY_TASKS_MAP[currentLang] || (Array.isArray(WEEKLY_TASKS_MAP[currentLang]) ? WEEKLY_TASKS_MAP[currentLang] : WEEKLY_TASKS_MAP.en);
  const monthly = MONTHLY_MILESTONES_MAP[currentLang] || MONTHLY_MILESTONES_MAP.en;
  const irrigationData = IRRIGATION_TEXT_MAP[currentLang] || IRRIGATION_TEXT_MAP.en;
  const fertData = FERTILIZER_TEXT_MAP[currentLang] || FERTILIZER_TEXT_MAP.en;
  const protData = CROP_PROTECTION_MAP[currentLang] || CROP_PROTECTION_MAP.en;
  const harvestPrep = HARVEST_PREP_MAP[currentLang] || HARVEST_PREP_MAP.en;

  const weeklyScheduleList = Array.isArray(weekly) ? weekly : WEEKLY_TASKS_MAP.en;

  return {
    cropName: crop.cropName,
    growthStage: crop.growthStage,
    daysSinceSowing,
    stageProgressPct,
    dailyActivities: {
      morning: [
        {
          time: '06:30 - 08:30 AM',
          task: morningScout.task,
          rationale: morningScout.rationale,
          priority: 'high'
        },
        {
          time: '08:30 - 10:30 AM',
          task: morningFert.task,
          rationale: morningFert.rationale,
          priority: 'medium'
        }
      ],
      afternoon: [
        {
          time: '01:00 - 03:00 PM',
          task: afternoon.task,
          rationale: afternoon.rationale,
          priority: 'normal'
        }
      ],
      evening: [
        {
          time: '05:00 - 06:45 PM',
          task: eveningSpray.task,
          rationale: eveningSpray.rationale,
          priority: 'high'
        },
        {
          time: '06:45 - 07:30 PM',
          task: eveningLog.task,
          rationale: eveningLog.rationale,
          priority: 'normal'
        }
      ]
    },
    weeklySchedule: weeklyScheduleList,
    monthlyMilestones: monthly,
    irrigation: {
      frequency: irrigationData.freq,
      volumeLitersPerAcre: Math.round(18000 + daysSinceSowing * 120),
      nextWatering: irrigationData.next,
      method: irrigationData.method,
      smartNotes: irrigationData.notes
    },
    fertilizer: {
      stageRequirement: fertData.stage,
      recommendedProduct: fertData.prod,
      dosagePerAcre: fertData.dosage,
      applicationMethod: fertData.method,
      npkRatio: '19:19:19 / 12:61:00',
      microNutrients: ['Zinc (Zn 12%)', 'Boron (B 20%)', 'Ferrous Sulphate (Fe)', 'Magnesium (MgSO4)'],
      timing: fertData.timing
    },
    cropProtection: {
      weedingAction: protData.weed,
      pesticideReminder: protData.pest,
      preventativeSpray: protData.spray
    },
    harvestPreparation: harvestPrep
  };
}
