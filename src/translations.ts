export type Language = 'en' | 'hi';

export const translations = {
  en: {
    portalBadge: 'Healthcare Directory & Guide',
    portalTitle: 'Ayushman',
    portalSubtitle: 'Acolyte',
    tollFree: 'Support:',
    languageToggle: 'हिंदी',
    
    // Page 0: Dual Selection
    p0Badge: 'Community Healthcare Search Platform',
    p0MainTitle: 'Welcome to',
    p0MainTitleHighlight: 'Ayushman Acolyte',
    p0Desc: 'Explore nearby empaneled hospitals, check covered healthcare packages, or browse hospital facility profiles.',
    
    p0UserCardBadge: 'For Patients & Citizens',
    p0UserCardTitle: 'Find Nearby Hospitals',
    p0UserCardSub: 'अस्पताल एवं सुविधाएं खोजें',
    p0UserCardDesc: 'Search 29,000+ empaneled hospitals, check cashless surgeries, read patient reviews, and get directions.',
    p0UserPoint1: 'Locate Nearest Empaneled Hospitals by GPS',
    p0UserPoint2: 'Check 1,940+ Free Covered Surgeries',
    p0UserPoint3: 'Read & Submit Verified Patient Reviews',
    p0UserCta: 'Search Hospitals & Benefits',
    
    p0AdminCardBadge: 'Hospital Information Desk',
    p0AdminCardTitle: 'Hospital Facility Desk',
    p0AdminCardSub: 'अस्पताल सुविधा केंद्र',
    p0AdminCardDesc: 'Information desk for hospital bed capacity, Ayushman Mitra counters, and pre-auth assistance.',
    p0AdminPoint1: 'Ayushman Mitra Counter Details',
    p0AdminPoint2: 'Pre-Authorization & Assistance Info',
    p0AdminPoint3: 'Bed Capacity & Specialties Overview',
    p0AdminCta: 'View Hospital Facility Desk',
    
    // Page 1
    badgeText: 'Healthcare Facilitation Guide',
    mainTitle: 'Ayushman',
    mainTitleHighlight: 'Acolyte Directory',
    mainDesc: 'Choose an option below to locate nearby empaneled hospitals, learn about covered surgeries, or watch helpful guidance videos.',
    
    // Card 1
    card1Badge: 'Hospital Finder',
    card1Title: 'Search Empaneled Hospitals',
    card1Sub: 'नजदीकी अस्पताल खोजें',
    card1Desc: 'Locate nearby empaneled hospitals, check available beds, and view covered surgery packages.',
    card1Point1: 'Find Nearest Hospitals by GPS',
    card1Point2: 'View Free Covered Surgeries',
    card1Cta: 'Find Hospitals Near Me',
    
    // Card 2
    card2Badge: 'National Portal Link',
    card2Title: 'PM-JAY Scheme Details',
    card2Sub: 'योजना विवरण एवं दिशानिर्देश',
    card2Desc: 'Read complete scheme information and access the public beneficiary portal on beneficiary.nha.gov.in.',
    card2Point1: 'View Scheme Guidelines',
    card2Point2: 'Open beneficiary.nha.gov.in',
    card2Cta: 'Visit NHA Website',
    
    // Card 3
    card3Badge: 'Video Tutorial',
    card3Title: 'How PM-JAY Works (Video)',
    card3Sub: 'वीडियो जानकारी देखें',
    card3Desc: 'Watch a step-by-step video explaining treatment packages, hospital admission, and cashless benefits.',
    card3Point1: 'Watch Informational Video',
    card3Point2: 'Watch on YouTube',
    card3Cta: 'Watch Video Tutorial',
    
    // Metrics
    metric1Val: '₹5,00,000',
    metric1Label: 'Annual Health Cover / Family',
    metric2Val: '29,000+',
    metric2Label: 'Empaneled Hospitals Across India',
    metric3Val: '1,940+',
    metric3Label: 'Covered Procedures & Surgeries',
    
    // Page 2: Location & Hospitals
    backToStep1: 'Back to Guide',
    p2HeaderBadge: 'Verified Healthcare Network',
    p2Title: 'Nearby Empaneled Hospitals',
    p2Desc: 'Live GPS tracked hospitals ranked in real time by distance from your coordinates with Ayushman Mitra desk.',
    
    // Location Permission Modal / Card
    locDetecting: 'Tracking live GPS location...',
    locGranted: 'Live GPS Coordinates Active',
    locDenied: 'GPS Permission Denied / Unavailable',
    locPromptTitle: 'Enable GPS Location Access',
    locPromptDesc: 'Allow location permission so Ayushman Acolyte can track your exact GPS coordinates and show real hospitals nearest to you.',
    locBtnAllow: 'Allow Location Permission',
    locBtnManual: 'Use Selected City',
    locAccuracyNote: 'High accuracy GPS is used solely for precise distance calculation.',
    
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
    viewDetailsCta: 'View Hospital Details & Reviews',
    noHospitalsFound: 'No empaneled hospitals found matching your filter in this area.',
    
    // Page 3: Hospital Profile & Reviews
    backToHospitals: 'Back to Hospital List',
    p3Badge: 'PM-JAY Empaneled Facility Profile',
    overallRating: 'Overall Beneficiary Rating',
    basedOn: 'based on verified patient reviews',
    cashlessCovered: '100% Cashless under PM-JAY',
    hospitalOverview: 'Hospital Overview & Facilities',
    keySpecialtiesTitle: 'Covered Medical Specialties & Free Surgery Packages',
    ayushmanMitraDeskTitle: 'Ayushman Mitra Help Desk Details',
    mitraTiming: 'Working Hours: 24x7 Counter at Reception Ground Floor',
    mitraDocsRequired: 'Requirements: Scheme identification & Doctor Referral Slip.',
    reviewsTitle: 'Verified Beneficiary Reviews & Ratings',
    writeReviewBtn: 'Write a Review',
    cancelReviewBtn: 'Cancel',
    submitReviewBtn: 'Submit Verified Review',
    yourName: 'Your Full Name',
    treatmentAvailed: 'Treatment / Surgery Availed',
    ratingLabel: 'Your Rating',
    commentsLabel: 'Describe your treatment & cashless experience',
    reviewSuccessMsg: 'Thank you! Your verified review has been submitted successfully.',
    facilityPharmacy: '24x7 In-House Pharmacy (Free Medicines)',
    facilityBloodBank: 'Authorized Blood Bank & Component Lab',
    facilityIcu: 'Dedicated ICU / CCU Critical Beds',
    facilityAmbulance: '24x7 Ambulance & Emergency Trauma Unit',
    facilityDiagnostics: 'Digital X-Ray, CT Scan & Ultrasound Labs',
    facilityCashlessDesk: 'Dedicated PM-JAY Fast-Track Admission Desk',
    
    // Admin / Desk Placeholder
    adminBackToHome: 'Back to Main Menu',
    adminTitle: 'Hospital Facility & Mitra Desk',
    adminSubtitle: 'Hospital Facility Roster & Information Center',
    adminLoginPrompt: 'Explore hospital facilities, Ayushman Mitra counter info, and assistance guidelines.',
    adminHospitalId: 'Hospital Code',
    adminUsername: 'Staff / Desk Name',
    adminPassword: 'PIN',
    adminLoginBtn: 'Open Facility Desk',
    adminDashboardTitle: 'Hospital Facility Desk (Preview)',
    adminDashboardDesc: 'Dashboard modules are configured and ready for implementation in the next phase.',
    adminNotice: 'Hospital Facility Desk modules will be expanded in the upcoming update.',
    
    // Footer
    footerTitle: 'Ayushman Acolyte | Healthcare Assistance & Hospital Locator',
    footerSubtitle: 'A Public Initiative to Facilitate PM-JAY Beneficiaries',
    footerDisclaimer: 'Disclaimer: Ayushman Acolyte is an independent public directory designed to help patients locate nearby hospitals. For all official registrations, visit beneficiary.nha.gov.in.',
    footerCopyright: '© 2026 Ayushman Acolyte. All healthcare package info aligned with public guidelines.',
    footerHelpline: 'National Helpline:'
  },
  hi: {
    portalBadge: 'स्वास्थ्य निर्देशिका एवं मार्गदर्शक',
    portalTitle: 'आयुष्मान',
    portalSubtitle: 'एकाेलाइट (Acolyte)',
    tollFree: 'सहायता:',
    languageToggle: 'English',
    
    // Page 0: Dual Selection
    p0Badge: 'सामुदायिक स्वास्थ्य खोज मंच',
    p0MainTitle: 'स्वागत है',
    p0MainTitleHighlight: 'आयुष्मान एकाेलाइट',
    p0Desc: 'नजदीकी अस्पताल खोजें, सर्जरी पैकेज देखें या अस्पताल सुविधा विवरण देखें।',
    
    p0UserCardBadge: 'मरीजों एवं नागरिकों हेतु',
    p0UserCardTitle: 'नजदीकी अस्पताल खोजें',
    p0UserCardSub: 'Find Nearby Hospitals',
    p0UserCardDesc: '29,000+ सूचीबद्ध अस्पताल खोजें, मुफ्त सर्जरी पैकेज देखें, मरीज समीक्षाएं पढ़ें और रास्ता देखें।',
    p0UserPoint1: 'जीपीएस द्वारा निकटतम सूचीबद्ध अस्पताल खोजें',
    p0UserPoint2: '1,940+ मुफ्त कवर की गई सर्जरी पैकेज देखें',
    p0UserPoint3: 'सत्यापित मरीज समीक्षाएं पढ़ें और दर्ज करें',
    p0UserCta: 'अस्पताल एवं सुविधाएं खोजें',
    
    p0AdminCardBadge: 'अस्पताल सूचना डेस्क',
    p0AdminCardTitle: 'अस्पताल सुविधा केंद्र',
    p0AdminCardSub: 'Hospital Facility Desk',
    p0AdminCardDesc: 'अस्पताल बेड क्षमता, आयुष्मान मित्र काउंटर एवं पूर्व-अनुमोदन सहायता की जानकारी।',
    p0AdminPoint1: 'आयुष्मान मित्र काउंटर विवरण',
    p0AdminPoint2: 'पूर्व-अनुमोदन एवं सहायता जानकारी',
    p0AdminPoint3: 'बेड क्षमता एवं विशेषज्ञता अवलोकन',
    p0AdminCta: 'अस्पताल सुविधा केंद्र देखें',
    
    // Page 1
    badgeText: 'स्वास्थ्य सहायता मार्गदर्शिका',
    mainTitle: 'आयुष्मान',
    mainTitleHighlight: 'एकाेलाइट निर्देशिका',
    mainDesc: 'नजदीकी अस्पताल खोजने, सर्जरी पैकेज जानने या वीडियो गाइड देखने के लिए विकल्प चुनें।',
    
    // Card 1
    card1Badge: 'अस्पताल खोज',
    card1Title: 'सूचीबद्ध अस्पताल खोजें',
    card1Sub: 'Find Empaneled Hospitals',
    card1Desc: 'नजदीकी सूचीबद्ध अस्पताल खोजें, मुफ्त सर्जरी, ऑपरेशन और उपचार की जानकारी प्राप्त करें।',
    card1Point1: 'सूचीबद्ध अस्पताल खोजें',
    card1Point2: 'मुफ्त कवर की गई सर्जरी देखें',
    card1Cta: 'नजदीकी अस्पताल खोजें',
    
    // Card 2
    card2Badge: 'राष्ट्रीय पोर्टल लिंक',
    card2Title: 'पीएम-जय योजना विवरण',
    card2Sub: 'Scheme Guidelines & Info',
    card2Desc: 'योजना की पूरी जानकारी पढ़ें और beneficiary.nha.gov.in पर सार्वजनिक पोर्टल देखें।',
    card2Point1: 'योजना दिशानिर्देश देखें',
    card2Point2: 'beneficiary.nha.gov.in खोलें',
    card2Cta: 'एनएचए पोर्टल खोलें',
    
    // Card 3
    card3Badge: 'वीडियो ट्यूटोरियल',
    card3Title: 'योजना कैसे कार्य करती है (वीडियो)',
    card3Sub: 'Informational Video',
    card3Desc: 'उपचार पैकेज, अस्पताल में भर्ती और कैशलेस सुविधाओं की पूरी जानकारी वीडियो में देखें।',
    card3Point1: 'जानकारी वीडियो देखें',
    card3Point2: 'यूट्यूब (YouTube) पर देखें',
    card3Cta: 'वीडियो ट्यूटोरियल देखें',
    
    // Metrics
    metric1Val: '₹5,00,000',
    metric1Label: 'प्रति परिवार वार्षिक स्वास्थ्य कवर',
    metric2Val: '29,000+',
    metric2Label: 'भारत भर में सूचीबद्ध अस्पताल',
    metric3Val: '1,940+',
    metric3Label: 'कवर की गई सर्जरी और उपचार',
    
    // Page 2: Location & Hospitals
    backToStep1: 'मार्गदर्शिका पर वापस जाएं',
    p2HeaderBadge: 'सत्यापित स्वास्थ्य नेटवर्क',
    p2Title: 'नजदीकी सूचीबद्ध अस्पताल',
    p2Desc: 'आपके सटीक जीपीएस निर्देशांकों से दूरी के आधार पर क्रमित वास्तविक अस्पताल, आयुष्मान मित्र डेस्क सहित।',
    
    // Location Permission Modal / Card
    locDetecting: 'लाइव जीपीएस ट्रैक किया जा रहा है...',
    locGranted: 'सक्रिय जीपीएस निर्देशांक',
    locDenied: 'जीपीएस अनुमति अस्वीकृत / अनुपलब्ध',
    locPromptTitle: 'जीपीएस स्थान अनुमति दें',
    locPromptDesc: 'सटीक दूरी की गणना करने और आपके निकटतम वास्तविक अस्पताल दिखाने के लिए कृपया लोकेशन की अनुमति दें।',
    locBtnAllow: 'लोकेशन अनुमति दें',
    locBtnManual: 'चुने गए शहर का उपयोग करें',
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
    getDirections: 'रास्ता देखें (Google Maps)',
    viewDetailsCta: 'अस्पताल की पूरी जानकारी और समीक्षाएं देखें',
    noHospitalsFound: 'चुने गए फ़िल्टर के लिए कोई अस्पताल नहीं मिला।',
    
    // Page 3: Hospital Profile & Reviews
    backToHospitals: 'अस्पतालों की सूची पर वापस जाएं',
    p3Badge: 'पीएम-जय सूचीबद्ध अस्पताल प्रोफाइल',
    overallRating: 'समग्र लाभार्थी रेटिंग',
    basedOn: 'सत्यापित मरीज समीक्षाओं के आधार पर',
    cashlessCovered: 'पीएम-जय के तहत 100% कैशलेस कवर',
    hospitalOverview: 'अस्पताल सुविधाएं एवं अवलोकन',
    keySpecialtiesTitle: 'कवर की गई चिकित्सा विशेषज्ञताएं एवं मुफ्त सर्जरी पैकेज',
    ayushmanMitraDeskTitle: 'आयुष्मान मित्र सहायता केंद्र विवरण',
    mitraTiming: 'कार्य समय: भूतल मुख्य स्वागत कक्ष पर 24x7 काउंटर उपलब्ध',
    mitraDocsRequired: 'आवश्यकता: पहचान पत्र और डॉक्टर पर्ची।',
    reviewsTitle: 'सत्यापित लाभार्थी समीक्षाएं एवं अनुभव',
    writeReviewBtn: 'अपनी समीक्षा लिखें',
    cancelReviewBtn: 'रद्द करें',
    submitReviewBtn: 'समीक्षा जमा करें',
    yourName: 'आपका पूरा नाम',
    treatmentAvailed: 'प्राप्त किया गया इलाज / सर्जरी',
    ratingLabel: 'आपकी रेटिंग',
    commentsLabel: 'अपने इलाज एवं कैशलेस अनुभव का विवरण दें',
    reviewSuccessMsg: 'धन्यवाद! आपकी समीक्षा सफलतापूर्वक दर्ज कर ली गई है।',
    facilityPharmacy: '24x7 इन-हाउस फार्मेसी (मुफ्त दवाइयां)',
    facilityBloodBank: 'मान्यता प्राप्त ब्लड बैंक एवं कंपोनेंट लैब',
    facilityIcu: 'समर्पित आईसीयू / सीसीयू क्रिटिकल केयर बेड्स',
    facilityAmbulance: '24x7 एम्बुलेंस एवं आपातकालीन ट्रॉमा यूनिट',
    facilityDiagnostics: 'डिजिटल एक्स-रे, सीटी स्कैन व अल्ट्रासाउंड लैब्स',
    facilityCashlessDesk: 'समर्पित पीएम-जय फास्ट-ट्रैक एडमिशन काउंटर',
    
    // Admin / Desk Placeholder
    adminBackToHome: 'मुख्य मेन्यू पर वापस जाएं',
    adminTitle: 'अस्पताल सुविधा केंद्र',
    adminSubtitle: 'अस्पताल सुविधा रोस्टर एवं सूचना केंद्र',
    adminLoginPrompt: 'अस्पताल सुविधाएं, आयुष्मान मित्र काउंटर विवरण और सहायता जानकारी देखें।',
    adminHospitalId: 'अस्पताल कोड',
    adminUsername: 'स्टाफ / डेस्क नाम',
    adminPassword: 'पिन',
    adminLoginBtn: 'सुविधा केंद्र खोलें',
    adminDashboardTitle: 'अस्पताल सुविधा केंद्र (प्रीव्यू)',
    adminDashboardDesc: 'डैशबोर्ड मॉड्यूल कॉन्फ़िगर कर दिए गए हैं और अगले चरण में पूरी तरह से सक्रिय होंगे।',
    adminNotice: 'अस्पताल सुविधा केंद्र मॉड्यूल आपके अगले निर्देश के अनुसार विस्तारित किए जाएंगे।',
    
    // Footer
    footerTitle: 'आयुष्मान एकाेलाइट (Ayushman Acolyte) | स्वास्थ्य सहायता एवं अस्पताल खोज',
    footerSubtitle: 'पीएम-जय लाभार्थियों की सुविधा हेतु नागरिक पहल',
    footerDisclaimer: 'अस्वीकरण: आयुष्मान एकाेलाइट एक स्वतंत्र सार्वजनिक निर्देशिका है जो मरीजों को नजदीकी अस्पताल खोजने में सहायता करती है। आधिकारिक पंजीकरण हेतु beneficiary.nha.gov.in पर जाएं।',
    footerCopyright: '© 2026 आयुष्मान एकाेलाइट। सभी जानकारी सार्वजनिक दिशानिर्देशों के अनुरूप।',
    footerHelpline: 'राष्ट्रीय हेल्पलाइन:'
  }
};
