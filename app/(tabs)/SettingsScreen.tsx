import React from 'react';
import {
  Alert,
  Appearance,
  Linking,
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

import { useAppSettings } from '@/contexts/AppSettingsContext';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SettingsScreen() {
  const {
    isDark,
    followSystem,
    temperatureUnit,
    language,
    setTemperatureUnit,
    setLanguage,
    setDarkMode,
    setFollowSystem,
  } = useAppSettings();

  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const card = useThemeColor({}, 'card');
  const primary = useThemeColor({}, 'tint');
  const languageButton = useThemeColor({}, 'languageButton');

  const openExternalLink = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      Alert.alert('Cannot open link', 'Please try again later.');
      return;
    }

    await Linking.openURL(url);
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

          {/* Temperature Unit */}
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: text }]}>
              🌡 Temperature Unit: {temperatureUnit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
            </Text>
            <Switch
              value={temperatureUnit === 'celsius'}
              onValueChange={(isCelsius) =>
                setTemperatureUnit(isCelsius ? 'celsius' : 'fahrenheit')
              }
            />
          </View>

          {/* Follow System Theme */}
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

          {/* Manual Dark Mode */}
          {!followSystem && (
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: text }]}>🌓 Enable Dark Mode</Text>
              <Switch
                value={isDark}
                onValueChange={(value) => {
                  setFollowSystem(false);
                  setDarkMode(value);
                }}
              />
            </View>
          )}
        </Animatable.View>

        {/* Language */}
        <Animatable.View animation="fadeInUp" delay={400} style={[styles.section, { backgroundColor: card }]}>
          <Text style={[styles.sectionTitle, { color: primary }]}>🌍 Language</Text>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: text }]}>🗣 Current Language</Text>
            <TouchableOpacity
              onPress={() => setLanguage(language === 'en' ? 'vi' : 'en')}
              style={[styles.languageButton,{ backgroundColor: languageButton }]}
            >
              <Text style={[styles.languageText, { color: primary }]}>
                {language === 'en' ? '🇺🇸 English' : '🇻🇳 Tiếng Việt'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Others */}
        <Animatable.View animation="fadeInUp" delay={600} style={[styles.section, { backgroundColor: card }]}>
          <Text style={[styles.sectionTitle, { color: primary }]}>📨 Others</Text>
          <TouchableOpacity onPress={() => openExternalLink('mailto:support@sunlighttracker.app')}>
            <Text style={[styles.link, { color: primary }]}>💬 Send Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openExternalLink('https://example.com/privacy')}>
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
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  languageText: {
    fontSize: 15,
    fontWeight: '500',
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 12,
  },
});
