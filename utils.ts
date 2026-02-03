import { Coordinate } from './types';

export const calculateDistance = (coord1: Coordinate | null, coord2: Coordinate | null): number => {
    if(!coord1 || !coord2) return 0;
    const R = 6371e3;
    const φ1 = (coord1.lat * Math.PI) / 180;
    const φ2 = (coord2.lat * Math.PI) / 180;
    const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
    const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export const calculateBearing = (start: Coordinate, end: Coordinate): number => {
    const startLat = start.lat * Math.PI / 180;
    const startLng = start.lng * Math.PI / 180;
    const endLat = end.lat * Math.PI / 180;
    const endLng = end.lng * Math.PI / 180;
    const y = Math.sin(endLng - startLng) * Math.cos(endLat);
    const x = Math.cos(startLat) * Math.sin(endLat) -
            Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
    const θ = Math.atan2(y, x);
    return (θ * 180 / Math.PI + 360) % 360; 
};

export const calculateDuration = (startStr: string, endStr: string): string => {
    const [startH, startM] = startStr.split(':').map(Number);
    const [endH, endM] = endStr.split(':').map(Number);
    let diffMins = (endH * 60 + endM) - (startH * 60 + startM);
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes} min`;
};

export const calculateGap = (endStrPrev: string, startStrNext: string): number => {
    const [endH, endM] = endStrPrev.split(':').map(Number);
    const [startH, startM] = startStrNext.split(':').map(Number);
    const diffMins = (startH * 60 + startM) - (endH * 60 + endM);
    if (diffMins > 0) return diffMins;
    return 0;
};