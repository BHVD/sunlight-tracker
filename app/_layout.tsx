import { ThemeProvider } from '@/contexts/ThemeContext';
import { Slot } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
