import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Map, Layers, MapPin, Activity, Droplets, Sun, Sparkles } from 'lucide-react';
import { FarmProfile } from '../../types/agro';
import { SupportedLang, TRANSLATIONS } from '../../lib/i18n';

interface MapViewProps {
  activeFarm: FarmProfile;
  farms: FarmProfile[];
  onSelectFarm: (farm: FarmProfile) => void;
  lang: SupportedLang;
}

export const MapView: React.FC<MapViewProps> = ({ activeFarm, farms, onSelectFarm, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayerRef = useRef<L.Polygon | null>(null);

  const [mapMode, setMapMode] = useState<'satellite' | 'street'>('satellite');
  const [showSensors, setShowSensors] = useState(true);
  const [showRadar, setShowRadar] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [activeFarm.lat, activeFarm.lng],
        zoom: 15,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    map.setView([activeFarm.lat, activeFarm.lng], 15);

    // Clear previous tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer || layer instanceof L.Polygon || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add Tile Layer
    const tileUrl = mapMode === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution: '© ESRI / OpenStreetMap / AGRO AI'
    }).addTo(map);

    // Draw Farm Polygon Boundary
    const coords: [number, number][] = activeFarm.boundaryGeoJSON || [
      [activeFarm.lat, activeFarm.lng],
      [activeFarm.lat + 0.003, activeFarm.lng + 0.003],
      [activeFarm.lat + 0.001, activeFarm.lng + 0.005],
      [activeFarm.lat - 0.002, activeFarm.lng + 0.002]
    ];

    const poly = L.polygon(coords as any, {
      color: '#10b981',
      fillColor: '#059669',
      fillOpacity: 0.35,
      weight: 2.5,
    }).addTo(map);

    poly.bindPopup(`<b>${activeFarm.name}</b><br/>Area: ${activeFarm.areaAcres} Acres<br/>Soil: ${activeFarm.soilType}`);
    polygonLayerRef.current = poly;

    // Add Soil Sensor Markers
    if (showSensors) {
      const sensor1 = L.marker([activeFarm.lat + 0.001, activeFarm.lng + 0.001]).addTo(map);
      sensor1.bindPopup('<b>Sensor Node #A1</b><br/>Moisture: 32%<br/>EC: 0.85 dS/m<br/>Soil Temp: 24.5°C');

      const sensor2 = L.marker([activeFarm.lat - 0.001, activeFarm.lng + 0.002]).addTo(map);
      sensor2.bindPopup('<b>Sensor Node #A2 (Low Ground)</b><br/>Moisture: 38%<br/>EC: 0.92 dS/m<br/>Soil Temp: 23.8°C');
    }

    return () => {
      // cleanup on unmount
    };
  }, [activeFarm, mapMode, showSensors]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
            GIS Geospatial Boundary & Sensor Hub (Module 10)
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">{t.farmMap} & Spatial Telemetry</h1>
          <p className="text-xs text-slate-400">High-resolution satellite imagery, acreage boundary polygons, and IoT soil probe telemetry</p>
        </div>

        {/* Map Mode Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setMapMode('satellite')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                mapMode === 'satellite' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapMode('street')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                mapMode === 'street' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              Street / Topo
            </button>
          </div>

          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showSensors}
              onChange={(e) => setShowSensors(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-emerald-500"
            />
            <span>IoT Sensors</span>
          </label>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Map Legend Overlay */}
        <div className="absolute top-4 left-4 z-20 p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs text-slate-200 space-y-2 max-w-xs pointer-events-auto">
          <div className="font-bold text-slate-100 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" />
            {activeFarm.name}
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">{activeFarm.locationName}</p>
          <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Area:</span>
              <span className="font-bold text-emerald-400">{activeFarm.areaAcres} Acres</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Soil Profile:</span>
              <span className="font-bold text-slate-200">{activeFarm.soilType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Irrigation:</span>
              <span className="font-bold text-slate-200">{activeFarm.irrigationType}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
