# Component Code to Design System Mapping

## Overview
This document shows how your existing SpotlightCard and Slider components map to the JSON design system, and provides guidance for standardizing them.

---

## 1. SpotlightCard Component

### Your Current Implementation
```typescript
// SpotlightCard.tsx
interface SpotlightCardProps {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}
```

### Design System Mapping

#### Current CSS → Design Tokens

| Your CSS | Design System Token | Value |
|----------|-------------------|-------|
| `rgba(255, 255, 255, 0.25)` | `spotlightCard.variants.default.spotlight.spotlightColor` | Default spotlight |
| Border radius (implied) | `$borderRadius.lg` | 12px |
| Padding (implied) | `$spacing.6` | 24px |
| Background (implied) | `$colors.neutral.900` | #171717 |

#### Enhanced Props with Design System

```typescript
interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  variant?: 'default' | 'subtle' | 'vibrant' | 'primary' | 'success' | 'warning' | 'error';
  spotlightColor?: string; // Can be overridden
}
```

#### Variant Options from Design System

```typescript
const variantColors = {
  default: 'rgba(255, 255, 255, 0.25)',
  subtle: 'rgba(255, 255, 255, 0.15)',
  vibrant: 'rgba(255, 255, 255, 0.35)',
  primary: 'rgba(59, 130, 246, 0.3)',   // Blue
  success: 'rgba(34, 197, 94, 0.3)',    // Green
  warning: 'rgba(245, 158, 11, 0.3)',   // Orange
  error: 'rgba(239, 68, 68, 0.3)'       // Red
};
```

#### Standardized CSS with Design Tokens

```css
.card-spotlight {
  position: relative;
  overflow: hidden;
  border-radius: 12px;              /* $borderRadius.lg */
  background-color: #171717;        /* $colors.neutral.900 */
  padding: 24px;                    /* $spacing.6 */
  cursor: pointer;
  transition: 250ms;                /* $transitions.base */
}

.card-spotlight::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    var(--spotlight-color),
    transparent 40%
  );
  z-index: 1;
  pointer-events: none;
}

.card-spotlight > * {
  position: relative;
  z-index: 2;
}
```

---

## 2. Slider Component

### Your Current Implementation

Your slider uses custom styling with hardcoded colors and spacing.

### Design System Mapping

#### Current CSS → Design Tokens

| Your CSS | Design System Token | Value |
|----------|-------------------|-------|
| `width: 12rem` | `slider.variants.default.container.width` | 12rem (192px) |
| `gap: 1rem` | `$spacing.4` | 16px |
| `padding: 1rem 0` | `$spacing.4 0` | 16px 0 |
| `rgba(128, 128, 128, 0.4)` | Translates to `$colors.neutral.400` with opacity | Track background |
| `#888` | `$colors.neutral.500` | #737373 |
| `color: #808080` | `$colors.neutral.500` | #737373 |
| `font-size: 0.75rem` | `$fontSize.xs` | 12px |
| `width: 24px; height: 24px` | `slider.variants.default.icon.width/height` | 24px |

#### Enhanced Props with Design System

```typescript
interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  variant?: 'default' | 'primary' | 'success';
  size?: 'small' | 'default' | 'large';
  showValue?: boolean;
  showIcons?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}
```

#### Standardized CSS with Design Tokens

```css
/* Container */
.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;                        /* $spacing.4 */
  width: 12rem;
}

/* Wrapper */
.slider-wrapper {
  display: flex;
  width: 100%;
  touch-action: none;
  user-select: none;
  align-items: center;
  justify-content: center;
  gap: 16px;                        /* $spacing.4 */
}

/* Root */
.slider-root {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 200px;
  flex-grow: 1;
  cursor: grab;
  touch-action: none;
  user-select: none;
  align-items: center;
  padding: 16px 0;                  /* $spacing.4 0 */
}

.slider-root:active {
  cursor: grabbing;
}

/* Track */
.slider-track {
  position: relative;
  height: 8px;
  flex-grow: 1;
  overflow: hidden;
  border-radius: 9999px;            /* $borderRadius.full */
  background-color: rgba(163, 163, 163, 0.4);  /* $colors.neutral.400 with opacity */
}

/* Range (filled portion) */
.slider-range {
  position: absolute;
  height: 100%;
  background-color: #737373;        /* $colors.neutral.500 */
  border-radius: 9999px;            /* $borderRadius.full */
  transition: 150ms;                /* $transitions.fast */
}

/* Thumb (draggable handle) */
.slider-thumb {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #ffffff;        /* $colors.white */
  border: 2px solid #737373;        /* $colors.neutral.500 */
  border-radius: 9999px;            /* $borderRadius.full */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);  /* $shadows.md */
  cursor: grab;
  transition: 150ms;                /* $transitions.fast */
}

.slider-thumb:hover {
  transform: scale(1.1);
}

.slider-thumb:active {
  transform: scale(0.95);
  cursor: grabbing;
}

/* Value Indicator */
.value-indicator {
  color: #737373;                   /* $colors.neutral.500 */
  position: absolute;
  transform: translateY(-16px);     /* translateY(-$spacing.4) */
  font-size: 12px;                  /* $fontSize.xs */
  font-weight: 500;                 /* $fontWeight.medium */
  letter-spacing: 0.05em;
  background-color: #171717;        /* $colors.neutral.900 */
  padding: 4px 8px;                 /* $spacing.1 $spacing.2 */
  border-radius: 4px;               /* $borderRadius.sm */
  white-space: nowrap;
}

/* Icons */
.icon {
  width: 24px;
  height: 24px;
  color: #737373;                   /* $colors.neutral.500 */
}

.icon.dark {
  color: #d4d4d4;                   /* $colors.neutral.300 */
}

/* Variants */

/* Primary Variant */
.slider-root.primary .slider-range {
  background-color: #3b82f6;        /* $colors.primary.500 */
}

.slider-root.primary .slider-thumb {
  border-color: #3b82f6;            /* $colors.primary.500 */
}

.slider-root.primary .value-indicator {
  color: #3b82f6;                   /* $colors.primary.500 */
}

.slider-root.primary .icon {
  color: #3b82f6;                   /* $colors.primary.500 */
}

/* Success Variant */
.slider-root.success .slider-range {
  background-color: #22c55e;        /* $colors.success.500 */
}

.slider-root.success .slider-thumb {
  border-color: #22c55e;            /* $colors.success.500 */
}

/* Small Size */
.slider-root.small .slider-track {
  height: 4px;
}

.slider-root.small .slider-thumb {
  width: 16px;
  height: 16px;
}

.slider-root.small .icon {
  width: 20px;
  height: 20px;
}

/* Large Size */
.slider-root.large .slider-track {
  height: 12px;
}

.slider-root.large .slider-thumb {
  width: 24px;
  height: 24px;
}

.slider-root.large .icon {
  width: 28px;
  height: 28px;
}
```

