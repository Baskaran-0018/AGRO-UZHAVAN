import { SupportedLang } from './i18n';

/**
 * High-Precision Indian & Regional Location Translations
 * Covers all districts, taluks, cities, and states of India across 9 regional languages:
 * Tamil (ta), Hindi (hi), Telugu (te), Kannada (kn), Marathi (mr), Bengali (bn), Gujarati (gu), Punjabi (pa), English (en)
 */
export const LOCATION_TOKENS: Record<string, Record<SupportedLang, string>> = {
  // --- Geographic Qualifiers ---
  District: { en: 'District', ta: 'மாவட்டம்', hi: 'ज़िला', te: 'జిల్లా', kn: 'ಜಿಲ್ಲೆ', mr: 'जिल्हा', bn: 'জেলা', gu: 'જિલ્લો', pa: 'ਜ਼ਿਲ੍ਹਾ' },
  district: { en: 'District', ta: 'மாவட்டம்', hi: 'ज़िला', te: 'జిల్లా', kn: 'ಜಿಲ್ಲೆ', mr: 'जिल्हा', bn: 'জেলা', gu: 'જિલ્લો', pa: 'ਜ਼ਿਲ੍ਹਾ' },
  Taluk: { en: 'Taluk', ta: 'வட்டம்', hi: 'तालुका', te: 'తాలూకా', kn: 'ತಾಲೂಕು', mr: 'तालुका', bn: 'তালুক', gu: 'તાલુકો', pa: 'ਤਹਿਸੀਲ' },
  taluk: { en: 'Taluk', ta: 'வட்டம்', hi: 'तालुका', te: 'తాలూకా', kn: 'ತಾಲೂಕು', mr: 'तालुका', bn: 'তালুক', gu: 'તાલુકો', pa: 'ਤਹਿਸੀਲ' },
  Taluka: { en: 'Taluka', ta: 'வட்டம்', hi: 'तालुका', te: 'తాలూకా', kn: 'ತಾಲೂಕು', mr: 'तालुका', bn: 'তালুক', gu: 'તાલુકો', pa: 'ਤਹਿਸੀਲ' },
  taluka: { en: 'Taluka', ta: 'வட்டம்', hi: 'तालुका', te: 'తాలూకా', kn: 'ತಾಲೂಕು', mr: 'तालुका', bn: 'তালুক', gu: 'તાલુકો', pa: 'ਤਹਿਸੀਲ' },
  Block: { en: 'Block', ta: 'ஒன்றியம்', hi: 'प्रखंड', te: 'బ్లాక్', kn: 'ಬ್ಲಾಕ್', mr: 'गट', bn: 'ব্লক', gu: 'બ્લોક', pa: 'ਬਲਾਕ' },
  block: { en: 'Block', ta: 'ஒன்றியம்', hi: 'प्रखंड', te: 'బ్లాక్', kn: 'ಬ್ಲಾಕ್', mr: 'गट', bn: 'ব্লক', gu: 'બ્લોક', pa: 'ਬਲਾਕ' },
  Village: { en: 'Village', ta: 'கிராமம்', hi: 'गांव', te: 'గ్రామం', kn: 'ಗ್ರಾಮ', mr: 'गाव', bn: 'গ্রাম', gu: 'ગામ', pa: 'ਪਿੰਡ' },
  village: { en: 'Village', ta: 'கிராமம்', hi: 'गांव', te: 'గ్రామం', kn: 'ಗ್ರಾಮ', mr: 'गाव', bn: 'গ্রাম', gu: 'ગામ', pa: 'ਪਿੰਡ' },
  City: { en: 'City', ta: 'நகரம்', hi: 'शहर', te: 'నగరం', kn: 'ನಗರ', mr: 'शहर', bn: 'শহর', gu: 'શહેર', pa: 'ਸ਼ਹਿਰ' },
  city: { en: 'City', ta: 'நகரம்', hi: 'शहर', te: 'నగరం', kn: 'ನಗರ', mr: 'शहर', bn: 'শহর', gu: 'શહેર', pa: 'ਸ਼ਹਿਰ' },
  Town: { en: 'Town', ta: 'நகரம்', hi: 'कस्बा', te: 'పట్టణం', kn: 'ಪಟ್ಟಣ', mr: 'नगर', bn: 'শহর', gu: 'નગર', pa: 'ਕਸਬਾ' },
  town: { en: 'Town', ta: 'நகரம்', hi: 'कस्बा', te: 'పట్టణం', kn: 'ಪಟ್ಟಣ', mr: 'नगर', bn: 'শহর', gu: 'નગર', pa: 'ਕਸਬਾ' },
  North: { en: 'North', ta: 'வடக்கு', hi: 'उत्तर', te: 'ఉత్తర', kn: 'ಉತ್ತರ', mr: 'उत्तर', bn: 'উত্তর', gu: 'ઉત્તર', pa: 'ਉੱਤਰ' },
  South: { en: 'South', ta: 'தெற்கு', hi: 'दक्षिण', te: 'దక్షిణ', kn: 'ದಕ್ಷಿಣ', mr: 'दक्षिण', bn: 'দক্ষিণ', gu: 'દક્ષિણ', pa: 'ਦੱਖਣ' },
  East: { en: 'East', ta: 'கிழக்கு', hi: 'पूर्व', te: 'తూర్పు', kn: 'ಪೂರ್ವ', mr: 'पूर्व', bn: 'পূর্ব', gu: 'પૂર્વ', pa: 'ਪੂਰਬ' },
  West: { en: 'West', ta: 'மேற்கு', hi: 'पश्चिम', te: 'పశ్చిమ', kn: 'ಪಶ್ಚಿಮ', mr: 'पश्चिम', bn: 'পশ্চিম', gu: 'પશ્ચિમ', pa: 'ਪੱਛਮ' },
  Central: { en: 'Central', ta: 'மத்திய', hi: 'मध्य', te: 'మధ్య', kn: 'ಮಧ್ಯ', mr: 'मध्य', bn: 'মধ্য', gu: 'મધ્ય', pa: 'ਮੱਧ' },
  Rural: { en: 'Rural', ta: 'ஊரகம்', hi: 'ग्रामीण', te: 'గ్రామీణ', kn: 'ಗ್ರಾಮೀಣ', mr: 'ग्रामीण', bn: 'গ্রামীণ', gu: 'ગ્રામીણ', pa: 'ਪੇਂਡੂ' },
  Urban: { en: 'Urban', ta: 'நகர்ப்புற', hi: 'शहरी', te: 'పట్టణ', kn: 'ನಗರ', mr: 'शहरी', bn: 'শহুরে', gu: 'શહેરી', pa: 'ਸ਼ਹਿਰੀ' },
  'Live Location': { en: 'Live Location', ta: 'நேரலை இருப்பிடம்', hi: 'लाइव स्थान', te: 'ప్రత్యక్ష స్థానం', kn: 'ಲೈವ್ ಸ್ಥಳ', mr: 'थेट स्थान', bn: 'লাইভ অবস্থান', gu: 'લાઇવ સ્થાન', pa: 'ਲਾਈਵ ਟਿਕਾਣਾ' },
  'Custom Location': { en: 'Custom Location', ta: 'தனிப்பயன் இருப்பிடம்', hi: 'कस्टम स्थान', te: 'అనుకూల స్థానం', kn: 'ಕಸ್ಟಮ್ ಸ್ಥಳ', mr: 'सानुकूल स्थान', bn: 'কাস্টম অবস্থান', gu: 'કસ્ટમ સ્થાન', pa: 'ਕਸਟਮ ਟਿਕਾਣਾ' },
  'Farm Location': { en: 'Farm Location', ta: 'பண்ணை இருப்பிடம்', hi: 'फार्म स्थान', te: 'వ్యవసాయ క్షేత్రం స్థానం', kn: 'ತೋಟದ ಸ್ಥಳ', mr: 'शेत स्थान', bn: 'খামার অবস্থান', gu: 'ખેતરનું સ્થાન', pa: 'ਖੇਤ ਦਾ ਟਿਕਾਣਾ' },
  India: { en: 'India', ta: 'இந்தியா', hi: 'भारत', te: 'భారతదేశం', kn: 'ಭಾರತ', mr: 'भारत', bn: 'ভারত', gu: 'ભારત', pa: 'ਭਾਰਤ' },

  // --- Indian States & Union Territories ---
  'Tamil Nadu': { en: 'Tamil Nadu', ta: 'தமிழ்நாடு', hi: 'तमिलनाडु', te: 'తమిళనాడు', kn: 'ತಮಿಳುನಾಡು', mr: 'तमिळनाडू', bn: 'তামিলনাড়ু', gu: 'તમિલનાડુ', pa: 'ਤਾਮਿਲਨਾਡੂ' },
  Kerala: { en: 'Kerala', ta: 'கேரளா', hi: 'केरल', te: 'కేరళ', kn: 'ಕೇರಳ', mr: 'केरळ', bn: 'কেরালা', gu: 'કેરળ', pa: 'ਕੇਰਲ' },
  Karnataka: { en: 'Karnataka', ta: 'கர்நாடகா', hi: 'कर्नाटक', te: 'కర్ణాటక', kn: 'ಕರ್ನಾಟಕ', mr: 'कर्नाटक', bn: 'কর্ণাটক', gu: 'કર્ણાટક', pa: 'ਕਰਨਾਟਕ' },
  'Andhra Pradesh': { en: 'Andhra Pradesh', ta: 'ஆந்திரப் பிரதேசம்', hi: 'आंध्र प्रदेश', te: 'ఆంధ్రప్రదేశ్', kn: 'ಆಂಧ್ರಪ್ರದೇಶ', mr: 'आंध्र प्रदेश', bn: 'অন্ধ্রপ্রদেশ', gu: 'આંધ્ર પ્રદેશ', pa: 'ਆਂਧਰਾ ਪ੍ਰਦੇਸ਼' },
  Telangana: { en: 'Telangana', ta: 'தெலுங்கானா', hi: 'तेलंगाना', te: 'తెలంగాణ', kn: 'ತೆಲಂಗಾಣ', mr: 'तेलंगणा', bn: 'তেলেঙ্গানা', gu: 'તેલંગાણા', pa: 'ਤੇਲੰਗਾਨਾ' },
  Maharashtra: { en: 'Maharashtra', ta: 'மகாராஷ்டிரா', hi: 'महाराष्ट्र', te: 'మహారాష్ట్ర', kn: 'ಮಹಾರಾಷ್ಟ್ರ', mr: 'महाराष्ट्र', bn: 'মহারাষ্ট্র', gu: 'મહારાષ્ટ્ર', pa: 'ਮਹਾਰਾਸ਼ਟਰ' },
  Gujarat: { en: 'Gujarat', ta: 'குஜராத்', hi: 'गुजरात', te: 'ગુજરાત', kn: 'ಗುಜರಾತ್', mr: 'गुजरात', bn: 'ગુજરાત', gu: 'ગુજરાત', pa: 'ਗੁਜਰਾਤ' },
  Punjab: { en: 'Punjab', ta: 'பஞ்சாப்', hi: 'पंजाब', te: 'పంజాబ్', kn: 'ಪಂಜಾಬ್', mr: 'पंजाब', bn: 'পাঞ্জাব', gu: 'પંજાબ', pa: 'ਪੰਜਾਬ' },
  Haryana: { en: 'Haryana', ta: 'ஹரியானா', hi: 'हरियाणा', te: 'హర్యానా', kn: 'ಹರಿಯಾಣ', mr: 'हरियाणा', bn: 'হরিয়ানা', gu: 'હરિયાણા', pa: 'ਹਰਿਆਣਾ' },
  'Uttar Pradesh': { en: 'Uttar Pradesh', ta: 'உத்தரப் பிரதேசம்', hi: 'उत्तर प्रदेश', te: 'ఉత్తరప్రదేశ్', kn: 'ಉತ್ತರ ಪ್ರದೇಶ', mr: 'उत्तर प्रदेश', bn: 'উত্তর প্রদেশ', gu: 'ઉત્તર પ્રદેશ', pa: 'ਉੱਤਰ ਪ੍ਰਦੇਸ਼' },
  'Madhya Pradesh': { en: 'Madhya Pradesh', ta: 'மத்தியப் பிரதேசம்', hi: 'मध्य प्रदेश', te: 'మధ్యప్రదేశ్', kn: 'ಮಧ್ಯ ಪ್ರದೇಶ', mr: 'मध्य प्रदेश', bn: 'মধ্য প্রদেশ', gu: 'મધ્ય પ્રદેશ', pa: 'ਮੱਧ ਪ੍ਰਦੇਸ਼' },
  Rajasthan: { en: 'Rajasthan', ta: 'ராஜஸ்தான்', hi: 'राजस्थान', te: 'రాజస్థాన్', kn: 'ರಾಜಸ್ಥಾನ', mr: 'राजस्थान', bn: 'রাজস্থান', gu: 'રાજસ્થાન', pa: 'ਰਾਜਸਥਾਨ' },
  'West Bengal': { en: 'West Bengal', ta: 'மேற்கு வங்காளம்', hi: 'पश्चिम बंगाल', te: 'పశ్చిమ బెంగాల్', kn: 'ಪಶ್ಚಿಮ ಬಂಗಾಳ', mr: 'पश्चिम बंगाल', bn: 'পশ্চিমবঙ্গ', gu: 'પશ્ચિમ બંગાળ', pa: 'ਪੱਛਮੀ ਬੰਗਾਲ' },
  Bihar: { en: 'Bihar', ta: 'பீகார்', hi: 'बिहार', te: 'బీహార్', kn: 'ಬಿಹಾರ', mr: 'बिहार', bn: 'বিহার', gu: 'બિહાર', pa: 'ਬਿਹਾਰ' },
  Odisha: { en: 'Odisha', ta: 'ஒடிசா', hi: 'ओडिशा', te: 'ఒడిశా', kn: 'ಒಡಿಶಾ', mr: 'ओडिशा', bn: 'ওড়িশা', gu: 'ઓડિશા', pa: 'ਓਡੀਸ਼ਾ' },
  Assam: { en: 'Assam', ta: 'அசாம்', hi: 'असम', te: 'అస్సాం', kn: 'ಅಸ್ಸಾಂ', mr: 'आसाम', bn: 'আসাম', gu: 'આસામ', pa: 'ਅਸਾਮ' },
  Delhi: { en: 'Delhi', ta: 'டெல்லி', hi: 'दिल्ली', te: 'ఢిల్లీ', kn: 'ದೆಹಲಿ', mr: 'दिल्ली', bn: 'দিল্লি', gu: 'દિલ્હી', pa: 'ਦਿੱਲੀ' },
  Goa: { en: 'Goa', ta: 'கோவா', hi: 'गोवा', te: 'గోవా', kn: 'ಗೋವಾ', mr: 'गोवा', bn: 'গোয়া', gu: 'ગોવા', pa: 'ਗੋਆ' },
  'Himachal Pradesh': { en: 'Himachal Pradesh', ta: 'இமாச்சலப் பிரதேசம்', hi: 'हिमाचल प्रदेश', te: 'హిమాచల్ ప్రదేశ్', kn: 'ಹಿಮಾಚಲ ಪ್ರದೇಶ', mr: 'हिमाचल प्रदेश', bn: 'হিমাচল প্রদেশ', gu: 'હિમાચલ પ્રદેશ', pa: 'ਹਿਮਾਚਲ ਪ੍ਰਦੇਸ਼' },
  'Jammu and Kashmir': { en: 'Jammu and Kashmir', ta: 'ஜம்மு காஷ்மீர்', hi: 'जम्मू और कश्मीर', te: 'జమ్మూ కాశ్మీర్', kn: 'ಜಮ್ಮು ಮತ್ತು ಕಾಶ್ಮೀರ', mr: 'जम्मू आणि काश्मीर', bn: 'জম্মু ও কাশ্মীর', gu: 'જમ્મુ અને કાશ્મીર', pa: 'ਜੰਮੂ ਅਤੇ ਕਸ਼ਮੀਰ' },
  Jharkhand: { en: 'Jharkhand', ta: 'ஜார்க்கண்ட்', hi: 'झारखंड', te: 'జార్ఖండ్', kn: 'ಜಾರ್ಖಂಡ್', mr: 'झारखंड', bn: 'ঝাড়খণ্ড', gu: 'ઝારખંડ', pa: 'ਝਾਰਖੰਡ' },
  Chhattisgarh: { en: 'Chhattisgarh', ta: 'சத்தீஸ்கர்', hi: 'छत्तीसगढ़', te: 'ఛత్తీస్‌గఢ్', kn: 'ಛತ್ತೀಸ್‌ಗಢ', mr: 'छत्तीसगड', bn: 'ছত্তিশগড়', gu: 'છત્તીસગઢ', pa: 'ਛੱਤੀਸਗੜ੍ਹ' },
  Uttarakhand: { en: 'Uttarakhand', ta: 'உத்தரகண்ட்', hi: 'उत्तराखंड', te: 'ఉత్తరాఖండ్', kn: 'ಉತ್ತರಾಖಂಡ', mr: 'उत्तराखंड', bn: 'উত্তরাখণ্ড', gu: 'ઉત્તરાખંડ', pa: 'ਉੱਤਰਾਖੰਡ' },
  Puducherry: { en: 'Puducherry', ta: 'புதுச்சேரி', hi: 'पुदुच्चेरी', te: 'పుదుచ్చేరి', kn: 'ಪುದುಚೇರಿ', mr: 'पुद्दुचेरी', bn: 'পুদুচেরি', gu: 'પુડુચેરી', pa: 'ਪੁਡੂਚੇਰੀ' },
  Chandigarh: { en: 'Chandigarh', ta: 'சண்டிகர்', hi: 'चंडीगढ़', te: 'చండీగఢ్', kn: 'ಚಂಡೀಗಢ', mr: 'चंदिगढ', bn: 'চণ্ডীগড়', gu: 'ચંદીગઢ', pa: 'ਚੰਡੀਗੜ੍ਹ' },

  // --- All 38 Districts of Tamil Nadu ---
  Ariyalur: { en: 'Ariyalur', ta: 'அரியலூர்', hi: 'अरियालुर', te: 'అరియలూర్', kn: 'ಅರಿಯಲೂರ್', mr: 'अरियालूर', bn: 'অরিয়ালুর', gu: 'અરિયાલુર', pa: 'ਅਰਿਆਲੁਰ' },
  Chengalpattu: { en: 'Chengalpattu', ta: 'செங்கல்பட்டு', hi: 'चेंगलपट्टू', te: 'చెంగల్పట్టు', kn: 'ಚೆಂಗಲ್ಪಟ್ಟು', mr: 'चेंगलपट्टू', bn: 'চেঙ্গলপট্টু', gu: 'ચેંગલપટ્ટુ', pa: 'ਚੇਂਗਲਪੱਟੂ' },
  Chennai: { en: 'Chennai', ta: 'சென்னை', hi: 'चेन्नई', te: 'చెన్నై', kn: 'ಚೆನ್ನೈ', mr: 'चेन्नई', bn: 'চেন্নাই', gu: 'ચેન્નઈ', pa: 'ਚੇਨਈ' },
  Coimbatore: { en: 'Coimbatore', ta: 'கோயம்புத்தூர்', hi: 'कोयंबटूर', te: 'కోయంబత్తూరు', kn: 'ಕೊಯಮತ್ತೂರು', mr: 'कोईम्बतूर', bn: 'কোয়েম্বাটুর', gu: 'કોઇમ્બતૂર', pa: 'ਕੋਇੰਬਟੂਰ' },
  Cuddalore: { en: 'Cuddalore', ta: 'கடலூர்', hi: 'कुड्डालोर', te: 'కడలూరు', kn: 'ಕಡಲೂರು', mr: 'कड्डालोर', bn: 'কুড্ডালোর', gu: 'કુડ્ડાલોર', pa: 'ਕੁੱਡਾਲੋਰ' },
  Dharmapuri: { en: 'Dharmapuri', ta: 'தருமபுரி', hi: 'धर्मपुरी', te: 'ధర్మపురి', kn: 'ಧರ್ಮಪುರಿ', mr: 'धर्मपुरी', bn: 'ধর্মপুরী', gu: 'ધર્મપુરી', pa: 'ਧਰਮਪੁਰੀ' },
  Dindigul: { en: 'Dindigul', ta: 'திண்டுக்கல்', hi: 'डिंडीगुल', te: 'దిండిగల్', kn: 'ದಿಂಡಿಗಲ್', mr: 'दिंडीगुल', bn: 'ডিন্ডিগুল', gu: 'ડિંડીગુલ', pa: 'ਡਿੰਡੀਗੁਲ' },
  Erode: { en: 'Erode', ta: 'ஈரோடு', hi: 'ईरोड', te: 'ఈరోడ్', kn: 'ಈರೋಡ್', mr: 'इरोड', bn: 'ইরোড', gu: 'ઇરોડ', pa: 'ਈਰੋਡ' },
  Kallakurichi: { en: 'Kallakurichi', ta: 'கள்ளக்குறிச்சி', hi: 'कल्लाकुरिची', te: 'కళ్లకురిచి', kn: 'ಕಲ್ಲಕುರಿಚಿ', mr: 'कल्लाकुरीची', bn: 'কাল্লাকুরিচি', gu: 'કલ્લાકુરીચી', pa: 'ਕੱਲਾਕੁਰਿਚੀ' },
  Kanchipuram: { en: 'Kanchipuram', ta: 'காஞ்சிபுரம்', hi: 'कांचीपुरम', te: 'కాంచీపురం', kn: 'ಕಾಂಚೀಪುರಂ', mr: 'कांचीपुरम', bn: 'কাঞ্চীপুরম', gu: 'કાંચીપુરમ', pa: 'ਕਾਂਚੀਪੁਰਮ' },
  Kanyakumari: { en: 'Kanyakumari', ta: 'கன்னியாகுமரி', hi: 'कन्याकुमारी', te: 'కన్యాకుమారి', kn: 'ಕನ್ಯಾಕುಮಾರಿ', mr: 'कन्याकुमारी', bn: 'কন্যাকুমারী', gu: 'કન્યાકુમારી', pa: 'ਕੰਨਿਆਕੁਮਾਰੀ' },
  Karur: { en: 'Karur', ta: 'கரூர்', hi: 'करूर', te: 'కరూర్', kn: 'ಕರೂರ್', mr: 'करूर', bn: 'করুর', gu: 'કરુર', pa: 'ਕਰੂਰ' },
  Krishnagiri: { en: 'Krishnagiri', ta: 'கிருஷ்ணகிரி', hi: 'कृष्णगिरि', te: 'కృష్ణగిరి', kn: 'ಕೃಷ್ಣಗಿರಿ', mr: 'कृष्णगिरी', bn: 'কৃষ্ণগিরি', gu: 'કૃષ્ણગિરી', pa: 'ਕ੍ਰਿਸ਼ਨਗਿਰੀ' },
  Madurai: { en: 'Madurai', ta: 'மதுரை', hi: 'मदुरै', te: 'మధురై', kn: 'ಮಧುರೈ', mr: 'मदुराई', bn: 'মাদুরাই', gu: 'મદુરાઈ', pa: 'ਮਦੁਰਾਈ' },
  Mayiladuthurai: { en: 'Mayiladuthurai', ta: 'மயிலாடுதுறை', hi: 'मयिलादुथुरई', te: 'మయిలాడుతురై', kn: 'ಮಯಿಲಾಡುತುರೈ', mr: 'मयिलादुथुराई', bn: 'ময়িলাদুথুরাই', gu: 'મયિલાદુથુરાઇ', pa: 'ਮਯਿਲਾਦੁਥੁਰਾਈ' },
  Nagapattinam: { en: 'Nagapattinam', ta: 'நாகப்பட்டினம்', hi: 'नागपट्टिनम', te: 'నాగపట్నం', kn: 'ನಾಗಪಟ್ಟಿಣಂ', mr: 'नागपट्टिनम', bn: 'নাগাপট্টিনাম', gu: 'નાગપટ્ટિનમ', pa: 'ਨਾਗਪੱਟੀਨਮ' },
  Namakkal: { en: 'Namakkal', ta: 'நாமக்கல்', hi: 'नमक्कल', te: 'నమక్కల్', kn: 'ನಮಕ್ಕಲ್', mr: 'नमक्कल', bn: 'নমক্কল', gu: 'નમક્કલ', pa: 'ਨਮੱਕਲ' },
  Nilgiris: { en: 'Nilgiris', ta: 'நீலகிரி', hi: 'नीलगिरि', te: 'నీలగిరి', kn: 'ನೀಲಗಿರಿ', mr: 'निलगिरी', bn: 'নীলগিরি', gu: 'નીલગિરિ', pa: 'ਨੀਲਗਿਰੀ' },
  Perambalur: { en: 'Perambalur', ta: 'பெரம்பலூர்', hi: 'पेराम्बलुर', te: 'పెరంబలూరు', kn: 'ಪೆರಂಬಲೂರು', mr: 'पेरांबलूर', bn: 'পেরাম্বলুর', gu: 'પેરામ્બલુર', pa: 'ਪੇਰਾਮਬਲੁਰ' },
  Pudukkottai: { en: 'Pudukkottai', ta: 'புதுக்கோட்டை', hi: 'पुदुक्कोट्टई', te: 'పుదుక్కోటై', kn: 'ಪುದುಕೋಟೈ', mr: 'पुदुक्कोट्टई', bn: 'পুদুক্কোট্টাই', gu: 'પુદુક્કોટ્ટઇ', pa: 'ਪੁਦੁਕੋਟਈ' },
  Ramanathapuram: { en: 'Ramanathapuram', ta: 'ராமநாதபுரம்', hi: 'रामनाथपुरम', te: 'రామనాథపురం', kn: 'ರಾಮನಾಥಪುರಂ', mr: 'रामनाथपुरम', bn: 'রামনাথপুরম', gu: 'રામનાથપુરમ', pa: 'ਰਾਮਨਾਥਪੁਰਮ' },
  Ranipet: { en: 'Ranipet', ta: 'ராணிப்பேட்டை', hi: 'रानीपेट', te: 'రాణిపేట', kn: 'ರಾಣಿಪೇಟೆ', mr: 'राणीपेठ', bn: 'রানীপেট', gu: 'રાણીપેટ', pa: 'ਰਾਣੀਪੇਟ' },
  Salem: { en: 'Salem', ta: 'சேலம்', hi: 'सलेम', te: 'సేలం', kn: 'ಸೇಲಂ', mr: 'सेलम', bn: 'সালেম', gu: 'સેલેમ', pa: 'ਸਲੇਮ' },
  Sivaganga: { en: 'Sivaganga', ta: 'சிவகங்கை', hi: 'शिवगंगा', te: 'శివగంగ', kn: 'ಶಿವಗಂಗಾ', mr: 'शिवगंगा', bn: 'শিবগঙ্গা', gu: 'શિવગંગા', pa: 'ਸ਼ਿਵਗੰਗਾ' },
  Tenkasi: { en: 'Tenkasi', ta: 'தென்காசி', hi: 'तेनकासी', te: 'తెన్కాశి', kn: 'ತೆನ್ಕಾಸಿ', mr: 'तेनकाशी', bn: 'তেনকাশি', gu: 'તેનકાસી', pa: 'ਤੇਨਕਾਸੀ' },
  Thanjavur: { en: 'Thanjavur', ta: 'தஞ்சாவூர்', hi: 'तंजावुर', te: 'తంజావూరు', kn: 'ತಂಜಾವೂರು', mr: 'तंजावर', bn: 'তাঞ্জাভুর', gu: 'તંજાવુર', pa: 'ਤੰਜਾਵੁਰ' },
  Theni: { en: 'Theni', ta: 'தேனி', hi: 'थेनी', te: 'తేని', kn: 'ಥೇನಿ', mr: 'थेनी', bn: 'থেনি', gu: 'થેની', pa: 'ਥੇਨੀ' },
  Thoothukudi: { en: 'Thoothukudi', ta: 'தூத்துக்குடி', hi: 'थूथुकुडी', te: 'తూత్తుకుడి', kn: 'ತೂತುಕುಡಿ', mr: 'थुथुकुडी', bn: 'তুতিকোরিন', gu: 'થૂથુકુડી', pa: 'ਥੂਥੁਕੁਡੀ' },
  Tiruchirappalli: { en: 'Tiruchirappalli', ta: 'திருச்சிராப்பள்ளி', hi: 'तिरुचिरापल्ली', te: 'తిరుచిరాపల్లి', kn: 'ತಿರುಚಿರಾಪಳ್ಳಿ', mr: 'तिरुचिरापल्ली', bn: 'তিরুচিরাপল্লী', gu: 'તિરુચિરાપલ્લી', pa: 'ਤਿਰੁਚਿਰਾਪੱਲੀ' },
  Trichy: { en: 'Tiruchirappalli', ta: 'திருச்சி', hi: 'त्रिची', te: 'తిరుచిరాపల్లి', kn: 'ತಿರುಚಿರಾಪಳ್ಳಿ', mr: 'त्रिची', bn: 'ত্রিচি', gu: 'ત્રિચી', pa: 'ਤ੍ਰਿਚੀ' },
  Tirunelveli: { en: 'Tirunelveli', ta: 'திருநெல்வேலி', hi: 'तिरुनेलवेली', te: 'తిరునెల్వేలి', kn: 'ತಿರುನೆಲ್ವೇಲಿ', mr: 'तिरुनेलवेली', bn: 'তিরুনেলভেলি', gu: 'તિરુનેલવેલી', pa: 'ਤਿਰੂਨੇਲਵੇਲੀ' },
  Tirupathur: { en: 'Tirupathur', ta: 'திருப்பத்தூர்', hi: 'तिरुपत्तूर', te: 'తిరుపత్తూరు', kn: 'ತಿರುಪತ್ತೂರು', mr: 'तिरुपत्तूर', bn: 'তিরুপাত্তুর', gu: 'તિરુપત્તૂર', pa: 'ਤਿਰੁਪਤੂਰ' },
  Tiruppur: { en: 'Tiruppur', ta: 'திருப்பூர்', hi: 'तिरुपूर', te: 'తిరుప్పూర్', kn: 'ತಿರುಪ್ಪುರ್', mr: 'तिरुपूर', bn: 'তিরুপুর', gu: 'તિરુપૂર', pa: 'ਤਿਰੂਪੁਰ' },
  Tiruvallur: { en: 'Tiruvallur', ta: 'திருவள்ளூர்', hi: 'तिरुवल्लूर', te: 'తిరువళ్లూరు', kn: 'ತಿರುವಳ್ಳೂರು', mr: 'तिरुवल्लूर', bn: 'তিরুভাল্লুর', gu: 'તિરુવલ્લૂર', pa: 'ਤਿਰੁਵੱਲੂਰ' },
  Tiruvannamalai: { en: 'Tiruvannamalai', ta: 'திருவண்ணாமலை', hi: 'तिरुवन्नामलाई', te: 'తిరువణ్ణామలై', kn: 'ತಿರುವಣ್ಣಾಮಲೈ', mr: 'तिरुवन्नामलाई', bn: 'তিরুবন্নামালাই', gu: 'તિરુવન્નામલાઈ', pa: 'ਤਿਰੁਵੰਨਾਮਲਾਈ' },
  Tiruvarur: { en: 'Tiruvarur', ta: 'திருவாரூர்', hi: 'तिरुवारूर', te: 'తిరువారూరు', kn: 'ತಿರುವಾರೂರು', mr: 'तिरुवारूर', bn: 'তিরুভারুর', gu: 'તિરુવારુર', pa: 'ਤਿਰੁਵਾਰੂਰ' },
  Vellore: { en: 'Vellore', ta: 'வேலூர்', hi: 'वेल्लोर', te: 'వెల్లూరు', kn: 'ವೆಲ್ಲೂರು', mr: 'वेल्लोर', bn: 'ভেলোর', gu: 'વેલ્લોર', pa: 'ਵੇਲੋਰ' },
  Villupuram: { en: 'Villupuram', ta: 'விழுப்புரம்', hi: 'विल्लुपुरम', te: 'విల్లుపురం', kn: 'ವಿಲ್ಲುಪುರಂ', mr: 'विल्लुपुरम', bn: 'ভিলুপুরম', gu: 'વિલ્લુપુરમ', pa: 'ਵਿਲੂਪੁਰਮ' },
  Viluppuram: { en: 'Viluppuram', ta: 'விழுப்புரம்', hi: 'विल्लुपुरम', te: 'విల్లుపురం', kn: 'ವಿಲ್ಲುಪುರಂ', mr: 'विल्लुपुरम', bn: 'ভিলুপুরম', gu: 'વિલ્લુપુરમ', pa: 'ਵਿਲੂਪੁਰਮ' },
  Virudhunagar: { en: 'Virudhunagar', ta: 'விருதுநகர்', hi: 'विरुद्धनगर', te: 'విరుదునగర్', kn: 'ವಿರುಧುನಗರ', mr: 'विरुद्धनगर', bn: 'বিরুধুনগর', gu: 'વિરુધુનગર', pa: 'ਵਿਰੁਧੁਨਗਰ' },

  // --- Prominent Taluks, Agricultural Hubs & Towns in Tamil Nadu ---
  Vallam: { en: 'Vallam', ta: 'வல்லம்', hi: 'वल्लम', te: 'వల్లం', kn: 'ವಲ್ಲಂ', mr: 'वल्लम', bn: 'ভল্লম', gu: 'વલ્લમ', pa: 'ਵੱਲਮ' },
  Tiruchengode: { en: 'Tiruchengode', ta: 'திருச்செங்கோடு', hi: 'तिरुचेंगोडे', te: 'తిరుచెంగోడ్', kn: 'ತಿರುಚೆಂಗೋಡ್', mr: 'तिरुचेंगोडे', bn: 'তিরুচেঙ্গোড', gu: 'તિરુચેંગોડ', pa: 'ਤਿਰੂਚੇਂਗੋਡ' },
  Truchengode: { en: 'Tiruchengode', ta: 'திருச்செங்கோடு', hi: 'तिरुचेंगोडे', te: 'తిరుచెంగోడ్', kn: 'ತಿರುಚೆಂಗೋಡ್', mr: 'तिरुचेंगोडे', bn: 'তিরুচেঙ্গোড', gu: 'તિરુચેંગોડ', pa: 'ਤਿਰੂਚੇਂਗੋਡ' },
  Thiruchengodu: { en: 'Tiruchengode', ta: 'திருச்செங்கோடு', hi: 'तिरुचेंगोडे', te: 'తిరుచెంగోడ్', kn: 'ತಿರುಚೆಂಗೋಡ್', mr: 'तिरुचेंगोडे', bn: 'তিরুচেঙ্গোড', gu: 'તિરુચેંગોડ', pa: 'ਤਿਰੂਚੇਂਗੋਡ' },
  Thiruchengode: { en: 'Tiruchengode', ta: 'திருச்செங்கோடு', hi: 'तिरुचेंगोडे', te: 'తిరుచెంగோడ్', kn: 'ತಿರುಚೆಂಗೋಡ್', mr: 'तिरुचेंगोडे', bn: 'তিরুচেঙ্গোড', gu: 'તિરુચેંગોડ', pa: 'ਤਿਰੂਚੇਂਗੋਡ' },
  Rasipuram: { en: 'Rasipuram', ta: 'ராசிபுரம்', hi: 'रासीपुरम', te: 'రాసిపురం', kn: 'ರಾಸಿಪುರಂ', mr: 'रासीपुरम', bn: 'রাসিপুরম', gu: 'રાસીપુરમ', pa: 'ਰਾਸੀਪੁਰਮ' },
  Paramathi: { en: 'Paramathi', ta: 'பரமத்தி', hi: 'परमथी', te: 'పరమతి', kn: 'ಪರಮತಿ', mr: 'परमथी', bn: 'পরমথি', gu: 'પરમથી', pa: 'ਪਰਮਥੀ' },
  'Paramathi Velur': { en: 'Paramathi Velur', ta: 'பரமத்தி வேலூர்', hi: 'परमथी वेलूर', te: 'పరమతి వేలూరు', kn: 'ಪರಮತಿ ವೇಲೂರು', mr: 'परमथी वेलूर', bn: 'পরমথি ভেলুর', gu: 'પરમથી વેલુર', pa: 'ਪਰਮਥੀ ਵੇਲੁਰ' },
  'Kolli Hills': { en: 'Kolli Hills', ta: 'கொல்லிமலை', hi: 'कोल्ली हिल्स', te: 'కొల్లి కొండలు', kn: 'ಕೊಲ್ಲಿ ಬೆಟ್ಟಗಳು', mr: 'कोल्ली हिल्स', bn: 'কল্লি পাহাড়', gu: 'કોલ્લી હિલ્સ', pa: 'ਕੋੱਲੀ ਪਹਾੜੀਆਂ' },
  Mohanur: { en: 'Mohanur', ta: 'மோகனூர்', hi: 'मोहनूर', te: 'మోహనూరు', kn: 'ಮೋಹನೂರು', mr: 'मोहनूर', bn: 'মোহনুর', gu: 'મોહનુર', pa: 'ਮੋਹਨੂਰ' },
  Sendamangalam: { en: 'Sendamangalam', ta: 'சேந்தமங்கலம்', hi: 'सेंदमंगलम', te: 'సేందమంగళం', kn: 'ಸೇಂದಮಂಗಲಂ', mr: 'सेंदमंगलम', bn: 'সেন্দমঙ্গলম', gu: 'સેન્દમંગલમ', pa: 'ਸੇਂਦਾਮੰਗਲਮ' },
  Komarapalayam: { en: 'Komarapalayam', ta: 'குமாரபாளையம்', hi: 'कोमारपलायम', te: 'కోమారపాళ్యం', kn: 'ಕೋಮಾರಪಾಳ್ಯಂ', mr: 'कोमारपलायम', bn: 'কোমারপালায়ম', gu: 'કોમારપાલયમ', pa: 'ਕੋਮਾਰਪਾਲਯਮ' },
  Kumarapalayam: { en: 'Kumarapalayam', ta: 'குமாரபாளையம்', hi: 'कुमारपलायम', te: 'కుమారపాళ్యం', kn: 'ಕುಮಾರಪಾಳ್ಯಂ', mr: 'कुमारपलायम', bn: 'কুমারপালায়ম', gu: 'કુમારપાલયમ', pa: 'ਕੁਮਾਰਪਾਲਯਮ' },
  Pallipalayam: { en: 'Pallipalayam', ta: 'பள்ளிபாளையம்', hi: 'पल्लीपलायम', te: 'పల్లిపాళ్యం', kn: 'ಪಳ್ಳಿಪಾಳ್ಯಂ', mr: 'पल्लीपलायम', bn: 'পল্লীপালায়ম', gu: 'પલ્લીપાલયમ', pa: 'ਪੱਲੀਪਾਲਯਮ' },
  Pollachi: { en: 'Pollachi', ta: 'பொள்ளாச்சி', hi: 'पोलाची', te: 'పొల్లాచి', kn: 'ಪೊಲ್ಲಾಚಿ', mr: 'पोल्लाची', bn: 'পোল্লাচি', gu: 'પોલાચી', pa: 'ਪੋਲਾਚੀ' },
  Hosur: { en: 'Hosur', ta: 'ஓசூர்', hi: 'होसुर', te: 'హోసూరు', kn: 'ಹೊಸೂರು', mr: 'होसूर', bn: 'হোসুর', gu: 'હોસુર', pa: 'ਹੋਸੁਰ' },
  Gobichettipalayam: { en: 'Gobichettipalayam', ta: 'கோபிசெட்டிபாளையம்', hi: 'गोबीचेट्टीपलायम', te: 'గోబిచెట్టిపాళ్యం', kn: 'ಗೋಬಿಚೆಟ್ಟಿಪಾಳ್ಯಂ', mr: 'गोबीचेट्टीपलायम', bn: 'গোবিচেট্টিপালায়ম', gu: 'ગોબીચેટ્ટીપાલયમ', pa: 'ਗੋਬੀਚੇੱਟੀਪਾਲਯਮ' },
  Sathyamangalam: { en: 'Sathyamangalam', ta: 'சத்தியமங்கலம்', hi: 'सत्यमंगलम', te: 'సత్యమంగళం', kn: 'ಸತ್ಯಮಂಗಲಂ', mr: 'सत्यमंगलम', bn: 'সত্যমঙ্গলম', gu: 'સત્યમંગલમ', pa: 'ਸਤਿਆਮੰਗਲਮ' },
  Bhavani: { en: 'Bhavani', ta: 'பவானி', hi: 'भवानी', te: 'భవాని', kn: 'ಭವಾನಿ', mr: 'भवानी', bn: 'ভবানী', gu: 'ભવાની', pa: 'ਭਵਾਨੀ' },
  Perundurai: { en: 'Perundurai', ta: 'பெருந்துறை', hi: 'पेरुंदुरई', te: 'పెరుందురై', kn: 'ಪೆರುಂದುರೈ', mr: 'पेरुंदुराई', bn: 'পেরুনদুরাই', gu: 'પેરુન્દુરાઈ', pa: 'ਪੇਰੁੰਦੁਰਾਈ' },
  Sankari: { en: 'Sankari', ta: 'சங்ககிரி', hi: 'संकरी', te: 'సంకగిరి', kn: 'ಸಂಕಗಿರಿ', mr: 'संकरी', bn: 'সংকরি', gu: 'સંકરી', pa: 'ਸੰਕਰੀ' },
  Mettur: { en: 'Mettur', ta: 'மேட்டூர்', hi: 'मेट्टूर', te: 'మెట్టూరు', kn: 'ಮೆಟ್ಟೂರು', mr: 'मेट्टूर', bn: 'মেট্টুর', gu: 'મેટ્ટુર', pa: 'ਮੇਟੂਰ' },
  Attur: { en: 'Attur', ta: 'ஆத்தூர்', hi: 'अत्तूर', te: 'అత్తూరు', kn: 'ಅತ್ತೂರು', mr: 'अत्तूर', bn: 'আত্তুর', gu: 'અત્તુર', pa: 'ਅੱਤੁਰ' },
  Omalur: { en: 'Omalur', ta: 'ஓமலூர்', hi: 'ओमलुर', te: 'ఓమలూరు', kn: 'ಓಮಲೂರು', mr: 'ओमलूर', bn: 'ওমালুর', gu: 'ઓમલુર', pa: 'ਓਮਲੁਰ' },
  Edappadi: { en: 'Edappadi', ta: 'எடப்பாடி', hi: 'एडापड्डी', te: 'ఎడప్పాడి', kn: 'ಎಡಪ್ಪಾಡಿ', mr: 'एडापड्डी', bn: 'এডাপ্পাডি', gu: 'એડાપડ્ડી', pa: 'ਐਡਾਪਾਡੀ' },
  Dharapuram: { en: 'Dharapuram', ta: 'தாராபுரம்', hi: 'धारापुरम', te: 'ధారాపురం', kn: 'ಧಾರಾಪುರಂ', mr: 'धारापुरम', bn: 'ধারাপুরম', gu: 'ધારાપુરમ', pa: 'ਧਾਰਾਪੁਰਮ' },
  Kangeyam: { en: 'Kangeyam', ta: 'காங்கேயம்', hi: 'कांगेयम', te: 'కాంగేయం', kn: 'ಕಾಂಗೇಯಂ', mr: 'कांगेयम', bn: 'কাঙ্গেয়াম', gu: 'કાંગેયમ', pa: 'ਕਾਂਗੇਯਮ' },
  Udumalaipettai: { en: 'Udumalaipettai', ta: 'உடுமலைப்பேட்டை', hi: 'उडुमलाईपेट्टई', te: 'ఉడుమలపేట', kn: 'ಉಡುಮಲೈಪೇಟೆ', mr: 'उडुमलाईपेठ', bn: 'উডুমালাইপেট্টাই', gu: 'ઉડુમલાઈપેટ્ટઈ', pa: 'ਉਦੁਮਲਾਈਪੇਟਈ' },
  Palani: { en: 'Palani', ta: 'பழனி', hi: 'पलानी', te: 'పళని', kn: 'ಪಳನಿ', mr: 'पलानी', bn: 'পালানি', gu: 'પલાની', pa: 'ਪਲਾਨੀ' },
  Kodaikanal: { en: 'Kodaikanal', ta: 'கொடைக்கானல்', hi: 'कोडाइकनाल', te: 'కొడైకెనాల్', kn: 'ಕೊಡೈಕೆನಾಲ್', mr: 'कोडाईकॅनॉल', bn: 'কোডাইকানাল', gu: 'કોડાઈકનાલ', pa: 'ਕੋਡਾਈਕਨਾਲ' },
  Kumbakonam: { en: 'Kumbakonam', ta: 'கும்பகோணம்', hi: 'कुंभकोणम', te: 'కుంభకోణం', kn: 'ಕುಂಭಕೋಣಂ', mr: 'कुंभकोणम', bn: 'কুম্ভকোণম', gu: 'કુંભકોણમ', pa: 'ਕੁੰਭਕੋਣਮ' },
  Pattukkottai: { en: 'Pattukkottai', ta: 'பட்டுக்கோட்டை', hi: 'पट्टुक्कोट्टई', te: 'పట్టుక్కోటై', kn: 'ಪಟ್ಟುಕೋಟೈ', mr: 'पट्टुक्कोट्टई', bn: 'পট্টুক্কোট্টাই', gu: 'પટ્ટુક્કોટ્ટઈ', pa: 'ਪੱਟੂਕੋਟਈ' },
  Mannargudi: { en: 'Mannargudi', ta: 'மன்னார்குடி', hi: 'मन्नारगुडी', te: 'మన్నార్గుడి', kn: 'ಮನ್ನಾರ್ಗುಡಿ', mr: 'मन्नारगुडी', bn: 'মান্নারগুডি', gu: 'મન્નારગુડી', pa: 'ਮੰਨਾਰਗੁੜੀ' },
  Sirkazhi: { en: 'Sirkazhi', ta: 'சீர்காழி', hi: 'सिरकाली', te: 'సీర్కాళి', kn: 'ಸಿರ್ಕಾಳಿ', mr: 'सिरकाली', bn: 'সিরকাঝি', gu: 'સિરકાઝી', pa: 'ਸਿਰਕਾਜ਼ੀ' },
  Chidambaram: { en: 'Chidambaram', ta: 'சிதம்பரம்', hi: 'चिदंबरम', te: 'చిదంబరం', kn: 'ಚಿದಂಬರಂ', mr: 'चिदंबरम', bn: 'চিদাম্বরম', gu: 'ચિદમ્બરમ', pa: 'ਚਿਦੰਬਰਮ' },
  Panruti: { en: 'Panruti', ta: 'பண்ருட்டி', hi: 'पनरुति', te: 'పన్రుటి', kn: 'ಪನ್ರುಟಿ', mr: 'पनरुति', bn: 'পানরুতি', gu: 'પનરુતિ', pa: 'ਪਨਰੁਤੀ' },
  Neyveli: { en: 'Neyveli', ta: 'நெய்வேலி', hi: 'नेवेली', te: 'నెయ్వేలి', kn: 'ನೈವೇಲಿ', mr: 'नेवेली', bn: 'নেভেলি', gu: 'નેવેલી', pa: 'ਨੇਵੇਲੀ' },
  Tindivanam: { en: 'Tindivanam', ta: 'திண்டிவனம்', hi: 'तिंडिवनम', te: 'తిండివనం', kn: 'ತಿಂಡಿವನಂ', mr: 'तिंडिवनम', bn: 'তিন্দিভানাম', gu: 'તિંડિવનમ', pa: 'ਤਿੰਡੀਵਨਮ' },
  Gingee: { en: 'Gingee', ta: 'செஞ்சி', hi: 'जिंजी', te: 'జింజి', kn: 'ಜಿಂಜಿ', mr: 'जिंजी', bn: 'জিঞ্জি', gu: 'જિન્જી', pa: 'ਜਿੰਜੀ' },
  Tirukoilur: { en: 'Tirukoilur', ta: 'திருக்கோவிலூர்', hi: 'तिरुकोयिलूर', te: 'తిరుకోవిలూర్', kn: 'ತಿರುಕೋಯಿಲೂರು', mr: 'तिरुकोयिलूर', bn: 'তিরুকোয়িলুর', gu: 'તિરુકોયિલુર', pa: 'ਤਿਰੁਕੋਇਲੁਰ' },
  Arani: { en: 'Arani', ta: 'ஆரணி', hi: 'आरणी', te: 'ఆరణి', kn: 'ಆರಣಿ', mr: 'आरणी', bn: 'আরণি', gu: 'આરણી', pa: 'ਆਰਣੀ' },
  Polur: { en: 'Polur', ta: 'போளூர்', hi: 'पोलूर', te: 'పోలూరు', kn: 'ಪೋಲೂರು', mr: 'पोलूर', bn: 'পোলুর', gu: 'પોલુર', pa: 'ਪੋਲੂਰ' },
  Cheyyar: { en: 'Cheyyar', ta: 'செய்யாறு', hi: 'चेय्यार', te: 'చెయ్యార్', kn: 'ಚೆಯ್ಯಾರ್', mr: 'चेय्यार', bn: 'চেয়ার', gu: 'ચેય્યાર', pa: 'ਚੇਯਾਰ' },
  Vandavasi: { en: 'Vandavasi', ta: 'வந்தவாசி', hi: 'வந்தவாசி', te: 'వందవాసి', kn: 'ವಂದವಾಸಿ', mr: 'वंदवासी', bn: 'ভান্দাভাসি', gu: 'વંદવાસી', pa: 'ਵੰਦਾਵਾਸੀ' },
  Tambaram: { en: 'Tambaram', ta: 'தாம்பரம்', hi: 'तांबरम', te: 'తాంబరం', kn: 'ತಾಂಬರಂ', mr: 'तांबरम', bn: 'তাম্বারাম', gu: 'તાંબરમ', pa: 'ਤਾਂਬਰਮ' },
  Sriperumbudur: { en: 'Sriperumbudur', ta: 'ஸ்ரீபெரும்புதூர்', hi: 'श्रीपेरंबुदूर', te: 'శ్రీపెరంబుదూర్', kn: 'ಶ್ರೀಪೆರಂಬುದೂರು', mr: 'श्रीपेरंबुदूर', bn: 'শ্রীপেরুম্বুদুর', gu: 'શ્રીપેરમ્બુદુર', pa: 'ਸ਼੍ਰੀਪੇਰੰਬੁਦੂਰ' },
  Arakkonam: { en: 'Arakkonam', ta: 'அரக்கோணம்', hi: 'अराक्कोणम', te: 'అరక్కోణం', kn: 'ಅರಕ್ಕೋಣಂ', mr: 'अराक्कोणम', bn: 'আরাক্কোনম', gu: 'અરાક્કોણમ', pa: 'ਅਰਾਕੋਣਮ' },
  Sholinghur: { en: 'Sholinghur', ta: 'சோளிங்கர்', hi: 'शोलिंगुर', te: 'శోలింగూర్', kn: 'ಶೋಲಿಂಗೂರ್', mr: 'शोलिंगुर', bn: 'শোলিঙ্গুর', gu: 'શોલિંગુર', pa: 'ਸ਼ੋਲਿੰਗੁਰ' },
  Ambur: { en: 'Ambur', ta: 'ஆம்பூர்', hi: 'आंबुर', te: 'ఆంబూరు', kn: 'ಆಂಬೂರು', mr: 'आंबूर', bn: 'আম্বর', gu: 'આંબુર', pa: 'ਆਮਬੂਰ' },
  Vaniyambadi: { en: 'Vaniyambadi', ta: 'வாணியம்பாடி', hi: 'वानियामबाडी', te: 'వాణియంబాడి', kn: 'ವಾಣಿಯಂಬಾಡಿ', mr: 'वानियामबाडी', bn: 'ভানিয়াম্বাদি', gu: 'વાણિયામબાદી', pa: 'ਵਾਨਿਆਮਬਾਡੀ' },
  Gudiyatham: { en: 'Gudiyatham', ta: 'குடியாத்தம்', hi: 'गुडियात्तम', te: 'గుడియాత్తం', kn: 'ಗುಡಿಯಾತ್ತಂ', mr: 'गुडियात्तम', bn: 'গুডিয়াথম', gu: 'ગુડિયાત્તમ', pa: 'ਗੁਡੀਆਥਮ' },

  // --- Major Indian Agricultural Metros & Cities ---
  Bengaluru: { en: 'Bengaluru', ta: 'பெங்களூரு', hi: 'बेंगलुरु', te: 'బెంగళూరు', kn: 'ಬೆಂಗಳೂರು', mr: 'बंगळुरू', bn: 'বেঙ্গালুরু', gu: 'બેંગલુરુ', pa: 'ਬੈਂਗਲੁਰੂ' },
  Bangalore: { en: 'Bengaluru', ta: 'பெங்களூரு', hi: 'बेंगलुरु', te: 'బెంగళూరు', kn: 'ಬೆಂಗಳೂರು', mr: 'बंगळुरू', bn: 'বেঙ্গালুরু', gu: 'બેંગલુરુ', pa: 'ਬੈਂਗਲੁਰੂ' },
  Mysuru: { en: 'Mysuru', ta: 'மைசூரு', hi: 'मैसूरु', te: 'మైసూరు', kn: 'ಮೈಸೂರು', mr: 'म्हैसूर', bn: 'মহীশূর', gu: 'મૈસૂર', pa: 'ਮੈਸੂਰ' },
  Hyderabad: { en: 'Hyderabad', ta: 'ஹைதராபாத்', hi: 'हैदराबाद', te: 'హైదరాబాద్', kn: 'ಹೈದರಾಬಾದ್', mr: 'हैदराबाद', bn: 'হায়দ্রাবাদ', gu: 'હૈદરાબાદ', pa: 'ਹੈਦਰਾਬਾਦ' },
  Vijayawada: { en: 'Vijayawada', ta: 'விஜயவாடா', hi: 'विजयवाड़ा', te: 'విజయవాడ', kn: 'ವಿಜಯವಾಡ', mr: 'विजयवाडा', bn: 'বিজয়ওয়াড়া', gu: 'વિજયવાડા', pa: 'ਵਿਜੇਵਾੜਾ' },
  Guntur: { en: 'Guntur', ta: 'குண்டூர்', hi: 'गुंटूर', te: 'గుంటూరు', kn: 'ಗುಂಟೂರು', mr: 'गुंटूर', bn: 'গুন্টুর', gu: 'ગુંટુર', pa: 'ਗੁੰਟੂਰ' },
  Visakhapatnam: { en: 'Visakhapatnam', ta: 'விசாகப்பட்டினம்', hi: 'विशाखापट्टनम', te: 'విశాఖపట్నం', kn: 'ವಿಶಾಖಪಟ್ಟಣ', mr: 'विशाखापट्टणम', bn: 'বিশাখাপত্তনম', gu: 'વિશાખાપટ્ટનમ', pa: 'ਵਿਸ਼ਾਖਾਪਟਨਮ' },
  Kochi: { en: 'Kochi', ta: 'கொச்சி', hi: 'कोच्चि', te: 'కొచ్చి', kn: 'ಕೊಚ್ಚಿ', mr: 'कोची', bn: 'কোচি', gu: 'કોચી', pa: 'ਕੋਚੀ' },
  Thiruvananthapuram: { en: 'Thiruvananthapuram', ta: 'திருவனந்தபுரம்', hi: 'तिरुवनंतपुरम', te: 'తిరువనంతపురం', kn: 'ತಿರುವನಂತಪುರಂ', mr: 'तिरुवनंतपुरम', bn: 'তিরুবনন্তপুরম', gu: 'તિરુવનંતપુરમ', pa: 'ਤਿਰੂਵਨੰਤਪੁਰਮ' },
  Palakkad: { en: 'Palakkad', ta: 'பாலக்காடு', hi: 'पालक्काड़', te: 'పాలక్కాడ్', kn: 'ಪಾಲಕ್ಕಾಡ್', mr: 'पालक्काड', bn: 'পালাক্কাদ', gu: 'પાલક્કાડ', pa: 'ਪਾਲੱਕੜ' },
  Mumbai: { en: 'Mumbai', ta: 'மும்பை', hi: 'मुंबई', te: 'ముంబై', kn: 'ಮುಂಬೈ', mr: 'मुंबई', bn: 'মুম্বই', gu: 'મુંબઈ', pa: 'ਮੁੰਬਈ' },
  Pune: { en: 'Pune', ta: 'புனே', hi: 'पुणे', te: 'పుణె', kn: 'ಪುಣೆ', mr: 'पुणे', bn: 'পুনে', gu: 'પુણે', pa: 'ਪੁਣੇ' },
  Nashik: { en: 'Nashik', ta: 'நாசிக்', hi: 'नासिक', te: 'నాసిక్', kn: 'ನಾಸಿಕ್', mr: 'नाशिक', bn: 'নাসিক', gu: 'નાસિક', pa: 'ਨਾਸਿਕ' },
  Nagpur: { en: 'Nagpur', ta: 'நாக்பூர்', hi: 'नागपुर', te: 'నాగ్‌పూర్', kn: 'ನಾಗಪುರ', mr: 'नागपूर', bn: 'নাগপুর', gu: 'નાગપુર', pa: 'ਨਾਗਪੁਰ' },
  Ahmedabad: { en: 'Ahmedabad', ta: 'அகமதாபாத்', hi: 'अहमदाबाद', te: 'అహ్మదాబాద్', kn: 'ಅಹಮದಾಬಾದ್', mr: 'अहमदाबाद', bn: 'আহমেদাবাদ', gu: 'અમદાવાદ', pa: 'ਅਹਿਮਦਾਬਾਦ' },
  Surat: { en: 'Surat', ta: 'சூரத்', hi: 'सूरत', te: 'సూరత్', kn: 'ಸೂರತ್', mr: 'सुरत', bn: 'সুরাট', gu: 'સુરત', pa: 'ਸੂਰਤ' },
  Rajkot: { en: 'Rajkot', ta: 'ராஜ்கோட்', hi: 'राजकोट', te: 'రాజ్‌కోట్', kn: 'ರಾಜ್‌ಕೋಟ್', mr: 'राजकोट', bn: 'রাজকোট', gu: 'રાજકોટ', pa: 'ਰਾਜਕੋਟ' },
  Ludhiana: { en: 'Ludhiana', ta: 'லூதியானா', hi: 'लुधियाना', te: 'లూధియానా', kn: 'ಲುಧಿಯಾನ', mr: 'लुधियाना', bn: 'লুধিয়ানা', gu: 'લુધિયાણા', pa: 'ਲੁਧਿਆਣਾ' },
  Amritsar: { en: 'Amritsar', ta: 'அமிர்தசரஸ்', hi: 'अमृतसर', te: 'అమృత్‌సర్', kn: 'ಅಮೃತಸರ', mr: 'अमृतसर', bn: 'অমৃতসর', gu: 'અમૃતસર', pa: 'ਅੰਮ੍ਰਿਤਸਰ' },
  Patiala: { en: 'Patiala', ta: 'பாட்டியாலா', hi: 'पटियाला', te: 'పాటియాలా', kn: 'ಪಟಿಯಾಲ', mr: 'पतियाळा', bn: 'পাতিয়ালা', gu: 'પટિયાલા', pa: 'ਪਟਿਆਲਾ' },
  Karnal: { en: 'Karnal', ta: 'கர்னால்', hi: 'करनाल', te: 'కర్నాల్', kn: 'ಕರ್ನಾಲ್', mr: 'कर्नाल', bn: 'কারনাল', gu: 'કરનાલ', pa: 'ਕਰਨਾਲ' },
  Lucknow: { en: 'Lucknow', ta: 'லக்னோ', hi: 'लखनऊ', te: 'లక్నో', kn: 'ಲಕ್ನೋ', mr: 'लखनौ', bn: 'লখনউ', gu: 'લખનૌ', pa: 'ਲਖਨਊ' },
  Varanasi: { en: 'Varanasi', ta: 'வாரணாசி', hi: 'वाराणसी', te: 'వారణాసి', kn: 'ವಾರಣಾಸಿ', mr: 'वाराणसी', bn: 'বারাণসী', gu: 'વારાણસી', pa: 'ਵਾਰਾਣਸੀ' },
  Prayagraj: { en: 'Prayagraj', ta: 'பிரயாக்ராஜ்', hi: 'प्रयागराज', te: 'ప్రయాగ్‌రాజ్', kn: 'ಪ್ರಯಾಗ್‌ರಾಜ್', mr: 'प्रयागराज', bn: 'প্রয়াগরাজ', gu: 'પ્રયાગરાજ', pa: 'ਪ੍ਰਯਾਗਰਾਜ' },
  Kanpur: { en: 'Kanpur', ta: 'கான்பூர்', hi: 'कानपुर', te: 'కాన్పూర్', kn: 'ಕಾನ್ಪುರ', mr: 'कानपूर', bn: 'কানপুর', gu: 'કાનપુર', pa: 'ਕਾਨਪੁਰ' },
  Bhopal: { en: 'Bhopal', ta: 'போபால்', hi: 'भोपाल', te: 'భోపాల్', kn: 'ಭೋಪಾಲ್', mr: 'भोपाळ', bn: 'ভোপাল', gu: 'ભોપાલ', pa: 'ਭੋਪਾਲ' },
  Indore: { en: 'Indore', ta: 'இந்தூர்', hi: 'इंदौर', te: 'ఇండోర్', kn: 'ಇಂದೋರ್', mr: 'इंदूर', bn: 'ইন্দোর', gu: 'ઇન્દોર', pa: 'ਇੰਦੌਰ' },
  Jaipur: { en: 'Jaipur', ta: 'ஜெய்ப்பூர்', hi: 'जयपुर', te: 'జైపూర్', kn: 'ಜೈಪುರ', mr: 'जयपूर', bn: 'জয়পুর', gu: 'જયપુર', pa: 'ਜੈਪੁਰ' },
  Jodhpur: { en: 'Jodhpur', ta: 'ஜோத்பூர்', hi: 'जोधपुर', te: 'జోధ్‌పూర్', kn: 'ಜೋಧ್‌ಪುರ', mr: 'जोधपूर', bn: 'যোধপুর', gu: 'જોધપુર', pa: 'ਜੋਧਪੁਰ' },
  Kolkata: { en: 'Kolkata', ta: 'கொல்கத்தா', hi: 'कोलकाता', te: 'కోల్‌కతా', kn: 'ಕೋಲ್ಕತ್ತಾ', mr: 'कोलकाता', bn: 'কলকাতা', gu: 'કોલકાતા', pa: 'ਕੋਲਕਾਤਾ' },
  Patna: { en: 'Patna', ta: 'பாட்னா', hi: 'पटना', te: 'పాట్నా', kn: 'ಪಾಟ್ನಾ', mr: 'पाटणा', bn: 'পাটনা', gu: 'પટના', pa: 'ਪਟਨਾ' },
  Bhubaneswar: { en: 'Bhubaneswar', ta: 'புவனேஸ்வர்', hi: 'भुवनेश्वर', te: 'భువనేశ్వర్', kn: 'ಭುವನೇಶ್ವರ', mr: 'भुवनेश्वर', bn: 'ভুবনেশ্বর', gu: 'ભુવનેશ્વર', pa: 'ਭੁਵਨੇਸ਼ਵਰ' },
  Guwahati: { en: 'Guwahati', ta: 'குவஹாத்தி', hi: 'गुवाहाटी', te: 'గౌహతి', kn: 'ಗುವಾಹಟಿ', mr: 'गुवाहाटी', bn: 'গুয়াহাটি', gu: 'ગુવાહાટી', pa: 'ਗੁਵਾਹਾਟੀ' },
};

