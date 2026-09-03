import Papa from 'papaparse';

export interface VerifiedHospitalRecord {
  facilityId: string;
  hospitalId: string;
  name: string;
  nameHi?: string;
  type: string;
  typeCode: string;
  address: string;
  contact: string;
  districtCode: string;
  stateCode: string;
  stateName?: string;
  empanelledDate?: string;
  specialties?: string[];
  schemeCode?: string;
  sourceFile: string;
}

// In-memory cache of parsed hospitals indexed by normalized code
let registryCache: Map<string, VerifiedHospitalRecord> | null = null;
let loadPromise: Promise<Map<string, VerifiedHospitalRecord>> | null = null;

const STATE_NAMES: Record<string, string> = {
  '22': 'Chhattisgarh',
  '27': 'Maharashtra',
  '23': 'Madhya Pradesh',
  '28': 'Andhra Pradesh',
  '10': 'Bihar',
  '5': 'Uttarakhand',
  '6': 'Haryana',
  '2': 'Himachal Pradesh',
  '12': 'Arunachal Pradesh',
  '33': 'Tamil Nadu',
  '29': 'Karnataka',
  '32': 'Kerala',
  '7': 'Delhi',
  '9': 'Uttar Pradesh',
  '8': 'Rajasthan',
  '24': 'Gujarat',
  '19': 'West Bengal'
};

export const REAL_DEMO_PRESETS = [
  {
    code: 'HS22010102',
    hospitalId: '22010102',
    name: 'District Hospital Durg (Govt)',
    nameHi: 'जिला अस्पताल दुर्ग (सरकारी)',
    type: 'GOV',
    district: 'Durg',
    state: 'Chhattisgarh'
  },
  {
    code: 'HOSP22G84446',
    hospitalId: '2284446',
    name: 'AIIMS Raipur (Apex Govt)',
    nameHi: 'एम्स रायपुर (सरकारी)',
    type: 'GOV',
    district: 'Raipur',
    state: 'Chhattisgarh'
  },
  {
    code: 'HOSP22P25103646',
    hospitalId: '103646',
    name: 'Gindodi Devi Memorial Hospital',
    nameHi: 'गिनदोदी देवी मेमोरियल अस्पताल',
    type: 'PRIVATE',
    district: 'Bhilai / Durg',
    state: 'Chhattisgarh'
  },
  {
    code: 'HOSP22P00494',
    hospitalId: '2200494',
    name: 'Vardhman Hospital Durg',
    nameHi: 'वर्धमान अस्पताल दुर्ग',
    type: 'PRIVATE',
    district: 'Durg',
    state: 'Chhattisgarh'
  }
];

export const loadHospitalRegistry = async (): Promise<Map<string, VerifiedHospitalRecord>> => {
  if (registryCache) return registryCache;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const map = new Map<string, VerifiedHospitalRecord>();

    const files = [
      { path: '/data/PM_JAY_GOV_Hospitals_Data.csv', defaultType: 'GOV' },
      { path: '/data/PM_JAY_PRIVATE_Hospitals_Data.csv', defaultType: 'PRIVATE' },
      { path: '/data/PM_JAY_NABH_Accredited_Hospitals_Data.csv', defaultType: 'NABH_Accredited' }
    ];

    await Promise.all(
      files.map(file => {
        return new Promise<void>((resolve) => {
          Papa.parse(file.path, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              if (results?.data) {
                for (const row of results.data as any[]) {
                  const facilityId = (row.Facility_ID || '').trim();
                  const hospitalId = (row.Hospital_ID || '').trim();
                  const hospitalName = (row.Hospital_Name || '').trim();

                  if (!facilityId && !hospitalId && !hospitalName) continue;

                  const stateCode = (row.State_Code || '').trim();
                  const stateName = STATE_NAMES[stateCode] || (stateCode ? `State (${stateCode})` : 'India');

                  const rawSpecialties = row.Speciality_Code ? String(row.Speciality_Code).split(',') : [];
                  const cleanSpecialties = rawSpecialties.map(s => s.trim()).filter(Boolean);

                  const record: VerifiedHospitalRecord = {
                    facilityId: facilityId || hospitalId,
                    hospitalId: hospitalId || facilityId,
                    name: hospitalName || 'Empaneled Hospital',
                    nameHi: hospitalName
                      .replace(/Hospital/gi, 'अस्पताल')
                      .replace(/Medical College/gi, 'मेडिकल कॉलेज')
                      .replace(/Government/gi, 'सरकारी')
                      .replace(/Govt/gi, 'सरकारी')
                      .replace(/District/gi, 'जिला'),
                    type: row.Hospital_Type || file.defaultType,
                    typeCode: row.Hospital_Type_Code || (file.defaultType === 'GOV' ? 'G' : 'P'),
                    address: (row.Address || '').trim() || `${row.District_Code || ''}, ${stateName}`,
                    contact: (row.Hospital_Contact || '').trim() || '108 / N/A',
                    districtCode: (row.District_Code || '').trim(),
                    stateCode,
                    stateName,
                    empanelledDate: (row.Emplaned_Date || '').trim(),
                    specialties: cleanSpecialties,
                    schemeCode: (row.SchemeCode || 'PM-JAY').trim(),
                    sourceFile: file.path
                  };

                  if (facilityId) map.set(facilityId.toUpperCase(), record);
                  if (hospitalId) map.set(hospitalId.toUpperCase(), record);
                }
              }
              resolve();
            },
            error: (err) => {
              console.warn(`Failed to parse ${file.path}:`, err);
              resolve();
            }
          });
        });
      })
    );

    // Map legacy demonstration codes to real records for smooth transition
    const durgReal = map.get('HS22010102') || map.get('22010102');
    if (durgReal) {
      map.set('HOSP-CG-042', durgReal);
    }
    const aiimsReal = map.get('HOSP22G84446') || map.get('2284446');
    if (aiimsReal) {
      map.set('AIIMS-RPR-01', aiimsReal);
    }
    const gindodiReal = map.get('HOSP22P25103646') || map.get('103646');
    if (gindodiReal) {
      map.set('HOSP-CG-108', gindodiReal);
    }

    registryCache = map;
    return map;
  })();

  return loadPromise;
};

export const verifyHospitalCode = async (
  rawCode: string
): Promise<{ success: boolean; hospital?: VerifiedHospitalRecord; error?: string }> => {
  const cleanCode = rawCode.trim().toUpperCase();
  if (!cleanCode) {
    return { success: false, error: 'Please enter a Hospital Empanelment ID or Hospital Code.' };
  }

  const registry = await loadHospitalRegistry();
  const matched = registry.get(cleanCode);

  if (matched) {
    return { success: true, hospital: matched };
  }

  return {
    success: false,
    error: `Hospital Code "${rawCode.trim()}" was not found in the PM-JAY Empaneled Database. Please enter a valid Facility ID (e.g. HS22010102, HOSP22G84446, HOSP22P25103646) or Hospital ID (e.g. 22010102, 2284446, 103646).`
  };
};
