import { Hospital } from '../data/hospitals';

export interface SearchTaxonomyCategory {
  id: string;
  category: string;
  categoryHi: string;
  specialtyKeywords: string[];
  synonyms: string[];
}

export const MEDICAL_TAXONOMY: SearchTaxonomyCategory[] = [
  {
    id: 'cardio',
    category: 'Cardiology & Heart Surgery',
    categoryHi: 'हृदय रोग एवं बाईपास',
    specialtyKeywords: [
      'cardiology', 'cardio-thoracic & vascular surgery', 'cardiovascular and cardiac surgery', 
      'cardio', 'cardiac', 'mc', 'sv', 'cd', 'cv'
    ],
    synonyms: [
      'heart', 'cardiac', 'cardio', 'chest pain', 'heart attack', 'attack', 'bypass', 
      'angioplasty', 'ecg', 'bp', 'hypertension', 'blood pressure', 'valve', 'pacemaker', 
      'cholesterol', 'artery', 'dil', 'हार्ट', 'दिल', 'सीने में दर्द', 'हार्ट अटैक', 
      'कार्डियो', 'बाईपास', 'कार्डियोलॉजी'
    ]
  },
  {
    id: 'ortho',
    category: 'Orthopaedics & Joint Care',
    categoryHi: 'हड्डी रोग एवं जोड़ प्रत्यारोपण',
    specialtyKeywords: [
      'orthopaedics', 'orthopedics', 'polytrauma', 'joint replacement', 'sb', 'or', 'st'
    ],
    synonyms: [
      'bone', 'bones', 'fracture', 'joint', 'knee', 'hip', 'spine', 'back pain', 'slip disc', 
      'arthritis', 'ligament', 'plaster', 'ortho', 'orthopedic', 'orthopedics', 'orthopaedic', 
      'orthopaedics', 'shoulder', 'ankle', 'haddi', 'jod', 'ghutna', 'हड्डी', 'जोड़', 
      'घुटना', 'फ्रैक्चर', 'कमर दर्द', 'ऑर्थो', 'ऑर्थोपेडिक्स', 'हड्डी रोग'
    ]
  },
  {
    id: 'eye',
    category: 'Ophthalmology (Eye Care)',
    categoryHi: 'नेत्र रोग एवं मोतियाबिंद',
    specialtyKeywords: [
      'ophthalmology', 'opthalmology', 'se', 'op'
    ],
    synonyms: [
      'eye', 'eyes', 'vision', 'cataract', 'glaucoma', 'retina', 'cornea', 'spectacles', 
      'glasses', 'motiyabind', 'lasik', 'blindness', 'conjunctivitis', 'aankh', 'netra', 
      'aankhon', 'आँख', 'आंख', 'नेत्र', 'मोतियाबिंद', 'दृष्टि', 'चश्मा', 'ऑप्थल्मोलॉजी', 'नेत्र रोग'
    ]
  },
  {
    id: 'kidney',
    category: 'Nephrology & Urology (Kidney & Urinary)',
    categoryHi: 'किडनी रोग व डायलिसिस एवं यूरोलॉजी',
    specialtyKeywords: [
      'urology', 'nephrology and urology', 'nephrology & dialysis', 'su', 'nu'
    ],
    synonyms: [
      'kidney', 'renal', 'dialysis', 'urine', 'urinary', 'bladder', 'stone', 'kidney stone', 
      'prostate', 'nephro', 'nephrology', 'uro', 'urology', 'gurda', 'pathri', 'peshab', 
      'मूत्र', 'गुर्दा', 'पथरी', 'पेशाब', 'डायलिसिस', 'यूरोलॉजी', 'किडनी'
    ]
  },
  {
    id: 'maternity',
    category: 'Obstetrics & Gynaecology (Maternity & Women)',
    categoryHi: 'स्त्री एवं प्रसूति रोग',
    specialtyKeywords: [
      'obstetrics & gynaecology', 'obstetrics and gynaecology', 'gynecology & obstetrics', 'so', 'og'
    ],
    synonyms: [
      'pregnancy', 'pregnant', 'delivery', 'cesarean', 'c-section', 'maternity', 'labor', 
      'baby birth', 'women', 'lady', 'ladies', 'period', 'periods', 'menstruation', 'pcos', 
      'pcod', 'gynae', 'gynecology', 'gynaecology', 'gynecologist', 'obstetrics', 'uterus', 
      'ovary', 'infertility', 'prastuti', 'mahila', 'garbh', 'garbhavastha', 'महिला', 
      'प्रसूति', 'डिलीवरी', 'गर्भवती', 'गर्भावस्था', 'स्त्री रोग', 'गाइनेकोलॉजी'
    ]
  },
  {
    id: 'child',
    category: 'Paediatrics & Neonatal (Child Care)',
    categoryHi: 'बाल रोग एवं शिशु सर्जरी',
    specialtyKeywords: [
      'paediatric medical management', 'paediatric surgery', 'neo-natal care packages', 
      'paediatric cancer', 'pediatrics', 'pediatric surgery', 'mp', 'ss', 'mn', 'na', 'ps'
    ],
    synonyms: [
      'child', 'children', 'kid', 'kids', 'baby', 'babies', 'infant', 'newborn', 'neonatal', 
      'pediatric', 'pediatrics', 'pediatrician', 'paediatric', 'paediatrics', 'nicu', 'picu', 
      'vaccination', 'immunization', 'bachha', 'bachhe', 'shishu', 'bal rog', 'बच्चा', 
      'बच्चे', 'शिशु', 'बाल रोग', 'पीडियाट्रिक'
    ]
  },
  {
    id: 'cancer',
    category: 'Oncology (Cancer Care)',
    categoryHi: 'कैंसर चिकित्सा व कीमोथेरेपी',
    specialtyKeywords: [
      'medical oncology', 'surgical oncology', 'radiation oncology', 'oncology investigations', 
      'chemotherapy', 'radiotherapy', 'paediatric cancer', 'oncology', 'mo', 'mr', 'sc', 'ca', 'ct', 'rt', 'tmh', 'na'
    ],
    synonyms: [
      'cancer', 'tumor', 'tumour', 'oncology', 'oncologist', 'chemotherapy', 'chemo', 
      'radiation', 'radiotherapy', 'biopsy', 'leukemia', 'carcinoma', 'malignancy', 
      'lymphoma', 'kark rog', 'कैंसर', 'ट्यूमर', 'कीमोथेरेपी', 'रेडिएशन', 'ऑन्कोलॉजी', 'कर्क रोग'
    ]
  },
  {
    id: 'neuro',
    category: 'Neurology & Neurosurgery (Brain & Nerves)',
    categoryHi: 'मस्तिष्क एवं तंत्रिका रोग (न्यूरो)',
    specialtyKeywords: [
      'neurosurgery', 'neurology', 'neuro-surgery', 'neuro surgery', 'interventional neuroradiology', 
      'sn', 'ni', 'ns', 'in'
    ],
    synonyms: [
      'brain', 'neuro', 'neurology', 'neurologist', 'neurosurgery', 'stroke', 'paralysis', 
      'seizure', 'epilepsy', 'fits', 'migraine', 'headache', 'nerve', 'spinal cord', 
      'brain hemorrhage', 'lakwa', 'dimag', 'sar dard', 'लकवा', 'दिमाग', 'मस्तिष्क', 
      'सिर दर्द', 'न्यूरो', 'न्यूरोलॉजी', 'न्यूरोसर्जरी'
    ]
  },
  {
    id: 'gastro',
    category: 'Gastroenterology (Stomach & Liver)',
    categoryHi: 'पेट, लिवर व पाचन रोग',
    specialtyKeywords: [
      'medical gastroenterology', 'abdomen/gi surgery', 'gm', 'ag'
    ],
    synonyms: [
      'stomach', 'gastric', 'gastro', 'gastroenterology', 'liver', 'digestion', 'digestive', 
      'acidity', 'gas', 'endoscopy', 'colonoscopy', 'jaundice', 'hepatitis', 'gallbladder', 
      'appendix', 'hernia', 'piles', 'constipation', 'pet', 'pet dard', 'piliya', 'पेट', 
      'पेट दर्द', 'लिवर', 'पीलिया', 'पाचन', 'गैस', 'गैस्ट्रो', 'एसिडिटी'
    ]
  },
  {
    id: 'pulmo',
    category: 'Pulmonology & Respiratory (Lungs & Chest)',
    categoryHi: 'फेफड़े एवं श्वसन रोग',
    specialtyKeywords: [
      'pulmonology', 'pp'
    ],
    synonyms: [
      'lung', 'lungs', 'pulmonology', 'pulmonologist', 'chest', 'breath', 'breathing', 
      'breathlessness', 'asthma', 'cough', 'tuberculosis', 'tb', 'pneumonia', 'respiratory', 
      'bronchitis', 'fephde', 'dama', 'saans', 'फेफड़े', 'सांस', 'दमा', 'खांसी', 'टीबी', 
      'पल्मोनोलॉजी', 'श्वसन'
    ]
  },
  {
    id: 'ent',
    category: 'ENT (Ear, Nose & Throat)',
    categoryHi: 'कान, नाक एवं गला रोग',
    specialtyKeywords: [
      'ent', 'otorhinolaryngology', 'head and neck surgery', 'sl', 'hn'
    ],
    synonyms: [
      'ent', 'ear', 'nose', 'throat', 'hearing', 'deaf', 'ear pain', 'tonsils', 'tonsil', 
      'sinus', 'sinusitis', 'otorhinolaryngology', 'vocal', 'kaan', 'naak', 'gala', 
      'kaan dard', 'gala kharab', 'कान', 'नाक', 'गला', 'ईएनटी', 'टॉन्सिल'
    ]
  },
  {
    id: 'dental',
    category: 'Dentistry & Maxillofacial (Dental Care)',
    categoryHi: 'दंत रोग एवं ओरल सर्जरी',
    specialtyKeywords: [
      'dentistry', 'oral & maxillofacial surgery', 'di', 'sm'
    ],
    synonyms: [
      'dental', 'dentist', 'dentistry', 'teeth', 'tooth', 'gums', 'cavity', 'root canal', 
      'rct', 'braces', 'extraction', 'oral', 'daant', 'daant dard', 'masuda', 'दांत', 
      'दाँत', 'दंत', 'मसूड़े', 'दांत दर्द', 'डेंटल', 'डेंटिस्ट'
    ]
  },
  {
    id: 'skin',
    category: 'Dermatology (Skin Care)',
    categoryHi: 'त्वचा एवं चर्म रोग',
    specialtyKeywords: [
      'skin', 'skn'
    ],
    synonyms: [
      'skin', 'derma', 'dermatology', 'dermatologist', 'rash', 'allergy', 'itching', 
      'eczema', 'psoriasis', 'fungal', 'infection', 'acne', 'pimples', 'chamdi', 'tvacha', 
      'khujli', 'त्वचा', 'चमड़ी', 'खुजली', 'एलर्जी', 'डर्मेटोलॉजी'
    ]
  },
  {
    id: 'trauma',
    category: 'Emergency & Critical Care / Trauma',
    categoryHi: 'आपातकालीन चिकित्सा व ट्रॉमा',
    specialtyKeywords: [
      'emergency room packages', 'emergency room packages (care requiring less than 12 hrs stay)', 
      'critical care', 'polytrauma', 'ambulance services', 'er', 'errt', 'cc', 'st', 'as'
    ],
    synonyms: [
      'emergency', 'casualty', 'trauma', 'accident', 'icu', 'critical care', 'ambulance', 
      'bleeding', 'fracture emergency', 'chot', 'durghatna', 'aapatkal', 'aapatkaleen', 
      'इमरजेंसी', 'आपातकाल', 'दुर्घटना', 'आईसीयू', 'एंबुलेंस', 'चोट'
    ]
  },
  {
    id: 'burns',
    category: 'Burns & Plastic Surgery',
    categoryHi: 'बर्न यूनिट एवं प्लास्टिक सर्जरी',
    specialtyKeywords: [
      'burns management', 'burns and plastic surgery', 'plastic and reconstructive surgery', 
      'bm', 'bp', 'sp'
    ],
    synonyms: [
      'burn', 'burns', 'fire burn', 'acid burn', 'plastic surgery', 'reconstructive', 
      'cosmetic surgery', 'skin graft', 'grafting', 'jalna', 'aag', 'जलना', 'प्लास्टिक सर्जरी', 'अग्नि'
    ]
  },
  {
    id: 'general',
    category: 'General Medicine & General Surgery',
    categoryHi: 'सामान्य चिकित्सा एवं सामान्य सर्जरी',
    specialtyKeywords: [
      'general medicine', 'general surgery', 'consultation', 'general procedure', 
      'mg', 'sg', 'gs', 'cn', 'gp'
    ],
    synonyms: [
      'general medicine', 'general physician', 'general surgery', 'fever', 'cold', 
      'infection', 'dengue', 'malaria', 'typhoid', 'weakness', 'diabetes', 'sugar', 
      'blood sugar', 'checkup', 'surgery', 'operation', 'surgeon', 'bukhar', 'chikitsa', 
      'dawa', 'बुखार', 'सामान्य चिकित्सा', 'जनरल मेडिसिन', 'सर्जरी', 'ऑपरेशन', 'चिकित्सक'
    ]
  },
  {
    id: 'ayush',
    category: 'AYUSH & Alternative Medicine',
    categoryHi: 'आयुष एवं प्राकृतिक चिकित्सा',
    specialtyKeywords: [
      'ayurveda', 'naturopathy', 'yoga and naturopathy', 'unani', 'siddha', 'yoga', 
      'ay', 'np', 'ygn', 'un', 'sid', 'yg'
    ],
    synonyms: [
      'ayurveda', 'ayush', 'herbal', 'natural', 'naturopathy', 'yoga', 'unani', 'siddha', 
      'homeopathy', 'desi', 'jadi buti', 'आयुर्वेद', 'आयुष', 'प्राकृतिक चिकित्सा', 'योग', 'यूनानी'
    ]
  },
  {
    id: 'mental',
    category: 'Mental Health & Psychiatry',
    categoryHi: 'मानसिक स्वास्थ्य एवं मनोरोग',
    specialtyKeywords: [
      'mental disorders packages', 'behavioural therapy', 'mm', 'bt'
    ],
    synonyms: [
      'mental', 'psychiatry', 'psychiatrist', 'psychology', 'depression', 'anxiety', 
      'stress', 'insomnia', 'sleep', 'bipolar', 'counseling', 'dimagi', 'manasik', 
      'तनाव', 'डिप्रेशन', 'मानसिक रोग', 'मनोचिकित्सक'
    ]
  },
  {
    id: 'physio',
    category: 'Physiotherapy & Rehabilitation',
    categoryHi: 'फिजियोथेरेपी एवं पुनर्वास',
    specialtyKeywords: [
      'physiotherapy', 'pt'
    ],
    synonyms: [
      'physiotherapy', 'physiotherapist', 'rehab', 'rehabilitation', 'exercise', 
      'physical therapy', 'physio', 'paralysis exercise', 'फिजियोथेरेपी', 'व्यायाम'
    ]
  },
  {
    id: 'diag',
    category: 'Diagnostics & Radiology',
    categoryHi: 'जांच, रेडियोलॉजी एवं पैथोलॉजी',
    specialtyKeywords: [
      'radiology', 'interventional radiology', 'laboratory medicine', 'nuclear medicine', 
      'biopsies', 'ri', 'rp', 'lb', 'nm', 'by'
    ],
    synonyms: [
      'x-ray', 'xray', 'mri', 'ct scan', 'ultrasound', 'sonography', 'pathology', 
      'blood test', 'lab', 'biopsy', 'scan', 'जांच', 'एक्स-रे', 'एमआरआई', 'सीटी स्कैन', 
      'अल्ट्रासाउंड', 'खून जांच'
    ]
  }
];

