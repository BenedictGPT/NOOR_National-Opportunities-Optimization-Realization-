'use client';

import React, { useState } from 'react';

export interface CheckboxProps {
  // Value
  isSelected?: boolean;
  defaultSelected?: boolean;
  onChange?: (isSelected: boolean) => void;
  
  // Appearance
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  
  // Label
  children?: React.ReactNode;
  
  // States
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    wrapper?: string;
    icon?: string;
    label?: string;
  };
  
  // Accessibility
  'aria-label'?: string;
  name?: string;
  value?: string;
  id?: string;
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

// Color mapping for Federal theme
const colorClasses = {
  default: 'border-gray-300 checked:bg-gray-600 checked:border-gray-600',
  primary: 'border-institutional-blue/30 checked:bg-institutional-blue checked:border-institutional-blue',
  secondary: 'border-institutional-silver/30 checked:bg-institutional-silver checked:border-institutional-silver',
  success: 'border-green-300 checked:bg-green-600 checked:border-green-600',
  warning: 'border-yellow-300 checked:bg-yellow-600 checked:border-yellow-600',
  danger: 'border-red-300 checked:bg-red-600 checked:border-red-600',
};

export const Checkbox: React.FC<CheckboxProps> = ({
  isSelected,
  defaultSelected = false,
  onChange,
  size = 'md',
  color = 'primary',
  children,
  isDisabled = false,
  isIndeterminate = false,
  isRequired = false,
  isInvalid = false,
  className = '',
  classNames = {},
  'aria-label': ariaLabel,
  name,
  value,
  id,
}) => {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const checked = isSelected !== undefined ? isSelected : internalSelected;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    
    const newValue = e.target.checked;
    if (isSelected === undefined) {
      setInternalSelected(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <label
      className={`
        inline-flex items-center gap-2 cursor-pointer
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
        ${classNames.base || ''}
      `}
    >
      <div className={`relative ${classNames.wrapper || ''}`}>
        {/* Hidden native checkbox */}
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={isDisabled}
          required={isRequired}
          aria-label={ariaLabel}
          aria-invalid={isInvalid}
          className="sr-only peer"
        />

        {/* Custom checkbox */}
        <div
          className={`
            flex items-center justify-center
            border-2 rounded
            transition-all duration-200
            ${sizeClasses[size]}
            ${colorClasses[color]}
            ${isInvalid ? 'border-red-500' : ''}
            ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-opacity-50
            ${color === 'primary' ? 'peer-focus:ring-institutional-blue' : ''}
            ${color === 'secondary' ? 'peer-focus:ring-institutional-silver' : ''}
            ${classNames.icon || ''}
          `}
        >
          {/* Checkmark icon */}
          {checked && !isIndeterminate && (
            <svg
              className="w-full h-full text-white p-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}

          {/* Indeterminate icon */}
          {isIndeterminate && (
            <svg
              className="w-full h-full text-white p-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="6" y="11" width="12" height="2" rx="1" />
            </svg>
          )}
        </div>
      </div>

      {/* Label */}
      {children && (
        <span className={`${labelSizeClasses[size]} text-gray-700 select-none ${classNames.label || ''}`}>
          {children}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </span>
      )}
    </label>
  );
};

export default Checkbox;