/**
 * Universal Reverse Lookup Map for cross-language token identification
 */
const REVERSE_LOOKUP_MAP: Map<string, string> = new Map();
for (const [canonicalKey, translations] of Object.entries(LOCATION_TOKENS)) {
  REVERSE_LOOKUP_MAP.set(canonicalKey.toLowerCase(), canonicalKey);
  for (const val of Object.values(translations)) {
    if (val && typeof val === 'string') {
      REVERSE_LOOKUP_MAP.set(val.toLowerCase().trim(), canonicalKey);
    }
  }
}

/**
 * Common alternate spellings and phonetic variations
 */
const LOCATION_ALIASES: Record<string, string> = {
  truchengode: 'Tiruchengode',
  thiruchengodu: 'Tiruchengode',
  thiruchengode: 'Tiruchengode',
  tiruchengode: 'Tiruchengode',
  namakkal: 'Namakkal',
  salem: 'Salem',
  kovai: 'Coimbatore',
  coimbatore: 'Coimbatore',
  trichy: 'Tiruchirappalli',
  madras: 'Chennai',
  bangalore: 'Bengaluru',
  bombay: 'Mumbai',
  calcutta: 'Kolkata',
  tanjore: 'Thanjavur',
  tuticorin: 'Thoothukudi',
  pondicherry: 'Puducherry',
  orissa: 'Odisha',
};

