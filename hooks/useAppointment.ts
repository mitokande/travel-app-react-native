/**
 * PackNDocs Appointment Hook
 * Manages appointment date storage and deadline calculations
 */

import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APPOINTMENT_PREFIX = 'packndocs_appointment_';

export function useAppointment(countryId: string | null) {
  const [appointmentDate, setAppointmentDateState] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = countryId ? `${APPOINTMENT_PREFIX}${countryId}` : null;

  useEffect(() => {
    if (storageKey) {
      loadDate();
    } else {
      setAppointmentDateState(null);
      setIsLoading(false);
    }
  }, [storageKey]);

  const loadDate = async () => {
    if (!storageKey) return;
    try {
      setIsLoading(true);
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) {
        setAppointmentDateState(new Date(stored));
      } else {
        setAppointmentDateState(null);
      }
    } catch (error) {
      console.error('Error loading appointment date:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setAppointmentDate = useCallback(
    async (date: Date | null) => {
      if (!storageKey) return;
      try {
        if (date) {
          await AsyncStorage.setItem(storageKey, date.toISOString());
        } else {
          await AsyncStorage.removeItem(storageKey);
        }
        setAppointmentDateState(date);
      } catch (error) {
        console.error('Error saving appointment date:', error);
      }
    },
    [storageKey]
  );

  const clearAppointmentDate = useCallback(async () => {
    await setAppointmentDate(null);
  }, [setAppointmentDate]);

  return {
    appointmentDate,
    isLoading,
    setAppointmentDate,
    clearAppointmentDate,
  };
}
