/**
 * PackNDocs Onboarding Screen
 * Visual card-based introduction with floating country cards
 */

import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useApp } from '@/context/AppContext';
import { AppColors, TomThumb, BorderRadius, Shadows, Spacing } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

// Onboarding slides data
const slides = [
  {
    id: '1',
    title: 'Tüm Belgeler Tek Yerde',
    description: 'Vize başvurunuz için gerekli tüm belgeleri tek bir uygulamada takip edin.',
    cards: [
      { flag: '🇩🇪', country: 'Almanya', type: 'Schengen', color: TomThumb[100] },
      { flag: '🇫🇷', country: 'Fransa', type: 'Schengen', color: TomThumb[200] },
      { flag: '🇮🇹', country: 'İtalya', type: 'Schengen', color: TomThumb[100] },
    ],
  },
  {
    id: '2',
    title: 'Kişiselleştirilmiş Rehber',
    description: 'Hedef ülkenize göre özelleştirilmiş belge listesi ve başvuru rehberi.',
    cards: [
      { flag: '🇺🇸', country: 'ABD', type: 'US Visa', color: '#FFF5E5' },
      { flag: '🇬🇧', country: 'İngiltere', type: 'UK Visa', color: TomThumb[100] },
      { flag: '🇪🇺', country: 'Avrupa Birliği', type: 'Schengen', color: TomThumb[200] },
    ],
  },
  {
    id: '3',
    title: 'İlerlemenizi Takip Edin',
    description: 'Belge hazırlık sürecinizi adım adım takip edin, hiçbir şeyi kaçırmayın.',
    cards: [
      { flag: '🇪🇸', country: 'İspanya', type: 'Schengen', color: TomThumb[200] },
      { flag: '🇳🇱', country: 'Hollanda', type: 'Schengen', color: TomThumb[100] },
      { flag: '🇵🇹', country: 'Portekiz', type: 'Schengen', color: TomThumb[200] },
    ],
  },
];

interface FloatingCardsProps {
  cards: typeof slides[0]['cards'];
  isActive: boolean;
}

