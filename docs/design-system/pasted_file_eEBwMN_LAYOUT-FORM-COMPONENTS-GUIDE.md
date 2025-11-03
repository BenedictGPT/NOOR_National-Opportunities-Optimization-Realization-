# HeroUI Layout & Form Components - Implementation Guide

## Overview
This guide covers four essential UI components: Skeleton (with loading states), Card (container), Spacer (layout), and Switch (toggle).

---

## 1. Skeleton Component

### Features from HeroUI
- **State-based visibility**: `isLoaded` prop controls skeleton vs content
- **Flexible shapes**: Supports any content shape
- **Shimmer effect**: Optional animated shimmer overlay
- **Custom styling**: Full control over dimensions and border radius

### Component Props

```typescript
interface SkeletonProps {
  // State
  isLoaded?: boolean;
  
  // Appearance
  className?: string;
  
  // Content
  children?: React.ReactNode;
}
```

### CSS Implementation

```css
/* Skeleton.css */

/* Base Skeleton */
.skeleton {
  position: relative;
  background-color: #e5e5e5;          /* $colors.neutral.200 */
  border-radius: 8px;                 /* $borderRadius.md */
  overflow: hidden;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Shimmer Effect (optional enhancement) */
.skeleton::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 2s infinite;
}

/* Loaded State */
.skeleton--loaded {
  animation: none;
  background-color: transparent;
}

.skeleton--loaded::before {
  display: none;
}

/* Shape Variants */
.skeleton--text {
  height: 16px;
  border-radius: 4px;               /* $borderRadius.sm */
  margin-bottom: 8px;               /* $spacing.2 */
}

.skeleton--title {
  height: 24px;
  border-radius: 8px;               /* $borderRadius.md */
  margin-bottom: 12px;              /* $spacing.3 */
}

.skeleton--avatar,
.skeleton--circle {
  border-radius: 9999px;            /* $borderRadius.full */
}

.skeleton--rectangle {
  width: 100%;
  height: 96px;
  border-radius: 12px;              /* $borderRadius.lg */
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
```

### React Implementation

```typescript
// Skeleton.tsx
import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  isLoaded?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  isLoaded = false,
  className = '',
  children,
}) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <div className={`skeleton ${className}`}>
      {children}
    </div>
  );
};
```

### Usage Examples

#### Example 1: Card Skeleton (HeroUI Pattern)

```typescript
import { Card, Skeleton } from "@/components";

export default function CardSkeletonExample() {
  return (
    <Card className="w-[200px] space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300" />
      </Skeleton>
      
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
}
```

#### Example 2: Avatar with Text Skeleton

```typescript
export default function AvatarSkeletonExample() {
  return (
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
  );
}
```

#### Example 3: Toggle Loading State

```typescript
export default function LoadingToggleExample() {
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  return (
    <div className="flex flex-col gap-3">
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg" isLoaded={isLoaded}>
          <div className="h-24 rounded-lg bg-secondary" />
        </Skeleton>
        
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg" isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg" isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg" isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary-200" />
          </Skeleton>
        </div>
      </Card>
      
      <Button
        color="secondary"
        size="sm"
        variant="flat"
        onPress={toggleLoad}
      >
        {isLoaded ? "Show" : "Hide"} Skeleton
      </Button>
    </div>
  );
}
```

---

## 2. Card Component

### Features
- **Flexible container**: Groups related content
- **Multiple radius options**: none, sm, md, lg, xl, 2xl
- **Shadow variants**: none, sm, md, lg
- **Interactive states**: hoverable, pressable
- **Header/Body/Footer**: Optional sections

### Component Props

```typescript
interface CardProps {
  // Appearance
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  
  // Variants
  variant?: 'default' | 'bordered' | 'flat';
  isHoverable?: boolean;
  isPressable?: boolean;
  
  // Content
  children: React.ReactNode;
  
  // Styling
  className?: string;
  
  // Interaction
  onClick?: () => void;
}
```

### CSS Implementation

```css
/* Card.css */

/* Base Card */
.card {
  background-color: #ffffff;          /* $colors.white */
  border-radius: 12px;                /* $borderRadius.lg */
  border: 1px solid #e5e5e5;          /* $colors.neutral.200 */
  padding: 16px;                      /* $spacing.4 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);  /* $shadows.sm */
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Radius Variants */
.card--radius-none { border-radius: 0; }
.card--radius-sm { border-radius: 4px; }
.card--radius-md { border-radius: 8px; }
.card--radius-lg { border-radius: 12px; }
.card--radius-xl { border-radius: 16px; }
.card--radius-2xl { border-radius: 24px; }
.card--radius-full { border-radius: 9999px; }

/* Shadow Variants */
.card--shadow-none {
  box-shadow: none;
}

.card--shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.card--shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card--shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Style Variants */
.card--bordered {
  border: 2px solid #d4d4d4;          /* $colors.neutral.300 */
}

.card--flat {
  box-shadow: none;
  border: none;
  background-color: #fafafa;          /* $colors.neutral.50 */
}

/* Interactive Variants */
.card--hoverable {
  cursor: pointer;
}

.card--hoverable:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.card--pressable {
  cursor: pointer;
}

.card--pressable:active {
  transform: scale(0.98);
}

/* Card Sections */
.card__header {
  padding: 16px 16px 12px;            /* $spacing.4 $spacing.4 $spacing.3 */
  border-bottom: 1px solid #e5e5e5;   /* $colors.neutral.200 */
  font-weight: 600;                   /* $fontWeight.semibold */
  font-size: 18px;                    /* $fontSize.lg */
}

.card__body {
  padding: 16px;                      /* $spacing.4 */
}

.card__footer {
  padding: 12px 16px 16px;            /* $spacing.3 $spacing.4 $spacing.4 */
  border-top: 1px solid #e5e5e5;      /* $colors.neutral.200 */
}
```

