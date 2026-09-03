import { SupportedLang, TRANSLATIONS } from './i18n';

/**
 * Universal Dynamic Localization Helper
 * Translates dynamic strings, weather descriptions, headlines, advisory points,
 * farm names, soil types, irrigation methods, crops, growth stages, and roles into the active selected language.
 */

export const ROLE_MAP: Record<string, Record<SupportedLang, string>> = {
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
  'Guest Farmer': {
    en: 'Guest Farmer',
    ta: 'விருந்தினர் விவசாயி',
    hi: 'अतिथि किसान',
    te: 'అతిథి రైతు',
    kn: 'ಅತಿಥಿ ರೈತ',
    mr: 'अतिथी शेतकरी',
    bn: 'অতিথি কৃষক',
    gu: 'અતિથિ ખેડૂત',
    pa: 'ਮਹਿਮਾਨ ਕਿਸਾਨ',
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

export const SOIL_MAP: Record<string, Record<SupportedLang, string>> = {
  Alluvial: {
    en: 'Alluvial',
    ta: 'வண்டல் மண்',
    hi: 'जलोढ़ मिट्टी',
    te: 'ఒండ్రు నేల',
    kn: 'ಮೆಕ್ಕಲು ಮಣ್ಣು',
    mr: 'गाळाची माती',
    bn: 'পলি মাটি',
    gu: 'કાંપવાળી જમીન',
    pa: 'ਜਲੋੜ ਮਿੱਟੀ',
  },
  'Black (Regur)': {
    en: 'Black (Regur)',
    ta: 'கரிசல் மண் (ரெகுர்)',
    hi: 'काली कपास मिट्टी (रेगुर)',
    te: 'నల్ల రేగడి నేల',
    kn: 'ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು (ರೆಗೂರ್)',
    mr: 'काळी कापशी माती (रेगूर)',
    bn: 'কালো রেগুর মাটি',
    gu: 'કાળી કપાસની જમીન',
    pa: 'ਕਾਲੀ ਕਪਾਹ ਵਾਲੀ ਮਿੱਟੀ (ਰੇਗੁਰ)',
  },
  'Black Cotton': {
    en: 'Black Cotton',
    ta: 'கரிசல் மண்',
    hi: 'काली मिट्टी',
    te: 'నల్లరేగడి నేల',
    kn: 'ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು',
    mr: 'काळी माती',
    bn: 'কালো মাটি',
    gu: 'કાળી જમીન',
    pa: 'ਕਾਲੀ ਮਿੱਟੀ',
  },
  'Red & Yellow': {
    en: 'Red & Yellow',
    ta: 'செம்மண் & மஞ்சள் மண்',
    hi: 'लाल और पीली मिट्टी',
    te: 'ఎర్ర & పసుపు నేల',
    kn: 'ಕೆಂಪು ಮತ್ತು ಹಳದಿ ಮಣ್ಣು',
    mr: 'तांबडी आणि पिवळी माती',
    bn: 'লাল ও হলুদ মাটি',
    gu: 'લાલ અને પીળી જમીન',
    pa: 'ਲਾਲ ਅਤੇ ਪੀਲੀ ਮਿੱਟੀ',
  },
  Laterite: {
    en: 'Laterite',
    ta: 'சரளை மண்',
    hi: 'लेटराइट मिट्टी',
    te: 'లేటరైట్ నేల',
    kn: 'ಜಂಬಿಟ್ಟಿಗೆ ಮಣ್ಣು',
    mr: 'जांभी माती',
    bn: 'ল্যাটেরাইট মাটি',
    gu: 'લેટેરાઇટ જમીન',
    pa: 'ਲੈਟਰਾਈਟ ਮਿੱਟੀ',
  },
  'Red Laterite': {
    en: 'Red Laterite',
    ta: 'செம்மண் / சரளை மண்',
    hi: 'लाल लेटराइट मिट्टी',
    te: 'ఎర్ర లేటరైట్ నేల',
    kn: 'ಕೆಂಪು ಜಂಬಿಟ್ಟಿಗೆ ಮಣ್ಣು',
    mr: 'जांभी माती (तांबडी)',
    bn: 'লাল ল্যাটেরাইট মাটি',
    gu: 'લાલ લેટેરાઇટ જમીન',
    pa: 'ਲਾਲ ਲੈਟਰਾਈਟ ਮਿੱਟੀ',
  },
  'Sandy Loam': {
    en: 'Sandy Loam',
    ta: 'மணல் கலந்த வண்டல் மண்',
    hi: 'बलुई दोमट मिट्टी',
    te: 'ఇసుకతో కూడిన ఒండ్రు నేల',
    kn: 'ಮರಳು ಮಿಶ್ರಿತ ಲೋಮ್',
    mr: 'वालुकामय पोयटा',
    bn: 'বেলে দোআঁশ',
    gu: 'રેતાળ ગોરાડુ જમીન',
    pa: 'ਰੇਤਲੀ ਦੋਮਟ ਮਿੱਟੀ',
  },
  Clayey: {
    en: 'Clayey',
    ta: 'களிமண்',
    hi: 'चिकनी मिट्टी',
    te: 'బంకమట్టి నేల',
    kn: 'ಜೇಡಿಮಣ್ಣು',
    mr: 'चिकणमाती',
    bn: 'এঁটেল মাটি',
    gu: 'ચીકણી જમીન',
    pa: 'ਚੀਕਣੀ ਮਿੱਟੀ',
  },
  'Clay Loam': {
    en: 'Clay Loam',
    ta: 'களிமண் கலந்த வண்டல்',
    hi: 'चिकनी दोमट मिट्टी',
    te: 'బంకమట్టి నేల',
    kn: 'ಜೇಡಿಮಣ್ಣು ಲೋಮ್',
    mr: 'चिकणमाती',
    bn: 'এঁটেল দোআঁশ',
    gu: 'ચીકણી ગોરાડુ જમીન',
    pa: 'ਚੀਕਣੀ ਦੋਮਟ ਮਿੱਟੀ',
  },
  Loamy: {
    en: 'Loamy',
    ta: 'வண்டல் கலந்த மண்',
    hi: 'दोमट मिट्टी',
    te: 'గడ్డి నేల (లోమీ)',
    kn: 'ಲೋಮಿ ಮಣ್ಣು',
    mr: 'पोयटा माती',
    bn: 'দোআঁশ মাটি',
    gu: 'ગોરાડુ જમીન',
    pa: 'ਦੋਮਟ ਮਿੱਟੀ',
  },
  'Saline/Alkaline': {
    en: 'Saline/Alkaline',
    ta: 'உவர் மண் / கார மண்',
    hi: 'लवणीय / क्षारीय मिट्टी',
    te: 'సౌడు / క్షార నేల',
    kn: 'ಕ್ಷಾರೀಯ ಮಣ್ಣು',
    mr: 'खारवट / चोपण जमीन',
    bn: 'লবণাক্ত / ক্ষারীয় মাটি',
    gu: 'ક્ષારવાળી / ભાસ્મિક જમીન',
    pa: 'ਖਾਰੀ ਮਿੱਟੀ',
  },
  Saline: {
    en: 'Saline Alkaline Soil',
    ta: 'உவர் மண்',
    hi: 'लवणीय क्षारीय मिट्टी',
    te: 'ఉప్పు నేల',
    kn: 'ಕ್ಷಾರೀಯ ಮಣ್ಣು',
    mr: 'खारवट जमीन',
    bn: 'লবণাক্ত ক্ষারীয় মাটি',
    gu: 'ક્ષારવાળી જમીન',
    pa: 'ਖਾਰੀ ਮਿੱਟੀ',
  },
  Peaty: {
    en: 'Peaty Organic Soil',
    ta: 'கரிம மண்',
    hi: 'पीट जैविक मिट्टी',
    te: 'పీట్ సేంద్రీయ నేల',
    kn: 'ಪೀಟ್ ಸಾವಯವ ಮಣ್ಣು',
    mr: 'सेंद्रिय माती',
    bn: 'পিট জৈব মাটি',
    gu: 'પીટ સેન્દ્રિય જમીન',
    pa: 'ਪੀਟ ਜੈਵਿਕ ਮਿੱਟੀ',
  },
  Silt: {
    en: 'Silt Loam',
    ta: 'வண்டல் சகதி மண்',
    hi: 'गाद दोमट मिट्टी',
    te: 'సిల్ట్ నేల',
    kn: 'ಹೂಳು ಮಣ್ಣು',
    mr: 'गाळाची बारीक माती',
    bn: 'পলিমাটি',
    gu: 'કાંપવાળી જમીન',
    pa: 'ਸਿਲਟ ਦੋਮਟ ਮਿੱਟੀ',
  },
};

export const IRRIGATION_MAP: Record<string, Record<SupportedLang, string>> = {
  Drip: {
    en: 'Drip',
    ta: 'சொட்டுநீர்',
    hi: 'ड्रिप',
    te: 'బిందు సేద్యం (డ్రిప్)',
    kn: 'ಹನಿ ನೀರಾವರಿ',
    mr: 'ठिबक सिंचन',
    bn: 'ড্রিপ সেচ',
    gu: 'ટપક પિયત',
    pa: 'ਤਿੱਪ-ਤਿੱਪ ਸਿੰਚਾਈ (ਡਰਿੱਪ)',
  },
  'Drip Irrigation': {
    en: 'Drip Irrigation',
    ta: 'சொட்டுநீர் பாசனம்',
    hi: 'ड्रिप सिंचाई',
    te: 'బిందు సేద్యం',
    kn: 'ಹನಿ ನೀರಾವರಿ',
    mr: 'ठिबक सिंचन',
    bn: 'ড্রিপ সেচ',
    gu: 'ટપક પિયત પદ્ધતિ',
    pa: 'ਡਰਿੱਪ ਸਿੰਚਾਈ',
  },
  'Drip Fertigation (Micro-Irrigation)': {
    en: 'Drip Fertigation (Micro-Irrigation)',
    ta: 'சொட்டுநீர் உரப்பாசனம்',
    hi: 'ड्रिप फर्टिगेशन (सूक्ष्म सिंचाई)',
    te: 'బిందు సేద్యపు ఎరువుల విధానం',
    kn: 'ಹನಿ ನೀರಾವರಿ ಫರ್ಟಿಗೇಷನ್',
    mr: 'ठिबक खत सिंचन',
    bn: 'ড্রিপ ফার্টিগেশন',
    gu: 'ટપક ફર્ટિગેશન પદ્ધતિ',
    pa: 'ਡਰਿੱਪ ਫਰਟੀਗੇਸ਼ਨ',
  },
  Sprinkler: {
    en: 'Sprinkler',
    ta: 'தெளிப்பு நீர்',
    hi: 'फव्वारा',
    te: 'తుంపర సేద్యం',
    kn: 'ತುಂತುರು ನೀರಾವರಿ',
    mr: 'तुषार सिंचन',
    bn: 'স্প্রিংকলার',
    gu: 'ફુવારા પદ્ધતિ',
    pa: 'ਫੁਹਾਰਾ ਸਿੰਚਾਈ',
  },
  'Overhead Sprinkler System': {
    en: 'Overhead Sprinkler System',
    ta: 'தெளிப்பு நீர் பாசன அமைப்பு',
    hi: 'ओवरहेड फव्वारा प्रणाली',
    te: 'తుంపర సేద్య వ్యవస్థ',
    kn: 'ತುಂತುರು ನೀರಾವರಿ ವ್ಯವಸ್ಥೆ',
    mr: 'तुषार सिंचन यंत्रणा',
    bn: 'স্প্রিংকলার সেচ ব্যবস্থা',
    gu: 'ફુવારા પિયત પદ્ધતિ',
    pa: 'ਓਵਰਹੈੱਡ ਫੁਹਾਰਾ ਪ੍ਰਣਾਲੀ',
  },
  'Canal/Flood': {
    en: 'Canal / Flood',
    ta: 'கால்வாய் / பாத்தி பாசனம்',
    hi: 'नहर / बाढ़ सिंचाई',
    te: 'కాలువ పారుదల',
    kn: 'ಕಾಲುವೆ ನೀರಾವರಿ',
    mr: 'कालवा / पाटपाणी',
    bn: 'খাল / প্লাবন সেচ',
    gu: 'નહેર / ધોરિયા પિયત',
    pa: 'ਨਹਿਰੀ / ਖਾਲੀ ਸਿੰਚਾਈ',
  },
  'Canal / Surface Flood Irrigation': {
    en: 'Canal / Surface Flood Irrigation',
    ta: 'கால்வாய் / பாத்தி பாசனம்',
    hi: 'नहर / सतह बाढ़ सिंचाई',
    te: 'కాలువ / ఉపరితల వరద పారుదల',
    kn: 'ಕಾಲುವೆ / ಹರಿವು ನೀರಾವರಿ',
    mr: 'कालवा / पृष्ठभाग पाटपाणी',
    bn: 'খাল / ভূপৃষ্ঠ প্লাবন সেচ',
    gu: 'નહેર / સપાટી પિયત પદ્ધતિ',
    pa: 'ਨਹਿਰੀ / ਸਤਹੀ ਸਿੰਚਾਈ',
  },
  Flood: {
    en: 'Flood Irrigation',
    ta: 'பாத்தி பாசனம்',
    hi: 'बाढ़ सिंचाई',
    te: 'కాలువ పారుదల',
    kn: 'ಕಾಲುವೆ ನೀರಾವರಿ',
    mr: 'पाटपाणी सिंचन',
    bn: 'প্লাবন সেচ',
    gu: 'ધોરિયા પિયત',
    pa: 'ਖਾਲੀ ਰਾਹੀਂ ਸਿੰਚਾਈ',
  },
  Rainfed: {
    en: 'Rainfed',
    ta: 'மானாவாரி',
    hi: 'वर्षा आधारित (बारानी)',
    te: 'వర్షాధార',
    kn: 'ಮಳೆಯಾಶ್ರಿತ',
    mr: 'जिरायती (पावसावर आधारित)',
    bn: 'বৃষ্টি নির্ভর',
    gu: 'વરસાદ આધારિત',
    pa: 'ਮੀਂਹ ਆਧਾਰਿਤ (ਬਾਰਾਨੀ)',
  },
  'Rainfed (Dryland Agriculture)': {
    en: 'Rainfed (Dryland Agriculture)',
    ta: 'மானாவாரி (மழைநீர் வேளாண்மை)',
    hi: 'वर्षा आधारित (शुष्क कृषि)',
    te: 'వర్షాధార పంట (మెట్ట వ్యవసాయం)',
    kn: 'ಮಳೆಯಾಶ್ರಿತ ಒಣಭೂಮಿ ಕೃಷಿ',
    mr: 'कोरडवाहू शेती',
    bn: 'বৃষ্টি নির্ভর চাষাবাদ',
    gu: 'વરસાદ આધારિત સૂકી ખેતી',
    pa: 'ਮੀਂਹ ਆਧਾਰਿਤ ਸੁੱਕੀ ਖੇਤੀ',
  },
  Pivot: {
    en: 'Center Pivot',
    ta: 'சுழல் பாசனம்',
    hi: 'सेंटर पिवट',
    te: 'సెంటర్ పివోట్',
    kn: 'ಸೆಂಟರ್ ಪಿವೋಟ್',
    mr: 'सेंटर पिव्होट',
    bn: 'সেন্টার পিভট',
    gu: 'સેન્ટર પિવોટ',
    pa: 'ਸੈਂਟਰ ਪਿਵਟ',
  },
  'Center Pivot System': {
    en: 'Center Pivot System',
    ta: 'சுழல் பாசன அமைப்பு',
    hi: 'सेंटर पिवट प्रणाली',
    te: 'సెంటర్ పివోట్ వ్యవస్థ',
    kn: 'ಸೆಂಟರ್ ಪಿವೋಟ್ ವ್ಯವಸ್ಥೆ',
    mr: 'सेंटर पिव्होट यंत्रणा',
    bn: 'সেন্টার পিভট ব্যবস্থা',
    gu: 'સેન્ટર પિવોટ સિસ્ટમ',
    pa: 'ਸੈਂਟਰ ਪਿਵਟ ਪ੍ਰਣਾਲੀ',
  },
  Borewell: {
    en: 'Borewell & Drip Irrigation',
    ta: 'ஆழ்துளை கிணறு & சொட்டுநீர்',
    hi: 'नलकूप एवं ड्रिप सिंचाई',
    te: 'బోరుబావి & బిందు సేద్యం',
    kn: 'ಬೋರ್‌ವೆಲ್ ಮತ್ತು ಹನಿ ನೀರಾವರಿ',
    mr: 'बोअरवेल आणि ठिबक सिंचन',
    bn: 'নলকূপ এবং ড্রিপ সেচ',
    gu: 'બોરવેલ અને ટપક પદ્ધતિ',
    pa: 'ਬੋਰਵੈੱਲ ਅਤੇ ਡਰਿੱਪ ਸਿੰਚਾਈ',
  },
};

export const CROPS_MAP: Record<string, Record<SupportedLang, string>> = {
  Wheat: {
    en: 'Wheat',
    ta: 'கோதுமை',
    hi: 'गेहूं',
    te: 'గోధుమ',
    kn: 'ಗೋಧಿ',
    mr: 'गहू',
    bn: 'গম',
    gu: 'ઘઉં',
    pa: 'ਕਣਕ',
  },
  'Paddy Rice': {
    en: 'Paddy Rice',
    ta: 'நெல்',
    hi: 'धान (चावल)',
    te: 'వరి (వరి ధాన్యం)',
    kn: 'ಭತ್ತ',
    mr: 'भात (धान)',
    bn: 'ধান',
    gu: 'ડાંગર (ચોખા)',
    pa: 'ਝੋਨਾ (ਚੌਲ)',
  },
  Rice: {
    en: 'Paddy Rice',
    ta: 'நெல்',
    hi: 'धान',
    te: 'వరి',
    kn: 'ಭತ್ತ',
    mr: 'भात',
    bn: 'ধান',
    gu: 'ડાંગર',
    pa: 'ਝੋਨਾ',
  },
  Paddy: {
    en: 'Paddy',
    ta: 'நெல்',
    hi: 'धान',
    te: 'వరి',
    kn: 'ಭತ್ತ',
    mr: 'भात',
    bn: 'ধান',
    gu: 'ડાંગર',
    pa: 'ਝੋਨਾ',
  },
  Tomato: {
    en: 'Tomato',
    ta: 'தக்காளி',
    hi: 'टमाटर',
    te: 'టమోటా',
    kn: 'ಟೊಮೆಟೊ',
    mr: 'टोमॅटो',
    bn: 'টমেটো',
    gu: 'ટમેટા',
    pa: 'ਟਮਾਟਰ',
  },
  Cotton: {
    en: 'Cotton',
    ta: 'பருத்தி',
    hi: 'कपास',
    te: 'ప్రత్తి',
    kn: 'ಹತ್ತಿ',
    mr: 'कापूस',
    bn: 'তুলা',
    gu: 'કપાસ',
    pa: 'ਕਪਾਹ',
  },
  Maize: {
    en: 'Maize / Corn',
    ta: 'மக்காச்சோளம்',
    hi: 'मक्का',
    te: 'మొక్కజొన్న',
    kn: 'ಮೆಕ್ಕೆಜೋಳ',
    mr: 'मका',
    bn: 'ভুট্টা',
    gu: 'મકાઈ',
    pa: 'ਮੱਕੀ',
  },
  Potato: {
    en: 'Potato',
    ta: 'உருளைக்கிழங்கு',
    hi: 'आलू',
    te: 'బంగాళాదుంప',
    kn: 'ಆಲೂಗಡ್ಡೆ',
    mr: 'बटाटा',
    bn: 'আলু',
    gu: 'બટાટા',
    pa: 'ਆਲੂ',
  },
  Sugarcane: {
    en: 'Sugarcane',
    ta: 'கரும்பு',
    hi: 'गन्ना',
    te: 'చెరకు',
    kn: 'ಕಬ್ಬು',
    mr: 'ऊस',
    bn: 'আখ',
    gu: 'શેરડી',
    pa: 'ਗੰਨਾ',
  },
  Soybean: {
    en: 'Soybean',
    ta: 'சோயாபீன்',
    hi: 'सोयाबीन',
    te: 'సోయాబీన్',
    kn: 'ಸೋಯಾಬೀನ್',
    mr: 'सोयाबीन',
    bn: 'সয়াবিন',
    gu: 'સોયાબીન',
    pa: 'ਸੋਇਆਬੀਨ',
  },
  Mustard: {
    en: 'Mustard',
    ta: 'கடுகு',
    hi: 'सरसों',
    te: 'ఆవాలు',
    kn: 'ಸಾಸಿವೆ',
    mr: 'मोहरी',
    bn: 'সরিষা',
    gu: 'રાઈ (સરસવ)',
    pa: 'ਸਰ੍ਹੋਂ',
  },
  Groundnut: {
    en: 'Groundnut / Peanut',
    ta: 'வேர்க்கடலை / நிலக்கடலை',
    hi: 'मूंगफली',
    te: 'వేరుశనగ',
    kn: 'ಕಡಲೆಕಾಯಿ',
    mr: 'भुईमूग',
    bn: 'চীনাবাদাম',
    gu: 'મગફળી',
    pa: 'ਮੂੰਗਫਲੀ',
  },
  Chilli: {
    en: 'Chilli',
    ta: 'மிளகாய்',
    hi: 'मिर्च',
    te: 'మిరపకాయ',
    kn: 'ಮೆಣಸಿನಕಾಯಿ',
    mr: 'मिरची',
    bn: 'মরিচ',
    gu: 'મરચું',
    pa: 'ਮਿਰਚ',
  },
  Onion: {
    en: 'Onion',
    ta: 'வெங்காயம்',
    hi: 'प्याज',
    te: 'ఉల్లిపాయ',
    kn: 'ಈರುಳ್ಳಿ',
    mr: 'कांदा',
    bn: 'পেঁয়াজ',
    gu: 'ડુંગળી',
    pa: 'ਪਿਆਜ਼',
  },
  Banana: {
    en: 'Banana',
    ta: 'வாழை',
    hi: 'केला',
    te: 'అరటి',
    kn: 'ಬಾಳೆಹಣ್ಣು',
    mr: 'केळी',
    bn: 'কলা',
    gu: 'કેળા',
    pa: 'ਕੇਲਾ',
  },
  Mango: {
    en: 'Mango',
    ta: 'மாம்பழம்',
    hi: 'आम',
    te: 'మామిడి',
    kn: 'ಮಾವಿನಹಣ್ಣು',
    mr: 'आंबा',
    bn: 'আম',
    gu: 'કેરી',
    pa: 'ਅੰਬ',
  },
  Apple: {
    en: 'Apple',
    ta: 'ஆப்பிள்',
    hi: 'सेब',
    te: 'ఆపిల్',
    kn: 'ಸೇಬು',
    mr: 'सफरचंद',
    bn: 'আপেল',
    gu: 'સફરજન',
    pa: 'ਸੇਬ',
  },
  Turmeric: {
    en: 'Turmeric',
    ta: 'மஞ்சள்',
    hi: 'हल्दी',
    te: 'పసుపు',
    kn: 'ಅರಿಶಿನ',
    mr: 'हळद',
    bn: 'হলুদ',
    gu: 'હળદર',
    pa: 'ਹਲਦੀ',
  },
  Coconut: {
    en: 'Coconut',
    ta: 'தென்னை',
    hi: 'नारियल',
    te: 'కొబ్బరి',
    kn: 'ತೆಂಗಿನಕಾಯಿ',
    mr: 'नारळ',
    bn: 'নারকেল',
    gu: 'નાળિયેર',
    pa: 'ਨਾਰੀਅਲ',
  },
  Pulses: {
    en: 'Pulses / Gram',
    ta: 'பருப்பு வகைகள்',
    hi: 'दालें / चना',
    te: 'పప్పుధాన్యాలు',
    kn: 'ಕಾಳುಗಳು / ಬೇಳೆಕಾಳುಗಳು',
    mr: 'कठधान्ये / डाळी',
    bn: 'ডাল',
    gu: 'કઠોળ',
    pa: 'ਦਾਲਾਂ',
  },
};

export const GROWTH_STAGE_MAP: Record<string, Record<SupportedLang, string>> = {
  'Germination & Emergence': {
    en: 'Germination & Emergence',
    ta: 'முளைத்தல் & வெளிவருதல்',
    hi: 'अंकुरण एवं उद्भव',
    te: 'మొలకెత్తడం & ఆరంభం',
    kn: 'ಮೊಳಕೆಯೊಡೆಯುವಿಕೆ',
    mr: 'उगवण आणि अंकुरण अवस्था',
    bn: 'অঙ্কুরোদগম ও বিকাশ',
    gu: 'અંકુરણ અને ઉગાવો',
    pa: 'ਉਗਣ ਅਤੇ ਨਿਕਲਣਾ',
  },
  'Vegetative (Seedling)': {
    en: 'Vegetative (Seedling)',
    ta: 'வளர்ச்சி நிலை (நாற்று)',
    hi: 'वानस्पतिक अवस्था (पौध)',
    te: 'శాకీయ దశ (మొక్క)',
    kn: 'ಸಸ್ಯಕ ಬೆಳವಣಿಗೆಯ ಹಂತ',
    mr: 'शाकीय वाढ (रोपवाटिका)',
    bn: 'অঙ্গজ বৃদ্ধি (চারা)',
    gu: 'વાનસ્પતિક વૃદ્ધિ (ધરૂ)',
    pa: 'ਬਨਸਪਤੀ ਵਾਧਾ (ਪਨੀਰੀ)',
  },
  Vegetative: {
    en: 'Vegetative',
    ta: 'பயிர் வளர்ச்சி நிலை',
    hi: 'वानस्पतिक वृद्धि',
    te: 'శాకీయ పెరుగుదల',
    kn: 'ಸಸ್ಯಕ ಹಂತ',
    mr: 'शाकीय वाढ',
    bn: 'অঙ্গজ বৃদ্ধি',
    gu: 'વાનસ્પતિક વૃદ્ધિ',
    pa: 'ਬਨਸਪਤੀ ਵਾਧਾ',
  },
  'Tillering / Branching': {
    en: 'Tillering / Branching',
    ta: 'கிளைத்தல் / தூர்கட்டுதல்',
    hi: 'कल्ले फूटना / शाखाएं निकलना',
    te: 'పిలకలు వేయడం / కొమ్మలు రావడం',
    kn: 'ಕವಲೊಡೆಯುವಿಕೆ ಹಂತ',
    mr: 'फुटवे फुटणे / फांद्या फुटणे',
    bn: 'কুশি বের হওয়া / ডালপালা বিস্তার',
    gu: 'ફૂટ આવવી / ડાળીઓનો વિકાસ',
    pa: 'ਫੁਟਾਰਾ / ਸ਼ਾਖਾਵਾਂ ਬਣਨਾ',
  },
  'Flowering & Heading': {
    en: 'Flowering & Heading',
    ta: 'பூத்தல் & கதிர் வெளிவருதல்',
    hi: 'फूल आना एवं बालियां निकलना',
    te: 'పూత & వెన్ను దశ',
    kn: 'ಹೂಬಿಡುವ ಮತ್ತು ತೆನೆ ಹಂತ',
    mr: 'फुलोरा आणि ओंब्या भरणे',
    bn: 'ফুল আসা ও শীষ বের হওয়া',
    gu: 'ફૂલ બેસવા અને ડૂંડા નીકળવા',
    pa: 'ਫੁੱਲ ਪੈਣਾ ਅਤੇ ਸਿੱਟੇ ਨਿਕਲਣਾ',
  },
  'Grain / Fruit Formation': {
    en: 'Grain / Fruit Formation',
    ta: 'தானியம் / காய் உருவாதல்',
    hi: 'दाने / फल का निर्माण (दूधिया अवस्था)',
    te: 'గింజ / కాయ ఏర్పడటం',
    kn: 'ಕಾಳು / ಕಾಯಿ ಕಟ್ಟುವ ಹಂತ',
    mr: 'दाणे / फळ भरणे (दुधाळ अवस्था)',
    bn: 'দানা / ফল গঠন',
    gu: 'દાણા / ફળનો વિકાસ',
    pa: 'ਦਾਣਾ / ਫਲ ਬਣਨਾ (ਦੁੱਧਾ ਅਵਸਥਾ)',
  },
  'Ripening & Maturation': {
    en: 'Ripening & Maturation',
    ta: 'முதிர்தல் & பழுத்தல்',
    hi: 'परिपक्वता एवं पकना',
    te: 'పక్వత & పండటం',
    kn: 'ಪಕ್ವತೆ ಮತ್ತು ಕಟಾವಿನ ಹಂತ',
    mr: 'पक्वता आणि परिपक्व होणे',
    bn: 'পাকা ও পরিপক্বতা',
    gu: 'પાકવું અને પરિપક્વતા',
    pa: 'ਪੱਕਣਾ ਅਤੇ ਤਿਆਰ ਹੋਣਾ',
  },
  'Harvest Ready': {
    en: 'Harvest Ready',
    ta: 'அறுவடைக்கு தயார்',
    hi: 'कटाई हेतु तैयार',
    te: 'కోతకు సిద్ధం',
    kn: 'ಕಟಾವಿಗೆ ಸಿದ್ಧವಾಗಿದೆ',
    mr: 'कापणीसाठी सज्ज',
    bn: 'ফসল তোলার উপযোগী',
    gu: 'લણણી માટે તૈયાર',
    pa: 'ਵਾਢੀ ਲਈ ਤਿਆਰ',
  },
};

export const COMMON_STRINGS: Record<string, Record<SupportedLang, string>> = {
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
  'Sunrise Organic Fields': {
    en: 'Sunrise Organic Fields',
    ta: 'சன்ரைஸ் இயற்கை பண்ணை',
    hi: 'सनराइज जैविक खेत',
    te: 'సన్‌రైజ్ సేంద్రీయ పొలాలు',
    kn: 'ಸನ್‌ರೈಸ್ ಸಾವಯವ ತೋಟ',
    mr: 'सनराईज सेंद्रिय शेती',
    bn: 'সানরাইজ অর্গানিক ফিল্ডস',
    gu: 'સનરાઇઝ ઓર્ગેનિક ખેતર',
    pa: 'ਸਨਰਾਈਜ਼ ਜੈਵਿਕ ਖੇਤ',
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
  'Tamil Nadu, India': {
    en: 'Tamil Nadu, India',
    ta: 'தமிழ்நாடு, இந்தியா',
    hi: 'तमिलनाडु, भारत',
    te: 'తమిళనాడు, భారతదేశం',
    kn: 'ತಮಿಳುನಾಡು, ಭಾರತ',
    mr: 'तमिळनाडू, भारत',
    bn: 'তামিলনাড়ু, ভারত',
    gu: 'તમિલનાડુ, ભારત',
    pa: 'ਤਾਮਿਲਨਾਡੂ, ਭਾਰਤ',
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
  Live: {
    en: 'Live',
    ta: 'நேரலை',
    hi: 'लाइव',
    te: 'లైవ్',
    kn: 'ಲೈವ್',
    mr: 'थेट',
    bn: 'লাইভ',
    gu: 'લાઈવ',
    pa: 'ਲਾਈਵ',
  },
  Graphs: {
    en: 'Graphs',
    ta: 'வரைபடம்',
    hi: 'ग्राफ',
    te: 'గ్రాఫ్‌లు',
    kn: 'ಗ್ರಾಫ್‌ಗಳು',
    mr: 'आलेख',
    bn: 'গ্রাফ',
    gu: 'ગ્રાફ',
    pa: 'ਗ੍ਰਾਫ਼',
  },
  Vision: {
    en: 'Vision',
    ta: 'பார்வை',
    hi: 'विजन',
    te: 'విజన్',
    kn: 'ದೃಷ್ಟಿ',
    mr: 'दृष्टी',
    bn: 'দৃষ্টি',
    gu: 'દ્રષ્ટિ',
    pa: 'ਦ੍ਰਿਸ਼ਟੀ',
  },
  Voice: {
    en: 'Voice',
    ta: 'குரல்',
    hi: 'आवाज़',
    te: 'వాయిస్',
    kn: 'ಧ್ವನಿ',
    mr: 'आवाज',
    bn: 'ভয়েস',
    gu: 'અવાજ',
    pa: 'ਆਵਾਜ਼',
  },
  KYC: {
    en: 'KYC',
    ta: 'KYC',
    hi: 'केवाईसी',
    te: 'KYC',
    kn: 'ಕೆವೈಸಿ',
    mr: 'केवायसी',
    bn: 'কেওয়াইসি',
    gu: 'કેવાયસી',
    pa: 'ਕੇਵਾਈਸੀ',
  },
  Clear: {
    en: 'Clear',
    ta: 'தெளிவான வானிலை',
    hi: 'साफ मौसम',
    te: 'నిర్మలమైన ఆకాశం',
    kn: 'ಸ್ವಚ್ಛ ಆಕಾಶ',
    mr: 'निरभ्र आकाश',
    bn: 'পরিষ্কার আকাশ',
    gu: 'ચોખ્ખું આકાશ',
    pa: 'ਸਾਫ਼ ਅਸਮਾਨ',
  },
  'Clear Sky': {
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
  'Mainly Clear': {
    en: 'Mainly Clear',
    ta: 'முக்கியமாக தெளிவானது',
    hi: 'मुख्य रूप से साफ',
    te: 'ప్రధానంగా నిర్మలం',
    kn: 'ಹೆಚ್ಚಾಗಿ ಸ್ವಚ್ಛ',
    mr: 'मुख्यतः निरभ्र',
    bn: 'প্রধানত পরিষ্কার',
    gu: 'મુખ્યત્વે ચોખ્ખું',
    pa: 'ਮੁੱਖ ਤੌਰ ਤੇ ਸਾਫ਼',
  },
  'Partly Cloudy': {
    en: 'Partly Cloudy',
    ta: 'பகுதி மேகமூட்டம்',
    hi: 'आंशिक बादल',
    te: 'పాక్షికంగా మేఘావృతం',
    kn: 'ಭಾಗಶಃ ಮೋಡ ಕವಿದ',
    mr: 'अंशतः ढगाळ',
    bn: 'আংশিক মেঘলা',
    gu: 'અંશતઃ વાદળછાયું',
    pa: 'ਅੰਸ਼ਕ ਤੌਰ ਤੇ ਬੱਦਲਵਾਈ',
  },
  Overcast: {
    en: 'Overcast',
    ta: 'முழு மேகமூட்டம்',
    hi: 'घने बादल',
    te: 'పూర్తిగా మేఘావృతం',
    kn: 'ಸಂಪೂರ್ಣ ಮೋಡ ಕವಿದ',
    mr: 'पूर्ण ढगाळ',
    bn: 'মেঘলা আকাশ',
    gu: 'સંપૂર્ણ વાદળછાયું',
    pa: 'ਪੂਰੀ ਬੱਦਲਵਾਈ',
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
  'Heavy Rain': {
    en: 'Heavy Rain',
    ta: 'கனமழை',
    hi: 'भारी वर्षा',
    te: 'భారీ వర్షం',
    kn: 'ಭಾರಿ ಮಳೆ',
    mr: 'मुसळधार पाऊस',
    bn: 'ভারী বৃষ্টি',
    gu: 'ભારે વરસાદ',
    pa: 'ਭਾਰੀ ਮੀਂਹ',
  },
  'Pest Outbreak Risk': {
    en: 'Pest Outbreak Risk',
    ta: 'பூச்சித் தாக்குதல் அபாயம்',
    hi: 'कीट प्रकोप का खतरा',
    te: 'తెగుళ్ల వ్యాప్తి ప్రమాదం',
    kn: 'ಕೀಟ ಬಾಧೆಯ ಅಪಾಯ',
    mr: 'कीड प्रादुर्भावाचा धोका',
    bn: 'পোকার আক্রমণের ঝুঁকি',
    gu: 'જીવાત ઉપદ્રવનું જોખમ',
    pa: 'ਕੀੜਿਆਂ ਦੇ ਹਮਲੇ ਦਾ ਖਤਰਾ',
  },
  'Monsoon Front Approaching (Next 48 Hours)': {
    en: 'Monsoon Front Approaching (Next 48 Hours)',
    ta: 'பருவமழை நெருங்குகிறது (அடுத்த 48 மணி நேரத்தில்)',
    hi: 'मानसून का आगमन (अगले 48 घंटों में)',
    te: 'రుతుపవనాల రాక (రాబోయే 48 గంటల్లో)',
    kn: 'ಮುಂಗಾರು ಮಳೆ ಆಗಮನ (ಮುಂದಿನ 48 ಗಂಟೆಗಳಲ್ಲಿ)',
    mr: 'पावसाची शक्यता (पुढील ४८ तासांत)',
    bn: 'বর্ষার আগমন (পরবর্তী ৪৮ ঘণ্টায়)',
    gu: 'ચોમાસાનું આગમન (આગામી 48 કલાકમાં)',
    pa: 'ਮਾਨਸੂਨ ਦੀ ਆਮਦ (ਅਗਲੇ 48 ਘੰਟਿਆਂ ਵਿੱਚ)',
  },
  'High Humidity Pest Alert: Yellow Rust & Aphids': {
    en: 'High Humidity Pest Alert: Yellow Rust & Aphids',
    ta: 'அதிக ஈரப்பதம் பூச்சி எச்சரிக்கை: மஞ்சள் துரு & அசுவினி',
    hi: 'उच्च आर्द्रता कीट चेतावनी: पीला रतुआ एवं एफिड्स',
    te: 'అధిక తేమ తెగులు హెచ్చరిక: పసుపు తుప్పు & పేనుబంక',
    kn: 'ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ ಕೀಟ ಎಚ್ಚರಿಕೆ: ಹಳದಿ ತುಕ್ಕು & ಜಿಗಿಹುಳು',
    mr: 'अति आर्द्रता कीड इशारा: पिवळा तांबेरा आणि मावा',
    bn: 'উচ্চ আর্দ্রতা পোকা সতর্কতা: হলুদ মরিচা ও জাবপোকা',
    gu: 'વધુ ભેજ જીવાત ચેતવણી: પીળો ગેરુ અને મોલો-મશી',
    pa: 'ਵੱਧ ਨਮੀ ਕੀੜੇ ਚੇਤਾਵਨੀ: ਪੀਲੀ ਕੁੰਗੀ ਅਤੇ ਤੇਲਾ',
  },
  'Foliar Nutrient Window: Potassium Booster Due': {
    en: 'Foliar Nutrient Window: Potassium Booster Due',
    ta: 'இலை வழி ஊட்டச்சத்து நேரம்: பொட்டாசியம் உரம் தேவை',
    hi: 'पोषक तत्व छिड़काव समय: पोटेशियम बूस्टर आवश्यक',
    te: 'పోషకాల పిచికారీ సమయం: పొటాషియం బూస్టర్ అవసరం',
    kn: 'ಪೋಷಕಾಂಶ ಸಿಂಪಡಣೆ ಸಮಯ: ಪೊಟ್ಯಾಸಿಯಮ್ ಅಗತ್ಯವಿದೆ',
    mr: 'पोषकद्रव्य फवारणी वेळ: पोटॅशियम बूस्टर आवश्यक',
    bn: 'পুষ্টি স্প্রে করার সময়: পটাসিয়াম বুস্টার প্রয়োজন',
    gu: 'પોષક તત્વો છંટકાવ સમય: પોટેશિયમ બૂસ્ટર જરૂરી',
    pa: 'ਪੌਸ਼ਟਿਕ ਤੱਤ ਛਿੜਕਾਅ ਸਮਾਂ: ਪੋਟਾਸ਼ੀਅਮ ਬੂਸਟਰ ਲੋੜੀਂਦਾ',
  },
};

/**
 * Translates any common or dynamic text string into the active language
 */
export function translateText(text: string | undefined | null, lang: SupportedLang): string {
  if (!text) return '';
  const trimmed = text.trim();

  // Direct exact match in COMMON_STRINGS
  if (COMMON_STRINGS[trimmed] && COMMON_STRINGS[trimmed][lang]) {
    return COMMON_STRINGS[trimmed][lang];
  }

  // Check in SOIL_MAP
  if (SOIL_MAP[trimmed] && SOIL_MAP[trimmed][lang]) {
    return SOIL_MAP[trimmed][lang];
  }

  // Check in IRRIGATION_MAP
  if (IRRIGATION_MAP[trimmed] && IRRIGATION_MAP[trimmed][lang]) {
    return IRRIGATION_MAP[trimmed][lang];
  }

  // Check in CROPS_MAP
  if (CROPS_MAP[trimmed] && CROPS_MAP[trimmed][lang]) {
    return CROPS_MAP[trimmed][lang];
  }

  // Check in GROWTH_STAGE_MAP
  if (GROWTH_STAGE_MAP[trimmed] && GROWTH_STAGE_MAP[trimmed][lang]) {
    return GROWTH_STAGE_MAP[trimmed][lang];
  }

  // Check in ROLE_MAP
  if (ROLE_MAP[trimmed] && ROLE_MAP[trimmed][lang]) {
    return ROLE_MAP[trimmed][lang];
  }

  // Case-insensitive match in COMMON_STRINGS
  const lowerTrimmed = trimmed.toLowerCase();
  for (const [key, translations] of Object.entries(COMMON_STRINGS)) {
    if (lowerTrimmed === key.toLowerCase()) {
      if (translations[lang]) return translations[lang];
    }
  }

  // Check in TRANSLATIONS dictionary
  const currentDict = TRANSLATIONS[lang];
  const enDict = TRANSLATIONS.en;
  if (currentDict && enDict) {
    for (const [k, val] of Object.entries(enDict)) {
      if (typeof val === 'string' && val.toLowerCase() === lowerTrimmed) {
        if (currentDict[k]) return currentDict[k];
      }
    }
  }

  return text;
}

/**
 * Translates a user's displayed display name into the active language
 */
export function getLocalizedUserName(name: string | undefined, lang: SupportedLang): string {
  if (!name) return '';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const farmerWord = t.farmer || (ROLE_MAP.Farmer && ROLE_MAP.Farmer[lang]) || 'Farmer';

  if (name.startsWith('Farmer (')) {
    const numPart = name.replace('Farmer', '').trim();
    return `${farmerWord} ${numPart}`;
  }
  if (name.startsWith('Farmer #')) {
    const numPart = name.replace('Farmer', '').trim();
    return `${farmerWord} ${numPart}`;
  }
  if (name.startsWith('Guest Farmer')) {
    const numPart = name.replace('Guest Farmer', '').trim();
    const guestFarmerWord = (ROLE_MAP['Guest Farmer'] && ROLE_MAP['Guest Farmer'][lang]) || `${t.guestPass || 'Guest'} ${farmerWord}`;
    return `${guestFarmerWord} ${numPart}`.trim();
  }
  if (name === 'Farmer' || name === 'Farmer Member') {
    return farmerWord;
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
  return translateText(role, lang);
}

/**
 * Translates a farm's name into the active language
 */
export function getLocalizedFarmName(name: string | undefined, lang: SupportedLang): string {
  if (!name) return '';
  const trimmed = name.trim();
  if (COMMON_STRINGS[trimmed] && COMMON_STRINGS[trimmed][lang]) {
    return COMMON_STRINGS[trimmed][lang];
  }
  for (const [k, v] of Object.entries(COMMON_STRINGS)) {
    if (k.toLowerCase() === trimmed.toLowerCase()) {
      return v[lang] || name;
    }
  }
  return translateText(name, lang) || name;
}

/**
 * Translates a farm's location into the active language
 */
export function getLocalizedLocation(loc: string | undefined, lang: SupportedLang): string {
  if (!loc) return '';
  const trimmed = loc.trim();
  if (COMMON_STRINGS[trimmed] && COMMON_STRINGS[trimmed][lang]) {
    return COMMON_STRINGS[trimmed][lang];
  }
  for (const [k, v] of Object.entries(COMMON_STRINGS)) {
    if (k.toLowerCase() === trimmed.toLowerCase()) {
      return v[lang] || loc;
    }
  }
  return loc;
}

/**
 * Translates soil type into the active language
 */
export function getLocalizedSoilType(soil: string | undefined, lang: SupportedLang): string {
  if (!soil) return '';
  const trimmed = soil.trim();
  if (SOIL_MAP[trimmed] && SOIL_MAP[trimmed][lang]) {
    return SOIL_MAP[trimmed][lang];
  }
  for (const [k, v] of Object.entries(SOIL_MAP)) {
    if (k.toLowerCase() === trimmed.toLowerCase()) {
      return v[lang] || soil;
    }
  }
  return translateText(soil, lang) || soil;
}

/**
 * Translates irrigation method into the active language
 */
export function getLocalizedIrrigation(irr: string | undefined, lang: SupportedLang): string {
  if (!irr) return '';
  const trimmed = irr.trim();
  if (IRRIGATION_MAP[trimmed] && IRRIGATION_MAP[trimmed][lang]) {
    return IRRIGATION_MAP[trimmed][lang];
  }
  for (const [k, v] of Object.entries(IRRIGATION_MAP)) {
    if (k.toLowerCase() === trimmed.toLowerCase()) {
      return v[lang] || irr;
    }
  }
  return translateText(irr, lang) || irr;
}

/**
 * Translates crop names into the active language
 */
export function getLocalizedCropName(crop: string | undefined, lang: SupportedLang): string {
  if (!crop) return '';
  const trimmed = crop.trim();
  if (CROPS_MAP[trimmed] && CROPS_MAP[trimmed][lang]) {
    return CROPS_MAP[trimmed][lang];
  }
  for (const [k, v] of Object.entries(CROPS_MAP)) {
    if (k.toLowerCase() === trimmed.toLowerCase() || trimmed.toLowerCase().includes(k.toLowerCase())) {
      return v[lang] || crop;
    }
  }
  return translateText(crop, lang) || crop;
}

/**
 * Translates growth stages into the active language
 */
export function getLocalizedGrowthStage(stage: string | undefined, lang: SupportedLang): string {
  if (!stage) return '';
  const trimmed = stage.trim();
  if (GROWTH_STAGE_MAP[trimmed] && GROWTH_STAGE_MAP[trimmed][lang]) {
    return GROWTH_STAGE_MAP[trimmed][lang];
  }
  for (const [k, v] of Object.entries(GROWTH_STAGE_MAP)) {
    if (k.toLowerCase() === trimmed.toLowerCase() || trimmed.toLowerCase().startsWith(k.toLowerCase())) {
      return v[lang] || stage;
    }
  }
  return translateText(stage, lang) || stage;
}
