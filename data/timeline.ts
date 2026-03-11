/**
 * PackNDocs Timeline & Cost Data
 * Application steps, deadlines, and cost breakdowns per visa type
 */

import { VisaType } from '@/types';

// A single step in the application timeline
export interface TimelineStep {
  id: string;
  nameTr: string;
  descriptionTr: string;
  icon: string;
  /** Days before appointment this should ideally be done */
  daysBeforeAppointment: number;
  /** Estimated duration to complete this step */
  estimatedDuration: string;
  /** Which document IDs this step relates to */
  relatedDocumentIds: string[];
}

// Cost item for the estimator
export interface CostItem {
  id: string;
  nameTr: string;
  amount: number;
  currency: string;
  required: boolean;
  note?: string;
}

// Cost breakdown per visa type
export interface VisaCostBreakdown {
  visaType: VisaType;
  items: CostItem[];
  currency: string;
}

// --- Timeline Steps ---

export const schengenTimeline: TimelineStep[] = [
  {
    id: 'step_appointment',
    nameTr: 'Randevu Al',
    descriptionTr: 'VFS Global veya TLS Contact üzerinden başvuru randevusu alın.',
    icon: '📅',
    daysBeforeAppointment: 60,
    estimatedDuration: '1 gün',
    relatedDocumentIds: [],
  },
  {
    id: 'step_form',
    nameTr: 'Başvuru Formunu Doldur',
    descriptionTr: 'Schengen vize başvuru formunu eksiksiz doldurun ve imzalayın.',
    icon: '📝',
    daysBeforeAppointment: 30,
    estimatedDuration: '30 dakika',
    relatedDocumentIds: ['application_form'],
  },
  {
    id: 'step_photo',
    nameTr: 'Biyometrik Fotoğraf Çektir',
    descriptionTr: 'Son 6 ay içinde çekilmiş 35x45mm biyometrik fotoğraf.',
    icon: '📸',
    daysBeforeAppointment: 21,
    estimatedDuration: '1 saat',
    relatedDocumentIds: ['photo'],
  },
  {
    id: 'step_insurance',
    nameTr: 'Seyahat Sigortası Yaptır',
    descriptionTr: 'En az 30.000 EUR teminatlı seyahat sağlık sigortası alın.',
    icon: '🛡️',
    daysBeforeAppointment: 14,
    estimatedDuration: '1-2 gün',
    relatedDocumentIds: ['insurance'],
  },
  {
    id: 'step_financial',
    nameTr: 'Banka Hesap Özeti Al',
    descriptionTr: 'Son 3 aya ait hesap hareketlerini bankadan alın. 30 günden eski olmamalı.',
    icon: '🏦',
    daysBeforeAppointment: 10,
    estimatedDuration: '1-2 gün',
    relatedDocumentIds: ['bank_statement'],
  },
  {
    id: 'step_employment',
    nameTr: 'İş Belgesini Hazırla',
    descriptionTr: 'İşvereninizden görev, maaş ve izin bilgilerini içeren yazı alın.',
    icon: '💼',
    daysBeforeAppointment: 10,
    estimatedDuration: '2-3 gün',
    relatedDocumentIds: ['employment_letter'],
  },
  {
    id: 'step_reservations',
    nameTr: 'Uçuş ve Otel Rezervasyonu',
    descriptionTr: 'Gidiş-dönüş uçuş ve konaklama rezervasyonlarını yapın (iptal edilebilir).',
    icon: '✈️',
    daysBeforeAppointment: 7,
    estimatedDuration: '1 gün',
    relatedDocumentIds: ['flight_reservation', 'hotel_reservation'],
  },
  {
    id: 'step_submit',
    nameTr: 'Başvuruyu Teslim Et',
    descriptionTr: 'Tüm belgeleri eksiksiz olarak randevu gününde teslim edin.',
    icon: '✅',
    daysBeforeAppointment: 0,
    estimatedDuration: 'Randevu günü',
    relatedDocumentIds: [],
  },
];

