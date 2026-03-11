/**
 * PackNDocs Cost Estimator
 * Visa application cost breakdown with totals
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { VisaCostBreakdown, CostItem } from '@/data/timeline';

interface CostEstimatorProps {
  costs: VisaCostBreakdown;
}

export function CostEstimator({ costs }: CostEstimatorProps) {
  const [showOptional, setShowOptional] = useState(false);

  const requiredItems = costs.items.filter((item) => item.required);
  const optionalItems = costs.items.filter((item) => !item.required);

  const requiredTotal = requiredItems.reduce((sum, item) => sum + item.amount, 0);
  const optionalTotal = optionalItems.reduce((sum, item) => sum + item.amount, 0);
  const grandTotal = requiredTotal + (showOptional ? optionalTotal : 0);

  return (
    <Animated.View entering={FadeInDown.delay(100)} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>💰</Text>
        <Text style={styles.headerTitle}>Tahmini Maliyet</Text>
      </View>

      {/* Required Costs */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Zorunlu Masraflar</Text>
        {requiredItems.map((item) => (
          <CostRow key={item.id} item={item} />
        ))}
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Zorunlu Toplam</Text>
          <Text style={styles.subtotalAmount}>
            {requiredTotal} {costs.currency}
          </Text>
        </View>
      </View>

      {/* Optional Costs Toggle */}
      {optionalItems.length > 0 && (
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.optionalToggle}
            onPress={() => setShowOptional(!showOptional)}
          >
            <Text style={styles.sectionLabel}>Opsiyonel Masraflar</Text>
            <Text style={styles.toggleIcon}>{showOptional ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {showOptional && (
            <View>
              {optionalItems.map((item) => (
                <CostRow key={item.id} item={item} />
              ))}
              <View style={styles.subtotalRow}>
                <Text style={styles.subtotalLabel}>Opsiyonel Toplam</Text>
                <Text style={[styles.subtotalAmount, styles.optionalAmount]}>
                  +{optionalTotal} {costs.currency}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Grand Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>
          {showOptional ? 'Genel Toplam' : 'Minimum Toplam'}
        </Text>
        <Text style={styles.totalAmount}>
          {grandTotal} {costs.currency}
        </Text>
      </View>

      <Text style={styles.disclaimer}>
        * Tahmini tutarlardır, güncel fiyatlar için resmi kaynaklara başvurun.
      </Text>
    </Animated.View>
  );
}

function CostRow({ item }: { item: CostItem }) {
  return (
    <View style={styles.costRow}>
      <View style={styles.costInfo}>
        <Text style={styles.costName}>{item.nameTr}</Text>
        {item.note && <Text style={styles.costNote}>{item.note}</Text>}
      </View>
      <Text style={styles.costAmount}>
        {item.amount} {item.currency}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    ...Shadows.medium,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },

  headerIcon: {
    fontSize: 20,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  section: {
    marginBottom: Spacing.md,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: AppColors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },

  optionalToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  toggleIcon: {
    fontSize: 12,
    color: AppColors.textMuted,
  },

  // Cost rows
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: AppColors.backgroundTertiary,
  },

  costInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },

  costName: {
    fontSize: 14,
    color: AppColors.textPrimary,
    fontWeight: '500',
  },

  costNote: {
    fontSize: 12,
    color: AppColors.textMuted,
    marginTop: 2,
  },

  costAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  // Subtotals
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    marginTop: Spacing.xs,
  },

  subtotalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: AppColors.textSecondary,
  },

  subtotalAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },

  optionalAmount: {
    color: AppColors.textSecondary,
  },

  // Grand total
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    marginTop: Spacing.sm,
    borderTopWidth: 2,
    borderTopColor: AppColors.skyBlue,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: AppColors.skyBlue,
  },

  disclaimer: {
    fontSize: 11,
    color: AppColors.textMuted,
    marginTop: Spacing.md,
    fontStyle: 'italic',
  },
});
