'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface SelectProps {
  // Options
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  
  // Appearance
  size?: 'sm' | 'md' | 'lg';
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  
  // Label & Description
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  
  // States
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    label?: string;
    trigger?: string;
    value?: string;
    listbox?: string;
    option?: string;
  };
  
  // Accessibility
  'aria-label'?: string;
  name?: string;
  id?: string;
}

// Size mapping
const sizeClasses = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg',
};

// Variant mapping
const variantClasses = {
  flat: 'bg-gray-100 border-transparent',
  bordered: 'bg-transparent border-gray-300',
  faded: 'bg-gray-50 border-gray-200',
  underlined: 'bg-transparent border-b-2 border-gray-300 rounded-none',
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

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  size = 'md',
  variant = 'bordered',
  color = 'primary',
  label,
  placeholder = 'Select an option',
  description,
  errorMessage,
  isDisabled = false,
  isRequired = false,
  isInvalid = false,
  className = '',
  classNames = {},
  'aria-label': ariaLabel,
  name,
  id,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find(opt => opt.value === currentValue);

  // Handle value change
  const handleSelect = (optionValue: string) => {
    if (value === undefined) {
      setInternalValue(optionValue);
    }
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0) {
          const option = options[focusedIndex];
          if (!option.disabled) {
            handleSelect(option.value);
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => {
            let next = prev + 1;
            while (next < options.length && options[next].disabled) {
              next++;
            }
            return next < options.length ? next : prev;
          });
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => {
            let next = prev - 1;
            while (next >= 0 && options[next].disabled) {
              next--;
            }
            return next >= 0 ? next : prev;
          });
        }
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listboxRef.current) {
      const focusedElement = listboxRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, isOpen]);

  return (
    <div
      ref={selectRef}
      className={`relative w-full ${className} ${classNames.base || ''}`}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 mb-1.5 ${classNames.label || ''}`}
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select Trigger */}
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel || label}
        aria-invalid={isInvalid}
        aria-required={isRequired}
        tabIndex={isDisabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        className={`
          relative w-full px-3 flex items-center justify-between
          border rounded-lg cursor-pointer
          transition-all duration-200
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${isInvalid ? 'border-red-500' : colorClasses[color]}
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}
          ${isOpen ? 'ring-2 ring-opacity-20' : ''}
          ${classNames.trigger || ''}
        `}
      >
        <span className={`flex-1 truncate ${!selectedOption ? 'text-gray-400' : 'text-gray-900'} ${classNames.value || ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        {/* Chevron Icon */}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          ref={listboxRef}
          role="listbox"
          aria-label={ariaLabel || label}
          className={`
            absolute z-50 w-full mt-1
            bg-white border border-gray-200 rounded-lg shadow-lg
            max-h-60 overflow-auto
            py-1
            ${classNames.listbox || ''}
          `}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === currentValue}
              aria-disabled={option.disabled}
              onClick={() => !option.disabled && handleSelect(option.value)}
              onMouseEnter={() => !option.disabled && setFocusedIndex(index)}
              className={`
                px-3 py-2 cursor-pointer
                transition-colors duration-150
                ${option.value === currentValue ? 'bg-federal-gold/10 text-federal-gold font-medium' : 'text-gray-900'}
                ${focusedIndex === index ? 'bg-gray-100' : ''}
                ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
                ${classNames.option || ''}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm">{option.label}</div>
                  {option.description && (
                    <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                  )}
                </div>
                {option.value === currentValue && (
                  <svg className="w-5 h-5 text-federal-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Description */}
      {description && !isInvalid && (
        <p className="mt-1.5 text-xs text-gray-500">{description}</p>
      )}

      {/* Error Message */}
      {isInvalid && errorMessage && (
        <p className="mt-1.5 text-xs text-red-500">{errorMessage}</p>
      )}

      {/* Hidden native select for form submission */}
      <select
        name={name}
        id={id}
        value={currentValue}
        onChange={(e) => handleSelect(e.target.value)}
        disabled={isDisabled}
        required={isRequired}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

