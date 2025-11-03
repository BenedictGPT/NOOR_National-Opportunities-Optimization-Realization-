# NumberInput Component - Implementation Guide

## Overview
Complete implementation guide for the NumberInput component with step controls, min/max validation, and locale-aware formatting.

---

## NumberInput Component

### Features
- **Step controls**: Increment/decrement buttons
- **4 Variants**: flat, bordered, faded, underlined
- **3 Sizes**: sm, md, lg
- **Min/Max validation**: Enforce numeric boundaries
- **Format options**: Currency, percentage, decimal places
- **Keyboard support**: Arrow keys for increment/decrement
- **Locale-aware**: Number formatting based on locale
- **Disabled/ReadOnly states**: Full state management

### Component Props

```typescript
interface NumberInputProps {
  // Value
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  
  // Constraints
  min?: number;
  max?: number;
  step?: number;
  
  // Appearance
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  
  // Label & Placeholder
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  
  // Format
  formatOptions?: Intl.NumberFormatOptions;
  // Example: { style: 'currency', currency: 'USD' }
  // Example: { style: 'percent' }
  // Example: { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  
  // Behavior
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  
  // Events
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    label?: string;
    inputWrapper?: string;
    input?: string;
    description?: string;
    errorMessage?: string;
  };
  
  // Accessibility
  'aria-label'?: string;
}
```

### CSS Implementation

