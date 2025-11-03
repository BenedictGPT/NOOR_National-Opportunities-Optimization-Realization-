# HeroUI Components - Design System Integration

## Overview
This document maps HeroUI's RadioGroup and Badge components to the design system, providing implementation patterns and customization options.

---

## 1. RadioGroup Component

### HeroUI Implementation Analysis

```typescript
import {RadioGroup, Radio} from "@heroui/react";

<RadioGroup label="Select your favorite city" orientation="horizontal">
  <Radio value="buenos-aires">Buenos Aires</Radio>
  <Radio value="sydney">Sydney</Radio>
  <Radio value="san-francisco">San Francisco</Radio>
  <Radio value="london">London</Radio>
  <Radio value="tokyo">Tokyo</Radio>
</RadioGroup>
```

### Key Features Identified
- **Container component**: `RadioGroup` manages state and layout
- **Orientation support**: `horizontal` or `vertical` (default)
- **Label support**: Group-level label
- **Value management**: Each radio has a unique value

### Design System Mapping

#### Component Structure

```
RadioGroup (container)
├── Label (group label)
├── Description (optional)
└── Radio Items Container
    ├── Radio 1
    ├── Radio 2
    └── Radio N
```

#### Props Interface

```typescript
interface RadioGroupProps {
  label?: string;
  description?: string;
  orientation?: 'horizontal' | 'vertical';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  color?: 'default' | 'primary' | 'success' | 'error';
  size?: 'small' | 'default' | 'large';
  children: React.ReactNode;
}

interface RadioProps {
  value: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  description?: string;
}
```

#### CSS Implementation with Design Tokens

```css
/* Radio Group Container */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;                          /* $spacing.3 */
}

/* Group Label */
.radio-group__label {
  font-size: 16px;                    /* $fontSize.base */
  font-weight: 500;                   /* $fontWeight.medium */
  color: #171717;                     /* $colors.neutral.900 */
  margin-bottom: 8px;                 /* $spacing.2 */
  display: block;
}

/* Group Description */
.radio-group__description {
  font-size: 14px;                    /* $fontSize.sm */
  color: #525252;                     /* $colors.neutral.600 */
  margin-top: 4px;                    /* $spacing.1 */
}

/* Radio Items Container */
.radio-group__items {
  display: flex;
  flex-direction: column;
  gap: 12px;                          /* $spacing.3 */
}

/* Horizontal Orientation */
.radio-group__items--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;                          /* $spacing.4 */
}

/* Individual Radio Container */
.radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;                           /* $spacing.2 */
  cursor: pointer;
}

/* Radio Input (visual) */
.radio__input {
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid #d4d4d4;          /* $colors.neutral.300 */
  border-radius: 9999px;              /* $borderRadius.full */
  background-color: #ffffff;          /* $colors.white */
  cursor: pointer;
  transition: 150ms;                  /* $transitions.fast */
  flex-shrink: 0;
}

.radio__input:hover {
  border-color: #a3a3a3;              /* $colors.neutral.400 */
}

.radio__input--checked {
  border-color: #3b82f6;              /* $colors.primary.500 */
}

.radio__input:focus-visible {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Radio Dot (inner circle) */
.radio__dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 10px;
  height: 10px;
  background-color: #3b82f6;          /* $colors.primary.500 */
  border-radius: 9999px;              /* $borderRadius.full */
  transition: 150ms;                  /* $transitions.fast */
}

.radio__input--checked .radio__dot {
  transform: translate(-50%, -50%) scale(1);
}

/* Radio Label */
.radio__label {
  font-size: 16px;                    /* $fontSize.base */
  color: #171717;                     /* $colors.neutral.900 */
  cursor: pointer;
  user-select: none;
}

/* Radio Description */
.radio__description {
  font-size: 14px;                    /* $fontSize.sm */
  color: #525252;                     /* $colors.neutral.600 */
  margin-top: 4px;                    /* $spacing.1 */
}

/* Disabled State */
.radio--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.radio--disabled .radio__input,
.radio--disabled .radio__label {
  cursor: not-allowed;
}

/* Size Variants */
.radio--small .radio__input {
  width: 16px;
  height: 16px;
}

.radio--small .radio__dot {
  width: 8px;
  height: 8px;
}

.radio--small .radio__label {
  font-size: 14px;                    /* $fontSize.sm */
}

.radio--large .radio__input {
  width: 24px;
  height: 24px;
}

.radio--large .radio__dot {
  width: 12px;
  height: 12px;
}

.radio--large .radio__label {
  font-size: 18px;                    /* $fontSize.lg */
}

/* Color Variants */
.radio--primary .radio__input--checked {
  border-color: #3b82f6;              /* $colors.primary.500 */
}

.radio--primary .radio__dot {
  background-color: #3b82f6;          /* $colors.primary.500 */
}

.radio--success .radio__input--checked {
  border-color: #22c55e;              /* $colors.success.500 */
}

.radio--success .radio__dot {
  background-color: #22c55e;          /* $colors.success.500 */
}

.radio--error .radio__input--checked {
  border-color: #ef4444;              /* $colors.error.500 */
}

.radio--error .radio__dot {
  background-color: #ef4444;          /* $colors.error.500 */
}
```

