'use client';

import React from 'react';

export interface SkeletonProps {
  // Appearance
  type?: 'text' | 'title' | 'avatar' | 'image' | 'card' | 'circle' | 'rectangle';
  
  // Loading state
  isLoaded?: boolean;
  
  // Dimensions (for custom types)
  width?: string | number;
  height?: string | number;
  
  // Animation
  animation?: 'pulse' | 'wave' | 'none';
  
  // Content (shown when loaded)
  children?: React.ReactNode;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    content?: string;
  };
}

// Type-based default dimensions
const typeClasses = {
  text: 'h-4 w-full rounded',
  title: 'h-8 w-3/4 rounded',
  avatar: 'w-12 h-12 rounded-full',
  image: 'w-full h-48 rounded-lg',
  card: 'w-full h-64 rounded-lg',
  circle: 'w-12 h-12 rounded-full',
  rectangle: 'w-full h-32 rounded-lg',
};

// Animation classes
const animationClasses = {
  pulse: 'animate-pulse',
  wave: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]',
  none: '',
};

export const Skeleton: React.FC<SkeletonProps> = ({
  type = 'text',
  isLoaded = false,
  width,
  height,
  animation = 'pulse',
  children,
  className = '',
  classNames = {},
}) => {
  // If loaded, show children
  if (isLoaded && children) {
    return <div className={classNames.content || ''}>{children}</div>;
  }

  // Build custom dimensions
  const customStyle: React.CSSProperties = {};
  if (width) customStyle.width = typeof width === 'number' ? `${width}px` : width;
  if (height) customStyle.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`
        bg-gray-200
        ${typeClasses[type]}
        ${animationClasses[animation]}
        ${className}
        ${classNames.base || ''}
      `}
      style={customStyle}
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Skeleton Group for common patterns
export interface SkeletonGroupProps {
  variant?: 'text-block' | 'card' | 'list' | 'profile' | 'table';
  count?: number;
  isLoaded?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  variant = 'text-block',
  count = 1,
  isLoaded = false,
  children,
  className = '',
}) => {
  if (isLoaded && children) {
    return <>{children}</>;
  }

  // Text block pattern
  if (variant === 'text-block') {
    return (
      <div className={`space-y-3 ${className}`}>
        <Skeleton type="title" />
        <Skeleton type="text" />
        <Skeleton type="text" width="90%" />
        <Skeleton type="text" width="80%" />
      </div>
    );
  }

  // Card pattern
  if (variant === 'card') {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <Skeleton type="image" height="200px" />
            <Skeleton type="title" />
            <Skeleton type="text" />
            <Skeleton type="text" width="60%" />
          </div>
        ))}
      </div>
    );
  }

  // List pattern
  if (variant === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton type="avatar" />
            <div className="flex-1 space-y-2">
              <Skeleton type="text" width="40%" />
              <Skeleton type="text" width="60%" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Profile pattern
  if (variant === 'profile') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center gap-4">
          <Skeleton type="avatar" width="80px" height="80px" />
          <div className="flex-1 space-y-2">
            <Skeleton type="title" width="50%" />
            <Skeleton type="text" width="70%" />
          </div>
        </div>
        <Skeleton type="rectangle" height="120px" />
        <div className="space-y-2">
          <Skeleton type="text" />
          <Skeleton type="text" width="90%" />
          <Skeleton type="text" width="85%" />
        </div>
      </div>
    );
  }

  // Table pattern
  if (variant === 'table') {
    return (
      <div className={`space-y-2 ${className}`}>
        {/* Header */}
        <div className="flex gap-4 pb-2 border-b border-gray-200">
          <Skeleton type="text" width="25%" />
          <Skeleton type="text" width="25%" />
          <Skeleton type="text" width="25%" />
          <Skeleton type="text" width="25%" />
        </div>
        {/* Rows */}
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex gap-4 py-2">
            <Skeleton type="text" width="25%" />
            <Skeleton type="text" width="25%" />
            <Skeleton type="text" width="25%" />
            <Skeleton type="text" width="25%" />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default Skeleton;

