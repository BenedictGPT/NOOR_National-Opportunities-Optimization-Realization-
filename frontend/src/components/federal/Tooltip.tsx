'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface TooltipProps {
  // Content
  content: React.ReactNode;
  children: React.ReactElement;
  
  // Appearance
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  
  // Behavior
  delay?: number;
  closeDelay?: number;
  isDisabled?: boolean;
  showArrow?: boolean;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    content?: string;
    arrow?: string;
  };
}

// Color mapping for Federal theme
const colorClasses = {
  default: 'bg-gray-900 text-white',
  primary: 'bg-federal-gold text-white',
  secondary: 'bg-federal-navy text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-yellow-600 text-white',
  danger: 'bg-red-600 text-white',
};

// Size mapping
const sizeClasses = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2',
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  color = 'default',
  size = 'md',
  delay = 400,
  closeDelay = 0,
  isDisabled = false,
  showArrow = true,
  className = '',
  classNames = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const gap = 8; // Space between trigger and tooltip
    const arrowSize = showArrow ? 6 : 0;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - gap - arrowSize;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'top-start':
        top = triggerRect.top - tooltipRect.height - gap - arrowSize;
        left = triggerRect.left;
        break;
      case 'top-end':
        top = triggerRect.top - tooltipRect.height - gap - arrowSize;
        left = triggerRect.right - tooltipRect.width;
        break;
      case 'bottom':
        top = triggerRect.bottom + gap + arrowSize;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + gap + arrowSize;
        left = triggerRect.left;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + gap + arrowSize;
        left = triggerRect.right - tooltipRect.width;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - gap - arrowSize;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + gap + arrowSize;
        break;
    }

    // Keep tooltip within viewport
    const padding = 8;
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));

    setPosition({ top, left });
  };

  const handleMouseEnter = () => {
    if (isDisabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (closeDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, closeDelay);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
    }

    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  // Get arrow position classes
  const getArrowClasses = () => {
    const baseArrow = 'absolute w-0 h-0 border-4 border-transparent';
    const arrowColor = colorClasses[color].split(' ')[0]; // Get bg color
    
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return `${baseArrow} ${arrowColor.replace('bg-', 'border-t-')} bottom-[-8px] left-1/2 -translate-x-1/2`;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return `${baseArrow} ${arrowColor.replace('bg-', 'border-b-')} top-[-8px] left-1/2 -translate-x-1/2`;
      case 'left':
        return `${baseArrow} ${arrowColor.replace('bg-', 'border-l-')} right-[-8px] top-1/2 -translate-y-1/2`;
      case 'right':
        return `${baseArrow} ${arrowColor.replace('bg-', 'border-r-')} left-[-8px] top-1/2 -translate-y-1/2`;
      default:
        return '';
    }
  };

  const tooltipContent = isVisible && typeof window !== 'undefined' ? createPortal(
    <div
      ref={tooltipRef}
      role="tooltip"
      className={`
        fixed z-[9999]
        rounded-lg shadow-lg
        ${colorClasses[color]}
        ${sizeClasses[size]}
        ${className}
        ${classNames.base || ''}
        animate-in fade-in-0 zoom-in-95 duration-200
      `}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className={classNames.content || ''}>
        {content}
      </div>
      {showArrow && (
        <div className={`${getArrowClasses()} ${classNames.arrow || ''}`} />
      )}
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      {tooltipContent}
    </>
  );
};

export default Tooltip;

