import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemeContextType = {
  isDark: boolean;
  followSystem: boolean;
  toggleTheme: () => void;
  setDarkMode: (val: boolean) => void;
  setFollowSystem: (val: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  followSystem: true,
  toggleTheme: () => {},
  setDarkMode: () => {},
  setFollowSystem: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [followSystem, setFollowSystemState] = useState(true);
  const [isReady, setIsReady] = useState(false); // ✅ NEW

  useEffect(() => {
    const loadTheme = async () => {
      const systemPref = await AsyncStorage.getItem('followSystem');
      const storedDark = await AsyncStorage.getItem('darkMode');
      const systemColor = Appearance.getColorScheme();

      const shouldFollow = systemPref !== 'false';
      setFollowSystemState(shouldFollow);

      if (shouldFollow) {
        setIsDark(systemColor === 'dark');
      } else {
        setIsDark(storedDark === 'true');
      }

      setIsReady(true); // ✅ mark done loading
    };

    loadTheme();
  }, []);

  useEffect(() => {
    const listener = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      if (followSystem) {
        setIsDark(colorScheme === 'dark');
      }
    };
    const subscription = Appearance.addChangeListener(listener);
    return () => subscription.remove();
  }, [followSystem]);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem('followSystem', followSystem.toString());
      AsyncStorage.setItem('darkMode', isDark.toString());
    }
  }, [followSystem, isDark, isReady]);

  const setFollowSystem = (val: boolean) => {
    setFollowSystemState(val);
    if (val) {
      const systemColor = Appearance.getColorScheme();
      setIsDark(systemColor === 'dark');
    }
  };

  const toggleTheme = () => {
    if (followSystem) {
      setFollowSystem(false);
    }
    setIsDark((prev) => !prev);
  };

  const setDarkMode = (val: boolean) => {
    if (followSystem) {
      setFollowSystem(false);
    }
    setIsDark(val);
  };
  if (!isReady) return null;

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        followSystem,
        toggleTheme,
        setDarkMode,
        setFollowSystem,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
