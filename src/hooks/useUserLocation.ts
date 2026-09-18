import { useState, useEffect, useCallback } from 'react';

export interface NominatimAddress {
  village?: string;
  hamlet?: string;
  town?: string;
  suburb?: string;
  city?: string;
  municipality?: string;
  county?: string;
  state_district?: string;
  state?: string;
  region?: string;
  country?: string;
  country_code?: string;
  postcode?: string;
  road?: string;
  neighbourhood?: string;
  [key: string]: string | undefined;
}

export interface NominatimReverseResponse {
  place_id: number;
  licence?: string;
  osm_type?: string;
  osm_id?: number;
  lat: string;
  lon: string;
  display_name: string;
  address: NominatimAddress;
  boundingbox?: string[];
}

export interface LocationCoordinates {
  lat: number;
  lon: number;
  accuracy?: number;
  altitude?: number | null;
}

export interface LocationDetails {
  locality: string;
  district?: string;
  state: string;
  country: string;
  postalCode?: string | null;
  formattedAddress: string;
  displayName: string;
  coordinates: LocationCoordinates;
  source: 'gps' | 'ip' | 'manual' | 'cached';
  timestamp: number;
}

export interface UseUserLocationReturn {
  coordinates: LocationCoordinates | null;
  locationDetails: LocationDetails | null;
  loading: boolean;
  error: string | null;
  detectLocation: (forceGps?: boolean) => Promise<LocationDetails | null>;
  clearError: () => void;
  setManualLocation: (details: LocationDetails) => void;
}

const STORAGE_KEY = 'agro_exact_user_location_v3';

/**
 * Extracts the granular locality / settlement hierarchy
 */
export function parseSettlement(address: NominatimAddress): string {
  return (
    address.village ||
    address.hamlet ||
    address.town ||
    address.suburb ||
    address.city ||
    address.municipality ||
    address.county ||
    'Unknown Locality'
  );
}

/**
 * Extracts state or province
 */
export function parseState(address: NominatimAddress): string {
  return address.state || address.region || address.state_district || 'Unknown State';
}

/**
 * Extracts country
 */
export function parseCountry(address: NominatimAddress): string {
  return address.country || 'Unknown Country';
}

/**
 * Performs reverse geocoding via OpenStreetMap Nominatim with BigDataCloud fallback.
 */
