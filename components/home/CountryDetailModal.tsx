/**
 * PackNDocs Country Detail Modal
 * Bottom sheet modal showing detailed country/visa information
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { Country } from '@/types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CountryDetailModalProps {
  visible: boolean;
  country: Country;
  completedDocs: number;
  totalDocs: number;
  onClose: () => void;
  onContinue: () => void;
}

export function CountryDetailModal({
  visible,
  country,
  completedDocs,
  totalDocs,
  onClose,
  onContinue,
}: CountryDetailModalProps) {
  const progress = totalDocs > 0 ? (completedDocs / totalDocs) * 100 : 0;
  const isComplete = progress === 100;

  const visaTypeLabel =
    country.visaType === 'schengen'
      ? 'Schengen Vizesi'
      : country.visaType === 'us_visa'
      ? 'ABD Vizesi'
      : country.visaType === 'uk_visa'
      ? 'İngiltere Vizesi'
      : 'AB Vizesi';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View entering={FadeIn.duration(200)} style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouch} onPress={onClose} activeOpacity={1} />

        <Animated.View entering={SlideInDown.duration(350).springify()} style={styles.sheet}>
          {/* Handle Bar */}
          <View style={styles.handleBar} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={false}
          >
            {/* Country Header */}
            <View style={styles.header}>
              <Text style={styles.flag}>{country.flag}</Text>
              <View style={styles.headerInfo}>
                <Text style={styles.countryName}>{country.nameTr}</Text>
                <Text style={styles.countryNameEn}>{country.name}</Text>
              </View>
              <View style={styles.visaBadge}>
                <Text style={styles.visaBadgeText}>{visaTypeLabel}</Text>
              </View>
            </View>

            {/* Progress Section */}
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Belge Durumu</Text>
                <Text style={[styles.progressCount, isComplete && styles.progressCountComplete]}>
                  {completedDocs}/{totalDocs}
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
              <Text style={styles.progressText}>
                {isComplete
                  ? 'Tum zorunlu belgeler hazir!'
                  : `%${Math.round(progress)} tamamlandi`}
              </Text>
            </View>

            {/* Quick Info Grid */}
            <View style={styles.infoGrid}>
              {country.visaFee && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoIcon}>💰</Text>
                  <Text style={styles.infoLabel}>Vize Ucreti</Text>
                  <Text style={styles.infoValue}>{country.visaFee}</Text>
                </View>
              )}
              {country.processingTime && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoIcon}>⏱️</Text>
                  <Text style={styles.infoLabel}>Islem Suresi</Text>
                  <Text style={styles.infoValue}>{country.processingTime}</Text>
                </View>
              )}
              {country.visaValidity && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoIcon}>📅</Text>
                  <Text style={styles.infoLabel}>Vize Gecerliligi</Text>
                  <Text style={styles.infoValue}>{country.visaValidity}</Text>
                </View>
              )}
              {country.currency && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoIcon}>💱</Text>
                  <Text style={styles.infoLabel}>Para Birimi</Text>
                  <Text style={styles.infoValue}>{country.currency}</Text>
                </View>
              )}
            </View>

            {/* Country Details */}
            <View style={styles.detailsSection}>
              {country.capital && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Baskent</Text>
                  <Text style={styles.detailValue}>{country.capital}</Text>
                </View>
              )}
              {country.language && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Resmi Dil</Text>
                  <Text style={styles.detailValue}>{country.language}</Text>
                </View>
              )}
            </View>

            {/* Embassy Info */}
            {country.embassyInfo && (
              <View style={styles.embassyCard}>
                <Text style={styles.embassyTitle}>Basvuru Merkezi</Text>
                <Text style={styles.embassyText}>{country.embassyInfo}</Text>
              </View>
            )}

            {/* Tips */}
            {country.tips && country.tips.length > 0 && (
              <View style={styles.tipsSection}>
                <Text style={styles.tipsTitle}>Onemli Ipuclari</Text>
                {country.tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Text style={styles.tipBullet}>•</Text>
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* General Info */}
            {country.generalInfo && (
              <View style={styles.generalInfoCard}>
                <Text style={styles.generalInfoTitle}>Genel Bilgi</Text>
                <Text style={styles.generalInfoText}>{country.generalInfo}</Text>
              </View>
            )}

            {/* Action Button */}
            <TouchableOpacity
              style={[styles.continueButton, isComplete && styles.continueButtonComplete]}
              onPress={onContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>
                {isComplete ? 'Basvuru Hazir - Belgeleri Gor' : 'Belge Hazirligina Devam Et'}
              </Text>
            </TouchableOpacity>

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  overlayTouch: {
    flex: 1,
  },

  sheet: {
    backgroundColor: AppColors.pureWhite,
    borderTopLeftRadius: BorderRadius.extraLarge,
    borderTopRightRadius: BorderRadius.extraLarge,
    maxHeight: SCREEN_HEIGHT * 0.85,
    paddingTop: Spacing.md,
  },

  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: AppColors.softGray,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },

  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },

  flag: {
    fontSize: 48,
  },

  headerInfo: {
    flex: 1,
  },

  countryName: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },

  countryNameEn: {
    fontSize: 14,
    color: AppColors.textMuted,
    marginTop: 2,
  },

  visaBadge: {
    backgroundColor: `${AppColors.skyBlue}15`,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
  },

  visaBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: AppColors.skyBlue,
  },

  // Progress
  progressCard: {
    backgroundColor: AppColors.backgroundSecondary,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  progressTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  progressCount: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.skyBlue,
  },

  progressCountComplete: {
    color: AppColors.turkishTurquoise,
  },

  progressBarContainer: {
    height: 8,
    backgroundColor: AppColors.pureWhite,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },

  progressBar: {
    height: '100%',
    backgroundColor: AppColors.skyBlue,
    borderRadius: 4,
  },

  progressBarComplete: {
    backgroundColor: AppColors.turkishTurquoise,
  },

  progressText: {
    fontSize: 13,
    color: AppColors.textSecondary,
    textAlign: 'center',
  },

  // Info Grid
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },

  infoItem: {
    width: '48%',
    backgroundColor: AppColors.backgroundSecondary,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    alignItems: 'center',
  },

  infoIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },

  infoLabel: {
    fontSize: 11,
    color: AppColors.textMuted,
    fontWeight: '500',
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 13,
    color: AppColors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Details
  detailsSection: {
    backgroundColor: AppColors.backgroundSecondary,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.pureWhite,
  },

  detailLabel: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },

  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },

  // Embassy
  embassyCard: {
    backgroundColor: `${AppColors.skyBlue}08`,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.skyBlue,
  },

  embassyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: Spacing.sm,
  },

  embassyText: {
    fontSize: 13,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },

  // Tips
  tipsSection: {
    marginBottom: Spacing.lg,
  },

  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.md,
  },

  tipItem: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },

  tipBullet: {
    fontSize: 14,
    color: AppColors.skyBlue,
    fontWeight: '700',
    marginTop: 1,
  },

  tipText: {
    flex: 1,
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },

  // General Info
  generalInfoCard: {
    backgroundColor: AppColors.backgroundSecondary,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },

  generalInfoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: Spacing.sm,
  },

  generalInfoText: {
    fontSize: 13,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },

  // Action
  continueButton: {
    backgroundColor: AppColors.skyBlue,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    ...Shadows.small,
  },

  continueButtonComplete: {
    backgroundColor: AppColors.turkishTurquoise,
  },

  continueButtonText: {
    color: AppColors.pureWhite,
    fontSize: 16,
    fontWeight: '700',
  },

  bottomSpacing: {
    height: Spacing.xxxl,
  },
});