#### React Implementation Example

```typescript
import React, { useState, createContext, useContext } from 'react';
import './RadioGroup.css';

// Context for RadioGroup state management
const RadioGroupContext = createContext<{
  value: string | undefined;
  onChange: (value: string) => void;
  name: string;
  isDisabled?: boolean;
  color?: string;
  size?: string;
} | null>(null);

// RadioGroup Component
interface RadioGroupProps {
  label?: string;
  description?: string;
  orientation?: 'horizontal' | 'vertical';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  color?: 'default' | 'primary' | 'success' | 'error';
  size?: 'small' | 'default' | 'large';
  children: React.ReactNode;
  name?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  description,
  orientation = 'vertical',
  value: controlledValue,
  defaultValue,
  onChange,
  isDisabled = false,
  color = 'primary',
  size = 'default',
  children,
  name = `radio-group-${Math.random().toString(36).substr(2, 9)}`,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider
      value={{ value, onChange: handleChange, name, isDisabled, color, size }}
    >
      <div className="radio-group">
        {label && <label className="radio-group__label">{label}</label>}
        {description && <p className="radio-group__description">{description}</p>}
        <div
          className={`radio-group__items ${
            orientation === 'horizontal' ? 'radio-group__items--horizontal' : ''
          }`}
        >
          {children}
        </div>
      </div>
    </RadioGroupContext.Provider>
  );
};

// Radio Component
interface RadioProps {
  value: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  description?: string;
}

export const Radio: React.FC<RadioProps> = ({
  value,
  children,
  isDisabled: individualDisabled = false,
  description,
}) => {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error('Radio must be used within RadioGroup');
  }

  const { value: groupValue, onChange, name, isDisabled: groupDisabled, color, size } = context;
  const isDisabled = groupDisabled || individualDisabled;
  const isChecked = groupValue === value;

  const handleChange = () => {
    if (!isDisabled) {
      onChange(value);
    }
  };

  return (
    <label
      className={`radio radio--${color} radio--${size} ${
        isDisabled ? 'radio--disabled' : ''
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={isDisabled}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />
      <div className={`radio__input ${isChecked ? 'radio__input--checked' : ''}`}>
        <div className="radio__dot" />
      </div>
      <div>
        <span className="radio__label">{children}</span>
        {description && <p className="radio__description">{description}</p>}
      </div>
    </label>
  );
};
```

#### Usage Examples

```typescript
// Basic usage
<RadioGroup label="Select your favorite city" orientation="horizontal">
  <Radio value="buenos-aires">Buenos Aires</Radio>
  <Radio value="sydney">Sydney</Radio>
  <Radio value="san-francisco">San Francisco</Radio>
  <Radio value="london">London</Radio>
  <Radio value="tokyo">Tokyo</Radio>
</RadioGroup>

// With controlled state
const [selected, setSelected] = useState('sydney');

<RadioGroup
  label="Choose a city"
  value={selected}
  onChange={setSelected}
  color="success"
  size="large"
>
  <Radio value="paris">Paris</Radio>
  <Radio value="berlin">Berlin</Radio>
  <Radio value="madrid">Madrid</Radio>
</RadioGroup>

// With descriptions
<RadioGroup label="Select a plan" orientation="vertical">
  <Radio value="free" description="Perfect for getting started">
    Free Plan
  </Radio>
  <Radio value="pro" description="For professional developers">
    Pro Plan
  </Radio>
  <Radio value="enterprise" description="For large teams">
    Enterprise Plan
  </Radio>
