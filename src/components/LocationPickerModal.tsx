import React, { useState, useEffect } from 'react';
import { X, MapPin, Search, Navigation, Loader2, Check, Sparkles } from 'lucide-react';
import { SupportedLang, TRANSLATIONS } from '../lib/i18n';
import { detectUserLocation, searchPlaces, GeocodedPlace } from '../lib/geoService';

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocationName: string;
  currentLat: number;
  currentLng: number;
  onSelectLocation: (locationName: string, lat: number, lng: number) => void;
  lang: SupportedLang;
}

const POPULAR_LOCATIONS = [
  { name: 'Hosur, Tamil Nadu', lat: 12.7365, lng: 77.8326 },
  { name: 'Chennai, Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { name: 'Coimbatore, Tamil Nadu', lat: 11.0168, lng: 76.9558 },
  { name: 'Madurai, Tamil Nadu', lat: 9.9252, lng: 78.1198 },
  { name: 'Tiruchirappalli, Tamil Nadu', lat: 10.7905, lng: 78.7047 },
  { name: 'Salem, Tamil Nadu', lat: 11.6643, lng: 78.1460 },
  { name: 'Erode, Tamil Nadu', lat: 11.3410, lng: 77.7172 },
  { name: 'Thanjavur, Tamil Nadu', lat: 10.7870, lng: 79.1378 },
  { name: 'Kanchipuram, Tamil Nadu', lat: 12.8351, lng: 79.7001 },
  { name: 'Vellore, Tamil Nadu', lat: 12.9165, lng: 79.1325 },
  { name: 'Dindigul, Tamil Nadu', lat: 10.3673, lng: 77.9803 },
  { name: 'Tirunelveli, Tamil Nadu', lat: 8.7139, lng: 77.7567 },
  { name: 'Bengaluru, Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad, Telangana', lat: 17.3850, lng: 78.4867 }
];

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  currentLocationName,
  currentLat,
  currentLng,
  onSelectLocation,
  lang
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [results, setResults] = useState<GeocodedPlace[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setErrorMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!query.trim() || query.trim().length < 2) return;
    setIsSearching(true);
    setErrorMsg(null);
    try {
      const places = await searchPlaces(query.trim());
      setResults(places);
      if (places.length === 0) {
        setErrorMsg(`No locations found for "${query}". Try searching district or nearby town.`);
      }
    } catch (err) {
      setErrorMsg('Failed to search locations. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }

  async function handleLiveGps() {
    setIsDetectingGps(true);
    setErrorMsg(null);
    try {
      const loc = await detectUserLocation(true);
      if (loc && loc.lat && loc.lng) {
        onSelectLocation(loc.locationName, loc.lat, loc.lng);
        onClose();
      } else {
        setErrorMsg('Could not detect GPS location. Please choose from the list or search.');
      }
    } catch (err) {
      setErrorMsg('GPS detection failed. Please ensure location permissions are enabled.');
    } finally {
      setIsDetectingGps(false);
    }
  }

  function handleSelect(place: GeocodedPlace) {
    const locName = place.admin1
      ? `${place.name}, ${place.admin1}, ${place.country || 'India'}`
      : `${place.name}, ${place.country || 'India'}`;
    onSelectLocation(locName, place.latitude, place.longitude);
    onClose();
  }

  function handleSelectPreset(preset: typeof POPULAR_LOCATIONS[0]) {
    onSelectLocation(preset.name, preset.lat, preset.lng);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-white border border-emerald-100 shadow-2xl p-5 sm:p-6 relative text-slate-900 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-800">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">Set Exact Farm Location</h2>
            <p className="text-xs text-slate-500">Auto-detect GPS coordinates or search your village/district</p>
          </div>
        </div>

        {/* Active Current Location Badge */}
        <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">Current Location</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">{currentLocationName}</span>
            <span className="text-[10px] font-mono text-slate-500">[{currentLat.toFixed(4)}, {currentLng.toFixed(4)}]</span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold shrink-0 flex items-center gap-1">
            <Check className="w-3 h-3" /> Active
          </span>
        </div>

        {/* Primary Action: High-Accuracy GPS Auto-Detection */}
        <button
          type="button"
          onClick={handleLiveGps}
          disabled={isDetectingGps}
          className="w-full mb-5 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer transition-all active:scale-98"
        >
          {isDetectingGps ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4 text-amber-300" />
          )}
          <span>{isDetectingGps ? 'Detecting Live GPS Coordinates...' : '📍 Auto-Detect My Live GPS Location'}</span>
        </button>

        {/* Divider */}
        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-slate-400 text-xs font-semibold uppercase tracking-wider">or search place</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search town, district, village (e.g. Hosur, Salem)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:border-emerald-500 focus:bg-white outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
          >
            {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Search'}
          </button>
        </form>

        {errorMsg && (
          <div className="mb-3 text-xs text-rose-600 font-medium bg-rose-50 p-2.5 rounded-lg border border-rose-200">
            {errorMsg}
          </div>
        )}

        {/* Search Results */}
        {results.length > 0 && (
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Search Results</span>
            <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
              {results.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleSelect(r)}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-emerald-50 hover:text-emerald-900 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-bold text-slate-800 block truncate">{r.name}</span>
                    <span className="text-[11px] text-slate-500 truncate block">
                      {[r.admin2, r.admin1, r.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {r.latitude.toFixed(2)}, {r.longitude.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Region Presets */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Quick Select Region</span>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
            {POPULAR_LOCATIONS.map((preset) => {
              const isActive = Math.abs(preset.lat - currentLat) < 0.05 && Math.abs(preset.lng - currentLng) < 0.05;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all active:scale-95 ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
