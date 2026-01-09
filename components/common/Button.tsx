/**
 * PackNDocs Button Component
 * Reusable button with multiple variants
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppColors, BorderRadius, Spacing } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    isDisabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? AppColors.skyBlue : AppColors.pureWhite}
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={textStyles}>{title}</Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.medium,
    gap: Spacing.sm,
  },

  // Variants
  primary: {
    backgroundColor: AppColors.skyBlue,
  },
  secondary: {
    backgroundColor: AppColors.turkishTurquoise,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: AppColors.skyBlue,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Sizes
  smallSize: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },
  mediumSize: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 48,
  },
  largeSize: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },

  // States
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },

  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: AppColors.pureWhite,
  },
  secondaryText: {
    color: AppColors.pureWhite,
  },
  outlineText: {
    color: AppColors.skyBlue,
  },
  ghostText: {
    color: AppColors.skyBlue,
  },

  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  disabledText: {
    opacity: 0.7,
  },
});

export default Button;

