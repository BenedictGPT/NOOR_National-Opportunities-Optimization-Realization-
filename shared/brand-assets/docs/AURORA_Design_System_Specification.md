# AURORA AI Agent - NOOR Design System Specification

**Version:** 1.0  
**Date:** October 28, 2025  
**Status:** Production-Ready

---

## 1. Introduction

This document provides the complete design system for the **AURORA AI Agent**. AURORA is responsible for generating all UI/UX designs for the NOOR platform. This system ensures that all generated designs are consistent, accessible, and aligned with the NOOR brand identity.

### 1.1 How AURORA Uses This System

AURORA will use this specification as its **single source of truth** for all design decisions. The system is designed to be machine-readable and provides clear, unambiguous instructions for generating UI components, layouts, and complete screens.

### 1.2 Core Principles

- **Consistency:** All designs must be consistent with the NOOR brand.
- **Accessibility:** All designs must meet WCAG 2.1 AA standards.
- **Modularity:** All components are designed to be modular and reusable.
- **Bilingualism:** All designs must support both English (LTR) and Arabic (RTL).

---

## 2. Color System

AURORA must use the color palettes defined in the **NOOR Brand Asset Package**. The color system is divided into four palettes:

- **Core Palette:** Used across all layers for consistency.
- **Platform Palette (Layer 1):** For the Individual Skills Passport.
- **Institutional Palette (Layer 2):** For the Institutional Interface.
- **Federal Palette (Layer 3):** For the Federal Canvas.

### 2.1 Color Tokens (CSS Variables)

AURORA will use the following CSS variables to apply colors:

```css
:root {
  /* Core Palette */
  --color-primary-navy: #0D4C92;
  --color-primary-royal-blue: #3A7BC8;
  --color-primary-sky-blue: #59ADFF;
  --color-primary-light-blue: #89C4F4;
  --color-primary-ice-blue: #B3D9FF;

  /* Neutrals */
  --color-white: #FFFFFF;
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  --color-black: #000000;

  /* Semantic Colors */
  --color-success-light: #D1FAE5;
  --color-success-base: #10B981;
  --color-success-dark: #047857;
  --color-warning-light: #FEF3C7;
  --color-warning-base: #F59E0B;
  --color-warning-dark: #D97706;
  --color-error-light: #FEE2E2;
  --color-error-base: #EF4444;
  --color-error-dark: #DC2626;
  --color-info-light: #DBEAFE;
  --color-info-base: #3B82F6;
  --color-info-dark: #1D4ED8;
}
```

---

## 3. Typography System (Bilingual)

This section is imported from the **NOOR Typography System** document.

### 3.1 Brand Typography Philosophy

NOOR's typography system balances **technical precision** with **approachable professionalism**, supporting both English and Arabic seamlessly.

**Core Principles:**
- Geometric harmony across languages
- Technical credibility (Space Mono)
- Friendly accessibility (Hammersmith One)
- Professional Arabic typography (IBM Plex Sans Arabic)
- Performance-optimized (system fonts for body text)

### 3.2 Font Families

#### 3.2.1 English Fonts

**Display Font (Branding & Technical):**
```
Font: Space Mono
Use: Logo text, technical headings, code displays, "PROJECT/NOOR" branding
Weights: Regular (400), Bold (700)
License: Open Source (SIL Open Font License)
Source: https://fonts.google.com/specimen/Space+Mono
```

**Heading Font (UI & Marketing):**
```
Font: Hammersmith One  
Use: Page titles, section headings, UI labels, "project/noor" lowercase
Weights: Regular (400)
License: Open Source (SIL Open Font License)
Source: https://fonts.google.com/specimen/Hammersmith+One
```

**Body Font (Content):**
```
Font: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, etc.)
Use: Paragraphs, descriptions, long-form content
Weights: 300, 400, 500, 600, 700
Performance: Native system fonts (zero download)
```

#### 3.2.2 Arabic Fonts ⭐ PRIMARY RECOMMENDATION

**Arabic Font (All Uses):**
```
Font: IBM Plex Sans Arabic
Use: All Arabic text (display, headings, body)
Weights: Thin (100) to Bold (700)
License: Open Source (SIL Open Font License)
Source: https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic
```

### 3.3 Font Loading (CSS)

```css
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap');

/* Define CSS Variables */
:root {
  /* English Fonts */
  --font-display-en: 'Space Mono', monospace;
  --font-heading-en: 'Hammersmith One', sans-serif;
  --font-body-en: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* Arabic Fonts */
  --font-display-ar: 'IBM Plex Sans Arabic', sans-serif;
  --font-heading-ar: 'IBM Plex Sans Arabic', sans-serif;
  --font-body-ar: 'IBM Plex Sans Arabic', sans-serif;
}
```

