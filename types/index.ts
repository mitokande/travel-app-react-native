/**
 * PackNDocs Type Definitions
 */

// Target regions available in the app
export type TargetRegion = 'eu' | 'us' | 'gb';

// Visa types
export type VisaType = 'schengen' | 'us_visa' | 'uk_visa' | 'eu_visa';

// Document types
export type DocumentType = 
  | 'identity' 
  | 'photo' 
  | 'insurance' 
  | 'reservation' 
  | 'financial' 
  | 'form' 
  | 'employment' 
  | 'invitation' 
  | 'other';

// Country interface
export interface Country {
  id: string;
  name: string;
  nameTr: string; // Turkish name
  flag: string;
  region: TargetRegion;
  visaType: VisaType;
  image?: string;
  description?: string;
  generalInfo?: string;
}

// Document requirement interface
export interface DocumentRequirement {
  id: string;
  name: string;
  nameTr: string;
  type: DocumentType;
  required: boolean;
  estimatedTime?: string; // e.g., "1-2 gün"
  description?: string;
  descriptionTr?: string;
}

// User's document status
export interface DocumentStatus {
  documentId: string;
  completed: boolean;
  uploadedFileName?: string;
  uploadedFilePath?: string;
  uploadedAt?: string;
}

// Country progress tracking
export interface CountryProgress {
  countryId: string;
  documents: DocumentStatus[];
  lastUpdated: string;
}

// App storage state
export interface AppState {
  hasOnboarded: boolean;
  targetRegion: TargetRegion | null;
  selectedCountryId: string | null;
  progress: Record<string, CountryProgress>;
}

// News item for home dashboard
export interface NewsItem {
  id: string;
  title: string;
  titleTr: string;
  date: string;
  icon?: string;
  url?: string;
}

// Onboarding slide data
export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Region selection card
export interface RegionCard {
  id: TargetRegion;
  name: string;
  nameTr: string;
  flag: string;
  visaType: string;
}

