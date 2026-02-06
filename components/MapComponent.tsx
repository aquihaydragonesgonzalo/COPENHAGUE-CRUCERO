import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, MapPin } from 'lucide-react';
import { ItineraryItem, Coordinate, CustomWaypoint } from '../types';
import { WALKING_TRACK_COORDS, WALKING_ROUTE_POIS } from '../constants';

interface MapComponentProps {
    activities: ItineraryItem[];
    userLocation: Coordinate | null;
    focusedLocation: Coordinate | null;
    customWaypoints: CustomWaypoint[];
    onAddWaypoint: (lat: number, lng: number, name: string) => void;
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
    const [mapType, setMapType] = useState<'street' | 'satellite'>('street');
    const [isAddMode, setIsAddMode] = useState(false);
    
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
                    const name = prompt("Nombre del punto de interés:");
                    if (name && name.trim()) {
                        onAddWaypoint(e.latlng.lat, e.latlng.lng, name.trim());
                        setIsAddMode(false); // Desactivar modo añadir tras crear
                    }
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

        // Limpiar capas excepto el mapa base
        map.eachLayer((layer) => {
            if(layer instanceof L.Marker || layer instanceof L.Polyline) map.removeLayer(layer);
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
                    <div class="text-center">
                        <span class="font-bold text-amber-600 block mb-2">${wp.name}</span>
                        <button onclick="window.cphDeleteWaypoint('${wp.id}')" class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded border border-red-200">
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

    return (
        <div className={`relative w-full h-full ${isAddMode ? 'cursor-crosshair' : ''}`}>
            <div ref={mapRef} className="w-full h-full z-0" />
            
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
        </div>
    );
};

export default MapComponent;