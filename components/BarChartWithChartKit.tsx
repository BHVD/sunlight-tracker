import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 32;

type Props = {
  sunMinutesPerDay: number[];
  width?: number;
};

export default function BarChartWithChartKit({ sunMinutesPerDay, width = screenWidth }: Props) {
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const barColor = useThemeColor({ light: '#ff8f00', dark: '#ffb300' }, 'tint');
  const gridLine = useThemeColor({ light: '#eceff1', dark: '#444' }, 'separator');

  const chartConfig = useMemo(() => ({
    backgroundGradientFrom: background,
    backgroundGradientTo: background,
    decimalPlaces: 0,
    barPercentage: 0.6,
    color: (opacity = 1) => `${barColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
    labelColor: (opacity = 1) => `${text}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
    propsForBackgroundLines: {
      stroke: gridLine,
      strokeDasharray: '',
    },
    propsForLabels: {
      fontSize: 13,
      fontWeight: '600',
    },
  }), [background, text, barColor, gridLine]);

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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
