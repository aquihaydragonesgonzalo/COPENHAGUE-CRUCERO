import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
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

    useEffect(() => {
        if(!mapRef.current) return;
        
        if(!mapInstance.current) {
            mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView([55.68, 12.58], 14);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap &copy; CARTO',
                maxZoom: 19
            }).addTo(mapInstance.current);
        }
        const map = mapInstance.current;

        const pinIcon = L.divIcon({
            className: 'custom-pin',
            html: '<div style="background-color:#0ea5e9;width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.3);"></div>',
            iconSize: [12, 12]
        });

        // Clear existing layers to avoid duplication
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

    return <div ref={mapRef} className="w-full h-full z-0" />;
};

export default MapComponent;