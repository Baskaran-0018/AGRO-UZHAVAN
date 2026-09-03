import { SupportedLang, TRANSLATIONS } from './i18n';

/**
 * Universal Dynamic Localization Helper
 * Translates dynamic strings, weather descriptions, headlines, advisory points,
 * farm names, and roles into the active selected language.
 */

const ROLE_MAP: Record<string, Record<SupportedLang, string>> = {
  Farmer: {
    en: 'Farmer',
    ta: 'விவசாயி',
    hi: 'किसान',
    te: 'రైతు',
    kn: 'ರೈತ',
    mr: 'शेतकरी',
    bn: 'কৃষক',
    gu: 'ખેડૂત',
    pa: 'ਕਿਸਾਨ',
  },
  Agronomist: {
    en: 'Agronomist',
    ta: 'வேளாண் விஞ்ஞானி',
    hi: 'कृषि विज्ञानी',
    te: 'వ్యవసాయ నిపుణుడు',
    kn: 'ಕೃಷಿ ತಜ್ಞ',
    mr: 'कृषी शास्त्रज्ञ',
    bn: 'কৃষিবিদ',
    gu: 'કૃષિ નિષ્ણાત',
    pa: 'ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀ',
  },
  'Farm Manager': {
    en: 'Farm Manager',
    ta: 'பண்ணை மேலாளர்',
    hi: 'फार्म प्रबंधक',
    te: 'వ్యవసాయ నిర్వాహకుడు',
    kn: 'ತೋಟದ ವ್ಯವಸ್ಥಾಪಕ',
    mr: 'शेत व्यवस्थापक',
    bn: 'খামার ব্যবস্থাপক',
    gu: 'ફાર્મ મેનેજર',
    pa: 'ਫਾਰਮ ਮੈਨੇਜਰ',
  },
  Researcher: {
    en: 'Agricultural Scientist',
    ta: 'விவசாய ஆராய்ச்சியாளர்',
    hi: 'कृषि शोधकर्ता',
    te: 'వ్యవసాయ పరిశోధకుడు',
    kn: 'ಕೃಷಿ ಸಂಶೋಧಕ',
    mr: 'कृषी संशोधक',
    bn: 'কৃষি গবেষক',
    gu: 'કૃષિ સંશોધક',
    pa: 'ਖੇਤੀਬਾੜੀ ਖੋਜੀ',
  },
};