---

## Implementation Recommendations

### 1. Create a Theme Constants File

```typescript
// theme.ts
export const theme = {
  colors: {
    primary: {
      500: '#3b82f6',
      // ... other shades
    },
    neutral: {
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      900: '#171717',
      // ... other shades
    },
    success: {
      500: '#22c55e',
    },
    white: '#ffffff',
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  fontSize: {
    xs: '12px',
    base: '16px',
  },
  fontWeight: {
    medium: '500',
    semibold: '600',
  },
  transitions: {
    fast: '150ms',
    base: '250ms',
  },
  shadows: {
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
};
```

### 2. Use CSS Variables (Recommended)

Create a global CSS file with CSS custom properties:

```css
/* global.css */
:root {
  /* Colors */
  --color-primary-500: #3b82f6;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-900: #171717;
  --color-success-500: #22c55e;
  --color-white: #ffffff;
  
  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* Typography */
  --font-size-xs: 12px;
  --font-size-base: 16px;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Transitions */
  --transition-fast: 150ms;
  --transition-base: 250ms;
  
  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
```

Then use them in your CSS:

```css
.slider-track {
  height: 8px;
  border-radius: var(--radius-full);
  background-color: rgba(163, 163, 163, 0.4);
}

.slider-range {
  background-color: var(--color-neutral-500);
  transition: var(--transition-fast);
}
```

### 3. Updated Component Examples

#### Enhanced SpotlightCard

```typescript
import React, { useRef } from 'react';
import './SpotlightCard.css';

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  variant?: 'default' | 'subtle' | 'vibrant' | 'primary' | 'success' | 'warning' | 'error';
  spotlightColor?: string;
}

const variantColors = {
  default: 'rgba(255, 255, 255, 0.25)',
  subtle: 'rgba(255, 255, 255, 0.15)',
  vibrant: 'rgba(255, 255, 255, 0.35)',
  primary: 'rgba(59, 130, 246, 0.3)',
  success: 'rgba(34, 197, 94, 0.3)',
  warning: 'rgba(245, 158, 11, 0.3)',
  error: 'rgba(239, 68, 68, 0.3)',
};

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  variant = 'default',
  spotlightColor,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  
  const finalSpotlightColor = spotlightColor || variantColors[variant];

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', finalSpotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
```

#### Enhanced Slider (Conceptual)

```typescript
interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  variant?: 'default' | 'primary' | 'success';
  size?: 'small' | 'default' | 'large';
  showValue?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  variant = 'default',
  size = 'default',
  showValue = true,
}) => {
  // ... implementation
  
  const classNames = `slider-root ${variant} ${size}`;
  
  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <div className={classNames}>
          {/* slider implementation */}
        </div>
      </div>
    </div>
  );
};
```

---

## Benefits of Using the Design System

1. **Consistency**: All components use the same colors, spacing, and styling
2. **Maintainability**: Update one token value to change it everywhere
3. **Scalability**: Easy to add new variants and themes
4. **Documentation**: Clear reference for all design decisions
5. **Flexibility**: Can override with custom values when needed
6. **Type Safety**: TypeScript interfaces align with design tokens

---

## Next Steps

1. ✅ Review the design system JSON
2. ✅ See how your code maps to design tokens
3. ⬜ Decide: Use CSS variables, TypeScript constants, or both
4. ⬜ Implement the standardized styles
5. ⬜ Add new variants as needed
6. ⬜ Test the components with different variants

Let me know if you'd like me to:
- Generate complete CSS files with all variants
- Create TypeScript theme objects
- Build example implementations
- Add more component variants
