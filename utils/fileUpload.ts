/**
 * PackNDocs File Upload Utilities
 * Handle document picking and local file storage
 */

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

// Supported file types
export const SUPPORTED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// File type extensions
export const FILE_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];

// Max file sizes
export const MAX_FILE_SIZE_WEB = 5 * 1024 * 1024; // 5MB for web
export const MAX_FILE_SIZE_MOBILE = 10 * 1024 * 1024; // 10MB for mobile

// Document storage directory
export const DOCUMENTS_DIR = `${FileSystem.documentDirectory}packndocs/`;

/**
 * Initialize documents directory if it doesn't exist
 */
export async function initDocumentsDirectory(): Promise<void> {
  try {
    const dirInfo = await FileSystem.getInfoAsync(DOCUMENTS_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(DOCUMENTS_DIR, { intermediates: true });
    }
  } catch (error) {
    console.error('Error initializing documents directory:', error);
  }
}

/**
 * Pick a document using the system file picker
 */
export async function pickDocument(): Promise<{
  success: boolean;
  file?: {
    name: string;
    uri: string;
    size?: number;
    mimeType?: string;
  };
  error?: string;
}> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: SUPPORTED_FILE_TYPES,
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return { success: false, error: 'User cancelled' };
    }

    const file = result.assets[0];

    if (!file) {
      return { success: false, error: 'No file selected' };
    }

    // Check file size
    const maxSize = Platform.OS === 'web' ? MAX_FILE_SIZE_WEB : MAX_FILE_SIZE_MOBILE;
    if (file.size && file.size > maxSize) {
      const maxMB = maxSize / (1024 * 1024);
      return {
        success: false,
        error: `Dosya boyutu ${maxMB}MB'dan küçük olmalıdır`,
      };
    }

    return {
      success: true,
      file: {
        name: file.name,
        uri: file.uri,
        size: file.size,
        mimeType: file.mimeType,
      },
    };
  } catch (error) {
    console.error('Error picking document:', error);
    return {
      success: false,
      error: 'Dosya seçilirken bir hata oluştu',
    };
  }
}

/**
 * Save a picked document to local storage
 */
export async function saveDocument(
  sourceUri: string,
  documentId: string,
  countryId: string,
  originalName: string
): Promise<{
  success: boolean;
  savedPath?: string;
  error?: string;
}> {
  try {
    // Initialize directory
    await initDocumentsDirectory();

    // Create unique filename
    const extension = originalName.split('.').pop() || 'pdf';
    const timestamp = Date.now();
    const fileName = `${countryId}_${documentId}_${timestamp}.${extension}`;
    const destinationPath = `${DOCUMENTS_DIR}${fileName}`;

    // Copy file to our documents directory
    if (Platform.OS === 'web') {
      // For web, we just keep the URI reference
      return {
        success: true,
        savedPath: sourceUri,
      };
    }

    await FileSystem.copyAsync({
      from: sourceUri,
      to: destinationPath,
    });

    return {
      success: true,
      savedPath: destinationPath,
    };
  } catch (error) {
    console.error('Error saving document:', error);
    return {
      success: false,
      error: 'Dosya kaydedilirken bir hata oluştu',
    };
  }
}

/**
 * Delete a saved document
 */
export async function deleteDocument(filePath: string): Promise<boolean> {
  try {
    if (Platform.OS === 'web') {
      // Web doesn't have file system access
      return true;
    }

    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(filePath);
    }
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
}

/**
 * Get file info
 */
export async function getFileInfo(filePath: string): Promise<{
  exists: boolean;
  size?: number;
  modificationTime?: number;
}> {
  try {
    if (Platform.OS === 'web') {
      return { exists: true };
    }

    const info = await FileSystem.getInfoAsync(filePath);
    return {
      exists: info.exists,
      size: info.exists ? (info as any).size : undefined,
      modificationTime: info.exists ? (info as any).modificationTime : undefined,
    };
  } catch (error) {
    console.error('Error getting file info:', error);
    return { exists: false };
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Check if file type is supported
 */
export function isFileTypeSupported(mimeType: string): boolean {
  return SUPPORTED_FILE_TYPES.includes(mimeType);
}

/**
 * Get icon name based on file type
 */
export function getFileIcon(mimeType?: string): string {
  if (!mimeType) return 'doc.fill';

  if (mimeType.includes('pdf')) return 'doc.text.fill';
  if (mimeType.includes('image')) return 'photo.fill';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'doc.fill';

  return 'doc.fill';
}

/**
 * Clean up old/orphaned document files
 */
export async function cleanupOrphanedFiles(
  activeFilePaths: string[]
): Promise<number> {
  if (Platform.OS === 'web') return 0;

  try {
    await initDocumentsDirectory();

    const files = await FileSystem.readDirectoryAsync(DOCUMENTS_DIR);
    let deletedCount = 0;

    for (const file of files) {
      const fullPath = `${DOCUMENTS_DIR}${file}`;
      if (!activeFilePaths.includes(fullPath)) {
        await FileSystem.deleteAsync(fullPath);
        deletedCount++;
      }
    }

    return deletedCount;
  } catch (error) {
    console.error('Error cleaning up files:', error);
    return 0;
  }
}

