// hooks/useTodaySummary.ts
import { useAppSettings } from '@/contexts/AppSettingsContext';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const WEATHER_API_KEY = 'ee89eb7de866485bcc9a660020b504b8'; // Replace with your OpenWeatherMap API key

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function useTodaySummary() {
  const [location, setLocation] = useState('Loading...');
  const [weather, setWeather] = useState('Loading...');
  const [bestTime, setBestTime] = useState('11:30 – 13:00');
  const [error, setError] = useState<string | null>(null);
  const { temperatureUnit } = useAppSettings(); // Assuming you have a hook to get app settings

  useEffect(() => {
  const loadSummary = async () => {
    if (!temperatureUnit) return; // Chờ until settings available

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        return;
      }

      const coords = (await Location.getCurrentPositionAsync({})).coords;

      const places = await Location.reverseGeocodeAsync(coords);
      const place = places[0];
      setLocation(`${place.city || place.subregion}, ${place.country}`);

      const unit = temperatureUnit === "celsius" ? 'metric' : 'imperial';
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${WEATHER_API_KEY}&units=${unit}`
      );
      const data = await res.json();

      if (!data.weather || !data.main) {
        setWeather('Unavailable');
        return;
      }

      const description = capitalize(data.weather[0].description);
      const temperature = Math.round(data.main.temp);
      const unitSymbol = temperatureUnit === "celsius" ? '°C' : '°F';
      setWeather(`${description} | ${temperature}${unitSymbol}`);
    } catch (err) {
      setError('Failed to load summary');
      setLocation('Unknown');
      setWeather('Unavailable');
    }
  };
  loadSummary();
}, [temperatureUnit]); 
  return { location, weather, bestTime, error };
}
