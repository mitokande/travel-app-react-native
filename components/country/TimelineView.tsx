/**
 * PackNDocs Timeline View
 * Visual application timeline with step-by-step progress
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { TimelineStep } from '@/data/timeline';

interface TimelineStepWithDeadline extends TimelineStep {
  deadlineDate: Date;
  isOverdue: boolean;
  daysRemaining: number;
}

interface TimelineViewProps {
  steps: TimelineStepWithDeadline[];
  completedDocumentIds: string[];
}

function formatDate(date: Date): string {
  const day = date.getDate();
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
  ];
  return `${day} ${months[date.getMonth()]}`;
}

function getDaysLabel(days: number): string {
  if (days === 0) return 'Bugün';
  if (days === 1) return 'Yarın';
  if (days < 0) return `${Math.abs(days)} gün geçti`;
  return `${days} gün kaldı`;
}

function isStepCompleted(step: TimelineStep, completedDocumentIds: string[]): boolean {
  if (step.relatedDocumentIds.length === 0) return false;
  return step.relatedDocumentIds.every((id) => completedDocumentIds.includes(id));
}

export function TimelineView({ steps, completedDocumentIds }: TimelineViewProps) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const completed = isStepCompleted(step, completedDocumentIds);
        const isLast = index === steps.length - 1;

        return (
          <Animated.View
            key={step.id}
            entering={FadeInDown.delay(100 + index * 50)}
            style={styles.stepRow}
          >
            {/* Timeline line and dot */}
            <View style={styles.lineContainer}>
              <View
                style={[
                  styles.dot,
                  completed && styles.dotCompleted,
                  step.isOverdue && !completed && styles.dotOverdue,
                ]}
              >
                <Text style={styles.dotIcon}>
                  {completed ? '✓' : step.icon}
                </Text>
              </View>
              {!isLast && (
                <View
                  style={[
                    styles.line,
                    completed && styles.lineCompleted,
                  ]}
                />
              )}
            </View>

            {/* Step content */}
            <View style={[styles.stepContent, isLast && styles.stepContentLast]}>
              <View style={styles.stepHeader}>
                <Text
                  style={[
                    styles.stepName,
                    completed && styles.stepNameCompleted,
                  ]}
                >
                  {step.nameTr}
                </Text>
                <View
                  style={[
                    styles.deadlineBadge,
                    step.isOverdue && !completed && styles.deadlineBadgeOverdue,
                    completed && styles.deadlineBadgeCompleted,
                    step.daysRemaining >= 0 && step.daysRemaining <= 3 && !completed && styles.deadlineBadgeUrgent,
                  ]}
                >
                  <Text
                    style={[
                      styles.deadlineText,
                      step.isOverdue && !completed && styles.deadlineTextOverdue,
                      completed && styles.deadlineTextCompleted,
                      step.daysRemaining >= 0 && step.daysRemaining <= 3 && !completed && styles.deadlineTextUrgent,
                    ]}
                  >
                    {completed ? 'Tamamlandı' : getDaysLabel(step.daysRemaining)}
                  </Text>
                </View>
              </View>
              <Text style={styles.stepDescription}>{step.descriptionTr}</Text>
              <View style={styles.stepMeta}>
                <Text style={styles.metaText}>📅 {formatDate(step.deadlineDate)}</Text>
                <Text style={styles.metaDivider}>•</Text>
                <Text style={styles.metaText}>⏱ {step.estimatedDuration}</Text>
              </View>
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
}

/**
 * Simple timeline view without deadlines (no appointment date set)
 */
export function TimelineOverview({ steps }: { steps: TimelineStep[] }) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <Animated.View
            key={step.id}
            entering={FadeInDown.delay(100 + index * 50)}
            style={styles.stepRow}
          >
            <View style={styles.lineContainer}>
              <View style={styles.dot}>
                <Text style={styles.dotIcon}>{step.icon}</Text>
              </View>
              {!isLast && <View style={styles.line} />}
            </View>

            <View style={[styles.stepContent, isLast && styles.stepContentLast]}>
              <Text style={styles.stepName}>{step.nameTr}</Text>
              <Text style={styles.stepDescription}>{step.descriptionTr}</Text>
              <View style={styles.stepMeta}>
                <Text style={styles.metaText}>
                  {step.daysBeforeAppointment > 0
                    ? `Randevudan ${step.daysBeforeAppointment} gün önce`
                    : 'Randevu günü'}
                </Text>
                <Text style={styles.metaDivider}>•</Text>
                <Text style={styles.metaText}>⏱ {step.estimatedDuration}</Text>
              </View>
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: Spacing.xs,
  },

  stepRow: {
    flexDirection: 'row',
  },

  lineContainer: {
    width: 40,
    alignItems: 'center',
  },

  dot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppColors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  dotCompleted: {
    backgroundColor: AppColors.success,
  },

  dotOverdue: {
    backgroundColor: `${AppColors.error}20`,
  },

  dotIcon: {
    fontSize: 16,
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: AppColors.backgroundTertiary,
    marginVertical: -2,
  },

  lineCompleted: {
    backgroundColor: AppColors.success,
  },

  stepContent: {
    flex: 1,
    marginLeft: Spacing.md,
    paddingBottom: Spacing.xxl,
    paddingRight: Spacing.xs,
  },

  stepContentLast: {
    paddingBottom: 0,
  },

  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },

  stepName: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.textPrimary,
    flex: 1,
    flexShrink: 1,
  },

  stepNameCompleted: {
    color: AppColors.success,
  },

  stepDescription: {
    fontSize: 13,
    color: AppColors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },

  stepMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 2,
  },

  metaText: {
    fontSize: 12,
    color: AppColors.textMuted,
  },

  metaDivider: {
    fontSize: 12,
    color: AppColors.textMuted,
    marginHorizontal: Spacing.xs,
  },

  deadlineBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
    backgroundColor: AppColors.backgroundTertiary,
    flexShrink: 0,
  },

  deadlineBadgeOverdue: {
    backgroundColor: `${AppColors.error}15`,
  },

  deadlineBadgeCompleted: {
    backgroundColor: `${AppColors.success}15`,
  },

  deadlineBadgeUrgent: {
    backgroundColor: `${AppColors.warning}15`,
  },

  deadlineText: {
    fontSize: 11,
    fontWeight: '600',
    color: AppColors.textSecondary,
  },

  deadlineTextOverdue: {
    color: AppColors.error,
  },

  deadlineTextCompleted: {
    color: AppColors.success,
  },

  deadlineTextUrgent: {
    color: AppColors.warning,
  },
});
