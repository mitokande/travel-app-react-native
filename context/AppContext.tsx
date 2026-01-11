/**
 * PackNDocs App Context
 * Global state management for app-wide data
 */

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TargetRegion, VisaPurpose, TravelTimeline } from '@/types';

// Storage keys
const STORAGE_KEYS = {
  HAS_ONBOARDED: 'packndocs_has_onboarded',
  TARGET_REGION: 'packndocs_target_region',
  SELECTED_COUNTRY: 'packndocs_selected_country',
  VISA_PURPOSE: 'packndocs_visa_purpose',
  TRAVEL_TIMELINE: 'packndocs_travel_timeline',
} as const;

// Context state interface
interface AppContextState {
  hasOnboarded: boolean;
  targetRegion: TargetRegion | null;
  selectedCountryId: string | null;
  visaPurpose: VisaPurpose | null;
  travelTimeline: TravelTimeline | null;
  isLoading: boolean;
}

// Context actions interface
interface AppContextActions {
  setHasOnboarded: (value: boolean) => Promise<void>;
  setTargetRegion: (region: TargetRegion | null) => Promise<void>;
  setSelectedCountry: (countryId: string | null) => Promise<void>;
  setVisaPurpose: (purpose: VisaPurpose | null) => Promise<void>;
  setTravelTimeline: (timeline: TravelTimeline | null) => Promise<void>;
  clearAllData: () => Promise<void>;
  reload: () => Promise<void>;
}

// Combined context type
type AppContextType = AppContextState & AppContextActions;

// Initial state
const initialState: AppContextState = {
  hasOnboarded: false,
  targetRegion: null,
  selectedCountryId: null,
  visaPurpose: null,
  travelTimeline: null,
  isLoading: true,
};

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider props
interface AppProviderProps {
  children: ReactNode;
}

// Provider component
export function AppProvider({ children }: AppProviderProps) {
  const [state, setState] = useState<AppContextState>(initialState);

  // Load stored data on mount
  const loadStoredData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const [hasOnboarded, targetRegion, selectedCountry, visaPurpose, travelTimeline] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.HAS_ONBOARDED),
        AsyncStorage.getItem(STORAGE_KEYS.TARGET_REGION),
        AsyncStorage.getItem(STORAGE_KEYS.SELECTED_COUNTRY),
        AsyncStorage.getItem(STORAGE_KEYS.VISA_PURPOSE),
        AsyncStorage.getItem(STORAGE_KEYS.TRAVEL_TIMELINE),
      ]);

      setState({
        hasOnboarded: hasOnboarded === 'true',
        targetRegion: (targetRegion as TargetRegion) || null,
        selectedCountryId: selectedCountry || null,
        visaPurpose: (visaPurpose as VisaPurpose) || null,
        travelTimeline: (travelTimeline as TravelTimeline) || null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading stored data:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    loadStoredData();
  }, [loadStoredData]);

  const setHasOnboarded = useCallback(async (value: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HAS_ONBOARDED, String(value));
      setState((prev) => ({ ...prev, hasOnboarded: value }));
    } catch (error) {
      console.error('Error saving onboarded state:', error);
    }
  }, []);

  const setTargetRegion = useCallback(async (region: TargetRegion | null) => {
    try {
      if (region) {
        await AsyncStorage.setItem(STORAGE_KEYS.TARGET_REGION, region);
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.TARGET_REGION);
      }
      setState((prev) => ({ ...prev, targetRegion: region }));
    } catch (error) {
      console.error('Error saving target region:', error);
    }
  }, []);

  const setSelectedCountry = useCallback(async (countryId: string | null) => {
    try {
      if (countryId) {
        await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_COUNTRY, countryId);
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.SELECTED_COUNTRY);
      }
      setState((prev) => ({ ...prev, selectedCountryId: countryId }));
    } catch (error) {
      console.error('Error saving selected country:', error);
    }
  }, []);

  const setVisaPurpose = useCallback(async (purpose: VisaPurpose | null) => {
    try {
      if (purpose) {
        await AsyncStorage.setItem(STORAGE_KEYS.VISA_PURPOSE, purpose);
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.VISA_PURPOSE);
      }
      setState((prev) => ({ ...prev, visaPurpose: purpose }));
    } catch (error) {
      console.error('Error saving visa purpose:', error);
    }
  }, []);

  const setTravelTimeline = useCallback(async (timeline: TravelTimeline | null) => {
    try {
      if (timeline) {
        await AsyncStorage.setItem(STORAGE_KEYS.TRAVEL_TIMELINE, timeline);
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.TRAVEL_TIMELINE);
      }
      setState((prev) => ({ ...prev, travelTimeline: timeline }));
    } catch (error) {
      console.error('Error saving travel timeline:', error);
    }
  }, []);

  const clearAllData = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const packndocsKeys = keys.filter((key) => key.startsWith('packndocs_'));
      await AsyncStorage.multiRemove(packndocsKeys);
      setState({ ...initialState, isLoading: false });
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }, []);

  const value: AppContextType = {
    ...state,
    setHasOnboarded,
    setTargetRegion,
    setSelectedCountry,
    setVisaPurpose,
    setTravelTimeline,
    clearAllData,
    reload: loadStoredData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
