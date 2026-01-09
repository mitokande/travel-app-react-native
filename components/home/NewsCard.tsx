/**
 * PackNDocs News Card Component
 * Displays visa news items on home dashboard
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { NewsItem } from '@/types';

interface NewsCardProps {
  news: NewsItem;
  index: number;
}

export function NewsCard({ news, index }: NewsCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/news/${news.id}`);
  };

  return (
    <Animated.View entering={FadeInRight.delay(300 + index * 100).duration(500)}>
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{news.icon || '📰'}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {news.titleTr}
          </Text>
          <Text style={styles.date}>{news.date}</Text>
        </View>
        <View style={styles.arrow}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

interface NewsSectionProps {
  news: NewsItem[];
}

export function NewsSection({ news }: NewsSectionProps) {
  const router = useRouter();

  if (news.length === 0) return null;

  const handleSeeAll = () => {
    router.push('/(tabs)/news');
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Vize Haberleri</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.seeAllText}>Tümünü Gör →</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newsList}>
        {news.map((item, index) => (
          <NewsCard key={item.id} news={item} index={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: Spacing.xl,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },

  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.skyBlue,
  },

  newsList: {
    gap: Spacing.sm,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadows.small,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.medium,
    backgroundColor: `${AppColors.skyBlue}10`,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 22,
  },

  content: {
    flex: 1,
    gap: 2,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.textPrimary,
    lineHeight: 20,
  },

  date: {
    fontSize: 12,
    color: AppColors.textMuted,
  },

  arrow: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowText: {
    fontSize: 20,
    color: AppColors.textMuted,
    fontWeight: '300',
  },
});

export default NewsCard;
