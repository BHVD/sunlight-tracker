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
import * as Animatable from 'react-native-animatable';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [useCelsius, setUseCelsius] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.Text animation="fadeInDown" duration={500} style={styles.title}>
          ⚙️ App Settings
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" delay={200} style={styles.section}>
          <Text style={styles.sectionTitle}>🛠 Preferences</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>🌡 Use Celsius (°C)</Text>
            <Switch value={useCelsius} onValueChange={setUseCelsius} />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>🌓 Enable Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={400} style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 Language</Text>
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
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={600} style={styles.section}>
          <Text style={styles.sectionTitle}>📨 Others</Text>
          <TouchableOpacity>
            <Text style={styles.link}>💬 Send Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>🔒 Privacy Policy</Text>
          </TouchableOpacity>
        </Animatable.View>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#f57f17',
    alignSelf: 'center',
  },
  section: {
    marginBottom: 32,
    backgroundColor: '#fff3e0',
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
    color: '#ef6c00',
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
    color: '#37474f',
    flex: 1,
  },
 pickerContainer: {
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#ccc',
  backgroundColor: '#fffde7',
},

picker: {
  height: 56,
  fontSize: 16,
  color: '#37474f',
  lineHeight: 24,         // Đảm bảo đủ không gian dọc
  paddingVertical: 12,    // Thêm khoảng cách trên dưới
},
  link: {
    fontSize: 16,
    color: '#1e88e5',
    textDecorationLine: 'underline',
    marginBottom: 12,
  },
});