function FloatingCards({ cards, isActive }: FloatingCardsProps) {
  // Floating animation values
  const float1 = useSharedValue(0);
  const float2 = useSharedValue(0);
  const float3 = useSharedValue(0);

  React.useEffect(() => {
    if (isActive) {
      float1.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 2000 }),
          withTiming(8, { duration: 2000 })
        ),
        -1,
        true
      );
      float2.value = withDelay(
        300,
        withRepeat(
          withSequence(
            withTiming(10, { duration: 2200 }),
            withTiming(-10, { duration: 2200 })
          ),
          -1,
          true
        )
      );
      float3.value = withDelay(
        600,
        withRepeat(
          withSequence(
            withTiming(-6, { duration: 1800 }),
            withTiming(6, { duration: 1800 })
          ),
          -1,
          true
        )
      );
    }
  }, [isActive]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: float1.value }, { rotate: '-8deg' }],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: float2.value }, { rotate: '5deg' }],
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{ translateY: float3.value }, { rotate: '-3deg' }],
  }));

  return (
    <View style={styles.cardsContainer}>
      {/* Left Card */}
      <Animated.View
        entering={FadeInLeft.delay(200).duration(600)}
        style={[styles.floatingCard, styles.cardLeft, animatedStyle1]}
      >
        <View style={[styles.cardInner, { backgroundColor: cards[0].color }]}>
          <Text style={styles.cardFlag}>{cards[0].flag}</Text>
          <Text style={styles.cardCountry}>{cards[0].country}</Text>
          <View style={styles.cardBadge}>
            <Text style={styles.cardBadgeText}>{cards[0].type}</Text>
          </View>
        </View>
      </Animated.View>

      {/* Center Card (Main) */}
      <Animated.View
        entering={FadeInUp.delay(100).duration(600)}
        style={[styles.floatingCard, styles.cardCenter, animatedStyle2]}
      >
        <View style={[styles.cardInner, styles.cardInnerMain, { backgroundColor: cards[1].color }]}>
          <Text style={styles.cardFlagMain}>{cards[1].flag}</Text>
          <Text style={styles.cardCountryMain}>{cards[1].country}</Text>
          <View style={[styles.cardBadge, styles.cardBadgeMain]}>
            <Text style={styles.cardBadgeTextMain}>{cards[1].type}</Text>
          </View>
          <View style={styles.cardAction}>
            <Text style={styles.cardActionText}>Başvur →</Text>
          </View>
        </View>
      </Animated.View>

      {/* Right Card */}
      <Animated.View
        entering={FadeInRight.delay(300).duration(600)}
        style={[styles.floatingCard, styles.cardRight, animatedStyle3]}
      >
        <View style={[styles.cardInner, { backgroundColor: cards[2].color }]}>
          <Text style={styles.cardFlag}>{cards[2].flag}</Text>
          <Text style={styles.cardCountry}>{cards[2].country}</Text>
          <View style={styles.cardBadge}>
            <Text style={styles.cardBadgeText}>{cards[2].type}</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

function PaginationDots({ total, current }: { total: number; current: number }) {
  return (
    <View style={styles.dotsContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <View
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

export default function OnboardingScreen() {
  const router = useRouter();
  const { setHasOnboarded } = useApp();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    await setHasOnboarded(true);
    router.replace('/target-select');
  };

  const handleSkip = () => {
    handleComplete();
  };

  const isLastSlide = currentIndex === slides.length - 1;

  const renderSlide = ({ item, index }: { item: typeof slides[0]; index: number }) => (
    <View style={styles.slide}>
      {/* Cards Area */}
      <View style={styles.cardsArea}>
        <FloatingCards cards={item.cards} isActive={index === currentIndex} />
      </View>

      {/* Content Area */}
      <View style={styles.contentArea}>
        <Animated.Text
          entering={FadeInDown.delay(400).duration(500)}
          style={styles.title}
        >
          {item.title}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(500).duration(500)}
          style={styles.description}
        >
          {item.description}
        </Animated.Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.blob, styles.blob1]} />
        <View style={[styles.blob, styles.blob2]} />
        <View style={[styles.blob, styles.blob3]} />
      </View>

      {/* Header */}
      <Animated.View entering={FadeIn.delay(100)} style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>✈️</Text>
          <Text style={styles.logoText}>PackNDocs</Text>
        </View>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Atla</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Footer */}
      <Animated.View entering={FadeInUp.delay(600)} style={styles.footer}>
        {/* Pagination */}
        <PaginationDots total={slides.length} current={currentIndex} />

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.9}
        >
          <Text style={styles.nextButtonText}>
            {isLastSlide ? '✓' : '→'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TomThumb[50],
  },

  // Background
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },

  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.5,
  },

  blob1: {
    width: 300,
    height: 300,
    backgroundColor: TomThumb[200],
    top: -50,
    left: -100,
  },

  blob2: {
    width: 250,
    height: 250,
    backgroundColor: TomThumb[300],
    top: height * 0.3,
    right: -80,
  },

  blob3: {
    width: 200,
    height: 200,
    backgroundColor: TomThumb[100],
    bottom: 100,
    left: -50,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    zIndex: 10,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },

  logoIcon: {
    fontSize: 24,
  },

  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: TomThumb[800],
  },

  skipButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: BorderRadius.large,
  },

  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: TomThumb[600],
  },

  // Slide
  slide: {
    width,
    flex: 1,
  },

  // Cards Area
  cardsArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },

  cardsContainer: {
    width: '100%',
    height: 280,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  floatingCard: {
    position: 'absolute',
    ...Shadows.large,
  },

  cardLeft: {
    left: 10,
    top: 40,
    zIndex: 1,
  },

  cardCenter: {
    zIndex: 3,
  },

  cardRight: {
    right: 10,
    top: 60,
    zIndex: 2,
  },

  cardInner: {
    width: 110,
    height: 140,
    borderRadius: BorderRadius.large,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardInnerMain: {
    width: 140,
    height: 180,
    padding: Spacing.lg,
  },

  cardFlag: {
    fontSize: 36,
    marginBottom: Spacing.xs,
  },

  cardFlagMain: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },

  cardCountry: {
    fontSize: 12,
    fontWeight: '600',
    color: TomThumb[800],
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },

  cardCountryMain: {
    fontSize: 15,
    fontWeight: '700',
    color: TomThumb[800],
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  cardBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.small,
  },

  cardBadgeMain: {
    backgroundColor: TomThumb[500],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },

  cardBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: TomThumb[600],
  },

  cardBadgeTextMain: {
    fontSize: 11,
    fontWeight: '600',
    color: AppColors.pureWhite,
  },

  cardAction: {
    marginTop: Spacing.sm,
    backgroundColor: TomThumb[700],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.medium,
  },

  cardActionText: {
    fontSize: 11,
    fontWeight: '600',
    color: AppColors.pureWhite,
  },

  // Content Area
  contentArea: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: TomThumb[900],
    textAlign: 'center',
    marginBottom: Spacing.md,
  },

  description: {
    fontSize: 15,
    color: TomThumb[600],
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.lg,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingBottom: Spacing.xxxl,
    gap: Spacing.xl,
  },

  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: TomThumb[300],
  },

  dotActive: {
    width: 24,
    backgroundColor: TomThumb[700],
  },

  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: TomThumb[700],
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },

  nextButtonText: {
    fontSize: 24,
    color: AppColors.pureWhite,
    fontWeight: '600',
  },
});
