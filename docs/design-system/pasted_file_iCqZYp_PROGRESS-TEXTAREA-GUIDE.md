# Progress & Textarea Components - Implementation Guide

## Overview
Complete implementation guide for the Progress bar and Textarea components with all HeroUI features including striped patterns, value formatting, auto-resize, and multiple variants.

---

## 1. Progress Component

### Features
- **Determinate & Indeterminate**: Track specific progress or show loading
- **6 Color variants**: default, primary, secondary, success, warning, danger
- **3 Size variants**: sm, md, lg
- **Striped animation**: Optional animated stripes
- **Value labels**: Display percentage or custom formatted values
- **Custom formatting**: Currency, percentages, custom formats

### Component Props

```typescript
interface ProgressProps {
  // Value
  value?: number;              // 0-100 for determinate progress
  minValue?: number;           // Min value (default: 0)
  maxValue?: number;           // Max value (default: 100)
  
  // Appearance
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  isStriped?: boolean;
  isIndeterminate?: boolean;
  
  // Labels
  label?: string;
  showValueLabel?: boolean;
  valueLabel?: string;
  formatOptions?: Intl.NumberFormatOptions;
  
  // Accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    labelWrapper?: string;
    label?: string;
    value?: string;
    track?: string;
    indicator?: string;
  };
}
```

### CSS Implementation

```css
/* Progress.css */

/* Base Container */
.progress {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;                           /* $spacing.2 */
}

/* Label Wrapper */
.progress__label-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;                 /* $spacing.1 */
}

.progress__label {
  font-size: 14px;                    /* $fontSize.sm */
  font-weight: 500;                   /* $fontWeight.medium */
  color: #404040;                     /* $colors.neutral.700 */
}

.progress__value {
  font-size: 14px;                    /* $fontSize.sm */
  font-weight: 500;                   /* $fontWeight.medium */
  color: #404040;                     /* $colors.neutral.700 */
}

/* Track */
.progress__track {
  width: 100%;
  height: 12px;
  background-color: #e5e5e5;          /* $colors.neutral.200 */
  border-radius: 9999px;              /* $borderRadius.full */
  overflow: hidden;
  position: relative;
}

/* Indicator (filled bar) */
.progress__indicator {
  height: 100%;
  background-color: #3b82f6;          /* $colors.primary.500 */
  border-radius: 9999px;              /* $borderRadius.full */
  transition: width 300ms ease-in-out;
}

/* Size Variants */
.progress--size-sm .progress__track {
  height: 8px;
}

.progress--size-sm .progress__label,
.progress--size-sm .progress__value {
  font-size: 12px;                    /* $fontSize.xs */
}

.progress--size-md .progress__track {
  height: 12px;
}

.progress--size-md .progress__label,
.progress--size-md .progress__value {
  font-size: 14px;                    /* $fontSize.sm */
}

.progress--size-lg .progress__track {
  height: 16px;
}

.progress--size-lg .progress__label,
.progress--size-lg .progress__value {
  font-size: 16px;                    /* $fontSize.base */
}

/* Color Variants */
.progress__indicator--color-default {
  background-color: #525252;          /* $colors.neutral.600 */
}

.progress__indicator--color-primary {
  background-color: #3b82f6;          /* $colors.primary.500 */
}

.progress__indicator--color-secondary {
  background-color: #475569;          /* $colors.secondary.600 */
}

.progress__indicator--color-success {
  background-color: #22c55e;          /* $colors.success.500 */
}

.progress__indicator--color-warning {
  background-color: #f59e0b;          /* $colors.warning.500 */
}

.progress__indicator--color-danger {
  background-color: #ef4444;          /* $colors.error.500 */
}

/* Striped Pattern */
.progress__indicator--striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  animation: progressStripes 1s linear infinite;
}

/* Indeterminate */
.progress__indicator--indeterminate {
  width: 40% !important;
  animation: progressIndeterminate 1.5s ease-in-out infinite;
}

/* Animations */
@keyframes progressStripes {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}

@keyframes progressIndeterminate {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(250%);
  }
  100% {
    transform: translateX(-100%);
  }
}
```

