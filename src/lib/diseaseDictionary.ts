import { DiseaseDetectionResult } from '../types/agro';
import { SupportedLang } from './i18n';

export interface LocalizedDiseaseData {
  diseaseName: string;
  cropGuess: string;
  diseaseStage: string;
  cause: string;
  symptoms: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  recommendedFungicides: string[];
  recommendedPesticides: string[];
  ppePrecautions: string[];
}

export const DISEASE_TRANSLATIONS: Record<string, Record<SupportedLang, LocalizedDiseaseData>> = {
  'Tomato Early Blight': {
    en: {
      diseaseName: 'Tomato Early Blight (Alternaria solani)',
      cropGuess: 'Tomato (Solanum lycopersicum)',
      diseaseStage: 'Moderate Infection (Spreading)',
      cause: 'Fungal conidia spores disseminated by splashing rainfall, wind turbulence, and prolonged leaf canopy wetness exceeding 8 hours.',
      symptoms: [
        'Concentric circular dark-brown necrotic lesions (target-board pattern)',
        'Pronounced chlorotic yellow halos encircling primary necrotic spots',
        'Premature senescence and downward leaf curling on lower canopy foliage'
      ],
      organicTreatment: [
        'Cold-pressed Neem Oil 10,000 PPM @ 3.5 ml/litre with organic soap emulsifier',
        'Trichoderma viride bio-fungicide @ 5 g/litre early morning foliar drench',
        'Prune lower infected leaves 20cm above soil line and bury safely'
      ],
      chemicalTreatment: [
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml/litre water',
        'Mancozeb 75% WP @ 2.5 g/litre protective barrier spray',
        'Chlorothalonil 75% WP @ 2.0 g/litre preventive application'
      ],
      recommendedFungicides: ['Azoxystrobin + Difenoconazole', 'Mancozeb 75 WP', 'Chlorothalonil', 'Copper Oxychloride'],
      recommendedPesticides: ['Neem Azadirachtin', 'Bio-Sulfur'],
      ppePrecautions: [
        'Wear N95 chemical respirator mask during chemical spray mixing',
        'Use nitrile waterproof gloves and protective rubber safety boots',
        'Maintain mandatory 7-day pre-harvest waiting interval (PHI)'
      ]
    },
    ta: {
      diseaseName: 'தக்காளி இலைக்கருகல் நோய் (Alternaria solani)',
      cropGuess: 'தக்காளி (Solanum lycopersicum)',
      diseaseStage: 'மிதமான தொற்று (வேகமாக பரவுகிறது)',
      cause: 'மழை நீர் தெறிப்பு, காற்றின் ஈரப்பதம் மற்றும் 8 மணி நேரத்திற்கு மேலான இலை ஈரப்பதம் ஆகியவற்றால் பரவும் பூஞ்சை வித்துக்கள்.',
      symptoms: [
        'இலைகளில் வட்ட வடிவ அடர் பழுப்பு நிற இலக்கு போன்ற வளையப் புள்ளிகள் (Target spots)',
        'புள்ளிகளைச் சுற்றி தெளிவான மஞ்சள் நிற வளையம் (Chlorotic halo)',
        'அடி இலைகள் காய்ந்து முன்கூட்டியே உதிர்தல் மற்றும் கீழ்நோக்கி சுருங்குதல்'
      ],
      organicTreatment: [
        'தூய வேப்ப எண்ணெய் 10,000 PPM லிட்டருக்கு 3.5 மி.லி + காதி சோப் கரைசல் தெளிக்கவும்',
        'ட்ரைக்கோடெர்மா விரிடி உயிர் பூஞ்சாணக்கொல்லி லிட்டருக்கு 5 கிராம் காலை வேளையில் தெளிக்கவும்',
        'பாதிக்கப்பட்ட அடி இலைகளை 20 செ.மீ வரை வெட்டி அகற்றி மண்ணில் புதைக்கவும்'
      ],
      chemicalTreatment: [
        'அஸாக்சிஸ்ட்ரோபின் 18.2% + டைபனோகோனசோல் 11.4% SC லிட்டருக்கு 1.0 மி.லி',
        'மேன்கோசெப் 75% WP லிட்டருக்கு 2.5 கிராம் பாதுகாப்பு தெளிப்பு',
        'காப்பர் ஆக்ஸிகுளோரைடு 50% WP லிட்டருக்கு 2.5 கிராம் தெளிக்கவும்'
      ],
      recommendedFungicides: ['அஸாக்சிஸ்ட்ரோபின் + டைபனோகோனசோல்', 'மேன்கோசெப் 75 WP', 'குளோரோதலோனில்'],
      recommendedPesticides: ['வேப்ப அசாடிராக்டின்', 'பயோ-சல்பர்'],
      ppePrecautions: [
        'மருந்து தெளிக்கும் போது N95 சுவாச முகக்கவசம் அணியவும்',
        'கைகளில் ரப்பர் கையுறைகள் மற்றும் பாதுகாப்பு காலணிகள் அணியவும்',
        'அறுவடைக்கு முன் 7 நாட்கள் இடைவெளி கட்டாயம் பின்பற்றவும்'
      ]
    },
    hi: {
      diseaseName: 'टमाटर अगेती झुलसा रोग (Alternaria solani)',
      cropGuess: 'टमाटर (Solanum lycopersicum)',
      diseaseStage: 'मध्यम संक्रमण (फैल रहा है)',
      cause: 'बारिश की बूंदों के छींटे, तेज हवा और 8 घंटे से अधिक समय तक पत्तियों में नमी बने रहने से फैलने वाले फफूंद बीजाणु।',
      symptoms: [
        'पत्तियों पर गोल गहरे भूरे रंग के छल्लेदार धब्बे (टारगेट बोर्ड पैटर्न)',
        'धब्बों के चारों ओर स्पष्ट पीला घेरा',
        'निचली पत्तियां सूखकर समय से पहले गिरना'
      ],
      organicTreatment: [
        'नीम का तेल 10,000 PPM @ 3.5 मिली प्रति लीटर पानी में मिलाकर छिड़कें',
        'ट्राइकोडर्मा विरिडी जैव कवकनाशी @ 5 ग्राम प्रति लीटर सुबह के समय छिड़कें',
        'संक्रमित निचली पत्तियों को काटकर खेत से दूर नष्ट करें'
      ],
      chemicalTreatment: [
        'एजोक्सीस्ट्रोबिन 18.2% + डाइफेनोकोनाजोल 11.4% SC @ 1.0 मिली प्रति लीटर',
        'मैंकोजेब 75% WP @ 2.5 ग्राम प्रति लीटर पानी',
        'कॉपर ऑक्सीक्लोराइड 50 WP @ 2.5 ग्राम प्रति लीटर'
      ],
      recommendedFungicides: ['एजोक्सीस्ट्रोबिन + डाइफेनोकोनाजोल', 'मैंकोजेब 75 WP', 'कॉपर ऑक्सीक्लोराइड'],
      recommendedPesticides: ['नीम अजाडिराक्टिन', 'बायो-सल्फर'],
      ppePrecautions: [
        'दवा छिड़काव के समय N95 मास्क और रबर के दस्ताने पहनें',
        'फसल कटाई से पहले 7 दिनों का अंतर अवश्य रखें'
      ]
    },
    te: {
      diseaseName: 'టమాటా ముందస్తు తెగులు (Alternaria solani)',
      cropGuess: 'టమాటా (Solanum lycopersicum)',
      diseaseStage: 'మధ్యస్థ సంక్రమణ (వ్యాప్తి చెందుతోంది)',
      cause: 'వర్షపు నీటి చినుకులు, గాలిలో తేమ మరియు ఆకులపై తేమ వలన వ్యాపించే శిలీంధ్ర బీజాంశాలు.',
      symptoms: [
        'ఆకులపై ముదురు గోధుమ రంగు వృత్తాకార మచ్చలు',
        'మచ్చల చుట్టూ పసుపు రంగు వలయాలు',
        'కింది ఆకులు పసుపు రంగులోకి మారి రాలిపోవడం'
      ],
      organicTreatment: [
        'వేప నూనె 10,000 PPM లీటరు నీటికి 3.5 మి.లీ కలిపి పిచికారీ చేయాలి',
        'ట్రైకోడెర్మా విరిడి లీటరుకు 5 గ్రాములు కలిపి పిచికారీ చేయాలి'
      ],
      chemicalTreatment: [
        'అజోక్సిస్ట్రోబిన్ + డైఫెనోకోనజోల్ లీటరుకు 1.0 మి.లీ',
        'మాంకోజెబ్ 75% WP లీటరుకు 2.5 గ్రాములు'
      ],
      recommendedFungicides: ['అజోక్సిస్ట్రోబిన్ + డైఫెనోకోనజోల్', 'మాంకోజెబ్ 75 WP'],
      recommendedPesticides: ['వేప అజాడిరక్టిన్'],
      ppePrecautions: ['పిచికారీ సమయంలో మాస్క్ మరియు చేతి తొడుగులు ధరించండి']
    },
    kn: {
      diseaseName: 'ಟೊಮ್ಯಾಟೊ ಅರ್ಲಿ ಬ್ಲೈಟ್ ರೋಗ (Alternaria solani)',
      cropGuess: 'ಟೊಮ್ಯಾಟೊ (Solanum lycopersicum)',
      diseaseStage: 'ಮಧ್ಯಮ ಸೋಂಕು (ಹರಡುತ್ತಿದೆ)',
      cause: 'ಮಳೆಯ ನೀರಿನ ತುಂತುರು, ತೇವಾಂಶ ಮತ್ತು ಶಿಲೀಂಧ್ರ ಬೀಜಕಗಳಿಂದ ಹರಡುವ ರೋಗ.',
      symptoms: [
        'ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಬಣ್ಣದ ವೃತ್ತಾಕಾರದ ಕಲೆಗಳು',
        'ಕಲೆಗಳ ಸುತ್ತ ಹಳದಿ ಬಣ್ಣದ ಬಳೆಗಳು',
        'ಕೆಳಗಿನ ಎಲೆಗಳು ಉದುರುವುದು'
      ],
      organicTreatment: [
        'ಬೇವಿನ ಎಣ್ಣೆ 10,000 PPM ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 3.5 ಮಿ.ಲೀ ಸಿಂಪಡಿಸಿ',
        'ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡಿ ಪ್ರತಿ ಲೀಟರ್‌ಗೆ 5 ಗ್ರಾಂ ಸಿಂಪಡಿಸಿ'
      ],
      chemicalTreatment: [
        'ಅಜಾಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ + ಡೈಫೆನೊಕೊನಜೋಲ್ ಪ್ರತಿ ಲೀಟರ್‌ಗೆ 1.0 ಮಿ.ಲೀ',
        'ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP ಪ್ರತಿ ಲೀಟರ್‌ಗೆ 2.5 ಗ್ರಾಂ'
      ],
      recommendedFungicides: ['ಅಜಾಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ + ಡೈಫೆನೊಕೊನಜೋಲ್', 'ಮ್ಯಾಂಕೋಜೆಬ್'],
      recommendedPesticides: ['ಬೇವಿನ ಕೀಟನಾಶಕ'],
      ppePrecautions: ['ಸಿಂಪಡಿಸುವಾಗ ಮಾಸ್ಕ್ ಮತ್ತು ಕೈಗವಸುಗಳನ್ನು ಧರಿಸಿ']
    },
    mr: {
      diseaseName: 'टोमॅटोवरील लवकर येणारा करपा (Alternaria solani)',
      cropGuess: 'टोमॅटो (Solanum lycopersicum)',
      diseaseStage: 'मध्यम संसर्ग (पसरत आहे)',
      cause: 'पावसाचे पाणी, हवेतील आर्द्रता आणि बुरशीच्या बीजाणूंमुळे पसरणारा रोग.',
      symptoms: [
        'पानांवर गोलाकार गडद तपकिरी डाग',
        'डागांभोवती पिवळे कडे',
        'खालची पाने सुकणे आणि गळणे'
      ],
      organicTreatment: [
        'कडुनिंब तेल 10,000 PPM प्रति लिटर 3.5 मिली फवारावे',
        'ट्रायकोडर्मा व्हिरीडी प्रति लिटर 5 ग्रॅम फवारावे'
      ],
      chemicalTreatment: [
        'अझॉक्सीस्ट्रॉबिन + डायफेनोकोनाझोल 1.0 मिली प्रति लिटर',
        'मॅनकोझेब 75% WP 2.5 ग्रॅम प्रति लिटर'
      ],
      recommendedFungicides: ['अझॉक्सीस्ट्रॉबिन + डायफेनोकोनाझोल', 'मॅनकोझेब'],
      recommendedPesticides: ['कडुनिंब अर्क'],
      ppePrecautions: ['फवारणी करताना मास्क व हातमोजे वापरा']
    },
    bn: {
      diseaseName: 'টমেটো আর্লি ব্লাইট রোগ (Alternaria solani)',
      cropGuess: 'টমেটো (Solanum lycopersicum)',
      diseaseStage: 'মাঝারি সংক্রমণ (ছড়িয়ে পড়ছে)',
      cause: 'বৃষ্টির জল, বাতাসের আর্দ্রতা এবং ছত্রাকের কারণে রোগ বিস্তার লাভ করে।',
      symptoms: [
        'পাতায় গাঢ় বাদামী রঙের গোলাকার দাগ',
        'দাগের চারপাশে হলুদ বলয়',
        'নিচের পাতা শুকিয়ে ঝরে পড়া'
      ],
      organicTreatment: [
        'নিম তেল প্রতি লিটার জলে ৩.৫ মিলি মিশিয়ে স্প্রে করুন',
        'ট্রাইকোডার্মা ভিরিডি প্রতি লিটার জলে ৫ গ্রাম স্প্রে করুন'
      ],
      chemicalTreatment: [
        'অ্যাজোক্সিস্ট্রোবিন + ডাইফেনোকোনাজোল প্রতি লিটার জলে ১.০ মিলি',
        'ম্যানকোজেব ৭৫% ডব্লিউপি প্রতি লিটার জলে ২.৫ গ্রাম'
      ],
      recommendedFungicides: ['অ্যাজোক্সিস্ট্রোবিন + ডাইফেনোকোনাজোল', 'ম্যানকোজেব'],
      recommendedPesticides: ['নিম কীটনাশক'],
      ppePrecautions: ['স্প্রে করার সময় মাস্ক ও গ্লাভস ব্যবহার করুন']
    },
    gu: {
      diseaseName: 'ટામેટાનો આગોતરો સુકારો (Alternaria solani)',
      cropGuess: 'ટામેટા (Solanum lycopersicum)',
      diseaseStage: 'મધ્યમ ચેપ (ફેલાઈ રહ્યો છે)',
      cause: 'વરસાદી પાણીના છાંટા, હવામાં ભેજ અને ફૂગના બીજાણુઓથી ફેલાતો રોગ.',
      symptoms: [
        'પાંદડા પર ગોળાકાર ઘેરા બદામી ડાઘ',
        'ડાઘની આસપાસ પીળી કિનારી',
        'નીચલા પાંદડા સુકાઈને ખરી પડવા'
      ],
      organicTreatment: [
        'લીમડાનું તેલ ૧૦,૦૦૦ PPM @ ૩.૫ મિલી પ્રતિ લીટર છંટકાવ કરવો',
        'ટ્રાઇકોડર્મા વિરીડી @ ૫ ગ્રામ પ્રતિ લીટર છંટકાવ કરવો'
      ],
      chemicalTreatment: [
        'એઝોક્સીસ્ટ્રોબિન + ડાયફેનોકોનાઝોલ @ ૧.૦ મિલી પ્રતિ લીટર',
        'મેન્કોઝેબ ૭૫% WP @ ૨.૫ ગ્રામ પ્રતિ લીટર'
      ],
      recommendedFungicides: ['એઝોક્સીસ્ટ્રોબિન + ડાયફેનોકોનાઝોલ', 'મેન્કોઝેબ'],
      recommendedPesticides: ['લીમડા અર્ક'],
      ppePrecautions: ['દવા છાંટતી વખતે માસ્ક અને હાથમોજાં પહેરો']
    },
    pa: {
      diseaseName: 'ਟਮਾਟਰ ਦਾ ਅਗੇਤਾ ਝੁਲਸਾ ਰੋਗ (Alternaria solani)',
      cropGuess: 'ਟਮਾਟਰ (Solanum lycopersicum)',
      diseaseStage: 'ਦਰਮਿਆਨਾ ਸੰਕਰਮਣ (ਫੈਲ ਰਿਹਾ ਹੈ)',
      cause: 'ਮੀਂਹ ਦੇ ਪਾਣੀ ਦੇ ਛਿੱਟੇ, ਹਵਾ ਵਿੱਚ ਨਮੀ ਅਤੇ ਉੱਲੀ ਦੇ ਬੀਜਾਣੂਆਂ ਕਾਰਨ ਫੈਲਣ ਵਾਲਾ ਰੋਗ।',
      symptoms: [
        'ਪੱਤਿਆਂ ਤੇ ਗੋਲ ਗੂੜ੍ਹੇ ਭੂਰੇ ਰੰਗ ਦੇ ਧੱਬੇ',
        'ਧੱਬਿਆਂ ਦੇ ਦੁਆਲੇ ਪੀਲਾ ਘੇਰਾ',
        'ਹੇਠਲੇ ਪੱਤੇ ਸੁੱਕ ਕੇ ਝੜਨਾ'
      ],
      organicTreatment: [
        'ਨੀਮ ਦਾ ਤੇਲ 10,000 PPM @ 3.5 ਮਿਲੀਲਿਟਰ ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਛਿੜਕੋ',
        'ਟ੍ਰਾਈਕੋਡਰਮਾ ਵਿਰੀਡੀ @ 5 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ ਛਿੜਕੋ'
      ],
      chemicalTreatment: [
        'ਅਜ਼ੌਕਸੀਸਟ੍ਰੋਬਿਨ + ਡਾਈਫੇਨੋਕੋਨਾਜ਼ੋਲ @ 1.0 ਮਿਲੀਲਿਟਰ ਪ੍ਰਤੀ ਲੀਟਰ',
        'ਮੈਨਕੋਜ਼ੇਬ 75% WP @ 2.5 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ'
      ],
      recommendedFungicides: ['ਅਜ਼ੌਕਸੀਸਟ੍ਰੋਬਿਨ + ਡਾਈਫੇਨੋਕੋਨਾਜ਼ੋਲ', 'ਮੈਨਕੋਜ਼ੇਬ'],
      recommendedPesticides: ['ਨੀਮ ਕੀਟਨਾਸ਼ਕ'],
      ppePrecautions: ['ਦਵਾਈ ਛਿੜਕਣ ਵੇਲੇ ਮਾਸਕ ਅਤੇ ਦਸਤਾਨੇ ਪਾਓ']
    }
  },

  'Rice Blast': {
    en: {
      diseaseName: 'Rice Blast Disease (Magnaporthe oryzae)',
      cropGuess: 'Paddy / Rice (Oryza sativa)',
      diseaseStage: 'Severe Foliar & Nodal Blast',
      cause: 'Magnaporthe oryzae ascomycete spores transmitted by cool night temperatures (18-22°C), relative humidity >90%, and excessive nitrogen fertilizer application.',
      symptoms: [
        'Spindle-shaped elliptical lesions with gray/whitish necrotic centers and reddish-brown borders',
        'Lesions coalesce rapidly causing complete blade blighting and seedling death',
        'Collar rot and dark necrotic nodal ring girdling the main culm'
      ],
      organicTreatment: [
        'Pseudomonas fluorescens 1.0% WP @ 10 g/litre foliar spray + seed soaking',
        'Spray 5% Neem Seed Kernel Extract (NSKE) at early tillering stage',
        'Drain field water for 48 hours to aerate the soil and reduce canopy humidity'
      ],
      chemicalTreatment: [
        'Tricyclazole 75% WP @ 0.6 g/litre water (Specific Systemic Blast Fungicide)',
        'Isoprothiolane 40% EC @ 1.5 ml/litre water',
        'Azoxystrobin 18.2% + Cyproconazole 7.3% SC @ 1.0 ml/litre'
      ],
      recommendedFungicides: ['Tricyclazole 75 WP', 'Isoprothiolane 40 EC', 'Kasugamycin 3 SL', 'Hexaconazole 5 EC'],
      recommendedPesticides: ['Neem Kernel Extract', 'Bio-Pseudomonas'],
      ppePrecautions: [
        'Wear full protective rain-gear and PVC rubber gloves',
        'Avoid spraying against wind direction',
        'Observe minimum 14-day pre-harvest interval for grain safety'
      ]
    },
    ta: {
      diseaseName: 'நெல் குலை நோய் / பிளாஸ்ட் (Magnaporthe oryzae)',
      cropGuess: 'நெல் (Oryza sativa)',
      diseaseStage: 'தீவிர இலை & கணு குலை நோய்',
      cause: 'குளிர்ந்த இரவு வெப்பநிலை (18-22°C), 90% மேலான ஈரப்பதம் மற்றும் அதிகப்படியான தழைச்சத்து (யூரியா) இடுவதால் பரவும் பூஞ்சை.',
      symptoms: [
        'இலைகளில் கண் போன்ற / கதிர் வடிவ சாம்பல் நிற மையமும் பழுப்பு நிற விளிம்பும் கொண்ட புள்ளிகள்',
        'புள்ளிகள் ஒன்றிணைந்து இலைகள் முழுமையாக கருகி போதல்',
        'கணு மற்றும் கழுத்துப் பகுதியில் கருமையான வளைய கருகல் ஏற்பட்டு கதிர் உடைந்து தொங்குதல்'
      ],
      organicTreatment: [
        'சூடோமோனாஸ் ஃப்ளோரசன்ஸ் 1.0% WP லிட்டருக்கு 10 கிராம் காலை வேளையில் தெளிக்கவும்',
        '5% வேப்பங்கொட்டை சாறு (NSKE) தூர்கட்டும் பருவத்தில் தெளிக்கவும்',
        'வயலில் உள்ள நீரை 2 நாட்கள் வடித்து மண்ணை உலர வைக்கவும்'
      ],
      chemicalTreatment: [
        'ட்ரைசைக்ளசோல் 75% WP லிட்டருக்கு 0.6 கிராம் (குலை நோய்க்கான பிரத்யேக மருந்து)',
        'ஐசோப்ரோதியோலேன் 40% EC லிட்டருக்கு 1.5 மி.லி',
        'கசுகாமைசின் 3% SL லிட்டருக்கு 2.5 மி.லி தெளிக்கவும்'
      ],
      recommendedFungicides: ['ட்ரைசைக்ளசோல் 75 WP', 'ஐசோப்ரோதியோலேன் 40 EC', 'கசுகாமைசின் 3 SL'],
      recommendedPesticides: ['வேப்பங்கொட்டை சாறு', 'சூடோமோனாஸ்'],
      ppePrecautions: [
        'காற்றுக்கு எதிர் திசையில் மருந்து தெளிக்கக் கூடாது',
        'பாதுகாப்பு முகக்கவசம் மற்றும் கையுறைகள் கட்டாயம் அணியவும்',
        'அறுவடைக்கு 14 நாட்களுக்கு முன் மருந்து தெளிப்பதை நிறுத்தவும்'
      ]
    },
    hi: {
      diseaseName: 'धान का झुलसा रोग / ब्लास्ट (Magnaporthe oryzae)',
      cropGuess: 'धान / चावल (Oryza sativa)',
      diseaseStage: 'गंभीर संक्रमण',
      cause: 'रात का ठंडा तापमान (18-22°C), 90% से अधिक आर्द्रता और अधिक यूरिया डालने से फैलने वाला फफूंद।',
      symptoms: [
        'पत्तियों पर आंख के आकार के धब्बे जिनका केंद्र राख के रंग का और किनारे भूरे होते हैं',
        'पत्तियां तेजी से झुलसकर सूख जाना',
        'तने की गांठों पर काला घेरा बनना'
      ],
      organicTreatment: [
        'स्यूडोमोनास फ्लोरेसेंस @ 10 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें',
        '5% नीम के बीज का अर्क छिड़कें',
        'खेत से 2 दिन के लिए पानी निकाल दें'
      ],
      chemicalTreatment: [
        'ट्राइसाइक्लाजोल 75% WP @ 0.6 ग्राम प्रति लीटर पानी',
        'आइसोप्रोपियोलेन 40% EC @ 1.5 मिली प्रति लीटर'
      ],
      recommendedFungicides: ['ट्राइसाइक्लाजोल 75 WP', 'आइसोप्रोपियोलेन 40 EC'],
      recommendedPesticides: ['नीम अर्क', 'स्यूडोमोनास'],
      ppePrecautions: ['हवा की विपरीत दिशा में छिड़काव न करें, मास्क लगाएं']
    },
    te: {
      diseaseName: 'వరి బ్లాస్ట్ తెగులు (Magnaporthe oryzae)',
      cropGuess: 'వరి (Oryza sativa)',
      diseaseStage: 'తీవ్రమైన సంక్రమణ',
      cause: 'రాత్రి వేళ చల్లని వాతావరణం, అధిక తేమ మరియు అధిక నత్రజని వాడకం వలన వ్యాపించే శిలీంధ్రం.',
      symptoms: [
        'ఆకులపై కంటి ఆకారపు బూడిద రంగు మచ్చలు',
        'మచ్చలు కలిసిపోయి ఆకులు ఎండిపోవడం',
        'కణుపుల వద్ద నల్లటి మచ్చలు ఏర్పడి విరిగిపోవడం'
      ],
      organicTreatment: [
        'సూడోమోనాస్ ఫ్లోరోసెన్స్ లీటరుకు 10 గ్రాములు పిచికారీ చేయాలి',
        '5% వేప గింజల కషాయం పిచికారీ చేయాలి'
      ],
      chemicalTreatment: [
        'ట్రైసైక్లాజోల్ 75% WP లీటరుకు 0.6 గ్రాములు',
        'ఐసోప్రోతియోలేన్ లీటరుకు 1.5 మి.లీ'
      ],
      recommendedFungicides: ['ట్రైసైక్లాజోల్ 75 WP', 'ఐసోప్రోతియోలేన్'],
      recommendedPesticides: ['వేప కషాయం'],
      ppePrecautions: ['పిచికారీ సమయంలో రక్షణ దుస్తులు ధరించండి']
    },
    kn: {
      diseaseName: 'ಭತ್ತದ ಬ್ಲಾಸ್ಟ್ ರೋಗ (Magnaporthe oryzae)',
      cropGuess: 'ಭತ್ತ (Oryza sativa)',
      diseaseStage: 'ತೀವ್ರ ಸೋಂಕು',
      cause: 'ತಂಪಾದ ವಾತಾವರಣ, ಅತಿಯಾದ ತೇವಾಂಶ ಮತ್ತು ಯೂರಿಯಾ ಬಳಕೆಯಿಂದ ಹರಡುವ ಶಿಲೀಂಧ್ರ ರೋಗ.',
      symptoms: [
        'ಎಲೆಗಳ ಮೇಲೆ ಕಣ್ಣಿನ ಆಕಾರದ ಬೂದು ಬಣ್ಣದ ಕಲೆಗಳು',
        'ಎಲೆಗಳು ಸಂಪೂರ್ಣವಾಗಿ ಒಣಗಿ ಹೋಗುವುದು',
        'ಕಾಂಡದ ಗಂಟುಗಳ ಮೇಲೆ ಕಪ್ಪು ಕಲೆಗಳು'
      ],
      organicTreatment: [
        'ಸ್ಯೂಡೋಮೊನಾಸ್ ಫ್ಲೋರೊಸೆನ್ಸ್ ಪ್ರತಿ ಲೀಟರ್‌ಗೆ 10 ಗ್ರಾಂ ಸಿಂಪಡಿಸಿ',
        '5% ಬೇವಿನ ಬೀಜದ ಕಷಾಯ ಸಿಂಪಡಿಸಿ'
      ],
      chemicalTreatment: [
        'ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ 75% WP ಪ್ರತಿ ಲೀಟರ್‌ಗೆ 0.6 ಗ್ರಾಂ',
        'ಐಸೊಪ್ರೊಥಿಯೊಲೇನ್ 40% EC ಪ್ರತಿ ಲೀಟರ್‌ಗೆ 1.5 ಮಿ.ಲೀ'
      ],
      recommendedFungicides: ['ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ 75 WP', 'ಐಸೊಪ್ರೊಥಿಯೊಲೇನ್'],
      recommendedPesticides: ['ಬೇವಿನ ಕಷಾಯ'],
      ppePrecautions: ['ಸಿಂಪಡಿಸುವಾಗ ಮಾಸ್ಕ್ ಧರಿಸಿ']
    },
    mr: {
      diseaseName: 'भातावरील ब्लास्ट / करपा रोग (Magnaporthe oryzae)',
      cropGuess: 'भात / धान (Oryza sativa)',
      diseaseStage: 'तीव्र संसर्ग',
      cause: 'थंड हवामान, हवेतील जास्त आर्द्रता आणि अतिरिक्त युरियामुळे पसरतो.',
      symptoms: [
        'पानांवर डोळ्याच्या आकाराचे राखाडी डाग',
        'पाने करपून वाळणे',
        'खोडाच्या गाठींवर काळे डाग पडणे'
      ],
      organicTreatment: [
        'स्यूडोमोनास फ्लુओरेसेन्स 10 ग्रॅम प्रति लिटर फवारावे',
        '5% निंबोळी अर्क फवारावे'
      ],
      chemicalTreatment: [
        'ट्रायसायक्लाझोल 75% WP 0.6 ग्रॅम प्रति लिटर',
        'आयसोप्रॉथिओलेन 1.5 मिली प्रति लिटर'
      ],
      recommendedFungicides: ['ट्रायसायक्लाझोल', 'आयसोप्रॉथिओलेन'],
      recommendedPesticides: ['निंबोळी अर्क'],
      ppePrecautions: ['फवारणी करताना संरक्षक किट वापरा']
    },
    bn: {
      diseaseName: 'ধানের ব্লাস্ট রোগ (Magnaporthe oryzae)',
      cropGuess: 'ধান (Oryza sativa)',
      diseaseStage: 'মারাত্মক সংক্রমণ',
      cause: 'রাতের ঠান্ডা তাপমাত্রা, অতিরিক্ত আর্দ্রতা এবং অতিরিক্ত ইউরিয়া ব্যবহারের ফলে ছত্রাক বিস্তার করে।',
      symptoms: [
        'পাতায় চোখের মতো ধূসর রঙের দাগ',
        'পাতা দ্রুত ঝলসে শুকিয়ে যাওয়া',
        'গাছের গিঁটে কালো দাগ'
      ],
      organicTreatment: [
        'সিউডোমোনাস ফ্লুরোসেন্স প্রতি লিটার জলে ১০ গ্রাম স্প্রে করুন',
        '৫% নিম বীজের নির্যাস স্প্রে করুন'
      ],
      chemicalTreatment: [
        'ট্রাইসাইক্লাজোল ৭৫% ডব্লিউপি প্রতি লিটার জলে ০.৬ গ্রাম',
        'আইসোপ্রোথিওলেন প্রতি লিটার জলে ১.৫ মিলি'
      ],
      recommendedFungicides: ['ট্রাইসাইক্লাজোল', 'আইসোপ্রোথিওলেন'],
      recommendedPesticides: ['নিম নির্যাস'],
      ppePrecautions: ['স্প্রে করার সময় মাস্ক পরুন']
    },
    gu: {
      diseaseName: 'ડાંગરનો બ્લાસ્ટ રોગ (Magnaporthe oryzae)',
      cropGuess: 'ડાંગર / ચોખા (Oryza sativa)',
      diseaseStage: 'ગંભીર ચેપ',
      cause: 'રાત્રિનું ઠંડુ તાપમાન, વધુ પડતો ભેજ અને યુરિયાના વધુ પડતા વપરાશથી ફેલાતી ફૂગ.',
      symptoms: [
        'પાંદડા પર આંખ જેવા આકારના રાખોડી ડાઘ',
        'પાંદડા ઝડપથી સુકાઈ જવા',
        'સાંધાઓ પર કાળા ડાઘ પડવા'
      ],
      organicTreatment: [
        'સ્યુડોમોનાસ ફ્લોરેસેન્સ @ ૧૦ ગ્રામ પ્રતિ લીટર છાંટવું',
        '૫% લીંબોળીનું અર્ક છાંટવું'
      ],
      chemicalTreatment: [
        'ટ્રાયસાયક્લાઝોલ ૭૫% WP @ ૦.૬ ગ્રામ પ્રતિ લીટર',
        'આઇસોપ્રોથિઓલેન @ ૧.૫ મિલી પ્રતિ લીટર'
      ],
      recommendedFungicides: ['ટ્રાયસાયક્લાઝોલ', 'આઇસોપ્રોથિઓલેન'],
      recommendedPesticides: ['લીંબોળી અર્ક'],
      ppePrecautions: ['પવનની વિરુદ્ધ દિશામાં છંટકાવ ન કરવો']
    },
    pa: {
      diseaseName: 'ਝੋਨੇ ਦਾ ਬਲਾਸਟ ਰੋਗ (Magnaporthe oryzae)',
      cropGuess: 'ਝੋਨਾ (Oryza sativa)',
      diseaseStage: 'ਗੰਭੀਰ ਸੰਕਰਮਣ',
      cause: 'ਠੰਡਾ ਤਾਪਮਾਨ, ਉੱਚ ਨਮੀ ਅਤੇ ਯੂਰੀਆ ਦੀ ਜ਼ਿਆਦਾ ਵਰਤੋਂ ਕਾਰਨ ਫੈਲਣ ਵਾਲੀ ਉੱਲੀ।',
      symptoms: [
        'ਪੱਤਿਆਂ ਤੇ ਅੱਖ ਵਰਗੇ ਸੁਆਹ ਰੰਗੇ ਧੱਬੇ',
        'ਪੱਤੇ ਪੂਰੀ ਤਰ੍ਹਾਂ ਝੁਲਸ ਜਾਣਾ',
        'ਤਣੇ ਦੀਆਂ ਗੰਢਾਂ ਕਾਲੀਆਂ ਹੋਣਾ'
      ],
      organicTreatment: [
        'ਸੂਡੋਮੋਨਾਸ ਫਲੋਰੋਸੈਂਸ @ 10 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ ਛਿੜਕੋ',
        '5% ਨਿੰਮ ਦੇ ਬੀਜਾਂ ਦਾ ਅਰਕ ਛਿੜਕੋ'
      ],
      chemicalTreatment: [
        'ਟ੍ਰਾਈਸਾਈਕਲਾਜ਼ੋਲ 75% WP @ 0.6 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ',
        'ਆਈਸੋਪ੍ਰੋਥੀਓਲੇਨ @ 1.5 ਮਿਲੀਲਿਟਰ ਪ੍ਰਤੀ ਲੀਟਰ'
      ],
      recommendedFungicides: ['ਟ੍ਰਾਈਸਾਈਕਲਾਜ਼ੋਲ', 'ਆਈਸੋਪ੍ਰੋਥੀਓਲੇਨ'],
      recommendedPesticides: ['ਨਿੰਮ ਅਰਕ'],
      ppePrecautions: ['ਛਿੜਕਾਅ ਵੇਲੇ ਮਾਸਕ ਜ਼ਰੂਰ ਪਾਓ']
    }
  },

  'Healthy Foliage': {
    en: {
      diseaseName: 'Healthy Crop Foliage (No Pathogen)',
      cropGuess: 'Optimal Canopy',
      diseaseStage: 'Optimal Vigour & Chlorophyll Density',
      cause: 'Leaves exhibit balanced chlorophyll density, strong cellular turgor, and zero fungal/bacterial necrosis.',
      symptoms: [
        'Uniform vibrant green pigmentation across all leaf veins and margins',
        'Zero necrotic lesions, fungal spots, or chlorotic yellowing observed',
        'Intact leaf cuticles with active transpiration and stomatal conductance'
      ],
      organicTreatment: [
        'Maintain balanced organic bio-fertilizer schedule (Panchagavya 3% or Jeevamrutha)',
        'Routine preventive prophylactic Neem Oil spray (3.0 ml/litre) every 21 days',
        'Apply Trichoderma viride enriched compost to root zone'
      ],
      chemicalTreatment: [
        'No chemical fungicide or pesticide required for healthy foliage.',
        'Apply water-soluble 19:19:19 NPK foliar spray (5g/L) for vegetative booster if required.'
      ],
      recommendedFungicides: [],
      recommendedPesticides: [],
      ppePrecautions: ['Standard farm safety gear.']
    },
    ta: {
      diseaseName: 'ஆரோக்கியமான பயிர் இலைகள் (நோய் தொற்று இல்லை)',
      cropGuess: 'சிறந்த ஆரோக்கியம்',
      diseaseStage: 'சிறந்த வளர்ச்சி & பச்சைய அடர்த்தி',
      cause: 'இலைகள் சீரான பச்சையம், நல்ல செல்லுலார் தடிமன் மற்றும் பூஞ்சை/பாக்டீரியா தொற்றின்றி ஆரோக்கியமாக உள்ளன.',
      symptoms: [
        'இலை நரம்புகள் மற்றும் விளிம்புகளில் சீரான அடர் பச்சை நிறம்',
        'எந்தவித கருகல் புள்ளிகள், பூஞ்சை படலங்கள் அல்லது மஞ்சள் வளையங்கள் இல்லை',
        'ஆரோக்கியமான ஒளிச்சேர்க்கை மற்றும் துளைகள் சுவாசம்'
      ],
      organicTreatment: [
        'பஞ்சகாவ்யா 3% அல்லது ஜீவாமிர்தம் தெளித்து ஊட்டச்சத்தை பராமரிக்கவும்',
        '21 நாட்களுக்கு ஒரு முறை முன்னெச்சரிக்கையாக வேப்ப எண்ணெய் (3 மி.லி/லி) தெளிக்கவும்',
        'மண்புழு உரம் அல்லது தொழுவுரத்தை வேர்ப்பகுதியில் இடவும்'
      ],
      chemicalTreatment: [
        'ஆரோக்கியமான பயிருக்கு எந்தவித ரசாயன மருந்துகளும் தேவையில்லை.',
        'வளர்ச்சி ஊக்கியாக 19:19:19 நீரில் கரையும் உரம் (லிட்டருக்கு 5 கிராம்) தேவைப்பட்டால் தெளிக்கலாம்.'
      ],
      recommendedFungicides: [],
      recommendedPesticides: [],
      ppePrecautions: ['வழக்கமான பாதுகாப்பு நடைமுறைகள்.']
    },
    hi: {
      diseaseName: 'स्वस्थ फसल पत्तियां (कोई रोग नहीं)',
      cropGuess: 'उत्कृष्ट स्वास्थ्य',
      diseaseStage: 'उत्तम विकास एवं क्लोरोफिल',
      cause: 'पत्तियां संतुलित क्लोरोफिल घनत्व और बिना किसी फफूंद/जीवाणु संक्रमण के पूरी तरह स्वस्थ हैं।',
      symptoms: [
        'पत्तियों पर एकसमान हरा रंग',
        'कोई धब्बे, झुलसा या पीलापन नहीं',
        'मजबूत और चमकदार पत्तियां'
      ],
      organicTreatment: [
        'जीवामृत या पंचगव्य का नियमित छिड़काव करें',
        'हर 21 दिन में नीम तेल (3 मिली/लीटर) का सुरक्षात्मक छिड़काव करें'
      ],
      chemicalTreatment: [
        'स्वस्थ फसल के लिए किसी रासायनिक कवकनाशी की आवश्यकता नहीं है।'
      ],
      recommendedFungicides: [],
      recommendedPesticides: [],
      ppePrecautions: ['सामान्य कृषि सुरक्षा।']
    },
    te: {
      diseaseName: 'ఆరోగ్యకరమైన పంట ఆకులు (తెగులు లేదు)',
      cropGuess: 'ఆరోగ్యకరమైన స్థితి',
      diseaseStage: 'ఉత్తమ పెరుగుదల',
      cause: 'ఆకులు ఎటువంటి శిలీంధ్ర లేదా బ్యాక్టీరియా సంక్రమణ లేకుండా ఆరోగ్యంగా ఉన్నాయి.',
      symptoms: ['ఏకరీతి పచ్చని రంగు', 'ఎటువంటి మచ్చలు లేదా పసుపు రంగు లేదు'],
      organicTreatment: ['జీవామృతం లేదా వేప నూనెను రక్షణగా పిచికారీ చేయండి'],
      chemicalTreatment: ['ఎటువంటి రసాయన మందులు అవసరం లేదు.'],
      recommendedFungicides: [],
      recommendedPesticides: [],
      ppePrecautions: ['సాధారణ భద్రత.']
    },
    kn: {
      diseaseName: 'ಆರೋಗ್ಯಕರ ಬೆಳೆ ಎಲೆಗಳು (ಯಾವುದೇ ರೋಗವಿಲ್ಲ)',
      cropGuess: 'ಉತ್ತಮ ಆರೋಗ್ಯ',
      diseaseStage: 'ಉತ್ತಮ ಬೆಳವಣಿಗೆ',
      cause: 'ಎಲೆಗಳು ಯಾವುದೇ ರೋಗವಿಲ್ಲದೆ ಆರೋಗ್ಯಕರವಾಗಿವೆ.',
      symptoms: ['ಏಕರೂಪದ ಹಸಿರು ಬಣ್ಣ', 'ಯಾವುದೇ ಕಲೆಗಳು ಅಥವಾ ಒಣಗುವಿಕೆ ಇಲ್ಲ'],
      organicTreatment: ['ಜೀವಾಮೃತ ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ'],
      chemicalTreatment: ['ಯಾವುದೇ ರಾಸಾಯನಿಕ ಔಷಧಿಯ ಅಗತ್ಯವಿಲ್ಲ.'],
      recommendedFungicides: [],
      recommendedPesticides: [],
      ppePrecautions: ['ಸಾಮಾನ್ಯ ರಕ್ಷಣೆ.']
    },
    mr: {
      diseaseName: 'निरोगी पीक पाने (कोणताही रोग नाही)',
      cropGuess: 'उत्कृष्ट आरोग्य',
      diseaseStage: 'उत्तम वाढ',
      cause: 'पाने कोणत्याही बुरशी किंवा रोगाशिवाय निरोगी आहेत.',
      symptoms: ['एकसारखा हिरवा रंग', 'कोणतेही डाग किंवा पिवळेपणा नाही'],
      organicTreatment: ['जीवामृत किंवा कडुनिंब तेलाची फवारणी करा'],
      chemicalTreatment: ['कोणत्याही रासायनिक बुरशीनाशकाची गरज नाही.'],
      recommendedFungicides: [],
      recommendedPesticides: [],
      ppePrecautions: ['सामान्य खबरदारी.']
    },
    bn: {
      diseaseName: 'স্বাস্থ্যকর পাতা (কোন রোগ নেই)',
      cropGuess: 'চমৎকার স্বাস্থ্য',
      diseaseStage: 'উত্তম বৃদ্ধি',
      cause: 'পাতা সম্পূর্ণ রোগমুক্ত এবং স্বাস্থ্যকর।',
      symptoms: ['গাঢ় সবুজ বর্ণ', 'কোন দাগ বা হলুদ ভাব নেই'],
      organicTreatment: ['জীবা মৃত বা নিম তেল স্প্রে করুন'],
      chemicalTreatment: ['কোন রাসায়নিক কীটনাশকের প্রয়োজন নেই।'],
      recommendedFungicides: [],
      recommendedPesticides: [],
      ppePrecautions: ['সাধারণ সুরক্ষা।']
    },
    gu: {
      diseaseName: 'સ્વસ્થ પાક પાંદડા (કોઈ રોગ નથી)',
      cropGuess: 'ઉત્તમ સ્વાસ્થ્ય',
      diseaseStage: 'સારો વિકાસ',
      cause: 'પાંદડા કોઈપણ રોગ વગર તંદુરસ્ત છે.',
      symptoms: ['એકસરખો લીલો રંગ', 'કોઈ ડાઘ કે પીળાશ નથી'],
      organicTreatment: ['જીવામૃત અથવા લીમડાના તેલનો છંટકாவ કરવો'],
      chemicalTreatment: ['કોઈપણ રાસાયણિક દવાની જરૂર નથી.'],
      recommendedFungicides: [],
      recommendedPesticides: [],
      ppePrecautions: ['સામાન્ય સલામતી.']
    },
    pa: {
      diseaseName: 'ਤੰਦਰੁਸਤ ਫਸਲ ਦੇ ਪੱਤੇ (ਕੋਈ ਬਿਮਾਰੀ ਨਹੀਂ)',
      cropGuess: 'ਉੱਤਮ ਸਿਹਤ',
      diseaseStage: 'ਵਧੀਆ ਵਿਕਾਸ',
      cause: 'ਪੱਤੇ ਬਿਮਾਰੀ ਰਹਿਤ ਅਤੇ ਤੰਦਰੁਸਤ ਹਨ।',
      symptoms: ['ਇਕਸਾਰ ਹਰਾ ਰੰਗ', 'ਕੋਈ ਧੱਬਾ ਜਾਂ ਪੀਲਾਪਣ ਨਹੀਂ'],
      organicTreatment: ['ਜੀਵਾਮ੍ਰਿਤ ਜਾਂ ਨੀਮ ਤੇਲ ਦਾ ਛਿੜਕਾਅ ਕਰੋ'],
      chemicalTreatment: ['ਕਿਸੇ ਰਸਾਇਣਕ ਦਵਾਈ ਦੀ ਲੋੜ ਨਹੀਂ।'],
      recommendedFungicides: [],
      recommendedPesticides: [],
      ppePrecautions: ['ਆਮ ਸੁਰੱਖਿਆ।']
    }
  }
};

