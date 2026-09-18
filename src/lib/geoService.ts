export interface DetectedLocation {
  lat: number;
  lng: number;
  locationName: string;
  city?: string;
  state?: string;
  country?: string;
  source: 'gps' | 'ip' | 'cached';
}

const LOCATION_CACHE_KEY = 'agro_user_detected_location_v1';

/**
 * Reverse geocodes latitude and longitude into human-readable place name.
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  // 1. Try BigDataCloud free client reverse geocoding
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      { signal: AbortSignal.timeout(4000) }
    );
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.localityInfo?.administrative?.[2]?.name || '';
      const state = data.principalSubdivision || data.localityInfo?.administrative?.[1]?.name || '';
      const country = data.countryName || 'India';

      if (city && state) return `${city}, ${state}, ${country}`;
      if (city) return `${city}, ${country}`;
      if (state) return `${state}, ${country}`;
    }
  } catch (err) {
    console.warn('[GeoService] BigDataCloud reverse geocode error:', err);
  }

  // 2. Try OpenStreetMap Nominatim
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
      {
        headers: { 'Accept-Language': 'en' },
        signal: AbortSignal.timeout(4000)
      }
    );
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const city = addr.city || addr.town || addr.village || addr.county || addr.state_district || addr.district || '';
      const state = addr.state || '';
      const country = addr.country || 'India';

      if (city && state) return `${city}, ${state}, ${country}`;
      if (city) return `${city}, ${country}`;
      if (state) return `${state}, ${country}`;
    }
  } catch (err) {
    console.warn('[GeoService] OSM Nominatim reverse geocode error:', err);
  }

  return `Lat ${lat.toFixed(4)}, Lng ${lng.toFixed(4)}`;
}

/**
 * Detects location using high-accuracy GPS with automatic fast IP fallback.
 */
export async function detectUserLocation(): Promise<DetectedLocation> {
  // 1. Try Browser HTML5 GPS Geolocation
  if (typeof window !== 'undefined' && 'geolocation' in navigator) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: true, timeout: 6000, maximumAge: 30000 }
        );
      });

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const locationName = await reverseGeocode(lat, lng);

      const result: DetectedLocation = {
        lat,
        lng,
        locationName,
        source: 'gps'
      };

      try {
        localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(result));
      } catch {}

      return result;
    } catch (gpsErr) {
      console.warn('[GeoService] HTML5 Geolocation skipped/denied, falling back to IP detection:', gpsErr);
    }
  }

  // 2. Try IP-based Geolocation (instant, no user prompt required)
  try {
    const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.latitude && data.longitude) {
        const city = data.city || '';
        const state = data.region || '';
        const country = data.country || 'India';
        const locationName = city && state ? `${city}, ${state}, ${country}` : `${state || city || 'Live Location'}, ${country}`;

        const result: DetectedLocation = {
          lat: data.latitude,
          lng: data.longitude,
          locationName,
          city,
          state,
          country,
          source: 'ip'
        };

        try {
          localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(result));
        } catch {}

        return result;
      }
    }
  } catch (ipErr) {
    console.warn('[GeoService] IP lookup error:', ipErr);
  }

  // 3. Cached fallback
  try {
    const cached = localStorage.getItem(LOCATION_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {}

  // 4. Default fallback
  return {
    lat: 12.8351,
    lng: 79.7001,
    locationName: 'Tamil Nadu, India',
    source: 'cached'
  };
}
