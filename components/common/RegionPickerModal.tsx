/**
 * PackNDocs Region Picker Modal
 * Quick region selection modal for changing target region
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Animated, { FadeIn, FadeInUp, SlideInDown } from 'react-native-reanimated';
import { targetRegions } from '@/data/countries';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { TargetRegion, RegionCard } from '@/types';

interface RegionPickerModalProps {
  visible: boolean;
  currentRegion: TargetRegion | null;
  onSelect: (region: TargetRegion) => void;
  onClose: () => void;
  showWarning?: boolean;
}

interface RegionOptionProps {
  region: RegionCard;
  isSelected: boolean;
  index: number;
  onPress: () => void;
}

function RegionOption({ region, isSelected, index, onPress }: RegionOptionProps) {
  return (
    <Animated.View entering={FadeInUp.delay(100 + index * 75).duration(400)}>
      <TouchableOpacity
        style={[styles.optionCard, isSelected && styles.optionCardSelected]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={styles.optionContent}>
          <Text style={styles.optionFlag}>{region.flag}</Text>
          <View style={styles.optionText}>
            <Text style={[styles.optionName, isSelected && styles.optionNameSelected]}>
              {region.nameTr}
            </Text>
            <Text style={styles.optionVisa}>{region.visaType}</Text>
          </View>
        </View>
        {isSelected ? (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedText}>Seçili</Text>
          </View>
        ) : (
          <View style={styles.selectButton}>
            <Text style={styles.selectButtonText}>Seç</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

export function RegionPickerModal({
  visible,
  currentRegion,
  onSelect,
  onClose,
  showWarning = true,
}: RegionPickerModalProps) {
  const handleSelect = (regionId: TargetRegion) => {
    // If selecting the same region, just close
    if (regionId === currentRegion) {
      onClose();
      return;
    }

    // Show warning if changing region
    if (showWarning && currentRegion) {
      Alert.alert(
        'Bölge Değişikliği',
        'Hedef bölgenizi değiştirdiğinizde, seçili ülke sıfırlanacak. Belge ilerlemeniz korunacaktır.\n\nDevam etmek istiyor musunuz?',
        [
          { text: 'İptal', style: 'cancel' },
          {
            text: 'Değiştir',
            onPress: () => onSelect(regionId),
          },
        ]
      );
    } else {
      onSelect(regionId);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          entering={FadeIn.duration(200)}
          style={styles.overlay}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              entering={SlideInDown.duration(300)}
              style={styles.modalContainer}
            >
              {/* Handle Bar */}
              <View style={styles.handleBar} />

              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Hedef Bölge Seçin</Text>
                <Text style={styles.subtitle}>
                  Vize başvurusu yapmak istediğiniz bölgeyi seçin
                </Text>
              </View>

              {/* Options */}
              <View style={styles.optionsList}>
                {targetRegions.map((region, index) => (
                  <RegionOption
                    key={region.id}
                    region={region}
                    isSelected={region.id === currentRegion}
                    index={index}
                    onPress={() => handleSelect(region.id)}
                  />
                ))}
              </View>

              {/* Close Button */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Kapat</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: AppColors.pureWhite,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    paddingBottom: Spacing.xxxl,
  },

  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: AppColors.softGray,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },

  header: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.xs,
  },

  subtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },

  optionsList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },

  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.softGray,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
  },

  optionCardSelected: {
    backgroundColor: `${AppColors.skyBlue}10`,
    borderWidth: 2,
    borderColor: AppColors.skyBlue,
  },

  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },

  optionFlag: {
    fontSize: 36,
  },

  optionText: {
    gap: 2,
  },

  optionName: {
    fontSize: 17,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  optionNameSelected: {
    color: AppColors.skyBlue,
  },

  optionVisa: {
    fontSize: 13,
    color: AppColors.textSecondary,
  },

  selectedBadge: {
    backgroundColor: AppColors.skyBlue,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
  },

  selectedText: {
    color: AppColors.pureWhite,
    fontSize: 13,
    fontWeight: '600',
  },

  selectButton: {
    backgroundColor: AppColors.pureWhite,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: AppColors.skyBlue,
  },

  selectButtonText: {
    color: AppColors.skyBlue,
    fontSize: 13,
    fontWeight: '600',
  },

  closeButton: {
    marginTop: Spacing.xl,
    marginHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },

  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textMuted,
  },
});

export default RegionPickerModal;

