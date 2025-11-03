# Dropdown Component - Implementation Guide

## Overview
Complete implementation guide for the Dropdown menu component with keyboard shortcuts, sections, rich content, and all HeroUI features.

---

## Dropdown Component

### Features
- **Keyboard shortcuts**: Visual shortcut indicators
- **6 Variants**: solid, bordered, light, flat, faded, shadow
- **6 Color themes**: default, primary, secondary, success, warning, danger
- **Sections & dividers**: Organize menu items
- **Icons & descriptions**: Rich item content
- **Dynamic rendering**: Render from data arrays
- **Trigger flexibility**: Works with any trigger element
- **Full keyboard navigation**: Arrow keys, Enter, Escape

### Component Props

```typescript
interface DropdownProps {
  // Content
  children: React.ReactNode;
  
  // Behavior
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnSelect?: boolean;
  
  // Placement (inherited from Popover)
  placement?: 
    | 'top' | 'top-start' | 'top-end'
    | 'bottom' | 'bottom-start' | 'bottom-end'
    | 'left' | 'left-start' | 'left-end'
    | 'right' | 'right-start' | 'right-end';
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    trigger?: string;
    menu?: string;
  };
}

interface DropdownTriggerProps {
  children: React.ReactElement;
}

interface DropdownMenuProps<T = object> {
  // Items
  items?: T[];
  children: React.ReactNode | ((item: T) => React.ReactNode);
  
  // Appearance
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  
  // Behavior
  disabledKeys?: Set<React.Key>;
  onAction?: (key: React.Key) => void;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    list?: string;
  };
  
  // Accessibility
  'aria-label': string;
}

interface DropdownItemProps {
  key: React.Key;
  children: React.ReactNode;
  
  // Content
  description?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  shortcut?: string;
  
  // Appearance
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  variant?: string;
  
  // Behavior
  showDivider?: boolean;
  isDisabled?: boolean;
  closeOnSelect?: boolean;
  
  // Text value for keyboard search
  textValue?: string;
  
  // Styling
  className?: string;
}

interface DropdownSectionProps {
  title?: string;
  showDivider?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

### CSS Implementation

```css
/* Dropdown.css */

/* Trigger */
.dropdown__trigger {
  display: inline-flex;
  cursor: pointer;
}

/* Menu */
.dropdown__menu {
  min-width: 200px;
  background-color: #ffffff;          /* $colors.white */
  border: 1px solid #e5e5e5;          /* $colors.neutral.200 */
  border-radius: 12px;                /* $borderRadius.lg */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);  /* $shadows.xl */
  padding: 8px;                       /* $spacing.2 */
  z-index: 1000;                      /* $zIndex.dropdown */
  animation: fadeIn 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* List */
.dropdown__list {
  padding: 0;
  margin: 0;
  list-style: none;
}

/* Item */
.dropdown__item {
  display: flex;
  align-items: center;
  gap: 8px;                           /* $spacing.2 */
  padding: 8px 12px;                  /* $spacing.2 $spacing.3 */
  border-radius: 4px;                 /* $borderRadius.sm */
  font-size: 16px;                    /* $fontSize.base */
  color: #171717;                     /* $colors.neutral.900 */
  cursor: pointer;
  transition: all 150ms;              /* $transitions.fast */
  outline: none;
  user-select: none;
}

.dropdown__item:hover {
  background-color: #f5f5f5;          /* $colors.neutral.100 */
}

.dropdown__item:focus-visible {
  background-color: #f5f5f5;
  outline: 2px solid #3b82f6;         /* $colors.primary.500 */
  outline-offset: -2px;
}

.dropdown__item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Item Content */
.dropdown__item-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.dropdown__item-title {
  font-size: 16px;                    /* $fontSize.base */
  font-weight: 500;                   /* $fontWeight.medium */
}

.dropdown__item-description {
  font-size: 12px;                    /* $fontSize.xs */
  color: #737373;                     /* $colors.neutral.500 */
  margin-top: 4px;                    /* $spacing.1 */
}

