import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useThemeColor } from '@/hooks/useThemeColor';

export default function ReminderSettingsScreen() {
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const background = useThemeColor({}, 'background');
  const card = useThemeColor({}, 'card');
  const text = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const highlight = useThemeColor({ light: '#fff3e0', dark: '#333' }, 'card');
  const accent = useThemeColor({ light: '#f57c00', dark: '#ff9800' }, 'tint');
  const saveTextColor = useThemeColor({ light: '#fffde7', dark: '#000' }, 'background');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const enabled = await AsyncStorage.getItem('reminderEnabled');
    const time = await AsyncStorage.getItem('reminderTime');
    if (enabled !== null) setReminderEnabled(enabled === 'true');
    if (time) setReminderTime(new Date(time));
  };

  const saveSettings = async () => {
    await AsyncStorage.setItem('reminderEnabled', reminderEnabled.toString());
    await AsyncStorage.setItem('reminderTime', reminderTime.toISOString());
    if (reminderEnabled) {
      scheduleReminder();
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const scheduleReminder = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const now = new Date();
    let triggerTime = new Date(reminderTime);
    triggerTime.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());

    if (triggerTime <= now) {
      triggerTime.setDate(triggerTime.getDate() + 1);
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '☀️ Time to get some sun!',
        body: 'Step outside to boost your Vitamin D intake.',
      },
      trigger: {
        hour: reminderTime.getHours(),
        minute: reminderTime.getMinutes(),
        repeats: true,
      } as Notifications.NotificationTriggerInput,
    });
  };

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: background }]}>
      <Animatable.View
        style={styles.container}
        animation="fadeInUp"
        duration={600}
        delay={100}
        useNativeDriver
      >
        <Animatable.Text animation="fadeIn" delay={200} style={[styles.title, { color: tint }]}>
          🔔 Reminder Settings
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" delay={300} style={[styles.section, styles.row]}>
          <Text style={[styles.label, { color: text }]}>Enable Daily Reminder</Text>
          <Switch value={reminderEnabled} onValueChange={setReminderEnabled} />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={400} style={styles.section}>
          <Text style={[styles.label, { color: text }]}>Reminder Time</Text>
          <TouchableOpacity style={[styles.timeButton, { backgroundColor: highlight }]} onPress={() => setShowPicker(true)}>
            <Text style={[styles.timeText, { color: accent }]}>
              {reminderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={reminderTime}
              mode="time"
              display="default"
              onChange={(_, selectedTime) => {
                setShowPicker(false);
                if (selectedTime) setReminderTime(selectedTime);
              }}
            />
          )}
        </Animatable.View>

        <Animatable.View animation="zoomIn" delay={500}>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: accent }]}
            onPress={saveSettings}
          >
            <Text style={[styles.saveButtonText, { color: saveTextColor }]}>💾 Save Settings</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
  },
  timeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 40,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
