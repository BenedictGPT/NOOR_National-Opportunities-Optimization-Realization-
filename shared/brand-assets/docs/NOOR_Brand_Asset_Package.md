# NOOR Brand Asset Package & Design System
## Complete Branding Specifications for All Layers

**Version:** 2.0  
**Date:** October 28, 2025  
**Status:** Production-Ready (Typography System Integrated)

---

## 1. BRAND OVERVIEW

### 1.1 Brand Philosophy

**NOOR** (Arabic: نور, meaning "Light") represents illumination, guidance, and clarity in human capital development. The brand embodies:

- **Trust & Professionalism** - Government-grade reliability
- **Energy & Growth** - Dynamic human potential
- **Wisdom & Balance** - Wasatiyyah (moderation) principles
- **Innovation & Progress** - UAE Vision 2071 alignment

### 1.2 Brand Architecture

```
NOOR Platform (Master Brand)
├── Layer 0: Developer Interface (Black/White - Authority)
├── Layer 1: Individual Skills Passport (Blue - Trust)
├── Layer 2: Institutional Interface (Red/Terracotta - Energy)
└── Layer 3: Federal Canvas (Navy/Gold - Prestige)
```

---

## 2. LOGO SYSTEM

### 2.1 Primary Logo Variations

**Logo Components:**
- **Outer Diamond** - Represents the UAE, stability, and foundation
- **8-Pointed Star** - Represents the 8 Faculties of human potential
- **Center Asterisk** - Represents the individual at the center of the system

**Available Variations:**

1. **LogoBW.png** - 8-pointed star (full points)
   - Use: Primary logo for all applications
   - Format: Black & white, transparent background
   - Size: Scalable vector-ready

2. **LogoBW2.png** - 8-pointed star (variant 2)
   - Use: Alternative for compact spaces
   - Format: Black & white, transparent background

3. **LogoBW3.png** - 8-pointed star (variant 3)
   - Use: Simplified version for small sizes
   - Format: Black & white, transparent background

4. **LogoBW4.png** - 8-pointed star (variant 4)
   - Use: Icon-only version for favicons, app icons
   - Format: Black & white, transparent background

### 2.2 Layer-Specific Branded Logos

