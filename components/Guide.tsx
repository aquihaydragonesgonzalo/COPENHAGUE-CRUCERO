import React, { useState, useEffect } from 'react';
import { 
    AlertTriangle, Anchor, Camera, Thermometer, Sun, Moon, CloudRain, Volume2, Languages 
} from 'lucide-react';
import { Coordinate, HourlyForecast, DailyForecast, WeatherData } from '../types';
import { DANISH_WORDS } from '../constants';
import SharedFooter from './SharedFooter';

interface GuideProps {
    userLocation: Coordinate | null;
}

const Guide: React.FC<GuideProps> = ({ userLocation }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
    const [hourly, setHourly] = useState<HourlyForecast[]>([]);
    const [solar, setSolar] = useState({ sunrise: '05:00', sunset: '21:00' });
    
    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'da-DK';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=55.6761&longitude=12.5683&current=temperature_2m,weather_code&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FBerlin&forecast_days=5')
            .then(res => res.json())
            .then(data => {
                setWeather(data.current);
                if (data.daily.sunrise[0] && data.daily.sunset[0]) {
                    setSolar({ 
                        sunrise: data.daily.sunrise[0].split('T')[1], 
                        sunset: data.daily.sunset[0].split('T')[1] 
                    });
                }
                
                const todayStr = new Date().toISOString().split('T')[0];
                const hours = data.hourly.time
                    .map((t: string, i: number) => ({
                        time: t,
                        temp: data.hourly.temperature_2m[i],
                        rain: data.hourly.precipitation_probability[i],
                        code: data.hourly.weather_code[i]
                    }))
                    .filter((h: any) => h.time.includes(todayStr))
                    .filter((h: any) => {
                        const hr = parseInt(h.time.split('T')[1].split(':')[0]);
                        return hr >= 7 && hr <= 18;
                    });
                setHourly(hours);

                const days = data.daily.time.map((t: string, i: number) => ({
                    date: new Date(t).toLocaleDateString('es-ES', {weekday: 'short'}),
                    max: data.daily.temperature_2m_max[i],
                    min: data.daily.temperature_2m_min[i],
                    code: data.daily.weather_code[i]
                }));
                setForecast(days);
            });
    }, []);

    const getSolarPosition = () => {
        const now = new Date();
        const totalMins = now.getHours() * 60 + now.getMinutes();
        return (totalMins / 1440) * 100;
    };

    const timeToPct = (timeStr: string) => {
        if(!timeStr) return 0;
        const [h, m] = timeStr.split(':').map(Number);
        return ((h * 60 + m) / 1440) * 100;
    };

    const sunrisePct = timeToPct(solar.sunrise);
    const sunsetPct = timeToPct(solar.sunset);

    const dynamicGradient = `linear-gradient(90deg, 
        #1e293b 0%, 
        #1e293b ${Math.max(0, sunrisePct - 3)}%, 
        #f59e0b ${sunrisePct}%, 
        #38bdf8 ${sunrisePct + 3}%, 
        #38bdf8 ${Math.max(0, sunsetPct - 3)}%, 
        #f59e0b ${sunsetPct}%, 
        #1e293b ${Math.min(100, sunsetPct + 3)}%, 
        #1e293b 100%)`;

    const getWeatherIcon = (code: number) => {
        if (code <= 3) return <Sun className="text-yellow-500" />;
        if (code <= 60) return <CloudRain className="text-gray-400" />;
        return <CloudRain className="text-blue-500" />;
    };

    const handleSOS = () => {
        const lat = userLocation?.lat || 0;
        const lng = userLocation?.lng || 0;
        const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
        const msg = `🆘 SOS! Necesito ayuda. Mi ubicación actual en Copenhague es: ${mapLink}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <div className="pb-32 px-4 pt-6 max-w-lg mx-auto h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-fjord-500 mb-6">Guía y Herramientas</h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
                    <button onClick={handleSOS} className="bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center animate-pulse">
                    <AlertTriangle className="mr-2" /> SOS
                    </button>
                    <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.msccruises.mscforme', '_blank')} className="bg-blue-900 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center">
                    <Anchor className="mr-2" /> MSC App
                    </button>
            </div>

            <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg mb-6 flex justify-between items-center cursor-pointer" onClick={() => window.open('https://translate.google.com/?sl=da&tl=es&op=images', '_blank')}>
                    <div>
                    <h3 className="font-bold">Traductor Visual</h3>
                    <p className="text-xs text-indigo-200">Apunta con tu cámara</p>
                    </div>
                    <Camera size={24} />
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-700 flex items-center"><Thermometer className="mr-2" size={18}/> Clima Hoy</h3>
                    {weather && <span className="text-2xl font-bold text-fjord-600">{weather.temperature_2m}°C</span>}
                </div>
                
                <div className="flex overflow-x-auto gap-3 pb-2 mb-4 snap-x">
                    {hourly.map((h, i) => (
                        <div key={i} className="flex-none w-16 bg-slate-50 rounded-lg p-2 text-center border border-slate-100 snap-center">
                            <p className="text-xs text-slate-500 font-bold">{h.time.split('T')[1].slice(0,5)}</p>
                            <div className="my-1 flex justify-center">{getWeatherIcon(h.code)}</div>
                            <p className="text-sm font-bold">{h.temp}°</p>
                            <p className="text-[10px] text-blue-500">{h.rain}% 💧</p>
                        </div>
                    ))}
                </div>

                <div className="relative h-20 w-full rounded-xl border border-slate-200 shadow-inner mb-4 overflow-hidden" style={{ background: dynamicGradient }}>
                        <div className="absolute top-0 bottom-0 w-[1px] bg-white/40" style={{left: `${sunrisePct}%`}}></div>
                        <div className="absolute top-0 bottom-0 w-[1px] bg-white/40" style={{left: `${sunsetPct}%`}}></div>

                        <div className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-20 shadow-[0_0_5px_rgba(220,38,38,0.8)]" style={{left: `${getSolarPosition()}%`}}></div>
                        <div className="absolute top-1 text-[9px] font-black text-white bg-red-600 px-1.5 py-0.5 rounded-full transform -translate-x-1/2 shadow-sm z-30" style={{left: `${getSolarPosition()}%`}}>AHORA</div>

                        <div className="absolute top-2 text-white/90 text-[10px] font-bold transform -translate-x-1/2" style={{left: `${sunrisePct}%`}}>{solar.sunrise}</div>
                        <div className="absolute top-2 text-white/90 text-[10px] font-bold transform -translate-x-1/2" style={{left: `${sunsetPct}%`}}>{solar.sunset}</div>

                        <div className="absolute bottom-1 left-2 text-white/80 text-[10px] font-bold flex items-center"><Moon size={10} className="mr-1"/> Noche</div>
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-white/90 text-[10px] font-bold flex items-center"><Sun size={10} className="mr-1"/> Día</div>
                        <div className="absolute bottom-1 right-2 text-white/80 text-[10px] font-bold flex items-center">Noche <Moon size={10} className="ml-1"/></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono px-1">
                        <span>00:00</span>
                        <span>12:00</span>
                        <span>23:59</span>
                </div>

                    <div className="mt-4 border-t border-slate-100 pt-3">
                    <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">Próximos 5 días</h4>
                    <div className="space-y-2">
                        {forecast && forecast.map((day, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <span className="w-10 font-bold text-slate-600">{day.date}</span>
                                <div className="flex-1 flex justify-center">{getWeatherIcon(day.code)}</div>
                                <span className="text-slate-800 font-medium">{day.max}° / <span className="text-slate-400">{day.min}°</span></span>
                            </div>
                        ))}
                    </div>
                    </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><Languages className="mr-2"/> Diccionario Danés</h3>
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                {DANISH_WORDS.map((item, idx) => (
                <div key={item.word} className={`p-4 flex justify-between items-center ${idx !== DANISH_WORDS.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div>
                        <div className="flex items-baseline space-x-2">
                            <span className="font-bold text-lg text-fjord-600">{item.word}</span>
                            <span className="text-xs text-gray-400 font-mono">{item.phonetic}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-700 mt-1">
                            "{item.simplified}"
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 italic">{item.meaning}</p>
                    </div>
                    <button 
                        onClick={() => speak(item.word)}
                        className="p-3 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 active:bg-blue-100 active:text-blue-600 transition-colors"
                    >
                        <Volume2 size={20} />
                    </button>
                </div>
                ))}
            </div>

            <SharedFooter />
        </div>
    );
};

export default Guide;