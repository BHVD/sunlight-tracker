// hooks/useSunlightProgress.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useSunlightProgress(extraMinutes: number = 0) {
  const [sunMinutes, setSunMinutes] = useState(0);
  const tip = 'Eat more salmon – rich in vitamin D';

  useEffect(() => {
    const loadProgress = async () => {
      const todayKey = new Date().toISOString().split('T')[0];
      const savedByDate = await AsyncStorage.getItem('sunlightByDate');

      if (savedByDate) {
        const parsed = JSON.parse(savedByDate) as Record<string, number>;
        setSunMinutes(parsed[todayKey] || 0);
        return;
      }

      const data = await AsyncStorage.getItem('sunlightToday');
      const stored = parseInt(data || '0', 10);
      setSunMinutes(stored);
    };

    loadProgress();
  }, [extraMinutes]);

  const sunProgress = Math.min((sunMinutes + extraMinutes) / 30, 1);

  return {
    sunProgress,
    sunMinutes: sunMinutes + extraMinutes,
    tip,
  };
}
