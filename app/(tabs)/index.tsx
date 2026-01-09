/**
 * PackNDocs Home Dashboard
 * Main landing page showing user progress and news
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ProgressCard, EmptyProgressCard } from '@/components/home/ProgressCard';
import { NewsSection } from '@/components/home/NewsCard';
import { useApp } from '@/context/AppContext';
import { useDocumentProgress } from '@/hooks/useStorage';
import { getCountryById } from '@/data/countries';
import { getDocumentsByVisaType } from '@/data/documents';
import { getLatestNews } from '@/data/news';
import { AppColors, BorderRadius, Spacing } from '@/constants/theme';
import { targetRegions } from '@/data/countries';

export default function HomeScreen() {
  const router = useRouter();
  const { targetRegion, selectedCountryId } = useApp();
  const { getCompletedCount } = useDocumentProgress(selectedCountryId);
  const [refreshing, setRefreshing] = useState(false);

  const selectedCountry = selectedCountryId ? getCountryById(selectedCountryId) : null;
  const documents = selectedCountry
    ? getDocumentsByVisaType(selectedCountry.visaType)
    : [];
  const completedCount = getCompletedCount();
  const news = getLatestNews(3);

  const currentRegion = targetRegions.find((r) => r.id === targetRegion);

  const handleContinue = () => {
    if (selectedCountryId) {
      router.push(`/country/${selectedCountryId}`);
    }
  };

  const handleExplore = () => {
    router.push('/(tabs)/explore');
  };

  const handleChangeRegion = () => {
    router.push('/target-select');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <Animated.View entering={FadeIn.delay(100)} style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logo}>PackNDocs</Text>
            <TouchableOpacity
              style={styles.regionBadge}
              onPress={handleChangeRegion}
            >
              <Text style={styles.regionFlag}>{currentRegion?.flag || '🌍'}</Text>
              <Text style={styles.regionText}>{currentRegion?.nameTr || 'Seçilmedi'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.avatarButton} onPress={handleSettings}>
            <Text style={styles.avatarText}>👤</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Greeting */}
        <Animated.View entering={FadeInDown.delay(150)} style={styles.greeting}>
          <Text style={styles.greetingText}>Merhaba! 👋</Text>
          <Text style={styles.greetingSubtext}>
            {selectedCountry
              ? 'Vize başvurunuzun durumunu takip edin'
              : 'Vize başvurunuza başlamak için ülke seçin'}
          </Text>
        </Animated.View>

        {/* Progress Card */}
        <View style={styles.progressSection}>
          {selectedCountry ? (
            <ProgressCard
              country={selectedCountry}
              completedDocs={completedCount}
              totalDocs={documents.filter((d) => d.required).length}
              onContinue={handleContinue}
            />
          ) : (
            <EmptyProgressCard onExplore={handleExplore} />
          )}
        </View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={handleExplore}>
              <Text style={styles.actionIcon}>🌍</Text>
              <Text style={styles.actionText}>Ülkeleri Keşfet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={handleContinue}
              disabled={!selectedCountry}
            >
              <Text style={styles.actionIcon}>📋</Text>
              <Text style={styles.actionText}>Belgelerim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={handleSettings}>
              <Text style={styles.actionIcon}>⚙️</Text>
              <Text style={styles.actionText}>Ayarlar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={handleChangeRegion}>
              <Text style={styles.actionIcon}>🎯</Text>
              <Text style={styles.actionText}>Bölge Değiştir</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* News Section */}
        <NewsSection news={news} />

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgroundSecondary,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  headerLeft: {
    gap: Spacing.sm,
  },

  logo: {
    fontSize: 26,
    fontWeight: '800',
    color: AppColors.skyBlue,
    letterSpacing: -0.5,
  },

  regionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.pureWhite,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.medium,
    gap: Spacing.xs,
  },

  regionFlag: {
    fontSize: 16,
  },

  regionText: {
    fontSize: 13,
    color: AppColors.textSecondary,
    fontWeight: '500',
  },

  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.pureWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 22,
  },

  // Greeting
  greeting: {
    marginBottom: Spacing.lg,
  },

  greetingText: {
    fontSize: 28,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.xs,
  },

  greetingSubtext: {
    fontSize: 15,
    color: AppColors.textSecondary,
    lineHeight: 22,
  },

  // Progress
  progressSection: {
    marginBottom: Spacing.xl,
  },

  // Quick Actions
  quickActions: {
    marginBottom: Spacing.lg,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.md,
  },

  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },

  actionCard: {
    width: '48%',
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },

  actionIcon: {
    fontSize: 28,
  },

  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: AppColors.textPrimary,
    textAlign: 'center',
  },

  bottomSpacing: {
    height: Spacing.xxxl,
  },
});
