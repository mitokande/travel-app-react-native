/**
 * PackNDocs Storage Hook
 * AsyncStorage wrapper for persistent state management
 */

import { AppState, CountryProgress, DocumentStatus, TargetRegion } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

// Storage keys
const STORAGE_KEYS = {
  HAS_ONBOARDED: 'packndocs_has_onboarded',
  TARGET_REGION: 'packndocs_target_region',
  SELECTED_COUNTRY: 'packndocs_selected_country',
  PROGRESS_PREFIX: 'packndocs_progress_',
} as const;

// Initial app state
const initialState: AppState = {
  hasOnboarded: false,
  targetRegion: null,
  selectedCountryId: null,
  visaPurpose: null,
  travelTimeline: null,
  progress: {},
};

/**
 * Hook for managing app-wide storage state
 */
export function useAppStorage() {
  const [state, setState] = useState<AppState>(initialState);
  const [isLoading, setIsLoading] = useState(true);

  // Load all stored data on mount
  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const [hasOnboarded, targetRegion, selectedCountry] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.HAS_ONBOARDED),
        AsyncStorage.getItem(STORAGE_KEYS.TARGET_REGION),
        AsyncStorage.getItem(STORAGE_KEYS.SELECTED_COUNTRY),
      ]);

      setState({
        hasOnboarded: hasOnboarded === 'true',
        targetRegion: (targetRegion as TargetRegion) || null,
        selectedCountryId: selectedCountry || null,
        visaPurpose: null, // Loading from storage if needed in future
        travelTimeline: null, // Loading from storage if needed in future
        progress: {},
      });
    } catch (error) {
      console.error('Error loading stored data:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const clearAllData = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const packndocsKeys = keys.filter((key) => key.startsWith('packndocs_'));
      await AsyncStorage.multiRemove(packndocsKeys);
      setState(initialState);
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }, []);

  return {
    ...state,
    isLoading,
    setHasOnboarded,
    setTargetRegion,
    setSelectedCountry,
    clearAllData,
    reload: loadStoredData,
  };
}

/**
 * Hook for managing document progress for a specific country
 */