### React Implementation

```typescript
// Progress.tsx
import React from 'react';
import './Progress.css';

interface ProgressProps {
  value?: number;
  minValue?: number;
  maxValue?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  isStriped?: boolean;
  isIndeterminate?: boolean;
  label?: string;
  showValueLabel?: boolean;
  valueLabel?: string;
  formatOptions?: Intl.NumberFormatOptions;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  classNames?: {
    base?: string;
    labelWrapper?: string;
    label?: string;
    value?: string;
    track?: string;
    indicator?: string;
  };
}

export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  minValue = 0,
  maxValue = 100,
  size = 'md',
  color = 'primary',
  isStriped = false,
  isIndeterminate = false,
  label,
  showValueLabel = false,
  valueLabel,
  formatOptions,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className = '',
  classNames = {},
}) => {
  // Calculate percentage
  const percentage = isIndeterminate
    ? 100
    : Math.min(Math.max(((value - minValue) / (maxValue - minValue)) * 100, 0), 100);

  // Format value for display
  const getFormattedValue = () => {
    if (valueLabel) return valueLabel;
    
    if (formatOptions) {
      return new Intl.NumberFormat(undefined, formatOptions).format(value);
    }
    
    return `${Math.round(percentage)}%`;
  };

  const baseClasses = [
    'progress',
    `progress--size-${size}`,
    className,
    classNames.base,
  ]
    .filter(Boolean)
    .join(' ');

  const indicatorClasses = [
    'progress__indicator',
    `progress__indicator--color-${color}`,
    isStriped && 'progress__indicator--striped',
    isIndeterminate && 'progress__indicator--indeterminate',
    classNames.indicator,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={baseClasses}
      role="progressbar"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-valuenow={isIndeterminate ? undefined : value}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
    >
      {(label || showValueLabel) && (
        <div className={`progress__label-wrapper ${classNames.labelWrapper || ''}`}>
          {label && (
            <span className={`progress__label ${classNames.label || ''}`}>
              {label}
            </span>
          )}
          {showValueLabel && !isIndeterminate && (
            <span className={`progress__value ${classNames.value || ''}`}>
              {getFormattedValue()}
            </span>
          )}
        </div>
      )}
      
      <div className={`progress__track ${classNames.track || ''}`}>
        <div
          className={indicatorClasses}
          style={{
            width: isIndeterminate ? undefined : `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};
```

### Usage Examples

#### Example 1: Basic Progress

```typescript
import { Progress } from "@/components";

export default function BasicExample() {
  return (
    <Progress
      aria-label="Loading..."
      className="max-w-md"
      value={60}
    />
  );
}
```

#### Example 2: Different Sizes

```typescript
export default function SizesExample() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Progress aria-label="Loading..." size="sm" value={30} />
      <Progress aria-label="Loading..." size="md" value={40} />
      <Progress aria-label="Loading..." size="lg" value={50} />
    </div>
  );
}
```

#### Example 3: Color Variants

```typescript
export default function ColorsExample() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Progress aria-label="Loading..." color="default" value={70} />
      <Progress aria-label="Loading..." color="primary" value={70} />
      <Progress aria-label="Loading..." color="secondary" value={70} />
      <Progress aria-label="Loading..." color="success" value={70} />
      <Progress aria-label="Loading..." color="warning" value={70} />
      <Progress aria-label="Loading..." color="danger" value={70} />
    </div>
  );
}
```

#### Example 4: Striped Progress

```typescript
export default function StripedExample() {
  return (
    <Progress
      isStriped
      aria-label="Loading..."
      className="max-w-md"
      color="secondary"
      value={60}
    />
  );
}
```

#### Example 5: Animated Progress with Value Label

```typescript
import React from "react";
import { Progress } from "@/components";

