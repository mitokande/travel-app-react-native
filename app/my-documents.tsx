/**
 * PackNDocs My Documents Page
 * Shows all uploaded documents across all countries
 */

import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { getCountryById } from '@/data/countries';
import { getDocumentById } from '@/data/documents';
import { UploadedDocument, useAllUploadedDocuments } from '@/hooks/useStorage';
import { deleteDocument, getFileInfo } from '@/utils/fileUpload';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useCallback } from 'react';
import {
    Alert,
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function MyDocumentsScreen() {
    const router = useRouter();
    const { documents, isLoading, reload, removeDocument } = useAllUploadedDocuments();
    const [refreshing, setRefreshing] = React.useState(false);

    const handleGoBack = () => {
        router.back();
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await reload();
        setRefreshing(false);
    };

    const handleViewDocument = useCallback(
        async (doc: UploadedDocument) => {
            if (!doc.uploadedFilePath) return;

            try {
                if (Platform.OS === 'web') {
                    window.open(doc.uploadedFilePath, '_blank');
                } else {
                    const fileInfo = await getFileInfo(doc.uploadedFilePath);

                    if (!fileInfo.exists) {
                        Alert.alert('Hata', 'Dosya bulunamadı');
                        return;
                    }

                    const isAvailable = await Sharing.isAvailableAsync();

                    if (isAvailable) {
                        await Sharing.shareAsync(doc.uploadedFilePath, {
                            mimeType: getMimeType(doc.uploadedFileName || ''),
                            dialogTitle: 'Belgeyi Görüntüle',
                            UTI: getUTI(doc.uploadedFileName || ''),
                        });
                    } else {
                        Alert.alert('Bilgi', 'Bu cihazda dosya paylaşımı desteklenmiyor');
                    }
                }
            } catch (error) {
                console.error('View document error:', error);
                Alert.alert('Hata', 'Dosya açılırken bir hata oluştu');
            }
        },
        []
    );

    const handleDeleteDocument = useCallback(
        async (doc: UploadedDocument) => {
            Alert.alert(
                'Dosyayı Sil',
                'Bu belgeyi silmek istediğinizden emin misiniz?',
                [
                    { text: 'İptal', style: 'cancel' },
                    {
                        text: 'Sil',
                        style: 'destructive',
                        onPress: async () => {
                            if (doc.uploadedFilePath) {
                                await deleteDocument(doc.uploadedFilePath);
                            }
                            await removeDocument(doc.countryId, doc.documentId);
                        },
                    },
                ]
            );
        },
        [removeDocument]
    );

    const getDocumentDetails = (doc: UploadedDocument) => {
        const country = getCountryById(doc.countryId);
        const docRequirement = country
            ? getDocumentById(country.visaType, doc.documentId)
            : null;

        return {
            country,
            docRequirement,
        };
    };

    const groupedDocuments = React.useMemo(() => {
        const grouped: Record<string, UploadedDocument[]> = {};

        for (const doc of documents) {
            if (!grouped[doc.countryId]) {
                grouped[doc.countryId] = [];
            }
            grouped[doc.countryId].push(doc);
        }

        return grouped;
    }, [documents]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Animated.View entering={FadeIn.delay(100)} style={styles.header}>
                <TouchableOpacity style={styles.backArrow} onPress={handleGoBack}>
                    <Text style={styles.backArrowText}>←</Text>
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerIcon}>📋</Text>
                    <View>
                        <Text style={styles.headerTitle}>Belgelerim</Text>
                        <Text style={styles.headerSubtitle}>
                            Tüm yüklenen belgeler
                        </Text>
                    </View>
                </View>
            </Animated.View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Summary Card */}
                <Animated.View entering={FadeInDown.delay(150)} style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>{documents.length}</Text>
                            <Text style={styles.summaryLabel}>Toplam Belge</Text>
                        </View>
                        <View style={styles.summaryDivider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>
                                {Object.keys(groupedDocuments).length}
                            </Text>
                            <Text style={styles.summaryLabel}>Ülke</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Empty State */}
                {!isLoading && documents.length === 0 && (
                    <Animated.View entering={FadeInDown.delay(200)} style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📭</Text>
                        <Text style={styles.emptyTitle}>Henüz belge yok</Text>
                        <Text style={styles.emptyText}>
                            Ülke sayfalarından belge yüklemeye başlayın
                        </Text>
                        <TouchableOpacity
                            style={styles.exploreButton}
                            onPress={() => router.push('/(tabs)/explore')}
                        >
                            <Text style={styles.exploreButtonText}>Ülkeleri Keşfet</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {/* Documents by Country */}
                {Object.entries(groupedDocuments).map(([countryId, docs], sectionIndex) => {
                    const country = getCountryById(countryId);

                    return (
                        <Animated.View
                            key={countryId}
                            entering={FadeInDown.delay(200 + sectionIndex * 50)}
                            style={styles.countrySection}
                        >
                            {/* Country Header */}
                            <TouchableOpacity
                                style={styles.countrySectionHeader}
                                onPress={() => router.push(`/country/${countryId}`)}
                            >
                                <Text style={styles.countryFlag}>{country?.flag || '🌍'}</Text>
                                <View style={styles.countryInfo}>
                                    <Text style={styles.countryName}>
                                        {country?.nameTr || countryId}
                                    </Text>
                                    <Text style={styles.countryDocCount}>
                                        {docs.length} belge yüklendi
                                    </Text>
                                </View>
                                <Text style={styles.arrowIcon}>→</Text>
                            </TouchableOpacity>

                            {/* Documents List */}
                            {docs.map((doc, index) => {
                                const { docRequirement } = getDocumentDetails(doc);

                                return (
                                    <View key={`${doc.countryId}-${doc.documentId}`} style={styles.documentCard}>
                                        <View style={styles.documentInfo}>
                                            <Text style={styles.documentName}>
                                                {docRequirement?.nameTr || doc.documentId}
                                            </Text>
                                            <View style={styles.fileNameRow}>
                                                <Text style={styles.fileIcon}>📎</Text>
                                                <Text style={styles.fileName} numberOfLines={1}>
                                                    {doc.uploadedFileName}
                                                </Text>
                                            </View>
                                            {doc.uploadedAt && (
                                                <Text style={styles.uploadDate}>
                                                    {formatDate(doc.uploadedAt)}
                                                </Text>
                                            )}
                                        </View>

                                        <View style={styles.actions}>
                                            <TouchableOpacity
                                                style={styles.actionButton}
                                                onPress={() => handleViewDocument(doc)}
                                            >
                                                <Text style={styles.actionIcon}>👁</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.actionButton, styles.deleteButton]}
                                                onPress={() => handleDeleteDocument(doc)}
                                            >
                                                <Text style={styles.actionIcon}>🗑</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })}
                        </Animated.View>
                    );
                })}

                {/* Bottom Spacing */}
                <View style={styles.bottomSpacing} />
            </ScrollView>
        </SafeAreaView>
    );
}

