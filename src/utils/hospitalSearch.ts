import { Hospital } from '../data/hospitals';

export interface SearchTaxonomyCategory {
  id: string;
  category: string;
  categoryHi: string;
  specialtyCodes: string[];    // Exact PM-JAY codes from Speciality_ID_Data.csv
  specialtyKeywords: string[]; // Descriptive word stems (length >= 4)
  synonyms: string[];          // Patient query keywords/symptoms
}

export const MEDICAL_TAXONOMY: SearchTaxonomyCategory[] = [
  {
    id: 'cardio',
    category: 'Cardiology & Heart Surgery',
    categoryHi: 'हृदय रोग एवं बाईपास',
    specialtyCodes: ['100002', '100003', '100235', '100236', 'MC', 'SV', 'CD', 'CV'],
    specialtyKeywords: ['cardiology', 'cardio-thoracic', 'cardiovascular', 'cardiac'],
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
    specialtyCodes: ['100015', '100020', '100245', 'SB', 'OR', 'ST'],
    specialtyKeywords: ['orthopaedics', 'orthopedics', 'polytrauma'],
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
    specialtyCodes: ['100013', '100228', 'SE', 'OP'],
    specialtyKeywords: ['ophthalmology', 'opthalmology'],
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
    specialtyCodes: ['100023', '100242', 'SU', 'NU'],
    specialtyKeywords: ['urology', 'nephrology'],
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
    specialtyCodes: ['100012', '100241', 'SO', 'OG'],
    specialtyKeywords: ['obstetrics', 'gynaecology', 'gynecology'],
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
    specialtyCodes: ['100010', '100017', '100018', '100027', '100240', 'MN', 'MP', 'SS', 'NA', 'PS'],
    specialtyKeywords: ['paediatric', 'pediatric', 'neo-natal'],
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
    specialtyCodes: ['100008', '100021', '100022', '100027', '100221', '100222', '100223', '100249', 'MO', 'MR', 'SC', 'CA', 'CT', 'RT', 'TMH', 'NA'],
    specialtyKeywords: ['oncology', 'chemotherapy', 'radiotherapy'],
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
    specialtyCodes: ['100011', '100244', '100243', '100007', 'SN', 'NS', 'NI', 'IN'],
    specialtyKeywords: ['neurosurgery', 'neurology', 'neuro-surgery', 'neuroradiology'],
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
    specialtyCodes: ['100238', '100239', 'GM', 'AG'],
    specialtyKeywords: ['gastroenterology', 'abdomen/gi surgery'],
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
    specialtyCodes: ['100217', 'PP'],
    specialtyKeywords: ['pulmonology'],
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
    specialtyCodes: ['100016', '100229', '100233', 'SL', 'ENT', 'HN'],
    specialtyKeywords: ['ent', 'otorhinolaryngology', 'head and neck surgery'],
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
    specialtyCodes: ['100014', '100227', 'SM', 'DI'],
    specialtyKeywords: ['dentistry', 'maxillofacial'],
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
    specialtyCodes: ['100234', 'SKN'],
    specialtyKeywords: ['skin', 'dermatology'],
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
    specialtyCodes: ['100004', '100213', '100230', '100114', 'ER', 'ERRT', 'CC', 'AS'],
    specialtyKeywords: ['emergency room', 'critical care', 'ambulance services'],
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
    specialtyCodes: ['100001', '100019', '100246', 'BM', 'SP', 'BP'],
    specialtyKeywords: ['burns management', 'plastic and reconstructive', 'burns and plastic'],
    synonyms: [
      'burn', 'burns', 'fire burn', 'acid burn', 'plastic surgery', 'reconstructive', 
      'cosmetic surgery', 'skin graft', 'grafting', 'jalna', 'aag', 'जलना', 'प्लास्टिक सर्जरी', 'अग्नि'
    ]
  },
  {
    id: 'general',
    category: 'General Medicine & General Surgery',
    categoryHi: 'सामान्य चिकित्सा एवं सामान्य सर्जरी',
    specialtyCodes: ['100005', '100006', '100214', '100232', '100237', 'MG', 'SG', 'CN', 'GP', 'GS'],
    specialtyKeywords: ['general medicine', 'general surgery'],
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
    specialtyCodes: ['100194', '100250', '100251', '100252', '100253', '100254', '100256', 'YG', 'AY', 'NP', 'YGN', 'UN', 'SID'],
    specialtyKeywords: ['ayurveda', 'naturopathy', 'yoga and naturopathy', 'unani', 'siddha'],
    synonyms: [
      'ayurveda', 'ayush', 'herbal', 'natural', 'naturopathy', 'yoga', 'unani', 'siddha', 
      'homeopathy', 'desi', 'jadi buti', 'आयुर्वेद', 'आयुष', 'प्राकृतिक चिकित्सा', 'योग', 'यूनानी'
    ]
  },
  {
    id: 'mental',
    category: 'Mental Health & Psychiatry',
    categoryHi: 'मानसिक स्वास्थ्य एवं मनोरोग',
    specialtyCodes: ['100009', '100226', 'MM', 'BT'],
    specialtyKeywords: ['mental disorders', 'behavioural therapy'],
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
    specialtyCodes: ['100225', 'PT'],
    specialtyKeywords: ['physiotherapy'],
    synonyms: [
      'physiotherapy', 'physiotherapist', 'rehab', 'rehabilitation', 'exercise', 
      'physical therapy', 'physio', 'paralysis exercise', 'फिजियोथेरेपी', 'व्यायाम'
    ]
  },
  {
    id: 'diag',
    category: 'Diagnostics & Radiology',
    categoryHi: 'जांच, रेडियोलॉजी एवं पैथोलॉजी',
    specialtyCodes: ['100215', '100216', '100218', '100219', '100220', 'RI', 'RP', 'LB', 'NM', 'BY'],
    specialtyKeywords: ['radiology', 'interventional radiology', 'laboratory medicine', 'nuclear medicine', 'biopsies'],
    synonyms: [
      'x-ray', 'xray', 'mri', 'ct scan', 'ultrasound', 'sonography', 'pathology', 
      'blood test', 'lab', 'biopsy', 'scan', 'जांच', 'एक्स-रे', 'एमआरआई', 'सीटी स्कैन', 
      'अल्ट्रासाउंड', 'खून जांच'
    ]
  }
];