**1. NOOR Platform (Layer 1 - Individual)**
- **File:** NOORPlatform.png
- **Colors:** Blue gradient (#59ADFF to #3A7BC8)
- **Background:** Navy (#1E3A5F)
- **Use:** Individual Skills Passport, mobile app, user-facing materials

**2. NOOR Institution (Layer 2 - Institutional)**
- **File:** NOORInstitution.png
- **Colors:** Red/Terracotta gradient (#B8453C to #D2691E)
- **Background:** Dark red (#8B2500)
- **Use:** Institutional interfaces, HCM suite, employer branding

**3. NOOR Federal (Layer 3 - Federal)**
- **File:** NOORFederal.png
- **Colors:** Gold gradient (#F4D03F to #E6C136)
- **Background:** Navy (#1E3A5F)
- **Use:** Federal Canvas, government presentations, official documents

### 2.3 Logo Usage Guidelines

**Minimum Sizes:**
- Digital: 32px × 32px (icon), 120px × 120px (logo with text)
- Print: 0.5 inch × 0.5 inch

**Clear Space:**
- Maintain clear space equal to the height of the star around all sides

**Don'ts:**
- Do NOT rotate the logo
- Do NOT distort proportions
- Do NOT add effects (shadows, glows, etc.)
- Do NOT place on busy backgrounds without sufficient contrast

---

## 3. COLOR SYSTEM

### 3.1 Core Palette (All Layers)

**Primary Blues (Trust & Professionalism):**
```
Navy:        #0D4C92  RGB(13, 76, 146)   - Headers, primary buttons
Royal Blue:  #3A7BC8  RGB(58, 123, 200)  - Interactive elements
Sky Blue:    #59ADFF  RGB(89, 173, 255)  - Highlights, links
Light Blue:  #89C4F4  RGB(137, 196, 244) - Backgrounds, cards
Ice Blue:    #B3D9FF  RGB(179, 217, 255) - Subtle backgrounds
```

**Usage:**
- **Navy (#0D4C92):** Main navigation, headers, primary CTAs
- **Royal Blue (#3A7BC8):** Secondary buttons, active states
- **Sky Blue (#59ADFF):** Links, hover states, progress bars
- **Light Blue (#89C4F4):** Card backgrounds, section dividers
- **Ice Blue (#B3D9FF):** Subtle highlights, disabled states

### 3.2 Platform Palette (Layer 1 - Individual)

**File:** PlatformPalette.png

**Colors:**
```
Primary:     #2563EB  RGB(37, 99, 235)   - Main actions
Secondary:   #60A5FA  RGB(96, 165, 250)  - Secondary actions
Accent:      #FBCFE8  RGB(251, 207, 232) - Highlights
Warm:        #FDBA74  RGB(253, 186, 116) - Wellness metrics
Energy:      #FB923C  RGB(251, 146, 60)  - Energy indicators
Alert:       #EF4444  RGB(239, 68, 68)   - Stress indicators
```

**Gradients:**
```css
.primary-gradient {
  background: linear-gradient(135deg, #2563EB 0%, #60A5FA 100%);
}

.warm-gradient {
  background: linear-gradient(135deg, #FDBA74 0%, #FB923C 100%);
}
```

### 3.3 Federal Palette (Layer 3 - Federal)

**File:** FedPalette.png

**Colors:**
```
Cream:       #F5E6D3  RGB(245, 230, 211) - Backgrounds
Light Gold:  #F4D03F  RGB(244, 208, 63)  - Highlights
Medium Gold: #E6C136  RGB(230, 193, 54)  - Primary actions
Dark Gold:   #D4AF37  RGB(212, 175, 55)  - Text, borders
Bronze:      #B8860B  RGB(184, 134, 11)  - Dark accents
```

**Gradients:**
```css
.gold-gradient {
  background: linear-gradient(135deg, #F4D03F 0%, #E6C136 100%);
}

.bronze-gradient {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
}
```

### 3.4 Institutional Palette (Layer 2 - Institutional)

**Colors:**
```
Terracotta:  #E07A5F  RGB(224, 122, 95)  - Primary actions
Coral:       #F2CC8F  RGB(242, 204, 143) - Highlights
Rust:        #B8453C  RGB(184, 69, 60)   - Dark accents
Peach:       #FDB777  RGB(253, 183, 119) - Warm backgrounds
Burnt Orange:#D2691E  RGB(210, 105, 30)  - Energy indicators
```

**Gradients:**
```css
.institutional-gradient {
  background: linear-gradient(135deg, #E07A5F 0%, #D2691E 100%);
}

.warm-institutional {
  background: linear-gradient(135deg, #F2CC8F 0%, #FDB777 100%);
}
```

### 3.5 Semantic Colors (All Layers)

**Success:**
```
Light: #D1FAE5  RGB(209, 250, 229)
Base:  #10B981  RGB(16, 185, 129)
Dark:  #047857  RGB(4, 120, 87)
```

**Warning:**
```
Light: #FEF3C7  RGB(254, 243, 199)
Base:  #F59E0B  RGB(245, 158, 11)
Dark:  #D97706  RGB(217, 119, 6)
```

**Error:**
```
Light: #FEE2E2  RGB(254, 226, 226)
Base:  #EF4444  RGB(239, 68, 68)
Dark:  #DC2626  RGB(220, 38, 38)
```

**Info:**
```
Light: #DBEAFE  RGB(219, 234, 254)
Base:  #3B82F6  RGB(59, 130, 246)
Dark:  #1D4ED8  RGB(29, 78, 216)
```

### 3.6 Neutral Colors (All Layers)

```
White:       #FFFFFF  RGB(255, 255, 255)
Gray 50:     #F9FAFB  RGB(249, 250, 251)
Gray 100:    #F3F4F6  RGB(243, 244, 246)
Gray 200:    #E5E7EB  RGB(229, 231, 235)
Gray 300:    #D1D5DB  RGB(209, 213, 219)
Gray 400:    #9CA3AF  RGB(156, 163, 175)
Gray 500:    #6B7280  RGB(107, 114, 128)
Gray 600:    #4B5563  RGB(75, 85, 99)
Gray 700:    #374151  RGB(55, 65, 81)
Gray 800:    #1F2937  RGB(31, 41, 55)
Gray 900:    #111827  RGB(17, 24, 39)
Black:       #000000  RGB(0, 0, 0)
```

---

## 4. TYPOGRAPHY

### 4.1 Font Families

**Primary Font (UI):**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
             Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
```

**Secondary Font (Arabic):**
```css
font-family: 'Dubai', 'Noto Sans Arabic', 'Helvetica Neue', Arial, sans-serif;
```

**Monospace Font (Code):**
```css
font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 
             'Droid Sans Mono', 'Source Code Pro', monospace;
```

### 4.2 Type Scale

```
Display:     48px / 3rem    - Hero titles, landing pages
H1:          36px / 2.25rem - Page titles
H2:          30px / 1.875rem- Section titles
H3:          24px / 1.5rem  - Card titles
H4:          20px / 1.25rem - Subsection titles
H5:          18px / 1.125rem- Small headings
Body Large:  16px / 1rem    - Primary body text
Body:        14px / 0.875rem- Secondary body text
Small:       12px / 0.75rem - Captions, labels
Tiny:        10px / 0.625rem- Micro text
```

### 4.3 Font Weights

```
Light:       300 - Rarely used, only for large display text
Regular:     400 - Body text, paragraphs
Medium:      500 - Emphasized text, labels
Semibold:    600 - Headings, buttons
Bold:        700 - Strong emphasis, titles
Extrabold:   800 - Rarely used, only for hero text
```

### 4.4 Line Heights

```
Tight:       1.25 - Large headings
Normal:      1.5  - Body text
Relaxed:     1.75 - Long-form content
Loose:       2.0  - Spacious layouts
```

---

## 5. SPACING SYSTEM

### 5.1 Spacing Scale (8px base)

```
xs:   4px   (0.25rem)  - Tight spacing
sm:   8px   (0.5rem)   - Small gaps
md:   16px  (1rem)     - Default spacing
lg:   24px  (1.5rem)   - Section spacing
xl:   32px  (2rem)     - Large spacing
2xl:  48px  (3rem)     - Extra large spacing
3xl:  64px  (4rem)     - Hero spacing
4xl:  96px  (6rem)     - Massive spacing
```

### 5.2 Component Spacing

**Padding:**
```
Button:      12px 24px (vertical horizontal)
Card:        24px
Input:       12px 16px
Modal:       32px
Section:     48px 24px
```

**Margins:**
```
Between paragraphs:  16px
Between sections:    48px
Between cards:       24px
Between list items:  12px
```

---

## 6. COMPONENTS

### 6.1 Buttons

**Primary Button:**
```css
.btn-primary {
  background: linear-gradient(135deg, #0D4C92 0%, #3A7BC8 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(13, 76, 146, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(13, 76, 146, 0.4);
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: white;
  color: #0D4C92;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: 2px solid #0D4C92;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #F3F4F6;
}
```

**Tertiary Button:**
```css
.btn-tertiary {
  background: transparent;
  color: #0D4C92;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-tertiary:hover {
  background: #F3F4F6;
}
```

### 6.2 Cards

**Standard Card:**
```css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #E5E7EB;
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

**Elevated Card:**
```css
.card-elevated {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: none;
}
```

### 6.3 Inputs

**Text Input:**
```css
.input {
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: #111827;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #0D4C92;
  box-shadow: 0 0 0 3px rgba(13, 76, 146, 0.1);
}
```

### 6.4 Badges

**Status Badge:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.badge-success {
  background: #D1FAE5;
  color: #047857;
}

.badge-warning {
  background: #FEF3C7;
  color: #D97706;
}

.badge-error {
  background: #FEE2E2;
  color: #DC2626;
}

.badge-info {
  background: #DBEAFE;
  color: #1D4ED8;
}
```

---

## 7. ICONOGRAPHY

### 7.1 Icon System

**Icon Library:** Lucide Icons (https://lucide.dev/)
**Alternative:** Heroicons (https://heroicons.com/)

**Icon Sizes:**
```
xs:  16px - Inline with text
sm:  20px - Small buttons
md:  24px - Default size
lg:  32px - Large buttons, cards
xl:  48px - Hero sections
2xl: 64px - Feature showcases
```

**Icon Colors:**
```
Primary:   #0D4C92 - Main actions
Secondary: #6B7280 - Supporting elements
Success:   #10B981 - Positive actions
Warning:   #F59E0B - Caution
Error:     #EF4444 - Destructive actions
```

### 7.2 Faculty Icons

Each of the 8 Faculties has a dedicated icon:

1. **Cognitive** - 🧠 Brain icon
2. **Emotional** - ❤️ Heart icon
3. **Social** - 👥 People icon
4. **Spiritual** - ✨ Star icon
5. **Physical** - 💪 Strength icon
6. **Creative** - 🎨 Palette icon
7. **Practical** - 🔧 Tool icon
8. **Ethical** - ⚖️ Scale icon

---

## 8. LAYER-SPECIFIC DESIGN GUIDELINES

### 8.1 Layer 0: Developer Interface

**Theme:** Authority & Control
**Colors:** Black (#000000), White (#FFFFFF), Gray scale
**Style:** Minimalist, technical, data-dense

**Key Elements:**
- Dark mode by default
- Monospace fonts for code/data
- High information density
- Advanced data visualizations

### 8.2 Layer 1: Individual Skills Passport

**Theme:** Trust & Personal Growth
**Colors:** Blue palette (#0D4C92 to #B3D9FF)
**Style:** Friendly, approachable, gamified

**Key Elements:**
- Rounded corners (12px)
- Soft shadows
- Progress bars and visualizations
- Personal wellness indicators
- Radiant AI chat interface

### 8.3 Layer 2: Institutional Interface

**Theme:** Energy & Performance
**Colors:** Red/Terracotta palette (#E07A5F to #D2691E)
**Style:** Professional, data-driven, powerful

**Key Elements:**
- Angular design elements
- Strong contrast
- Performance metrics
- Team visualizations
- Culture showcase

### 8.4 Layer 3: Federal Canvas

**Theme:** Prestige & Authority
**Colors:** Navy (#0D4C92) + Gold (#F4D03F)
**Style:** Official, elegant, comprehensive

**Key Elements:**
- Gold accents on navy
- Government seal integration
- National emblems
- Large-scale data visualizations
- Official document styling

---

## 9. RESPONSIVE DESIGN

### 9.1 Breakpoints

```
Mobile:      320px - 767px
Tablet:      768px - 1023px
Desktop:     1024px - 1439px
Large:       1440px+
```

### 9.2 Grid System

**12-Column Grid:**
```
Mobile:      4 columns, 16px gutters
Tablet:      8 columns, 24px gutters
Desktop:     12 columns, 24px gutters
```

### 9.3 Container Widths

```
Mobile:      100% (with 16px padding)
Tablet:      720px
Desktop:     1200px
Large:       1400px
```

---

## 10. ACCESSIBILITY

### 10.1 Color Contrast

All text must meet WCAG 2.1 AA standards:
- **Normal text:** 4.5:1 contrast ratio
- **Large text:** 3:1 contrast ratio
- **UI components:** 3:1 contrast ratio

### 10.2 Focus States

All interactive elements must have visible focus indicators:
```css
:focus {
  outline: 2px solid #0D4C92;
  outline-offset: 2px;
}
```

### 10.3 Screen Reader Support

- All images must have alt text
- All icons must have aria-labels
- All forms must have proper labels
- All interactive elements must be keyboard accessible

---

## 11. ANIMATION & MOTION

### 11.1 Timing Functions

```css
ease-out:     cubic-bezier(0, 0, 0.2, 1)     - Entering
ease-in:      cubic-bezier(0.4, 0, 1, 1)     - Exiting
ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1)   - Both
```

### 11.2 Duration

```
Fast:    100ms - Hover states, focus
Normal:  200ms - Buttons, cards
Slow:    300ms - Modals, drawers
Slower:  500ms - Page transitions
```

### 11.3 Common Animations

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Slide Up:**
```css
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Scale In:**
```css
@keyframes scaleIn {
  from { 
    opacity: 0;
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## 12. ASSET ORGANIZATION

### 12.1 Directory Structure

```
/assets
├── /logos
│   ├── LogoBW.png
│   ├── LogoBW2.png
│   ├── LogoBW3.png
│   ├── LogoBW4.png
│   ├── NOORPlatform.png
│   ├── NOORInstitution.png
│   └── NOORFederal.png
├── /palettes
│   ├── PlatformPalette.png
│   ├── FedPalette.png
│   └── COREPalette.png
├── /icons
│   └── (Faculty icons, UI icons)
└── /templates
    ├── pasted_content_3.txt (Government Portal Template)
    ├── pasted_content_4.txt (Gamified SaaS Template)
    └── pasted_content_5.txt (Double Palette Reference)
```

### 12.2 File Naming Conventions

```
Logos:       LogoBW_[variant].png, NOOR[Layer].png
Icons:       icon_[name]_[size].svg
Images:      img_[description]_[size].jpg/png
Documents:   doc_[name]_[version].pdf
```

---

## 13. BRAND VOICE & TONE

### 13.1 Brand Personality

- **Professional** yet approachable
- **Authoritative** yet supportive
- **Innovative** yet trustworthy
- **Aspirational** yet realistic

### 13.2 Writing Guidelines

**Do:**
- Use active voice
- Be concise and clear
- Use inclusive language
- Respect cultural context
- Emphasize user benefits

**Don't:**
- Use jargon without explanation
- Make unrealistic promises
- Use aggressive language
- Ignore accessibility
- Overcomplicate messaging

### 13.3 Tone by Layer

**Layer 1 (Individual):**
- Encouraging, supportive, personal
- "Your journey to excellence starts here"

**Layer 2 (Institutional):**
- Professional, results-oriented, strategic
- "Empowering organizations to build world-class teams"

**Layer 3 (Federal):**
- Authoritative, visionary, national
- "Advancing UAE Vision 2071 through human capital intelligence"

---

## 14. IMPLEMENTATION CHECKLIST

### 14.1 For AURORA AI Agent

- [ ] Import all logo files to design system
- [ ] Configure color tokens in Figma/design tool
- [ ] Set up typography scale
- [ ] Create component library
- [ ] Define spacing system
- [ ] Build responsive grid
- [ ] Create icon library
- [ ] Set up animation presets
- [ ] Configure accessibility settings
- [ ] Create layer-specific themes

### 14.2 For Development Team

- [ ] Set up CSS variables for colors
- [ ] Configure Tailwind CSS theme
- [ ] Import font families
- [ ] Create component library (shadcn/ui)
- [ ] Set up responsive breakpoints
- [ ] Configure animation utilities
- [ ] Implement accessibility features
- [ ] Create style guide documentation
- [ ] Set up design tokens
- [ ] Create Storybook for components

---

## 15. MAINTENANCE & UPDATES

### 15.1 Version Control

- All brand assets stored in Git repository
- Version numbers follow semantic versioning (MAJOR.MINOR.PATCH)
- Change log maintained for all updates

### 15.2 Review Schedule

- **Quarterly:** Review color accessibility
- **Semi-annually:** Update component library
- **Annually:** Full brand audit and refresh

### 15.3 Contact

For brand guidelines questions or asset requests:
- **Email:** brand@noor.gov.ae
- **Slack:** #noor-design-system
- **Documentation:** https://design.noor.gov.ae

---

## 16. APPENDIX

### 16.1 Color Palette Export (CSS Variables)

```css
:root {
  /* Core Blues */
  --color-navy: #0D4C92;
  --color-royal-blue: #3A7BC8;
  --color-sky-blue: #59ADFF;
  --color-light-blue: #89C4F4;
  --color-ice-blue: #B3D9FF;
  
  /* Platform Colors */
  --color-primary: #2563EB;
  --color-secondary: #60A5FA;
  --color-accent: #FBCFE8;
  --color-warm: #FDBA74;
  --color-energy: #FB923C;
  --color-alert: #EF4444;
  
  /* Federal Colors */
  --color-cream: #F5E6D3;
  --color-light-gold: #F4D03F;
  --color-medium-gold: #E6C136;
  --color-dark-gold: #D4AF37;
  --color-bronze: #B8860B;
  
  /* Institutional Colors */
  --color-terracotta: #E07A5F;
  --color-coral: #F2CC8F;
  --color-rust: #B8453C;
  --color-peach: #FDB777;
  --color-burnt-orange: #D2691E;
  
  /* Semantic Colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  
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
}
```

### 16.2 Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: '#0D4C92',
        'royal-blue': '#3A7BC8',
        'sky-blue': '#59ADFF',
        'light-blue': '#89C4F4',
        'ice-blue': '#B3D9FF',
        // ... (all other colors)
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto'],
        arabic: ['Dubai', 'Noto Sans Arabic', 'Helvetica Neue', 'Arial'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
    },
  },
}
```

---

**End of Brand Asset Package**

**Next Steps:**
1. Import all assets to design system
2. Configure AURORA AI Agent with these specifications
3. Update all existing mockups and diagrams with proper branding
4. Create Figma/design tool library
5. Distribute to development team

**Status:** ✅ READY FOR IMPLEMENTATION


## 4. TYPOGRAPHY SYSTEM (BILINGUAL)

### 4.1 Brand Typography Philosophy

NOOR's typography system balances **technical precision** with **approachable professionalism**, supporting both English and Arabic seamlessly.

**Core Principles:**
- Geometric harmony across languages
- Technical credibility (Space Mono)
- Friendly accessibility (Hammersmith One)
- Professional Arabic typography (IBM Plex Sans Arabic)
- Performance-optimized (system fonts for body text)

### 4.2 Font Families

#### 4.2.1 English Fonts

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

#### 4.2.2 Arabic Fonts ⭐ PRIMARY RECOMMENDATION

**Arabic Font (All Uses):**
```
Font: IBM Plex Sans Arabic
Use: All Arabic text (display, headings, body)
Weights: Thin (100) to Bold (700)
License: Open Source (SIL Open Font License)
Source: https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic
```

**Why IBM Plex Sans Arabic:**
- ✅ Perfect geometric harmony with Space Mono
- ✅ Modern, technical, professional appearance
- ✅ Excellent legibility at all sizes
- ✅ Multiple weights (100-700) for flexibility
- ✅ Open source and free to use
- ✅ Designed for government/tech branding

**Alternative Options:**
1. **Dubai Font** - Official UAE government font (requires download)
2. **Tajawal** - Warm, approachable, low-contrast
3. **Noto Sans Arabic** - Universal coverage, Google Fonts
4. **Cairo** - Contemporary geometric design

### 4.3 Font Loading (CSS)

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

### 4.4 Type Scale (Bilingual)

#### 4.4.1 English Type Scale

```
Display:     48px / 3rem    (Space Mono Bold)       - Hero titles, branding
H1:          36px / 2.25rem (Hammersmith One)       - Page titles
H2:          30px / 1.875rem(Hammersmith One)       - Section titles
H3:          24px / 1.5rem  (Hammersmith One)       - Card titles
H4:          20px / 1.25rem (System font Medium)    - Subsection titles
H5:          18px / 1.125rem(System font Medium)    - Small headings
Body Large:  16px / 1rem    (System font Regular)   - Primary body text
Body:        14px / 0.875rem(System font Regular)   - Secondary body text
Small:       12px / 0.75rem (System font Regular)   - Captions, labels
Tiny:        10px / 0.625rem(System font Regular)   - Micro text
```

#### 4.4.2 Arabic Type Scale (Slightly Larger)

```
Display:     52px / 3.25rem (IBM Plex Bold)         - Hero titles, branding
H1:          40px / 2.5rem  (IBM Plex SemiBold)     - Page titles
H2:          34px / 2.125rem(IBM Plex SemiBold)     - Section titles
H3:          28px / 1.75rem (IBM Plex Medium)       - Card titles
H4:          22px / 1.375rem(IBM Plex Medium)       - Subsection titles
H5:          20px / 1.25rem (IBM Plex Regular)      - Small headings
Body Large:  18px / 1.125rem(IBM Plex Regular)      - Primary body text
Body:        16px / 1rem    (IBM Plex Regular)      - Secondary body text
Small:       14px / 0.875rem(IBM Plex Regular)      - Captions, labels
Tiny:        12px / 0.75rem (IBM Plex Regular)      - Micro text
```

**Note:** Arabic text is set 10-15% larger than English due to the complexity of Arabic letterforms.

### 4.5 Font Weights

#### 4.5.1 English Weights

```
Light:       300 - Large display text only
Regular:     400 - Body text, paragraphs
Medium:      500 - Emphasized text, labels
Semibold:    600 - Headings, buttons
Bold:        700 - Strong emphasis, titles
Extrabold:   800 - Hero text only
```

#### 4.5.2 Arabic Weights (IBM Plex Sans Arabic)

```
Thin:        100 - Decorative use only
ExtraLight:  200 - Large display text
Light:       300 - Display text, quotes
Regular:     400 - Body text, paragraphs
Medium:      500 - Emphasized text, labels
Semibold:    600 - Headings, buttons
Bold:        700 - Strong emphasis, titles
```

### 4.6 Line Heights

#### 4.6.1 English Line Heights

```
Tight:       1.2  - Large display text
Snug:        1.35 - Headings (H1-H3)
Normal:      1.5  - Body text, UI elements
Relaxed:     1.75 - Long-form content
Loose:       2.0  - Spacious layouts
```

#### 4.6.2 Arabic Line Heights (More Generous)

```
Tight:       1.4  - Large display text
Snug:        1.5  - Headings (H1-H3)
Normal:      1.8  - Body text, UI elements
Relaxed:     2.0  - Long-form content
Loose:       2.2  - Spacious layouts
```

**Note:** Arabic requires more line height due to diacritics and letter complexity.

### 4.7 Letter Spacing

#### 4.7.1 English Letter Spacing

```
Tight:       -0.02em - Large headings
Normal:      0       - Body text
Wide:        0.05em  - All caps text
Wider:       0.1em   - Uppercase headings
```

#### 4.7.2 Arabic Letter Spacing

```
ALL TEXT:    0       - NEVER add letter-spacing to Arabic
```

**Critical:** Arabic script is cursive and connected. Adding letter-spacing breaks the visual flow and makes text unreadable.

### 4.8 Logo Typography

#### 4.8.1 "PROJECT/NOOR" (English)

```css
.logo-en {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #0D4C92;
}
```

#### 4.8.2 "مشروع/نور" (Arabic)

```css
.logo-ar {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 0; /* Never add spacing */
  color: #0D4C92;
  direction: rtl;
}
```

### 4.9 RTL (Right-to-Left) Support

```css
/* Automatic RTL support */
html[lang="ar"] {
  direction: rtl;
  font-family: var(--font-body-ar);
}

html[lang="en"] {
  direction: ltr;
  font-family: var(--font-body-en);
}

/* RTL-specific adjustments */
[dir="rtl"] .flex { flex-direction: row-reverse; }
[dir="rtl"] .text-left { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }
[dir="rtl"] .ml-4 { margin-left: 0; margin-right: 1rem; }
[dir="rtl"] .mr-4 { margin-right: 0; margin-left: 1rem; }
[dir="rtl"] .pl-4 { padding-left: 0; padding-right: 1rem; }
[dir="rtl"] .pr-4 { padding-right: 0; padding-left: 1rem; }
```

### 4.10 Accessibility Guidelines

**Minimum Font Sizes:**
- English body text: 14px minimum
- Arabic body text: 16px minimum
- Small text (captions): 12px minimum (English), 14px minimum (Arabic)

**Contrast Ratios:**
- Body text: 4.5:1 minimum (WCAG AA)
- Large text (18px+): 3:1 minimum
- UI elements: 3:1 minimum

**Font Weight Minimums:**
- Body text: 400 (Regular) minimum
- Small text: 500 (Medium) minimum for legibility

### 4.11 Performance Optimization

**Font Loading Strategy:**
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/SpaceMono-Bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/IBMPlexSansArabic-Regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- Use font-display: swap for better performance -->
<style>
@font-face {
  font-family: 'Space Mono';
  src: url('/fonts/SpaceMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap; /* Show fallback font immediately */
}
</style>
```

**Font Subsetting:**
- English fonts: Latin character set only (~20KB)
- Arabic fonts: Arabic + Latin character sets (~60KB)
- Total font weight: ~80KB (optimized)

### 4.12 Typography Usage Matrix

| Element | English Font | Arabic Font | Weight | Size |
|---------|-------------|-------------|--------|------|
| **Logo** | Space Mono | IBM Plex Arabic | 700 | 24px / 28px |
| **Hero Title** | Space Mono | IBM Plex Arabic | 700 | 48px / 52px |
| **Page Title (H1)** | Hammersmith One | IBM Plex Arabic | 600 | 36px / 40px |
| **Section Title (H2)** | Hammersmith One | IBM Plex Arabic | 600 | 30px / 34px |
| **Card Title (H3)** | Hammersmith One | IBM Plex Arabic | 500 | 24px / 28px |
| **Body Text** | System Font | IBM Plex Arabic | 400 | 14px / 16px |
| **Button Text** | System Font | IBM Plex Arabic | 600 | 14px / 16px |
| **Caption** | System Font | IBM Plex Arabic | 400 | 12px / 14px |
| **Code/Technical** | Space Mono | Space Mono | 400 | 14px / 14px |

