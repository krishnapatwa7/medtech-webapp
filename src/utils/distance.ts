import { Hospital, baseHospitals } from '../data/hospitals';

// Haversine formula to compute great-circle distance in kilometers
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10; // Round to 1 decimal
}

// Generate localized nearby empaneled hospitals around user coordinates
export function getNearbyHospitals(
  userLat: number,
  userLng: number,
  filterType: 'all' | 'government' | 'private',
  cityName: string = 'Durg',
  areaName: string = 'Padmanabhpur'
): Hospital[] {
  // Realistic distance dispersion offsets around user GPS coords
  const offsets = [
    { dLat: 0.005, dLng: 0.004 },   // ~0.6 km
    { dLat: -0.009, dLng: 0.007 },  // ~1.1 km
    { dLat: 0.014, dLng: -0.011 },  // ~1.8 km
    { dLat: -0.018, dLng: -0.015 }, // ~2.5 km
    { dLat: 0.025, dLng: 0.020 },   // ~3.4 km
    { dLat: -0.031, dLng: 0.026 },  // ~4.3 km
    { dLat: 0.038, dLng: -0.030 },  // ~5.2 km
    { dLat: -0.044, dLng: -0.036 }, // ~6.1 km
    { dLat: 0.052, dLng: 0.042 },   // ~7.3 km
    { dLat: -0.059, dLng: 0.048 },  // ~8.4 km
    { dLat: 0.068, dLng: -0.054 },  // ~9.6 km
    { dLat: -0.076, dLng: -0.062 }, // ~10.9 km
    { dLat: 0.084, dLng: 0.070 },   // ~12.2 km
    { dLat: -0.093, dLng: 0.081 },  // ~13.8 km
  ];

  const localizedList: Hospital[] = baseHospitals.map((hosp, idx) => {
    const offset = offsets[idx % offsets.length];
    const hospitalLat = userLat + offset.dLat;
    const hospitalLng = userLng + offset.dLng;
    const dist = calculateDistanceKm(userLat, userLng, hospitalLat, hospitalLng);

    // Build specific localized names & addresses
    let localizedName = hosp.name;
    let localizedNameHi = hosp.nameHi;
    let localizedAddress = hosp.address;
    let localizedAddressHi = hosp.addressHi;

    const isDurgRegion = cityName.toLowerCase().includes('durg') || cityName.toLowerCase().includes('bhilai') || cityName.toLowerCase().includes('chhattisgarh');

    if (hosp.id === 'hosp-1') {
      localizedName = `District Civil Hospital (${cityName})`;
      localizedNameHi = `जिला नागरिक चिकित्सालय (${cityName})`;
      localizedAddress = `Near Main Court Road, Civil Lines, ${cityName}`;
      localizedAddressHi = `मुख्य न्यायालय रोड, सिविल लाइंस, ${cityName}`;
    } else if (hosp.id === 'hosp-3') {
      if (isDurgRegion) {
        localizedName = 'AIIMS Raipur / PM-JAY Regional Center';
        localizedNameHi = 'एम्स रायपुर / पीएम-जय क्षेत्रीय केंद्र (सरकारी)';
        localizedAddress = `GE Road, Near Durg-Raipur Corridor, ${cityName}`;
        localizedAddressHi = `जीई रोड, दुर्ग-रायपुर कॉरिडोर, ${cityName}`;
      } else {
        localizedName = `AIIMS / Apex Medical Institute (${cityName})`;
        localizedNameHi = `अखिल भारतीय आयुर्विज्ञान संस्थान (${cityName})`;
        localizedAddress = `Medical Enclave, ${cityName}`;
        localizedAddressHi = `मेडिकल एन्क्लेव, ${cityName}`;
      }
    } else if (hosp.id === 'hosp-2') {
      localizedName = `Sanjeevani Super Speciality Hospital (${cityName})`;
      localizedNameHi = `संजीवनी सुपर स्पेशलिटी अस्पताल (${cityName})`;
      localizedAddress = `${areaName} Road, Bypass Corridor, ${cityName}`;
      localizedAddressHi = `${areaName} रोड, बाईपास कॉरिडोर, ${cityName}`;
    } else if (hosp.id === 'hosp-4') {
      localizedName = `Lifeline Multispeciality & Trauma Centre (${cityName})`;
      localizedNameHi = `लाइफलाइन मल्टीस्पेशलिटी एवं ट्रॉमा सेंटर (${cityName})`;
      localizedAddress = `Main Highway Road, Near ${areaName}, ${cityName}`;
      localizedAddressHi = `मुख्य हाईवे रोड, ${areaName} के पास, ${cityName}`;
    } else if (hosp.id === 'hosp-5') {
      localizedName = `Government Medical College Hospital (${cityName})`;
      localizedNameHi = `राजकीय मेडिकल कॉलेज एवं संबद्ध अस्पताल (${cityName})`;
      localizedAddress = `University Campus Road, ${cityName}`;
      localizedAddressHi = `यूनिवर्सिटी कैंपस रोड, ${cityName}`;
    } else {
      // General city localization for other hospitals
      localizedAddress = `${hosp.address.split(',')[0]}, ${cityName}`;
      localizedAddressHi = `${(hosp.addressHi || hosp.address).split(',')[0]}, ${cityName}`;
    }

    return {
      ...hosp,
      name: localizedName,
      nameHi: localizedNameHi,
      address: localizedAddress,
      addressHi: localizedAddressHi,
      lat: hospitalLat,
      lng: hospitalLng,
      distanceKm: dist
    };
  });

  // Filter based on selected filter
  const filtered = localizedList.filter(hosp => {
    if (filterType === 'all') return true;
    return hosp.type === filterType;
  });

  // Sort by Distance ascending
  filtered.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

  // Return Top 10
  return filtered.slice(0, 10);
}
