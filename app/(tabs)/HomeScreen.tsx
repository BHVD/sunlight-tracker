// HomeScreen.tsx
import { useSunlightProgress } from '@/hooks/useSunlightProgress';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTodaySummary } from '@/hooks/useTodaySummary';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
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
  
  const { location, weather, bestTime, error } = useTodaySummary();
  const [nextReminder, setNextReminder] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [savedMinutes, setSavedMinutes] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { sunProgress, sunMinutes, tip } = useSunlightProgress(Math.floor(seconds / 60));
  
  
  const background = useThemeColor({}, 'background');
  const card = useThemeColor({}, 'card');
  const text = useThemeColor({}, 'text');
  const label = useThemeColor({}, 'placeholder');
  const progressBg = useThemeColor({}, 'progressBackground');
  const progressFill = useThemeColor({}, 'progressFill');
  const linkColor = useThemeColor({ dark: "#05ca40ff", light: "#1498b9ff" }, 'tint');
  const tipBg = useThemeColor({}, 'card');
  const bannerColor = useThemeColor({}, 'tint');

    useEffect(() => {
    loadReminderTime();
    loadSavedProgress();
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

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

  const loadSavedProgress = async () => {
    const saved = await AsyncStorage.getItem('sunlightToday');
    if (saved) setSavedMinutes(parseInt(saved));
  };

  const handleSave = async () => {
    const minutes = Math.round(seconds / 60);
    const total = savedMinutes + minutes;
    await AsyncStorage.setItem('sunlightToday', total.toString());
    setSavedMinutes(total);
    setSeconds(0);
    setRunning(false);
    alert(`Saved ${minutes} more minutes! Total today: ${total} minutes`);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: background }]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

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
              {error && <Text style={{ color: 'red' }}>{error}</Text>}
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

        {/* Sunlight Timer */}
        <Animatable.View animation="fadeInUp" delay={400} duration={600}>
          <View style={[styles.cardShadow, { backgroundColor: card }]}>
            <View style={styles.cardSection}>
              <Text style={[styles.cardTitle, { color: text }]}>☀️ Sunlight Timer</Text>
              <Text style={[styles.timerText, { color: text }]}>{formatTime(seconds)}</Text>
              <View style={[styles.progressBar, { backgroundColor: progressBg }]}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${sunProgress * 100}%`,
                      backgroundColor: progressFill,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.textValue, { color: text }]}>
                Completed {sunMinutes}/30 min
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.timerButton, { backgroundColor: running ? '#ef5350' : linkColor }]}
                  onPress={() => setRunning(!running)}>
                  <Ionicons name={running ? 'pause' : 'play'} size={20} color="#fff" />
                  <Text style={styles.buttonText}>{running ? 'Pause' : 'Start'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.timerButton, { backgroundColor: '#dfab1dff' }]}
                  onPress={() => {
                    setSeconds(0);
                    setRunning(false);
                  }}>
                  <Ionicons name="refresh" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.timerButton, { backgroundColor: linkColor }]}
                  onPress={handleSave}>
                  <Ionicons name="save" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
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
