import { AppSettingsProvider } from '@/contexts/AppSettingsContext';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <AppSettingsProvider>
      <Slot />
    </AppSettingsProvider>
  );
}