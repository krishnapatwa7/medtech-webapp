export interface UserLocation {
  lat: number;
  lng: number;
  city: string;
  area?: string;
  state?: string;
  source: 'gps' | 'ip' | 'manual';
}

export const POPULAR_CITIES = [
  { name: 'Durg / Bhilai, CG', area: 'Padmanabhpur', lat: 21.1904, lng: 81.2849 },
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

// OpenStreetMap Nominatim Detailed Reverse Geocoding
export async function getDetailedAddressFromCoords(lat: number, lng: number): Promise<{ area: string; city: string; state: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};

      // Extract specific sub-locality / area (e.g., Padmanabhpur, Sector 6, Civil Lines)
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

      // Extract main city / district (e.g., Durg, Raipur, New Delhi)
      const mainCity = 
        addr.city || 
        addr.town || 
        addr.district || 
        addr.county || 
        addr.state_district || 
        addr.municipality;

      const state = addr.state || '';

      const cleanArea = subLocality ? subLocality.trim() : '';
      const cleanCity = mainCity ? mainCity.trim() : '';

      return {
        area: cleanArea || cleanCity || 'Local Area',
        city: cleanCity || cleanArea || 'Current City',
        state
      };
    }
  } catch (e) {
    console.warn('Nominatim reverse geocode error, falling back...', e);
  }

  // Backup: BigDataCloud API
  try {
    const res2 = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (res2.ok) {
      const d = await res2.json();
      const area = d.locality || d.localityInfo?.administrative?.[3]?.name || '';
      const city = d.city || d.principalSubdivision || '';
      const state = d.principalSubdivision || '';
      return {
        area: area || city || 'Local Area',
        city: city || area || 'Current City',
        state
      };
    }
  } catch (e2) {
    console.warn('Fallback reverse geocode error:', e2);
  }

  return {
    area: 'Live Area',
    city: 'Current Location',
    state: ''
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
        console.warn('High accuracy timed out or failed, retrying with standard accuracy:', err);
        // Fallback retry with longer timeout and moderate accuracy
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: false, timeout: 8000, maximumAge: 30000 }
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
    );
  });
}

export async function detectLocation(): Promise<UserLocation> {
  // 1. Try Browser Geolocation first
  try {
    const pos = await getBrowserGPS();
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const { area, city, state } = await getDetailedAddressFromCoords(lat, lng);

    return {
      lat,
      lng,
      area: area || 'Padmanabhpur',
      city: city || 'Durg',
      state,
      source: 'gps'
    };
  } catch (err) {
    console.warn('Browser GPS not available or blocked, checking IP Geolocation...', err);
  }

  // 2. IP Geolocation Fallback
  try {
    const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
    if (res.ok) {
      const data = await res.json();
      const lat = parseFloat(data.latitude);
      const lng = parseFloat(data.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        const { area, city, state } = await getDetailedAddressFromCoords(lat, lng);
        return {
          lat,
          lng,
          area: area || data.city || 'Central Area',
          city: city || data.city || data.region || 'Current City',
          state: state || data.region,
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
    source: 'manual'
  };
}

export async function getCityFromCoords(lat: number, lng: number) {
  const result = await getDetailedAddressFromCoords(lat, lng);
  return result;
}