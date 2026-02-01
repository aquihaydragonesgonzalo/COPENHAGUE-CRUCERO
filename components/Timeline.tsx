import React, { useState } from 'react';
import { 
    Clock, MapPin, Map as MapIcon, Ticket, Headphones, Play, Square,
    CheckCircle2, Circle, AlertTriangle, Instagram
} from 'lucide-react';
import { ItineraryItem, Coordinate } from '../types';
import { AUDIO_PLAYLISTS } from '../constants';
import { calculateDuration, calculateGap, calculateDistance } from '../utils';
import SharedFooter from './SharedFooter';

interface TimelineProps {
    itinerary: ItineraryItem[];
    onToggleComplete: (id: string) => void;
    onLocate: (coords: Coordinate, endCoords?: Coordinate) => void;
    userLocation: Coordinate | null;
}

const Timeline: React.FC<TimelineProps> = ({ itinerary, onToggleComplete, onLocate, userLocation }) => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeVal = currentHours * 60 + currentMinutes;

    const [selectedActivity, setSelectedActivity] = useState<ItineraryItem | null>(null);
    const [showAudioModal, setShowAudioModal] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState<any[]>([]);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const isCurrent = (act: ItineraryItem) => {
        const [startH, startM] = act.startTime.split(':').map(Number);
        const [endH, endM] = act.endTime.split(':').map(Number);
        const startVal = startH * 60 + startM;
        const endVal = endH * 60 + endM;
        return currentTimeVal >= startVal && currentTimeVal < endVal;
    };

    const getProgress = (act: ItineraryItem) => {
        if (!isCurrent(act)) return 0;
        const [startH, startM] = act.startTime.split(':').map(Number);
        const [endH, endM] = act.endTime.split(':').map(Number);
        const startVal = startH * 60 + startM;
        const endVal = endH * 60 + endM;
        const total = endVal - startVal;
        const elapsed = currentTimeVal - startVal;
        return Math.min(100, Math.max(0, (elapsed / total) * 100));
    };

    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            utterance.rate = 1.0;
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    return (
        <div className="pb-32 px-4 pt-4 max-w-lg mx-auto h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-fjord-500 mb-6">Itinerario Domingo</h2>
            
            <div className="relative border-l-2 border-fjord-200 ml-3">
                {itinerary.map((act, index) => {
                    const active = isCurrent(act);
                    const progress = getProgress(act);
                    const prevAct = index > 0 ? itinerary[index - 1] : null;
                    const gap = prevAct ? calculateGap(prevAct.endTime, act.startTime) : 0;
                    
                    let distStr = "";
                    if (userLocation) {
                        const dist = calculateDistance(userLocation, act.coords);
                        distStr = dist > 1000 ? `a ${(dist/1000).toFixed(1)} km` : `a ${Math.round(dist)} m`;
                    }

                    return (
                        <div key={act.id}>
                            {gap > 0 && (
                                <div className="ml-6 mb-6 flex items-center justify-center">
                                    <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-full border border-slate-200 flex items-center shadow-sm">
                                        <Clock size={12} className="mr-1" />
                                        ⬇ {gap} min traslado/libre
                                    </span>
                                </div>
                            )}

                            <div className="mb-8 ml-6 relative">
                                <div 
                                    className={`absolute -left-[31px] top-0 rounded-full bg-white border-2 cursor-pointer z-10 transition-all ${
                                        act.completed ? 'border-mountain-500 text-mountain-500' : 
                                        active ? 'border-sunset-500 text-sunset-500 scale-110 shadow-[0_0_10px_rgba(255,179,71,0.5)]' : 'border-fjord-500 text-fjord-500'
                                    }`}
                                    onClick={() => onToggleComplete(act.id)}
                                >
                                    {act.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                </div>

                                <div 
                                    className={`p-4 rounded-xl border shadow-sm transition-all relative overflow-hidden active:scale-[0.99] ${
                                        active ? 'bg-white border-sunset-500 ring-2 ring-sunset-100 shadow-lg' : 
                                        act.completed ? 'bg-emerald-50 border-emerald-200 opacity-80' : 'bg-white border-fjord-100'
                                    }`}
                                    onClick={() => setSelectedActivity(act)}
                                >
                                    {active && (
                                        <div className="absolute top-0 left-0 h-1 bg-sunset-500 transition-all duration-1000" style={{width: `${progress}%`}} />
                                    )}

                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="flex items-center space-x-2 mb-1 flex-wrap gap-y-1">
                                                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${active ? 'bg-sunset-500 text-white' : 'bg-fjord-100 text-fjord-700'}`}>
                                                    {act.startTime} - {act.endTime}
                                                </span>
                                                <span className="text-xs text-slate-500 font-medium bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                                    {calculateDuration(act.startTime, act.endTime)}
                                                </span>
                                                {active && <span className="text-[10px] font-bold text-sunset-600 animate-pulse">⚡ EN CURSO</span>}
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-800 leading-tight">{act.title}</h3>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                                {act.notes === 'CRITICAL' && <AlertTriangle className="text-red-500" size={20} />}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center text-sm text-gray-600 mb-3 gap-2">
                                            <span className="flex items-center truncate max-w-[150px]">
                                                <MapPin size={14} className="mr-1 text-fjord-500"/>
                                                {act.locationName}
                                            </span>
                                            {distStr && <span className="text-xs text-fjord-600 font-bold bg-fjord-50 px-1.5 py-0.5 rounded border border-fjord-100">{distStr}</span>}
                                    </div>

                                    <div className="bg-slate-50 p-3 rounded text-sm text-slate-700 italic border-l-4 border-sunset-500 mb-3">
                                        "{act.keyDetails}"
                                    </div>

                                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                                            <button 
                                            onClick={(e) => { e.stopPropagation(); onLocate(act.coords, act.endCoords); }}
                                            className="flex items-center text-xs font-medium bg-fjord-50 text-fjord-700 px-3 py-1.5 rounded-lg border border-fjord-200 whitespace-nowrap"
                                            >
                                            <MapPin size={14} className="mr-1" /> Ubicación
                                            </button>
                                            {act.googleMapsUrl && (
                                                <button 
                                                onClick={(e) => { e.stopPropagation(); window.open(act.googleMapsUrl, '_blank'); }}
                                                className="flex items-center text-xs font-medium bg-white text-green-700 px-3 py-1.5 rounded-lg border border-green-200 whitespace-nowrap"
                                                >
                                                <MapIcon size={14} className="mr-1" /> 🗺️ Ver Recorrido
                                                </button>
                                            )}
                                            {act.ticketUrl && (
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); window.open(act.ticketUrl, '_blank'); }}
                                                className="flex items-center text-xs font-medium bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg border border-orange-200 whitespace-nowrap"
                                            >
                                                <Ticket size={14} className="mr-1" /> Tickets
                                            </button>
                                            )}
                                            
                                            {AUDIO_PLAYLISTS[act.id] && (
                                                <button 
                                                onClick={(e) => { 
                                                    e.stopPropagation(); 
                                                    setCurrentPlaylist(AUDIO_PLAYLISTS[act.id]); 
                                                    setShowAudioModal(true); 
                                                }}
                                                className="flex items-center text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-200 whitespace-nowrap shadow-sm"
                                                >
                                                <Headphones size={14} className="mr-1" /> Audioguía
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <SharedFooter />

            {selectedActivity && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedActivity(null)}>
                    <div className="bg-white rounded-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-fjord-800">{selectedActivity.title}</h3>
                            <button onClick={() => setSelectedActivity(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600 leading-relaxed">{selectedActivity.description}</p>
                            
                            <div className="bg-slate-100 p-4 rounded-xl">
                                <p className="font-bold text-sm text-slate-700 mb-2">Detalles Clave:</p>
                                <p className="text-sm text-slate-600">{selectedActivity.keyDetails}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {selectedActivity.ticketUrl && (
                                    <a href={selectedActivity.ticketUrl} target="_blank" className="col-span-2 flex items-center justify-center bg-orange-500 text-white py-3 rounded-xl font-bold shadow-md hover:bg-orange-600">
                                        <Ticket className="mr-2" size={18}/> Comprar Tickets
                                    </a>
                                )}
                                <button onClick={() => { onLocate(selectedActivity.coords); setSelectedActivity(null); }} className="flex items-center justify-center bg-fjord-100 text-fjord-700 py-3 rounded-xl font-bold">
                                    <MapPin className="mr-2" size={18}/> Ver Mapa
                                </button>
                                {selectedActivity.googleMapsUrl && (
                                    <a href={selectedActivity.googleMapsUrl} target="_blank" className="flex items-center justify-center bg-green-100 text-green-700 py-3 rounded-xl font-bold">
                                        <MapIcon className="mr-2" size={18}/> Ruta
                                    </a>
                                )}
                                {selectedActivity.instaTag && (
                                    <a href={selectedActivity.instaTag} target="_blank" className="col-span-2 flex items-center justify-center instagram-gradient text-white py-3 rounded-xl font-bold shadow-md">
                                        <Instagram className="mr-2" size={18}/> Ver en Instagram
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAudioModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center sm:p-4" onClick={() => { setShowAudioModal(false); stopSpeaking(); }}>
                    <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg h-[85vh] sm:h-[80vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300" onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-indigo-50 rounded-t-2xl">
                            <div className="flex items-center text-indigo-800">
                                <Headphones className="mr-2" size={24}/>
                                <h3 className="font-bold text-lg">Audioguía</h3>
                            </div>
                            <button onClick={() => { setShowAudioModal(false); stopSpeaking(); }} className="p-2 bg-white rounded-full text-gray-500 hover:bg-gray-100">✕</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {currentPlaylist && currentPlaylist.length > 0 ? (
                                currentPlaylist.map((track, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <h4 className="font-bold text-indigo-700 mb-2 text-lg">{track.title}</h4>
                                        <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm mb-4">
                                            {track.text}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => speakText(track.text)}
                                                className="flex-1 flex items-center justify-center bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow"
                                            >
                                                <Play size={16} className="mr-2 fill-current"/> Escuchar
                                            </button>
                                            {isSpeaking && (
                                                <button 
                                                    onClick={stopSpeaking}
                                                    className="px-4 bg-red-100 text-red-600 rounded-lg font-bold hover:bg-red-200"
                                                >
                                                    <Square size={16} className="fill-current"/>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 p-8">No hay contenido disponible.</div>
                            )}
                            <div className="h-10"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timeline;