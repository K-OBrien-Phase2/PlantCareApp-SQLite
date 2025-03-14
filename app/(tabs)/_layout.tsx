import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // TODO: make this apply to icons
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Index',
          tabBarIcon: () => <Text>📓</Text>,
        }}
      />
      <Tabs.Screen
        name="addAPlant"
        options={{
          title: 'Add a Plant',
          tabBarIcon: () => <Text>➕</Text>,
        }}
      />
      <Tabs.Screen
        name="plantDetails"
        options={{
          headerShown: true,
          title: 'Edit Your Plant',
          href: null
        }}
      />
    </Tabs>
  );
}
