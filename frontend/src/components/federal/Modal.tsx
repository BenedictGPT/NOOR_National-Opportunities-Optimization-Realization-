'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

// Modal Props Interface
export interface ModalProps {
  // State management
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onClose?: () => void;
  
  // Appearance
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  backdrop?: 'opaque' | 'blur' | 'transparent';
  placement?: 'center' | 'top' | 'top-center' | 'bottom' | 'bottom-center';
  scrollBehavior?: 'inside' | 'outside';
  
  // Behavior
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  hideCloseButton?: boolean;
  isDismissable?: boolean;
  
  // Content
  children: React.ReactNode;
  
  // Styling
  className?: string;
  classNames?: {
    wrapper?: string;
    backdrop?: string;
    base?: string;
    header?: string;
    body?: string;
    footer?: string;
    closeButton?: string;
  };
}

export interface ModalContentProps {
  children: React.ReactNode | ((onClose: () => void) => React.ReactNode);
  className?: string;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

// Size mapping
const sizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  full: 'max-w-full mx-4',
};

// Placement mapping
const placementClasses = {
  center: 'items-center justify-center',
  top: 'items-start justify-center pt-16',
  'top-center': 'items-start justify-center pt-8',
  bottom: 'items-end justify-center pb-16',
  'bottom-center': 'items-end justify-center pb-8',
};

// Backdrop mapping
const backdropClasses = {
  opaque: 'bg-black/50',
  blur: 'bg-black/30 backdrop-blur-md',
  transparent: 'bg-transparent',
};

// Modal Component
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
  size = 'md',
  backdrop = 'opaque',
  placement = 'center',
  scrollBehavior = 'inside',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  hideCloseButton = false,
  isDismissable = true,
  children,
  className = '',
  classNames = {},
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    if (onOpenChange) onOpenChange(false);
  }, [onClose, onOpenChange]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (closeOnBackdropClick && isDismissable && e.target === e.currentTarget) {
      handleClose();
    }
  }, [closeOnBackdropClick, isDismissable, handleClose]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape || !isDismissable) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, isDismissable, handleClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex ${placementClasses[placement]} p-4 ${classNames.wrapper || ''}`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 -z-10 transition-opacity duration-300 ${backdropClasses[backdrop]} ${classNames.backdrop || ''}`}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className={`
          relative w-full ${sizeClasses[size]}
          bg-white rounded-lg shadow-2xl
          transform transition-all duration-300
          ${scrollBehavior === 'inside' ? 'flex flex-col max-h-[calc(100vh-2rem)]' : ''}
          ${className}
          ${classNames.base || ''}
        `}
      >
        {/* Close Button */}
        {!hideCloseButton && isDismissable && (
          <button
            onClick={handleClose}
            className={`
              absolute top-4 right-4 z-10
              w-8 h-8 flex items-center justify-center
              text-gray-400 hover:text-gray-600
              rounded-full hover:bg-gray-100
              transition-colors duration-200
              ${classNames.closeButton || ''}
            `}
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Modal Content */}
        {typeof children === 'function' ? children(handleClose) : children}
      </div>
    </div>
  );

  // Render modal in portal
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
};

// Modal Content Component
export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {children}
    </div>
  );
};

// Modal Header Component
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900">
        {children}
      </h3>
    </div>
  );
};

// Modal Body Component
export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`px-6 py-4 flex-1 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};

// Modal Footer Component
export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 flex justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
};

// Export all components
export default Modal;

