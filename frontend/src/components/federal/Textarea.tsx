'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface TextareaProps {
  // Value
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  
  // Appearance
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  
  // Label & Description
  label?: string;
  labelPlacement?: 'inside' | 'outside';
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  
  // Auto-resize
  minRows?: number;
  maxRows?: number;
  disableAutosize?: boolean;
  
  // States
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  
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
  
  // Native props
  name?: string;
  id?: string;
  rows?: number;
  maxLength?: number;
  'aria-label'?: string;
}

// Variant mapping
const variantClasses = {
  flat: 'bg-gray-100 border-transparent',
  bordered: 'bg-transparent border-gray-300',
  faded: 'bg-gray-50 border-gray-200',
  underlined: 'bg-transparent border-b-2 border-gray-300 rounded-none',
};

// Size mapping
const sizeClasses = {
  sm: 'text-sm px-3 py-2',
  md: 'text-base px-3 py-2.5',
  lg: 'text-lg px-4 py-3',
};

// Color mapping for Federal theme
const colorClasses = {
  default: 'focus:border-gray-400 focus:ring-gray-400',
  primary: 'focus:border-federal-gold focus:ring-federal-gold',
  secondary: 'focus:border-federal-navy focus:ring-federal-navy',
  success: 'focus:border-green-500 focus:ring-green-500',
  warning: 'focus:border-yellow-500 focus:ring-yellow-500',
  danger: 'focus:border-red-500 focus:ring-red-500',
};

export const Textarea: React.FC<TextareaProps> = ({
  value,
  defaultValue = '',
  onChange,
  variant = 'bordered',
  size = 'md',
  color = 'primary',
  label,
  labelPlacement = 'outside',
  placeholder,
  description,
  errorMessage,
  minRows = 3,
  maxRows,
  disableAutosize = false,
  isDisabled = false,
  isRequired = false,
  isInvalid = false,
  isReadOnly = false,
  className = '',
  classNames = {},
  name,
  id,
  rows,
  maxLength,
  'aria-label': ariaLabel,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentValue = value !== undefined ? value : internalValue;

  // Auto-resize functionality
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea || disableAutosize) return;

    // Reset height to calculate new height
    textarea.style.height = 'auto';
    
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const minHeight = lineHeight * minRows;
    const maxHeight = maxRows ? lineHeight * maxRows : Infinity;
    
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [currentValue, minRows, maxRows]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
    
    adjustHeight();
  };

  const showLabel = label && labelPlacement === 'outside';
  const showInsideLabel = label && labelPlacement === 'inside' && !currentValue;

  return (
    <div className={`w-full ${className} ${classNames.base || ''}`}>
      {/* Outside Label */}
      {showLabel && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 mb-1.5 ${classNames.label || ''}`}
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Textarea Wrapper */}
      <div className={`relative ${classNames.inputWrapper || ''}`}>
        {/* Inside Label */}
        {showInsideLabel && (
          <label
            htmlFor={id}
            className="absolute left-3 top-2.5 text-gray-400 text-sm pointer-events-none transition-all"
          >
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id={id}
          name={name}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          rows={rows || minRows}
          maxLength={maxLength}
          aria-label={ariaLabel || label}
          aria-invalid={isInvalid}
          aria-required={isRequired}
          className={`
            w-full resize-none
            border rounded-lg
            transition-all duration-200
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${isInvalid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : colorClasses[color]}
            ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
            ${isReadOnly ? 'cursor-default' : ''}
            focus:outline-none focus:ring-2 focus:ring-opacity-20
            ${labelPlacement === 'inside' && currentValue ? 'pt-6' : ''}
            ${classNames.input || ''}
          `}
          style={{
            overflow: maxRows && !disableAutosize ? 'auto' : 'hidden',
          }}
        />

        {/* Character Count */}
        {maxLength && (
          <div className="absolute right-3 bottom-2 text-xs text-gray-400">
            {currentValue.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Description */}
      {description && !isInvalid && (
        <p className={`mt-1.5 text-xs text-gray-500 ${classNames.description || ''}`}>
          {description}
        </p>
      )}

      {/* Error Message */}
      {isInvalid && errorMessage && (
        <p className={`mt-1.5 text-xs text-red-500 ${classNames.errorMessage || ''}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Textarea;