const COMMON_STRINGS: Record<string, Record<SupportedLang, string>> = {
  'Atmospheric metrics are favorable for active photosynthesis and field irrigation.': {
    en: 'Atmospheric metrics are favorable for active photosynthesis and field irrigation.',
    ta: 'வளிமண்டல அளவீடுகள் தீவிர ஒளிச்சேர்க்கை மற்றும் பாசனத்திற்கு மிகவும் சாதகமாக உள்ளன.',
    hi: 'वायुमंडलीय संकेतक सक्रिय प्रकाश संश्लेषण और खेत की सिंचाई के लिए अनुकूल हैं।',
    te: 'కిరణజన్య సంయోగక్రియ మరియు క్షేత్ర నీటిపారుదలకు వాతావరణ పరిస్థితులు అనుకూలంగా ఉన్నాయి.',
    kn: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಮತ್ತು ಹೊಲದ ನೀರಾವರಿಗೆ ವಾತಾವರಣದ ಮಾಪನಗಳು ಅನುಕೂಲಕರವಾಗಿವೆ.',
    mr: 'प्रकाशसंश्लेषण आणि शेतातील सिंचनासाठी हवामानाचे घटक अत्यंत अनुकूल आहेत.',
    bn: 'সালোকসংশ্লেষণ এবং ক্ষেতে সেচের জন্য বায়ুমণ্ডলীয় অবস্থা অনুকূল রয়েছে।',
    gu: 'પ્રકાશસંશ્લેષણ અને ખેતરમાં પિયત માટે વાતાવરણીય સ્થિતિ અનુકૂળ છે.',
    pa: 'ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ ਅਤੇ ਖੇਤ ਦੀ ਸਿੰਚਾਈ ਲਈ ਵਾਯੂਮੰਡਲ ਦੇ ਮਾਪਦੰਡ ਅਨੁਕੂਲ ਹਨ।',
  },
  'Optimal Farm Climate Conditions': {
    en: 'Optimal Farm Climate Conditions',
    ta: 'பண்ணைக்கான மிகச் சிறந்த வானிலை சூழல்',
    hi: 'उत्तम कृषि जलवायु परिस्थितियाँ',
    te: 'అనుకూలమైన వ్యవసాయ వాతావరణ పరిస్థితులు',
    kn: 'ಅತ್ಯುತ್ತಮ ಕೃಷಿ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು',
    mr: 'उत्कृष्ट कृषी हवामान परिस्थिती',
    bn: 'অনুকূল কৃষি আবহাওয়া পরিস্থিতি',
    gu: 'ઉત્તમ કૃષિ આબોહવાની સ્થિતિ',
    pa: 'ਅਨੁਕੂਲ ਖੇਤੀ ਮੌਸਮ ਦੀਆਂ ਸਥਿਤੀਆਂ',
  },
  'Irrigate during early morning hours to minimize evaporative losses.': {
    en: 'Irrigate during early morning hours to minimize evaporative losses.',
    ta: 'ஆவியாதல் இழப்பைக் குறைக்க அதிகாலை வேளையில் பாசனம் செய்யவும்.',
    hi: 'वाष्पीकरण नुकसान को कम करने के लिए सुबह के समय सिंचाई करें।',
    te: 'భాష్పోత్సేక నష్టాన్ని తగ్గించడానికి తెల్లవారుజామున నీరు పెట్టండి.',
    kn: 'ಆವಿಯಾಗುವ ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮುಂಜಾನೆ ಸಮಯದಲ್ಲಿ ನೀರಾವರಿ ಮಾಡಿ.',
    mr: 'बाष्पीभवनाचे नुकसान कमी करण्यासाठी पहाटेच्या वेळी पाणी द्या.',
    bn: 'বাষ্পীভবন কমাতে ভোরবেলা জমিতে সেচ প্রদান করুন।',
    gu: 'બાષ્પીભવનનું નુકસાન ઘટાડવા માટે વહેલી સવારે પિયત આપો.',
    pa: 'ਵਾਸ਼ਪੀਕਰਨ ਦੇ ਨੁਕਸਾਨ ਨੂੰ ਘਟਾਉਣ ਲਈ ਤੜਕੇ ਸਵੇਰੇ ਸਿੰਚਾਈ ਕਰੋ।',
  },
  'Schedule fertilizer application according to current growth phase.': {
    en: 'Schedule fertilizer application according to current growth phase.',
    ta: 'தற்போதைய பயிர் வளர்ச்சி நிலைக்கு ஏற்ப உரமிடுதலை திட்டமிடுங்கள்.',
    hi: 'वर्तमान फसल वृद्धि चरण के अनुसार उर्वरक प्रयोग का समय निर्धारित करें।',
    te: 'ప్రస్తుత పంట పెరుగుదల దశ ప్రకారం ఎరువుల వేతను నిర్ణయించండి.',
    kn: 'ಪ್ರಸ್ತುತ ಬೆಳೆಯ ಬೆಳವಣಿಗೆಯ ಹಂತಕ್ಕೆ ತಕ್ಕಂತೆ ರಸಗೊಬ್ಬರ ಬಳಕೆಯನ್ನು ನಿಗದಿಪಡಿಸಿ.',
    mr: 'पिकाच्या सद्य वाढीच्या अवस्थेनुसार खत देण्याचे नियोजन करा.',
    bn: 'বর্তমান ফসলের বৃদ্ধির পর্যায় অনুযায়ী সার প্রয়োগের সময়সূচী নির্ধারণ করুন।',
    gu: 'પાકના વર્તમાન વિકાસ તબક્કા મુજબ ખાતર આપવાનું આયોજન કરો.',
    pa: 'ਮੌਜੂਦਾ ਫਸਲ ਵਾਧੇ ਦੇ ਪੜਾਅ ਅਨੁਸਾਰ ਖਾਦ ਪਾਉਣ ਦਾ ਸਮਾਂ ਤੈਅ ਕਰੋ।',
  },
  'Perform routine foliar canopy checks for early pest signals.': {
    en: 'Perform routine foliar canopy checks for early pest signals.',
    ta: 'ஆரம்ப பூச்சி அறிகுறிகளைக் கண்டறிய பயிர் இலைகளை வழக்கமாக ஆய்வு செய்யவும்.',
    hi: 'शुरुआती कीट संकेतों की पहचान के लिए पत्तियों और पौधों की नियमित जांच करें।',
    te: 'ప్రారంభ తెగులు సంకేతాలను గుర్తించడానికి ఆకుల పైకప్పును క్రమం తప్పకుండా తనిఖీ చేయండి.',
    kn: 'ಆರಂಭಿಕ ಕೀಟ ಬಾಧೆ ಗುರುತಿಸಲು ಎಲೆಗಳ ಮೇಲ್ಭಾಗವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.',
    mr: 'कीड प्रादुर्भावाची प्राथमिक लक्षणे तपासण्यासाठी पानांची नियमित पाहणी करा.',
    bn: 'প্রাথমিক পোকার আক্রমণ শনাক্ত করতে নিয়মিত পাতার স্বাস্থ্য পরীক্ষা করুন।',
    gu: 'શરૂઆતી જીવાત ચિહ્નો ઓળખવા માટે પાંદડાઓની નિયમિત તપાસ કરો.',
    pa: 'ਸ਼ੁਰੂਆਤੀ ਕੀੜਿਆਂ ਦੇ ਲੱਛਣਾਂ ਦੀ ਪਛਾਣ ਲਈ ਪੱਤਿਆਂ ਦੀ ਨਿਯਮਤ ਜਾਂਚ ਕਰੋ।',
  },
  'Ensure proper drainage channels across lower quadrant zones.': {
    en: 'Ensure proper drainage channels across lower quadrant zones.',
    ta: 'பண்ணையின் தாழ்வான பகுதிகளில் சரியான வடிகால் வசதியை உறுதி செய்யவும்.',
    hi: 'निचले क्षेत्रों में उचित जल निकासी चैनलों की व्यवस्था सुनिश्चित करें।',
    te: 'పల్లపు ప్రాంతాలలో సరైన నీటి పారుదల కాలువలను నిర్ధారించండి.',
    kn: 'ತಗ್ಗು ಪ್ರದೇಶಗಳಲ್ಲಿ ಸರಿಯಾದ ನೀರು ಹರಿದುಹೋಗುವ ಚರಂಡಿಗಳನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
    mr: 'सखल भागांमध्ये योग्य निचरा व्यवस्था असल्याची खात्री करा.',
    bn: 'নিচু এলাকায় যথাযথ জল নিষ্কাশন নালা নিশ্চিত করুন।',
    gu: 'નીચાણવાળા વિસ્તારોમાં પાણીના યોગ્ય નિકાલની વ્યવસ્થા સુનિશ્ચિત કરો.',
    pa: 'ਹੇਠਲੇ ਖੇਤਰਾਂ ਵਿੱਚ ਪਾਣੀ ਦੇ ਸਹੀ ਨਿਕਾਸ ਦੇ ਪ੍ਰਬੰਧ ਨੂੰ ਯਕੀਨੀ ਬਣਾਓ।',
  },
  'Primary Farm Estate': {
    en: 'Primary Farm Estate',
    ta: 'முதன்மை பண்ணை தோட்டம்',
    hi: 'मुख्य कृषि फार्म',
    te: 'ప్రధాన వ్యవసాయ ఎస్టేట్',
    kn: 'ಮುಖ್ಯ ಕೃಷಿ ಎಸ್ಟೇಟ್',
    mr: 'मुख्य शेती इस्टेट',
    bn: 'প্রধান কৃষি খামার',
    gu: 'મુખ્ય ફાર્મ એસ્ટેટ',
    pa: 'ਮੁੱਖ ਖੇਤ ਅਸਟੇਟ',
  },
  'Ludhiana, Punjab, India': {
    en: 'Ludhiana, Punjab, India',
    ta: 'லூதியானா, பஞ்சாப், இந்தியா',
    hi: 'लुधियाना, पंजाब, भारत',
    te: 'లూధియానా, పంజాబ్, భారతదేశం',
    kn: 'ಲೂಧಿಯಾನ, ಪಂಜಾಬ್, ಭಾರತ',
    mr: 'लुधियाना, पंजाब, भारत',
    bn: 'লুধিয়ানা, পাঞ্জাব, ভারত',
    gu: 'લુધિયાણા, પંજાબ, ભારત',
    pa: 'ਲੁਧਿਆਣਾ, ਪੰਜਾਬ, ਭਾਰਤ',
  },
  Index: {
    en: 'Index',
    ta: 'குறியீடு',
    hi: 'सूचकांक',
    te: 'సూచిక',
    kn: 'ಸೂಚ್ಯಂಕ',
    mr: 'निर्देशांक',
    bn: 'সূচক',
    gu: 'ઇન્ડેક્સ',
    pa: 'ਸੂਚਕਾਂਕ',
  },
  Target: {
    en: 'Target',
    ta: 'இலக்கு',
    hi: 'लक्ष्य',
    te: 'లక్ష్యం',
    kn: 'ಗುರಿ',
    mr: 'लक्ष्य',
    bn: 'লক্ষ্যমাত্রা',
    gu: 'લક્ષ્ય',
    pa: 'ਨਿਸ਼ਾਨਾ',
  },
  Optimal: {
    en: 'Optimal',
    ta: 'மிகச் சிறந்தது',
    hi: 'उत्तम',
    te: 'అనుకూలమైనది',
    kn: 'ಉತ್ತಮ',
    mr: 'उत्तम',
    bn: 'সর্বোত্তম',
    gu: 'શ્રેષ્ઠ',
    pa: 'ਸਭ ਤੋਂ ਵਧੀਆ',
  },
  Caution: {
    en: 'Caution',
    ta: 'எச்சரிக்கை',
    hi: 'सावधानी',
    te: 'హెచ్చరిక',
    kn: 'ಎಚ್ಚರಿಕೆ',
    mr: 'सावधानता',
    bn: 'সতর্কতা',
    gu: 'સાવધાની',
    pa: 'ਸਾਵਧਾਨੀ',
  },
  Unfavorable: {
    en: 'Unfavorable',
    ta: 'சாதகமற்றது',
    hi: 'प्रतिकूल',
    te: 'ప్రతికూలమైనది',
    kn: 'ಅನನುಕೂಲ',
    mr: 'प्रतिकूल',
    bn: 'প্রতিকূল',
    gu: 'પ્રતિકૂળ',
    pa: 'ਪ੍ਰਤੀਕੂਲ',
  },
  Clear: {
    en: 'Clear Sky',
    ta: 'தெளிவான வானிலை',
    hi: 'साफ मौसम',
    te: 'నిర్మలమైన ఆకాశం',
    kn: 'ಸ್ವಚ್ಛ ಆಕಾಶ',
    mr: 'निरभ्र आकाश',
    bn: 'পরিষ্কার আকাশ',
    gu: 'ચોખ્ખું આકાશ',
    pa: 'ਸਾਫ਼ ਅਸਮਾਨ',
  },
  Rain: {
    en: 'Rainfall',
    ta: 'மழைப்பொழிவு',
    hi: 'वर्षा',
    te: 'వర్షం',
    kn: 'ಮಳೆ',
    mr: 'पाऊस',
    bn: 'বৃষ্টিপাত',
    gu: 'વરસાદ',
    pa: 'ਮੀਂਹ',
  },
};