export const usTimeline: TimelineStep[] = [
  {
    id: 'step_ds160',
    nameTr: 'DS-160 Formunu Doldur',
    descriptionTr: 'Online DS-160 başvuru formunu eksiksiz doldurun.',
    icon: '📝',
    daysBeforeAppointment: 45,
    estimatedDuration: '1-2 saat',
    relatedDocumentIds: ['ds160'],
  },
  {
    id: 'step_fee',
    nameTr: 'Vize Ücretini Öde',
    descriptionTr: 'MRV ücretini (185 USD) ödeyip makbuzu saklayın.',
    icon: '💳',
    daysBeforeAppointment: 40,
    estimatedDuration: '1 gün',
    relatedDocumentIds: [],
  },
  {
    id: 'step_appointment',
    nameTr: 'Mülakat Randevusu Al',
    descriptionTr: 'ustraveldocs.com üzerinden mülakat randevusu alın.',
    icon: '📅',
    daysBeforeAppointment: 35,
    estimatedDuration: '1 gün',
    relatedDocumentIds: ['appointment_confirmation'],
  },
  {
    id: 'step_photo',
    nameTr: 'Fotoğraf Hazırla',
    descriptionTr: '5x5cm ABD vize fotoğraf gereksinimlerini karşılayan fotoğraf.',
    icon: '📸',
    daysBeforeAppointment: 21,
    estimatedDuration: '1 saat',
    relatedDocumentIds: ['photo'],
  },
  {
    id: 'step_financial',
    nameTr: 'Mali Belgeleri Hazırla',
    descriptionTr: 'Son 6 aylık banka hesap özetleri, mülk belgeleri.',
    icon: '🏦',
    daysBeforeAppointment: 14,
    estimatedDuration: '1-2 gün',
    relatedDocumentIds: ['bank_statement', 'tax_returns', 'property_documents'],
  },
  {
    id: 'step_employment',
    nameTr: 'İş Mektubunu Al',
    descriptionTr: 'İşvereninizden İngilizce iş mektubu alın.',
    icon: '💼',
    daysBeforeAppointment: 10,
    estimatedDuration: '2-3 gün',
    relatedDocumentIds: ['employment_letter'],
  },
  {
    id: 'step_interview',
    nameTr: 'Mülakata Git',
    descriptionTr: 'Tüm orijinal belgeleri yanınıza alarak mülakata gidin.',
    icon: '🏛️',
    daysBeforeAppointment: 0,
    estimatedDuration: 'Randevu günü',
    relatedDocumentIds: [],
  },
];

export const ukTimeline: TimelineStep[] = [
  {
    id: 'step_application',
    nameTr: 'Online Başvuru Yap',
    descriptionTr: 'GOV.UK üzerinden online vize başvurusunu tamamlayın.',
    icon: '📝',
    daysBeforeAppointment: 30,
    estimatedDuration: '1-2 saat',
    relatedDocumentIds: ['online_application'],
  },
  {
    id: 'step_fee',
    nameTr: 'Vize Ücretini Öde',
    descriptionTr: 'Vize ücretini (115 GBP) online olarak ödeyin.',
    icon: '💳',
    daysBeforeAppointment: 28,
    estimatedDuration: '30 dakika',
    relatedDocumentIds: [],
  },
  {
    id: 'step_biometric',
    nameTr: 'Biyometrik Randevu Al',
    descriptionTr: 'TLS Contact üzerinden biyometrik kayıt randevusu alın.',
    icon: '📅',
    daysBeforeAppointment: 25,
    estimatedDuration: '1 gün',
    relatedDocumentIds: ['appointment_confirmation'],
  },
  {
    id: 'step_photo',
    nameTr: 'Fotoğraf Hazırla',
    descriptionTr: '45x35mm renkli vesikalık fotoğraf.',
    icon: '📸',
    daysBeforeAppointment: 21,
    estimatedDuration: '1 saat',
    relatedDocumentIds: ['photo'],
  },
  {
    id: 'step_financial',
    nameTr: 'Mali Belgeleri Hazırla',
    descriptionTr: 'Son 6 aylık banka hesap özetlerini hazırlayın.',
    icon: '🏦',
    daysBeforeAppointment: 10,
    estimatedDuration: '1-2 gün',
    relatedDocumentIds: ['bank_statement'],
  },
  {
    id: 'step_employment',
    nameTr: 'İş Belgesini Hazırla',
    descriptionTr: 'İşveren mektubu veya işyeri tescil belgesi alın.',
    icon: '💼',
    daysBeforeAppointment: 10,
    estimatedDuration: '2-3 gün',
    relatedDocumentIds: ['employment_letter'],
  },
  {
    id: 'step_submit',
    nameTr: 'Belgeleri Teslim Et',
    descriptionTr: 'Biyometrik randevunuzda tüm belgeleri teslim edin.',
    icon: '✅',
    daysBeforeAppointment: 0,
    estimatedDuration: 'Randevu günü',
    relatedDocumentIds: [],
  },
];

// --- Cost Breakdowns ---

