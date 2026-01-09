/**
 * PackNDocs Progress Card Component
 * Shows visa application progress on home dashboard
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { Country } from '@/types';

interface ProgressCardProps {
  country: Country;
  completedDocs: number;
  totalDocs: number;
  onContinue: () => void;
}

export function ProgressCard({
  country,
  completedDocs,
  totalDocs,
  onContinue,
}: ProgressCardProps) {
  const progress = totalDocs > 0 ? (completedDocs / totalDocs) * 100 : 0;
  const isComplete = progress === 100;

  return (
    <Animated.View entering={FadeInDown.delay(200).duration(500)}>
      <TouchableOpacity
        style={styles.card}
        onPress={onContinue}
        activeOpacity={0.95}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.countryInfo}>
            <Text style={styles.flag}>{country.flag}</Text>
            <View>
              <Text style={styles.countryName}>{country.nameTr}</Text>
              <Text style={styles.visaType}>
                {country.visaType === 'schengen'
                  ? 'Schengen Vizesi'
                  : country.visaType === 'us_visa'
                  ? 'ABD Vizesi'
                  : 'İngiltere Vizesi'}
              </Text>
            </View>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Aktif</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Belge Hazırlık Durumu</Text>
            <Text style={styles.progressText}>
              {completedDocs}/{totalDocs} belge
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${progress}%` },
                isComplete && styles.progressBarComplete,
              ]}
            />
          </View>
          <Text style={styles.progressPercentage}>%{Math.round(progress)}</Text>
        </View>

        {/* Action */}
        <View style={styles.actionContainer}>
          <View style={styles.continueButton}>
            <Text style={styles.continueText}>
              {isComplete ? 'Başvuru Hazır ✓' : 'Devam Et →'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

interface EmptyProgressCardProps {
  onExplore: () => void;
}

export function EmptyProgressCard({ onExplore }: EmptyProgressCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(200).duration(500)}>
      <TouchableOpacity
        style={[styles.card, styles.emptyCard]}
        onPress={onExplore}
        activeOpacity={0.9}
      >
        <Text style={styles.emptyIcon}>🌍</Text>
        <Text style={styles.emptyTitle}>Ülke Seçin</Text>
        <Text style={styles.emptyDescription}>
          Vize başvurusu yapmak istediğiniz ülkeyi seçerek belge hazırlığına
          başlayın
        </Text>
        <View style={styles.exploreButton}>
          <Text style={styles.exploreText}>Ülkeleri Keşfet →</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    ...Shadows.medium,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },

  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },

  flag: {
    fontSize: 40,
  },

  countryName: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },

  visaType: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginTop: 2,
  },

  badge: {
    backgroundColor: `${AppColors.turkishTurquoise}20`,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
  },

  badgeText: {
    color: AppColors.turkishTurquoise,
    fontSize: 12,
    fontWeight: '600',
  },

  progressSection: {
    marginBottom: Spacing.lg,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  progressLabel: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },

  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  progressBarContainer: {
    height: 8,
    backgroundColor: AppColors.softGray,
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    backgroundColor: AppColors.skyBlue,
    borderRadius: 4,
  },

  progressBarComplete: {
    backgroundColor: AppColors.turkishTurquoise,
  },

  progressPercentage: {
    fontSize: 12,
    color: AppColors.textMuted,
    marginTop: Spacing.xs,
    textAlign: 'right',
  },

  actionContainer: {
    alignItems: 'flex-end',
  },

  continueButton: {
    backgroundColor: AppColors.skyBlue,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
  },

  continueText: {
    color: AppColors.pureWhite,
    fontSize: 14,
    fontWeight: '600',
  },

  // Empty state
  emptyCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    borderWidth: 2,
    borderColor: AppColors.softGray,
    borderStyle: 'dashed',
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.sm,
  },

  emptyDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },

  exploreButton: {
    backgroundColor: AppColors.skyBlue,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
  },

  exploreText: {
    color: AppColors.pureWhite,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProgressCard;

