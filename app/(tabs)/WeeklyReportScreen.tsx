// WeeklyReportScreen.tsx
import React from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 32;

export default function WeeklyReportScreen() {
  const sunMinutesPerDay = [10, 25, 5, 0, 20, 30, 15]; // ví dụ
  const average = sunMinutesPerDay.reduce((a, b) => a + b, 0) / 7;

  const vitaminDLevel = average >= 20 ? 'Good' : average >= 10 ? 'Moderate' : 'Low';
  const recommendation =
    average >= 20
      ? 'Keep up the great routine!'
      : average >= 10
      ? 'Try to sunbathe more regularly.'
      : 'Consider taking vitamin D supplements and increase exposure.';

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📊 Weekly Report</Text>

        <Text style={styles.label}>Sunlight Exposure (minutes)</Text>
        <BarChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ data: sunMinutesPerDay }],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          showValuesOnTopOfBars
          yAxisLabel=""
          yAxisSuffix="m"
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vitamin D Level: {vitaminDLevel}</Text>
          <Text style={styles.cardContent}>{recommendation}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(55, 71, 79, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    stroke: '#ccc',
  },
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fefcea',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f57f17',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#37474f',
  },
  chart: {
    borderRadius: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff3e0',
    borderRadius: 14,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ef6c00',
  },
  cardContent: {
    fontSize: 16,
    color: '#4e342e',
  },
});
