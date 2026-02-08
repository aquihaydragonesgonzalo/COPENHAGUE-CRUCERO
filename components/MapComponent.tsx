import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, MapPin, X, Save, Search } from 'lucide-react';
import { ItineraryItem, Coordinate, CustomWaypoint } from '../types';
import { WALKING_TRACK_COORDS, WALKING_ROUTE_POIS } from '../constants';

interface MapComponentProps {
    activities: ItineraryItem[];
    userLocation: Coordinate | null;
    focusedLocation: Coordinate | null;
    customWaypoints: CustomWaypoint[];
    onAddWaypoint: (lat: number, lng: number, name: string, description: string) => void;
    onDeleteWaypoint: (id: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
    activities, 
    userLocation, 
    focusedLocation,
    customWaypoints,
    onAddWaypoint
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const tileLayerRef = useRef<L.TileLayer | null>(null);
    const searchMarkerRef = useRef<L.Marker | null>(null);

    const [mapType, setMapType] = useState<'street' | 'satellite'>('street');
    const [isAddMode, setIsAddMode] = useState(false);
    
    // Estados para búsqueda
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Estado para el Modal de creación
    const [showAddModal, setShowAddModal] = useState(false);
    const [tempCoords, setTempCoords] = useState<L.LatLng | null>(null);
    const [newWpName, setNewWpName] = useState('');
    const [newWpDesc, setNewWpDesc] = useState('');
    
    // Referencia para usar en el listener del mapa sin problemas de closure
    const isAddModeRef = useRef(isAddMode);
    useEffect(() => {
        isAddModeRef.current = isAddMode;
    }, [isAddMode]);

    // Inicializar Mapa
    useEffect(() => {
        if(!mapRef.current) return;
        
        if(!mapInstance.current) {
            const map = L.map(mapRef.current, { zoomControl: false }).setView([55.68, 12.58], 14);
            mapInstance.current = map;

            // Click listener para añadir puntos
            map.on('click', (e) => {
                if (isAddModeRef.current) {
                    setTempCoords(e.latlng);
                    setNewWpName('');
                    setNewWpDesc('');
                    setShowAddModal(true);
                    setIsAddMode(false); // Salir del modo "añadir" al capturar el punto
                }
            });
        }
    }, []); // Run once on mount

    // Gestionar cambio de capa (Street vs Satellite)
    useEffect(() => {
        if(!mapInstance.current) return;
        const map = mapInstance.current;

        if(tileLayerRef.current) {
            map.removeLayer(tileLayerRef.current);
        }

        const streetUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
        const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        
        const url = mapType === 'street' ? streetUrl : satelliteUrl;
        const attribution = mapType === 'street' 
            ? '&copy; OpenStreetMap &copy; CARTO' 
            : 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

        tileLayerRef.current = L.tileLayer(url, {
            attribution,
            maxZoom: 19
        }).addTo(map);

        tileLayerRef.current.bringToBack();

    }, [mapType]);

    // Gestionar Marcadores y Rutas
    useEffect(() => {
        if(!mapInstance.current) return;
        const map = mapInstance.current;

        const pinIcon = L.divIcon({
            className: 'custom-pin',
            html: '<div style="background-color:#0ea5e9;width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.3);"></div>',
            iconSize: [12, 12]
        });
        
        const customWPIcon = L.divIcon({
            className: 'wp-pin',
            html: '<div style="background-color:#f59e0b;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 5px rgba(0,0,0,0.4);"></div>',
            iconSize: [14, 14]
        });

        // Limpiar capas excepto el mapa base y el marcador de búsqueda
        map.eachLayer((layer) => {
            if((layer instanceof L.Marker || layer instanceof L.Polyline) && layer !== searchMarkerRef.current) {
                map.removeLayer(layer);
            }
        });

        if(WALKING_TRACK_COORDS && WALKING_TRACK_COORDS.length > 0) {
            L.polyline(WALKING_TRACK_COORDS, {
                color: '#ef4444',
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 5',
                lineCap: 'round'
            }).addTo(map);
        }

        const poiIcon = L.divIcon({
            className: 'poi-pin',
            html: '<div style="background-color:#8b5cf6;width:10px;height:10px;border-radius:50%;border:1px solid white;box-shadow:0 0 4px rgba(0,0,0,0.3);"></div>',
            iconSize: [10, 10]
        });

        WALKING_ROUTE_POIS.forEach(poi => {
            if (poi.lat !== 0 && poi.lng !== 0) {
                L.marker([poi.lat, poi.lng], { icon: poiIcon })
                    .addTo(map)
                    .bindPopup(`<span class="font-bold text-purple-700">${poi.name}</span>`);
            }
        });

        activities.forEach(act => {
            L.marker([act.coords.lat, act.coords.lng], { icon: pinIcon }).addTo(map).bindPopup(act.title);
            if(act.endCoords) {
                    L.marker([act.endCoords.lat, act.endCoords.lng], { icon: pinIcon }).addTo(map);
                    L.polyline([[act.coords.lat, act.coords.lng], [act.endCoords.lat, act.endCoords.lng]], {
                        color: '#38bdf8', weight: 3, dashArray: '5, 10'
                    }).addTo(map);
            }
        });
        
        // Renderizar Custom Waypoints
        customWaypoints.forEach(wp => {
             L.marker([wp.lat, wp.lng], { icon: customWPIcon })
                .addTo(map)
                .bindPopup(`
                    <div class="text-center min-w-[150px]">
                        <span class="font-bold text-amber-600 block text-sm mb-1">${wp.name}</span>
                        ${wp.description ? `<p class="text-xs text-gray-600 mb-2 italic border-b pb-1">${wp.description}</p>` : ''}
                        <button onclick="window.cphDeleteWaypoint('${wp.id}')" class="text-[10px] uppercase font-bold bg-red-50 text-red-600 px-2 py-1 rounded border border-red-100 hover:bg-red-100 transition-colors">
                            Eliminar
                        </button>
                    </div>
                `);
        });

        if(userLocation) {
            const userIcon = L.divIcon({
                className: 'user-pin',
                html: '<div style="background-color:#3A7D44;width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 0 10px rgba(0,0,0,0.5);"></div>',
                iconSize: [16, 16]
            });
            L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 1000 }).addTo(map);
        }

        if(focusedLocation) {
            map.flyTo([focusedLocation.lat, focusedLocation.lng], 16);
        }

    }, [activities, userLocation, focusedLocation, customWaypoints]);

    const handleSaveWaypoint = () => {
        if (newWpName && newWpName.trim() && tempCoords) {
            onAddWaypoint(tempCoords.lat, tempCoords.lng, newWpName.trim(), newWpDesc.trim());
            setShowAddModal(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setSearchResults([]);

        try {
            // Buscamos en OpenStreetMap limitando a Dinamarca para mejorar relevancia
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=dk&limit=5&addressdetails=1`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error buscando:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectResult = (result: any) => {
        if (!mapInstance.current) return;

        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        const displayName = result.display_name.split(',')[0]; // Tomar solo la primera parte del nombre

        // Mover mapa
        mapInstance.current.flyTo([lat, lng], 16);

        // Limpiar marcador de búsqueda anterior
        if (searchMarkerRef.current) {
            mapInstance.current.removeLayer(searchMarkerRef.current);
        }

        // Crear icono distintivo para búsqueda (Rojo grande)
        const searchIcon = L.divIcon({
            className: 'search-pin',
            html: '<div style="background-color:#ef4444;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 2px 5px rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center;"><div style="width:6px; height:6px; background:white; border-radius:50%;"></div></div>',
            iconSize: [20, 20],
            popupAnchor: [0, -10]
        });

        // Añadir nuevo marcador
        const marker = L.marker([lat, lng], { icon: searchIcon })
            .addTo(mapInstance.current)
            .bindPopup(`<div class="text-center font-bold text-red-600">${displayName}</div>`)
            .openPopup();
        
        searchMarkerRef.current = marker;

        // Limpiar UI
        setSearchResults([]);
        setSearchQuery('');
    };

    return (
        <div className={`relative w-full h-full ${isAddMode ? 'cursor-crosshair' : ''}`}>
            <div ref={mapRef} className="w-full h-full z-0" />
            
            {/* Barra de Búsqueda */}
            <div className="absolute top-4 left-4 right-16 z-[400] max-w-sm">
                <form onSubmit={handleSearch} className="relative shadow-lg rounded-xl">
                    <input 
                        type="text" 
                        placeholder="Buscar lugar en Copenhague..." 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/95 backdrop-blur text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    {searchQuery && (
                        <button 
                            type="button" 
                            onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                            <X size={18} />
                        </button>
                    )}
                </form>

                {/* Resultados de búsqueda */}
                {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden max-h-60 overflow-y-auto">
                        {searchResults.map((result, idx) => (
                            <button 
                                key={idx}
                                onClick={() => handleSelectResult(result)}
                                className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 text-sm flex items-start"
                            >
                                <MapPin size={16} className="mt-0.5 mr-2 text-slate-400 shrink-0" />
                                <span className="line-clamp-2">{result.display_name}</span>
                            </button>
                        ))}
                    </div>
                )}
                
                {isSearching && searchResults.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white p-3 rounded-xl shadow text-center text-xs text-slate-500">
                        Buscando...
                    </div>
                )}
            </div>

            {/* Controles del Mapa */}
            <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
                <button 
                    onClick={() => setMapType(prev => prev === 'street' ? 'satellite' : 'street')}
                    className="bg-white p-2.5 rounded-xl shadow-lg border border-slate-200 text-fjord-700 hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center w-10 h-10"
                    title="Cambiar tipo de mapa"
                >
                    <Layers size={20} />
                </button>
                <button 
                    onClick={() => setIsAddMode(prev => !prev)}
                    className={`p-2.5 rounded-xl shadow-lg border transition-all flex items-center justify-center w-10 h-10 ${isAddMode ? 'bg-amber-500 text-white border-amber-600' : 'bg-white border-slate-200 text-amber-600'}`}
                    title="Añadir Marcador"
                >
                    <MapPin size={20} className={isAddMode ? 'fill-current' : ''} />
                    {isAddMode && <div className="absolute right-12 bg-amber-500 text-white text-xs px-2 py-1 rounded font-bold whitespace-nowrap shadow-md">Pulsa en el mapa</div>}
                </button>
            </div>

            {/* Modal para añadir Waypoint */}
            {showAddModal && (
                <div className="absolute inset-0 z-[1000] bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform scale-100">
                        <div className="bg-amber-500 px-4 py-3 flex justify-between items-center text-white">
                            <h3 className="font-bold flex items-center"><MapPin className="mr-2 fill-current" size={18}/> Nuevo Punto</h3>
                            <button onClick={() => setShowAddModal(false)}><X size={20} /></button>
                        </div>
                        <div className="p-4 space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre</label>
                                <input 
                                    autoFocus
                                    type="text" 
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                    placeholder="Ej: Restaurante, Baño, Foto..."
                                    value={newWpName}
                                    onChange={(e) => setNewWpName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descripción (Opcional)</label>
                                <textarea 
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                                    rows={3}
                                    placeholder="Detalles adicionales..."
                                    value={newWpDesc}
                                    onChange={(e) => setNewWpDesc(e.target.value)}
                                />
                            </div>
                            <button 
                                onClick={handleSaveWaypoint}
                                disabled={!newWpName.trim()}
                                className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl flex items-center justify-center hover:bg-amber-600 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 mt-2"
                            >
                                <Save size={18} className="mr-2" /> Guardar Marcador
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapComponent;