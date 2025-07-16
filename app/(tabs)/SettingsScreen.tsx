import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Appearance,
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
import * as Animatable from 'react-native-animatable';

import LanguageSelector from '@/components/LanguageSelector';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SettingsScreen() {
  const {
    isDark,
    followSystem,
    setFollowSystem,
    setDarkMode,
  } = useTheme();
  
  const [useCelsius, setUseCelsius] = useState(true);
  const [language, setLanguage] = useState('en');

  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const card = useThemeColor({}, 'card');
  const primary = useThemeColor({}, 'tint');

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [isDark, followSystem, useCelsius, language]);

  const loadSettings = async () => {
    const systemPref = await AsyncStorage.getItem('followSystem');
    const dark = await AsyncStorage.getItem('darkMode');
    const celsius = await AsyncStorage.getItem('useCelsius');
    const lang = await AsyncStorage.getItem('language');

    const systemTheme = Appearance.getColorScheme();

    const followSystemPref = systemPref !== 'false';
    setFollowSystem(followSystemPref);

    if (followSystemPref) {
      setDarkMode(systemTheme === 'dark');
    } else {
      setDarkMode(dark === 'true');
    }

    if (celsius !== null) setUseCelsius(celsius === 'true');
    if (lang) setLanguage(lang);
  };

  const saveSettings = async () => {
    await AsyncStorage.setItem('followSystem', followSystem.toString());
    await AsyncStorage.setItem('darkMode', isDark.toString());
    await AsyncStorage.setItem('useCelsius', useCelsius.toString());
    await AsyncStorage.setItem('language', language);
  };

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.Text animation="fadeInDown" duration={500} style={[styles.title, { color: primary }]}>
          ⚙️ App Settings
        </Animatable.Text>

        {/* Preferences */}
        <Animatable.View animation="fadeInUp" delay={200} style={[styles.section, { backgroundColor: card }]}>
          <Text style={[styles.sectionTitle, { color: primary }]}>🛠 Preferences</Text>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: text }]}>🌡 Use Celsius (°C)</Text>
            <Switch value={useCelsius} onValueChange={setUseCelsius} />
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: text }]}>🌗 Use System Theme</Text>
            <Switch
              value={followSystem}
              onValueChange={(value) => {
                setFollowSystem(value);
                if (value) {
                  const systemTheme = Appearance.getColorScheme();
                  setDarkMode(systemTheme === 'dark');
                }
              }}
            />
          </View>

          {!followSystem && (
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: text }]}>🌓 Enable Dark Mode</Text>
              <Switch
                value={isDark}
                onValueChange={(value) => {
                  setFollowSystem(false); // 👈 Rất quan trọng
                  setDarkMode(value);
                }}
              />
            </View>
          )}
        </Animatable.View>

        {/* Language */}
        <Animatable.View animation="fadeInUp" delay={400} style={[styles.section, { backgroundColor: card }]}>
          <Text style={[styles.sectionTitle, { color: primary }]}>🌍 Language</Text>
          <LanguageSelector language={language} onSelect={setLanguage} />
        </Animatable.View>

        {/* Others */}
        <Animatable.View animation="fadeInUp" delay={600} style={[styles.section, { backgroundColor: card }]}>
          <Text style={[styles.sectionTitle, { color: primary }]}>📨 Others</Text>
          <TouchableOpacity>
            <Text style={[styles.link, { color: primary }]}>💬 Send Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.link, { color: primary }]}>🔒 Privacy Policy</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 32,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    flex: 1,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 12,
  },
});