/**
 * Translates any common or dynamic text string into the active language
 */
export function translateText(text: string | undefined | null, lang: SupportedLang): string {
  if (!text) return '';
  const trimmed = text.trim();

  // 1. Direct match in COMMON_STRINGS
  if (COMMON_STRINGS[trimmed] && COMMON_STRINGS[trimmed][lang]) {
    return COMMON_STRINGS[trimmed][lang];
  }

  // 2. Partial match in COMMON_STRINGS
  for (const [key, translations] of Object.entries(COMMON_STRINGS)) {
    if (trimmed.toLowerCase() === key.toLowerCase() || trimmed.includes(key)) {
      if (translations[lang]) return translations[lang];
    }
  }

  // 3. Check TRANSLATIONS dictionary
  const dict = TRANSLATIONS[lang];
  if (dict) {
    for (const [k, val] of Object.entries(TRANSLATIONS.en)) {
      if (val.toLowerCase() === trimmed.toLowerCase()) {
        if (dict[k]) return dict[k];
      }
    }
  }

  return text;
}

/**
 * Translates a user's displayed display name and role into the active language
 */
export function getLocalizedUserName(name: string | undefined, lang: SupportedLang): string {
  if (!name) return '';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  if (name.startsWith('Farmer (')) {
    const numPart = name.replace('Farmer', '').trim();
    return `${t.farmer || 'Farmer'} ${numPart}`;
  }
  if (name === 'Farmer' || name === 'Farmer Member') {
    return t.farmer || 'Farmer';
  }
  return name;
}

/**
 * Translates a role (e.g. Farmer, Agronomist) into the active language
 */
export function getLocalizedRole(role: string | undefined, lang: SupportedLang): string {
  if (!role) return '';
  if (ROLE_MAP[role] && ROLE_MAP[role][lang]) {
    return ROLE_MAP[role][lang];
  }
  return role;
}

/**
 * Translates a farm's name into the active language
 */
export function getLocalizedFarmName(name: string | undefined, lang: SupportedLang): string {
  if (!name) return '';
  if (COMMON_STRINGS[name] && COMMON_STRINGS[name][lang]) {
    return COMMON_STRINGS[name][lang];
  }
  return name;
}

/**
 * Translates a farm's location into the active language
 */
export function getLocalizedLocation(loc: string | undefined, lang: SupportedLang): string {
  if (!loc) return '';
  if (COMMON_STRINGS[loc] && COMMON_STRINGS[loc][lang]) {
    return COMMON_STRINGS[loc][lang];
  }
  return loc;
}
