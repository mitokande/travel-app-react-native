/**
 * PackNDocs Target Region Selection Screen
 * User selects their target visa region (EU, US, UK)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useApp } from '@/context/AppContext';
import { targetRegions } from '@/data/countries';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { TargetRegion, RegionCard } from '@/types';

interface RegionCardProps {
  region: RegionCard;
  index: number;
  onSelect: (id: TargetRegion) => void;
}

function RegionCardComponent({ region, index, onSelect }: RegionCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(200 + index * 100).duration(500)}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => onSelect(region.id)}
        activeOpacity={0.9}
      >
        <View style={styles.cardContent}>
          <Text style={styles.flag}>{region.flag}</Text>
          <View style={styles.cardText}>
            <Text style={styles.regionName}>{region.nameTr}</Text>
            <Text style={styles.visaType}>{region.visaType}</Text>
          </View>
        </View>
        <View style={styles.arrow}>
          <Text style={styles.arrowText}>→</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function TargetSelectScreen() {
  const router = useRouter();
  const { setTargetRegion } = useApp();

  const handleSelectRegion = async (regionId: TargetRegion) => {
    await setTargetRegion(regionId);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
        <Text style={styles.logo}>PackNDocs</Text>
        <Text style={styles.title}>Hedef Bölgenizi Seçin</Text>
        <Text style={styles.subtitle}>
          Vize başvurusu yapmak istediğiniz bölgeyi seçerek devam edin
        </Text>
      </Animated.View>

      {/* Region Cards */}
      <View style={styles.cardsContainer}>
        {targetRegions.map((region, index) => (
          <RegionCardComponent
            key={region.id}
            region={region}
            index={index}
            onSelect={handleSelectRegion}
          />
        ))}
      </View>

      {/* Footer */}
      <Animated.View entering={FadeInUp.delay(600)} style={styles.footer}>
        <Text style={styles.footerText}>
          Seçiminizi daha sonra değiştirebilirsiniz
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgroundSecondary,
  },

  header: {
    alignItems: 'center',
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.xxl,
  },

  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: AppColors.skyBlue,
    letterSpacing: -0.5,
    marginBottom: Spacing.xl,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: AppColors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  subtitle: {
    fontSize: 15,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  cardsContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },

  card: {
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.medium,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },

  flag: {
    fontSize: 48,
  },

  cardText: {
    gap: Spacing.xs,
  },

  regionName: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  visaType: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },

  arrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowText: {
    color: AppColors.pureWhite,
    fontSize: 20,
    fontWeight: '600',
  },

  footer: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 13,
    color: AppColors.textMuted,
    textAlign: 'center',
  },
});
