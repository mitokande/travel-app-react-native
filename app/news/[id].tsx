/**
 * PackNDocs News Detail Page
 * Full news article view
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { getNewsById } from '@/data/news';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const news = useMemo(() => {
    if (!id) return null;
    return getNewsById(id);
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  const handleShare = async () => {
    if (!news) return;

    try {
      await Share.share({
        title: news.titleTr,
        message: `${news.titleTr}\n\n${news.contentTr.substring(0, 200)}...\n\nPackNDocs - Vize Başvuru Asistanı`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const categoryColors: Record<string, string> = {
    schengen: AppColors.skyBlue,
    us: AppColors.turkishTurquoise,
    uk: AppColors.amberGold,
    general: AppColors.slateGray,
  };

  if (!news) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorState}>
          <Text style={styles.errorIcon}>❌</Text>
          <Text style={styles.errorTitle}>Haber Bulunamadı</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const categoryColor = categoryColors[news.category] || AppColors.skyBlue;

  // Parse content for markdown-like formatting
  const renderContent = () => {
    const lines = news.contentTr.split('\n');
    return lines.map((line, index) => {
      // Bold headers
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <Text key={index} style={styles.contentHeader}>
            {line.replace(/\*\*/g, '')}
          </Text>
        );
      }
      // List items
      if (line.startsWith('- ')) {
        return (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listBullet}>•</Text>
            <Text style={styles.listText}>{line.substring(2)}</Text>
          </View>
        );
      }
      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        const number = line.match(/^(\d+)\./)?.[1];
        const text = line.replace(/^\d+\.\s/, '');
        return (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listNumber}>{number}.</Text>
            <Text style={styles.listText}>{text}</Text>
          </View>
        );
      }
      // Empty line
      if (line.trim() === '') {
        return <View key={index} style={styles.spacer} />;
      }
      // Regular paragraph
      return (
        <Text key={index} style={styles.contentParagraph}>
          {line}
        </Text>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeIn.delay(100)} style={styles.header}>
        <TouchableOpacity style={styles.backArrow} onPress={handleGoBack}>
          <Text style={styles.backArrowText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareIcon}>📤</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View entering={FadeInDown.delay(150)} style={styles.heroSection}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${categoryColor}15` },
            ]}
          >
            <Text style={styles.icon}>{news.icon}</Text>
          </View>

          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: `${categoryColor}20` },
            ]}
          >
            <Text style={[styles.categoryText, { color: categoryColor }]}>
              {news.category === 'schengen'
                ? 'Schengen'
                : news.category === 'us'
                ? 'ABD'
                : news.category === 'uk'
                ? 'İngiltere'
                : 'Genel'}
            </Text>
          </View>

          <Text style={styles.title}>{news.titleTr}</Text>

          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>{news.date}</Text>
            {news.source && (
              <>
                <Text style={styles.metaDivider}>•</Text>
                <Text style={styles.metaText}>{news.source}</Text>
              </>
            )}
          </View>
        </Animated.View>

        {/* Content */}
        <Animated.View entering={FadeInDown.delay(250)} style={styles.contentCard}>
          {renderContent()}
        </Animated.View>

        {/* Footer */}
        <Animated.View entering={FadeInDown.delay(350)} style={styles.footer}>
          <Text style={styles.footerText}>
            Bu haber bilgilendirme amaçlıdır. Güncel bilgiler için resmi kaynakları kontrol edin.
          </Text>
        </Animated.View>

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

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  backArrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.pureWhite,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },

  backArrowText: {
    fontSize: 22,
    color: AppColors.textPrimary,
  },

  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.pureWhite,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },

  shareIcon: {
    fontSize: 20,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },

  // Hero
  heroSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },

  icon: {
    fontSize: 40,
  },

  categoryBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.md,
  },

  categoryText: {
    fontSize: 13,
    fontWeight: '600',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: AppColors.textPrimary,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: Spacing.md,
  },

  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaText: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },

  metaDivider: {
    fontSize: 14,
    color: AppColors.textMuted,
    marginHorizontal: Spacing.sm,
  },

  // Content
  contentCard: {
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.large,
    padding: Spacing.xl,
    ...Shadows.medium,
  },

  contentHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },

  contentParagraph: {
    fontSize: 15,
    color: AppColors.textPrimary,
    lineHeight: 24,
  },

  listItem: {
    flexDirection: 'row',
    paddingLeft: Spacing.sm,
    marginVertical: 2,
  },

  listBullet: {
    fontSize: 15,
    color: AppColors.skyBlue,
    marginRight: Spacing.sm,
    fontWeight: '700',
  },

  listNumber: {
    fontSize: 15,
    color: AppColors.skyBlue,
    marginRight: Spacing.sm,
    fontWeight: '600',
    minWidth: 20,
  },

  listText: {
    flex: 1,
    fontSize: 15,
    color: AppColors.textPrimary,
    lineHeight: 22,
  },

  spacer: {
    height: Spacing.md,
  },

  // Footer
  footer: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },

  footerText: {
    fontSize: 13,
    color: AppColors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Error
  errorState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },

  errorIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },

  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.xl,
  },

  backButton: {
    backgroundColor: AppColors.skyBlue,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
  },

  backButtonText: {
    color: AppColors.pureWhite,
    fontSize: 16,
    fontWeight: '600',
  },

  bottomSpacing: {
    height: Spacing.xxxl,
  },
});

