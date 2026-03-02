/**
 * PackNDocs Setup Wizard
 * Multi-step wizard: Region -> Country -> Visa Purpose -> Travel Timeline
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { useApp } from '@/context/AppContext';
import { targetRegions, getCountriesByRegion, getCountryById, visaPurposes, travelTimelines } from '@/data/countries';
import { TomThumb, BorderRadius, Shadows, Spacing, AppColors } from '@/constants/theme';
import { TargetRegion, Country, VisaPurpose, TravelTimeline, VisaPurposeOption, TravelTimelineOption, RegionCard } from '@/types';

const { width } = Dimensions.get('window');

// Step definitions
type WizardStep = 'region' | 'country' | 'purpose' | 'timeline' | 'overview';

const STEPS: WizardStep[] = ['region', 'country', 'purpose', 'timeline', 'overview'];

const STEP_TITLES: Record<WizardStep, string> = {
  region: 'Hedef Bölgenizi Seçin',
  country: 'Ülke Seçin',
  purpose: 'Vize Türünü Seçin',
  timeline: 'Ne Zaman Gitmeyi Planlıyorsunuz?',
  overview: 'Başvuru Özetiniz',
};

const STEP_SUBTITLES: Record<WizardStep, string> = {
  region: 'Vize başvurusu yapmak istediğiniz bölgeyi seçin',
  country: 'Ziyaret etmek istediğiniz ülkeyi seçin',
  purpose: 'Seyahat amacınızı belirtin',
  timeline: 'Yaklaşık seyahat zamanınızı seçin',
  overview: 'Seçimlerinizi gözden geçirin ve başvuru sürecinize başlayın',
};

// ── Estimate helpers ──────────────────────────────────────────────────────────

interface Estimates {
  appointmentWait: string;
  processingTime: string;
}

function getEstimates(region: TargetRegion | null, purpose: VisaPurpose | null): Estimates {
  if (!region || !purpose) return { appointmentWait: '-', processingTime: '-' };

  if (region === 'eu') {
    if (purpose === 'tourist' || purpose === 'business')
      return { appointmentWait: '2-8 hafta', processingTime: '15 iş günü' };
    return { appointmentWait: '2-6 hafta', processingTime: '30-60 gün' };
  }

  if (region === 'us') {
    if (purpose === 'tourist' || purpose === 'business')
      return { appointmentWait: '4-16 hafta', processingTime: '2-3 ay' };
    if (purpose === 'student')
      return { appointmentWait: '2-8 hafta', processingTime: '2-8 hafta' };
    if (purpose === 'work')
      return { appointmentWait: '4-12 hafta', processingTime: '3-6 ay' };
    return { appointmentWait: '4-12 hafta', processingTime: '3-12 ay' };
  }

  // gb
  if (purpose === 'tourist' || purpose === 'business' || purpose === 'student')
    return { appointmentWait: '1-4 hafta', processingTime: '3 hafta' };
  if (purpose === 'work')
    return { appointmentWait: '2-6 hafta', processingTime: '3-8 hafta' };
  return { appointmentWait: '2-6 hafta', processingTime: '3-6 ay' };
}

type UrgencyLevel = 'safe' | 'warning' | 'urgent';

function getUrgency(timeline: TravelTimeline | null, region: TargetRegion | null): UrgencyLevel {
  if (!timeline || !region) return 'safe';
  if (timeline === '1_month') return region === 'us' ? 'urgent' : 'warning';
  if (timeline === '3_months' && region === 'us') return 'warning';
  return 'safe';
}

const URGENCY_MESSAGES: Record<UrgencyLevel, string | null> = {
  safe: null,
  warning: 'Seyahat planınıza göre süre dar olabilir. Başvuru sürecinizi en kısa sürede başlatmanızı öneririz.',
  urgent: 'Seyahat planınız çok yakın! Randevu bekleme süreleri göz önünde bulundurulduğunda acil harekete geçmeniz gerekiyor.',
};

// Progress indicator component
function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <View style={styles.progressContainer}>
      {STEPS.map((_, index) => (
        <View key={index} style={styles.progressItemWrapper}>
          <View
            style={[
              styles.progressDot,
              index <= currentStep && styles.progressDotActive,
              index < currentStep && styles.progressDotCompleted,
            ]}
          >
            {index < currentStep && <Text style={styles.progressCheck}>✓</Text>}
          </View>
          {index < STEPS.length - 1 && (
            <View
              style={[
                styles.progressLine,
                index < currentStep && styles.progressLineActive,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

// Region card component
function RegionCardComponent({
  region,
  index,
  onSelect,
}: {
  region: RegionCard;
  index: number;
  onSelect: (id: TargetRegion) => void;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(100 + index * 80).duration(400)}>
      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => onSelect(region.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.optionIcon}>{region.flag}</Text>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionTitle}>{region.nameTr}</Text>
          <Text style={styles.optionSubtitle}>{region.visaType}</Text>
        </View>
        <View style={styles.optionArrow}>
          <Text style={styles.optionArrowText}>→</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Country card component (grid style)
function CountryCardComponent({
  country,
  index,
  onSelect,
}: {
  country: Country;
  index: number;
  onSelect: (id: string) => void;
}) {
  return (
    <Animated.View 
      entering={FadeInUp.delay(50 + index * 30).duration(300)}
      style={styles.countryCardWrapper}
    >
      <TouchableOpacity
        style={styles.countryCard}
        onPress={() => onSelect(country.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.countryFlag}>{country.flag}</Text>
        <Text style={styles.countryName} numberOfLines={1}>{country.nameTr}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Purpose card component
function PurposeCardComponent({
  purpose,
  index,
  onSelect,
}: {
  purpose: VisaPurposeOption;
  index: number;
  onSelect: (id: VisaPurpose) => void;
}) {
  return (
    <Animated.View entering={FadeInLeft.delay(100 + index * 80).duration(400)}>
      <TouchableOpacity
        style={styles.purposeCard}
        onPress={() => onSelect(purpose.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.purposeIcon}>{purpose.icon}</Text>
        <View style={styles.purposeTextContainer}>
          <Text style={styles.purposeTitle}>{purpose.nameTr}</Text>
          <Text style={styles.purposeDescription}>{purpose.descriptionTr}</Text>
        </View>
        <View style={styles.optionArrow}>
          <Text style={styles.optionArrowText}>→</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Timeline card component
function TimelineCardComponent({
  timeline,
  index,
  onSelect,
}: {
  timeline: TravelTimelineOption;
  index: number;
  onSelect: (id: TravelTimeline) => void;
}) {
  return (
    <Animated.View entering={FadeInRight.delay(100 + index * 80).duration(400)}>
      <TouchableOpacity
        style={styles.timelineCard}
        onPress={() => onSelect(timeline.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.timelineIcon}>{timeline.icon}</Text>
        <Text style={styles.timelineTitle}>{timeline.nameTr}</Text>
        <View style={styles.optionArrow}>
          <Text style={styles.optionArrowText}>→</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function SetupWizardScreen() {
  const router = useRouter();
  const { setTargetRegion, setSelectedCountry, setVisaPurpose, setTravelTimeline } = useApp();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRegion, setSelectedRegionState] = useState<TargetRegion | null>(null);
  const [selectedCountryId, setSelectedCountryState] = useState<string | null>(null);
  const [selectedPurpose, setSelectedPurposeState] = useState<VisaPurpose | null>(null);
  const [selectedTimeline, setSelectedTimelineState] = useState<TravelTimeline | null>(null);

  const currentStepName = STEPS[currentStep];
  
  // Get countries for selected region
  const countries = useMemo(() => {
    if (!selectedRegion) return [];
    return getCountriesByRegion(selectedRegion);
  }, [selectedRegion]);

  // Step handlers
  const handleSelectRegion = (regionId: TargetRegion) => {
    setSelectedRegionState(regionId);
    setCurrentStep(1);
  };

  const handleSelectCountry = (countryId: string) => {
    setSelectedCountryState(countryId);
    setCurrentStep(2);
  };

  const handleSelectPurpose = (purposeId: VisaPurpose) => {
    setSelectedPurposeState(purposeId);
    setCurrentStep(3);
  };

  const handleSelectTimeline = (timelineId: TravelTimeline) => {
    setSelectedTimelineState(timelineId);
    setCurrentStep(4);
  };

  const handleConfirm = async () => {
    if (selectedRegion) await setTargetRegion(selectedRegion);
    if (selectedCountryId) await setSelectedCountry(selectedCountryId);
    if (selectedPurpose) await setVisaPurpose(selectedPurpose);
    if (selectedTimeline) await setTravelTimeline(selectedTimeline);
    router.replace('/(tabs)');
  };

  const handleGoBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStepName) {
      case 'region':
        return (
          <View style={styles.optionsContainer}>
            {targetRegions.map((region, index) => (
              <RegionCardComponent
                key={region.id}
                region={region}
                index={index}
                onSelect={handleSelectRegion}
              />
            ))}
          </View>
        );

      case 'country':
        return (
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.countryGrid}
            showsVerticalScrollIndicator={false}
          >
            {countries.map((country, index) => (
              <CountryCardComponent
                key={country.id}
                country={country}
                index={index}
                onSelect={handleSelectCountry}
              />
            ))}
          </ScrollView>
        );

      case 'purpose':
        return (
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
            {visaPurposes.map((purpose, index) => (
              <PurposeCardComponent
                key={purpose.id}
                purpose={purpose}
                index={index}
                onSelect={handleSelectPurpose}
              />
            ))}
          </ScrollView>
        );

      case 'timeline':
        return (
          <View style={styles.optionsContainer}>
            {travelTimelines.map((timeline, index) => (
              <TimelineCardComponent
                key={timeline.id}
                timeline={timeline}
                index={index}
                onSelect={handleSelectTimeline}
              />
            ))}
          </View>
        );

      case 'overview': {
        const region = targetRegions.find((r) => r.id === selectedRegion);
        const country = selectedCountryId ? getCountryById(selectedCountryId) : null;
        const purpose = visaPurposes.find((p) => p.id === selectedPurpose);
        const timeline = travelTimelines.find((t) => t.id === selectedTimeline);
        const estimates = getEstimates(selectedRegion, selectedPurpose);
        const urgency = getUrgency(selectedTimeline, selectedRegion);
        const urgencyMessage = URGENCY_MESSAGES[urgency];

        const selections = [
          { label: 'Hedef Bölge', value: region?.nameTr ?? '-', icon: region?.flag ?? '🌍' },
          { label: 'Hedef Ülke', value: country?.nameTr ?? '-', icon: country?.flag ?? '🏳️' },
          { label: 'Vize Amacı', value: purpose?.nameTr ?? '-', icon: purpose?.icon ?? '📋' },
          { label: 'Seyahat Planı', value: timeline?.nameTr ?? '-', icon: timeline?.icon ?? '📅' },
        ];

        return (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.overviewContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Selections 2x2 grid */}
            <Text style={styles.overviewSectionLabel}>SEÇİMLERİNİZ</Text>
            <View style={styles.selectionsGrid}>
              {selections.map((item, index) => (
                <Animated.View
                  key={item.label}
                  entering={FadeInDown.delay(100 + index * 60).duration(400)}
                  style={styles.selectionCard}
                >
                  <Text style={styles.selectionIcon}>{item.icon}</Text>
                  <Text style={styles.selectionValue}>{item.value}</Text>
                  <Text style={styles.selectionCardLabel}>{item.label}</Text>
                </Animated.View>
              ))}
            </View>

            {/* Time Estimates */}
            <Text style={styles.overviewSectionLabel}>TAHMİNİ SÜRELER</Text>
            <View style={styles.estimatesRow}>
              <Animated.View
                entering={FadeInDown.delay(350).duration(400)}
                style={[styles.estimateCard, styles.estimateCardDark]}
              >
                <Text style={styles.estimateEmoji}>🗓️</Text>
                <Text style={styles.estimateTime}>{estimates.appointmentWait}</Text>
                <Text style={styles.estimateTitle}>Randevu Bekleme</Text>
                <Text style={styles.estimateDesc}>Konsolosluk veya VFS randevusu için bekleme</Text>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(420).duration(400)}
                style={[styles.estimateCard, styles.estimateCardLight]}
              >
                <Text style={styles.estimateEmoji}>📋</Text>
                <Text style={[styles.estimateTime, styles.estimateTimeDark]}>
                  {estimates.processingTime}
                </Text>
                <Text style={[styles.estimateTitle, styles.estimateTitleDark]}>
                  Vize Değerlendirme
                </Text>
                <Text style={[styles.estimateDesc, styles.estimateDescDark]}>
                  Başvurunun incelenmesi için gereken süre
                </Text>
              </Animated.View>
            </View>

            {/* Urgency banner */}
            {urgencyMessage ? (
              <Animated.View
                entering={FadeInDown.delay(500).duration(400)}
                style={[
                  styles.urgencyBanner,
                  urgency === 'urgent' ? styles.urgencyBannerUrgent : styles.urgencyBannerWarning,
                ]}
              >
                <Text style={styles.urgencyEmoji}>{urgency === 'urgent' ? '🚨' : '⚠️'}</Text>
                <Text
                  style={[
                    styles.urgencyText,
                    urgency === 'urgent' ? styles.urgencyTextUrgent : styles.urgencyTextWarning,
                  ]}
                >
                  {urgencyMessage}
                </Text>
              </Animated.View>
            ) : null}

            {/* Disclaimer */}
            <Text style={styles.disclaimerText}>
              * Süreler tahmini olup konsolosluk yoğunluğuna göre değişebilir.
            </Text>
          </ScrollView>
        );
      }

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background decorations */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.blob, styles.blob1]} />
        <View style={[styles.blob, styles.blob2]} />
      </View>

      {/* Header */}
      <Animated.View entering={FadeIn.delay(50)} style={styles.header}>
        <View style={styles.headerTop}>
          {currentStep > 0 ? (
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.backButtonPlaceholder} />
          )}
          <Text style={styles.logo}>PackNDocs</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>

        <ProgressIndicator currentStep={currentStep} />

        <Text style={styles.stepLabel}>Adım {currentStep + 1}/{STEPS.length}</Text>
        <Text style={styles.title}>{STEP_TITLES[currentStepName]}</Text>
        <Text style={styles.subtitle}>{STEP_SUBTITLES[currentStepName]}</Text>
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>
        {renderStepContent()}
      </View>

      {/* Footer */}
      {currentStepName === 'overview' ? (
        <Animated.View entering={FadeInUp.delay(300)} style={styles.ctaContainer}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleConfirm} activeOpacity={0.9}>
            <Text style={styles.ctaText}>Hadi Başlayalım!</Text>
            <Text style={styles.ctaArrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeInUp.delay(300)} style={styles.footer}>
          <Text style={styles.footerText}>
            Seçimlerinizi daha sonra değiştirebilirsiniz
          </Text>
        </Animated.View>
      )}
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
    opacity: 0.4,
  },

  blob1: {
    width: 200,
    height: 200,
    backgroundColor: TomThumb[200],
    top: -50,
    right: -50,
  },

  blob2: {
    width: 150,
    height: 150,
    backgroundColor: TomThumb[300],
    bottom: 100,
    left: -50,
  },

  // Header
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TomThumb[100],
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonText: {
    fontSize: 22,
    color: TomThumb[700],
    fontWeight: '600',
  },

  backButtonPlaceholder: {
    width: 40,
    height: 40,
  },

  logo: {
    fontSize: 22,
    fontWeight: '800',
    color: TomThumb[700],
    letterSpacing: -0.5,
  },

  // Progress
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },

  progressItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  progressDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: TomThumb[200],
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressDotActive: {
    backgroundColor: TomThumb[500],
  },

  progressDotCompleted: {
    backgroundColor: TomThumb[600],
  },

  progressCheck: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  progressLine: {
    width: 30,
    height: 3,
    backgroundColor: TomThumb[200],
    marginHorizontal: 4,
  },

  progressLineActive: {
    backgroundColor: TomThumb[500],
  },

  stepLabel: {
    fontSize: 13,
    color: TomThumb[500],
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: TomThumb[900],
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },

  subtitle: {
    fontSize: 14,
    color: TomThumb[600],
    textAlign: 'center',
    lineHeight: 20,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },

  scrollView: {
    flex: 1,
  },

  optionsContainer: {
    gap: Spacing.md,
    paddingBottom: Spacing.lg,
  },

  // Option Card (Region)
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.medium,
  },

  optionIcon: {
    fontSize: 40,
    marginRight: Spacing.lg,
  },

  optionTextContainer: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: TomThumb[900],
    marginBottom: 2,
  },

  optionSubtitle: {
    fontSize: 13,
    color: TomThumb[500],
  },

  optionArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: TomThumb[500],
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionArrowText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  // Country Grid
  countryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: Spacing.lg,
  },

  countryCardWrapper: {
    width: (width - Spacing.lg * 2 - Spacing.md) / 2,
    marginBottom: Spacing.md,
  },

  countryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.small,
  },

  countryFlag: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },

  countryName: {
    fontSize: 14,
    fontWeight: '600',
    color: TomThumb[800],
    textAlign: 'center',
  },

  // Purpose Card
  purposeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.medium,
  },

  purposeIcon: {
    fontSize: 32,
    marginRight: Spacing.md,
  },

  purposeTextContainer: {
    flex: 1,
  },

  purposeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TomThumb[900],
    marginBottom: 2,
  },

  purposeDescription: {
    fontSize: 12,
    color: TomThumb[500],
    lineHeight: 16,
  },

  // Timeline Card
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.medium,
  },

  timelineIcon: {
    fontSize: 28,
    marginRight: Spacing.lg,
  },

  timelineTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: TomThumb[900],
  },

  // Footer
  footer: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 13,
    color: TomThumb[400],
    textAlign: 'center',
  },

  // ── Overview step ──────────────────────────────────────────────────────────
  overviewContainer: {
    paddingBottom: Spacing.lg,
    gap: Spacing.lg,
  },
  overviewSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: TomThumb[400],
    letterSpacing: 1.2,
  },
  selectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  selectionCard: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.large,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.small,
  },
  selectionIcon: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  selectionValue: {
    fontSize: 14,
    fontWeight: '700',
    color: TomThumb[900],
    textAlign: 'center',
    marginBottom: 2,
  },
  selectionCardLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: TomThumb[400],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Estimate cards
  estimatesRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  estimateCard: {
    flex: 1,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    ...Shadows.medium,
  },
  estimateCardDark: {
    backgroundColor: TomThumb[700],
  },
  estimateCardLight: {
    backgroundColor: '#FFFFFF',
  },
  estimateEmoji: {
    fontSize: 26,
    marginBottom: Spacing.sm,
  },
  estimateTime: {
    fontSize: 22,
    fontWeight: '800',
    color: AppColors.pureWhite,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  estimateTimeDark: {
    color: TomThumb[800],
  },
  estimateTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: TomThumb[200],
    marginBottom: Spacing.xs,
  },
  estimateTitleDark: {
    color: TomThumb[700],
  },
  estimateDesc: {
    fontSize: 11,
    color: TomThumb[300],
    lineHeight: 16,
  },
  estimateDescDark: {
    color: TomThumb[500],
  },

  // Urgency
  urgencyBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  urgencyBannerWarning: {
    backgroundColor: '#FEF3C7',
  },
  urgencyBannerUrgent: {
    backgroundColor: '#FEE2E2',
  },
  urgencyEmoji: {
    fontSize: 18,
    marginTop: 1,
  },
  urgencyText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  urgencyTextWarning: {
    color: '#92400E',
  },
  urgencyTextUrgent: {
    color: '#991B1B',
  },

  disclaimerText: {
    fontSize: 11,
    color: TomThumb[400],
    lineHeight: 16,
    textAlign: 'center',
  },

  // CTA
  ctaContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.xxl,
    backgroundColor: TomThumb[50],
    borderTopWidth: 1,
    borderTopColor: TomThumb[100],
  },
  ctaButton: {
    backgroundColor: TomThumb[600],
    borderRadius: BorderRadius.large,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    ...Shadows.large,
  },
  ctaText: {
    fontSize: 17,
    fontWeight: '700',
    color: AppColors.pureWhite,
  },
  ctaArrow: {
    fontSize: 20,
    color: AppColors.pureWhite,
    fontWeight: '600',
  },
});
