import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers } from 'lucide-react';
import { ItineraryItem, Coordinate } from '../types';
import { WALKING_TRACK_COORDS, WALKING_ROUTE_POIS } from '../constants';

interface MapComponentProps {
    activities: ItineraryItem[];
    userLocation: Coordinate | null;
    focusedLocation: Coordinate | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ activities, userLocation, focusedLocation }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const tileLayerRef = useRef<L.TileLayer | null>(null);
    const [mapType, setMapType] = useState<'street' | 'satellite'>('street');

    // Inicializar Mapa
    useEffect(() => {
        if(!mapRef.current) return;
        
        if(!mapInstance.current) {
            mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView([55.68, 12.58], 14);
        }
    }, []);

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

    }, [activities, userLocation, focusedLocation]);

    return (
        <div className="relative w-full h-full">
            <div ref={mapRef} className="w-full h-full z-0" />
            
            <button 
                onClick={() => setMapType(prev => prev === 'street' ? 'satellite' : 'street')}
                className="absolute top-4 right-4 z-[400] bg-white p-2.5 rounded-xl shadow-lg border border-slate-200 text-fjord-700 hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-2"
                title="Cambiar tipo de mapa"
            >
                <Layers size={20} />
                <span className="text-xs font-bold">{mapType === 'street' ? 'Satélite' : 'Mapa'}</span>
            </button>
        </div>
    );
};

export default MapComponent;