/**
 * Returns a dynamically localized version of any disease detection result.
 */
export function getLocalizedDiseaseDiagnostic(
  diagnostic: DiseaseDetectionResult,
  lang: SupportedLang
): DiseaseDetectionResult {
  if (!diagnostic) return diagnostic;

  // Identify matching disease entry
  let matchedKey = 'Tomato Early Blight';
  if (diagnostic.isHealthy || diagnostic.diseaseName?.toLowerCase().includes('healthy')) {
    matchedKey = 'Healthy Foliage';
  } else if (diagnostic.diseaseName?.toLowerCase().includes('blast') || diagnostic.cropGuess?.toLowerCase().includes('rice') || diagnostic.cropGuess?.toLowerCase().includes('paddy')) {
    matchedKey = 'Rice Blast';
  } else {
    matchedKey = 'Tomato Early Blight';
  }

  const translationsForDisease = DISEASE_TRANSLATIONS[matchedKey];
  const localizedData = (translationsForDisease && translationsForDisease[lang]) || translationsForDisease?.en;

  if (!localizedData) return diagnostic;

  return {
    ...diagnostic,
    diseaseName: localizedData.diseaseName,
    cropGuess: localizedData.cropGuess,
    diseaseStage: localizedData.diseaseStage,
    cause: localizedData.cause,
    symptoms: localizedData.symptoms,
    organicTreatment: localizedData.organicTreatment,
    chemicalTreatment: localizedData.chemicalTreatment,
    recommendedFungicides: localizedData.recommendedFungicides,
    recommendedPesticides: localizedData.recommendedPesticides,
    ppePrecautions: localizedData.ppePrecautions || diagnostic.ppePrecautions,
  };
}
