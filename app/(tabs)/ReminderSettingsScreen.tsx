// ReminderSettingsScreen.tsx
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

export default function ReminderSettingsScreen() {
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

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

    // Nếu thời gian đã trôi qua hôm nay, thì đặt cho ngày mai
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
    <SafeAreaView style={styles.wrapper}>
      <Animatable.View
        style={styles.container}
        animation="fadeInUp"
        duration={600}
        delay={100}
        useNativeDriver
      >
        <Animatable.Text
          animation="fadeIn"
          delay={200}
          style={styles.title}
        >
          🔔 Reminder Settings
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" delay={300} style={[styles.section, styles.row]}>
          <Text style={styles.label}>Enable Daily Reminder</Text>
          <Switch value={reminderEnabled} onValueChange={setReminderEnabled} />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={400} style={styles.section}>
          <Text style={styles.label}>Reminder Time</Text>
          <TouchableOpacity style={styles.timeButton} onPress={() => setShowPicker(true)}>
            <Text style={styles.timeText}>
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
          <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
            <Text style={styles.saveButtonText}>💾 Save Settings</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fffde7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f57f17',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    color: '#37474f',
    marginBottom: 12,
  },
  timeButton: {
    backgroundColor: '#fff3e0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef6c00',
  },
  saveButton: {
    marginTop: 40,
    backgroundColor: '#f57c00',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fffde7',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
