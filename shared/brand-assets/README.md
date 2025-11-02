# NOOR Brand Assets Library

This directory contains all brand assets for the NOOR platform, including logos, color palettes, typography, diagrams, and implementation resources.

## Directory Structure

```
brand-assets/
├── logos/          # NOOR logos in various formats and sizes
├── colors/         # Color palette files (CSS, SCSS, JSON)
├── fonts/          # Typography files (WOFF2, TTF)
├── icons/          # Icon library (SVG)
├── diagrams/       # System architecture and flow diagrams
├── css/            # CSS framework and stylesheets
└── docs/           # Brand guidelines and specifications
```

## Key Documents

### Brand Guidelines
- **Brand Asset Package** - Complete brand identity guide
- **Typography Arabic Pairing** - Bilingual typography system
- **Brand Guidelines Section** - Visual design principles

### Design System
- **AURORA Design System Specification** - Complete component library
- **Developer Implementation Guide** - How to implement the brand

### Visual Assets
- **Architecture Diagram** - NOOR 3-layer system architecture
- **Data Flow Diagram** - Data flow across all layers
- **User Journey Diagram** - User experience journey map

## Implementation

### Quick Start

1. **Link the CSS Framework:**
   ```html
   <link rel="stylesheet" href="brand-assets/css/noor-framework.css">
   ```

2. **Use Color Variables:**
   ```css
   .my-element {
     background-color: var(--noor-blue);
     color: var(--off-white);
   }
   ```

3. **Apply Typography:**
   ```html
   <h1>Heading with Hammersmith One</h1>
   <p>Body text with System UI fonts</p>
   ```

### Color Palettes

**Platform Palette (Layer 1):**
- Primary: `#4A90C4` (NOOR Blue)
- Success: `#2E8B57` (Success Green)
- Warning: `#F5A623` (Warm Amber)

**Institutional Palette (Layer 2):**
- Primary: `#2C5F8D` (Corporate Blue)
- Accent: `#D4AF37` (Gold)

**Federal Palette (Layer 3):**
- Primary: `#1E3A5F` (Government Blue)
- Accent: `#D4AF37` (UAE Gold)

### Typography

**English:**
- Headings: Hammersmith One
- Body: System UI Fonts
- Technical: Space Mono

**Arabic:**
- All Text: IBM Plex Sans Arabic

## Usage Guidelines

### Logo Usage
- Minimum size: 120px width (digital), 30mm width (print)
- Clear space: Equal to height of letter "N" on all sides
- Do not stretch, rotate, or apply effects

### Color Contrast
- Text: Minimum 4.5:1 contrast ratio
- Large text (18pt+): Minimum 3:1 contrast ratio
- Follow WCAG 2.1 AA standards

### Accessibility
- Support screen readers with semantic HTML
- Provide keyboard navigation
- Include RTL support for Arabic
- Touch targets minimum 44×44px

## Support

For questions or contributions:
- Review the AURORA Design System specification
- Submit proposals via GitHub
- Contact the NOOR brand team

---

**Version:** 1.0  
**Last Updated:** October 29, 2025  
**Maintained by:** NOOR Platform Team

