import React, { useState } from 'react';
import { X, MapPin, Search, Plus, Check } from 'lucide-react';
import { FarmProfile, SoilType } from '../types/agro';
import { SupportedLang, TRANSLATIONS } from '../lib/i18n';

interface FarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveFarm: (farm: FarmProfile) => void;
  lang: SupportedLang;
}

const SOIL_OPTIONS: SoilType[] = [
  'Alluvial',
  'Black (Regur)',
  'Red & Yellow',
  'Laterite',
  'Sandy Loam',
  'Clayey',
  'Loamy',
  'Saline/Alkaline'
];

export const FarmModal: React.FC<FarmModalProps> = ({
  isOpen,
  onClose,
  onSaveFarm,
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [name, setName] = useState('');
  const [locationName, setLocationName] = useState('Ludhiana, Punjab, India');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [lat, setLat] = useState(30.901);
  const [lng, setLng] = useState(75.8573);
  const [soilType, setSoilType] = useState<SoilType>('Alluvial');
  const [areaAcres, setAreaAcres] = useState('10');
  const [irrigationType, setIrrigationType] = useState<'Drip' | 'Sprinkler' | 'Canal/Flood' | 'Rainfed' | 'Pivot'>('Drip');

  if (!isOpen) return null;

  async function handleSearch() {
    if (!searchQuery.trim() || searchQuery.length < 2) return;
    setIsSearching(true);
    try {
      const res = await fetch(`/api/places/search?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data || []);
      }
    } catch (err) {
      console.error('Location search error:', err);
    } finally {
      setIsSearching(false);
    }
  }

  function handleSelectPlace(p: any) {
    const loc = `${p.name}${p.admin1 ? ', ' + p.admin1 : ''}, ${p.country}`;
    setLocationName(loc);
    setLat(p.latitude);
    setLng(p.longitude);
    setSearchResults([]);
    setSearchQuery('');
    if (!name) {
      setName(`${p.name} Agri Farm`);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    const newFarm: FarmProfile = {
      id: 'farm-' + Date.now(),
      name: name.trim(),
      locationName: locationName || 'Custom Location',
      lat: Number(lat),
      lng: Number(lng),
      soilType,
      areaAcres: Math.max(0.5, Number(areaAcres) || 5),
      altitudeMeters: 250,
      irrigationType,
      createdAt: new Date().toISOString(),
      boundaryGeoJSON: [
        [lat, lng],
        [lat + 0.003, lng + 0.003],
        [lat + 0.001, lng + 0.005],
        [lat - 0.002, lng + 0.002]
      ]
    };

    onSaveFarm(newFarm);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">{t.addFarm || 'Add Farm'}</h2>
            <p className="text-xs text-slate-400">{t.registerNewPlot || 'Register a new micro-climate agricultural plot'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.farmName || 'Farm Name'}
            </label>
            <input
              type="text"
              required
              placeholder={t.farmNamePlaceholder || 'e.g. Sunrise Organic Fields'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.farmLocation} (GPS)
            </label>
            <div className="flex gap-2 mb-1.5">
              <input
                type="text"
                placeholder={t.searchLocationPlaceholder || 'Search city, district, or village...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch(); } }}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:border-emerald-500 outline-none"
              />
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                {isSearching ? (t.searching || 'Searching...') : (t.search || 'Search')}
              </button>
            </div>

            {/* Search dropdown results */}
            {searchResults.length > 0 && (
              <div className="p-1 rounded-lg bg-slate-950 border border-slate-800 max-h-40 overflow-y-auto divide-y divide-slate-900 mb-2">
                {searchResults.map((r, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectPlace(r)}
                    className="w-full px-2.5 py-1.5 text-left text-xs text-slate-300 hover:bg-slate-800/80 hover:text-emerald-300 rounded flex items-center justify-between"
                  >
                    <span className="truncate">{r.name}, {r.admin1} ({r.country})</span>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">{r.latitude.toFixed(2)}, {r.longitude.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate font-medium text-slate-300">{locationName}</span>
              <span className="text-[10px] font-mono text-slate-500 ml-auto shrink-0">[{lat.toFixed(3)}, {lng.toFixed(3)}]</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.soilType}
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value as SoilType)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none cursor-pointer"
              >
                {SOIL_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.farmSize || 'Farm Size'} ({t.acres})
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={areaAcres}
                onChange={(e) => setAreaAcres(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.irrigationInfrastructure || 'Irrigation Infrastructure'}
            </label>
            <select
              value={irrigationType}
              onChange={(e) => setIrrigationType(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 outline-none cursor-pointer"
            >
              <option value="Drip">{t.irrigationDrip || 'Drip Fertigation (Micro-Irrigation)'}</option>
              <option value="Sprinkler">{t.irrigationSprinkler || 'Overhead Sprinkler System'}</option>
              <option value="Canal/Flood">{t.irrigationFlood || 'Canal / Surface Flood Irrigation'}</option>
              <option value="Pivot">{t.irrigationPivot || 'Center Pivot System'}</option>
              <option value="Rainfed">{t.irrigationRainfed || 'Rainfed (Dryland Agriculture)'}</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              {t.cancel || 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              {t.saveFarmRecord || 'Save Farm Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
