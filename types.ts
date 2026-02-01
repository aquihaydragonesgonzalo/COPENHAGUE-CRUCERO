export interface Coordinate {
  lat: number;
  lng: number;
}

export interface AudioTrack {
  title: string;
  text: string;
}

export interface ItineraryItem {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  locationName: string;
  endLocationName?: string;
  coords: Coordinate;
  endCoords?: Coordinate;
  description: string;
  keyDetails: string;
  priceDKK: number;
  priceEUR: number;
  type: 'food' | 'logistics' | 'transport' | 'sightseeing';
  completed: boolean;
  notes?: string;
  ticketUrl?: string;
  googleMapsUrl?: string;
  instaTag?: string;
}

export interface WalkingPOI {
  name: string;
  lat: number;
  lng: number;
}

export interface DanishWord {
  word: string;
  phonetic: string;
  simplified: string;
  meaning: string;
}

export interface WeatherData {
  temperature_2m: number;
  weather_code: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  rain: number;
  code: number;
}

export interface DailyForecast {
  date: string;
  max: number;
  min: number;
  code: number;
}