</RadioGroup>
```

---

## 2. Badge Component (with Overlay Support)

### HeroUI Implementation Analysis

```typescript
import {Badge, Avatar} from "@heroui/react";

<Badge color="danger" content="5" placement="top-right">
  <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
</Badge>
```

### Key Features Identified
- **Overlay positioning**: `placement` prop with 4 corners
- **Content support**: Numeric or text content
- **Color variants**: danger, primary, success, etc.
- **Wrapper pattern**: Badge wraps the target element (Avatar)

### Design System Mapping

#### Component Structure

```
Badge Wrapper (relative)
├── Children (e.g., Avatar, Icon)
└── Badge Indicator (absolute, positioned)
```

#### Props Interface

```typescript
interface BadgeProps {
  // Content
  content?: string | number;
  
  // Appearance
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info';
  variant?: 'solid' | 'flat' | 'dot';
  size?: 'small' | 'default' | 'large';
  
  // Positioning (for overlay badges)
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  
  // Behavior
  isInvisible?: boolean;
  showOutline?: boolean;
  
  // Target element
  children?: React.ReactNode;
  
  // Standalone usage
  className?: string;
}
```

#### CSS Implementation with Design Tokens

```css
/* Badge Wrapper (when used as overlay) */
.badge-wrapper {
  position: relative;
  display: inline-flex;
}

/* Standalone Badge */
.badge {
  padding: 4px 8px;                   /* $spacing.1 $spacing.2 */
  font-size: 12px;                    /* $fontSize.xs */
  font-weight: 500;                   /* $fontWeight.medium */
  border-radius: 8px;                 /* $borderRadius.md */
  display: inline-flex;
  align-items: center;
  gap: 4px;                           /* $spacing.1 */
}

/* Overlay Badge (positioned over content) */
.badge--overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;                     /* 0 $spacing.1 */
  font-size: 12px;                    /* $fontSize.xs */
  font-weight: 600;                   /* $fontWeight.semibold */
  border-radius: 9999px;              /* $borderRadius.full */
  color: #ffffff;                     /* $colors.white */
  border: 2px solid #ffffff;          /* Border for contrast */
  z-index: 10;
}

/* Placement Variants */
.badge--top-right {
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}

