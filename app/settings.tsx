/**
 * PackNDocs Settings Screen
 * User profile and app settings management
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useApp } from '@/context/AppContext';
import { RegionPickerModal } from '@/components/common/RegionPickerModal';
import { targetRegions } from '@/data/countries';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { TargetRegion } from '@/types';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
}

function SettingItem({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  danger,
}: SettingItemProps) {
  const content = (
    <View style={styles.settingItem}>
      <View style={[styles.settingIcon, danger && styles.settingIconDanger]}>
        <Text style={styles.settingIconText}>{icon}</Text>
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, danger && styles.settingTitleDanger]}>
          {title}
        </Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || (onPress && <Text style={styles.settingArrow}>›</Text>)}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

export default function SettingsScreen() {
  const router = useRouter();
  const { targetRegion, selectedCountryId, setTargetRegion, setSelectedCountry, clearAllData } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showRegionPicker, setShowRegionPicker] = useState(false);

  const currentRegion = targetRegions.find((r) => r.id === targetRegion);

  const handleClose = () => {
    router.back();
  };

  const handleOpenRegionPicker = () => {
    setShowRegionPicker(true);
  };

  const handleRegionSelect = async (region: TargetRegion) => {
    await setTargetRegion(region);
    // Reset selected country when changing region
    await setSelectedCountry(null);
    setShowRegionPicker(false);
  };

  const handleClearData = () => {
    Alert.alert(
      'Verileri Temizle',
      'Tüm uygulama verilerinizi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Temizle',
          style: 'destructive',
          onPress: async () => {
            await clearAllData();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  const handleResetOnboarding = () => {
    Alert.alert(
      'Uygulamayı Sıfırla',
      'Uygulama baştan başlatılacak. Tüm verileriniz silinecektir.',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sıfırla',
          style: 'destructive',
          onPress: async () => {
            await clearAllData();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeIn.delay(100)} style={styles.header}>
        <Text style={styles.title}>Ayarlar</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <Animated.View entering={FadeInDown.delay(150)} style={styles.section}>
          <Text style={styles.sectionTitle}>Profil</Text>
          <View style={styles.card}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Misafir Kullanıcı</Text>
                <Text style={styles.profileEmail}>Oturum açılmadı</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Region Section */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <Text style={styles.sectionTitle}>Bölge</Text>
          <View style={styles.card}>
            <SettingItem
              icon={currentRegion?.flag || '🌍'}
              title="Hedef Bölge"
              subtitle={currentRegion?.nameTr || 'Seçilmedi'}
              onPress={handleOpenRegionPicker}
              rightElement={
                <View style={styles.changeButton}>
                  <Text style={styles.changeButtonText}>Değiştir</Text>
                </View>
              }
            />
          </View>
        </Animated.View>

        {/* Preferences Section */}
        <Animated.View entering={FadeInDown.delay(250)} style={styles.section}>
          <Text style={styles.sectionTitle}>Tercihler</Text>
          <View style={styles.card}>
            <SettingItem
              icon="🔔"
              title="Bildirimler"
              subtitle="Hatırlatmalar ve güncellemeler"
              rightElement={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{
                    false: AppColors.softGray,
                    true: `${AppColors.skyBlue}50`,
                  }}
                  thumbColor={
                    notificationsEnabled ? AppColors.skyBlue : AppColors.textMuted
                  }
                />
              }
            />
          </View>
        </Animated.View>

        {/* About Section */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
          <Text style={styles.sectionTitle}>Hakkında</Text>
          <View style={styles.card}>
            <SettingItem
              icon="📱"
              title="Uygulama Versiyonu"
              subtitle="1.0.0 (MVP)"
            />
            <View style={styles.divider} />
            <SettingItem
              icon="👨‍💻"
              title="Geliştirici"
              subtitle="Mithat Can Turan"
            />
          </View>
        </Animated.View>

        {/* Danger Zone */}
        <Animated.View entering={FadeInDown.delay(350)} style={styles.section}>
          <Text style={styles.sectionTitle}>Tehlikeli Bölge</Text>
          <View style={styles.card}>
            <SettingItem
              icon="🗑"
              title="Verileri Temizle"
              subtitle="Tüm kayıtlı belgeleri sil"
              onPress={handleClearData}
              danger
            />
            <View style={styles.divider} />
            <SettingItem
              icon="🔄"
              title="Uygulamayı Sıfırla"
              subtitle="Baştan başla"
              onPress={handleResetOnboarding}
              danger
            />
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.footer}>
          <Text style={styles.footerLogo}>PackNDocs</Text>
          <Text style={styles.footerText}>Vize Başvuru Asistanı</Text>
          <Text style={styles.footerCopyright}>© 2026 Tüm hakları saklıdır</Text>
        </Animated.View>
      </ScrollView>

      {/* Region Picker Modal */}
      <RegionPickerModal
        visible={showRegionPicker}
        currentRegion={targetRegion}
        onSelect={handleRegionSelect}
        onClose={() => setShowRegionPicker(false)}
        showWarning={!!selectedCountryId}
      />
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
    backgroundColor: AppColors.pureWhite,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.softGray,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppColors.softGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    fontSize: 18,
    color: AppColors.textSecondary,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: Spacing.lg,
  },

  // Sections
  section: {
    marginBottom: Spacing.xl,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: AppColors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },

  card: {
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.medium,
    ...Shadows.small,
  },

  // Profile
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AppColors.softGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 28,
  },

  profileInfo: {
    flex: 1,
  },

  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  profileEmail: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginTop: 2,
  },

  // Setting Items
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },

  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.small,
    backgroundColor: `${AppColors.skyBlue}10`,
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingIconDanger: {
    backgroundColor: `${AppColors.error}10`,
  },

  settingIconText: {
    fontSize: 20,
  },

  settingContent: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: AppColors.textPrimary,
  },

  settingTitleDanger: {
    color: AppColors.error,
  },

  settingSubtitle: {
    fontSize: 13,
    color: AppColors.textSecondary,
    marginTop: 2,
  },

  settingArrow: {
    fontSize: 22,
    color: AppColors.textMuted,
  },

  changeButton: {
    backgroundColor: `${AppColors.skyBlue}15`,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.small,
  },

  changeButtonText: {
    color: AppColors.skyBlue,
    fontSize: 13,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: AppColors.softGray,
    marginLeft: 68,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },

  footerLogo: {
    fontSize: 24,
    fontWeight: '800',
    color: AppColors.skyBlue,
    marginBottom: Spacing.xs,
  },

  footerText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginBottom: Spacing.sm,
  },

  footerCopyright: {
    fontSize: 12,
    color: AppColors.textMuted,
  },
});
