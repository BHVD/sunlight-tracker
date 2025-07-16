// HomeScreen.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function HomeScreen() {
  const location = 'Oslo, Norway';
  const weather = 'Clear sky | 4°C';
  const bestTime = '11:30 – 13:00';
  const sunProgress = 0.6;
  const tip = 'Eat more salmon – rich in vitamin D';
  const sunMinutes = Math.round(sunProgress * 30);

  const [nextReminder, setNextReminder] = useState('');

  const background = useThemeColor({}, 'background');
  const card = useThemeColor({}, 'card');
  const text = useThemeColor({}, 'text');
  const label = useThemeColor({}, 'placeholder');
  const progressBg = useThemeColor({}, 'progressBackground');
const progressFill = useThemeColor({}, 'progressFill');
  const linkColor = useThemeColor({}, 'tint');
  const tipBg = useThemeColor({}, 'card'); // Có thể custom riêng nếu muốn
  const bannerColor = useThemeColor({}, 'tint');

  useEffect(() => {
    loadReminderTime();
  }, []);

  const loadReminderTime = async () => {
    const timeStr = await AsyncStorage.getItem('reminderTime');
    if (timeStr) {
      const time = new Date(timeStr);
      const now = new Date();

      let diffMs = time.getTime() - now.getTime();
      if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setNextReminder(`${hours}h ${minutes}m`);
    } else {
      setNextReminder('Not set');
    }
  };

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: background }]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={600}>
          <View style={styles.headerRow}>
            <Image source={require('../../assets/sun.png')} style={styles.icon} />
            <Text style={[styles.banner, { color: bannerColor }]}>SUNLIGHT TRACKER</Text>
          </View>
        </Animatable.View>

        {/* Summary Card */}
        <Animatable.View animation="fadeInUp" delay={200} duration={600}>
          <View style={[styles.cardShadow, { backgroundColor: card }]}>
            <View style={styles.cardSection}>
              <Text style={[styles.cardTitle, { color: text }]}>📍 Today’s Summary</Text>

              <View style={styles.inlineRow}>
                <Text style={[styles.textLabel, { color: label }]}>Location: </Text>
                <Text style={[styles.textValue, { color: text }]}>{location}</Text>
              </View>
              <View style={styles.inlineRow}>
                <Text style={[styles.textLabel, { color: label }]}>Weather: </Text>
                <Text style={[styles.textValue, { color: text }]}>{weather}</Text>
              </View>
              <View style={styles.inlineRow}>
                <Text style={[styles.textLabel, { color: label }]}>Optimal Sun Time: </Text>
                <Text style={[styles.textValue, { color: text }]}>{bestTime}</Text>
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Sun Progress */}
        <Animatable.View animation="fadeInUp" delay={400} duration={600}>
          <View style={[styles.cardShadow, { backgroundColor: card }]}>
            <View style={styles.cardSection}>
              <Text style={[styles.cardTitle, { color: text }]}>☀️ Sunlight Progress</Text>
              <View style={[styles.progressBar, { backgroundColor: progressBg }]}>
  <View style={[styles.progressFill, { width: `${sunProgress * 100}%`, backgroundColor: progressFill }]} />
</View>
              <Text style={[styles.textValue, { color: text }]}>Completed {sunMinutes}/30 min</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Reminder */}
        <Animatable.View animation="fadeInUp" delay={600} duration={600}>
          <View style={[styles.cardShadow, { backgroundColor: card }]}>
            <View style={styles.cardSection}>
              <Text style={[styles.cardTitle, { color: text }]}>🔔 Upcoming Reminder</Text>
              <Text style={[styles.textValue, { color: text }]}>Next in {nextReminder}</Text>
              <TouchableOpacity>
                <Text style={[styles.link, { color: linkColor }]}>Change Reminder Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>

        {/* Tips */}
        <Animatable.View animation="fadeInUp" delay={800} duration={600}>
          <View style={[styles.tipCard, { backgroundColor: tipBg }]}>
            <Text style={[styles.cardTitle, { color: text }]}>🥗 Health Tip</Text>
            <Text style={[styles.tip, { color: label }]}>{tip}</Text>
          </View>
        </Animatable.View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={[styles.link, { color: linkColor }]}>📊 View Weekly Report</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.link, { color: linkColor }]}>⚙️ App Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  progressBar: {
  height: 16,
  borderRadius: 12,
  overflow: 'hidden',
  marginBottom: 10,
},

progressFill: {
  height: '100%',
},
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1 },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  banner: {
    fontSize: 26,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  cardShadow: {
    borderRadius: 16,
    padding: 2,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  cardSection: {
    borderRadius: 14,
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  textValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  tipCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tip: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
});
