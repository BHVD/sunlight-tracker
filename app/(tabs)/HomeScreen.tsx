// HomeScreen.tsx
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

export default function HomeScreen() {
  const location = 'Oslo, Norway';
  const weather = 'Clear sky | 4°C';
  const bestTime = '11:30 – 13:00';
  const sunProgress = 0.6;
  const tip = 'Eat more salmon – rich in vitamin D';
  const sunMinutes = Math.round(sunProgress * 30);

  const [nextReminder, setNextReminder] = useState('');

  useEffect(() => {
    loadReminderTime();
  }, []);

  const loadReminderTime = async () => {
    const timeStr = await AsyncStorage.getItem('reminderTime');
    if (timeStr) {
      const time = new Date(timeStr);
      const now = new Date();

      let diffMs = time.getTime() - now.getTime();
      if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000; // next day

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setNextReminder(`${hours}h ${minutes}m`);
    } else {
      setNextReminder('Not set');
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* Header with Icon */}
        <View style={styles.headerRow}>
          <Image
            source={require('../../assets/sun.png')}
            style={styles.icon}
          />
          <Text style={styles.banner}>SUNLIGHT TRACKER</Text>
        </View>

        {/* Today Summary */}
        <View style={styles.cardShadow}>
          <View style={styles.cardSection}>
            <Text style={styles.cardTitle}>📍 Today’s Summary</Text>
            <Text style={styles.textLabel}>Location:</Text>
            <Text style={styles.textValue}>{location}</Text>
            <Text style={styles.textLabel}>Weather:</Text>
            <Text style={styles.textValue}>{weather}</Text>
            <Text style={styles.textLabel}>Optimal Sun Time:</Text>
            <Text style={styles.textValue}>{bestTime}</Text>
          </View>
        </View>

        {/* Sun Progress */}
        <View style={styles.cardShadow}>
          <View style={styles.cardSection}>
            <Text style={styles.cardTitle}>☀️ Sunlight Progress</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${sunProgress * 100}%` }]} />
            </View>
            <Text style={styles.textValue}>Completed {sunMinutes}/30 min</Text>
          </View>
        </View>

        {/* Reminder Section */}
        <View style={styles.cardShadow}>
          <View style={styles.cardSection}>
            <Text style={styles.cardTitle}>🔔 Upcoming Reminder</Text>
            <Text style={styles.textValue}>Next in {nextReminder}</Text>
            <TouchableOpacity>
              <Text style={styles.link}>Change Reminder Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipCard}>
          <Text style={styles.cardTitle}>🥗 Health Tip</Text>
          <Text style={styles.tip}>{tip}</Text>
        </View>

        {/* Footer Links */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.link}>📊 View Weekly Report</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>⚙️ App Settings</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fefcea',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
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
    color: '#f57f17',
    textTransform: 'uppercase',
  },
  cardShadow: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 2,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardSection: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#37474f',
  },
  textLabel: {
    fontSize: 15,
    color: '#607d8b',
    marginTop: 6,
  },
  textValue: {
    fontSize: 16,
    color: '#263238',
    fontWeight: '500',
  },
  progressBar: {
    height: 14,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  link: {
    color: '#1e88e5',
    marginTop: 8,
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: '#e8f5e9',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  tip: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2e7d32',
  },
  footer: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
});
