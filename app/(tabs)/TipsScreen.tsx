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
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.Text
          animation="fadeInDown"
          delay={100}
          duration={600}
          style={styles.title}>
          🌿 Tips & Suggestions
        </Animatable.Text>

        {seasonalTips.map((section, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={200 + index * 200}
            duration={600}
            style={styles.tipSection}
            useNativeDriver>
            <Text style={styles.season}>{section.season}</Text>
            {section.tips.map((tip, i) => (
              <View key={i} style={styles.tipItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
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
    backgroundColor: '#f1f8e9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#33691e',
    marginBottom: 24,
  },
  tipSection: {
    marginBottom: 24,
    padding: 18,
    backgroundColor: '#ffffff',
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
    color: '#558b2f',
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
    color: '#7cb342',
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    color: '#33691e',
    lineHeight: 22,
  },
});
