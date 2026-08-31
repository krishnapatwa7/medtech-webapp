export interface UserLocation {
  lat: number;
  lng: number;
  city: string;
  area?: string;
  landmark?: string;
  state?: string;
  displayName?: string;
  source: 'gps' | 'ip' | 'manual';
}

export const POPULAR_CITIES = [
  { name: 'Shri Shankaracharya Technical Campus, Durg', area: 'Junwani / SSTC', lat: 21.2185, lng: 81.3090 },
  { name: 'Padmanabhpur, Durg, CG', area: 'Padmanabhpur', lat: 21.1904, lng: 81.2849 },
  { name: 'Bhilai / Durg, CG', area: 'Sector 6 / Civic Centre', lat: 21.2120, lng: 81.3733 },
  { name: 'Raipur, CG', area: 'Civil Lines', lat: 21.2514, lng: 81.6296 },
  { name: 'New Delhi / NCR', area: 'Connaught Place', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai, MH', area: 'Andheri West', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru, KA', area: 'Koramangala', lat: 12.9716, lng: 77.5946 },
  { name: 'Lucknow, UP', area: 'Hazratganj', lat: 26.8467, lng: 80.9462 },
  { name: 'Patna, BR', area: 'Kankarbagh', lat: 25.5941, lng: 85.1376 },
  { name: 'Jaipur, RJ', area: 'Malviya Nagar', lat: 26.9124, lng: 75.7873 },
  { name: 'Ahmedabad, GJ', area: 'Navrangpura', lat: 23.0225, lng: 72.5714 },
  { name: 'Kolkata, WB', area: 'Salt Lake', lat: 22.5726, lng: 88.3639 },
  { name: 'Hyderabad, TS', area: 'Banjara Hills', lat: 17.3850, lng: 78.4867 },
  { name: 'Pune, MH', area: 'Shivajinagar', lat: 18.5204, lng: 73.8567 },
  { name: 'Bilaspur, CG', area: 'Vyapar Vihar', lat: 22.0797, lng: 82.1409 },
  { name: 'Ranchi, JH', area: 'Doranda', lat: 23.3441, lng: 85.3096 },
  { name: 'Varanasi, UP', area: 'Lanka', lat: 25.3176, lng: 82.9739 },
];

