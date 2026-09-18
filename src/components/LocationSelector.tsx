import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Loader2,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Compass,
  Building,
  Globe2
} from 'lucide-react';
import { useUserLocation, LocationDetails } from '../hooks/useUserLocation';
import { searchPlaces, GeocodedPlace } from '../lib/geoService';

interface LocationSelectorProps {
  onLocationChange?: (details: LocationDetails) => void;
  className?: string;
  compact?: boolean;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationChange,
  className = '',
  compact = false
}) => {
  const { coordinates, locationDetails, loading, error, detectLocation, clearError, setManualLocation } =
    useUserLocation();

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodedPlace[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleDetect = async () => {
    const details = await detectLocation(true);
    if (details && onLocationChange) {
      onLocationChange(details);
    }
  };

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return;
    setIsSearching(true);
    try {
      const results = await searchPlaces(searchQuery.trim());
      setSearchResults(results);
    } catch (err) {
      console.warn('Place search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectPlace = (place: GeocodedPlace) => {
    const locality = place.name;
    const district = place.admin2 || undefined;
    const state = place.admin1 || 'Unknown State';
    const country = place.country || 'India';
    const formattedAddress = [locality, district !== locality ? district : null, state, country]
      .filter(Boolean)
      .join(', ');

    const newDetails: LocationDetails = {
      locality,
      district,
      state,
      country,
      formattedAddress,
      displayName: formattedAddress,
      coordinates: {
        lat: place.latitude,
        lon: place.longitude
      },
      source: 'manual',
      timestamp: Date.now()
    };

    setManualLocation(newDetails);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    if (onLocationChange) {
      onLocationChange(newDetails);
    }
  };

  if (compact) {
    return (
      <div className={`relative inline-flex items-center gap-2 ${className}`}>
        {loading ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
            <span>Fetching precise GPS...</span>
          </div>
        ) : locationDetails ? (
          <button
            type="button"
            onClick={handleDetect}
            title="Click to refresh high-accuracy GPS coordinates"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate max-w-[180px] sm:max-w-[240px]">
              {locationDetails.locality}, {locationDetails.state}
            </span>
            <RefreshCw className="w-3 h-3 text-slate-400 ml-0.5 hover:rotate-180 transition-transform" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleDetect}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Detect My Location</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl bg-white border border-emerald-100/90 shadow-sm p-4 sm:p-5 transition-all ${className}`}
    >
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">User Geolocation & Administrative Settlement</h3>
            <p className="text-[11px] text-slate-500 font-medium">Granular Country, State, District & Village level GPS</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 text-slate-600 hover:text-emerald-800 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isSearchOpen ? 'Hide Search' : 'Manual Search'}</span>
          </button>

          <button
            type="button"
            onClick={handleDetect}
            disabled={loading}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Navigation className="w-3.5 h-3.5" />
            )}
            <span>{loading ? 'Detecting...' : 'Detect GPS'}</span>
          </button>
        </div>
      </div>

      {/* Error Alert Box */}
      {error && (
        <div className="mb-3.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start justify-between gap-2 text-xs">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Location Notice</span>
              <span>{error}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDetect}
              className="text-[11px] font-bold text-amber-800 underline hover:text-amber-900 cursor-pointer"
            >
              Retry
            </button>
            <button
              type="button"
              onClick={clearError}
              className="text-amber-600 hover:text-amber-900 cursor-pointer p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Loading Banner */}
      {loading && (
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-3 text-emerald-900">
          <Loader2 className="w-5 h-5 animate-spin text-emerald-600 shrink-0" />
          <div className="text-xs">
            <span className="font-bold block">Querying High-Accuracy GPS Sensor...</span>
            <span className="text-emerald-700">Resolving granular administrative settlement via OpenStreetMap Nominatim.</span>
          </div>
        </div>
      )}

      {/* Success State: Granular Settlement Badges */}
      {!loading && locationDetails && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-black text-slate-900">{locationDetails.formattedAddress}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Source: {locationDetails.source.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Village / Locality
              </span>
              <span className="font-bold text-slate-800 flex items-center gap-1 truncate">
                <Building className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {locationDetails.locality}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                District / County
              </span>
              <span className="font-bold text-slate-800 flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                {locationDetails.district || locationDetails.locality}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                State / Province
              </span>
              <span className="font-bold text-slate-800 flex items-center gap-1 truncate">
                <Globe2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                {locationDetails.state}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Exact Coordinates
              </span>
              <span className="font-mono font-bold text-slate-700 text-[11px] truncate block">
                {locationDetails.coordinates.lat.toFixed(4)}, {locationDetails.coordinates.lon.toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Manual Search Form Card */}
      {isSearchOpen && (
        <div className="mt-3 p-3.5 rounded-xl bg-slate-900 text-white space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">Search Any Village, Town, Taluk or City</span>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleManualSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type village, town, district (e.g. Hosur, Perambalur)..."
                className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:border-emerald-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
            >
              {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Search'}
            </button>
          </form>

          {/* Results List */}
          {searchResults.length > 0 && (
            <div className="max-h-40 overflow-y-auto divide-y divide-slate-800 rounded-lg bg-slate-950 border border-slate-800">
              {searchResults.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleSelectPlace(r)}
                  className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:bg-slate-800 hover:text-emerald-300 flex items-center justify-between cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-bold text-white block truncate">{r.name}</span>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {[r.admin2, r.admin1, r.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    {r.latitude.toFixed(2)}, {r.longitude.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
