/**
 * PackNDocs Document Item Component
 * Individual document checklist item with upload functionality
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { DocumentRequirement, DocumentStatus } from '@/types';

// Document type icons
const documentTypeIcons: Record<string, string> = {
  identity: '🪪',
  photo: '📸',
  insurance: '🏥',
  reservation: '✈️',
  financial: '💰',
  form: '📝',
  employment: '💼',
  invitation: '✉️',
  other: '📄',
};

interface DocumentItemProps {
  document: DocumentRequirement;
  status?: DocumentStatus;
  index: number;
  onToggle: () => void;
  onUpload: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

export function DocumentItem({
  document,
  status,
  index,
  onToggle,
  onUpload,
  onView,
  onDelete,
}: DocumentItemProps) {
  const isCompleted = status?.completed || false;
  const hasFile = !!status?.uploadedFileName;

  const handleDelete = () => {
    Alert.alert(
      'Dosyayı Sil',
      'Bu belgeyi silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <Animated.View
      entering={FadeInRight.delay(100 + index * 50).duration(400)}
    >
      <View style={[styles.card, isCompleted && styles.cardCompleted]}>
        {/* Main Content */}
        <TouchableOpacity
          style={styles.mainContent}
          onPress={onToggle}
          activeOpacity={0.9}
        >
          {/* Checkbox */}
          <View style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}>
            {isCompleted && <Text style={styles.checkmark}>✓</Text>}
          </View>

          {/* Document Info */}
          <View style={styles.info}>
            <View style={styles.header}>
              <Text style={styles.icon}>
                {documentTypeIcons[document.type] || '📄'}
              </Text>
              <View style={styles.titleContainer}>
                <Text
                  style={[styles.title, isCompleted && styles.titleCompleted]}
                  numberOfLines={1}
                >
                  {document.nameTr}
                </Text>
                {document.required && (
                  <View style={styles.requiredBadge}>
                    <Text style={styles.requiredText}>Zorunlu</Text>
                  </View>
                )}
              </View>
            </View>

            {document.descriptionTr && (
              <Text style={styles.description} numberOfLines={2}>
                {document.descriptionTr}
              </Text>
            )}

            {document.estimatedTime && (
              <Text style={styles.time}>⏱ {document.estimatedTime}</Text>
            )}

            {/* Uploaded File Info */}
            {hasFile && (
              <View style={styles.fileInfo}>
                <Text style={styles.fileName} numberOfLines={1}>
                  📎 {status?.uploadedFileName}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Actions */}
        <View style={styles.actions}>
          {hasFile ? (
            <>
              <TouchableOpacity style={styles.actionButton} onPress={onView}>
                <Text style={styles.actionIcon}>👁</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={handleDelete}
              >
                <Text style={styles.actionIcon}>🗑</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, styles.uploadButton]}
              onPress={onUpload}
            >
              <Text style={styles.uploadIcon}>📤</Text>
              <Text style={styles.uploadText}>Yükle</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

interface DocumentListProps {
  documents: DocumentRequirement[];
  getStatus: (documentId: string) => DocumentStatus | undefined;
  onToggle: (documentId: string) => void;
  onUpload: (documentId: string) => void;
  onView?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
}

export function DocumentList({
  documents,
  getStatus,
  onToggle,
  onUpload,
  onView,
  onDelete,
}: DocumentListProps) {
  const requiredDocs = documents.filter((d) => d.required);
  const optionalDocs = documents.filter((d) => !d.required);

  return (
    <View style={styles.list}>
      {/* Required Documents */}
      {requiredDocs.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zorunlu Belgeler</Text>
          {requiredDocs.map((doc, index) => (
            <DocumentItem
              key={doc.id}
              document={doc}
              status={getStatus(doc.id)}
              index={index}
              onToggle={() => onToggle(doc.id)}
              onUpload={() => onUpload(doc.id)}
              onView={onView ? () => onView(doc.id) : undefined}
              onDelete={onDelete ? () => onDelete(doc.id) : undefined}
            />
          ))}
        </View>
      )}

      {/* Optional Documents */}
      {optionalDocs.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İsteğe Bağlı Belgeler</Text>
          {optionalDocs.map((doc, index) => (
            <DocumentItem
              key={doc.id}
              document={doc}
              status={getStatus(doc.id)}
              index={requiredDocs.length + index}
              onToggle={() => onToggle(doc.id)}
              onUpload={() => onUpload(doc.id)}
              onView={onView ? () => onView(doc.id) : undefined}
              onDelete={onDelete ? () => onDelete(doc.id) : undefined}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.xl,
  },

  section: {
    gap: Spacing.md,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.xs,
  },

  card: {
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    ...Shadows.small,
  },

  cardCompleted: {
    backgroundColor: `${AppColors.turkishTurquoise}08`,
    borderWidth: 1,
    borderColor: `${AppColors.turkishTurquoise}30`,
  },

  mainContent: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: AppColors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  checkboxCompleted: {
    backgroundColor: AppColors.turkishTurquoise,
    borderColor: AppColors.turkishTurquoise,
  },

  checkmark: {
    color: AppColors.pureWhite,
    fontSize: 14,
    fontWeight: '700',
  },

  info: {
    flex: 1,
    gap: Spacing.xs,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },

  icon: {
    fontSize: 20,
  },

  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  titleCompleted: {
    textDecorationLine: 'line-through',
    color: AppColors.textSecondary,
  },

  requiredBadge: {
    backgroundColor: `${AppColors.error}15`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.small,
  },

  requiredText: {
    fontSize: 10,
    fontWeight: '600',
    color: AppColors.error,
    textTransform: 'uppercase',
  },

  description: {
    fontSize: 13,
    color: AppColors.textSecondary,
    lineHeight: 18,
    marginTop: 2,
  },

  time: {
    fontSize: 12,
    color: AppColors.textMuted,
    marginTop: 2,
  },

  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${AppColors.skyBlue}10`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
    marginTop: Spacing.xs,
  },

  fileName: {
    fontSize: 12,
    color: AppColors.skyBlue,
    fontWeight: '500',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: AppColors.softGray,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.small,
    backgroundColor: AppColors.softGray,
  },

  uploadButton: {
    backgroundColor: AppColors.skyBlue,
  },

  deleteButton: {
    backgroundColor: `${AppColors.error}15`,
  },

  actionIcon: {
    fontSize: 14,
  },

  uploadIcon: {
    fontSize: 14,
  },

  uploadText: {
    fontSize: 13,
    fontWeight: '600',
    color: AppColors.pureWhite,
  },
});

export default DocumentItem;

