export interface UserLocation {
  lat: number;
  lng: number;
  city?: string;
  locality?: string;
  state?: string;
  source: 'gps' | 'ip' | 'manual';
}

export const POPULAR_CITIES = [
  { name: 'New Delhi / NCR', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
  { name: 'Patna', lat: 25.5941, lng: 85.1376 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
  { name: 'Bhopal', lat: 23.2599, lng: 77.4126 },
  { name: 'Ranchi', lat: 23.3441, lng: 85.3096 },
  { name: 'Varanasi', lat: 25.3176, lng: 82.9739 },
];

// Reverse geocode latitude and longitude to get real city / area name
export async function getCityFromCoords(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.principalSubdivision || data.countryName;
      if (city) {
        return data.locality && data.city ? `${data.locality}, ${data.city}` : city;
      }
    }
  } catch (e) {
    console.warn('Reverse geocode failed:', e);
  }
  return `${lat.toFixed(3)}°, ${lng.toFixed(3)}°`;
}

// Request Browser GPS with clean promise & timeout
export function getBrowserGPS(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      resolve,
      (err) => {
        // Retry with low accuracy if high accuracy timed out
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
        );
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 10000 }
    );
  });
}

export async function detectLocation(): Promise<UserLocation> {
  // 1. Try Browser Geolocation
  try {
    const pos = await getBrowserGPS();
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const city = await getCityFromCoords(lat, lng);

    return {
      lat,
      lng,
      city: city || 'Your Live GPS Location',
      source: 'gps'
    };
  } catch (err) {
    console.warn('Browser GPS permission not granted or failed, trying IP fallback...', err);
  }

  // 2. IP Geolocation Fallback
  try {
    const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
    if (res.ok) {
      const data = await res.json();
      const lat = parseFloat(data.latitude);
      const lng = parseFloat(data.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        return {
          lat,
          lng,
          city: data.city || data.region || 'Current Location',
          state: data.region,
          source: 'ip'
        };
      }
    }
  } catch (ipErr) {
    console.warn('IP Geo fallback failed:', ipErr);
  }

  // 3. Default Fallback
  return {
    lat: 28.6139,
    lng: 77.2090,
    city: 'New Delhi / NCR',
    source: 'manual'
  };
}