/**
 * Multi-language geographic qualifiers dictionary
 */
const QUALIFIER_DICTIONARY: Record<string, string> = {
  district: 'district',
  taluk: 'taluk',
  taluka: 'taluka',
  block: 'block',
  city: 'city',
  town: 'town',
  village: 'village',
  // Tamil
  மாவட்டம்: 'district',
  வட்டம்: 'taluk',
  கிராமம்: 'village',
  நகரம்: 'city',
  ஒன்றியம்: 'block',
  // Hindi
  ज़िला: 'district',
  जिला: 'district',
  तालुका: 'taluk',
  गांव: 'village',
  शहर: 'city',
  कस्बा: 'town',
  प्रखंड: 'block',
  // Telugu
  జిల్లా: 'district',
  తాలూకా: 'taluk',
  గ్రామం: 'village',
  నగరం: 'city',
  పట్టణం: 'town',
  // Kannada
  ಜಿಲ್ಲೆ: 'district',
  ತಾಲೂಕು: 'taluk',
  ಗ್ರಾಮ: 'village',
  ನಗರ: 'city',
  ಪಟ್ಟಣ: 'town',
  // Marathi
  जिल्हा: 'district',
  गाव: 'village',
  // Bengali
  জেলা: 'district',
  তালুক: 'taluk',
  গ্রাম: 'village',
  শহর: 'city',
  // Gujarati
  જિલ્લો: 'district',
  તાલુકો: 'taluk',
  ગામ: 'village',
  // Punjabi
  ਜ਼ਿਲ੍ਹਾ: 'district',
  ਤਹਿਸੀਲ: 'taluk',
  ਪਿੰਡ: 'village',
};

