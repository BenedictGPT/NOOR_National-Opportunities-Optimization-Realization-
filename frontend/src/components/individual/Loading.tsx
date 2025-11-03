'use client';

import React from 'react';

export interface LoadingProps {
  // Appearance
  type?: 'spinner' | 'dots' | 'bar';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white';
  
  // Label
  label?: string;
  labelPosition?: 'bottom' | 'right';
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    spinner?: string;
    label?: string;
  };
}

// Size mapping
const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const dotSizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2.5 h-2.5',
  lg: 'w-4 h-4',
};

const barSizeClasses = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
};

// Color mapping for Federal theme
const colorClasses = {
  default: 'text-gray-600',
  primary: 'text-individual-red',
  secondary: 'text-individual-beige',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600',
  white: 'text-white',
};

const dotColorClasses = {
  default: 'bg-gray-600',
  primary: 'bg-individual-red',
  secondary: 'bg-individual-beige',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  danger: 'bg-red-600',
  white: 'bg-white',
};

export const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  size = 'md',
  color = 'primary',
  label,
  labelPosition = 'bottom',
  className = '',
  classNames = {},
}) => {
  // Spinner type
  if (type === 'spinner') {
    return (
      <div
        className={`
          inline-flex items-center gap-3
          ${labelPosition === 'bottom' ? 'flex-col' : 'flex-row'}
          ${className}
          ${classNames.base || ''}
        `}
      >
        <svg
          className={`
            animate-spin
            ${sizeClasses[size]}
            ${colorClasses[color]}
            ${classNames.spinner || ''}
          `}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {label && (
          <span className={`text-sm text-gray-600 ${classNames.label || ''}`}>
            {label}
          </span>
        )}
      </div>
    );
  }

  // Dots type
  if (type === 'dots') {
    return (
      <div
        className={`
          inline-flex items-center gap-3
          ${labelPosition === 'bottom' ? 'flex-col' : 'flex-row'}
          ${className}
          ${classNames.base || ''}
        `}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`
                rounded-full
                ${dotSizeClasses[size]}
                ${dotColorClasses[color]}
                animate-pulse
              `}
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
            />
          ))}
        </div>
        {label && (
          <span className={`text-sm text-gray-600 ${classNames.label || ''}`}>
            {label}
          </span>
        )}
      </div>
    );
  }

  // Bar type
  if (type === 'bar') {
    return (
      <div className={`w-full ${className} ${classNames.base || ''}`}>
        <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${barSizeClasses[size]}`}>
          <div
            className={`
              h-full rounded-full
              ${dotColorClasses[color]}
              animate-[loading-bar_1.5s_ease-in-out_infinite]
            `}
            style={{
              width: '40%',
            }}
          />
        </div>
        {label && (
          <p className={`mt-2 text-sm text-center text-gray-600 ${classNames.label || ''}`}>
            {label}
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default Loading;