```css
/* NumberInput.css */

/* Container */
.number-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

/* Label */
.number-input__label {
  font-size: 14px;                    /* $fontSize.sm */
  font-weight: 500;                   /* $fontWeight.medium */
  color: #404040;                     /* $colors.neutral.700 */
  margin-bottom: 8px;                 /* $spacing.2 */
  display: block;
}

.number-input__label--required::after {
  content: " *";
  color: #ef4444;                     /* $colors.error.500 */
}

/* Input Wrapper */
.number-input__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

/* Input */
.number-input__input {
  width: 100%;
  padding: 8px 12px;                  /* $spacing.2 $spacing.3 */
  padding-right: 48px;                /* $spacing.12 - space for steppers */
  font-size: 16px;                    /* $fontSize.base */
  color: #171717;                     /* $colors.neutral.900 */
  background-color: #ffffff;          /* $colors.white */
  border: 2px solid #d4d4d4;          /* $colors.neutral.300 */
  border-radius: 8px;                 /* $borderRadius.md */
  outline: none;
  transition: all 150ms;              /* $transitions.fast */
  
  /* Remove default number input arrows */
  -moz-appearance: textfield;
  appearance: none;
}

.number-input__input::-webkit-outer-spin-button,
.number-input__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-input__input:focus {
  border-color: #3b82f6;              /* $colors.primary.500 */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.number-input__input::placeholder {
  color: #a3a3a3;                     /* $colors.neutral.400 */
}

/* Stepper Container */
.number-input__stepper-container {
  position: absolute;
  right: 4px;                         /* $spacing.1 */
  display: flex;
  flex-direction: column;
  gap: 1px;
}

/* Step Buttons */
.number-input__step-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 18px;
  background-color: transparent;
  border: none;
  border-radius: 4px;                 /* $borderRadius.sm */
  color: #525252;                     /* $colors.neutral.600 */
  cursor: pointer;
  transition: all 150ms;
  font-size: 12px;                    /* $fontSize.xs */
  user-select: none;
}

.number-input__step-button:hover {
  background-color: #f5f5f5;          /* $colors.neutral.100 */
  color: #171717;                     /* $colors.neutral.900 */
}

.number-input__step-button:active {
  transform: scale(0.95);
}

.number-input__step-button--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

/* Step Button Icons */
.number-input__step-icon {
  width: 12px;
  height: 12px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

/* Description */
.number-input__description {
  font-size: 12px;                    /* $fontSize.xs */
  color: #525252;                     /* $colors.neutral.600 */
  margin-top: 4px;                    /* $spacing.1 */
}

/* Error Message */
.number-input__error-message {
  font-size: 12px;                    /* $fontSize.xs */
  color: #ef4444;                     /* $colors.error.500 */
  margin-top: 4px;                    /* $spacing.1 */
}

/* Variants */
.number-input__input--variant-flat {
  background-color: #f5f5f5;          /* $colors.neutral.100 */
  border: none;
}

.number-input__input--variant-flat:focus {
  border: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.number-input__input--variant-faded {
  background-color: #fafafa;          /* $colors.neutral.50 */
  border: 2px solid #e5e5e5;          /* $colors.neutral.200 */
}

.number-input__input--variant-bordered {
  background-color: transparent;
  border: 2px solid #d4d4d4;          /* $colors.neutral.300 */
}

.number-input__input--variant-underlined {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #d4d4d4;
  border-radius: 0;
  padding-left: 0;
}

.number-input__input--variant-underlined:focus {
  border: none;
  border-bottom: 2px solid #3b82f6;
  box-shadow: none;
}

.number-input--variant-underlined .number-input__stepper-container {
  right: 0;
}

/* Sizes */
.number-input__input--size-sm {
  padding: 4px 8px;                   /* $spacing.1 $spacing.2 */
  padding-right: 40px;                /* $spacing.10 */
  font-size: 14px;                    /* $fontSize.sm */
  min-height: 32px;
}

.number-input--size-sm .number-input__step-button {
  width: 20px;
  height: 16px;
  font-size: 10px;
}

.number-input__input--size-md {
  padding: 8px 12px;                  /* $spacing.2 $spacing.3 */
  padding-right: 48px;                /* $spacing.12 */
  font-size: 16px;                    /* $fontSize.base */
  min-height: 40px;
}

.number-input--size-md .number-input__step-button {
  width: 24px;
  height: 18px;
  font-size: 12px;
}

.number-input__input--size-lg {
  padding: 12px 16px;                 /* $spacing.3 $spacing.4 */
  padding-right: 56px;                /* $spacing.14 */
  font-size: 18px;                    /* $fontSize.lg */
  min-height: 48px;
}

.number-input--size-lg .number-input__step-button {
  width: 28px;
  height: 22px;
  font-size: 14px;
}

/* States */
.number-input__input--disabled {
  background-color: #f5f5f5;          /* $colors.neutral.100 */
  color: #a3a3a3;                     /* $colors.neutral.400 */
  cursor: not-allowed;
  opacity: 0.6;
}

.number-input--disabled .number-input__step-button {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.number-input__input--invalid {
  border-color: #ef4444;              /* $colors.error.500 */
}

.number-input__input--invalid:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.number-input__input--read-only {
  background-color: #fafafa;          /* $colors.neutral.50 */
  cursor: default;
}

.number-input--read-only .number-input__stepper-container {
  display: none;
}
```

### React Implementation

