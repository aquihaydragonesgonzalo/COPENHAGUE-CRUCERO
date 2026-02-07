import React, { useState, useEffect } from 'react';
import { Anchor, CalendarClock, Map as MapIcon, Wallet, BookOpen } from 'lucide-react';
import Timeline from './components/Timeline';
import MapComponent from './components/MapComponent';
import Budget from './components/Budget';
import Guide from './components/Guide';
import { INITIAL_ITINERARY, SHIP_DEPARTURE_TIME, SHIP_ONBOARD_TIME, STORAGE_KEY, CUSTOM_WAYPOINTS_KEY } from './constants';
import { ItineraryItem, Coordinate, CustomWaypoint } from './types';

// Definir tipo global para la función de borrado
declare global {
    interface Window {
        cphDeleteWaypoint: (id: string) => void;
    }
}

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('timeline');
    const [itinerary, setItinerary] = useState<ItineraryItem[]>(INITIAL_ITINERARY);
    const [userLocation, setUserLocation] = useState<Coordinate | null>(null);
    const [mapFocus, setMapFocus] = useState<Coordinate | null>(null);
    const [countdown, setCountdown] = useState('');
    const [customWaypoints, setCustomWaypoints] = useState<CustomWaypoint[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if(saved) {
            try {
                const parsed = JSON.parse(saved);
                const merged = INITIAL_ITINERARY.map(init => {
                    const s = parsed.find((p: ItineraryItem) => p.id === init.id);
                    return s ? { ...init, completed: s.completed } : init;
                });
                setItinerary(merged);
            } catch (e) {
                console.error("Failed to parse saved itinerary", e);
            }
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ITINERARY));
        }

        const savedWaypoints = localStorage.getItem(CUSTOM_WAYPOINTS_KEY);
        if (savedWaypoints) {
            try {
                setCustomWaypoints(JSON.parse(savedWaypoints));
            } catch (e) { console.error("Error loading waypoints", e); }
        }
    }, []);

    useEffect(() => {
        if('geolocation' in navigator) {
            navigator.geolocation.watchPosition(
                (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                null, { enableHighAccuracy: true }
            );
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            
            const [arrH, arrM] = "08:00".split(':').map(Number);
            const arrivalTime = new Date();
            arrivalTime.setHours(arrH, arrM, 0);

            if(now < arrivalTime) {
                    const diff = arrivalTime.getTime() - now.getTime();
                    const hh = Math.floor(diff / 3600000);
                    const mm = Math.floor((diff % 3600000) / 60000);
                    setCountdown(`Llegada en: ${hh}h ${mm}m`);
            } else {
                const [h, m] = SHIP_ONBOARD_TIME.split(':').map(Number);
                const target = new Date();
                target.setHours(h, m, 0);
                
                const diff = target.getTime() - now.getTime();
                if(diff < 0) setCountdown("¡A BORDO!");
                else {
                    const hh = Math.floor(diff / 3600000);
                    const mm = Math.floor((diff % 3600000) / 60000);
                    const ss = Math.floor((diff % 60000) / 1000);
                    setCountdown(`${hh}h ${mm}m ${ss}s`);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleComplete = (id: string) => {
        const next = itinerary.map(a => a.id === id ? { ...a, completed: !a.completed } : a);
        setItinerary(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    };

    const handleLocate = (coords: Coordinate) => {
        setMapFocus(coords);
        setActiveTab('map');
    };

    const handleAddWaypoint = (lat: number, lng: number, name: string, description: string) => {
        const newWp: CustomWaypoint = {
            id: Date.now().toString(),
            name,
            description,
            lat,
            lng,
            created: Date.now()
        };
        const updated = [...customWaypoints, newWp];
        setCustomWaypoints(updated);
        localStorage.setItem(CUSTOM_WAYPOINTS_KEY, JSON.stringify(updated));
    };

    const handleDeleteWaypoint = (id: string) => {
        const updated = customWaypoints.filter(wp => wp.id !== id);
        setCustomWaypoints(updated);
        localStorage.setItem(CUSTOM_WAYPOINTS_KEY, JSON.stringify(updated));
    };

    // Exponer la función de borrado globalmente para que Leaflet (HTML string) pueda acceder
    useEffect(() => {
        window.cphDeleteWaypoint = handleDeleteWaypoint;
    }, [customWaypoints]);

    return (
        <div className="flex flex-col h-full bg-slate-50 font-sans">
            <header className="bg-fjord-900 text-white p-3 shadow-md z-20 flex justify-between items-center shrink-0">
                <div className="flex items-center">
                    <Anchor className="mr-2 text-sunset-500" size={20} />
                    <div>
                        <h1 className="font-bold text-sm leading-none text-sunset-500 uppercase tracking-wider">Todos a Bordo: {SHIP_ONBOARD_TIME}</h1>
                        <p className="text-[10px] text-fjord-200">Salida: {SHIP_DEPARTURE_TIME}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xl font-mono font-bold text-white tabular-nums">{countdown}</div>
                </div>
            </header>

            <main className="flex-1 overflow-hidden relative">
                {activeTab === 'timeline' && <Timeline itinerary={itinerary} onToggleComplete={toggleComplete} onLocate={handleLocate} userLocation={userLocation} />}
                {activeTab === 'map' && 
                    <MapComponent 
                        activities={itinerary} 
                        userLocation={userLocation} 
                        focusedLocation={mapFocus}
                        customWaypoints={customWaypoints}
                        onAddWaypoint={handleAddWaypoint}
                        onDeleteWaypoint={handleDeleteWaypoint}
                    />
                }
                {activeTab === 'budget' && <Budget itinerary={itinerary} />}
                {activeTab === 'guide' && <Guide userLocation={userLocation} itinerary={itinerary} />}
            </main>

            <nav className="bg-white border-t border-slate-200 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-30 pb-safe shrink-0">
                <div className="flex justify-around items-center h-16">
                    {[
                        { id: 'timeline', icon: CalendarClock, label: 'Itinerario' },
                        { id: 'map', icon: MapIcon, label: 'Mapa' },
                        { id: 'budget', icon: Wallet, label: 'Gastos' },
                        { id: 'guide', icon: BookOpen, label: 'Guía' }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center w-full h-full justify-center transition-colors ${activeTab === tab.id ? 'text-fjord-600' : 'text-slate-400'}`}
                        >
                            <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                            <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default App;