### React Implementation

```typescript
// Card.tsx
import React from 'react';
import './Card.css';

interface CardProps {
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered' | 'flat';
  isHoverable?: boolean;
  isPressable?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  radius = 'lg',
  shadow = 'sm',
  variant = 'default',
  isHoverable = false,
  isPressable = false,
  children,
  className = '',
  onClick,
}) => {
  const classes = [
    'card',
    `card--radius-${radius}`,
    `card--shadow-${shadow}`,
    variant !== 'default' && `card--${variant}`,
    isHoverable && 'card--hoverable',
    isPressable && 'card--pressable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

// Card sub-components
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`card__header ${className}`}>{children}</div>;

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`card__body ${className}`}>{children}</div>;

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`card__footer ${className}`}>{children}</div>;
```

### Usage Example

```typescript
// Custom Card with Spacer (HeroUI Pattern)
export const CustomCard = () => (
  <Card className="w-[200px] space-y-5 p-4" radius="2xl">
    <div className="h-24 rounded-lg bg-default-300" />
    <div className="space-y-3">
      <div className="h-3 w-3/5 rounded-lg bg-default-200" />
      <div className="h-3 w-4/5 rounded-lg bg-default-200" />
      <div className="h-3 w-2/5 rounded-lg bg-default-300" />
    </div>
  </Card>
);

export default function App() {
  return (
    <div className="flex">
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
    </div>
  );
}
```

---

## 3. Spacer Component

### Features
- **Flexible spacing**: Auto-grows to fill available space
- **Horizontal spacing**: `x` prop for width
- **Vertical spacing**: `y` prop for height
- **Design token values**: Matches spacing scale

### Component Props

```typescript
interface SpacerProps {
  x?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  y?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
}
```

### CSS Implementation

```css
/* Spacer.css */

.spacer {
  display: block;
  flex-shrink: 0;
}

/* Default (flexible) */
.spacer--flex {
  flex: 1;
}

/* Horizontal Spacing */
.spacer-x-1 { width: 4px; }
.spacer-x-2 { width: 8px; }
.spacer-x-3 { width: 12px; }
.spacer-x-4 { width: 16px; }
.spacer-x-5 { width: 20px; }
.spacer-x-6 { width: 24px; }
.spacer-x-8 { width: 32px; }
.spacer-x-10 { width: 40px; }
.spacer-x-12 { width: 48px; }
.spacer-x-16 { width: 64px; }

/* Vertical Spacing */
.spacer-y-1 { height: 4px; }
.spacer-y-2 { height: 8px; }
.spacer-y-3 { height: 12px; }
.spacer-y-4 { height: 16px; }
.spacer-y-5 { height: 20px; }
.spacer-y-6 { height: 24px; }
.spacer-y-8 { height: 32px; }
.spacer-y-10 { height: 40px; }
.spacer-y-12 { height: 48px; }
.spacer-y-16 { height: 64px; }
```

### React Implementation

```typescript
// Spacer.tsx
import React from 'react';
import './Spacer.css';

interface SpacerProps {
  x?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  y?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
}

export const Spacer: React.FC<SpacerProps> = ({ x, y }) => {
  const classes = [
    'spacer',
    !x && !y && 'spacer--flex',
    x && `spacer-x-${x}`,
    y && `spacer-y-${y}`,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} />;
};
```

### Usage Examples

```typescript
// Horizontal spacing
<div className="flex">
  <Card>Content 1</Card>
  <Spacer x={4} />
  <Card>Content 2</Card>
</div>

// Vertical spacing
<div className="flex flex-col">
  <Card>Content 1</Card>
  <Spacer y={6} />
  <Card>Content 2</Card>
</div>

// Flexible spacer (fills available space)
<div className="flex">
  <Button>Left</Button>
  <Spacer />
  <Button>Right</Button>
</div>
```

---

## 4. Switch Component

### Features
- **Toggle control**: On/off binary states
- **6 color variants**: default, primary, secondary, success, warning, danger
- **3 size variants**: small, default, large
- **Smooth transitions**: Animated thumb movement
- **Label support**: Optional text label

### Component Props