.badge--top-left {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.badge--bottom-right {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}

.badge--bottom-left {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}

/* Color Variants - Standalone */
.badge--default {
  background-color: #f5f5f5;          /* $colors.neutral.100 */
  color: #404040;                     /* $colors.neutral.700 */
}

.badge--primary {
  background-color: #dbeafe;          /* $colors.primary.100 */
  color: #1d4ed8;                     /* $colors.primary.700 */
}

.badge--success {
  background-color: #dcfce7;          /* $colors.success.100 */
  color: #15803d;                     /* $colors.success.700 */
}

.badge--warning {
  background-color: #fef3c7;          /* $colors.warning.100 */
  color: #b45309;                     /* $colors.warning.700 */
}

.badge--danger,
.badge--error {
  background-color: #fee2e2;          /* $colors.error.100 */
  color: #b91c1c;                     /* $colors.error.700 */
}

.badge--info {
  background-color: #dbeafe;          /* $colors.info.100 */
  color: #1d4ed8;                     /* $colors.info.700 */
}

/* Color Variants - Overlay (solid backgrounds) */
.badge--overlay.badge--default {
  background-color: #737373;          /* $colors.neutral.500 */
}

.badge--overlay.badge--primary {
  background-color: #3b82f6;          /* $colors.primary.500 */
}

.badge--overlay.badge--success {
  background-color: #22c55e;          /* $colors.success.500 */
}

.badge--overlay.badge--warning {
  background-color: #f59e0b;          /* $colors.warning.500 */
}

.badge--overlay.badge--danger,
.badge--overlay.badge--error {
  background-color: #ef4444;          /* $colors.error.500 */
}

.badge--overlay.badge--info {
  background-color: #3b82f6;          /* $colors.info.500 */
}

/* Dot Variant (small indicator, no content) */
.badge--dot {
  min-width: 8px;
  height: 8px;
  padding: 0;
  border: 2px solid #ffffff;
}

/* Invisible State */
.badge--invisible {
  display: none;
}

/* Size Variants */
.badge--small {
  min-width: 16px;
  height: 16px;
  font-size: 10px;
  padding: 0 3px;
}

.badge--large {
  min-width: 24px;
  height: 24px;
  font-size: 14px;
  padding: 0 6px;
}

/* Outline */
.badge--show-outline {
  box-shadow: 0 0 0 2px #ffffff;
}
```

#### React Implementation Example

```typescript
import React from 'react';
import './Badge.css';

interface BadgeProps {
  content?: string | number;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info';
  variant?: 'solid' | 'flat' | 'dot';
  size?: 'small' | 'default' | 'large';
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  isInvisible?: boolean;
  showOutline?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  content,
  color = 'default',
  variant = 'solid',
  size = 'default',
  placement = 'top-right',
  isInvisible = false,
  showOutline = false,
  children,
  className = '',
}) => {
  const isOverlay = !!children;
  const isDot = variant === 'dot';

  const badgeClasses = [
    'badge',
    isOverlay && 'badge--overlay',
    isOverlay && `badge--${placement}`,
    `badge--${color}`,
    `badge--${size}`,
    isDot && 'badge--dot',
    isInvisible && 'badge--invisible',
    showOutline && 'badge--show-outline',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const badgeElement = (
    <span className={badgeClasses}>
      {!isDot && content}
    </span>
  );

  // If there are children, wrap them (overlay mode)
  if (children) {
    return (
      <div className="badge-wrapper">
        {children}
        {badgeElement}
      </div>
    );
  }

  // Standalone badge
  return badgeElement;
};
```

#### Usage Examples

```typescript
// Overlay on Avatar (like HeroUI example)
<Badge color="danger" content="5" placement="top-right">
  <Avatar src="https://i.pravatar.cc/150" />
</Badge>

// All four corner placements
<div className="flex gap-4">
  <Badge color="danger" content="5" placement="top-right">
    <Avatar src="https://i.pravatar.cc/150" />
  </Badge>
  
  <Badge color="danger" content="5" placement="top-left">
    <Avatar src="https://i.pravatar.cc/150" />
  </Badge>
  
  <Badge color="danger" content="5" placement="bottom-right">
    <Avatar src="https://i.pravatar.cc/150" />
  </Badge>
  
  <Badge color="danger" content="5" placement="bottom-left">
    <Avatar src="https://i.pravatar.cc/150" />
  </Badge>
</div>

// Dot variant (notification indicator)
<Badge color="success" variant="dot" placement="top-right">
  <BellIcon />
</Badge>

// Standalone badges (not overlays)
<Badge color="primary" content="New" />
<Badge color="success" content="Active" />
<Badge color="warning" content="Pending" />

// With dynamic content
<Badge color="danger" content={notificationCount} placement="top-right">
  <NotificationIcon />
</Badge>

// Hidden when no notifications
<Badge 
  color="danger" 
  content={count} 
  isInvisible={count === 0}
  placement="top-right"
>
  <BellIcon />
</Badge>
```

---

## Integration Summary

### Files Structure
```
components/
├── RadioGroup/
│   ├── RadioGroup.tsx
│   ├── Radio.tsx
│   ├── RadioGroup.css
│   └── index.ts
└── Badge/
    ├── Badge.tsx
    ├── Badge.css
    └── index.ts
```

### Design Token Usage

Both components leverage the design system tokens:

**Colors**: Primary, success, warning, danger/error, neutral scales
**Spacing**: Consistent gaps and padding (4px, 8px, 12px, 16px)
**Typography**: Font sizes (xs, sm, base, lg) and weights
**Border Radius**: Full circles for radio buttons and badge overlays
**Transitions**: Fast transitions (150ms) for smooth interactions
**Shadows**: Focus rings for accessibility

### Key Differences from HeroUI

1. **RadioGroup**: Added description support, more size variants
2. **Badge**: Separated standalone vs overlay usage more clearly
3. **Color naming**: Using "error" alongside "danger" for consistency
4. **Size options**: Added small/default/large for more flexibility

### Accessibility Notes

- Radio buttons use proper `input[type="radio"]` hidden elements
- Focus states with visible focus rings
- Disabled states with reduced opacity
- Proper ARIA labels and relationships
- Keyboard navigation support

---

## Next Steps

1. ✅ Review the component mappings
2. ⬜ Choose implementation approach (full custom or adapt existing)
3. ⬜ Add to your component library
4. ⬜ Test with various content and states
5. ⬜ Add accessibility tests
6. ⬜ Document usage patterns for your team
