export interface DetectedLocation {
  lat: number;
  lng: number;
  locationName: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  source: 'gps' | 'ip' | 'search' | 'cached';
}

export interface GeocodedPlace {
  id: number | string;
  name: string;
  admin1?: string; // State
  admin2?: string; // District
  country?: string;
  latitude: number;
  longitude: number;
}

const LOCATION_CACHE_KEY = 'agro_user_detected_location_v2';

/**
 * High-precision reverse geocoding from coordinates into human-readable place name.
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  // 1. Try BigDataCloud reverse geocoding
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      { signal: AbortSignal.timeout(4000) }
    );
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || '';
      const district = data.localityInfo?.administrative?.find((a: any) => a.adminLevel === 5 || a.description?.includes('district'))?.name || '';
      const state = data.principalSubdivision || '';
      const country = data.countryName || 'India';

      const parts = [city, district, state].filter(Boolean);
      // Remove duplicate names if city and district match
      const uniqueParts = parts.filter((item, index) => parts.indexOf(item) === index);
      if (uniqueParts.length > 0) {
        return `${uniqueParts.join(', ')}, ${country}`;
      }
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
      const locality = addr.suburb || addr.town || addr.village || addr.city || '';
      const district = addr.state_district || addr.county || addr.district || '';
      const state = addr.state || '';
      const country = addr.country || 'India';

      const parts = [locality, district, state].filter(Boolean);
      const uniqueParts = parts.filter((item, index) => parts.indexOf(item) === index);
      if (uniqueParts.length > 0) {
        return `${uniqueParts.join(', ')}, ${country}`;
      }
    }
  } catch (err) {
    console.warn('[GeoService] OSM Nominatim reverse geocode error:', err);
  }

  return `Lat ${lat.toFixed(4)}, Lng ${lng.toFixed(4)}`;
}

/**
 * Searches places globally with instant auto-complete (Open-Meteo Geocoding).
 */
export async function searchPlaces(query: string): Promise<GeocodedPlace[]> {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=10&language=en&format=json`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        return data.results.map((r: any) => ({
          id: r.id,
          name: r.name,
          admin1: r.admin1,
          admin2: r.admin2,
          country: r.country,
          latitude: r.latitude,
          longitude: r.longitude
        }));
      }
    }
  } catch (err) {
    console.warn('[GeoService] Place search error:', err);
  }
  return [];
}

/**
 * Detects user live location using browser high-accuracy GPS with automatic IP fallback.
 */
export async function detectUserLocation(forceGps = false): Promise<DetectedLocation> {
  // 1. Try Browser HTML5 GPS Geolocation
  if (typeof window !== 'undefined' && 'geolocation' in navigator) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: true, timeout: 8000, maximumAge: 10000 }
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
      console.warn('[GeoService] HTML5 Geolocation skipped/denied:', gpsErr);
    }
  }

  // If forceGps was requested and failed, try IP lookup immediately
  // 2. Try IP-based Geolocation (instant, fallback if GPS is not granted)
  // Provider 1: ip-api.com (fast, highly accurate regional IP geolocation)
  try {
    const res = await fetch('http://ip-api.com/json', { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success' && data.lat && data.lon) {
        const city = data.city || '';
        const state = data.regionName || '';
        const country = data.country || 'India';
        const locationName = city && state ? `${city}, ${state}, ${country}` : `${state || city || 'Live Location'}, ${country}`;

        const result: DetectedLocation = {
          lat: data.lat,
          lng: data.lon,
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
  } catch (ipapiErr) {
    console.warn('[GeoService] ip-api.com lookup error, trying provider 2:', ipapiErr);
  }

  // Provider 2: ipwho.is
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
    console.warn('[GeoService] ipwho.is lookup error, trying provider B:', ipErr);
  }

  // Provider B: ipapi.co
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      if (data.latitude && data.longitude) {
        const city = data.city || '';
        const state = data.region || '';
        const country = data.country_name || 'India';
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
  } catch (ipapiErr) {
    console.warn('[GeoService] ipapi.co lookup error:', ipapiErr);
  }

  // 3. Cached / Default Location
  return {
    lat: 11.0168,
    lng: 76.9558,
    locationName: 'Coimbatore, Tamil Nadu, India',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    source: 'cached'
  };
}
