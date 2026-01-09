/**
 * PackNDocs Tabs Layout
 * Bottom tab navigation with Turkish labels
 */

import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: AppColors.skyBlue,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopColor: Colors[colorScheme ?? 'light'].border,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && styles.activeIconContainer}>
              <IconSymbol size={24} name="house.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Keşfet',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && styles.activeIconContainer}>
              <IconSymbol size={24} name="globe" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'Haberler',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && styles.activeIconContainer}>
              <IconSymbol size={24} name="newspaper.fill" color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeIconContainer: {
    backgroundColor: `${AppColors.skyBlue}15`,
    borderRadius: 12,
    padding: 4,
  },
});