export const schengenCosts: VisaCostBreakdown = {
  visaType: 'schengen',
  currency: 'EUR',
  items: [
    { id: 'visa_fee', nameTr: 'Vize Ücreti', amount: 80, currency: 'EUR', required: true },
    { id: 'service_fee', nameTr: 'Servis Ücreti (VFS/TLS)', amount: 40, currency: 'EUR', required: true, note: 'Ortalama servis merkezi ücreti' },
    { id: 'insurance', nameTr: 'Seyahat Sigortası', amount: 25, currency: 'EUR', required: true, note: 'Minimum 30.000 EUR teminatlı' },
    { id: 'photo', nameTr: 'Biyometrik Fotoğraf', amount: 5, currency: 'EUR', required: true },
    { id: 'translation', nameTr: 'Belge Tercümesi', amount: 50, currency: 'EUR', required: false, note: 'Belge başına ortalama ücret' },
    { id: 'notary', nameTr: 'Noter Onayı', amount: 20, currency: 'EUR', required: false, note: 'Gerekirse noter masrafı' },
  ],
};

export const usCosts: VisaCostBreakdown = {
  visaType: 'us_visa',
  currency: 'USD',
  items: [
    { id: 'visa_fee', nameTr: 'Vize Ücreti (MRV)', amount: 185, currency: 'USD', required: true },
    { id: 'photo', nameTr: 'Dijital Fotoğraf', amount: 5, currency: 'USD', required: true },
    { id: 'translation', nameTr: 'Belge Tercümesi', amount: 60, currency: 'USD', required: false, note: 'Belge başına ortalama ücret' },
    { id: 'courier', nameTr: 'Kurye Ücreti', amount: 20, currency: 'USD', required: false, note: 'Pasaport iade kurye ücreti' },
  ],
};

export const ukCosts: VisaCostBreakdown = {
  visaType: 'uk_visa',
  currency: 'GBP',
  items: [
    { id: 'visa_fee', nameTr: 'Vize Ücreti', amount: 115, currency: 'GBP', required: true },
    { id: 'ihs', nameTr: 'Sağlık Ek Ücreti (IHS)', amount: 0, currency: 'GBP', required: false, note: '6 aydan kısa kalışlarda ödenmez' },
    { id: 'biometric', nameTr: 'Biyometrik Kayıt Ücreti', amount: 55, currency: 'GBP', required: true, note: 'TLS Contact merkez ücreti' },
    { id: 'photo', nameTr: 'Vesikalık Fotoğraf', amount: 5, currency: 'GBP', required: true },
    { id: 'priority', nameTr: 'Öncelikli İşlem', amount: 250, currency: 'GBP', required: false, note: '5 iş günü sonuç (opsiyonel)' },
    { id: 'translation', nameTr: 'Belge Tercümesi', amount: 40, currency: 'GBP', required: false, note: 'Belge başına ortalama ücret' },
  ],
};

// --- Helper functions ---

export function getTimelineByVisaType(visaType: VisaType): TimelineStep[] {
  switch (visaType) {
    case 'schengen':
      return schengenTimeline;
    case 'us_visa':
      return usTimeline;
    case 'uk_visa':
      return ukTimeline;
    case 'eu_visa':
      return schengenTimeline; // Similar process
    default:
      return schengenTimeline;
  }
}

export function getCostsByVisaType(visaType: VisaType): VisaCostBreakdown {
  switch (visaType) {
    case 'schengen':
      return schengenCosts;
    case 'us_visa':
      return usCosts;
    case 'uk_visa':
      return ukCosts;
    case 'eu_visa':
      return { ...schengenCosts, visaType: 'eu_visa' };
    default:
      return schengenCosts;
  }
}

/**
 * Calculate deadline dates based on appointment date
 * Returns timeline steps with calculated deadline dates
 */
export function calculateDeadlines(
  visaType: VisaType,
  appointmentDate: Date
): (TimelineStep & { deadlineDate: Date; isOverdue: boolean; daysRemaining: number })[] {
  const steps = getTimelineByVisaType(visaType);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return steps.map((step) => {
    const deadlineDate = new Date(appointmentDate);
    deadlineDate.setDate(deadlineDate.getDate() - step.daysBeforeAppointment);
    deadlineDate.setHours(0, 0, 0, 0);

    const diffTime = deadlineDate.getTime() - now.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isOverdue = daysRemaining < 0;

    return {
      ...step,
      deadlineDate,
      isOverdue,
      daysRemaining,
    };
  });
}
