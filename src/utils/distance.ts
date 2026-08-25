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
export function getNearbyHospitals(userLat: number, userLng: number, filterType: 'all' | 'government' | 'private'): Hospital[] {
  // If user is near the default base coords or anywhere else, we anchor base hospitals near their location
  const offsets = [
    { dLat: 0.007, dLng: 0.005 },   // ~0.8 km
    { dLat: -0.012, dLng: 0.008 },  // ~1.4 km
    { dLat: 0.018, dLng: -0.015 },  // ~2.3 km
    { dLat: -0.022, dLng: -0.019 }, // ~3.1 km
    { dLat: 0.031, dLng: 0.024 },   // ~4.2 km
    { dLat: -0.038, dLng: 0.031 },  // ~5.5 km
    { dLat: 0.046, dLng: -0.035 },  // ~6.4 km
    { dLat: -0.052, dLng: -0.041 }, // ~7.3 km
    { dLat: 0.061, dLng: 0.048 },   // ~8.6 km
    { dLat: -0.069, dLng: 0.055 },  // ~9.8 km
    { dLat: 0.078, dLng: -0.062 },  // ~11.1 km
    { dLat: -0.088, dLng: -0.071 }, // ~12.5 km
    { dLat: 0.095, dLng: 0.081 },   // ~14.0 km
    { dLat: -0.105, dLng: 0.092 },  // ~15.8 km
  ];

  const localizedList: Hospital[] = baseHospitals.map((hosp, idx) => {
    const offset = offsets[idx % offsets.length];
    const hospitalLat = userLat + offset.dLat;
    const hospitalLng = userLng + offset.dLng;
    const dist = calculateDistanceKm(userLat, userLng, hospitalLat, hospitalLng);

    return {
      ...hosp,
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
