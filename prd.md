# Product Requirements Document (PRD)

## PackNDocs - Visa Application Assistant

---

## 1. Executive Summary

**Product Name:** PackNDocs  
**Version:** 1.0.0  
**Platform:** Cross-platform Mobile Application (iOS, Android, Web)  
**Framework:** React Native Expo
**Target Audience:** Turkish citizens applying for international visas  
**Primary Language:** Turkish (UI)

PackNDocs is a comprehensive visa application assistant that helps users navigate the complex process of preparing visa documentation for international travel. The app provides personalized guidance, document checklists, progress tracking, and up-to-date visa news for destinations including the European Union (Schengen), United States, and United Kingdom.

---

## 2. Problem Statement

### Pain Points Addressed
- **Complexity:** Visa applications require numerous documents, and requirements vary by destination country
- **Lack of Organization:** Applicants often struggle to track which documents they've prepared
- **Information Gaps:** Visa requirements change frequently, making it difficult to stay informed
- **No Centralized System:** Users typically manage documents across multiple platforms without a unified tracking system

### Solution
PackNDocs provides a single, intuitive platform where users can:
- Select their target destination
- View country-specific document requirements
- Upload and track document preparation progress
- Receive updates on visa news and policy changes

---

## 3. User Personas

### Primary Persona: Turkish Traveler
- **Demographics:** 25-45 years old, Turkish citizen
- **Goals:** Apply for travel/tourist visa to Europe, US, or UK
- **Tech Savviness:** Moderate to high smartphone usage
- **Pain Points:** Overwhelmed by visa requirements, unsure about document completeness

### Secondary Persona: Student/Professional
- **Demographics:** 18-35 years old, seeking study or work visas
- **Goals:** Long-term visa for education or employment
- **Needs:** Detailed document tracking, deadline reminders

---

## 4. Product Features

### 4.1 Onboarding Experience

**Description:** A 3-screen guided introduction to the app's core features.

**Screens:**
1. **"Tüm Belgeler Tek Yerde"** (All Documents in One Place)
   - Highlights document consolidation feature
   
2. **"Kişiselleştirilmiş Rehber"** (Personalized Guide)
   - Emphasizes location-based application center recommendations
   
3. **"Takip ve Hatırlatma"** (Tracking and Reminders)
   - Showcases progress tracking and notification features

