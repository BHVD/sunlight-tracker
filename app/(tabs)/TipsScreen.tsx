import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const seasonalTips = [
  {
    season: '❄️ Winter',
    tips: [
      'Aim for midday sun when it’s strongest.',
      'Eat fatty fish like salmon or mackerel.',
      'Consider vitamin D supplements if sunlight is minimal.',
    ],
  },
  {
    season: '🌸 Spring',
    tips: [
      'Expose arms and face for at least 15 minutes daily.',
      'Include eggs and fortified milk in your diet.',
      'Use the UV Index to track best sun times.',
    ],
  },
  {
    season: '☁️ Rainy/Cloudy Days',
    tips: [
      'Sunlight may still pass through clouds – aim for longer exposure.',
      'Stay close to windows or go outside when clouds break.',
      'Eat mushrooms exposed to UV light for natural vitamin D.',
    ],
  },
];

export default function TipsScreen() {
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const card = useThemeColor({}, 'card');
  const primary = useThemeColor({}, 'tint');
  const accent = useThemeColor({ light: '#7cb342', dark: '#aed581' }, 'accent');

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.Text
          animation="fadeInDown"
          delay={100}
          duration={600}
          style={[styles.title, { color: primary }]}>
          🌿 Tips & Suggestions
        </Animatable.Text>

        {seasonalTips.map((section, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={200 + index * 200}
            duration={600}
            style={[styles.tipSection, { backgroundColor: card }]}
            useNativeDriver>
            <Text style={[styles.season, { color: primary }]}>{section.season}</Text>
            {section.tips.map((tip, i) => (
              <View key={i} style={styles.tipItem}>
                <Text style={[styles.bullet, { color: accent }]}>•</Text>
                <Text style={[styles.tipText, { color: text }]}>{tip}</Text>
              </View>
            ))}
          </Animatable.View>
        ))}
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
    marginBottom: 24,
  },
  tipSection: {
    marginBottom: 24,
    padding: 18,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  season: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 18,
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
});
