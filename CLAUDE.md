# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PackNDocs** — a visa application assistant for Turkish citizens applying for Schengen (EU), US, and UK visas. Built with React Native + Expo (SDK 54) using file-based routing (expo-router). The UI is entirely in Turkish.

## Commands

```bash
npm start          # Start Expo dev server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run on web
npx expo lint      # Run ESLint (expo lint)
```

No test framework is configured.

## Architecture

### Routing (expo-router, file-based)

- `app/_layout.tsx` — Root Stack navigator with `AppProvider` context wrapper. Controls auth/onboarding flow: redirects based on `hasOnboarded` and `targetRegion` state.
- `app/onboarding.tsx` — 3-page intro swiper (first-time users)
- `app/target-select.tsx` — Region selection (EU/US/GB)
- `app/(tabs)/` — Main tab navigator (Home, Explore, News)
- `app/country/[id].tsx` — Country detail with document checklist
- `app/news/[id].tsx` — News detail page
- `app/settings.tsx` — Modal settings screen
- Typed routes enabled (`experiments.typedRoutes` in app.json)

### State Management

Single React Context (`context/AppContext.tsx`) using `AsyncStorage` for persistence. All storage keys are prefixed with `packndocs_`. Access via `useApp()` hook. Tracks: onboarding status, target region, selected country, visa purpose, travel timeline.

### Data Layer

Static TypeScript data files (no backend API in MVP):
- `data/countries.ts` — 28 EU + US + UK country definitions
- `data/documents.ts` — Document requirements per visa type (Schengen/US/UK)
- `data/news.ts` — Static visa news items

### Type System

All types in `types/index.ts`. Key types: `TargetRegion` ('eu'|'us'|'gb'), `VisaPurpose`, `TravelTimeline`, `Country`, `DocumentRequirement`, `DocumentStatus`.

### Theme

`constants/theme.ts` exports `AppColors` (Tom Thumb green palette), `BorderRadius`, `Spacing`, `Shadows`, and light/dark `Colors` for React Navigation. The React Compiler is enabled (`experiments.reactCompiler` in app.json).

### Component Organization

- `components/common/` — Shared UI (Button, RegionPickerModal)
- `components/onboarding/` — OnboardingSlide
- `components/home/` — ProgressCard, NewsCard
- `components/explore/` — CountryCard
- `components/country/` — DocumentItem

### File Upload

`utils/fileUpload.ts` — Uses `expo-document-picker` and `expo-file-system`. Supported formats: PDF, JPG, JPEG, PNG, DOC, DOCX. Size limits: 5MB (web), 10MB (mobile).

## Key Conventions

- Path alias: `@/*` maps to project root (configured in tsconfig.json)
- Turkish UI throughout — all user-facing strings are in Turkish
- New Architecture enabled (`newArchEnabled: true`)
- App uses guest mode only (no authentication in MVP)
- AsyncStorage keys must use `packndocs_` prefix
