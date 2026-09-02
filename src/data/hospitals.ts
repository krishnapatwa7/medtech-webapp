export interface Hospital {
  id: string;
  name: string;
  nameHi?: string;
  type: string;
  typeCode?: string;
  address: string;
  addressHi?: string;
  lat: number;
  lng: number;
  phone: string;
  emergency: string;
  distanceKm?: number;
  specialties: string[];
  specialtiesHi?: string[];
  beds: number;
  ayushmanMitraDesk?: boolean;
  rating?: number;
}

export const baseHospitals: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'District Civil Hospital Durg',
    nameHi: 'जिला नागरिक चिकित्सालय दुर्ग',
    type: 'GOV',
    typeCode: 'GOV',
    address: 'Near Old Bus Stand Road, Civil Lines, Durg',
    addressHi: 'पुराना बस स्टैंड रोड, सिविल लाइंस, दुर्ग',
    lat: 21.1904,
    lng: 81.2849,
    phone: '0788-2322234',
    emergency: '108 / 102',
    specialties: ['General Surgery', 'Orthopedics', 'Gynecology & Obstetrics', 'Pediatrics', 'Ophthalmology', 'General Medicine'],
    specialtiesHi: ['सामान्य सर्जरी', 'हड्डी रोग (ऑर्थोपेडिक्स)', 'स्त्री एवं प्रसूति रोग', 'बाल रोग', 'नेत्र रोग', 'सामान्य चिकित्सा'],
    beds: 450,
    ayushmanMitraDesk: true,
    rating: 4.6
  },
  {
    id: 'hosp-2',
    name: 'Chandulal Chandrakar Memorial Hospital',
    nameHi: 'चंदूलाल चंद्राकर मेमोरियल अस्पताल (निजी)',
    type: 'PRIVATE',
    typeCode: 'PRIVATE',
    address: 'Kachandur, Near Padmanabhpur Bypass, Durg',
    addressHi: 'कचंदूर, पद्मनाभपुर बाईपास, दुर्ग',
    lat: 21.1972,
    lng: 81.3025,
    phone: '0788-2612345',
    emergency: '0788-2612340',
    specialties: ['Cardiology & Heart Surgery', 'Neuro Surgery', 'Joint Replacement', 'Urology', 'Oncology (Cancer)'],
    specialtiesHi: ['हृदय रोग एवं बाईपास सर्जरी', 'न्यूरो सर्जरी', 'जोड़ प्रत्यारोपण', 'यूरोलॉजी', 'कैंसर चिकित्सा'],
    beds: 220,
    ayushmanMitraDesk: true,
    rating: 4.8
  },
  {
    id: 'hosp-3',
    name: 'All India Institute of Medical Sciences (AIIMS Raipur)',
    nameHi: 'अखिल भारतीय आयुर्विज्ञान संस्थान (एम्स रायपुर)',
    type: 'GOV',
    typeCode: 'GOV',
    address: 'GE Road, Tatibandh, Raipur',
    addressHi: 'जीई रोड, तातीबंध, रायपुर',
    lat: 21.2570,
    lng: 81.5794,
    phone: '0771-2970600',
    emergency: '0771-2970605',
    specialties: ['Cardiothoracic Surgery', 'Neurosurgery', 'Organ Transplant', 'Oncology & Chemotherapy', 'Advanced Trauma', 'Pediatric Surgery'],
    specialtiesHi: ['हृदय एवं फेफड़े की सर्जरी', 'मस्तिष्क एवं तंत्रिका सर्जरी', 'अंग प्रत्यारोपण', 'कैंसर चिकित्सा एवं कीमोथेरेपी', 'उन्नत ट्रॉमा', 'शिशु सर्जरी'],
    beds: 960,
    ayushmanMitraDesk: true,
    rating: 4.9
  }
];
