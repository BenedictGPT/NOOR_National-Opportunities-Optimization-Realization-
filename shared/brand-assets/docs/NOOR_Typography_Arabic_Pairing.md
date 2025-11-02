# NOOR Typography System - English & Arabic Font Pairing
## Complete Font Specifications for Bilingual Branding

**Version:** 1.0  
**Date:** October 28, 2025  
**Status:** Production-Ready

---

## 1. ENGLISH FONTS (Confirmed)

### 1.1 Primary Display Font: **Space Mono**

**Characteristics:**
- Monospaced geometric typeface
- Technical, modern, precise
- Designed by Colophon Foundry
- Open source (SIL Open Font License)
- Excellent for headlines, logos, technical content

**Use Cases:**
- "PROJECT/NOOR" branding
- Technical documentation
- Code snippets
- Data displays
- Monospaced layouts

**Weights Available:**
- Regular (400)
- Bold (700)
- Italic variants

**Google Fonts:** https://fonts.google.com/specimen/Space+Mono

---

### 1.2 Secondary Display Font: **Hammersmith One**

**Characteristics:**
- Low-contrast geometric sans-serif
- Clean, modern, approachable
- Designed by Sorkin Type
- Open source (SIL Open Font License)
- Excellent for headings, UI elements

**Use Cases:**
- "project/noor" lowercase branding
- Section headings
- UI labels
- Marketing materials

**Weights Available:**
- Regular (400) only

**Google Fonts:** https://fonts.google.com/specimen/Hammersmith+One

---

## 2. ARABIC FONT RECOMMENDATIONS

### 2.1 PRIMARY RECOMMENDATION: **IBM Plex Sans Arabic**

**Why This Pairing Works:**

✅ **Geometric Structure** - Matches Space Mono's geometric precision  
✅ **Modern & Technical** - Perfect for tech/government branding  
✅ **Multiple Weights** - Excellent weight range (100-700)  
✅ **Open Source** - SIL Open Font License  
✅ **Professional Quality** - Designed by Bold Monday for IBM  
✅ **Excellent Legibility** - Works at all sizes  
✅ **Bilingual Harmony** - Designed to pair with IBM Plex Sans (similar to Space Mono)

**Characteristics:**
- Geometric, low-contrast design
- Clean, modern Arabic letterforms
- Excellent diacritic handling
- Optimized for screens
- Supports full Arabic character set

**Weights Available:**
- Thin (100)
- ExtraLight (200)
- Light (300)
- Regular (400)
- Medium (500)
- SemiBold (600)
- Bold (700)

**Google Fonts:** https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic

**CSS Implementation:**
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap');

.arabic-text {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
}
```

---

### 2.2 ALTERNATIVE OPTION 1: **Noto Sans Arabic**

**Why This Works:**

✅ **Universal Compatibility** - Part of Google's Noto font family  
✅ **Multiple Weights** - 100-900 weight range  
✅ **Excellent Coverage** - Supports all Arabic scripts  
✅ **Open Source** - SIL Open Font License  
✅ **Professional** - Designed by Monotype for Google

**Characteristics:**
- Humanist sans-serif
- Slightly warmer than IBM Plex
- Excellent for body text
- Great screen rendering

**Weights Available:**
- Thin (100) to Black (900)
- Variable font support

**Google Fonts:** https://fonts.google.com/noto/specimen/Noto+Sans+Arabic

**CSS Implementation:**
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&display=swap');

.arabic-text {
  font-family: 'Noto Sans Arabic', sans-serif;
}
```

---

### 2.3 ALTERNATIVE OPTION 2: **Cairo**

**Why This Works:**

✅ **Modern & Geometric** - Similar geometric feel to Space Mono  
✅ **Popular Choice** - Widely used in Arabic web design  
✅ **Multiple Weights** - 200-1000 weight range  
✅ **Open Source** - SIL Open Font License  
✅ **Contemporary** - Designed by Mohamed Gaber

**Characteristics:**
- Geometric sans-serif
- Contemporary Arabic design
- Excellent for headlines
- Strong visual presence

**Weights Available:**
- ExtraLight (200) to ExtraBold (1000)
- Variable font support

**Google Fonts:** https://fonts.google.com/specimen/Cairo