export interface QuickSuggestion {
  id: string;
  labelEn: string;
  labelHi: string;
  query: string;
  icon: string;
}

export const QUICK_SEARCH_SUGGESTIONS: QuickSuggestion[] = [
  { id: 'heart', labelEn: 'Heart', labelHi: 'दिल', query: 'heart', icon: '❤️' },
  { id: 'bone', labelEn: 'Bones', labelHi: 'हड्डी रोग', query: 'bone', icon: '🦴' },
  { id: 'eye', labelEn: 'Eyes', labelHi: 'नेत्र रोग', query: 'eye', icon: '👁️' },
  { id: 'maternity', labelEn: 'Maternity', labelHi: 'प्रसूति', query: 'delivery', icon: '🤰' },
  { id: 'child', labelEn: 'Child Care', labelHi: 'बाल रोग', query: 'child', icon: '👶' },
  { id: 'kidney', labelEn: 'Kidney', labelHi: 'किडनी', query: 'kidney', icon: '🫘' },
  { id: 'cancer', labelEn: 'Cancer', labelHi: 'कैंसर', query: 'cancer', icon: '🎗️' },
  { id: 'brain', labelEn: 'Brain', labelHi: 'न्यूरो', query: 'brain', icon: '🧠' },
  { id: 'dental', labelEn: 'Dental', labelHi: 'दंत रोग', query: 'teeth', icon: '🦷' },
  { id: 'emergency', labelEn: 'Emergency', labelHi: 'आपातकाल', query: 'emergency', icon: '🚨' }
];

