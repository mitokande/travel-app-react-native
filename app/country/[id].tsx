/**
 * PackNDocs Country Detail Page
 * Document checklist for visa applications
 */

import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { DocumentList } from '@/components/country/DocumentItem';
import { useDocumentProgress } from '@/hooks/useStorage';
import { getCountryById } from '@/data/countries';
import { getDocumentsByVisaType, getRequiredDocuments } from '@/data/documents';
import { pickDocument, saveDocument, deleteDocument } from '@/utils/fileUpload';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';

export default function CountryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
    progress,
    getDocumentStatus,
    toggleDocumentComplete,
    setDocumentFile,
    removeDocumentFile,
    getCompletedCount,
  } = useDocumentProgress(id || null);

  const country = useMemo(() => {
    if (!id) return null;
    return getCountryById(id);
  }, [id]);

  const documents = useMemo(() => {
    if (!country) return [];
    return getDocumentsByVisaType(country.visaType);
  }, [country]);

  const requiredDocs = useMemo(() => {
    if (!country) return [];
    return getRequiredDocuments(country.visaType);
  }, [country]);

  const completedCount = getCompletedCount();
  const totalRequired = requiredDocs.length;
  const progressPercent = totalRequired > 0 ? (completedCount / totalRequired) * 100 : 0;
  const isComplete = completedCount >= totalRequired;

  const handleGoBack = () => {
    router.back();
  };

  const handleToggleDocument = useCallback(
    async (documentId: string) => {
      await toggleDocumentComplete(documentId);
    },
    [toggleDocumentComplete]
  );

  const handleUploadDocument = useCallback(
    async (documentId: string) => {
      if (!id || !country) return;

      const result = await pickDocument();

      if (!result.success) {
        if (result.error && result.error !== 'User cancelled') {
          Alert.alert('Hata', result.error);
        }
        return;
      }

      if (result.file) {
        const saveResult = await saveDocument(
          result.file.uri,
          documentId,
          id,
          result.file.name
        );

        if (saveResult.success && saveResult.savedPath) {
          await setDocumentFile(documentId, result.file.name, saveResult.savedPath);
          Alert.alert('Başarılı', 'Belge başarıyla yüklendi');
        } else {
          Alert.alert('Hata', saveResult.error || 'Belge kaydedilemedi');
        }
      }
    },
    [id, country, setDocumentFile]
  );

  const handleViewDocument = useCallback(
    async (documentId: string) => {
      const status = getDocumentStatus(documentId);
      if (!status?.uploadedFilePath) return;

      try {
        if (Platform.OS === 'web') {
          // On web, try to open the file URI
          window.open(status.uploadedFilePath, '_blank');
        } else {
          // On mobile, use Linking to open the file
          const canOpen = await Linking.canOpenURL(status.uploadedFilePath);
          if (canOpen) {
            await Linking.openURL(status.uploadedFilePath);
          } else {
            Alert.alert('Bilgi', 'Bu dosya türü görüntülenemiyor');
          }
        }
      } catch (error) {
        Alert.alert('Hata', 'Dosya açılırken bir hata oluştu');
      }
    },
    [getDocumentStatus]
  );

  const handleDeleteDocument = useCallback(
    async (documentId: string) => {
      const status = getDocumentStatus(documentId);
      if (!status?.uploadedFilePath) return;

      await deleteDocument(status.uploadedFilePath);
      await removeDocumentFile(documentId);
    },
    [getDocumentStatus, removeDocumentFile]
  );

  if (!country) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorState}>
          <Text style={styles.errorIcon}>❌</Text>
          <Text style={styles.errorTitle}>Ülke Bulunamadı</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeIn.delay(100)} style={styles.header}>
        <TouchableOpacity style={styles.backArrow} onPress={handleGoBack}>
          <Text style={styles.backArrowText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.flag}>{country.flag}</Text>
          <View>
            <Text style={styles.countryName}>{country.nameTr}</Text>
            <Text style={styles.visaType}>
              {country.visaType === 'schengen'
                ? 'Schengen Vize Başvurusu'
                : country.visaType === 'us_visa'
                ? 'ABD Vize Başvurusu'
                : 'İngiltere Vize Başvurusu'}
            </Text>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Card */}
        <Animated.View entering={FadeInDown.delay(150)} style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Belge Durumu</Text>
            <Text style={styles.progressCount}>
              {completedCount}/{totalRequired}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${progressPercent}%` },
                isComplete && styles.progressBarComplete,
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {isComplete
              ? '🎉 Tüm zorunlu belgeler hazır!'
              : `%${Math.round(progressPercent)} tamamlandı`}
          </Text>
        </Animated.View>

        {/* Info Card */}
        {country.generalInfo && (
          <Animated.View entering={FadeInDown.delay(200)} style={styles.infoCard}>
            <Text style={styles.infoTitle}>ℹ️ Başvuru Bilgisi</Text>
            <Text style={styles.infoText}>{country.generalInfo}</Text>
          </Animated.View>
        )}

        {/* Document Checklist */}
        <Animated.View entering={FadeInDown.delay(250)}>
          <Text style={styles.sectionTitle}>Belge Kontrol Listesi</Text>
          <DocumentList
            documents={documents}
            getStatus={getDocumentStatus}
            onToggle={handleToggleDocument}
            onUpload={handleUploadDocument}
            onView={handleViewDocument}
            onDelete={handleDeleteDocument}
          />
        </Animated.View>

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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: AppColors.pureWhite,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.softGray,
    gap: Spacing.md,
  },

  backArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.softGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backArrowText: {
    fontSize: 22,
    color: AppColors.textPrimary,
  },

  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },

  flag: {
    fontSize: 36,
  },

  countryName: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },

  visaType: {
    fontSize: 13,
    color: AppColors.textSecondary,
    marginTop: 2,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: Spacing.lg,
  },

  // Progress Card
  progressCard: {
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  progressCount: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.skyBlue,
  },

  progressBarContainer: {
    height: 10,
    backgroundColor: AppColors.softGray,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },

  progressBar: {
    height: '100%',
    backgroundColor: AppColors.skyBlue,
    borderRadius: 5,
  },

  progressBarComplete: {
    backgroundColor: AppColors.turkishTurquoise,
  },

  progressText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
  },

  // Info Card
  infoCard: {
    backgroundColor: `${AppColors.skyBlue}08`,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.skyBlue,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: Spacing.sm,
  },

  infoText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },

  // Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.lg,
  },

  // Error State
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