**CSS Implementation:**
```css
@import url('https://fonts.google.com/css2?family=Cairo:wght@200..1000&display=swap');

.arabic-text {
  font-family: 'Cairo', sans-serif;
}
```

---

### 2.4 ALTERNATIVE OPTION 3: **Tajawal**

**Why This Works:**

✅ **Clean & Modern** - Matches Hammersmith One's simplicity  
✅ **Low Contrast** - Similar to Hammersmith One  
✅ **Multiple Weights** - 200-900  
✅ **Open Source** - SIL Open Font License  
✅ **Excellent Legibility** - Great for UI/UX

**Characteristics:**
- Humanist sans-serif
- Low-contrast design
- Friendly, approachable
- Excellent for interfaces

**Weights Available:**
- ExtraLight (200) to Black (900)

**Google Fonts:** https://fonts.google.com/specimen/Tajawal

**CSS Implementation:**
```css
@import url('https://fonts.google.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');

.arabic-text {
  font-family: 'Tajawal', sans-serif;
}
```

---

### 2.5 PREMIUM OPTION: **Dubai Font** (Recommended for Government Use)

**Why This Works:**

✅ **Official UAE Font** - Designed by Microsoft for Dubai Government  
✅ **Professional** - Used by UAE government entities  
✅ **Bilingual Design** - Harmonized Latin and Arabic  
✅ **Brand Alignment** - Perfect for NOOR's government context  
✅ **Multiple Weights** - Light, Regular, Medium, Bold

**Characteristics:**
- Contemporary humanist design
- Optimized for government communications
- Excellent legibility
- Professional appearance
- Supports Arabic and Latin scripts

**Weights Available:**
- Light (300)
- Regular (400)
- Medium (500)
- Bold (700)

**Download:** https://www.dubaifont.com/

**CSS Implementation:**
```css
@font-face {
  font-family: 'Dubai';
  src: url('/fonts/Dubai-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

.arabic-text {
  font-family: 'Dubai', sans-serif;
}
```

**Note:** Dubai Font requires download and self-hosting (free for non-commercial use)

---

## 3. RECOMMENDED FONT PAIRING STRATEGY

### 3.1 **RECOMMENDED PRIMARY PAIRING** ⭐

**For Technical/Modern Branding:**

| Use Case | English | Arabic |
|----------|---------|--------|
| **Logo/Branding** | Space Mono Bold | IBM Plex Sans Arabic Bold |
| **Headlines (H1-H2)** | Hammersmith One | IBM Plex Sans Arabic SemiBold |
| **Subheadings (H3-H4)** | Space Mono Regular | IBM Plex Sans Arabic Medium |
| **Body Text** | System fonts | IBM Plex Sans Arabic Regular |
| **Captions/Labels** | Space Mono Regular | IBM Plex Sans Arabic Regular |

**Why:** IBM Plex Sans Arabic perfectly matches the geometric, technical feel of Space Mono while maintaining excellent legibility.

---

### 3.2 **ALTERNATIVE PAIRING (Government Focus)**

**For Official/Government Branding:**

| Use Case | English | Arabic |
|----------|---------|--------|
| **Logo/Branding** | Space Mono Bold | Dubai Bold |
| **Headlines (H1-H2)** | Hammersmith One | Dubai Medium |
| **Subheadings (H3-H4)** | Space Mono Regular | Dubai Regular |
| **Body Text** | System fonts | Dubai Regular |
| **Captions/Labels** | Space Mono Regular | Dubai Light |

**Why:** Dubai Font is the official UAE government font, providing instant credibility and brand alignment.

---

### 3.3 **ALTERNATIVE PAIRING (Warm/Approachable)**

**For User-Facing Interfaces:**

| Use Case | English | Arabic |
|----------|---------|--------|
| **Logo/Branding** | Space Mono Bold | Tajawal Bold |
| **Headlines (H1-H2)** | Hammersmith One | Tajawal Medium |
| **Subheadings (H3-H4)** | Space Mono Regular | Tajawal Regular |
| **Body Text** | System fonts | Tajawal Regular |
| **Captions/Labels** | Space Mono Regular | Tajawal Light |

**Why:** Tajawal's low-contrast design matches Hammersmith One's friendly, approachable character.

---

## 4. IMPLEMENTATION GUIDE

### 4.1 Complete Font Stack (Bilingual)

