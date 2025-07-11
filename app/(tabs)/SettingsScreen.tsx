// SettingsScreen.tsx
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [useCelsius, setUseCelsius] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>⚙️ App Settings</Text>

        {/* Temperature Unit */}
        <View style={styles.settingItem}>
          <Text style={styles.label}>🌡 Temperature Unit</Text>
          <View style={styles.rowLine}>
            <Text style={styles.unit}>Use °C</Text>
            <Switch value={useCelsius} onValueChange={setUseCelsius} />
          </View>
        </View>

        {/* Dark Mode */}
        <View style={styles.settingItem}>
          <Text style={styles.label}>🌓 Dark Mode</Text>
          <View style={styles.rowLine}>
            <Text style={styles.unit}>Enable</Text>
            <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
          </View>
        </View>

        {/* Language Picker */}
        <View style={styles.settingItem}>
          <Text style={styles.label}>🌍 Language</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={language}
              style={styles.picker}
              onValueChange={(itemValue) => setLanguage(itemValue)}>
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Norsk" value="no" />
              <Picker.Item label="Deutsch" value="de" />
            </Picker>
          </View>
        </View>

        {/* Feedback & Privacy */}
        <View style={styles.settingItem}>
          <TouchableOpacity>
            <Text style={styles.link}>💬 Send Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>🔒 Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff8e1',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#f57f17',
  },
  settingItem: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#37474f',
    marginBottom: 8,
  },
  rowLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unit: {
    fontSize: 16,
    color: '#37474f',
  },
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  link: {
    fontSize: 16,
    color: '#1e88e5',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});