```typescript
// NumberInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import './NumberInput.css';

const ChevronUpIcon = () => (
  <svg className="number-input__step-icon" viewBox="0 0 24 24">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="number-input__step-icon" viewBox="0 0 24 24">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const NumberInput: React.FC<NumberInputProps> = ({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  variant = 'bordered',
  size = 'md',
  label,
  placeholder,
  description,
  errorMessage,
  formatOptions,
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  isInvalid = false,
  onFocus,
  onBlur,
  className = '',
  classNames = {},
  'aria-label': ariaLabel,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Format number for display
  const formatNumber = (num: number): string => {
    if (formatOptions) {
      return new Intl.NumberFormat(undefined, formatOptions).format(num);
    }
    return num.toString();
  };

  // Parse formatted string back to number
  const parseNumber = (str: string): number => {
    const cleaned = str.replace(/[^\d.-]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const updateValue = (newValue: number) => {
    // Apply min/max constraints
    let constrainedValue = newValue;
    if (min !== undefined && constrainedValue < min) constrainedValue = min;
    if (max !== undefined && constrainedValue > max) constrainedValue = max;

    if (!isControlled) {
      setInternalValue(constrainedValue);
    }
    onChange?.(constrainedValue);
  };

  const increment = () => {
    const newValue = value + step;
    if (max === undefined || newValue <= max) {
      updateValue(newValue);
    }
  };

  const decrement = () => {
    const newValue = value - step;
    if (min === undefined || newValue >= min) {
      updateValue(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseNumber(e.target.value);
    updateValue(parsed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isReadOnly || isDisabled) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      increment();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      decrement();
    }
  };

  const isIncrementDisabled = max !== undefined && value >= max;
  const isDecrementDisabled = min !== undefined && value <= min;

  const containerClasses = [
    'number-input',
    `number-input--size-${size}`,
    `number-input--variant-${variant}`,
    isDisabled && 'number-input--disabled',
    isReadOnly && 'number-input--read-only',
    className,
    classNames.base,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'number-input__input',
    `number-input__input--variant-${variant}`,
    `number-input__input--size-${size}`,
    isDisabled && 'number-input__input--disabled',
    isReadOnly && 'number-input__input--read-only',
    isInvalid && 'number-input__input--invalid',
    classNames.input,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label
          className={`number-input__label ${isRequired ? 'number-input__label--required' : ''} ${classNames.label || ''}`}
          htmlFor="number-input"
        >
          {label}
        </label>
      )}

      <div className={`number-input__input-wrapper ${classNames.inputWrapper || ''}`}>
        <input
          ref={inputRef}
          id="number-input"
          type="text"
          className={inputClasses}
          value={formatNumber(value)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          aria-label={ariaLabel || label}
          aria-invalid={isInvalid}
          aria-describedby={
            description ? 'number-input-description' : 
            errorMessage ? 'number-input-error' : 
            undefined
          }
        />

        {!isReadOnly && (
          <div className="number-input__stepper-container">
            <button
              type="button"
              className={`number-input__step-button ${isIncrementDisabled || isDisabled ? 'number-input__step-button--disabled' : ''}`}
              onClick={increment}
              disabled={isIncrementDisabled || isDisabled}
              aria-label="Increment"
              tabIndex={-1}
            >
              <ChevronUpIcon />
            </button>
            <button
              type="button"
              className={`number-input__step-button ${isDecrementDisabled || isDisabled ? 'number-input__step-button--disabled' : ''}`}
              onClick={decrement}
              disabled={isDecrementDisabled || isDisabled}
              aria-label="Decrement"
              tabIndex={-1}
            >
              <ChevronDownIcon />
            </button>
          </div>
        )}
      </div>

      {description && !errorMessage && (
        <p
          id="number-input-description"
          className={`number-input__description ${classNames.description || ''}`}
        >
          {description}
        </p>
      )}

      {errorMessage && (
        <p
          id="number-input-error"
          className={`number-input__error-message ${classNames.errorMessage || ''}`}
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};
```

### Usage Examples

#### Example 1: Basic NumberInput

```typescript
import { NumberInput } from "@/components";

export default function BasicExample() {
  return (
    <NumberInput
      className="max-w-xs"
      placeholder="Enter the amount"
    />
  );
}
```

#### Example 2: With Label and Constraints

```typescript
export default function ConstrainedExample() {
  const [value, setValue] = useState(5);

  return (
    <NumberInput
      label="Quantity"
      value={value}
      onChange={setValue}
      min={1}
      max={10}
      step={1}
      description="Select between 1 and 10 items"
    />
  );
}
```

#### Example 3: Currency Format

```typescript
export default function CurrencyExample() {
  const [amount, setAmount] = useState(99.99);

  return (
    <NumberInput
      label="Price"
      value={amount}
      onChange={setAmount}
      formatOptions={{
        style: 'currency',
        currency: 'USD',
      }}
      step={0.01}
      min={0}
    />
  );
}
```

