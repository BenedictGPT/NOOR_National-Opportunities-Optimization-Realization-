'use client';

import React from 'react';

export interface BadgeProps {
  // Content
  children: React.ReactNode;
  
  // Appearance
  variant?: 'solid' | 'flat' | 'bordered' | 'dot';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  
  // Positioning (when used as notification badge)
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  isInvisible?: boolean;
  
  // Content for notification badge
  content?: string | number;
  showOutline?: boolean;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    badge?: string;
  };
}

// Size mapping
const sizeClasses = {
  sm: 'text-xs px-1.5 py-0.5 min-w-[18px] h-[18px]',
  md: 'text-sm px-2 py-0.5 min-w-[20px] h-[20px]',
  lg: 'text-base px-2.5 py-1 min-w-[24px] h-[24px]',
};

// Dot size mapping
const dotSizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

// Color mapping for Federal theme
const colorVariants = {
  default: {
    solid: 'bg-gray-600 text-white',
    flat: 'bg-gray-100 text-gray-700',
    bordered: 'bg-transparent text-gray-700 border-gray-300',
    dot: 'bg-gray-500',
  },
  primary: {
    solid: 'bg-individual-red text-white',
    flat: 'bg-individual-red/10 text-individual-red',
    bordered: 'bg-transparent text-individual-red border-individual-red',
    dot: 'bg-individual-red',
  },
  secondary: {
    solid: 'bg-individual-beige text-white',
    flat: 'bg-individual-beige/10 text-individual-beige',
    bordered: 'bg-transparent text-individual-beige border-individual-beige',
    dot: 'bg-individual-beige',
  },
  success: {
    solid: 'bg-green-600 text-white',
    flat: 'bg-green-100 text-green-700',
    bordered: 'bg-transparent text-green-700 border-green-500',
    dot: 'bg-green-500',
  },
  warning: {
    solid: 'bg-yellow-600 text-white',
    flat: 'bg-yellow-100 text-yellow-700',
    bordered: 'bg-transparent text-yellow-700 border-yellow-500',
    dot: 'bg-yellow-500',
  },
  danger: {
    solid: 'bg-red-600 text-white',
    flat: 'bg-red-100 text-red-700',
    bordered: 'bg-transparent text-red-700 border-red-500',
    dot: 'bg-red-500',
  },
};

// Placement mapping for notification badges
const placementClasses = {
  'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'solid',
  color = 'default',
  size = 'md',
  placement = 'top-right',
  isInvisible = false,
  content,
  showOutline = true,
  className = '',
  classNames = {},
}) => {
  // If content is provided, render as notification badge
  if (content !== undefined) {
    return (
      <div className={`relative inline-flex ${classNames.base || ''}`}>
        {children}
        {!isInvisible && (
          <span
            className={`
              absolute ${placementClasses[placement]}
              flex items-center justify-center
              rounded-full font-semibold
              ${sizeClasses[size]}
              ${colorVariants[color][variant]}
              ${variant === 'bordered' ? 'border' : ''}
              ${showOutline ? 'ring-2 ring-white' : ''}
              ${classNames.badge || ''}
            `}
          >
            {content}
          </span>
        )}
      </div>
    );
  }

  // Render as dot badge
  if (variant === 'dot') {
    return (
      <div className={`relative inline-flex ${classNames.base || ''}`}>
        {children}
        {!isInvisible && (
          <span
            className={`
              absolute ${placementClasses[placement]}
              rounded-full
              ${dotSizeClasses[size]}
              ${colorVariants[color].dot}
              ${showOutline ? 'ring-2 ring-white' : ''}
              ${classNames.badge || ''}
            `}
          />
        )}
      </div>
    );
  }

  // Render as standalone badge
  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium
        ${sizeClasses[size]}
        ${colorVariants[color][variant]}
        ${variant === 'bordered' ? 'border' : ''}
        ${className}
        ${classNames.base || ''}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;

