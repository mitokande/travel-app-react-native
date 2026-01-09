/**
 * PackNDocs Document Requirements
 * Document checklists for different visa types
 */

import { DocumentRequirement, VisaType } from '@/types';

// Schengen visa document requirements
export const schengenDocuments: DocumentRequirement[] = [
  {
    id: 'passport',
    name: 'Passport',
    nameTr: 'Pasaport',
    type: 'identity',
    required: true,
    estimatedTime: 'Mevcut',
    description: 'Valid passport with at least 6 months validity',
    descriptionTr: 'Son 10 yıl içinde düzenlenmiş, en az 6 ay geçerli, en az 2 boş vize sayfası olan pasaport.',
  },
  {
    id: 'photo',
    name: 'Biometric Photo',
    nameTr: 'Biyometrik Fotoğraf',
    type: 'photo',
    required: true,
    estimatedTime: '1 saat',
    description: '2 recent passport-size photos',
    descriptionTr: 'Son 6 ay içinde çekilmiş, 35x45mm boyutunda, beyaz arka planlı 2 adet biyometrik fotoğraf.',
  },
  {
    id: 'application_form',
    name: 'Visa Application Form',
    nameTr: 'Vize Başvuru Formu',
    type: 'form',
    required: true,
    estimatedTime: '30 dakika',
    description: 'Completed and signed Schengen visa application form',
    descriptionTr: 'Eksiksiz doldurulmuş ve imzalanmış Schengen vize başvuru formu.',
  },
  {
    id: 'insurance',
    name: 'Travel Health Insurance',
    nameTr: 'Seyahat Sağlık Sigortası',
    type: 'insurance',
    required: true,
    estimatedTime: '1-2 gün',
    description: 'Minimum 30,000 EUR coverage valid in Schengen area',
    descriptionTr: 'Tüm Schengen bölgesinde geçerli, en az 30.000 Euro teminatlı seyahat sağlık sigortası.',
  },
  {
    id: 'flight_reservation',
    name: 'Flight Reservation',
    nameTr: 'Uçuş Rezervasyonu',
    type: 'reservation',
    required: true,
    estimatedTime: '1 gün',
    description: 'Round-trip flight reservation',
    descriptionTr: 'Gidiş-dönüş uçuş rezervasyonu (bilet satın almayın, rezervasyon yeterli).',
  },
  {
    id: 'hotel_reservation',
    name: 'Accommodation Reservation',
    nameTr: 'Konaklama Rezervasyonu',
    type: 'reservation',
    required: true,
    estimatedTime: '1 gün',
    description: 'Hotel booking or invitation letter',
    descriptionTr: 'Otel rezervasyonu veya ev sahibinden davet mektubu.',
  },
  {
    id: 'bank_statement',
    name: 'Bank Statement',
    nameTr: 'Banka Hesap Özeti',
    type: 'financial',
    required: true,
    estimatedTime: '1-2 gün',
    description: 'Last 3 months bank statements',
    descriptionTr: 'Son 3 aya ait banka hesap hareketleri ve güncel bakiye.',
  },
  {
    id: 'employment_letter',
    name: 'Employment Certificate',
    nameTr: 'İş Belgesi',
    type: 'employment',
    required: true,
    estimatedTime: '2-3 gün',
    description: 'Letter from employer stating position, salary, and leave approval',
    descriptionTr: 'İşvereninizden alınan, görev, maaş ve izin onayını belirten yazı.',
  },
  {
    id: 'travel_itinerary',
    name: 'Travel Itinerary',
    nameTr: 'Seyahat Planı',
    type: 'other',
    required: false,
    estimatedTime: '1 saat',
    description: 'Detailed day-by-day travel plan',
    descriptionTr: 'Günlük detaylı seyahat planı.',
  },
  {
    id: 'old_passports',
    name: 'Previous Passports',
    nameTr: 'Eski Pasaportlar',
    type: 'identity',
    required: false,
    estimatedTime: 'Mevcut',
    description: 'Previous passports with visa stamps if available',
    descriptionTr: 'Varsa eski pasaportlar ve içindeki vize damgaları.',
  },
];