export const SPECIALTY_HINDI_MAP: Record<string, string> = {
  'Neurosurgery': 'न्यूरोसर्जरी',
  'Neuro-Surgery': 'न्यूरोसर्जरी',
  'Neurology': 'न्यूरोलॉजी',
  'Interventional Neuroradiology': 'इंटरवेंशनल न्यूरोरेडियोलॉजी',
  'Cardiology': 'हृदय रोग (कार्डियोलॉजी)',
  'Cardio-thoracic & Vascular surgery': 'कार्डियो-थोरैसिक सर्जरी',
  'Cardiovascular And Cardiac Surgery': 'कार्डियोवैस्कुलर एवं हार्ट सर्जरी',
  'Medical Oncology': 'मेडिकल ऑन्कोलॉजी (कैंसर)',
  'Surgical Oncology': 'सर्जिकल ऑन्कोलॉजी (कैंसर सर्जरी)',
  'Radiation Oncology': 'रेडिएशन ऑन्कोलॉजी',
  'Paediatric Cancer': 'बाल कैंसर चिकित्सा',
  'Orthopaedics': 'हड्डी रोग (ऑर्थोपेडिक्स)',
  'Polytrauma': 'पॉलीट्रामा एवं दुर्घटना चिकित्सा',
  'Ophthalmology': 'नेत्र रोग (ऑप्थल्मोलॉजी)',
  'Opthalmology': 'नेत्र रोग (मोतियाबिंद व दृष्टि)',
  'Nephrology And Urology': 'नेफ्रोलॉजी एवं यूरोलॉजी (किडनी)',
  'Urology': 'यूरोलॉजी (मूत्र रोग)',
  'Obstetrics & Gynaecology': 'स्त्री एवं प्रसूति रोग',
  'Obstetrics And Gynaecology': 'स्त्री एवं प्रसूति रोग',
  'Paediatric Medical management': 'बाल चिकित्सा (पीडियाट्रिक्स)',
  'Paediatric Surgery': 'बाल शल्य चिकित्सा (शिशु सर्जरी)',
  'Neo-natal care Packages': 'नवजात शिशु गहन चिकित्सा',
  'Medical Gastroenterology': 'गैस्ट्रोएंटरोलॉजी (पेट व पाचन)',
  'Abdomen/GI Surgery': 'उदर व जीआई सर्जरी',
  'Pulmonology': 'फेफड़े एवं श्वसन रोग',
  'ENT': 'कान, नाक एवं गला (ईएनटी)',
  'Otorhinolaryngology': 'ईएनटी (कान, नाक, गला)',
  'Head and Neck Surgery': 'सिर एवं गर्दन सर्जरी',
  'Dentistry': 'दंत चिकित्सा (डेंटल)',
  'Oral & Maxillofacial Surgery': 'ओरल व मैक्सिलोफेशियल सर्जरी',
  'Emergency Room Packages (Care requiring less than 12 hrs stay)': 'आपातकालीन कक्ष चिकित्सा',
  'Emergency Room Packages': 'आपातकालीन चिकित्सा',
  'General Medicine': 'सामान्य चिकित्सा (जनरल मेडिसिन)',
  'General Surgery': 'सामान्य सर्जरी',
  'Critical Care': 'क्रिटिकल केयर (आईसीयू)',
  'Burns Management': 'बर्न्स व बर्न केयर',
  'Burns And Plastic Surgery': 'बर्न व प्लास्टिक सर्जरी',
  'Plastic and Reconstructive Surgery': 'प्लास्टिक व पुनर्निर्माण सर्जरी',
  'Infectious Diseases': 'संक्रामक रोग चिकित्सा',
  'Organ & Tissue Transplant': 'अंग व ऊतक प्रत्यारोपण',
  'Palliative Medicine': 'उपशामक चिकित्सा (पैलिएटिव)',
  'Mental Disorders Packages': 'मानसिक स्वास्थ्य एवं मनोरोग',
  'Behavioural therapy': 'व्यवहार थेरेपी',
  'Physiotherapy': 'फिजियोथेरेपी',
  'Radiology': 'रेडियोलॉजी',
  'Interventional Radiology': 'इंटरवेंशनल रेडियोलॉजी',
  'Laboratory Medicine': 'पैथोलॉजी व लैब मेडिसिन'
};

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
 * Checks if query token is an exact, prefix, or tight typo fuzzy match to target token.
 * Prevents false positives like 'brain' matching 'baruin'.
 */
