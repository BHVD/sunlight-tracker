import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const backgroundColor = useThemeColor({}, 'tabBarBackground');
  const activeColor = useThemeColor({}, 'tabIconActive');
  const inactiveColor = useThemeColor({}, 'tabIconInactive');
  const borderColor = useThemeColor({ light: '#eee', dark: '#222' }, 'border');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: backgroundColor,
          borderTopWidth: 0.5,
          borderTopColor: borderColor,
          elevation: 0, // Remove Android shadow
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ReminderSettingsScreen"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bell.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="WeeklyReportScreen"
        options={{
          title: 'Weekly Report',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="TipsScreen"
        options={{
          title: 'Tips',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="lightbulb.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