// OpenStreetMap Nominatim Detailed High-Precision Reverse Geocoding
export async function getDetailedAddressFromCoords(lat: number, lng: number): Promise<{ 
  landmark: string;
  area: string; 
  city: string; 
  state: string;
  displayName: string;
}> {
  // Check known college campuses / landmark bounds for high precision
  // SSTC Junwani Campus: approx lat: 21.215 - 21.222, lng: 81.305 - 81.314
  if (lat >= 21.214 && lat <= 21.224 && lng >= 81.304 && lng <= 81.316) {
    return {
      landmark: 'Shri Shankaracharya Technical Campus',
      area: 'Junwani',
      city: 'Durg',
      state: 'Chhattisgarh',
      displayName: 'Shri Shankaracharya Technical Campus, Durg'
    };
  }

  // BIT Durg Campus: approx lat 21.192 - 21.198, lng 81.298 - 81.306
  if (lat >= 21.191 && lat <= 21.199 && lng >= 81.297 && lng <= 81.307) {
    return {
      landmark: 'Bhilai Institute of Technology (BIT Durg)',
      area: 'Malviya Nagar',
      city: 'Durg',
      state: 'Chhattisgarh',
      displayName: 'Bhilai Institute of Technology, Durg'
    };
  }

  // 1. Primary: Nominatim with zoom 18 (building & campus level detail)
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};

      // Extract specific Landmark / Campus / Building / Amenity name
      const landmark = 
        addr.amenity || 
        addr.college || 
        addr.university || 
        addr.school || 
        addr.building || 
        addr.hospital || 
        addr.office || 
        addr.tourism || 
        addr.historic || 
        addr.leisure || 
        (data.name && !data.name.includes(addr.road || '###') ? data.name : '');

      // Extract Sub-locality / Colony / Road / Sector / Village
      const subLocality = 
        addr.suburb || 
        addr.neighbourhood || 
        addr.residential || 
        addr.subdistrict || 
        addr.hamlet || 
        addr.village || 
        addr.quarter || 
        addr.commercial || 
        addr.road;

      // Extract main City / District
      const mainCity = 
        addr.city || 
        addr.town || 
        addr.district || 
        addr.county || 
        addr.state_district || 
        addr.municipality;

      const state = addr.state || '';

      const cleanLandmark = landmark ? landmark.trim() : '';
      const cleanArea = subLocality ? subLocality.trim() : '';
      const cleanCity = mainCity ? mainCity.trim() : '';

      // Construct precise display name
      let displayName = '';
      if (cleanLandmark && cleanCity && cleanLandmark.toLowerCase() !== cleanCity.toLowerCase()) {
        displayName = `${cleanLandmark}, ${cleanCity}`;
      } else if (cleanLandmark && cleanArea && cleanLandmark.toLowerCase() !== cleanArea.toLowerCase()) {
        displayName = `${cleanLandmark}, ${cleanArea}`;
      } else if (cleanArea && cleanCity && cleanArea.toLowerCase() !== cleanCity.toLowerCase()) {
        displayName = `${cleanArea}, ${cleanCity}`;
      } else {
        displayName = cleanLandmark || cleanArea || cleanCity || 'Current Location';
      }

      return {
        landmark: cleanLandmark,
        area: cleanArea || cleanCity || 'Local Area',
        city: cleanCity || cleanArea || 'Current City',
        state,
        displayName
      };
    }
  } catch (e) {
    console.warn('Nominatim reverse geocode error, falling back...', e);
  }

  // 2. Backup: BigDataCloud Reverse Geocoding API
  try {
    const res2 = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (res2.ok) {
      const d = await res2.json();
      const area = d.locality || d.localityInfo?.administrative?.[3]?.name || '';
      const city = d.city || d.principalSubdivision || '';
      const state = d.principalSubdivision || '';
      const cleanArea = area.trim();
      const cleanCity = city.trim();

      const displayName = cleanArea && cleanCity && cleanArea.toLowerCase() !== cleanCity.toLowerCase()
        ? `${cleanArea}, ${cleanCity}`
        : cleanArea || cleanCity || 'Current Location';

      return {
        landmark: '',
        area: cleanArea || cleanCity || 'Local Area',
        city: cleanCity || cleanArea || 'Current City',
        state,
        displayName
      };
    }
  } catch (e2) {
    console.warn('Fallback reverse geocode error:', e2);
  }

  return {
    landmark: '',
    area: 'Live Area',
    city: 'Current Location',
    state: '',
    displayName: 'Current Location'
  };
}

// Request Browser GPS with High Accuracy
export function getBrowserGPS(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported by browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      (err) => {
        console.warn('High accuracy timed out, retrying with fallback settings:', err);
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
        );
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 5000 }
    );
  });
}

export async function detectLocation(): Promise<UserLocation> {
  // 1. Try Browser Geolocation first
  try {
    const pos = await getBrowserGPS();
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const { landmark, area, city, state, displayName } = await getDetailedAddressFromCoords(lat, lng);

    return {
      lat,
      lng,
      landmark,
      area: area || 'Padmanabhpur',
      city: city || 'Durg',
      state,
      displayName: displayName || (city ? `${area || landmark ? `${landmark || area}, ` : ''}${city}` : 'Current Location'),
      source: 'gps'
    };
  } catch (err) {
    console.warn('Browser GPS not available, checking IP Geolocation...', err);
  }

  // 2. IP Geolocation Fallback
  try {
    const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
    if (res.ok) {
      const data = await res.json();
      const lat = parseFloat(data.latitude);
      const lng = parseFloat(data.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        const { landmark, area, city, state, displayName } = await getDetailedAddressFromCoords(lat, lng);
        return {
          lat,
          lng,
          landmark,
          area: area || data.city || 'Central Area',
          city: city || data.city || data.region || 'Current City',
          state: state || data.region,
          displayName: displayName || data.city || 'Current Location',
          source: 'ip'
        };
      }
    }
  } catch (ipErr) {
    console.warn('IP Geo fallback failed:', ipErr);
  }

  // 3. Default Fallback: Durg, Chhattisgarh
  return {
    lat: 21.1904,
    lng: 81.2849,
    area: 'Padmanabhpur',
    city: 'Durg',
    state: 'Chhattisgarh',
    displayName: 'Padmanabhpur, Durg',
    source: 'manual'
  };
}

export async function getCityFromCoords(lat: number, lng: number) {
  const result = await getDetailedAddressFromCoords(lat, lng);
  return result;
}