/**
 * Calculates Levenshtein edit distance between two strings
 */
export function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  if (m === 0) return n;
  if (n === 0) return m;

  if (Math.abs(m - n) > 3) return Math.abs(m - n);

  const d: number[][] = [];
  for (let i = 0; i <= m; i++) {
    d[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    d[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      );
    }
  }

  return d[m][n];
}

/**
 * Checks if query token is an exact, prefix, or typo fuzzy match to target token
 */
export function isFuzzyMatch(queryToken: string, targetToken: string): boolean {
  if (!queryToken || !targetToken) return false;
  if (queryToken === targetToken) return true;

  // Do not fuzzy match short tokens (< 4 chars) to prevent false positives (like 'ear' matching 'heart')
  if (queryToken.length < 4 || targetToken.length < 4) return false;

  // Prefix matching for query token >= 4 chars (e.g. 'ortho' -> 'orthopaedics', 'cardio' -> 'cardiology')
  if (targetToken.startsWith(queryToken)) return true;

  // Edit distance check for typo tolerance (e.g. 'orthopedic' -> 'orthopaedics', 'apolo' -> 'apollo')
  if (Math.abs(queryToken.length - targetToken.length) > 2) return false;

  const len = Math.max(queryToken.length, targetToken.length);
  const maxDistance = len <= 5 ? 1 : 2;
  return levenshteinDistance(queryToken, targetToken) <= maxDistance;
}