**Components:**
- Smooth page indicator with expanding dots effect
- Brand logo and app name display
- "Başlayalım" (Let's Start) CTA button
- Login redirect for existing users

---

### 4.2 Target Region Selection

**Description:** Users select their visa target region before accessing the main app.

**Available Targets:**

| Target | Region | Visa Type |
|--------|--------|-----------|
| 🇪🇺 EU | Europe | Schengen Visa |
| 🇺🇸 US | United States | US Visa |
| 🇬🇧 GB | United Kingdom | UK Visa |

**Functionality:**
- Visual selection cards with icons
- Server-side registration via API (`/api/guest.php`)
- Persists selection locally via SharedPreferences
- Auto-redirects logged-in users to main navigation

---

### 4.3 Authentication System

**Description:** User registration and login functionality.

**Registration Fields:**
- Username (displayed name)
- Email address
- Password
- Password confirmation

**Login Fields:**
- Email address
- Password
- "Forgot Password" link (placeholder)

**Social Authentication (Planned):**
- Google Sign-In
- Facebook Login

**Backend Integration:**
- API Endpoint: `https://mithatck.com/api/user.php`
- Endpoints: `register`, `login`
- Stores: `user_id`, `username`, `target_id`

---

### 4.4 Home Dashboard

**Description:** Main landing page after authentication showing personalized content.

**Components:**

#### Header Section
- App branding (PackNDocs logo + name)
- Target region indicator (flag emoji)
- User profile avatar
- Personalized greeting with username

#### Application Status Card (When Country Selected)
- Selected country name
- Progress percentage with visual progress bar
- "Devam Et" (Continue) action button
- Target region badge

#### Country Selection CTA (When No Country Selected)
- Prominent card encouraging country selection
- Links to Explore tab

#### Visa News Section
- Latest visa-related announcements
- News cards with title, date, and icon
- Navigation to detailed news pages

**Sample News Items:**
1. Schengen application fee increases
2. UK Graduate Route visa updates
3. US appointment slot availability improvements

---

### 4.5 Explore Page (Country Browser)

**Description:** Browse and select countries within the chosen target region.

**European Union Countries (25):**
| Country | Flag | Visa Type |
|---------|------|-----------|
| İspanya | 🇪🇸 | Schengen |
| Almanya | 🇩🇪 | Schengen |
| Fransa | 🇫🇷 | Schengen |
| Hollanda | 🇳🇱 | Schengen |
| İsveç | 🇸🇪 | Schengen |
| Norveç | 🇳🇴 | Schengen |
| Portekiz | 🇵🇹 | Schengen |
| Yunanistan | 🇬🇷 | Schengen |
| Belçika | 🇧🇪 | Schengen |
| Bulgaristan | 🇧🇬 | EU Visa |
| Hırvatistan | 🇭🇷 | EU Visa |
| ... and more | | |

**Selection Flow:**
1. User taps country card
2. Hero-animated modal displays country info
3. Country image, description, and visa type shown
4. "Seç ve Devam Et" (Select and Continue) button
5. Selection saved to SharedPreferences
6. Returns to Home with updated status

---

### 4.6 Country Detail Page

**Description:** Comprehensive document checklist for visa applications.

**Components:**

#### Hero Section
- Full-width country image
- Gradient overlay
- Country name and "Vize Başvuru Süreci" subtitle
- Back button, bookmark, and share actions

#### Progress Section
- Visual progress bar
- X/Y documents completed indicator
- Percentage display
- Celebration message on completion

#### Visa Information Card
- General info about visa requirements
- Country-specific application guidance
- Loaded from JSON data files

#### Document Checklist
Interactive cards for each required document:

**Document Card Features:**
- Document name
- Document type (Kimlik Belgesi, Form, Sigorta, etc.)
- Estimated preparation time
- Upload button with file picker
- Completion checkbox (auto-checked on file upload)
- View/Delete uploaded file options
- Colorful illustration icons

**Sample Document Requirements (Germany):**
1. Pasaport
2. Biometrik Fotoğraf
3. Seyahat Sağlık Sigortası
4. Uçuş ve Konaklama Rezervasyonları
5. Maddi Gelir Belgeleri

#### File Upload System
- Supported formats: PDF, JPG, JPEG, PNG, DOC, DOCX
- Size limits: 5MB (web), 10MB (mobile)
- Local storage with path_provider
- Base64 encoding for web image preview
- Permission handling for Android 13+

---

### 4.7 Profile Settings

**Description:** User account management page.

**Features:**
- Username editing
- Save changes functionality
- Logout with confirmation dialog
- Visual feedback via SnackBar notifications

**Logout Process:**
1. Confirmation dialog displayed
2. All SharedPreferences cleared
3. Redirect to Onboarding page

---

### 4.8 Navigation Structure

**Bottom Navigation Bar:**
| Tab | Icon | Label | Description |
|-----|------|-------|-------------|
| Home | 🏠 | Ana Sayfa | Dashboard with status |
| Explore | 🧭 | Keşfet | Country browser |

**Side Drawer Menu:**
- User profile header with avatar
- Target region badge
- Ana Sayfa (Home)
- Profil Ayarları (Profile Settings)
- App version footer

---

## 5. Data Architecture

### 5.1 Local Storage (SharedPreferences)

| Key | Type | Description |
|-----|------|-------------|
| `user_id` | int | Authenticated user ID |
| `username` | String | Display name |
| `target_id` | String | Selected region (eu/us/gb) |
| `main_country_name` | String | Selected country |
| `main_country_image` | String | Country image path |
| `{country}_progress` | StringList | Completed documents |
| `{country}_progress_percentage` | double | Progress (0.0-1.0) |
| `{document}_uploaded_file` | String | Uploaded filename |
| `{document}_uploaded_path` | String | File storage path |
| `{document}_uploaded_data` | String | Base64 (web only) |

### 5.2 Country Data Files (JSON)

Located in `lib/data/`:
- `germany.json`
- `france.json`
- `greece.json`
- `ispanya.json`
- `netherlands.json`
- `norway.json`
- `portugal.json`
- `sweden.json`

**Schema:**
```json
{
  "general_info": "Country-specific visa information...",
  "required_documents": [
    "Pasaport",
    "Biometrik Fotoğraf",
    "..."
  ]
}
```

---

## 6. Technical Specifications

### 6.2 Custom Fonts
- **Ibrand** (`lib/fonts/Ibrand.ttf`)
- **Grift** (`lib/fonts/Grift.ttf`)

### 6.3 Design System

**Color Palette:**
| Color | Hex | Usage |
|-------|-----|-------|
| Royal Blue | #3C4F50 | Primary |
| Sky Blue | #3B82F6 | Secondary/Accent |
| Turkish Turquoise | #14B8A6 | Accent/Success |
| Amber Gold | #7F8D39 | CTA buttons |
| Soft Gray | #F3F4F6 | Background |
| Slate Gray | #374151 | Text/Icons |
| Pure White | #FFFFFF | Surfaces |

**Border Radius Standards:**
- Small: 8px
- Medium: 12px
- Large: 16px
- Extra Large: 20-32px

---

## 7. API Endpoints

### 7.1 Guest Registration
```
POST https://mithatck.com/api/guest.php
Content-Type: application/json

Request:
{
  "target_id": "eu"
}

Response:
{
  "success": true,
  "data": {
    "user_id": 123,
    "target_id": "eu"
  }
}
```

### 7.2 User Authentication
```
POST https://mithatck.com/api/user.php
Content-Type: application/json

Request (Register):
{
  "endpoint": "register",
  "username": "John",
  "email": "john@email.com",
  "password": "secret",
  "user_type": "user"
}

Request (Login):
{
  "endpoint": "login",
  "email": "john@email.com",
  "password": "secret"
}
```

---

## 8. User Flows

### 8.1 First-Time User Flow
```
App Launch → Onboarding (3 screens) → Target Selection → 
Registration/Login → Home Dashboard → Explore → 
Select Country → Country Detail → Upload Documents
```

### 8.2 Returning User Flow
```
App Launch → Home Dashboard (with saved progress) → 
Continue with selected country → Upload/Complete documents
```

### 8.3 Target Change Flow
```
Home/Explore → Tap Target Emoji → Target Selection → 
Select New Target → Home (country reset)
```

---

## 9. Future Roadmap

### Phase 2 Features (Planned)
- [ ] Push notifications for important dates
- [ ] Document expiry reminders
- [ ] Visa appointment booking integration
- [ ] Application center locator with maps
- [ ] Multi-language support (English)
- [ ] Dark mode theme
- [ ] Biometric authentication
- [ ] Cloud backup for documents
- [ ] Social login implementation (Google, Facebook)
- [ ] Password reset functionality

### Phase 3 Features (Planned)
- [ ] AI-powered document verification
- [ ] Community forums for visa tips
- [ ] Consultant chat support
- [ ] Premium subscription tier
- [ ] Analytics dashboard

---

## 10. Success Metrics

### Key Performance Indicators (KPIs)
| Metric | Target |
|--------|--------|
| User Registration Rate | 60% of onboarding completions |
| Document Upload Rate | 40% of country selections |
| Completion Rate | 25% of started applications |
| Daily Active Users (DAU) | 1,000+ |
| App Store Rating | 4.5+ stars |
| Retention (D7) | 30% |

---

## 11. Security Considerations

- User passwords transmitted via HTTPS
- Local document storage (no cloud upload by default)
- Session management via SharedPreferences
- File size limits to prevent abuse
- Permission requests only when needed
- Clear data on logout

---

## 12. Accessibility

- High contrast color scheme
- Touch targets ≥44px minimum
- Clear typography hierarchy
- Screen reader compatible labels
- Loading states and feedback
- Error messages in Turkish

---

## 13. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025 | Initial release with EU, US, UK support |

---

## 14. Contact & Support

**Developer:** Mithat Can Turan  
**API Domain:** mithatck.com  
**Repository:** travel_app

---

*Last Updated: January 2026*