/**
 * Phonetic transliteration engine for unlisted Indian locality names
 */
export function transliterateIndian(word: string, targetLang: SupportedLang): string {
  if (!word || targetLang === 'en') return word;

  const TAMIL_MAP: Record<string, string> = {
    th: 'த்', dh: 'த்', zh: 'ழ்', sh: 'ஷ்', ch: 'ச்', gh: 'க்', kh: 'க்', ph: 'ப்', bh: 'ப்',
    k: 'க்', g: 'க்', c: 'க்', s: 'ஸ்', j: 'ஜ்', t: 'ட்', d: 'ட்', n: 'ன்', p: 'ப்', b: 'ப்',
    m: 'ம்', y: 'ய்', r: 'ர்', l: 'ல்', v: 'வ்', w: 'வ்', h: 'ஹ்', z: 'ஸ்', ng: 'ங்',
    a: 'ா', e: 'ே', i: 'ி', o: 'ோ', u: 'ு', ai: 'ை', au: 'ௌ', oo: 'ூ', ee: 'ீ'
  };

  const HINDI_MAP: Record<string, string> = {
    th: 'थ', dh: 'ध', zh: 'झ', sh: 'श', ch: 'च', gh: 'घ', kh: 'ख', ph: 'फ', bh: 'भ',
    k: 'क', g: 'ग', c: 'क', s: 'स', j: 'ज', t: 'ट', d: 'ड', n: 'न', p: 'प', b: 'ब',
    m: 'म', y: 'य', r: 'र', l: 'ल', v: 'व', w: 'व', h: 'ह', z: 'ज़', ng: 'ंग',
    a: 'ा', e: 'े', i: 'ि', o: 'ो', u: 'ु', ai: 'ै', au: 'ौ', oo: 'ू', ee: 'ी'
  };

  const TELUGU_MAP: Record<string, string> = {
    th: 'థ', dh: 'ధ', zh: 'ఝ', sh: 'శ', ch: 'చ', gh: 'ఘ', kh: 'ఖ', ph: 'ఫ', bh: 'భ',
    k: 'క', g: 'గ', c: 'క', s: 'స', j: 'జ', t: 'ట', d: 'డ', n: 'న', p: 'ప', b: 'బ',
    m: 'మ', y: 'య', r: 'ర', l: 'ల', v: 'వ', w: 'వ', h: 'హ', z: 'జ', ng: 'ంగ్',
    a: 'ా', e: 'ే', i: 'ి', o: 'ో', u: 'ు', ai: 'ై', au: 'ౌ', oo: 'ూ', ee: 'ీ'
  };

  const KANNADA_MAP: Record<string, string> = {
    th: 'ಥ', dh: 'ಧ', zh: 'ಝ', sh: 'ಶ', ch: 'ಚ', gh: 'ಘ', kh: 'ಖ', ph: 'ಫ', bh: 'ಭ',
    k: 'ಕ', g: 'ಗ', c: 'ಕ', s: 'ಸ', j: 'ಜ', t: 'ಟ', d: 'ಡ', n: 'ನ', p: 'ಪ', b: 'ಬ',
    m: 'ಮ', y: 'ಯ', r: 'ರ', l: 'ಲ', v: 'ವ', w: 'ವ', h: 'ಹ', z: 'ಜ', ng: 'ಂಗ್',
    a: 'ಾ', e: 'ೇ', i: 'ಿ', o: 'ೋ', u: 'ು', ai: 'ೈ', au: 'ೌ', oo: 'ೂ', ee: 'ೀ'
  };

  const BENGALI_MAP: Record<string, string> = {
    th: 'থ', dh: 'ধ', zh: 'ঝ', sh: 'শ', ch: 'চ', gh: 'ঘ', kh: 'খ', ph: 'ফ', bh: 'ভ',
    k: 'ক', g: 'গ', c: 'ক', s: 'স', j: 'জ', t: 'ট', d: 'ড', n: 'ন', p: 'প', b: 'ব',
    m: 'ম', y: 'য', r: 'র', l: 'ল', v: 'ভ', w: 'ও', h: 'হ', z: 'জ', ng: 'ং',
    a: 'া', e: 'ে', i: 'ি', o: 'ো', u: 'ু', ai: 'ৈ', au: 'ৌ', oo: 'ূ', ee: 'ী'
  };

  const GUJARATI_MAP: Record<string, string> = {
    th: 'થ', dh: 'ધ', zh: 'ઝ', sh: 'શ', ch: 'ચ', gh: 'ઘ', kh: 'ખ', ph: 'ફ', bh: 'ભ',
    k: 'ક', g: 'ગ', c: 'ક', s: 'સ', j: 'જ', t: 'ટ', d: 'ડ', n: 'ન', p: 'પ', b: 'બ',
    m: 'મ', y: 'ય', r: 'ર', l: 'લ', v: 'વ', w: 'વ', h: 'હ', z: 'ઝ', ng: 'ંગ',
    a: 'ા', e: 'ે', i: 'િ', o: 'ો', u: 'ુ', ai: 'ૈ', au: 'ૌ', oo: 'ૂ', ee: 'ી'
  };

  const PUNJABI_MAP: Record<string, string> = {
    th: 'ਥ', dh: 'ਧ', zh: 'ਝ', sh: 'ਸ਼', ch: 'ਚ', gh: 'ਘ', kh: 'ਖ', ph: 'ਫ', bh: 'ਭ',
    k: 'ਕ', g: 'ਗ', c: 'ਕ', s: 'ਸ', j: 'ਜ', t: 'ਟ', d: 'ਡ', n: 'ਨ', p: 'ਪ', b: 'ਬ',
    m: 'ਮ', y: 'ਯ', r: 'ਰ', l: 'ਲ', v: 'ਵ', w: 'ਵ', h: 'ਹ', z: 'ਜ਼', ng: 'ਂਗ',
    a: 'ਾ', e: 'ੇ', i: 'ਿ', o: 'ੋ', u: 'ੁ', ai: 'ੈ', au: 'ੌ', oo: 'ੂ', ee: 'ੀ'
  };

  const map = targetLang === 'ta' ? TAMIL_MAP
    : (targetLang === 'hi' || targetLang === 'mr') ? HINDI_MAP
    : targetLang === 'te' ? TELUGU_MAP
    : targetLang === 'kn' ? KANNADA_MAP
    : targetLang === 'bn' ? BENGALI_MAP
    : targetLang === 'gu' ? GUJARATI_MAP
    : targetLang === 'pa' ? PUNJABI_MAP
    : null;

  if (!map) return word;

  let str = word.toLowerCase();
  let result = '';
  let i = 0;
  while (i < str.length) {
    const two = str.slice(i, i + 2);
    if (map[two]) {
      result += map[two];
      i += 2;
      continue;
    }
    const one = str[i];
    if (map[one]) {
      result += map[one];
    } else {
      result += one;
    }
    i += 1;
  }
  return result || word;
}

