// hooks/useSunlightProgress.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useSunlightProgress(extraMinutes: number = 0) {
  const [sunMinutes, setSunMinutes] = useState(0);
  const tip = 'Eat more salmon – rich in vitamin D';

  useEffect(() => {
    AsyncStorage.getItem('sunlightToday').then((data) => {
      const stored = parseInt(data || '0', 10);
      setSunMinutes(stored + extraMinutes);
    });
  }, [extraMinutes]);

  const sunProgress = Math.min((sunMinutes + extraMinutes) / 4, 1);

  return {
    sunProgress,
    sunMinutes: sunMinutes + extraMinutes,
    tip,
  };
}

