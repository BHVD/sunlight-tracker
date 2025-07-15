// app/(tabs)/weekly-report.tsx
import BarChartWithChartKit from '@/components/BarChartWithChartKit';
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
  const sunMinutesPerDay = [10, 25, 5, 0, 20, 30, 15];
  const average = sunMinutesPerDay.reduce((a, b) => a + b, 0) / 7;

  const vitaminDLevel = average >= 20 ? 'Good' : average >= 10 ? 'Moderate' : 'Low';
  const recommendation =
    average >= 20
      ? '🌞 Keep up the great routine!'
      : average >= 10
      ? '🌤 Try to sunbathe more regularly.'
      : '🌥 Consider taking vitamin D supplements and increase exposure.';

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📊 Weekly Report</Text>

        <View style={styles.section}>
          <Text style={styles.label}>☀️ Sunlight Exposure (minutes)</Text>
          <Animated.View entering={FadeInDown.duration(500)}>
  <BarChartWithChartKit sunMinutesPerDay={sunMinutesPerDay} />
</Animated.View>
        </View>

        <Animated.View entering={FadeInUp.duration(600).delay(300)} style={styles.card}>
  <Text style={styles.cardTitle}>
    🧬 Vitamin D Level: <Text style={styles.level}>{vitaminDLevel}</Text>
  </Text>
  <Text style={styles.cardContent}>{recommendation}</Text>
</Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fffde7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f57f17',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#37474f',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff3e0',
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
    color: '#ef6c00',
  },
  cardContent: {
    fontSize: 16,
    color: '#4e342e',
    lineHeight: 22,
  },
  level: {
    fontWeight: 'bold',
    color: '#f57f17',
  },
});