export function isFuzzyMatch(queryToken: string, targetToken: string): boolean {
  if (!queryToken || !targetToken) return false;
  if (queryToken === targetToken) return true;

  // Do not fuzzy match short tokens (< 4 chars) to prevent false positives
  if (queryToken.length < 4 || targetToken.length < 4) return false;

  // Prefix matching for query token >= 4 chars (e.g. 'ortho' -> 'orthopaedics', 'cardio' -> 'cardiology')
  if (targetToken.startsWith(queryToken)) return true;

  // First character MUST match for typo tolerance
  if (queryToken[0] !== targetToken[0]) return false;

  const lenDiff = Math.abs(queryToken.length - targetToken.length);
  if (lenDiff > 1 && Math.max(queryToken.length, targetToken.length) < 8) return false;

  const len = Math.max(queryToken.length, targetToken.length);
  // Only allow 1 edit distance for words up to 7 characters. Distance 2 only for 8+ chars.
  const maxDistance = len < 8 ? 1 : 2;
  return levenshteinDistance(queryToken, targetToken) <= maxDistance;
}

export interface EnrichedSearchResult {
  hospital: Hospital;
  relevanceScore: number;
  matchedSpecialty?: string;
  matchedSpecialtyHi?: string;
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
 * - Searches across hospital name, address, and authentic PM-JAY specialties.
 * - If user searches for a disease/specialty (e.g. 'brain', 'heart'), returns hospitals that
 *   ACTUALLY possess that specialty in the database.
 * - Beside the Government/Private tag, ONLY displays the actual matched special specialty
 *   from Speciality_ID_Data.csv. If no specialty is matched, nothing is shown.
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

    // 1. Check if whole query matches any synonym (useful for 'chest pain', 'heart attack', 'back pain')
    for (const syn of cat.synonyms) {
      const normSyn = normalizeText(syn);
      if (normSyn === normalizedQuery || (normSyn.includes(' ') && normalizedQuery.includes(normSyn))) {
        matched = true;
        break;
      }
    }

