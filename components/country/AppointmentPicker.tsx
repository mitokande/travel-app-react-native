/**
 * PackNDocs Appointment Date Picker
 * Set embassy appointment date and see countdown deadlines
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';

interface AppointmentPickerProps {
  appointmentDate: Date | null;
  onDateSelect: (date: Date) => void;
  onClear: () => void;
}

const MONTHS_TR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

const DAYS_TR = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  // Convert Sunday=0 to Monday-based (Monday=0)
  return day === 0 ? 6 : day - 1;
}

function formatFullDate(date: Date): string {
  const day = date.getDate();
  const month = MONTHS_TR[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function getDaysUntil(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function AppointmentPicker({ appointmentDate, onDateSelect, onClear }: AppointmentPickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const today = new Date();
  const [viewYear, setViewYear] = useState(appointmentDate?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(appointmentDate?.getMonth() ?? today.getMonth());

  const daysUntil = appointmentDate ? getDaysUntil(appointmentDate) : null;

  const handleSelectDate = (day: number) => {
    const selected = new Date(viewYear, viewMonth, day);
    onDateSelect(selected);
    setShowCalendar(false);
  };

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const cells: React.ReactNode[] = [];

    // Empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
      cells.push(<View key={`empty-${i}`} style={styles.calendarCell} />);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(viewYear, viewMonth, day);
      cellDate.setHours(0, 0, 0, 0);
      const isPast = cellDate < todayDate;
      const isSelected =
        appointmentDate &&
        appointmentDate.getDate() === day &&
        appointmentDate.getMonth() === viewMonth &&
        appointmentDate.getFullYear() === viewYear;
      const isToday =
        todayDate.getDate() === day &&
        todayDate.getMonth() === viewMonth &&
        todayDate.getFullYear() === viewYear;

      cells.push(
        <TouchableOpacity
          key={`day-${day}`}
          style={[
            styles.calendarCell,
            isToday && styles.calendarCellToday,
            isSelected && styles.calendarCellSelected,
            isPast && styles.calendarCellDisabled,
          ]}
          onPress={() => !isPast && handleSelectDate(day)}
          disabled={isPast}
        >
          <Text
            style={[
              styles.calendarDayText,
              isToday && styles.calendarDayToday,
              isSelected && styles.calendarDaySelected,
              isPast && styles.calendarDayDisabled,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return cells;
  };

  return (
    <View>
      {/* Appointment Display Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>📅</Text>
          <Text style={styles.cardTitle}>Randevu Tarihi</Text>
        </View>

        {appointmentDate ? (
          <View>
            <View style={styles.dateDisplay}>
              <Text style={styles.dateText}>{formatFullDate(appointmentDate)}</Text>
              {daysUntil !== null && (
                <View
                  style={[
                    styles.countdownBadge,
                    daysUntil <= 7 && styles.countdownBadgeUrgent,
                    daysUntil < 0 && styles.countdownBadgePast,
                  ]}
                >
                  <Text
                    style={[
                      styles.countdownText,
                      daysUntil <= 7 && styles.countdownTextUrgent,
                      daysUntil < 0 && styles.countdownTextPast,
                    ]}
                  >
                    {daysUntil === 0
                      ? 'Bugün!'
                      : daysUntil > 0
                      ? `${daysUntil} gün kaldı`
                      : `${Math.abs(daysUntil)} gün geçti`}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.dateActions}>
              <TouchableOpacity
                style={styles.changeDateBtn}
                onPress={() => setShowCalendar(true)}
              >
                <Text style={styles.changeDateText}>Değiştir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.clearDateBtn} onPress={onClear}>
                <Text style={styles.clearDateText}>Kaldır</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.setDateButton}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.setDateIcon}>+</Text>
            <Text style={styles.setDateText}>Randevu Tarihi Belirle</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View entering={FadeIn.duration(200)} style={styles.calendarModal}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Randevu Tarihi Seçin</Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Month Navigator */}
            <View style={styles.monthNav}>
              <TouchableOpacity onPress={goToPrevMonth} style={styles.monthNavBtn}>
                <Text style={styles.monthNavText}>◀</Text>
              </TouchableOpacity>
              <Text style={styles.monthLabel}>
                {MONTHS_TR[viewMonth]} {viewYear}
              </Text>
              <TouchableOpacity onPress={goToNextMonth} style={styles.monthNavBtn}>
                <Text style={styles.monthNavText}>▶</Text>
              </TouchableOpacity>
            </View>

            {/* Day Headers */}
            <View style={styles.calendarGrid}>
              {DAYS_TR.map((day) => (
                <View key={day} style={styles.calendarCell}>
                  <Text style={styles.dayHeader}>{day}</Text>
                </View>
              ))}
              {renderCalendar()}
            </View>

            <Text style={styles.calendarHint}>
              Geçmiş tarihler seçilemez
            </Text>
          </Animated.View>
        </View>
      </Modal>
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

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },

  cardIcon: {
    fontSize: 20,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  // Date display
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },

  dateText: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },

  countdownBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
    backgroundColor: `${AppColors.skyBlue}15`,
  },

  countdownBadgeUrgent: {
    backgroundColor: `${AppColors.warning}15`,
  },

  countdownBadgePast: {
    backgroundColor: `${AppColors.error}15`,
  },

  countdownText: {
    fontSize: 13,
    fontWeight: '600',
    color: AppColors.skyBlue,
  },

  countdownTextUrgent: {
    color: AppColors.warning,
  },

  countdownTextPast: {
    color: AppColors.error,
  },

  dateActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },

  changeDateBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.small,
    backgroundColor: AppColors.backgroundTertiary,
  },

  changeDateText: {
    fontSize: 13,
    fontWeight: '600',
    color: AppColors.textSecondary,
  },

  clearDateBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.small,
  },

  clearDateText: {
    fontSize: 13,
    fontWeight: '500',
    color: AppColors.error,
  },

  // Set date button
  setDateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 1.5,
    borderColor: AppColors.skyBlue,
    borderStyle: 'dashed',
    gap: Spacing.sm,
  },

  setDateIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.skyBlue,
  },

  setDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.skyBlue,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },

  calendarModal: {
    backgroundColor: AppColors.pureWhite,
    borderRadius: BorderRadius.extraLarge,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 360,
  },

  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  calendarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },

  closeButton: {
    fontSize: 20,
    color: AppColors.textMuted,
    padding: Spacing.xs,
  },

  // Month navigation
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  monthNavBtn: {
    padding: Spacing.sm,
  },

  monthNavText: {
    fontSize: 16,
    color: AppColors.skyBlue,
  },

  monthLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },

  // Calendar grid
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  calendarCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.textMuted,
  },

  calendarDayText: {
    fontSize: 15,
    color: AppColors.textPrimary,
    fontWeight: '500',
  },

  calendarCellToday: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: AppColors.skyBlue,
  },

  calendarDayToday: {
    color: AppColors.skyBlue,
    fontWeight: '700',
  },

  calendarCellSelected: {
    borderRadius: 20,
    backgroundColor: AppColors.skyBlue,
  },

  calendarDaySelected: {
    color: AppColors.pureWhite,
    fontWeight: '700',
  },

  calendarCellDisabled: {
    opacity: 0.3,
  },

  calendarDayDisabled: {
    color: AppColors.textMuted,
  },

  calendarHint: {
    fontSize: 12,
    color: AppColors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
