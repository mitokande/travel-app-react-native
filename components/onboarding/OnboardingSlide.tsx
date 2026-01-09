/**
 * PackNDocs Onboarding Slide Component
 * Individual slide for the onboarding experience
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { AppColors, BorderRadius, Spacing } from '@/constants/theme';
import { OnboardingSlide as SlideData } from '@/types';

const { width } = Dimensions.get('window');

interface OnboardingSlideProps {
  slide: SlideData;
  index: number;
}

export function OnboardingSlide({ slide, index }: OnboardingSlideProps) {
  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.delay(index * 100).duration(600)}
        style={styles.iconContainer}
      >
        <Text style={styles.icon}>{slide.icon}</Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(200 + index * 100).duration(600)}
        style={styles.textContainer}
      >
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </Animated.View>
    </View>
  );
}

// Pagination dots component
interface PaginationDotsProps {
  total: number;
  current: number;
}

export function PaginationDots({ total, current }: PaginationDotsProps) {
  return (
    <View style={styles.dotsContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            index === current && styles.dotActive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },

  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: `${AppColors.skyBlue}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxxl,
  },

  icon: {
    fontSize: 80,
  },

  textContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: AppColors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 36,
  },

  description: {
    fontSize: 16,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },

  // Pagination dots
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginVertical: Spacing.xl,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.textMuted,
  },

  dotActive: {
    width: 24,
    backgroundColor: AppColors.skyBlue,
  },
});

export default OnboardingSlide;