### 3.4 Type Scale (Bilingual)

AURORA must use the following responsive type scale.

#### English Type Scale

| Name | Size (px) | Line Height | Weight | Font Family |
|---|---|---|---|---|
| Display | 48 | 1.2 | 700 | Space Mono |
| H1 | 36 | 1.25 | 400 | Hammersmith One |
| H2 | 30 | 1.3 | 400 | Hammersmith One |
| H3 | 24 | 1.35 | 400 | Hammersmith One |
| H4 | 20 | 1.4 | 500 | System |
| Body Lg | 16 | 1.6 | 400 | System |
| Body | 14 | 1.6 | 400 | System |
| Small | 12 | 1.5 | 400 | System |

#### Arabic Type Scale

| Name | Size (px) | Line Height | Weight | Font Family |
|---|---|---|---|---|
| Display | 52 | 1.4 | 700 | IBM Plex Sans Arabic |
| H1 | 40 | 1.5 | 600 | IBM Plex Sans Arabic |
| H2 | 34 | 1.5 | 600 | IBM Plex Sans Arabic |
| H3 | 28 | 1.5 | 500 | IBM Plex Sans Arabic |
| H4 | 22 | 1.6 | 500 | IBM Plex Sans Arabic |
| Body Lg | 18 | 1.8 | 400 | IBM Plex Sans Arabic |
| Body | 16 | 1.8 | 400 | IBM Plex Sans Arabic |
| Small | 14 | 1.7 | 400 | IBM Plex Sans Arabic |

---

## 4. Spacing System

All spacing is based on an **8px grid**. AURORA must use the following spacing tokens.

| Name | Size (px) | Rem | Use Case |
|---|---|---|---|
| xs | 4 | 0.25 | Tight spacing, icon padding |
| sm | 8 | 0.5 | Small gaps, component padding |
| md | 16 | 1.0 | Default spacing, paragraphs |
| lg | 24 | 1.5 | Section spacing, card padding |
| xl | 32 | 2.0 | Large spacing, modal padding |
| 2xl | 48 | 3.0 | Page section spacing |
| 3xl | 64 | 4.0 | Hero section spacing |
| 4xl | 96 | 6.0 | Massive spacing |

---

## 5. Component Library

AURORA will generate components based on the following specifications.

### 5.1 Buttons

| Type | Background | Text Color | Border | Padding | Font Weight |
|---|---|---|---|---|---|
| Primary | `linear-gradient(135deg, #0D4C92, #3A7BC8)` | `white` | `none` | `12px 24px` | 600 |
| Secondary | `white` | `#0D4C92` | `2px solid #0D4C92` | `12px 24px` | 600 |
| Tertiary | `transparent` | `#0D4C92` | `none` | `12px 24px` | 600 |

### 5.2 Cards

- **Background:** `white`
- **Border Radius:** `12px`
- **Padding:** `24px`
- **Box Shadow:** `0 2px 8px rgba(0, 0, 0, 0.06)`
- **Border:** `1px solid #E5E7EB`

### 5.3 Inputs

- **Background:** `white`
- **Border:** `2px solid #E5E7EB`
- **Border Radius:** `8px`
- **Padding:** `12px 16px`
- **Focus Border:** `#0D4C92`

### 5.4 Badges

| Type | Background | Text Color |
|---|---|---|
| Success | `#D1FAE5` | `#047857` |
| Warning | `#FEF3C7` | `#D97706` |
| Error | `#FEE2E2` | `#DC2626` |
| Info | `#DBEAFE` | `#1D4ED8` |

---

## 6. Iconography

- **Icon Library:** Lucide Icons (https://lucide.dev/)
- **Default Size:** `24px`
- **Default Color:** `#4B5563` (Gray 600)

---

## 7. Implementation Guidelines for AURORA

1.  **Always refer to this document** as the single source of truth.
2.  **Use CSS variables** for all colors, fonts, and spacing.
3.  **Generate components** based on the specifications in Section 5.
4.  **Ensure all designs are responsive** and test for both LTR and RTL layouts.
5.  **Validate accessibility** by checking color contrast and font sizes.
6.  **Use the correct color palette** for each layer of the platform.

This design system will enable AURORA to create beautiful, consistent, and accessible user interfaces for the NOOR platform at scale.

