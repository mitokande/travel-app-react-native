/**
 * PackNDocs News Page
 * Visa news list with category filtering
 */

import React, { useState, useMemo } from 'react';
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
import Animated, { FadeIn, FadeInDown, FadeInRight } from 'react-native-reanimated';
import { getAllNews, NewsItemFull } from '@/data/news';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';

type NewsCategory = 'all' | 'schengen' | 'us' | 'uk' | 'general';

interface CategoryFilterProps {
  selected: NewsCategory;
  onSelect: (category: NewsCategory) => void;
}

const categories: { id: NewsCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Tümü', icon: '📰' },
  { id: 'schengen', label: 'Schengen', icon: '🇪🇺' },
  { id: 'us', label: 'ABD', icon: '🇺🇸' },
  { id: 'uk', label: 'İngiltere', icon: '🇬🇧' },
];

function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      {categories.map((category, index) => (
        <Animated.View
          key={category.id}
          entering={FadeInRight.delay(100 + index * 50).duration(400)}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              selected === category.id && styles.filterChipActive,
            ]}
            onPress={() => onSelect(category.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.filterIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.filterText,
                selected === category.id && styles.filterTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

interface NewsListItemProps {
  news: NewsItemFull;
  index: number;
  onPress: () => void;
}

function NewsListItem({ news, index, onPress }: NewsListItemProps) {
  const categoryColors: Record<string, string> = {
    schengen: AppColors.skyBlue,
    us: AppColors.turkishTurquoise,
    uk: AppColors.amberGold,
    general: AppColors.slateGray,
  };

  return (
    <Animated.View entering={FadeInDown.delay(150 + index * 75).duration(400)}>
      <TouchableOpacity
        style={styles.newsCard}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={styles.newsHeader}>
          <View
            style={[
              styles.newsIconContainer,
              { backgroundColor: `${categoryColors[news.category] || AppColors.skyBlue}15` },
            ]}
          >
            <Text style={styles.newsIcon}>{news.icon}</Text>
          </View>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: `${categoryColors[news.category] || AppColors.skyBlue}20` },
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                { color: categoryColors[news.category] || AppColors.skyBlue },
              ]}
            >
              {news.category === 'schengen'
                ? 'Schengen'
                : news.category === 'us'
                ? 'ABD'
                : news.category === 'uk'
                ? 'İngiltere'
                : 'Genel'}
            </Text>
          </View>
        </View>

        <Text style={styles.newsTitle}>{news.titleTr}</Text>

        <View style={styles.newsFooter}>
          <Text style={styles.newsDate}>{news.date}</Text>
          {news.source && (
            <Text style={styles.newsSource}>• {news.source}</Text>
          )}
        </View>

        <View style={styles.readMoreContainer}>
          <Text style={styles.readMoreText}>Devamını Oku →</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function NewsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [refreshing, setRefreshing] = useState(false);

  const allNews = getAllNews();

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') return allNews;
    return allNews.filter((news) => news.category === selectedCategory);
  }, [allNews, selectedCategory]);

  const handleNewsPress = (newsId: string) => {
    router.push(`/news/${newsId}`);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeIn.delay(100)} style={styles.header}>
        <Text style={styles.title}>Vize Haberleri</Text>
        <Text style={styles.subtitle}>
          Güncel vize gelişmeleri ve duyurular
        </Text>
      </Animated.View>

      {/* Category Filter */}
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* News List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredNews.length > 0 ? (
          filteredNews.map((news, index) => (
            <NewsListItem
              key={news.id}
              news={news}
              index={index}
              onPress={() => handleNewsPress(news.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>Bu kategoride haber bulunamadı</Text>
          </View>
        )}

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

  subtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },

  // Filter
  filterContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },

  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.pureWhite,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.large,
    marginRight: Spacing.sm,
    gap: Spacing.xs,
    ...Shadows.small,
  },

  filterChipActive: {
    backgroundColor: AppColors.skyBlue,
  },

  filterIcon: {
    fontSize: 16,
  },

  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  filterTextActive: {
    color: AppColors.pureWhite,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },

  // News Card
  newsCard: {
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },

  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  newsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },

  newsIcon: {
    fontSize: 24,
  },

  categoryBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },

  newsTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: AppColors.textPrimary,
    lineHeight: 24,
    marginBottom: Spacing.sm,
  },

  newsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  newsDate: {
    fontSize: 13,
    color: AppColors.textMuted,
  },

  newsSource: {
    fontSize: 13,
    color: AppColors.textMuted,
    marginLeft: Spacing.xs,
  },

  readMoreContainer: {
    borderTopWidth: 1,
    borderTopColor: AppColors.softGray,
    paddingTop: Spacing.md,
  },

  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.skyBlue,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
    opacity: 0.5,
  },

  emptyText: {
    fontSize: 15,
    color: AppColors.textMuted,
    textAlign: 'center',
  },

  bottomSpacing: {
    height: Spacing.xxxl,
  },
});

