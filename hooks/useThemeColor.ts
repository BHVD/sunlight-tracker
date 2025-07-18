import Colors from '@/constants/Colors';
import { useAppSettings } from '@/contexts/AppSettingsContext';
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light
) {
  const { isDark } = useAppSettings();
  const theme = isDark ? 'dark' : 'light';
  return props[theme] ?? Colors[theme][colorName];
}
