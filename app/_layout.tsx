/**
 * PackNDocs Root Layout
 * Main navigation structure for the app
 */

import { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppProvider, useApp } from '@/context/AppContext';
import { AppColors } from '@/constants/theme';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'onboarding',
};

// Custom light theme with PackNDocs colors
const PackNDocsLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: AppColors.skyBlue,
    background: AppColors.backgroundPrimary,
    card: AppColors.pureWhite,
    text: AppColors.textPrimary,
    border: '#E5E7EB',
  },
};

// Custom dark theme
const PackNDocsDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: AppColors.skyBlue,
  },
};

// Navigation component that uses the app context
function NavigationLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const { hasOnboarded, targetRegion, isLoading } = useApp();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  // Handle navigation based on app state
  useEffect(() => {
    if (isLoading) return;

    const currentSegment = segments[0];
    const inOnboarding = currentSegment === 'onboarding';
    const inTargetSelect = currentSegment === 'target-select';

    // Only navigate if we're not already in the correct place
    if (!hasOnboarded) {
      // User hasn't completed onboarding
      if (!inOnboarding) {
        router.replace('/onboarding');
      }
    } else if (!targetRegion) {
      // User completed onboarding but hasn't selected region
      if (!inTargetSelect && !inOnboarding) {
        router.replace('/target-select');
      }
    } else {
      // User has completed setup
      if (inOnboarding || inTargetSelect) {
        router.replace('/(tabs)');
      }
    }

    // Hide splash screen once navigation is ready
    if (!isNavigationReady) {
      setIsNavigationReady(true);
      SplashScreen.hideAsync();
    }
  }, [isLoading, hasOnboarded, targetRegion, segments, isNavigationReady]);

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? PackNDocsDarkTheme : PackNDocsLightTheme}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="onboarding"
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="target-select"
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="country/[id]"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="news/[id]"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// Root layout that provides the context
export default function RootLayout() {
  return (
    <AppProvider>
      <NavigationLayout />
    </AppProvider>
  );
}