// US visa document requirements
export const usDocuments: DocumentRequirement[] = [
  {
    id: 'passport',
    name: 'Passport',
    nameTr: 'Pasaport',
    type: 'identity',
    required: true,
    estimatedTime: 'Mevcut',
    description: 'Valid passport with at least 6 months validity beyond intended stay',
    descriptionTr: 'Planlanan kalış süresinin ötesinde en az 6 ay geçerli pasaport.',
  },
  {
    id: 'photo',
    name: 'Digital Photo',
    nameTr: 'Dijital Fotoğraf',
    type: 'photo',
    required: true,
    estimatedTime: '1 saat',
    description: '5x5cm photo meeting US visa photo requirements',
    descriptionTr: 'ABD vize fotoğraf gereksinimlerini karşılayan 5x5cm dijital fotoğraf.',
  },
  {
    id: 'ds160',
    name: 'DS-160 Form',
    nameTr: 'DS-160 Formu',
    type: 'form',
    required: true,
    estimatedTime: '1-2 saat',
    description: 'Online nonimmigrant visa application form',
    descriptionTr: 'Online doldurulması gereken göçmen olmayan vize başvuru formu.',
  },
  {
    id: 'appointment_confirmation',
    name: 'Interview Appointment',
    nameTr: 'Mülakat Randevusu',
    type: 'form',
    required: true,
    estimatedTime: '1 gün',
    description: 'Confirmation page for embassy/consulate interview',
    descriptionTr: 'Büyükelçilik/Konsolosluk mülakat randevu onay sayfası.',
  },
  {
    id: 'bank_statement',
    name: 'Bank Statements',
    nameTr: 'Banka Hesap Özetleri',
    type: 'financial',
    required: true,
    estimatedTime: '1-2 gün',
    description: 'Last 6 months bank statements showing sufficient funds',
    descriptionTr: 'Son 6 aya ait yeterli bakiyeyi gösteren banka hesap hareketleri.',
  },
  {
    id: 'employment_letter',
    name: 'Employment Letter',
    nameTr: 'İş Mektubu',
    type: 'employment',
    required: true,
    estimatedTime: '2-3 gün',
    description: 'Letter from employer with job details and approved leave',
    descriptionTr: 'İş detayları ve onaylanmış izni içeren işveren mektubu.',
  },
  {
    id: 'tax_returns',
    name: 'Tax Returns',
    nameTr: 'Vergi Beyannameleri',
    type: 'financial',
    required: false,
    estimatedTime: 'Mevcut',
    description: 'Last 2-3 years tax returns',
    descriptionTr: 'Son 2-3 yıla ait vergi beyannameleri.',
  },
  {
    id: 'property_documents',
    name: 'Property Documents',
    nameTr: 'Mülk Belgeleri',
    type: 'financial',
    required: false,
    estimatedTime: 'Mevcut',
    description: 'Title deeds, vehicle registration if applicable',
    descriptionTr: 'Varsa tapu, araç ruhsatı gibi mülkiyet belgeleri.',
  },
  {
    id: 'invitation_letter',
    name: 'Invitation Letter',
    nameTr: 'Davet Mektubu',
    type: 'invitation',
    required: false,
    estimatedTime: '3-5 gün',
    description: 'Letter from US host if visiting someone',
    descriptionTr: 'ABD\'de birini ziyaret ediyorsanız ev sahibinden davet mektubu.',
  },
  {
    id: 'travel_itinerary',
    name: 'Travel Plans',
    nameTr: 'Seyahat Planları',
    type: 'other',
    required: false,
    estimatedTime: '1 saat',
    description: 'Detailed travel itinerary for your US visit',
    descriptionTr: 'ABD ziyaretiniz için detaylı seyahat planı.',
  },
];

