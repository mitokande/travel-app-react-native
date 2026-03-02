/**
 * PackNDocs Explore Page
 * Browse and select countries for visa applications
 */

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { CountryGrid } from '@/components/explore/CountryCard';
import { RegionPickerModal } from '@/components/common/RegionPickerModal';
import { CountryDetailModal } from '@/components/home/CountryDetailModal';
import { useApp } from '@/context/AppContext';
import { getCountriesByRegion, targetRegions } from '@/data/countries';
import { getDocumentsByVisaType, getRequiredDocuments } from '@/data/documents';
import { useDocumentProgress } from '@/hooks/useStorage';
import { AppColors, BorderRadius, Spacing } from '@/constants/theme';
import { Country, TargetRegion } from '@/types';

export default function ExploreScreen() {
  const router = useRouter();
  const { targetRegion, selectedCountryId, setTargetRegion, setSelectedCountry } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [showCountryDetail, setShowCountryDetail] = useState(false);
  const [previewCountry, setPreviewCountry] = useState<Country | null>(null);

  const previewCountryId = previewCountry?.id || null;
  const { getCompletedCount } = useDocumentProgress(previewCountryId);

  const previewDocs = useMemo(() => {
    if (!previewCountry) return [];
    return getRequiredDocuments(previewCountry.visaType);
  }, [previewCountry]);

  const previewCompletedCount = getCompletedCount();

  const countries = useMemo(() => {
    if (!targetRegion) return [];
    return getCountriesByRegion(targetRegion);
  }, [targetRegion]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return countries;
    const query = searchQuery.toLowerCase().trim();
    return countries.filter(
      (country) =>
        country.nameTr.toLowerCase().includes(query) ||
        country.name.toLowerCase().includes(query)
    );
  }, [countries, searchQuery]);

  const currentRegion = targetRegions.find((r) => r.id === targetRegion);

  const handleSelectCountry = (country: Country) => {
    setPreviewCountry(country);
    setShowCountryDetail(true);
  };

  const handleCountryDetailContinue = async () => {
    if (!previewCountry) return;

    // If selecting a different country, confirm
    if (selectedCountryId && selectedCountryId !== previewCountry.id) {
      setShowCountryDetail(false);
      Alert.alert(
        'Ülke Değişikliği',
        `${previewCountry.nameTr} için yeni bir başvuru başlatmak istediğinizden emin misiniz? Mevcut ilerlemeniz korunacaktır.`,
        [
          { text: 'İptal', style: 'cancel' },
          {
            text: 'Devam Et',
            onPress: async () => {
              await setSelectedCountry(previewCountry.id);
              router.push(`/country/${previewCountry.id}`);
            },
          },
        ]
      );
    } else {
      await setSelectedCountry(previewCountry.id);
      setShowCountryDetail(false);
      router.push(`/country/${previewCountry.id}`);
    }
  };

  const handleOpenRegionPicker = () => {
    setShowRegionPicker(true);
  };

  const handleRegionSelect = async (region: TargetRegion) => {
    await setTargetRegion(region);
    await setSelectedCountry(null);
    setShowRegionPicker(false);
  };

  if (!targetRegion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🎯</Text>
          <Text style={styles.emptyTitle}>Bölge Seçilmedi</Text>
          <Text style={styles.emptyDescription}>
            Ülkeleri görmek için önce hedef bölgenizi seçin
          </Text>
          <TouchableOpacity style={styles.selectButton} onPress={handleOpenRegionPicker}>
            <Text style={styles.selectButtonText}>Bölge Seç</Text>
          </TouchableOpacity>
        </View>
        
        <RegionPickerModal
          visible={showRegionPicker}
          currentRegion={targetRegion}
          onSelect={handleRegionSelect}
          onClose={() => setShowRegionPicker(false)}
          showWarning={false}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeIn.delay(100)} style={styles.header}>
        <View>
          <Text style={styles.title}>Ülkeleri Keşfet</Text>
          <TouchableOpacity style={styles.regionBadge} onPress={handleOpenRegionPicker}>
            <Text style={styles.regionFlag}>{currentRegion?.flag}</Text>
            <Text style={styles.regionText}>{currentRegion?.nameTr}</Text>
            <Text style={styles.changeText}>Değiştir ▼</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.countryCount}>{filteredCountries.length} ülke</Text>
      </Animated.View>

      {/* Search */}
      <Animated.View entering={FadeInDown.delay(150)} style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Ülke ara..."
            placeholderTextColor={AppColors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Country Grid */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredCountries.length > 0 ? (
          <CountryGrid
            countries={filteredCountries}
            selectedCountryId={selectedCountryId}
            onSelectCountry={handleSelectCountry}
          />
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsIcon}>🔍</Text>
            <Text style={styles.noResultsText}>
              "{searchQuery}" için sonuç bulunamadı
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Region Picker Modal */}
      <RegionPickerModal
        visible={showRegionPicker}
        currentRegion={targetRegion}
        onSelect={handleRegionSelect}
        onClose={() => setShowRegionPicker(false)}
        showWarning={!!selectedCountryId}
      />

      {/* Country Detail Modal */}
      {previewCountry && (
        <CountryDetailModal
          visible={showCountryDetail}
          country={previewCountry}
          completedDocs={previewCompletedCount}
          totalDocs={previewDocs.length}
          onClose={() => setShowCountryDetail(false)}
          onContinue={handleCountryDetailContinue}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgroundSecondary,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.xs,
  },

  regionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },

  regionFlag: {
    fontSize: 16,
  },

  regionText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    fontWeight: '500',
  },

  changeText: {
    fontSize: 12,
    color: AppColors.skyBlue,
    fontWeight: '600',
    marginLeft: Spacing.xs,
  },

  countryCount: {
    fontSize: 14,
    color: AppColors.textMuted,
    fontWeight: '500',
  },

  // Search
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.md,
    height: 48,
    gap: Spacing.sm,
  },

  searchIcon: {
    fontSize: 18,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: AppColors.textPrimary,
  },

  clearIcon: {
    fontSize: 16,
    color: AppColors.textMuted,
    padding: Spacing.xs,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },

  // Empty States
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.sm,
  },

  emptyDescription: {
    fontSize: 15,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },

  selectButton: {
    backgroundColor: AppColors.skyBlue,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
  },

  selectButtonText: {
    color: AppColors.pureWhite,
    fontSize: 16,
    fontWeight: '600',
  },

  // No Results
  noResults: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },

  noResultsIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
    opacity: 0.5,
  },

  noResultsText: {
    fontSize: 15,
    color: AppColors.textMuted,
    textAlign: 'center',
  },
});