```css
/* English Primary */
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap');

/* Arabic Primary (IBM Plex Sans Arabic) */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap');

/* Font Family Definitions */
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

/* English Text */
.text-en {
  font-family: var(--font-body-en);
}

.heading-en {
  font-family: var(--font-heading-en);
}

.display-en {
  font-family: var(--font-display-en);
}

/* Arabic Text */
.text-ar {
  font-family: var(--font-body-ar);
  direction: rtl;
}

.heading-ar {
  font-family: var(--font-heading-ar);
  direction: rtl;
}

.display-ar {
  font-family: var(--font-display-ar);
  direction: rtl;
}

/* Bilingual Support */
html[lang="ar"] {
  font-family: var(--font-body-ar);
  direction: rtl;
}

html[lang="en"] {
  font-family: var(--font-body-en);
  direction: ltr;
}
```

---

### 4.2 Typography Scale (Bilingual)

```css
/* Display Sizes */
.text-display {
  font-size: 48px;
  line-height: 1.2;
  font-weight: 700;
}

/* Headings */
.text-h1 {
  font-size: 36px;
  line-height: 1.25;
  font-weight: 700;
}

.text-h2 {
  font-size: 30px;
  line-height: 1.3;
  font-weight: 600;
}

.text-h3 {
  font-size: 24px;
  line-height: 1.35;
  font-weight: 600;
}

.text-h4 {
  font-size: 20px;
  line-height: 1.4;
  font-weight: 500;
}

/* Body */
.text-body-lg {
  font-size: 16px;
  line-height: 1.6;
  font-weight: 400;
}

.text-body {
  font-size: 14px;
  line-height: 1.6;
  font-weight: 400;
}

.text-small {
  font-size: 12px;
  line-height: 1.5;
  font-weight: 400;
}

/* Arabic-specific adjustments */
.text-ar.text-display {
  font-size: 52px; /* Slightly larger for Arabic */
}

.text-ar.text-body {
  line-height: 1.8; /* More line height for Arabic */
}
```

---

### 4.3 RTL (Right-to-Left) Support

```css
/* RTL Layout Adjustments */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .flex {
  flex-direction: row-reverse;
}

[dir="rtl"] .ml-4 {
  margin-left: 0;
  margin-right: 1rem;
}

[dir="rtl"] .mr-4 {
  margin-right: 0;
  margin-left: 1rem;
}

/* Padding adjustments */
[dir="rtl"] .pl-4 {
  padding-left: 0;
  padding-right: 1rem;
}

[dir="rtl"] .pr-4 {
  padding-right: 0;
  padding-left: 1rem;
}
```

---

## 5. LOGO TYPOGRAPHY

### 5.1 "PROJECT/NOOR" Branding

**English:**
```
PROJECT/NOOR
Font: Space Mono Bold
Size: 24-48px (scalable)
Tracking: 0.05em (slightly expanded)
Case: UPPERCASE
```

**Arabic:**
```
مشروع/نور
Font: IBM Plex Sans Arabic Bold
Size: 26-52px (slightly larger than English)
Tracking: Normal (Arabic doesn't need letter-spacing)
```

### 5.2 "project/noor" Lowercase Variant

**English:**
```
project/noor
Font: Hammersmith One Regular
Size: 20-40px (scalable)
Tracking: Normal
Case: lowercase
```

**Arabic:**
```
مشروع/نور
Font: IBM Plex Sans Arabic Medium
Size: 22-44px (slightly larger)
Tracking: Normal
```

---

## 6. ACCESSIBILITY CONSIDERATIONS

### 6.1 Minimum Font Sizes

**English:**
- Body text: 14px minimum
- Small text: 12px minimum
- Display text: 24px minimum

**Arabic:**
- Body text: 16px minimum (larger due to complexity)
- Small text: 14px minimum
- Display text: 28px minimum

### 6.2 Line Heights

**English:**
- Headings: 1.2-1.35
- Body: 1.5-1.6
- Dense text: 1.4

**Arabic:**
- Headings: 1.3-1.5 (more space needed)
- Body: 1.7-1.9 (significantly more space)
- Dense text: 1.6

### 6.3 Letter Spacing

**English:**
- Headings: 0-0.02em
- Body: 0
- All caps: 0.05-0.1em

**Arabic:**
- All text: 0 (never add letter-spacing to Arabic)

---

