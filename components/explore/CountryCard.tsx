/**
 * PackNDocs Country Card Component
 * Display country selection cards in the explore page
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { Country } from '@/types';

interface CountryCardProps {
  country: Country;
  index: number;
  isSelected?: boolean;
  onPress: () => void;
}

export function CountryCard({
  country,
  index,
  isSelected = false,
  onPress,
}: CountryCardProps) {
  return (
    <Animated.View
      entering={FadeInUp.delay(50 + (index % 10) * 50).duration(400)}
      style={styles.cardWrapper}
    >
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Text style={styles.flag}>{country.flag}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {country.nameTr}
        </Text>
        <View
          style={[
            styles.badge,
            country.visaType === 'schengen' && styles.badgeSchengen,
            country.visaType === 'us_visa' && styles.badgeUS,
            country.visaType === 'uk_visa' && styles.badgeUK,
          ]}
        >
          <Text style={styles.badgeText}>
            {country.visaType === 'schengen'
              ? 'Schengen'
              : country.visaType === 'us_visa'
              ? 'ABD'
              : country.visaType === 'uk_visa'
              ? 'UK'
              : 'EU'}
          </Text>
        </View>
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Text style={styles.selectedText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

interface CountryListProps {
  countries: Country[];
  selectedCountryId?: string | null;
  onSelectCountry: (country: Country) => void;
}

export function CountryGrid({
  countries,
  selectedCountryId,
  onSelectCountry,
}: CountryListProps) {
  return (
    <View style={styles.grid}>
      {countries.map((country, index) => (
        <CountryCard
          key={country.id}
          country={country}
          index={index}
          isSelected={country.id === selectedCountryId}
          onPress={() => onSelectCountry(country)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },

  cardWrapper: {
    width: '31%',
  },

  card: {
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
    ...Shadows.small,
  },

  cardSelected: {
    borderWidth: 2,
    borderColor: AppColors.skyBlue,
    backgroundColor: `${AppColors.skyBlue}08`,
  },

  flag: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },

  name: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },

  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.small,
    backgroundColor: `${AppColors.skyBlue}15`,
  },

  badgeSchengen: {
    backgroundColor: `${AppColors.skyBlue}15`,
  },

  badgeUS: {
    backgroundColor: `${AppColors.turkishTurquoise}15`,
  },

  badgeUK: {
    backgroundColor: `${AppColors.amberGold}15`,
  },

  badgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: AppColors.textSecondary,
    textTransform: 'uppercase',
  },

  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: AppColors.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedText: {
    color: AppColors.pureWhite,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default CountryCard;