export async function reverseGeocodeCoordinates(lat: number, lon: number): Promise<LocationDetails> {
  const coordObj: LocationCoordinates = { lat, lon };

  // 1. Primary: Query Nominatim Reverse Geocoding API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lon)}&zoom=14&addressdetails=1`;

    const res = await fetch(nominatimUrl, {
      headers: {
        'User-Agent': 'AgroUzhavan-App/1.0 (https://agro-uzhavan.vercel.app; support@agrouzhavan.org)',
        'Accept-Language': 'en'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data: NominatimReverseResponse = await res.json();
      if (data && data.address) {
        const address = data.address;
        const locality = parseSettlement(address);
        const district = address.state_district || address.county || undefined;
        const state = parseState(address);
        const country = parseCountry(address);
        const postalCode = address.postcode || null;

        // Build clean formatted address
        const parts = [locality, district !== locality ? district : null, state, country].filter(Boolean);
        const formattedAddress = parts.join(', ');

        return {
          locality,
          district,
          state,
          country,
          postalCode,
          formattedAddress,
          displayName: data.display_name || formattedAddress,
          coordinates: coordObj,
          source: 'gps',
          timestamp: Date.now()
        };
      }
    }
  } catch (nominatimErr) {
    console.warn('[useUserLocation] Nominatim reverse geocode error/timeout:', nominatimErr);
  }

  // 2. Secondary Fallback: BigDataCloud Reverse Geocoding Client
  try {
    const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${encodeURIComponent(
      lat
    )}&longitude=${encodeURIComponent(lon)}&localityLanguage=en`;

    const bdcRes = await fetch(bdcUrl, { signal: AbortSignal.timeout(6000) });
    if (bdcRes.ok) {
      const bdcData = await bdcRes.json();
      const locality = bdcData.city || bdcData.locality || 'Unknown Locality';
      const district =
        bdcData.localityInfo?.administrative?.find((a: any) => a.adminLevel === 5 || a.description?.includes('district'))
          ?.name || undefined;
      const state = bdcData.principalSubdivision || 'Unknown State';
      const country = bdcData.countryName || 'India';
      const postalCode = bdcData.postcode || null;

      const parts = [locality, district !== locality ? district : null, state, country].filter(Boolean);
      const formattedAddress = parts.join(', ');

      return {
        locality,
        district,
        state,
        country,
        postalCode,
        formattedAddress,
        displayName: formattedAddress,
        coordinates: coordObj,
        source: 'gps',
        timestamp: Date.now()
      };
    }
  } catch (bdcErr) {
    console.warn('[useUserLocation] BigDataCloud fallback error:', bdcErr);
  }

  // 3. Coordinate String Fallback
  const fallbackAddress = `Lat ${lat.toFixed(4)}, Lon ${lon.toFixed(4)}`;
  return {
    locality: fallbackAddress,
    state: 'Unknown State',
    country: 'India',
    postalCode: null,
    formattedAddress: fallbackAddress,
    displayName: fallbackAddress,
    coordinates: coordObj,
    source: 'gps',
    timestamp: Date.now()
  };
}

/**
 * Custom React Hook for robust high-accuracy user location detection.
 */
export function useUserLocation(): UseUserLocationReturn {
  const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed.coordinates || null;
      }
    } catch {}
    return null;
  });

  const [locationDetails, setLocationDetails] = useState<LocationDetails | null>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {}
    return null;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const setManualLocation = useCallback((details: LocationDetails) => {
    setLocationDetails(details);
    setCoordinates(details.coordinates);
    setError(null);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
    } catch {}
  }, []);

  const detectLocation = useCallback(
    async (forceGps = true): Promise<LocationDetails | null> => {
      setLoading(true);
      setError(null);

      // Check browser Geolocation support
      if (typeof window === 'undefined' || !('geolocation' in navigator)) {
        const errStr = 'Geolocation is not supported by your current browser.';
        setError(errStr);
        setLoading(false);
        return null;
      }

      try {
        // High-accuracy GPS position request
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: forceGps ? 0 : 30000
          });
        });

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        const altitude = position.coords.altitude;

        const coords: LocationCoordinates = { lat, lon, accuracy, altitude };
        setCoordinates(coords);

        // Reverse geocode
        const details = await reverseGeocodeCoordinates(lat, lon);
        details.coordinates.accuracy = accuracy;
        details.coordinates.altitude = altitude;

        setLocationDetails(details);

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
        } catch {}

        setLoading(false);
        return details;
      } catch (geoError: any) {
        let errorMessage = 'An unexpected error occurred while detecting your position.';

        if (geoError && typeof geoError.code === 'number') {
          switch (geoError.code) {
            case 1: // PERMISSION_DENIED
              errorMessage = 'Location permission was denied. Please allow location access in your browser settings.';
              break;
            case 2: // POSITION_UNAVAILABLE
              errorMessage = 'GPS position is currently unavailable. Please check your network or GPS signal.';
              break;
            case 3: // TIMEOUT
              errorMessage = 'Location request timed out. Please try again or search manually.';
              break;
            default:
              errorMessage = geoError.message || errorMessage;
          }
        }

        console.warn('[useUserLocation] Geolocation error:', errorMessage, geoError);

        // Fallback: Try IP Geolocation lookup
        try {
          const ipRes = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(5000) });
          if (ipRes.ok) {
            const ipData = await ipRes.json();
            if (ipData.success && ipData.latitude && ipData.longitude) {
              const lat = ipData.latitude;
              const lon = ipData.longitude;
              const locality = ipData.city || 'Local Region';
              const state = ipData.region || 'Tamil Nadu';
              const country = ipData.country || 'India';
              const postalCode = ipData.postal || null;

              const fallbackDetails: LocationDetails = {
                locality,
                district: ipData.region,
                state,
                country,
                postalCode,
                formattedAddress: `${locality}, ${state}, ${country}`,
                displayName: `${locality}, ${state}, ${country}`,
                coordinates: { lat, lon },
                source: 'ip',
                timestamp: Date.now()
              };

              setCoordinates({ lat, lon });
              setLocationDetails(fallbackDetails);
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackDetails));
              } catch {}

              // Keep informative notice in error state if user denied GPS
              if (geoError?.code === 1) {
                setError('GPS permission denied. Using approximate regional location.');
              } else {
                setError(null);
              }

              setLoading(false);
              return fallbackDetails;
            }
          }
        } catch (ipErr) {
          console.warn('[useUserLocation] IP fallback error:', ipErr);
        }

        setError(errorMessage);
        setLoading(false);
        return null;
      }
    },
    []
  );

  // Auto-detect on initial mount if no valid location exists
  useEffect(() => {
    if (!locationDetails) {
      detectLocation(false);
    }
  }, [detectLocation, locationDetails]);

  return {
    coordinates,
    locationDetails,
    loading,
    error,
    detectLocation,
    clearError,
    setManualLocation
  };
}