/**
 * Localizes a single location segment (e.g. "Namakkal district", "Tiruchengode", "Tamil Nadu", "தமிழ்நாடு")
 */
export function localizeSingleLocationPart(part: string, lang: SupportedLang): string {
  if (!part) return '';
  const trimmed = part.trim();
  const lower = trimmed.toLowerCase();

  // 1. Check Reverse Lookup Map (Matches English or any regional translation)
  const reverseMatch = REVERSE_LOOKUP_MAP.get(lower);
  if (reverseMatch && LOCATION_TOKENS[reverseMatch]) {
    return LOCATION_TOKENS[reverseMatch][lang] || LOCATION_TOKENS[reverseMatch].en || trimmed;
  }

  // 2. Check Aliases (e.g. 'truchengode' -> 'Tiruchengode')
  const aliasMatch = LOCATION_ALIASES[lower];
  if (aliasMatch && LOCATION_TOKENS[aliasMatch]) {
    return LOCATION_TOKENS[aliasMatch][lang] || LOCATION_TOKENS[aliasMatch].en || trimmed;
  }

  // 3. Check for Qualifiers across languages (e.g. "Namakkal district", "நாமக்கல் மாவட்டம்", "சேலம் மாவட்டம்")
  for (const [qualWord, canonicalQual] of Object.entries(QUALIFIER_DICTIONARY)) {
    const regex = new RegExp(`\\b${qualWord}\\b`, 'i');
    if (regex.test(trimmed)) {
      const baseName = trimmed.replace(regex, '').trim();
      const localizedBase = baseName ? localizeSingleLocationPart(baseName, lang) : '';
      const localizedQual = LOCATION_TOKENS[canonicalQual]?.[lang] || canonicalQual;
      return localizedBase ? `${localizedBase} ${localizedQual}` : localizedQual;
    }
  }

  // 4. Check for Directional Prefixes (e.g. "North Salem", "South Arcot")
  const prefixes = ['North', 'South', 'East', 'West', 'Central', 'Rural', 'Urban'];
  for (const p of prefixes) {
    const regex = new RegExp(`^${p}\\s+`, 'i');
    if (regex.test(trimmed)) {
      const baseName = trimmed.replace(regex, '').trim();
      const localizedBase = baseName ? localizeSingleLocationPart(baseName, lang) : '';
      const localizedPrefix = LOCATION_TOKENS[p]?.[lang] || p;
      return localizedBase ? `${localizedPrefix} ${localizedBase}` : localizedPrefix;
    }
  }

  // 5. If target is English and input is non-Latin, return trimmed or phonetic
  if (lang === 'en') {
    return trimmed;
  }

  // 6. Fallback to phonetic transliteration
  return transliterateIndian(trimmed, lang);
}

/**
 * Translates any farm's location string into the active language
 * Handles comma-separated, hyphen-separated, or composite location phrases.
 */
export function getLocalizedLocation(loc: string | undefined, lang: SupportedLang): string {
  if (!loc) return '';
  const trimmed = loc.trim();

  // 1. Direct match check
  const directMatch = REVERSE_LOOKUP_MAP.get(trimmed.toLowerCase());
  if (directMatch && LOCATION_TOKENS[directMatch]) {
    return LOCATION_TOKENS[directMatch][lang] || LOCATION_TOKENS[directMatch].en || trimmed;
  }

  // 2. Tokenized comma separation translation (e.g. "Tiruchengode, Namakkal district, தமிழ்நாடு, இந்தியா")
  if (trimmed.includes(',')) {
    const parts = trimmed.split(',').map((p) => p.trim()).filter(Boolean);
    const translatedParts = parts.map((part) => localizeSingleLocationPart(part, lang));
    // Deduplicate adjacent identical parts
    const unique = translatedParts.filter((item, index) => translatedParts.indexOf(item) === index && item.length > 0);
    return unique.join(', ');
  }

  return localizeSingleLocationPart(trimmed, lang);
}