export default function AnimatedExample() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress
      aria-label="Downloading..."
      className="max-w-md"
      color="success"
      showValueLabel={true}
      size="md"
      value={value}
    />
  );
}
```

#### Example 6: Custom Formatting (Currency)

```typescript
export default function CurrencyExample() {
  return (
    <Progress
      className="max-w-md"
      color="warning"
      formatOptions={{ style: "currency", currency: "ARS" }}
      label="Monthly expenses"
      maxValue={10000}
      showValueLabel={true}
      size="sm"
      value={4000}
    />
  );
}
```

#### Example 7: Indeterminate Progress

```typescript
export default function IndeterminateExample() {
  return (
    <Progress
      isIndeterminate
      aria-label="Loading..."
      className="max-w-md"
      color="primary"
    />
  );
}
```

---

## 2. Textarea Component

### Features
- **Auto-resize**: Grows/shrinks with content
- **Min/Max rows**: Control resize limits
- **4 Variants**: flat, faded, bordered, underlined
- **Label placement**: inside or outside
- **Validation**: Required, error states
- **Description & Error messages**
- **3 Size variants**: sm, md, lg

### Component Props

```typescript
interface TextareaProps {
  // Value
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  
  // Appearance
  variant?: 'flat' | 'faded' | 'bordered' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  
  // Label
  label?: string;
  labelPlacement?: 'inside' | 'outside';
  
  // Auto-resize
  minRows?: number;
  maxRows?: number;
  
  // Validation
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  description?: string;
  
  // Behavior
  isDisabled?: boolean;
  isReadOnly?: boolean;
  
  // Native props
  placeholder?: string;
  name?: string;
  id?: string;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    label?: string;
    textarea?: string;
    description?: string;
    errorMessage?: string;
  };
}
```

### CSS Implementation

```css
/* Textarea.css */

