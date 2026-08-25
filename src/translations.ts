export type Language = 'en' | 'hi';

export const translations = {
  en: {
    portalBadge: 'PM-JAY Seva Portal',
    portalTitle: 'Ayushman Bharat',
    portalSubtitle: 'Health Desk',
    tollFree: 'Toll-Free:',
    languageToggle: 'हिंदी',
    
    // Page 1
    badgeText: 'Official Beneficiary Assistance Desk',
    mainTitle: 'Ayushman Bharat',
    mainTitleHighlight: 'Beneficiary Portal',
    mainDesc: 'Choose an option below to find empaneled hospitals & surgeries, apply online via the official government portal, or watch the step-by-step video guide.',
    
    // Card 1
    card1Badge: 'Card Holder',
    card1Title: 'I have Ayushman Card',
    card1Sub: 'मेरे पास आयुष्मान कार्ड है',
    card1Desc: 'Find nearby empaneled hospitals, check covered surgeries, operations, and cashless treatments.',
    card1Point1: 'Search Empaneled Hospitals',
    card1Point2: 'View Free Covered Surgeries',
    card1Cta: 'Proceed to Step 2',
    
    // Card 2
    card2Badge: 'Official Portal (NHA)',
    card2Title: 'Apply for Ayushman Card',
    card2Sub: 'आयुष्मान कार्ड ऑनलाइन बनाएं',
    card2Desc: 'Directly apply, complete Aadhaar e-KYC, check family eligibility, and download card on the official government portal.',
    card2Point1: 'Instant eKYC & Card Download',
    card2Point2: 'Official NHA Beneficiary Link',
    card2Cta: 'Apply on beneficiary.nha.gov.in',
    
    // Card 3
    card3Badge: 'Video Guide',
    card3Title: "I don't have Ayushman Card",
    card3Sub: 'वीडियो ट्यूटोरियल देखें',
    card3Desc: 'Watch a quick step-by-step video guide explaining eligibility, documents needed, and how to apply easily.',
    card3Point1: 'Complete application tutorial',
    card3Point2: 'Watch on YouTube',
    card3Cta: 'Watch Tutorial Video',
    
    // Metrics
    metric1Val: '₹5,00,000',
    metric1Label: 'Annual Free Cover / Family',
    metric2Val: '29,000+',
    metric2Label: 'Empaneled Hospitals Across India',
    metric3Val: '1,940+',
    metric3Label: 'Covered Procedures & Surgeries',
    
    // Page 2: Location & Hospitals
    backToStep1: 'Back to Step 1',
    p2HeaderBadge: 'Verified PM-JAY Network',
    p2Title: 'Nearby Empaneled Hospitals',
    p2Desc: 'Automatically sorted by distance from your current GPS location with Ayushman Mitra help desk support.',
    
    // Location Permission Modal / Card
    locDetecting: 'Detecting your GPS location...',
    locGranted: 'GPS Location Active',
    locDenied: 'GPS Permission Denied / Unavailable',
    locPromptTitle: 'Enable GPS Location Access',
    locPromptDesc: 'Allow location access so we can automatically calculate exact distances and show the 10 nearest hospitals to you.',
    locBtnAllow: 'Allow GPS Access',
    locBtnManual: 'Use Current City Default (New Delhi / NCR)',
    locAccuracyNote: 'High accuracy GPS used solely for distance calculation.',
    
    // Filters
    filterLabel: 'Filter by Hospital Type:',
    filterAll: 'All Hospitals (Both)',
    filterGovt: 'Government Hospitals',
    filterPrivate: 'Private Hospitals',
    
    // Hospital Card
    rankedPrefix: 'Rank #',
    distAway: 'away',
    estDrive: 'est. drive',
    pmjayEmpaneled: 'PM-JAY Empaneled',
    ayushmanMitra: 'Ayushman Mitra Desk Active',
    bedsAvailable: 'Beds',
    specialtiesCovered: 'Covered Key Specialties & Surgeries:',
    callHospital: 'Call',
    emergencyCall: 'Emergency',
    getDirections: 'Get Directions',
    noHospitalsFound: 'No empaneled hospitals found for the selected filter.',
    
    // Footer
    footerTitle: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY)',
    footerSubtitle: 'National Health Authority Public Information Desk',
    footerCopyright: '© 2026 Ayushman Bharat Digital Mission. All information aligned with official guidelines.',
    footerHelpline: 'Toll-Free 24x7 Helpline:'
  },
  hi: {
    portalBadge: 'पीएम-जय सेवा पोर्टल',
    portalTitle: 'आयुष्मान भारत',
    portalSubtitle: 'स्वास्थ्य सहायता केंद्र',
    tollFree: 'टोल-फ्री:',
    languageToggle: 'English',
    
    // Page 1
    badgeText: 'आधिकारिक लाभार्थी सहायता केंद्र',
    mainTitle: 'आयुष्मान भारत',
    mainTitleHighlight: 'लाभार्थी पोर्टल',
    mainDesc: 'सूचीबद्ध अस्पताल और सर्जरी खोजने, आधिकारिक सरकारी पोर्टल से ऑनलाइन आवेदन करने, या वीडियो गाइड देखने के लिए नीचे दिए गए विकल्प चुनें।',
    
    // Card 1
    card1Badge: 'कार्ड धारक',
    card1Title: 'मेरे पास आयुष्मान कार्ड है',
    card1Sub: 'I have Ayushman Card',
    card1Desc: 'नजदीकी सूचीबद्ध अस्पताल खोजें, मुफ्त सर्जरी, ऑपरेशन और कैशलेस उपचार की जानकारी प्राप्त करें।',
    card1Point1: 'सूचीबद्ध अस्पताल खोजें',
    card1Point2: 'मुफ्त कवर की गई सर्जरी देखें',
    card1Cta: 'चरण 2 पर आगे बढ़ें',
    
    // Card 2
    card2Badge: 'आधिकारिक पोर्टल (NHA)',
    card2Title: 'आयुष्मान कार्ड के लिए आवेदन करें',
    card2Sub: 'Apply for Ayushman Card',
    card2Desc: 'आधिकारिक सरकारी पोर्टल पर सीधे आवेदन करें, आधार ई-केवाईसी पूरी करें, पात्रता जांचें और कार्ड डाउनलोड करें।',
    card2Point1: 'त्वरित ई-केवाईसी और कार्ड डाउनलोड',
    card2Point2: 'आधिकारिक NHA लाभार्थी लिंक',
    card2Cta: 'beneficiary.nha.gov.in पर जाएं',
    
    // Card 3
    card3Badge: 'वीडियो मार्गदर्शिका',
    card3Title: 'मेरे पास आयुष्मान कार्ड नहीं है',
    card3Sub: "I don't have Ayushman Card",
    card3Desc: 'पात्रता, आवश्यक दस्तावेज और आसानी से आवेदन करने का तरीका जानने के लिए सरल वीडियो ट्यूटोरियल देखें।',
    card3Point1: 'आवेदन करने की पूरी विधि',
    card3Point2: 'यूट्यूब (YouTube) पर देखें',
    card3Cta: 'वीडियो ट्यूटोरियल देखें',
    
    // Metrics
    metric1Val: '₹5,00,000',
    metric1Label: 'प्रति परिवार वार्षिक मुफ्त उपचार',
    metric2Val: '29,000+',
    metric2Label: 'भारत भर में सूचीबद्ध अस्पताल',
    metric3Val: '1,940+',
    metric3Label: 'कवर की गई सर्जरी और उपचार',
    
    // Page 2: Location & Hospitals
    backToStep1: 'चरण 1 पर वापस जाएं',
    p2HeaderBadge: 'सत्यापित पीएम-जय नेटवर्क',
    p2Title: 'नजदीकी सूचीबद्ध अस्पताल',
    p2Desc: 'आपके वर्तमान जीपीएस स्थान से दूरी के आधार पर क्रमित 10 सर्वश्रेष्ठ अस्पताल, आयुष्मान मित्र सहायता डेस्क सहित।',
    
    // Location Permission Modal / Card
    locDetecting: 'आपका जीपीएस स्थान प्राप्त किया जा रहा है...',
    locGranted: 'जीपीएस स्थान सक्रिय',
    locDenied: 'जीपीएस अनुमति अस्वीकृत / अनुपलब्ध',
    locPromptTitle: 'जीपीएस स्थान अनुमति दें',
    locPromptDesc: 'सटीक दूरी की गणना करने और आपके 10 सबसे नजदीकी सूचीबद्ध अस्पताल दिखाने के लिए कृपया लोकेशन की अनुमति दें।',
    locBtnAllow: 'जीपीएस अनुमति दें',
    locBtnManual: 'डिफ़ॉल्ट शहर का उपयोग करें (नई दिल्ली / एनसीआर)',
    locAccuracyNote: 'सटीक जीपीएस का उपयोग केवल दूरी की गणना के लिए किया जाता है।',
    
    // Filters
    filterLabel: 'अस्पताल के प्रकार के अनुसार चुनें:',
    filterAll: 'सभी अस्पताल (दोनों)',
    filterGovt: 'सरकारी अस्पताल (Government)',
    filterPrivate: 'निजी अस्पताल (Private)',
    
    // Hospital Card
    rankedPrefix: 'रैंक #',
    distAway: 'की दूरी पर',
    estDrive: 'अनुमानित यात्रा समय',
    pmjayEmpaneled: 'पीएम-जय सूचीबद्ध (Empaneled)',
    ayushmanMitra: 'आयुष्मान मित्र डेस्क उपलब्ध',
    bedsAvailable: 'बेड्स',
    specialtiesCovered: 'प्रमुख सर्जरी एवं विशेषज्ञताएं:',
    callHospital: 'कॉल करें',
    emergencyCall: 'आपातकालीन',
    getDirections: 'रास्ता देखें (Maps)',
    noHospitalsFound: 'चुने गए फ़िल्टर के लिए कोई अस्पताल नहीं मिला।',
    
    // Footer
    footerTitle: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (AB PM-JAY)',
    footerSubtitle: 'राष्ट्रीय स्वास्थ्य प्राधिकरण जन सूचना केंद्र',
    footerCopyright: '© 2026 आयुष्मान भारत डिजिटल मिशन। सभी जानकारी आधिकारिक दिशानिर्देशों के अनुरूप।',
    footerHelpline: 'टोल-फ्री 24x7 हेल्पलाइन:'
  }
};