#### Example 4: Percentage Format

```typescript
export default function PercentageExample() {
  const [percent, setPercent] = useState(0.25);

  return (
    <NumberInput
      label="Discount"
      value={percent}
      onChange={setPercent}
      formatOptions={{
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }}
      step={0.05}
      min={0}
      max={1}
    />
  );
}
```

#### Example 5: All Sizes

```typescript
export default function SizesExample() {
  const sizes = ["sm", "md", "lg"];

  return (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <NumberInput
          key={size}
          label="Amount"
          placeholder="Enter the amount"
          size={size}
        />
      ))}
    </div>
  );
}
```

#### Example 6: All Variants

```typescript
export default function VariantsExample() {
  const variants = ["flat", "bordered", "underlined", "faded"];

  return (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex gap-4">
          <NumberInput
            label="Amount"
            variant={variant}
          />
          <NumberInput
            label="Amount"
            placeholder="Enter the amount"
            variant={variant}
          />
        </div>
      ))}
    </div>
  );
}
```

#### Example 7: With Validation

```typescript
export default function ValidationExample() {
  const [value, setValue] = useState(15);
  const isInvalid = value > 10;

  return (
    <NumberInput
      label="Maximum 10 items"
      value={value}
      onChange={setValue}
      isInvalid={isInvalid}
      errorMessage={isInvalid ? "Value exceeds maximum of 10" : ""}
      max={10}
    />
  );
}
```

#### Example 8: Disabled and ReadOnly States

```typescript
export default function StatesExample() {
  return (
    <div className="flex flex-col gap-4">
      <NumberInput
        label="Disabled"
        defaultValue={5}
        isDisabled
      />
      <NumberInput
        label="Read Only"
        defaultValue={10}
        isReadOnly
      />
    </div>
  );
}
```

---

## Design System Integration

### Token Usage

| Element | Design Token | Value |
|---------|--------------|-------|
| Input background | `$colors.white` | #ffffff |
| Input border | `$colors.neutral.300` | #d4d4d4 |
| Input border radius | `$borderRadius.md` | 8px |
| Input focus color | `$colors.primary.500` | #3b82f6 |
| Step button hover | `$colors.neutral.100` | #f5f5f5 |
| Error color | `$colors.error.500` | #ef4444 |

### Accessibility Checklist

- [x] ARIA labels for increment/decrement buttons
- [x] aria-invalid for error state
- [x] aria-describedby for descriptions/errors
- [x] Keyboard navigation (Arrow up/down)
- [x] Focus management
- [x] Required field indication
- [x] Screen reader announcements
- [x] Disabled state handling

---

## Advanced Features

### Format Options

The `formatOptions` prop accepts any valid `Intl.NumberFormatOptions`:

```typescript
// Currency
formatOptions={{ style: 'currency', currency: 'USD' }}

// Percentage
formatOptions={{ style: 'percent' }}

// Decimal places
formatOptions={{ 
  minimumFractionDigits: 2, 
  maximumFractionDigits: 2 
}}

// Units
formatOptions={{ 
  style: 'unit', 
  unit: 'kilometer' 
}}

// Compact notation
formatOptions={{ 
  notation: 'compact', 
  compactDisplay: 'short' 
}}
```

### Keyboard Shortcuts

- **Arrow Up**: Increment by step
- **Arrow Down**: Decrement by step
- **Tab**: Navigate to next field
- **Enter**: Submit (if in form)

---

## Summary

✅ **NumberInput**: Complete numeric input with step controls  
✅ **4 Variants**: flat, bordered, faded, underlined  
✅ **3 Sizes**: sm, md, lg  
✅ **Format Support**: Currency, percentage, decimal, units  
✅ **Min/Max Validation**: Enforce numeric boundaries  
✅ **Keyboard Navigation**: Arrow keys for increment/decrement  
✅ **Full Accessibility**: ARIA compliant with screen reader support  

The NumberInput component completes your form input collection!