/* Base Container */
.textarea {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

/* Label */
.textarea__label {
  font-size: 14px;                    /* $fontSize.sm */
  font-weight: 500;                   /* $fontWeight.medium */
  color: #404040;                     /* $colors.neutral.700 */
  margin-bottom: 8px;                 /* $spacing.2 */
  display: block;
}

.textarea__label--outside {
  margin-bottom: 8px;
}

.textarea__label--inside {
  position: absolute;
  top: 12px;                          /* $spacing.3 */
  left: 12px;                         /* $spacing.3 */
  font-size: 12px;                    /* $fontSize.xs */
  color: #737373;                     /* $colors.neutral.500 */
  pointer-events: none;
  transition: all 150ms;
}

.textarea__label--required::after {
  content: " *";
  color: #ef4444;                     /* $colors.error.500 */
}

/* Textarea */
.textarea__input {
  width: 100%;
  padding: 12px;                      /* $spacing.3 */
  font-size: 16px;                    /* $fontSize.base */
  color: #171717;                     /* $colors.neutral.900 */
  background-color: #ffffff;          /* $colors.white */
  border: 2px solid #d4d4d4;          /* $colors.neutral.300 */
  border-radius: 8px;                 /* $borderRadius.md */
  outline: none;
  transition: all 150ms;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;                   /* $lineHeight.normal */
  min-height: 80px;
}

.textarea__input:focus {
  border-color: #3b82f6;              /* $colors.primary.500 */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.textarea__input::placeholder {
  color: #a3a3a3;                     /* $colors.neutral.400 */
}

/* Description */
.textarea__description {
  font-size: 12px;                    /* $fontSize.xs */
  color: #525252;                     /* $colors.neutral.600 */
  margin-top: 4px;                    /* $spacing.1 */
}

/* Error Message */
.textarea__error {
  font-size: 12px;                    /* $fontSize.xs */
  color: #ef4444;                     /* $colors.error.500 */
  margin-top: 4px;                    /* $spacing.1 */
}

/* Variant: Flat */
.textarea__input--variant-flat {
  background-color: #f5f5f5;          /* $colors.neutral.100 */
  border: none;
}

.textarea__input--variant-flat:hover {
  background-color: #e5e5e5;          /* $colors.neutral.200 */
}

/* Variant: Faded */
.textarea__input--variant-faded {
  background-color: #fafafa;          /* $colors.neutral.50 */
  border: 2px solid #e5e5e5;          /* $colors.neutral.200 */
}

.textarea__input--variant-faded:hover {
  border-color: #d4d4d4;              /* $colors.neutral.300 */
}

/* Variant: Bordered */
.textarea__input--variant-bordered {
  background-color: transparent;
  border: 2px solid #d4d4d4;          /* $colors.neutral.300 */
}

.textarea__input--variant-bordered:hover {
  border-color: #a3a3a3;              /* $colors.neutral.400 */
}

/* Variant: Underlined */
.textarea__input--variant-underlined {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #d4d4d4;   /* $colors.neutral.300 */
  border-radius: 0;
  padding-left: 0;
  padding-right: 0;
}

.textarea__input--variant-underlined:hover {
  border-bottom-color: #a3a3a3;       /* $colors.neutral.400 */
}

/* Size Variants */
.textarea__input--size-sm {
  padding: 8px;                       /* $spacing.2 */
  font-size: 14px;                    /* $fontSize.sm */
  min-height: 60px;
}

.textarea__input--size-md {
  padding: 12px;                      /* $spacing.3 */
  font-size: 16px;                    /* $fontSize.base */
  min-height: 80px;
}

.textarea__input--size-lg {
  padding: 16px;                      /* $spacing.4 */
  font-size: 18px;                    /* $fontSize.lg */
  min-height: 100px;
}

/* Invalid State */
.textarea__input--invalid {
  border-color: #ef4444;              /* $colors.error.500 */
}

.textarea__input--invalid:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Disabled State */
.textarea__input:disabled {
  background-color: #f5f5f5;          /* $colors.neutral.100 */
  color: #a3a3a3;                     /* $colors.neutral.400 */
  cursor: not-allowed;
  opacity: 0.6;
}

/* Auto-resize */
.textarea__input--auto-resize {
  resize: none;
  overflow: hidden;
}
```

### React Implementation

```typescript
// Textarea.tsx
import React, { useRef, useEffect, useState } from 'react';
import './Textarea.css';

interface TextareaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: 'flat' | 'faded' | 'bordered' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  labelPlacement?: 'inside' | 'outside';
  minRows?: number;
  maxRows?: number;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  description?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
  classNames?: {
    base?: string;
    label?: string;
    textarea?: string;
    description?: string;
    errorMessage?: string;
  };
}