// UK visa document requirements
export const ukDocuments: DocumentRequirement[] = [
  {
    id: 'passport',
    name: 'Passport',
    nameTr: 'Pasaport',
    type: 'identity',
    required: true,
    estimatedTime: 'Mevcut',
    description: 'Valid passport with blank page for visa',
    descriptionTr: 'Vize için boş sayfası olan geçerli pasaport.',
  },
  {
    id: 'photo',
    name: 'Passport Photo',
    nameTr: 'Vesikalık Fotoğraf',
    type: 'photo',
    required: true,
    estimatedTime: '1 saat',
    description: '45mm x 35mm color photograph',
    descriptionTr: '45mm x 35mm boyutunda renkli fotoğraf.',
  },
  {
    id: 'online_application',
    name: 'Online Application',
    nameTr: 'Online Başvuru',
    type: 'form',
    required: true,
    estimatedTime: '1-2 saat',
    description: 'Completed online visa application on GOV.UK',
    descriptionTr: 'GOV.UK üzerinden tamamlanmış online vize başvurusu.',
  },
  {
    id: 'appointment_confirmation',
    name: 'Biometric Appointment',
    nameTr: 'Biyometrik Randevu',
    type: 'form',
    required: true,
    estimatedTime: '1 gün',
    description: 'Confirmation for biometric enrollment appointment',
    descriptionTr: 'Biyometrik kayıt randevu onayı.',
  },
  {
    id: 'bank_statement',
    name: 'Financial Evidence',
    nameTr: 'Mali Belgeler',
    type: 'financial',
    required: true,
    estimatedTime: '1-2 gün',
    description: 'Bank statements showing funds for trip',
    descriptionTr: 'Seyahat için yeterli bakiyeyi gösteren banka hesap özetleri.',
  },
  {
    id: 'employment_letter',
    name: 'Employment Evidence',
    nameTr: 'İş Belgesi',
    type: 'employment',
    required: true,
    estimatedTime: '2-3 gün',
    description: 'Letter from employer or business registration',
    descriptionTr: 'İşveren mektubu veya işyeri tescil belgesi.',
  },
  {
    id: 'accommodation',
    name: 'Accommodation Details',
    nameTr: 'Konaklama Bilgileri',
    type: 'reservation',
    required: true,
    estimatedTime: '1 gün',
    description: 'Hotel bookings or host address',
    descriptionTr: 'Otel rezervasyonu veya kalınacak adres bilgisi.',
  },
  {
    id: 'travel_history',
    name: 'Travel History',
    nameTr: 'Seyahat Geçmişi',
    type: 'other',
    required: false,
    estimatedTime: 'Mevcut',
    description: 'Previous visas and travel stamps',
    descriptionTr: 'Önceki vizeler ve seyahat damgaları.',
  },
  {
    id: 'invitation_letter',
    name: 'Invitation Letter',
    nameTr: 'Davet Mektubu',
    type: 'invitation',
    required: false,
    estimatedTime: '3-5 gün',
    description: 'Letter from UK host if applicable',
    descriptionTr: 'İngiltere\'de birini ziyaret ediyorsanız davet mektubu.',
  },
  {
    id: 'tb_test',
    name: 'TB Test Certificate',
    nameTr: 'TB Testi Sertifikası',
    type: 'other',
    required: false,
    estimatedTime: '1 hafta',
    description: 'TB test certificate if staying more than 6 months',
    descriptionTr: '6 aydan uzun kalınacaksa TB testi sertifikası.',
  },
];

// EU (non-Schengen) document requirements
export const euVisaDocuments: DocumentRequirement[] = [
  ...schengenDocuments.slice(0, 8), // Base documents similar to Schengen
];

// Helper function to get documents by visa type
export function getDocumentsByVisaType(visaType: VisaType): DocumentRequirement[] {
  switch (visaType) {
    case 'schengen':
      return schengenDocuments;
    case 'us_visa':
      return usDocuments;
    case 'uk_visa':
      return ukDocuments;
    case 'eu_visa':
      return euVisaDocuments;
    default:
      return schengenDocuments;
  }
}

// Get document by ID
export function getDocumentById(
  visaType: VisaType,
  documentId: string
): DocumentRequirement | undefined {
  const documents = getDocumentsByVisaType(visaType);
  return documents.find((doc) => doc.id === documentId);
}

// Get required documents only
export function getRequiredDocuments(visaType: VisaType): DocumentRequirement[] {
  return getDocumentsByVisaType(visaType).filter((doc) => doc.required);
}

// Get optional documents only
export function getOptionalDocuments(visaType: VisaType): DocumentRequirement[] {
  return getDocumentsByVisaType(visaType).filter((doc) => !doc.required);
}

