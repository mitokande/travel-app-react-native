/**
 * PackNDocs Onboarding Screen
 * 3-page guided introduction to the app
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
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { OnboardingSlide, PaginationDots } from '@/components/onboarding/OnboardingSlide';
import { Button } from '@/components/common/Button';
import { useApp } from '@/context/AppContext';
import { AppColors, Spacing } from '@/constants/theme';
import { OnboardingSlide as SlideData } from '@/types';

const { width } = Dimensions.get('window');

// Onboarding slides data (Turkish)
const slides: SlideData[] = [
  {
    id: '1',
    title: 'Tüm Belgeler Tek Yerde',
    description:
      'Vize başvurunuz için gerekli tüm belgeleri tek bir uygulamada takip edin ve düzenleyin.',
    icon: '📋',
  },
  {
    id: '2',
    title: 'Kişiselleştirilmiş Rehber',
    description:
      'Hedef ülkenize göre özelleştirilmiş belge listesi ve başvuru merkezi önerileri alın.',
    icon: '🎯',
  },
  {
    id: '3',
    title: 'Takip ve Hatırlatma',
    description:
      'Belge hazırlık sürecinizi adım adım takip edin ve hiçbir şeyi kaçırmayın.',
    icon: '✅',
  },
];

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logo */}
      <Animated.View entering={FadeIn.delay(200)} style={styles.header}>
        <Text style={styles.logo}>PackNDocs</Text>
        <Text style={styles.tagline}>Vize Başvuru Asistanı</Text>
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
        renderItem={({ item, index }) => (
          <OnboardingSlide slide={item} index={index} />
        )}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Pagination */}
      <PaginationDots total={slides.length} current={currentIndex} />

      {/* Actions */}
      <Animated.View
        entering={FadeInUp.delay(400)}
        style={styles.actionsContainer}
      >
        <Button
          title={isLastSlide ? 'Başlayalım' : 'İleri'}
          onPress={handleNext}
          size="large"
          fullWidth
        />

        {!isLastSlide && (
          <Button
            title="Atla"
            onPress={handleSkip}
            variant="ghost"
            size="medium"
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgroundPrimary,
  },

  header: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
  },

  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: AppColors.skyBlue,
    letterSpacing: -0.5,
  },

  tagline: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginTop: Spacing.xs,
  },

  actionsContainer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.md,
    alignItems: 'center',
  },
});
