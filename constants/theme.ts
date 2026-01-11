/**
 * PackNDocs Theme Configuration
 * Color palette and design tokens - Tom Thumb Green Theme
 */

import { Platform } from 'react-native';

// Tom Thumb Green Palette
export const TomThumb = {
  50: '#f5f8f5',
  100: '#e7f1e9',
  200: '#d0e2d3',
  300: '#abcab0',
  400: '#7eaa86',
  500: '#5c8b65',
  600: '#487150',
  700: '#3a5940',
  800: '#324937',
  900: '#2a3d2f',
  950: '#132016',
};

// App Color Palette based on Tom Thumb
export const AppColors = {
  // Primary Colors (Tom Thumb based)
  primary: TomThumb[600],
  primaryLight: TomThumb[400],
  primaryDark: TomThumb[700],
  
  // Secondary / Accent
  secondary: TomThumb[500],
  accent: TomThumb[400],
  
  // Legacy names for compatibility
  royalBlue: TomThumb[700],
  skyBlue: TomThumb[500],
  turkishTurquoise: TomThumb[400],
  amberGold: '#B8860B', // Keep gold for special accents
  
  // Neutral Colors
  softGray: TomThumb[100],
  slateGray: TomThumb[800],
  pureWhite: '#FFFFFF',
  
  // Status Colors
  error: '#DC2626',
  success: TomThumb[500],
  warning: '#F59E0B',
  
  // Text Colors
  textPrimary: TomThumb[900],
  textSecondary: TomThumb[600],
  textMuted: TomThumb[400],
  
  // Background Colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: TomThumb[50],
  backgroundTertiary: TomThumb[100],
  
  // Card backgrounds
  cardLight: TomThumb[50],
  cardAccent: TomThumb[100],
};

// Border Radius Standards from PRD
export const BorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 20,
  xxl: 32,
};

// Spacing Scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Light/Dark theme colors for React Navigation
const tintColorLight = TomThumb[500];
const tintColorDark = TomThumb[300];

export const Colors = {
  light: {
    text: TomThumb[900],
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: TomThumb[600],
    tabIconDefault: TomThumb[400],
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: TomThumb[200],
    primary: TomThumb[500],
    secondary: TomThumb[400],
    accent: TomThumb[600],
  },
  dark: {
    text: TomThumb[100],
    background: TomThumb[950],
    tint: tintColorDark,
    icon: TomThumb[400],
    tabIconDefault: TomThumb[500],
    tabIconSelected: tintColorDark,
    card: TomThumb[900],
    border: TomThumb[800],
    primary: TomThumb[400],
    secondary: TomThumb[500],
    accent: TomThumb[300],
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Shadow styles
export const Shadows = {
  small: {
    shadowColor: TomThumb[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: TomThumb[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: TomThumb[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