// Helper function to format date
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

// Helper function to get MIME type from filename
function getMimeType(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
        pdf: 'application/pdf',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    return mimeTypes[extension || ''] || 'application/octet-stream';
}

// Helper function to get UTI for iOS
function getUTI(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    const utis: Record<string, string> = {
        pdf: 'com.adobe.pdf',
        jpg: 'public.jpeg',
        jpeg: 'public.jpeg',
        png: 'public.png',
        doc: 'com.microsoft.word.doc',
        docx: 'org.openxmlformats.wordprocessingml.document',
    };
    return utis[extension || ''] || 'public.data';
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

    headerIcon: {
        fontSize: 36,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: AppColors.textPrimary,
    },

    headerSubtitle: {
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

    // Summary Card
    summaryCard: {
        backgroundColor: AppColors.pureWhite,
        borderRadius: BorderRadius.large,
        padding: Spacing.lg,
        marginBottom: Spacing.lg,
        ...Shadows.medium,
    },

    summaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    summaryItem: {
        flex: 1,
        alignItems: 'center',
    },

    summaryDivider: {
        width: 1,
        height: 40,
        backgroundColor: AppColors.softGray,
        marginHorizontal: Spacing.lg,
    },

    summaryNumber: {
        fontSize: 28,
        fontWeight: '700',
        color: AppColors.skyBlue,
    },

    summaryLabel: {
        fontSize: 13,
        color: AppColors.textSecondary,
        marginTop: Spacing.xs,
    },

    // Empty State
    emptyState: {
        alignItems: 'center',
        paddingVertical: Spacing.xxxl,
        paddingHorizontal: Spacing.xl,
    },

    emptyIcon: {
        fontSize: 64,
        marginBottom: Spacing.lg,
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: AppColors.textPrimary,
        marginBottom: Spacing.sm,
    },

    emptyText: {
        fontSize: 15,
        color: AppColors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: Spacing.xl,
    },

    exploreButton: {
        backgroundColor: AppColors.skyBlue,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.medium,
    },

    exploreButtonText: {
        color: AppColors.pureWhite,
        fontSize: 16,
        fontWeight: '600',
    },

    // Country Section
    countrySection: {
        marginBottom: Spacing.xl,
    },

    countrySectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.pureWhite,
        borderRadius: BorderRadius.medium,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        ...Shadows.small,
    },

    countryFlag: {
        fontSize: 28,
        marginRight: Spacing.md,
    },

    countryInfo: {
        flex: 1,
    },

    countryName: {
        fontSize: 16,
        fontWeight: '700',
        color: AppColors.textPrimary,
    },

    countryDocCount: {
        fontSize: 13,
        color: AppColors.textSecondary,
        marginTop: 2,
    },

    arrowIcon: {
        fontSize: 18,
        color: AppColors.textMuted,
    },

    // Document Card
    documentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.pureWhite,
        borderRadius: BorderRadius.medium,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        marginLeft: Spacing.lg,
        ...Shadows.small,
    },

    documentInfo: {
        flex: 1,
        gap: Spacing.xs,
    },

    documentName: {
        fontSize: 15,
        fontWeight: '600',
        color: AppColors.textPrimary,
    },

    fileNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
    },

    fileIcon: {
        fontSize: 12,
    },

    fileName: {
        flex: 1,
        fontSize: 13,
        color: AppColors.skyBlue,
        fontWeight: '500',
    },

    uploadDate: {
        fontSize: 12,
        color: AppColors.textMuted,
    },

    actions: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginLeft: Spacing.md,
    },

    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: AppColors.softGray,
        alignItems: 'center',
        justifyContent: 'center',
    },

    deleteButton: {
        backgroundColor: `${AppColors.error}15`,
    },

    actionIcon: {
        fontSize: 16,
    },

    bottomSpacing: {
        height: Spacing.xxxl,
    },
});
