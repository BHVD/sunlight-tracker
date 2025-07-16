import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light
) {
  const { isDark } = useTheme();
  const theme = isDark ? 'dark' : 'light';
  return props[theme] ?? Colors[theme][colorName];
}