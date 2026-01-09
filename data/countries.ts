/**
 * PackNDocs Country Data
 * All supported countries for visa applications
 */

import { Country, RegionCard } from '@/types';

// Available target regions
export const targetRegions: RegionCard[] = [
  {
    id: 'eu',
    name: 'European Union',
    nameTr: 'Avrupa Birliği',
    flag: '🇪🇺',
    visaType: 'Schengen Vizesi',
  },
  {
    id: 'us',
    name: 'United States',
    nameTr: 'Amerika Birleşik Devletleri',
    flag: '🇺🇸',
    visaType: 'ABD Vizesi',
  },
  {
    id: 'gb',
    name: 'United Kingdom',
    nameTr: 'Birleşik Krallık',
    flag: '🇬🇧',
    visaType: 'İngiltere Vizesi',
  },
];

// European Union / Schengen Countries
export const euCountries: Country[] = [
  {
    id: 'germany',
    name: 'Germany',
    nameTr: 'Almanya',
    flag: '🇩🇪',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Germany',
    generalInfo: 'Almanya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'france',
    name: 'France',
    nameTr: 'Fransa',
    flag: '🇫🇷',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit France',
    generalInfo: 'Fransa Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'spain',
    name: 'Spain',
    nameTr: 'İspanya',
    flag: '🇪🇸',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Spain',
    generalInfo: 'İspanya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'italy',
    name: 'Italy',
    nameTr: 'İtalya',
    flag: '🇮🇹',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Italy',
    generalInfo: 'İtalya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    nameTr: 'Hollanda',
    flag: '🇳🇱',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Netherlands',
    generalInfo: 'Hollanda Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'belgium',
    name: 'Belgium',
    nameTr: 'Belçika',
    flag: '🇧🇪',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Belgium',
    generalInfo: 'Belçika Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'austria',
    name: 'Austria',
    nameTr: 'Avusturya',
    flag: '🇦🇹',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Austria',
    generalInfo: 'Avusturya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'greece',
    name: 'Greece',
    nameTr: 'Yunanistan',
    flag: '🇬🇷',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Greece',
    generalInfo: 'Yunanistan Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'portugal',
    name: 'Portugal',
    nameTr: 'Portekiz',
    flag: '🇵🇹',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Portugal',
    generalInfo: 'Portekiz Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'sweden',
    name: 'Sweden',
    nameTr: 'İsveç',
    flag: '🇸🇪',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Sweden',
    generalInfo: 'İsveç Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'norway',
    name: 'Norway',
    nameTr: 'Norveç',
    flag: '🇳🇴',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Norway',
    generalInfo: 'Norveç Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'denmark',
    name: 'Denmark',
    nameTr: 'Danimarka',
    flag: '🇩🇰',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Denmark',
    generalInfo: 'Danimarka Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'finland',
    name: 'Finland',
    nameTr: 'Finlandiya',
    flag: '🇫🇮',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Finland',
    generalInfo: 'Finlandiya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'poland',
    name: 'Poland',
    nameTr: 'Polonya',
    flag: '🇵🇱',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Poland',
    generalInfo: 'Polonya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'czech',
    name: 'Czech Republic',
    nameTr: 'Çekya',
    flag: '🇨🇿',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Czech Republic',
    generalInfo: 'Çekya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'hungary',
    name: 'Hungary',
    nameTr: 'Macaristan',
    flag: '🇭🇺',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Hungary',
    generalInfo: 'Macaristan Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    nameTr: 'İsviçre',
    flag: '🇨🇭',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Switzerland',
    generalInfo: 'İsviçre Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'luxembourg',
    name: 'Luxembourg',
    nameTr: 'Lüksemburg',
    flag: '🇱🇺',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Luxembourg',
    generalInfo: 'Lüksemburg Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'malta',
    name: 'Malta',
    nameTr: 'Malta',
    flag: '🇲🇹',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Malta',
    generalInfo: 'Malta Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'slovenia',
    name: 'Slovenia',
    nameTr: 'Slovenya',
    flag: '🇸🇮',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Slovenia',
    generalInfo: 'Slovenya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'slovakia',
    name: 'Slovakia',
    nameTr: 'Slovakya',
    flag: '🇸🇰',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Slovakia',
    generalInfo: 'Slovakya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'estonia',
    name: 'Estonia',
    nameTr: 'Estonya',
    flag: '🇪🇪',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Estonia',
    generalInfo: 'Estonya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'latvia',
    name: 'Latvia',
    nameTr: 'Letonya',
    flag: '🇱🇻',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Latvia',
    generalInfo: 'Letonya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'lithuania',
    name: 'Lithuania',
    nameTr: 'Litvanya',
    flag: '🇱🇹',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Lithuania',
    generalInfo: 'Litvanya Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'croatia',
    name: 'Croatia',
    nameTr: 'Hırvatistan',
    flag: '🇭🇷',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Croatia',
    generalInfo: 'Hırvatistan Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'bulgaria',
    name: 'Bulgaria',
    nameTr: 'Bulgaristan',
    flag: '🇧🇬',
    region: 'eu',
    visaType: 'eu_visa',
    description: 'Apply for an EU visa to visit Bulgaria',
    generalInfo: 'Bulgaristan vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'romania',
    name: 'Romania',
    nameTr: 'Romanya',
    flag: '🇷🇴',
    region: 'eu',
    visaType: 'eu_visa',
    description: 'Apply for an EU visa to visit Romania',
    generalInfo: 'Romanya vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
  {
    id: 'iceland',
    name: 'Iceland',
    nameTr: 'İzlanda',
    flag: '🇮🇸',
    region: 'eu',
    visaType: 'schengen',
    description: 'Apply for a Schengen visa to visit Iceland',
    generalInfo: 'İzlanda Schengen vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi.',
  },
];

// United States
export const usCountries: Country[] = [
  {
    id: 'usa',
    name: 'United States',
    nameTr: 'Amerika Birleşik Devletleri',
    flag: '🇺🇸',
    region: 'us',
    visaType: 'us_visa',
    description: 'Apply for a US visa',
    generalInfo: 'ABD vizesi (B1/B2 Turist/İş Vizesi) başvurusu için gerekli belgeler ve süreç hakkında bilgi. DS-160 formu doldurulmalı ve konsolosluk mülakatına girilmelidir.',
  },
];

// United Kingdom
export const ukCountries: Country[] = [
  {
    id: 'uk',
    name: 'United Kingdom',
    nameTr: 'Birleşik Krallık',
    flag: '🇬🇧',
    region: 'gb',
    visaType: 'uk_visa',
    description: 'Apply for a UK visa',
    generalInfo: 'İngiltere vizesi başvurusu için gerekli belgeler ve süreç hakkında bilgi. Standard Visitor Visa için online başvuru yapılmalıdır.',
  },
];

// All countries combined
export const allCountries: Country[] = [...euCountries, ...usCountries, ...ukCountries];

// Helper functions
export function getCountriesByRegion(region: string): Country[] {
  switch (region) {
    case 'eu':
      return euCountries;
    case 'us':
      return usCountries;
    case 'gb':
      return ukCountries;
    default:
      return [];
  }
}

export function getCountryById(id: string): Country | undefined {
  return allCountries.find((country) => country.id === id);
}

export function getRegionByCountryId(countryId: string): string | undefined {
  const country = getCountryById(countryId);
  return country?.region;
}