.dropdown__item-start,
.dropdown__item-end {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.dropdown__item-end {
  margin-left: auto;
}

/* Shortcut */
.dropdown__item-shortcut {
  font-size: 12px;                    /* $fontSize.xs */
  color: #737373;                     /* $colors.neutral.500 */
  margin-left: auto;
  padding: 4px 8px;                   /* $spacing.1 $spacing.2 */
  background-color: #f5f5f5;          /* $colors.neutral.100 */
  border-radius: 4px;                 /* $borderRadius.sm */
  font-family: monospace;
}

/* Section */
.dropdown__section {
  margin-bottom: 8px;                 /* $spacing.2 */
}

.dropdown__section:last-child {
  margin-bottom: 0;
}

.dropdown__section-title {
  padding: 8px 12px;                  /* $spacing.2 $spacing.3 */
  font-size: 12px;                    /* $fontSize.xs */
  font-weight: 600;                   /* $fontWeight.semibold */
  color: #525252;                     /* $colors.neutral.600 */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Divider */
.dropdown__divider {
  height: 1px;
  background-color: #e5e5e5;          /* $colors.neutral.200 */
  margin: 8px 0;                      /* $spacing.2 0 */
}

/* Variants */
.dropdown__item--variant-bordered {
  border: 1px solid transparent;
}

.dropdown__item--variant-bordered:hover {
  border-color: #d4d4d4;              /* $colors.neutral.300 */
  background-color: transparent;
}

.dropdown__item--variant-light:hover {
  background-color: #fafafa;          /* $colors.neutral.50 */
}

.dropdown__item--variant-flat:hover {
  background-color: #f5f5f5;          /* $colors.neutral.100 */
}

.dropdown__menu--variant-faded {
  background-color: #fafafa;          /* $colors.neutral.50 */
}

.dropdown__item--variant-shadow {
  box-shadow: none;
}

.dropdown__item--variant-shadow:hover {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);  /* $shadows.sm */
}

/* Color Variants */
.dropdown__item--color-primary:hover {
  background-color: #eff6ff;          /* $colors.primary.50 */
  color: #1d4ed8;                     /* $colors.primary.700 */
}

.dropdown__item--color-secondary:hover {
  background-color: #f8fafc;          /* $colors.secondary.50 */
  color: #334155;                     /* $colors.secondary.700 */
}

.dropdown__item--color-success:hover {
  background-color: #f0fdf4;          /* $colors.success.50 */
  color: #15803d;                     /* $colors.success.700 */
}

.dropdown__item--color-warning:hover {
  background-color: #fffbeb;          /* $colors.warning.50 */
  color: #b45309;                     /* $colors.warning.700 */
}

.dropdown__item--color-danger {
  color: #ef4444;                     /* $colors.error.500 */
}

.dropdown__item--color-danger:hover {
  background-color: #fef2f2;          /* $colors.error.50 */
  color: #b91c1c;                     /* $colors.error.700 */
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### React Implementation

```typescript
// Dropdown.tsx
import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Dropdown.css';

// Context for Dropdown state
const DropdownContext = createContext<{
  isOpen: boolean;
  onClose: () => void;
  closeOnSelect: boolean;
} | null>(null);

// Main Dropdown Component
export const Dropdown: React.FC<DropdownProps> = ({
  children,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onOpenChange,
  closeOnSelect = true,
  placement = 'bottom-start',
  className = '',
  classNames = {},
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(open);
    }
    onOpenChange?.(open);
  };

  const handleClose = () => {
    handleOpenChange(false);
  };

  return (
    <DropdownContext.Provider value={{ isOpen, onClose: handleClose, closeOnSelect }}>
      <div className={`dropdown ${className} ${classNames.base || ''}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// DropdownTrigger Component
export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children }) => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownTrigger must be used within Dropdown');

  const { isOpen, onClose } = context;
  const triggerRef = useRef<HTMLElement>(null);

  const handleClick = () => {
    context.onClose = isOpen ? onClose : () => {};
  };

  return React.cloneElement(children, {
    ref: triggerRef,
    onClick: handleClick,
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
  });
};

// DropdownMenu Component
export const DropdownMenu = <T extends object>({
  items,
  children,
  variant = 'solid',
  color = 'default',
  disabledKeys = new Set(),
  onAction,
  className = '',
  classNames = {},
  'aria-label': ariaLabel,
}: DropdownMenuProps<T>) => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownMenu must be used within Dropdown');

  const { isOpen, onClose, closeOnSelect } = context;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuClasses = [
    'dropdown__menu',
    `dropdown__menu--variant-${variant}`,
    className,
    classNames.base,
  ]
    .filter(Boolean)
    .join(' ');

  const menuContent = (
    <div
      ref={menuRef}
      className={menuClasses}
      role="menu"
      aria-label={ariaLabel}
    >
      <ul className={`dropdown__list ${classNames.list || ''}`}>
        {items
          ? items.map((item) => children(item))
          : children}
      </ul>
    </div>
  );

  return createPortal(menuContent, document.body);
};

