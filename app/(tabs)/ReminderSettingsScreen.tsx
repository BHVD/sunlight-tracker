// ReminderSettingsScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

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
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const scheduleReminder = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '☀️ Time to get some sun!',
        body: 'Step outside to boost your Vitamin D intake.',
      },
      trigger: {
        seconds:
          reminderTime.getHours() * 3600 +
          reminderTime.getMinutes() * 60 -
          (new Date().getHours() * 3600 + new Date().getMinutes() * 60),
        repeats: true,
      } as any, // Type assertion for trigger
    });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>🔔 Reminder Settings</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Enable Reminder</Text>
          <Switch
            value={reminderEnabled}
            onValueChange={setReminderEnabled}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Reminder Time</Text>
          <Button
            title={reminderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            onPress={() => setShowPicker(true)}
          />
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
        </View>

        <Button title="Save Settings" onPress={saveSettings} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fffde7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f57f17',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#37474f',
    marginBottom: 8,
  },
});
