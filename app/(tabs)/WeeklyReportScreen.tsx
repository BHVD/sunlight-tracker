import BarChartWithChartKit from '@/components/BarChartWithChartKit';
import { useThemeColor } from '@/hooks/useThemeColor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function WeeklyReport() {
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const card = useThemeColor({}, 'card');
  const levelColor = useThemeColor({ light: '#f57f17', dark: '#ffb300' }, 'tint');
  const cardText = useThemeColor({ light: '#4e342e', dark: '#e0e0e0' }, 'text');

  const [sunMinutesPerDay, setSunMinutesPerDay] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const loadWeeklyMinutes = async () => {
      const savedByDate = await AsyncStorage.getItem('sunlightByDate');
      if (!savedByDate) return;

      const parsed = JSON.parse(savedByDate) as Record<string, number>;
      const now = new Date();
      const currentDay = now.getDay();
      const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
      const monday = new Date(now);
      monday.setDate(now.getDate() + mondayOffset);

      const minutes = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);
        const key = date.toISOString().split('T')[0];
        return parsed[key] || 0;
      });

      setSunMinutesPerDay(minutes);
    };

    loadWeeklyMinutes();
  }, []);

  const average = sunMinutesPerDay.reduce((a, b) => a + b, 0) / 7;

  const { vitaminDLevel, recommendation } = useMemo(() => {
    const level = average >= 20 ? 'Good' : average >= 10 ? 'Moderate' : 'Low';
    const note =
      average >= 20
        ? '🌞 Keep up the great routine!'
        : average >= 10
        ? '🌤 Try to sunbathe more regularly.'
        : '🌥 Consider taking vitamin D supplements and increase exposure.';

    return { vitaminDLevel: level, recommendation: note };
  }, [average]);

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: tint }]}>📊 Weekly Report</Text>

        <View style={styles.section}>
          <Text style={[styles.label, { color: text }]}>
            ☀️ Sunlight Exposure (minutes)
          </Text>
          <Animated.View entering={FadeInDown.duration(500)}>
            <BarChartWithChartKit sunMinutesPerDay={sunMinutesPerDay} />
          </Animated.View>
        </View>

        <Animated.View
          entering={FadeInUp.duration(600).delay(300)}
          style={[styles.card, { backgroundColor: card }]}
        >
          <Text style={[styles.cardTitle, { color: tint }]}>
            🧬 Vitamin D Level:{' '}
            <Text style={[styles.level, { color: levelColor }]}>
              {vitaminDLevel}
            </Text>
          </Text>
          <Text style={[styles.cardContent, { color: cardText }]}>
            {recommendation}
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 16,
    lineHeight: 22,
  },
  level: {
    fontWeight: 'bold',
  },
});