// DropdownItem Component
export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  description,
  startContent,
  endContent,
  shortcut,
  color = 'default',
  variant,
  showDivider = false,
  isDisabled = false,
  closeOnSelect: itemCloseOnSelect,
  textValue,
  className = '',
}) => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownItem must be used within DropdownMenu');

  const { onClose, closeOnSelect: menuCloseOnSelect } = context;
  const shouldClose = itemCloseOnSelect ?? menuCloseOnSelect;

  const handleClick = () => {
    if (isDisabled) return;
    if (shouldClose) {
      onClose();
    }
  };

  const itemClasses = [
    'dropdown__item',
    variant && `dropdown__item--variant-${variant}`,
    `dropdown__item--color-${color}`,
    isDisabled && 'dropdown__item--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <li
        className={itemClasses}
        role="menuitem"
        onClick={handleClick}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
      >
        {startContent && (
          <div className="dropdown__item-start">{startContent}</div>
        )}
        
        <div className="dropdown__item-content">
          <div className="dropdown__item-title">{children}</div>
          {description && (
            <div className="dropdown__item-description">{description}</div>
          )}
        </div>

        {shortcut && (
          <div className="dropdown__item-shortcut">{shortcut}</div>
        )}

        {endContent && (
          <div className="dropdown__item-end">{endContent}</div>
        )}
      </li>
      
      {showDivider && <div className="dropdown__divider" />}
    </>
  );
};

// DropdownSection Component
export const DropdownSection: React.FC<DropdownSectionProps> = ({
  title,
  showDivider = false,
  children,
  className = '',
}) => {
  return (
    <div className={`dropdown__section ${className}`}>
      {title && (
        <div className="dropdown__section-title">{title}</div>
      )}
      {children}
      {showDivider && <div className="dropdown__divider" />}
    </div>
  );
};
```

### Usage Examples

#### Example 1: Basic Dropdown

```typescript
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@/components";

export default function BasicExample() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

#### Example 2: With Icons and Shortcuts

```typescript
export default function IconsShortcutsExample() {
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
        <DropdownItem
          key="new"
          shortcut="⌘N"
          startContent={<AddNoteIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          shortcut="⌘C"
          startContent={<CopyDocumentIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          shortcut="⌘⇧E"
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          shortcut="⌘⇧D"
          startContent={<DeleteDocumentIcon className={iconClasses} />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

#### Example 3: Dynamic Items

```typescript
export default function DynamicExample() {
  const items = [
    { key: "new", label: "New file" },
    { key: "copy", label: "Copy link" },
    { key: "edit", label: "Edit file" },
    { key: "delete", label: "Delete file" },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        items={items}
        onAction={(key) => alert(key)}
      >
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
```

#### Example 4: With Sections

```typescript
export default function SectionsExample() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="flat">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with sections">
        <DropdownSection showDivider title="Actions">
          <DropdownItem
            key="new"
            startContent={<PlusIcon />}
          >
            New Project
          </DropdownItem>
          <DropdownItem key="dashboard">Dashboard</DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
        </DropdownSection>
        
        <DropdownSection showDivider title="Preferences">
          <DropdownItem
            key="quick-search"
            description="Search across entire app"
            shortcut="⌘K"
          >
            Quick search
          </DropdownItem>
          <DropdownItem
            key="theme"
            description="System, Dark, Light"
          >
            Theme
          </DropdownItem>
        </DropdownSection>
        
        <DropdownSection title="Account">
          <DropdownItem key="help">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
```

#### Example 5: User Profile Dropdown

```typescript
export default function UserProfileExample() {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="help">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

---

## Design System Integration

### Token Usage

| Element | Design Token | Value |
|---------|--------------|-------|
| Menu background | `$colors.white` | #ffffff |
| Menu border | `$colors.neutral.200` | #e5e5e5 |
| Menu border radius | `$borderRadius.lg` | 12px |
| Menu shadow | `$shadows.xl` | Large shadow |
| Item padding | `$spacing.2 $spacing.3` | 8px 12px |
| Item hover background | `$colors.neutral.100` | #f5f5f5 |
| Section title font size | `$fontSize.xs` | 12px |
| Shortcut background | `$colors.neutral.100` | #f5f5f5 |
| Z-index | `$zIndex.dropdown` | 1000 |

### Accessibility Checklist

- [x] ARIA role="menu" on dropdown menu
- [x] ARIA role="menuitem" on items
- [x] aria-haspopup on trigger
- [x] aria-expanded state on trigger
- [x] Keyboard navigation (Arrow keys, Enter, Escape)
- [x] Focus management
- [x] aria-disabled for disabled items
- [x] Click outside to close
- [x] ESC key to close

---

## Comparison: Dropdown vs Listbox

| Feature | Dropdown | Listbox |
|---------|----------|---------|
| **Purpose** | Action menus | Selection lists |
| **Trigger** | Required | Standalone |
| **Usage** | Context menus, commands | Multi-select, options |
| **Shortcuts** | Yes | No |
| **Sections** | Yes | Yes |
| **Selection** | Action-based | State-based |

---

## Summary

✅ **Dropdown**: Complete menu system with shortcuts, sections, icons  
✅ **Keyboard shortcuts**: Visual indicators for quick actions  
✅ **6 Variants + 6 Colors**: 36 visual combinations  
✅ **Rich Content**: Icons, descriptions, user profiles  
✅ **Full Accessibility**: ARIA compliant with keyboard navigation  

The Dropdown component completes your comprehensive design system!
