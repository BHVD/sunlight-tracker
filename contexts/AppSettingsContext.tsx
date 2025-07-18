import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type Language = 'en' | 'vi';
type TemperatureUnit = 'celsius' | 'fahrenheit';

type AppSettingsContextType = {
  isDark: boolean;
  followSystem: boolean;
  toggleTheme: () => void;
  setDarkMode: (val: boolean) => void;
  setFollowSystem: (val: boolean) => void;
  themeReady: boolean;

  language: Language;
  setLanguage: (lang: Language) => void;

  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
};

const AppSettingsContext = createContext<AppSettingsContextType>({
  isDark: false,
  followSystem: true,
  toggleTheme: () => {},
  setDarkMode: () => {},
  setFollowSystem: () => {},
  themeReady: false,

  language: 'en',
  setLanguage: () => {},

  temperatureUnit: 'celsius',
  setTemperatureUnit: () => {},
});

export const useAppSettings = () => useContext(AppSettingsContext);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [followSystem, setFollowSystemState] = useState(true);
  const [themeReady, setThemeReady] = useState(false);

  const [language, setLanguageState] = useState<Language>('en');
  const [temperatureUnit, setTemperatureUnitState] = useState<TemperatureUnit>('celsius');

  useEffect(() => {
    (async () => {
      const savedFollow = await AsyncStorage.getItem('followSystem');
      const savedDark = await AsyncStorage.getItem('darkMode');
      const savedLang = await AsyncStorage.getItem('language');
      const savedTemp = await AsyncStorage.getItem('temperatureUnit');

      const follow = savedFollow !== 'false'; // default true
      const dark = savedDark === 'true';
      const systemDark = Appearance.getColorScheme() === 'dark';

      setFollowSystemState(follow);
      setIsDark(follow ? systemDark : dark);
      setLanguageState(savedLang === 'vi' ? 'vi' : 'en');
      setTemperatureUnitState(savedTemp === 'fahrenheit' ? 'fahrenheit' : 'celsius');

      setThemeReady(true);
    })();
  }, []);
    // Theo dõi hệ thống nếu followSystem bật
  useEffect(() => {
    const listener = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      if (followSystem) setIsDark(colorScheme === 'dark');
    };
    const subscription = Appearance.addChangeListener(listener);
    return () => subscription.remove();
  }, [followSystem]);

  
  const toggleTheme = async () => {
    if (followSystem) {
      await AsyncStorage.setItem('followSystem', 'false');
      setFollowSystemState(false);
    }

    const newDark = !isDark;
    await AsyncStorage.setItem('darkMode', newDark ? 'true' : 'false');
    setIsDark(newDark);
  };

  const setDarkMode = async (val: boolean) => {
    await AsyncStorage.setItem('darkMode', val ? 'true' : 'false');
    setIsDark(val);
  };

  const setFollowSystem = async (val: boolean) => {
    await AsyncStorage.setItem('followSystem', val ? 'true' : 'false');
    setFollowSystemState(val);
    if (val) {
      const systemDark = Appearance.getColorScheme() === 'dark';
      setIsDark(systemDark);
    }
  };

  const setLanguage = async (lang: Language) => {
    await AsyncStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  const setTemperatureUnit = async (unit: TemperatureUnit) => {
    await AsyncStorage.setItem('temperatureUnit', unit);
    setTemperatureUnitState(unit);
  };

  return (
    <AppSettingsContext.Provider
      value={{
        isDark,
        followSystem,
        toggleTheme,
        setDarkMode,
        setFollowSystem,
        themeReady,

        language,
        setLanguage,
        temperatureUnit,
        setTemperatureUnit,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
