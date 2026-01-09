/**
 * PackNDocs Theme Configuration
 * Color palette and design tokens based on PRD specifications
 */

import { Platform } from 'react-native';

// PRD Color Palette
export const AppColors = {
  // Primary Colors
  royalBlue: '#3C4F50',
  skyBlue: '#3B82F6',
  turkishTurquoise: '#14B8A6',
  amberGold: '#7F8D39',
  
  // Neutral Colors
  softGray: '#F3F4F6',
  slateGray: '#374151',
  pureWhite: '#FFFFFF',
  
  // Additional UI Colors
  error: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  
  // Text Colors
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  
  // Background Colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',
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
const tintColorLight = AppColors.skyBlue;
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: AppColors.textPrimary,
    background: AppColors.backgroundPrimary,
    tint: tintColorLight,
    icon: AppColors.slateGray,
    tabIconDefault: AppColors.textSecondary,
    tabIconSelected: tintColorLight,
    card: AppColors.pureWhite,
    border: '#E5E7EB',
    primary: AppColors.skyBlue,
    secondary: AppColors.turkishTurquoise,
    accent: AppColors.amberGold,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    card: '#1E2022',
    border: '#2D3134',
    primary: AppColors.skyBlue,
    secondary: AppColors.turkishTurquoise,
    accent: AppColors.amberGold,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