export const Textarea: React.FC<TextareaProps> = ({
  value: controlledValue,
  defaultValue = '',
  onChange,
  variant = 'bordered',
  size = 'md',
  label,
  labelPlacement = 'outside',
  minRows,
  maxRows,
  isRequired = false,
  isInvalid = false,
  errorMessage,
  description,
  isDisabled = false,
  isReadOnly = false,
  placeholder,
  name,
  id,
  className = '',
  classNames = {},
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // Auto-resize functionality
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to get accurate scrollHeight
    textarea.style.height = 'auto';
    
    let newHeight = textarea.scrollHeight;

    // Apply minRows
    if (minRows) {
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const minHeight = lineHeight * minRows;
      newHeight = Math.max(newHeight, minHeight);
    }

    // Apply maxRows
    if (maxRows) {
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const maxHeight = lineHeight * maxRows;
      newHeight = Math.min(newHeight, maxHeight);
    }

    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [value, minRows, maxRows]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
    adjustHeight();
  };

  const baseClasses = [
    'textarea',
    className,
    classNames.base,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [
    'textarea__label',
    `textarea__label--${labelPlacement}`,
    isRequired && 'textarea__label--required',
    classNames.label,
  ]
    .filter(Boolean)
    .join(' ');

  const textareaClasses = [
    'textarea__input',
    `textarea__input--variant-${variant}`,
    `textarea__input--size-${size}`,
    (minRows || maxRows) && 'textarea__input--auto-resize',
    isInvalid && 'textarea__input--invalid',
    classNames.textarea,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={baseClasses}>
      {label && labelPlacement === 'outside' && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        {label && labelPlacement === 'inside' && (
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
        )}

        <textarea
          ref={textareaRef}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          className={textareaClasses}
          aria-invalid={isInvalid}
          aria-describedby={
            description || errorMessage
              ? `${id}-description ${id}-error`
              : undefined
          }
        />
      </div>

      {description && !isInvalid && (
        <span
          id={`${id}-description`}
          className={`textarea__description ${classNames.description || ''}`}
        >
          {description}
        </span>
      )}

      {isInvalid && errorMessage && (
        <span
          id={`${id}-error`}
          className={`textarea__error ${classNames.errorMessage || ''}`}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};
```

### Usage Examples

#### Example 1: Basic Textarea

```typescript
import { Textarea } from "@/components";

export default function BasicExample() {
  return (
    <Textarea
      className="max-w-xs"
      label="Description"
      placeholder="Enter your description"
    />
  );
}
```

#### Example 2: Auto-resize with Min/Max Rows

```typescript
export default function AutoResizeExample() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Textarea
        label="Description"
        placeholder="Enter your description (Default autosize)"
      />
      
      <Textarea
        label="Description"
        minRows={2}
        placeholder="Enter your description (Min rows 2)"
      />
      
      <Textarea
        label="Description"
        maxRows={3}
        placeholder="Enter your description (Max rows 3)"
      />
    </div>
  );
}
```

#### Example 3: Required with Label Outside

```typescript
export default function RequiredExample() {
  return (
    <Textarea
      isRequired
      className="max-w-xs"
      label="Description"
      labelPlacement="outside"
      placeholder="Enter your description"
    />
  );
}
```

#### Example 4: All Variants

```typescript
export default function VariantsExample() {
  const variants = ['flat', 'faded', 'bordered', 'underlined'] as const;

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      {variants.map((variant) => (
        <Textarea
          key={variant}
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
          variant={variant}
        />
      ))}
    </div>
  );
}
```

#### Example 5: With Validation

```typescript
export default function ValidationExample() {
  const [value, setValue] = useState('');
  const isInvalid = value.length > 0 && value.length < 10;

  return (
    <Textarea
      value={value}
      onChange={setValue}
      isInvalid={isInvalid}
      errorMessage={isInvalid ? "Description must be at least 10 characters" : undefined}
      label="Description"
      placeholder="Enter your description"
      className="max-w-xs"
    />
  );
}
```

---

## Design System Integration

### Token Usage

| Component | Key Tokens |
|-----------|-----------|
| **Progress** | `$colors` (all), `$borderRadius.full`, `$fontSize.sm/base`, `$spacing.1/2` |
| **Textarea** | `$colors`, `$borderRadius.md`, `$fontSize.sm/base/lg`, `$spacing.2/3/4`, `$lineHeight.normal` |

### Accessibility Checklist

**Progress:**
- [x] ARIA role="progressbar"
- [x] aria-valuenow, aria-valuemin, aria-valuemax
- [x] aria-label or aria-labelledby
- [x] Visual indication of progress

**Textarea:**
- [x] Label association (htmlFor/id)
- [x] Required indicator (visual + required attribute)
- [x] Error messaging (aria-invalid, aria-describedby)
- [x] Keyboard accessible
- [x] Disabled state clear

---

## Summary

✅ **Progress**: Determinate/indeterminate with 6 colors, striped animation, custom formatting  
✅ **Textarea**: Auto-resize with min/max rows, 4 variants, validation support  

Both components fully integrated with design system tokens!
