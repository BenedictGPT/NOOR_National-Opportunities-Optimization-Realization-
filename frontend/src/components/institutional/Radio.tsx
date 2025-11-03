'use client';

import React, { useState, createContext, useContext } from 'react';

// Radio Group Context
interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  color?: string;
  size?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

// Radio Group Props
export interface RadioGroupProps {
  // Value
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  
  // Appearance
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  
  // Label
  label?: string;
  description?: string;
  errorMessage?: string;
  
  // States
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  
  // Content
  children: React.ReactNode;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    wrapper?: string;
    label?: string;
  };
  
  // Accessibility
  name: string;
}

// Radio Props
export interface RadioProps {
  // Value
  value: string;
  
  // Appearance
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  
  // Label
  children?: React.ReactNode;
  description?: string;
  
  // States
  isDisabled?: boolean;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    wrapper?: string;
    control?: string;
    label?: string;
    description?: string;
  };
}

// Size mapping
const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const labelSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const dotSizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

// Color mapping for Federal theme
const colorClasses = {
  default: 'border-gray-300 checked:border-gray-600',
  primary: 'border-institutional-blue/30 checked:border-institutional-blue',
  secondary: 'border-institutional-silver/30 checked:border-institutional-silver',
  success: 'border-green-300 checked:border-green-600',
  warning: 'border-yellow-300 checked:border-yellow-600',
  danger: 'border-red-300 checked:border-red-600',
};

const dotColorClasses = {
  default: 'bg-gray-600',
  primary: 'bg-institutional-blue',
  secondary: 'bg-institutional-silver',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  danger: 'bg-red-600',
};

// Radio Group Component
export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  defaultValue,
  onChange,
  orientation = 'vertical',
  size = 'md',
  color = 'primary',
  label,
  description,
  errorMessage,
  isDisabled = false,
  isRequired = false,
  isInvalid = false,
  children,
  className = '',
  classNames = {},
  name,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`${className} ${classNames.base || ''}`}>
      {/* Label */}
      {label && (
        <label className={`block text-sm font-medium text-gray-700 mb-2 ${classNames.label || ''}`}>
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Radio buttons */}
      <RadioGroupContext.Provider
        value={{
          name,
          value: currentValue,
          onChange: handleChange,
          isDisabled,
          color,
          size,
        }}
      >
        <div
          role="radiogroup"
          aria-label={label}
          aria-required={isRequired}
          aria-invalid={isInvalid}
          className={`
            flex gap-4
            ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}
            ${classNames.wrapper || ''}
          `}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>

      {/* Description */}
      {description && !isInvalid && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}

      {/* Error Message */}
      {isInvalid && errorMessage && (
        <p className="mt-2 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

// Radio Component
export const Radio: React.FC<RadioProps> = ({
  value,
  size: propSize,
  color: propColor,
  children,
  description,
  isDisabled: propDisabled,
  className = '',
  classNames = {},
}) => {
  const context = useContext(RadioGroupContext);
  
  if (!context) {
    throw new Error('Radio must be used within RadioGroup');
  }

  const { name, value: groupValue, onChange, isDisabled: groupDisabled, color: groupColor, size: groupSize } = context;
  
  const size = propSize || groupSize || 'md';
  const color = propColor || groupColor || 'primary';
  const isDisabled = propDisabled || groupDisabled || false;
  const isChecked = value === groupValue;

  const handleChange = () => {
    if (!isDisabled && onChange) {
      onChange(value);
    }
  };

  return (
    <label
      className={`
        inline-flex items-start gap-2 cursor-pointer
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
        ${classNames.base || ''}
      `}
    >
      <div className={`relative flex-shrink-0 mt-0.5 ${classNames.wrapper || ''}`}>
        {/* Hidden native radio */}
        <input
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          disabled={isDisabled}
          className="sr-only peer"
        />

        {/* Custom radio */}
        <div
          className={`
            flex items-center justify-center
            border-2 rounded-full
            transition-all duration-200
            ${sizeClasses[size]}
            ${colorClasses[color]}
            ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-opacity-50
            ${color === 'primary' ? 'peer-focus:ring-institutional-blue' : ''}
            ${color === 'secondary' ? 'peer-focus:ring-institutional-silver' : ''}
            ${classNames.control || ''}
          `}
        >
          {/* Radio dot */}
          {isChecked && (
            <div
              className={`
                rounded-full transition-all duration-200
                ${dotSizeClasses[size]}
                ${dotColorClasses[color]}
              `}
            />
          )}
        </div>
      </div>

      {/* Label and description */}
      {(children || description) && (
        <div className="flex-1">
          {children && (
            <span className={`${labelSizeClasses[size]} text-gray-700 select-none ${classNames.label || ''}`}>
              {children}
            </span>
          )}
          {description && (
            <p className={`text-xs text-gray-500 mt-0.5 ${classNames.description || ''}`}>
              {description}
            </p>
          )}
        </div>
      )}
    </label>
  );
};

export default RadioGroup;