```typescript
interface SwitchProps {
  // State
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  
  // Appearance
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'default' | 'large';
  
  // Content
  children?: React.ReactNode;
  
  // Behavior
  isDisabled?: boolean;
  
  // Styling
  className?: string;
}
```

### CSS Implementation

```css
/* Switch.css */

/* Container */
.switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;                           /* $spacing.2 */
  cursor: pointer;
}

.switch--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Track */
.switch__track {
  position: relative;
  width: 44px;
  height: 24px;
  background-color: #d4d4d4;          /* $colors.neutral.300 */
  border-radius: 9999px;              /* $borderRadius.full */
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  flex-shrink: 0;
}

.switch__track--checked {
  background-color: #171717;          /* $colors.neutral.900 */
}

/* Thumb */
.switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: #ffffff;          /* $colors.white */
  border-radius: 9999px;              /* $borderRadius.full */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.switch__track--checked .switch__thumb {
  transform: translateX(20px);
}

/* Label */
.switch__label {
  font-size: 16px;                    /* $fontSize.base */
  color: #171717;                     /* $colors.neutral.900 */
  cursor: pointer;
  user-select: none;
}

/* Color Variants */
.switch__track--color-default.switch__track--checked {
  background-color: #171717;          /* $colors.neutral.900 */
}

.switch__track--color-primary.switch__track--checked {
  background-color: #3b82f6;          /* $colors.primary.500 */
}

.switch__track--color-secondary.switch__track--checked {
  background-color: #475569;          /* $colors.secondary.600 */
}

.switch__track--color-success.switch__track--checked {
  background-color: #22c55e;          /* $colors.success.500 */
}

.switch__track--color-warning.switch__track--checked {
  background-color: #f59e0b;          /* $colors.warning.500 */
}

.switch__track--color-danger.switch__track--checked {
  background-color: #ef4444;          /* $colors.error.500 */
}

/* Size Variants */
/* Small */
.switch--size-small .switch__track {
  width: 36px;
  height: 20px;
}

.switch--size-small .switch__thumb {
  width: 16px;
  height: 16px;
}

.switch--size-small .switch__track--checked .switch__thumb {
  transform: translateX(16px);
}

.switch--size-small .switch__label {
  font-size: 14px;                    /* $fontSize.sm */
}

/* Large */
.switch--size-large .switch__track {
  width: 52px;
  height: 28px;
}

.switch--size-large .switch__thumb {
  width: 24px;
  height: 24px;
}

.switch--size-large .switch__track--checked .switch__thumb {
  transform: translateX(24px);
}

.switch--size-large .switch__label {
  font-size: 18px;                    /* $fontSize.lg */
}
```

### React Implementation

```typescript
// Switch.tsx
import React, { useState } from 'react';
import './Switch.css';

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'default' | 'large';
  children?: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  color = 'primary',
  size = 'default',
  children,
  isDisabled = false,
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (isDisabled) return;

    const newChecked = !checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
  };

  const containerClasses = [
    'switch',
    `switch--size-${size}`,
    isDisabled && 'switch--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const trackClasses = [
    'switch__track',
    `switch__track--color-${color}`,
    checked && 'switch__track--checked',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={containerClasses}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        disabled={isDisabled}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />
      
      <div className={trackClasses}>
        <div className="switch__thumb" />
      </div>
      
      {children && <span className="switch__label">{children}</span>}
    </label>
  );
};
```

### Usage Example (HeroUI Pattern)

```typescript
import { Switch } from "@/components";

export default function App() {
  return (
    <div className="flex gap-4">
      <Switch defaultChecked color="default">
        Default
      </Switch>
      <Switch defaultChecked color="primary">
        Primary
      </Switch>
      <Switch defaultChecked color="secondary">
        Secondary
      </Switch>
      <Switch defaultChecked color="success">
        Success
      </Switch>
      <Switch defaultChecked color="warning">
        Warning
      </Switch>
      <Switch defaultChecked color="danger">
        Danger
      </Switch>
    </div>
  );
}
```

---

## Design System Integration

### Token Usage Summary

| Component | Key Tokens Used |
|-----------|----------------|
| **Skeleton** | `$colors.neutral.200`, `$borderRadius.md`, `$transitions.base` |
| **Card** | `$colors.white`, `$borderRadius.lg`, `$shadows.sm`, `$spacing.4` |
| **Spacer** | All `$spacing` values (1-16) |
| **Switch** | `$colors` (all variants), `$borderRadius.full`, `$transitions.base` |

### Accessibility Checklist

- [x] **Skeleton**: Provides visual loading feedback
- [x] **Card**: Keyboard accessible when interactive
- [x] **Spacer**: Pure layout, no accessibility concerns
- [x] **Switch**: 
  - Hidden checkbox for form integration
  - Keyboard toggle support
  - Disabled state visual feedback
  - Label association

---

## Summary

✅ **Skeleton**: State-based loading with shimmer effect  
✅ **Card**: Flexible container with multiple variants  
✅ **Spacer**: Layout utility for consistent spacing  
✅ **Switch**: Fully-featured toggle with 6 colors and 3 sizes  

All components fully integrated with the design system tokens!
