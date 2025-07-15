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
import * as Animatable from 'react-native-animatable';

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
        <Animatable.View animation="fadeInDown" duration={600}>
          <View style={styles.headerRow}>
            <Image source={require('../../assets/sun.png')} style={styles.icon} />
            <Text style={styles.banner}>SUNLIGHT TRACKER</Text>
          </View>
        </Animatable.View>

        {/* Today Summary */}
<Animatable.View
  animation="fadeInUp"
  delay={200}
  duration={600}
  useNativeDriver
>
  <View style={styles.cardShadow}>
    <View style={styles.cardSection}>
      <Text style={styles.cardTitle}>📍 Today’s Summary</Text>

      <View style={styles.inlineRow}>
        <Text style={styles.textLabel}>Location: </Text>
        <Text style={styles.textValue}>{location}</Text>
      </View>

      <View style={styles.inlineRow}>
        <Text style={styles.textLabel}>Weather: </Text>
        <Text style={styles.textValue}>{weather}</Text>
      </View>

      <View style={styles.inlineRow}>
        <Text style={styles.textLabel}>Optimal Sun Time: </Text>
        <Text style={styles.textValue}>{bestTime}</Text>
      </View>
    </View>
  </View>
</Animatable.View>

        {/* Sun Progress */}
        <Animatable.View animation="fadeInUp" delay={400} duration={700}>
          <View style={styles.cardShadow}>
            <View style={styles.cardSection}>
              <Text style={styles.cardTitle}>☀️ Sunlight Progress</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${sunProgress * 100}%` }]} />
              </View>
              <Text style={styles.textValue}>Completed {sunMinutes}/30 min</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Reminder Section */}
        <Animatable.View animation="fadeInUp" delay={600} duration={700}>
          <View style={styles.cardShadow}>
            <View style={styles.cardSection}>
              <Text style={styles.cardTitle}>🔔 Upcoming Reminder</Text>
              <Text style={styles.textValue}>Next in {nextReminder}</Text>
              <TouchableOpacity>
                <Text style={styles.link}>Change Reminder Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
        {/* Tips Section */}
        <Animatable.View animation="fadeInUp" delay={800} duration={700}>
          <View style={styles.tipCard}>
            <Text style={styles.cardTitle}>🥗 Health Tip</Text>
            <Text style={styles.tip}>{tip}</Text>
          </View>
        </Animatable.View>
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
  inlineRow: {
  flexDirection: 'row',
  alignItems: 'baseline',
  marginBottom: 8,
},
  cardShadow: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 2,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05, // mềm hơn
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  infoRow: {
  marginBottom: 10,
},textLabel: {
  fontSize: 16,
  color: '#607d8b',
  fontWeight: '500',
},
textValue: {
  fontSize: 16,
  color: '#263238',
  fontWeight: '600',
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

  progressBar: {
    height: 16,
    backgroundColor: '#eeeeee',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#81c784', // xanh lá cây sáng, dễ nhìn hơn
  },

  link: {
    color: '#0288d1',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: '#f1f8e9',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#c5e1a5',
  },
  tip: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#33691e',
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
});
