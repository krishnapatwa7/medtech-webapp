export type Language = 'en' | 'hi';

export const translations = {
  en: {
    portalBadge: 'Healthcare Assistance Portal',
    portalTitle: 'Ayushman',
    portalSubtitle: 'Acolyte',
    tollFree: 'Helpline:',
    languageToggle: 'हिंदी',
    
    // Page 0: Dual Login Landing
    p0Badge: 'Ayushman Bharat Healthcare Companion',
    p0MainTitle: 'Welcome to',
    p0MainTitleHighlight: 'Ayushman Acolyte',
    p0Desc: 'Select your designated portal below to search hospitals, view surgical packages, or access the Hospital Administration Desk.',
    
    p0UserCardBadge: 'For Citizens & Families',
    p0UserCardTitle: 'Beneficiary / User Portal',
    p0UserCardSub: 'नागरिक एवं लाभार्थी लॉगिन',
    p0UserCardDesc: 'Search 29,000+ empaneled hospitals, check cashless surgeries, read patient reviews, and apply online.',
    p0UserPoint1: 'Find Nearest Empaneled Hospitals by GPS',
    p0UserPoint2: 'Check 1,940+ Free Covered Surgeries',
    p0UserPoint3: 'Read & Submit Verified Patient Reviews',
    p0UserCta: 'Enter as Beneficiary / User',
    
    p0AdminCardBadge: 'For Empaneled Hospital Staff',
    p0AdminCardTitle: 'Hospital Admin Login',
    p0AdminCardSub: 'अस्पताल प्रशासनिक लॉगिन',
    p0AdminCardDesc: 'Dedicated desk for hospital management, Ayushman Mitra coordinators, patient pre-auth & bed availability.',
    p0AdminPoint1: 'Ayushman Mitra Helpdesk Coordination',
    p0AdminPoint2: 'Pre-Authorization & Claim Status',
    p0AdminPoint3: 'Manage Bed Inventory & Specialty Listings',
    p0AdminCta: 'Access Hospital Admin Portal',
    
    // Page 1
    badgeText: 'Citizen Healthcare Facilitation Desk',
    mainTitle: 'Ayushman',
    mainTitleHighlight: 'Acolyte Portal',
    mainDesc: 'Your trusted healthcare companion to find empaneled hospitals, check covered surgeries, or apply online via the official PM-JAY portal.',
    
    // Card 1
    card1Badge: 'Card Holder',
    card1Title: 'I have Ayushman Card',
    card1Sub: 'मेरे पास आयुष्मान कार्ड है',
    card1Desc: 'Find nearby empaneled hospitals, check covered surgeries, operations, and cashless treatments.',
    card1Point1: 'Search Empaneled Hospitals',
    card1Point2: 'View Free Covered Surgeries',
    card1Cta: 'Proceed to Step 2',
    
    // Card 2
    card2Badge: 'Official NHA Portal (External)',
    card2Title: 'Apply for Ayushman Card',
    card2Sub: 'आयुष्मान कार्ड ऑनलाइन बनाएं',
    card2Desc: 'Directly apply, complete Aadhaar e-KYC, check family eligibility, and download card on the official government website (beneficiary.nha.gov.in).',
    card2Point1: 'Instant eKYC & Card Download',
    card2Point2: 'Direct Link to beneficiary.nha.gov.in',
    card2Cta: 'Open beneficiary.nha.gov.in',
    
    // Card 3
    card3Badge: 'Video Tutorial',
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
    mitraDocsRequired: 'Documents needed: Ayushman Card (or ABHA ID / Aadhaar Card) & Doctor Referral Slip.',
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
    
    // Admin Login / Dashboard Placeholder
    adminBackToHome: 'Back to Portal Selection',
    adminTitle: 'Hospital Admin & Empanelment Portal',
    adminSubtitle: 'Hospital Administration & Ayushman Mitra Desk',
    adminLoginPrompt: 'Sign in to access hospital management, Ayushman Mitra counter, and pre-auth claims.',
    adminHospitalId: 'Hospital Empanelment Code (e.g. HOSP-CG-042)',
    adminUsername: 'Admin ID / Staff Username',
    adminPassword: 'Password / Security PIN',
    adminLoginBtn: 'Login to Admin Dashboard',
    adminDashboardTitle: 'Hospital Admin Dashboard (Preview Mode)',
    adminDashboardDesc: 'Dashboard modules are configured and ready for implementation in the next phase.',
    adminNotice: 'Hospital Admin Dashboard interface will be built out in the upcoming update as requested.',
    
    // Footer
    footerTitle: 'Ayushman Acolyte | Healthcare Assistance & Hospital Locator',
    footerSubtitle: 'A Public Initiative to Facilitate PM-JAY Beneficiaries',
    footerDisclaimer: 'Disclaimer: Ayushman Acolyte is an independent public facilitation platform designed to help citizens locate PM-JAY empaneled hospitals. For official government registration & downloads, visit beneficiary.nha.gov.in.',
    footerCopyright: '© 2026 Ayushman Acolyte. All scheme information aligned with public AB-PMJAY guidelines.',
    footerHelpline: 'Toll-Free 24x7 National Helpline:'
  },
  hi: {
    portalBadge: 'स्वास्थ्य सहायता पोर्टल',
    portalTitle: 'आयुष्मान',
    portalSubtitle: 'एकाेलाइट (Acolyte)',
    tollFree: 'हेल्पलाइन:',
    languageToggle: 'English',
    
    // Page 0: Dual Login Landing
    p0Badge: 'आयुष्मान भारत स्वास्थ्य सहायक',
    p0MainTitle: 'स्वागत है',
    p0MainTitleHighlight: 'आयुष्मान एकाेलाइट',
    p0Desc: 'अस्पताल खोजने, सर्जरी पैकेज देखने या अस्पताल प्रशासनिक डेस्क में प्रवेश करने के लिए अपना पोर्टल चुनें।',
    
    p0UserCardBadge: 'नागरिकों एवं परिवारों हेतु',
    p0UserCardTitle: 'लाभार्थी / नागरिक पोर्टल (User Login)',
    p0UserCardSub: 'Beneficiary & Citizen Login',
    p0UserCardDesc: '29,000+ सूचीबद्ध अस्पताल खोजें, मुफ्त सर्जरी पैकेज देखें, मरीज समीक्षाएं पढ़ें और ऑनलाइन कार्ड बनाएं।',
    p0UserPoint1: 'जीपीएस द्वारा निकटतम सूचीबद्ध अस्पताल खोजें',
    p0UserPoint2: '1,940+ मुफ्त कवर की गई सर्जरी पैकेज देखें',
    p0UserPoint3: 'सत्यापित मरीज समीक्षाएं पढ़ें और दर्ज करें',
    p0UserCta: 'नागरिक / यूजर पोर्टल में प्रवेश करें',
    
    p0AdminCardBadge: 'सूचीबद्ध अस्पताल कर्मचारियों हेतु',
    p0AdminCardTitle: 'अस्पताल एडमिन लॉगिन (Hospital Admin)',
    p0AdminCardSub: 'Hospital Administration Login',
    p0AdminCardDesc: 'अस्पताल प्रबंधन, आयुष्मान मित्र समन्वय, प्री-ऑथ क्लेम एवं बेड उपलब्धता हेतु समर्पित पोर्टल।',
    p0AdminPoint1: 'आयुष्मान मित्र हेल्पडेस्क समन्वय',
    p0AdminPoint2: 'प्री-ऑथराइजेशन एवं क्लेम ट्रैकिंग',
    p0AdminPoint3: 'बेड उपलब्धता एवं विशेषज्ञता प्रबंधन',
    p0AdminCta: 'अस्पताल एडमिन पोर्टल में प्रवेश करें',
    
    // Page 1
    badgeText: 'नागरिक स्वास्थ्य सहायता केंद्र',
    mainTitle: 'आयुष्मान',
    mainTitleHighlight: 'एकाेलाइट पोर्टल',
    mainDesc: 'सूचीबद्ध अस्पताल और सर्जरी खोजने, आधिकारिक सरकारी पोर्टल से ऑनलाइन आवेदन करने, या वीडियो गाइड देखने के लिए विकल्प चुनें।',
    
    // Card 1
    card1Badge: 'कार्ड धारक',
    card1Title: 'मेरे पास आयुष्मान कार्ड है',
    card1Sub: 'I have Ayushman Card',
    card1Desc: 'नजदीकी सूचीबद्ध अस्पताल खोजें, मुफ्त सर्जरी, ऑपरेशन और कैशलेस उपचार की जानकारी प्राप्त करें।',
    card1Point1: 'सूचीबद्ध अस्पताल खोजें',
    card1Point2: 'मुफ्त कवर की गई सर्जरी देखें',
    card1Cta: 'चरण 2 पर आगे बढ़ें',
    
    // Card 2
    card2Badge: 'आधिकारिक NHA पोर्टल (बाहरी लिंक)',
    card2Title: 'आयुष्मान कार्ड के लिए आवेदन करें',
    card2Sub: 'Apply for Ayushman Card',
    card2Desc: 'आधिकारिक सरकारी पोर्टल (beneficiary.nha.gov.in) पर सीधे आवेदन करें, आधार ई-केवाईसी पूरी करें, पात्रता जांचें और कार्ड डाउनलोड करें।',
    card2Point1: 'त्वरित ई-केवाईसी और कार्ड डाउनलोड',
    card2Point2: 'beneficiary.nha.gov.in पर सीधा लिंक',
    card2Cta: 'beneficiary.nha.gov.in खोलें',
    
    // Card 3
    card3Badge: 'वीडियो ट्यूटोरियल',
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
    mitraDocsRequired: 'आवश्यक दस्तावेज: आयुष्मान कार्ड (या आभा आईडी / आधार कार्ड) और डॉक्टर पर्ची।',
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
    
    // Admin Login / Dashboard Placeholder
    adminBackToHome: 'पोर्टल चयन पर वापस जाएं',
    adminTitle: 'अस्पताल एडमिन एवं सूचीबद्धता पोर्टल',
    adminSubtitle: 'अस्पताल प्रशासन एवं आयुष्मान मित्र डेस्क',
    adminLoginPrompt: 'अस्पताल प्रबंधन, आयुष्मान मित्र काउंटर और क्लेम देखने के लिए लॉगिन करें।',
    adminHospitalId: 'अस्पताल कोड (उदा. HOSP-CG-042)',
    adminUsername: 'एडमिन आईडी / यूजरनेम',
    adminPassword: 'पासवर्ड / सुरक्षा पिन',
    adminLoginBtn: 'एडमिन डैशबोर्ड में लॉगिन करें',
    adminDashboardTitle: 'अस्पताल एडमिन डैशबोर्ड (प्रीव्यू मोड)',
    adminDashboardDesc: 'डैशबोर्ड मॉड्यूल कॉन्फ़िगर कर दिए गए हैं और अगले चरण में पूरी तरह से सक्रिय होंगे।',
    adminNotice: 'अस्पताल एडमिन डैशबोर्ड का मुख्य इंटरफेस आपके अगले निर्देश के अनुसार तैयार किया जाएगा।',
    
    // Footer
    footerTitle: 'आयुष्मान एकाेलाइट (Ayushman Acolyte) | स्वास्थ्य सहायता एवं अस्पताल खोज',
    footerSubtitle: 'पीएम-जय लाभार्थियों की सुविधा हेतु नागरिक पहल',
    footerDisclaimer: 'अस्वीकरण: आयुष्मान एकाेलाइट एक स्वतंत्र जन-सुविधा मंच है जो नागरिकों को नजदीकी सूचीबद्ध अस्पताल खोजने में सहायता करता है। आधिकारिक सरकारी सेवाओं के लिए beneficiary.nha.gov.in पर जाएं।',
    footerCopyright: '© 2026 आयुष्मान एकाेलाइट। सभी जानकारी सार्वजनिक एबी-पीएमजय दिशानिर्देशों के अनुरूप।',
    footerHelpline: 'टोल-फ्री 24x7 राष्ट्रीय हेल्पलाइन:'
  }
};