export interface EnrichedSearchResult {
  hospital: Hospital;
  relevanceScore: number;
  matchedReason?: string;
  matchedReasonHi?: string;
}

/**
 * Normalizes text for clean search comparison
 */
function normalizeText(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Intelligent search function:
 * Searches across hospital name (En/Hi), address (En/Hi), specialties (En/Codes/Hi),
 * medical taxonomy synonyms (symptoms, organs, everyday Hindi & Hinglish terms),
 * supports multi-token queries and typo-tolerant fuzzy matching.
 */
export function searchHospitals(
  hospitals: Hospital[],
  query: string,
  specialtyMap: Record<string, string>
): Hospital[] {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return hospitals;

  const queryTokens = normalizedQuery.split(' ').filter(t => t.length > 0);
  if (queryTokens.length === 0) return hospitals;

  // Resolve taxonomy matching for whole query phrase as well as tokens
  const activeTaxonomies: SearchTaxonomyCategory[] = [];
  const seenTaxonomyIds = new Set<string>();

  for (const cat of MEDICAL_TAXONOMY) {
    let matched = false;

    // 1. Check if whole query matches any synonym (useful for "chest pain", "heart attack", "back pain")
    for (const syn of cat.synonyms) {
      const normSyn = normalizeText(syn);
      if (normSyn === normalizedQuery || (normSyn.includes(' ') && normalizedQuery.includes(normSyn))) {
        matched = true;
        break;
      }
    }

    // 2. Check each token against single-word synonyms or specialty keywords
    if (!matched) {
      for (const token of queryTokens) {
        // Match synonym
        for (const syn of cat.synonyms) {
          const normSyn = normalizeText(syn);
          if (normSyn === token || (token.length >= 4 && isFuzzyMatch(token, normSyn))) {
            matched = true;
            break;
          }
        }
        if (matched) break;

        // Match keyword
        for (const kw of cat.specialtyKeywords) {
          const normKw = normalizeText(kw);
          if (normKw === token || (token.length >= 4 && isFuzzyMatch(token, normKw))) {
            matched = true;
            break;
          }
        }
        if (matched) break;
      }
    }

    if (matched && !seenTaxonomyIds.has(cat.id)) {
      seenTaxonomyIds.add(cat.id);
      activeTaxonomies.push(cat);
    }
  }

  const scoredResults: EnrichedSearchResult[] = [];

  for (const hosp of hospitals) {
    const normName = normalizeText(hosp.name);
    const normNameHi = normalizeText(hosp.nameHi || '');
    const normAddress = normalizeText(hosp.address);
    const normAddressHi = normalizeText(hosp.addressHi || '');
    const normType = normalizeText(hosp.type || '');
    const normTypeCode = normalizeText(hosp.typeCode || '');

    // Map all hospital specialties to names & codes
    const specialtyNames: string[] = [];
    const specialtyCodes: string[] = [];
    for (const spec of hosp.specialties) {
      const clean = spec.trim().toUpperCase();
      specialtyCodes.push(clean.toLowerCase());
      const mapped = specialtyMap[clean];
      if (mapped) specialtyNames.push(mapped.toLowerCase());
      else specialtyNames.push(clean.toLowerCase());
    }
    const combinedSpecialtiesText = specialtyNames.join(' ');
    const combinedCodesText = specialtyCodes.join(' ');

    let totalScore = 0;
    let tokensMatchedCount = 0;
    let primaryMatchReason = '';
    let primaryMatchReasonHi = '';

    // Check full query phrase exact match on name
    if (normName.includes(normalizedQuery)) {
      totalScore += 200;
      primaryMatchReason = `Hospital: ${hosp.name}`;
      primaryMatchReasonHi = `अस्पताल: ${hosp.nameHi || hosp.name}`;
    } else if (normNameHi && normNameHi.includes(normalizedQuery)) {
      totalScore += 200;
      primaryMatchReason = `Hospital: ${hosp.nameHi}`;
      primaryMatchReasonHi = `अस्पताल: ${hosp.nameHi}`;
    }

    // Check full query phrase match on specialties
    if (combinedSpecialtiesText.includes(normalizedQuery)) {
      totalScore += 180;
      const matchedSpec = specialtyNames.find(s => s.includes(normalizedQuery)) || normalizedQuery;
      primaryMatchReason = `Specialty: ${matchedSpec.toUpperCase()}`;
      primaryMatchReasonHi = `उपलब्ध विशेषता: ${matchedSpec.toUpperCase()}`;
    }

    // Check each token
    for (const token of queryTokens) {
      let tokenScore = 0;
      let tokenMatched = false;

      // 1. Hospital Name (English or Hindi)
      if (normName.includes(token) || (normNameHi && normNameHi.includes(token))) {
        tokenScore += 80;
        tokenMatched = true;
        if (!primaryMatchReason) {
          primaryMatchReason = `Name: ${hosp.name}`;
          primaryMatchReasonHi = `अस्पताल नाम: ${hosp.nameHi || hosp.name}`;
        }
      } else {
        // Name fuzzy match
        const nameWords = normName.split(' ');
        if (nameWords.some(w => isFuzzyMatch(token, w))) {
          tokenScore += 50;
          tokenMatched = true;
          if (!primaryMatchReason) {
            primaryMatchReason = `Name: ${hosp.name}`;
            primaryMatchReasonHi = `अस्पताल नाम: ${hosp.nameHi || hosp.name}`;
          }
        }
      }

      // 2. Specialty Direct Match
      if (combinedSpecialtiesText.includes(token) || combinedCodesText.includes(token)) {
        tokenScore += 70;
        tokenMatched = true;
        if (!primaryMatchReason) {
          const spec = specialtyNames.find(s => s.includes(token)) || token;
          primaryMatchReason = `Specialty: ${spec.toUpperCase()}`;
          primaryMatchReasonHi = `विशेषता: ${spec.toUpperCase()}`;
        }
      } else {
        // Specialty fuzzy match
        const specWords = combinedSpecialtiesText.split(' ');
        const fuzzyWord = specWords.find(w => isFuzzyMatch(token, w));
        if (fuzzyWord) {
          tokenScore += 45;
          tokenMatched = true;
          if (!primaryMatchReason) {
            primaryMatchReason = `Specialty: ${fuzzyWord.toUpperCase()}`;
            primaryMatchReasonHi = `विशेषता: ${fuzzyWord.toUpperCase()}`;
          }
        }
      }

      // 3. Address / City / District Match
      if (normAddress.includes(token) || (normAddressHi && normAddressHi.includes(token))) {
        tokenScore += 30;
        tokenMatched = true;
        if (!primaryMatchReason) {
          primaryMatchReason = `Location: ${token.toUpperCase()}`;
          primaryMatchReasonHi = `स्थान: ${token.toUpperCase()}`;
        }
      }

      // 4. Hospital Type Match
      if (
        normType.includes(token) || 
        normTypeCode === token ||
        (token === 'govt' && normType.includes('gov')) ||
        (token === 'सरकारी' && (normType.includes('gov') || normTypeCode === 'g')) ||
        (token === 'निजी' && (normType.includes('priv') || normTypeCode === 'p'))
      ) {
        tokenScore += 20;
        tokenMatched = true;
      }

      if (tokenMatched) {
        tokensMatchedCount++;
        totalScore += tokenScore;
      }
    }

    // Check Medical Taxonomy & Semantic Synonyms Match
    for (const tax of activeTaxonomies) {
      const hasTaxSpecialty = specialtyNames.some(spec => 
        tax.specialtyKeywords.some(kw => spec.includes(kw))
      ) || specialtyCodes.some(code => 
        tax.specialtyKeywords.some(kw => kw.toUpperCase() === code.toUpperCase())
      );

      if (hasTaxSpecialty) {
        totalScore += 90;
        tokensMatchedCount = Math.max(tokensMatchedCount, 1);
        if (!primaryMatchReason) {
          primaryMatchReason = `Related care: ${tax.category}`;
          primaryMatchReasonHi = `संबंधित सुविधा: ${tax.categoryHi}`;
        }
      }
    }

    // Hospital must match at least one criterion
    if (tokensMatchedCount > 0 || totalScore > 0) {
      if (queryTokens.length > 1 && tokensMatchedCount === queryTokens.length) {
        totalScore += 100;
      }

      const enrichedHosp: Hospital = {
        ...hosp,
      };

      (enrichedHosp as any).matchedReason = primaryMatchReason;
      (enrichedHosp as any).matchedReasonHi = primaryMatchReasonHi;

      scoredResults.push({
        hospital: enrichedHosp,
        relevanceScore: totalScore,
        matchedReason: primaryMatchReason,
        matchedReasonHi: primaryMatchReasonHi
      });
    }
  }

  // Sort by relevance score, with distance tie-breaker for hospitals in the same relevance band
  scoredResults.sort((a, b) => {
    const scoreDiff = b.relevanceScore - a.relevanceScore;
    
    // If scores are in the same tier (difference < 40), sort by distance so the nearest hospital is first!
    if (Math.abs(scoreDiff) < 40) {
      const distA = a.hospital.distanceKm ?? 9999;
      const distB = b.hospital.distanceKm ?? 9999;
      if (distA !== distB) {
        return distA - distB;
      }
    }

    return scoreDiff;
  });

  return scoredResults.map(r => r.hospital);
}