## 7. PERFORMANCE OPTIMIZATION

### 7.1 Font Loading Strategy

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/SpaceMono-Bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/IBMPlexSansArabic-Bold.woff2" as="font" type="font/woff2" crossorigin>

<!-- Load fonts with font-display: swap -->
<style>
@font-face {
  font-family: 'Space Mono';
  src: url('/fonts/SpaceMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Sans Arabic';
  src: url('/fonts/IBMPlexSansArabic-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
</style>
```

### 7.2 Subset Fonts

**English (Space Mono):**
- Latin only: ~20KB
- Latin + Latin Extended: ~30KB

**Arabic (IBM Plex Sans Arabic):**
- Arabic only: ~40KB
- Arabic + Latin: ~60KB

**Recommendation:** Load only required character sets per page

---

## 8. BRAND EXAMPLES

### 8.1 Logo Lockup (Bilingual)

```
┌─────────────────────────────────┐
│  PROJECT/NOOR    |    مشروع/نور  │
│  Space Mono Bold | IBM Plex Bold │
└─────────────────────────────────┘
```

### 8.2 Heading Example

**English:**
```
Welcome to NOOR Platform
(Hammersmith One, 36px)
```

**Arabic:**
```
مرحباً بكم في منصة نور
(IBM Plex Sans Arabic SemiBold, 40px)
```

### 8.3 Body Text Example

**English:**
```
NOOR is the UAE's national human capital intelligence platform,
designed to empower individuals and organizations.
(System font, 14px, line-height 1.6)
```

**Arabic:**
```
نور هي منصة الذكاء الوطنية لرأس المال البشري في الإمارات،
مصممة لتمكين الأفراد والمؤسسات.
(IBM Plex Sans Arabic Regular, 16px, line-height 1.8)
```

---

## 9. FINAL RECOMMENDATIONS

### 9.1 **PRIMARY CHOICE** ⭐⭐⭐

**English:** Space Mono + Hammersmith One  
**Arabic:** IBM Plex Sans Arabic

**Rationale:**
- Perfect geometric harmony
- Open source and free
- Excellent technical support
- Modern, professional appearance
- Great for government/tech branding

### 9.2 **GOVERNMENT CHOICE** ⭐⭐

**English:** Space Mono + Hammersmith One  
**Arabic:** Dubai Font

**Rationale:**
- Official UAE government font
- Instant credibility
- Professional appearance
- Bilingual harmony
- Free for government use

### 9.3 **USER-FRIENDLY CHOICE** ⭐

**English:** Space Mono + Hammersmith One  
**Arabic:** Tajawal

**Rationale:**
- Warm, approachable
- Excellent legibility
- Low-contrast design
- Great for interfaces
- Open source

---

## 10. IMPLEMENTATION CHECKLIST

### For Design Team (AURORA AI Agent):
- [ ] Download/import all fonts
- [ ] Set up font families in design tool
- [ ] Create typography scale
- [ ] Test bilingual layouts
- [ ] Create RTL variants
- [ ] Test accessibility (contrast, size)
- [ ] Create font pairing examples
- [ ] Document usage guidelines

### For Development Team:
- [ ] Add font imports to CSS
- [ ] Configure font-display: swap
- [ ] Set up CSS variables
- [ ] Implement RTL support
- [ ] Test font loading performance
- [ ] Optimize font subsets
- [ ] Test on all browsers
- [ ] Test on mobile devices

---

## 11. RESOURCES

**Font Downloads:**
- Space Mono: https://fonts.google.com/specimen/Space+Mono
- Hammersmith One: https://fonts.google.com/specimen/Hammersmith+One
- IBM Plex Sans Arabic: https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic
- Noto Sans Arabic: https://fonts.google.com/noto/specimen/Noto+Sans+Arabic
- Cairo: https://fonts.google.com/specimen/Cairo
- Tajawal: https://fonts.google.com/specimen/Tajawal
- Dubai Font: https://www.dubaifont.com/

**Testing Tools:**
- Google Fonts: https://fonts.google.com/
- Font Pair: https://www.fontpair.co/
- Arabic Typography: https://arabictypography.com/

---

**Status:** ✅ READY FOR IMPLEMENTATION

**Recommendation:** Use **IBM Plex Sans Arabic** as the primary Arabic font to pair with Space Mono and Hammersmith One.