export function useDocumentProgress(countryId: string | null) {
  const [progress, setProgress] = useState<CountryProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = countryId ? `${STORAGE_KEYS.PROGRESS_PREFIX}${countryId}` : null;

  // Load progress on mount or country change
  useEffect(() => {
    if (storageKey) {
      loadProgress();
    } else {
      setProgress(null);
      setIsLoading(false);
    }
  }, [storageKey]);

  const loadProgress = async () => {
    if (!storageKey) return;

    try {
      setIsLoading(true);
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) {
        setProgress(JSON.parse(stored));
      } else {
        // Initialize empty progress for this country
        const initial: CountryProgress = {
          countryId: countryId!,
          documents: [],
          lastUpdated: new Date().toISOString(),
        };
        setProgress(initial);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateDocumentStatus = useCallback(
    async (documentId: string, status: Partial<DocumentStatus>) => {
      if (!storageKey || !countryId) return;

      try {
        const currentProgress = progress || {
          countryId,
          documents: [],
          lastUpdated: new Date().toISOString(),
        };

        const existingIndex = currentProgress.documents.findIndex(
          (d) => d.documentId === documentId
        );

        let updatedDocuments: DocumentStatus[];

        if (existingIndex >= 0) {
          // Update existing document status
          updatedDocuments = [...currentProgress.documents];
          updatedDocuments[existingIndex] = {
            ...updatedDocuments[existingIndex],
            ...status,
          };
        } else {
          // Add new document status
          updatedDocuments = [
            ...currentProgress.documents,
            {
              documentId,
              completed: false,
              ...status,
            },
          ];
        }

        const newProgress: CountryProgress = {
          ...currentProgress,
          documents: updatedDocuments,
          lastUpdated: new Date().toISOString(),
        };

        await AsyncStorage.setItem(storageKey, JSON.stringify(newProgress));
        setProgress(newProgress);
      } catch (error) {
        console.error('Error updating document status:', error);
      }
    },
    [storageKey, countryId, progress]
  );

  const toggleDocumentComplete = useCallback(
    async (documentId: string) => {
      if (!progress) return;

      const existing = progress.documents.find((d) => d.documentId === documentId);
      const isCurrentlyComplete = existing?.completed || false;

      await updateDocumentStatus(documentId, {
        completed: !isCurrentlyComplete,
      });
    },
    [progress, updateDocumentStatus]
  );

  const setDocumentFile = useCallback(
    async (documentId: string, fileName: string, filePath: string) => {
      await updateDocumentStatus(documentId, {
        completed: true,
        uploadedFileName: fileName,
        uploadedFilePath: filePath,
        uploadedAt: new Date().toISOString(),
      });
    },
    [updateDocumentStatus]
  );

  const removeDocumentFile = useCallback(
    async (documentId: string) => {
      await updateDocumentStatus(documentId, {
        completed: false,
        uploadedFileName: undefined,
        uploadedFilePath: undefined,
        uploadedAt: undefined,
      });
    },
    [updateDocumentStatus]
  );

  const getDocumentStatus = useCallback(
    (documentId: string): DocumentStatus | undefined => {
      return progress?.documents.find((d) => d.documentId === documentId);
    },
    [progress]
  );

  const getCompletedCount = useCallback((): number => {
    return progress?.documents.filter((d) => d.completed).length || 0;
  }, [progress]);

  const clearProgress = useCallback(async () => {
    if (!storageKey) return;

    try {
      await AsyncStorage.removeItem(storageKey);
      setProgress(null);
    } catch (error) {
      console.error('Error clearing progress:', error);
    }
  }, [storageKey]);

  return {
    progress,
    isLoading,
    updateDocumentStatus,
    toggleDocumentComplete,
    setDocumentFile,
    removeDocumentFile,
    getDocumentStatus,
    getCompletedCount,
    clearProgress,
    reload: loadProgress,
  };
}

/**
 * Simple key-value storage helpers
 */
/**
 * Uploaded document with country info
 */
export interface UploadedDocument extends DocumentStatus {
  countryId: string;
  countryName?: string;
  countryFlag?: string;
}

/**
 * Hook to get all uploaded documents across all countries
 */
export function useAllUploadedDocuments() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAllDocuments = useCallback(async () => {
    try {
      setIsLoading(true);
      const allKeys = await AsyncStorage.getAllKeys();
      const progressKeys = allKeys.filter((key) =>
        key.startsWith(STORAGE_KEYS.PROGRESS_PREFIX)
      );

      const allDocs: UploadedDocument[] = [];

      for (const key of progressKeys) {
        const data = await AsyncStorage.getItem(key);
        if (data) {
          const progress: CountryProgress = JSON.parse(data);
          const uploadedDocs = progress.documents.filter(
            (doc) => doc.uploadedFileName && doc.uploadedFilePath
          );

          for (const doc of uploadedDocs) {
            allDocs.push({
              ...doc,
              countryId: progress.countryId,
            });
          }
        }
      }

      // Sort by upload date (newest first)
      allDocs.sort((a, b) => {
        const dateA = a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0;
        const dateB = b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0;
        return dateB - dateA;
      });

      setDocuments(allDocs);
    } catch (error) {
      console.error('Error loading all documents:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllDocuments();
  }, [loadAllDocuments]);

  const removeDocument = useCallback(
    async (countryId: string, documentId: string) => {
      const storageKey = `${STORAGE_KEYS.PROGRESS_PREFIX}${countryId}`;

      try {
        const data = await AsyncStorage.getItem(storageKey);
        if (data) {
          const progress: CountryProgress = JSON.parse(data);
          const existingIndex = progress.documents.findIndex(
            (d) => d.documentId === documentId
          );

          if (existingIndex >= 0) {
            progress.documents[existingIndex] = {
              ...progress.documents[existingIndex],
              completed: false,
              uploadedFileName: undefined,
              uploadedFilePath: undefined,
              uploadedAt: undefined,
            };

            await AsyncStorage.setItem(storageKey, JSON.stringify(progress));
            await loadAllDocuments();
          }
        }
      } catch (error) {
        console.error('Error removing document:', error);
      }
    },
    [loadAllDocuments]
  );

  return {
    documents,
    isLoading,
    reload: loadAllDocuments,
    removeDocument,
  };
}

export const Storage = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },
};