    // 2. Check each token against single-word synonyms
    if (!matched) {
      for (const token of queryTokens) {
        for (const syn of cat.synonyms) {
          const normSyn = normalizeText(syn);
          if (normSyn === token || (token.length >= 4 && isFuzzyMatch(token, normSyn))) {
            matched = true;
            break;
          }
        }
        if (matched) break;

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

  // Is this a condition/specialty query?
  const isMedicalQuery = activeTaxonomies.length > 0;

  const scoredResults: EnrichedSearchResult[] = [];

  for (const hosp of hospitals) {
    const normName = normalizeText(hosp.name);
    const normNameHi = normalizeText(hosp.nameHi || '');
    const normAddress = normalizeText(hosp.address);
    const normAddressHi = normalizeText(hosp.addressHi || '');
    const normType = normalizeText(hosp.type || '');
    const normTypeCode = normalizeText(hosp.typeCode || '');

    // Map all hospital specialties to authentic names from database
    const hospitalCleanCodes: string[] = [];
    const hospitalSpecialtyNames: string[] = [];

    for (const spec of hosp.specialties) {
      const clean = spec.trim().toUpperCase();
      hospitalCleanCodes.push(clean);
      const mapped = specialtyMap[clean];
      if (mapped) hospitalSpecialtyNames.push(mapped);
    }

    let totalScore = 0;
    let tokensMatchedCount = 0;
    let matchedSpecialty: string | undefined = undefined;
    let matchedSpecialtyHi: string | undefined = undefined;

    // 1. CHECK MEDICAL TAXONOMY MATCH (e.g. 'brain' -> Neurosurgery/Neurology, 'heart' -> Cardiology)
    if (activeTaxonomies.length > 0) {
      for (const tax of activeTaxonomies) {
        // A) Exact code match in hospital's codes
        const matchingCode = hospitalCleanCodes.find(c => tax.specialtyCodes.includes(c));
        // B) Keyword stem match in hospital's mapped authentic specialty names
        const matchingName = hospitalSpecialtyNames.find(name => {
          const l = name.toLowerCase();
          return tax.specialtyKeywords.some(kw => l.includes(kw));
        });

        if (matchingCode || matchingName) {
          totalScore += 250;
          tokensMatchedCount = Math.max(tokensMatchedCount, 1);

          if (!matchedSpecialty) {
            const authenticName = matchingName || (matchingCode ? (specialtyMap[matchingCode] || matchingCode) : undefined);
            if (authenticName) {
              matchedSpecialty = authenticName;
              matchedSpecialtyHi = SPECIALTY_HINDI_MAP[authenticName] || authenticName;
            }
          }
        }
      }

      // If the user searched specifically for a medical condition/organ and this hospital does NOT have it,
      // skip it completely (prevents false matches like 'CHC BARUIN' for 'brain').
      if (!matchedSpecialty) {
        continue;
      }
    }

    // 2. CHECK DIRECT SPECIALTY MATCH (e.g. user typed 'neurosurgery', 'cardiology', 'oncology')
    if (!matchedSpecialty) {
      for (const token of queryTokens) {
        const directMatch = hospitalSpecialtyNames.find(name => name.toLowerCase().includes(token));
        if (directMatch) {
          totalScore += 180;
          tokensMatchedCount++;
          if (!matchedSpecialty) {
            matchedSpecialty = directMatch;
            matchedSpecialtyHi = SPECIALTY_HINDI_MAP[directMatch] || directMatch;
          }
        }
      }
    }

    // 3. CHECK HOSPITAL NAME EXACT & PREFIX MATCHES
    if (normName.includes(normalizedQuery)) {
      totalScore += 200;
      tokensMatchedCount = queryTokens.length;
    } else if (normNameHi && normNameHi.includes(normalizedQuery)) {
      totalScore += 200;
      tokensMatchedCount = queryTokens.length;
    }

    for (const token of queryTokens) {
      if (normName.includes(token) || (normNameHi && normNameHi.includes(token))) {
        totalScore += 60;
        tokensMatchedCount++;
      } else {
        // Tight typo match on name words only for general searches
        const nameWords = normName.split(' ');
        if (nameWords.some(w => isFuzzyMatch(token, w))) {
          totalScore += 30;
          tokensMatchedCount++;
        }
      }

      // Address match
      if (normAddress.includes(token) || (normAddressHi && normAddressHi.includes(token))) {
        totalScore += 20;
        tokensMatchedCount++;
      }

      // Type match
      if (
        normType.includes(token) || 
        normTypeCode === token ||
        (token === 'govt' && normType.includes('gov')) ||
        (token === 'सरकारी' && (normType.includes('gov') || normTypeCode === 'g')) ||
        (token === 'निजी' && (normType.includes('priv') || normTypeCode === 'p'))
      ) {
        totalScore += 15;
        tokensMatchedCount++;
      }
    }

    // Only include if at least one meaningful match was made
    if (tokensMatchedCount > 0 || totalScore > 0) {
      const enrichedHosp: Hospital = {
        ...hosp,
      };

      (enrichedHosp as any).matchedSpecialty = matchedSpecialty;
      (enrichedHosp as any).matchedSpecialtyHi = matchedSpecialtyHi;
      // Keep matchedReason backwards-compatible with matchedSpecialty
      (enrichedHosp as any).matchedReason = matchedSpecialty;
      (enrichedHosp as any).matchedReasonHi = matchedSpecialtyHi;

      scoredResults.push({
        hospital: enrichedHosp,
        relevanceScore: totalScore,
        matchedSpecialty,
        matchedSpecialtyHi
      });
    }
  }

  // Sort by relevance score, with distance tie-breaker for hospitals in the same relevance band
  scoredResults.sort((a, b) => {
    const scoreDiff = b.relevanceScore - a.relevanceScore;
    
    // If scores are in the same tier (difference < 40), sort by distance
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
