// components/BarChartWithChartKit.tsx
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 32;

const chartConfig = {
  backgroundGradientFrom: '#fffde7',
  backgroundGradientTo: '#fffde7',
  decimalPlaces: 0,
  barPercentage: 0.6,
  color: (opacity = 1) => `rgba(255, 143, 0, ${opacity})`, // màu cam sáng
  labelColor: (opacity = 1) => `rgba(38, 50, 56, ${opacity})`, // đậm hơn
  propsForBackgroundLines: {
    stroke: '#eceff1', // đường kẻ trục y
    strokeDasharray: '', // không gạch đứt
  },
  propsForLabels: {
    fontSize: 13,
    fontWeight: '600',
  },
};

type Props = {
  sunMinutesPerDay: number[];
  width?: number;
};

export default function BarChartWithChartKit({ sunMinutesPerDay, width = screenWidth }: Props) {
  return (
    <BarChart
      data={{
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{ data: sunMinutesPerDay }],
      }}
      width={width}
      height={240}
      yAxisLabel=""
      yAxisSuffix="m"
      chartConfig={chartConfig}
      fromZero
      showValuesOnTopOfBars
      style={styles.chart}
    />
  );
}

const styles = StyleSheet.create({
  chart: {
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
