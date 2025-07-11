// TipsScreen.tsx
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

const seasonalTips = [
  {
    season: 'Winter',
    tips: [
      'Aim for midday sun when it’s strongest.',
      'Eat fatty fish like salmon or mackerel.',
      'Consider vitamin D supplements if sunlight is minimal.',
    ],
  },
  {
    season: 'Spring',
    tips: [
      'Expose arms and face for at least 15 minutes daily.',
      'Include eggs and fortified milk in your diet.',
      'Use the UV Index to track best sun times.',
    ],
  },
  {
    season: 'Rainy/Cloudy Days',
    tips: [
      'Sunlight may still pass through clouds – aim for longer exposure.',
      'Stay close to windows or go outside when clouds break.',
      'Eat mushrooms exposed to UV light for natural vitamin D.',
    ],
  },
];

export default function TipsScreen() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🌿 Tips & Suggestions</Text>
        {seasonalTips.map((section, index) => (
          <View key={index} style={styles.tipSection}>
            <Text style={styles.season}>{section.season}</Text>
            {section.tips.map((tip, i) => (
              <Text key={i} style={styles.tipText}>• {tip}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f1f8e9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#33691e',
    marginBottom: 20,
  },
  tipSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  season: {
    fontSize: 18,
    fontWeight: '600',
    color: '#558b2f',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#33691e',
    marginBottom: 6,
  },
});
