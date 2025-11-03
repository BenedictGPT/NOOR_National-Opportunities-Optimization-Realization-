# Listbox, Popover & RangeCalendar - Implementation Guide

## Overview
Complete implementation guide for interactive list selection, floating popovers, and date range calendar components with all HeroUI features.

---

## 1. Listbox Component

### Features
- **Selection modes**: none, single, multiple
- **6 Variants**: solid, bordered, light, flat, faded, shadow
- **6 Color themes**: default, primary, secondary, success, warning, danger
- **Sections & dividers**: Group items logically
- **Icons & descriptions**: Rich item content
- **Dynamic rendering**: Render from data arrays
- **Keyboard navigation**: Full accessibility

### Component Props

```typescript
interface ListboxProps<T> {
  // Items
  items?: T[];
  children: React.ReactNode | ((item: T) => React.ReactNode);
  
  // Selection
  selectionMode?: 'none' | 'single' | 'multiple';
  selectedKeys?: Set<React.Key>;
  defaultSelectedKeys?: Set<React.Key>;
  onSelectionChange?: (keys: Set<React.Key>) => void;
  
  // Appearance
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  
  // Content
  label?: string;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  emptyContent?: React.ReactNode;
  
  // Behavior
  disabledKeys?: Set<React.Key>;
  onAction?: (key: React.Key) => void;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    list?: string;
    emptyContent?: string;
  };
  
  // Accessibility
  'aria-label'?: string;
}

interface ListboxItemProps {
  key: React.Key;
  children: React.ReactNode;
  
  // Content
  description?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  
  // Appearance
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  variant?: string;
  
  // Behavior
  showDivider?: boolean;
  isDisabled?: boolean;
  
  // Text value for keyboard search
  textValue?: string;
  
  // Styling
  className?: string;
}

interface ListboxSectionProps {
  title?: string;
  showDivider?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

### CSS Implementation

```css
/* Listbox.css */

/* Base Container */
.listbox {
  width: 100%;
  max-width: 260px;
  border: 1px solid #e5e5e5;          /* $colors.neutral.200 */
  padding: 4px 8px;                   /* $spacing.1 $spacing.2 */
  border-radius: 8px;                 /* $borderRadius.md */
  background-color: #ffffff;          /* $colors.white */
}

/* List */
.listbox__list {
  padding: 0;
  margin: 0;
  list-style: none;
  max-height: 300px;
  overflow-y: auto;
}

/* Item */
.listbox__item {
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

.listbox__item:hover {
  background-color: #f5f5f5;          /* $colors.neutral.100 */
}

.listbox__item:focus-visible {
  background-color: #f5f5f5;
  outline: 2px solid #3b82f6;         /* $colors.primary.500 */
  outline-offset: -2px;
}

.listbox__item--selected {
  background-color: #eff6ff;          /* $colors.primary.50 */
  color: #1d4ed8;                     /* $colors.primary.700 */
  font-weight: 500;                   /* $fontWeight.medium */
}

.listbox__item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Item Content */
.listbox__item-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.listbox__item-title {
  font-size: 16px;                    /* $fontSize.base */
  font-weight: 500;                   /* $fontWeight.medium */
}

.listbox__item-description {
  font-size: 12px;                    /* $fontSize.xs */
  color: #737373;                     /* $colors.neutral.500 */
  margin-top: 4px;                    /* $spacing.1 */
}

.listbox__item-start,
.listbox__item-end {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.listbox__item-end {
  margin-left: auto;
}

/* Section */
.listbox__section {
  margin-bottom: 16px;                /* $spacing.4 */
}

.listbox__section:last-child {
  margin-bottom: 0;
}

.listbox__section-title {
  padding: 8px 12px;                  /* $spacing.2 $spacing.3 */
  font-size: 12px;                    /* $fontSize.xs */
  font-weight: 600;                   /* $fontWeight.semibold */
  color: #525252;                     /* $colors.neutral.600 */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Divider */
.listbox__divider {
  height: 1px;
  background-color: #e5e5e5;          /* $colors.neutral.200 */
  margin: 8px 0;                      /* $spacing.2 0 */
}

/* Variants */
.listbox__item--variant-solid.listbox__item--selected {
  background-color: #3b82f6;          /* $colors.primary.500 */
  color: #ffffff;                     /* $colors.white */
}

.listbox__item--variant-bordered {
  border: 1px solid transparent;
}

.listbox__item--variant-bordered:hover {
  border-color: #d4d4d4;              /* $colors.neutral.300 */
  background-color: transparent;
}

.listbox__item--variant-bordered.listbox__item--selected {
  border-color: #3b82f6;              /* $colors.primary.500 */
  background-color: transparent;
  color: #1d4ed8;                     /* $colors.primary.700 */
}

.listbox__item--variant-light.listbox__item--selected {
  background-color: transparent;
  color: #3b82f6;                     /* $colors.primary.500 */
}

.listbox__item--variant-flat.listbox__item--selected {
  background-color: #dbeafe;          /* $colors.primary.100 */
  color: #1d4ed8;                     /* $colors.primary.700 */
}

.listbox__item--variant-shadow:hover {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);  /* $shadows.sm */
}

.listbox__item--variant-shadow.listbox__item--selected {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* $shadows.md */
  background-color: #eff6ff;
  color: #1d4ed8;
}

/* Color Variants */
.listbox__item--color-danger {
  color: #ef4444;                     /* $colors.error.500 */
}

.listbox__item--color-danger.listbox__item--selected {
  background-color: #fee2e2;          /* $colors.error.100 */
  color: #b91c1c;                     /* $colors.error.700 */
}

.listbox__item--variant-solid.listbox__item--color-danger.listbox__item--selected {
  background-color: #ef4444;
  color: #ffffff;
}

/* Empty State */
.listbox__empty {
  padding: 24px;                      /* $spacing.6 */
  text-align: center;
  color: #737373;                     /* $colors.neutral.500 */
  font-size: 14px;                    /* $fontSize.sm */
}

/* Top/Bottom Content */
.listbox__top-content,
.listbox__bottom-content {
  padding: 8px;                       /* $spacing.2 */
  border-bottom: 1px solid #e5e5e5;   /* $colors.neutral.200 */
}

.listbox__bottom-content {
  border-top: 1px solid #e5e5e5;
  border-bottom: none;
}
```

### Usage Examples

#### Example 1: Basic Listbox

```typescript
import { Listbox, ListboxItem } from "@/components";

export default function BasicExample() {
  return (
    <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
      <ListboxItem key="new">New file</ListboxItem>
      <ListboxItem key="copy">Copy link</ListboxItem>
      <ListboxItem key="edit">Edit file</ListboxItem>
      <ListboxItem
        key="delete"
        className="text-danger"
        color="danger"
      >
        Delete file
      </ListboxItem>
    </Listbox>
  );
}
```

#### Example 2: With Icons and Dividers

```typescript
export default function IconsExample() {
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";

  return (
    <Listbox aria-label="Listbox menu with icons" variant="faded">
      <ListboxItem
        key="new"
        startContent={<AddNoteIcon className={iconClasses} />}
      >
        New file
      </ListboxItem>
      <ListboxItem
        key="copy"
        startContent={<CopyDocumentIcon className={iconClasses} />}
      >
        Copy link
      </ListboxItem>
      <ListboxItem
        key="edit"
        showDivider
        startContent={<EditDocumentIcon className={iconClasses} />}
      >
        Edit file
      </ListboxItem>
      <ListboxItem
        key="delete"
        className="text-danger"
        color="danger"
        startContent={<DeleteDocumentIcon className={iconClasses} />}
      >
        Delete file
      </ListboxItem>
    </Listbox>
  );
}
```

#### Example 3: With Sections

```typescript
export default function SectionsExample() {
  return (
    <Listbox aria-label="Listbox menu with sections" variant="flat">
      <ListboxSection showDivider title="Actions">
        <ListboxItem
          key="new"
          description="Create a new file"
          startContent={<AddNoteIcon />}
        >
          New file
        </ListboxItem>
        <ListboxItem
          key="copy"
          description="Copy the file link"
          startContent={<CopyDocumentIcon />}
        >
          Copy link
        </ListboxItem>
        <ListboxItem
          key="edit"
          description="Allows you to edit the file"
          startContent={<EditDocumentIcon />}
        >
          Edit file
        </ListboxItem>
      </ListboxSection>
      
      <ListboxSection title="Danger zone">
        <ListboxItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
          startContent={<DeleteDocumentIcon />}
        >
          Delete file
        </ListboxItem>
      </ListboxSection>
    </Listbox>
  );
}
```

#### Example 4: Multi-Select with Top Content

```typescript
export default function MultiSelectExample() {
  const [values, setValues] = useState(new Set(["1"]));
  const arrayValues = Array.from(values);

  const topContent = useMemo(() => {
    if (!arrayValues.length) return null;

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>
            {users.find((user) => `${user.id}` === `${value}`).name}
          </Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <Listbox
      items={users}
      label="Assigned to"
      selectionMode="multiple"
      topContent={topContent}
      variant="flat"
      onSelectionChange={setValues}
    >
      {(item) => (
        <ListboxItem key={item.id} textValue={item.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={item.name} size="sm" src={item.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-tiny text-default-400">
                {item.email}
              </span>
            </div>
          </div>
        </ListboxItem>
      )}
    </Listbox>
  );
}
```

---

## 2. Popover Component

### Features
- **12 Placement options**: top, bottom, left, right with start/end variants
- **Multiple trigger modes**: click, hover, focus
- **Backdrop support**: Optional overlay
- **Arrow indicator**: Points to trigger
- **Auto-positioning**: Collision detection
- **Nested popovers**: Support for complex UIs

### Component Props

```typescript
interface PopoverProps {
  // State
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  
  // Placement
  placement?: 
    | 'top' | 'top-start' | 'top-end'
    | 'bottom' | 'bottom-start' | 'bottom-end'
    | 'left' | 'left-start' | 'left-end'
    | 'right' | 'right-start' | 'right-end';
  
  // Appearance
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  showArrow?: boolean;
  
  // Behavior
  triggerType?: 'click' | 'hover' | 'focus';
  backdrop?: 'transparent' | 'opaque' | 'blur';
  offset?: number;
  
  // Content
  children: React.ReactNode;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    trigger?: string;
    backdrop?: string;
    content?: string;
    arrow?: string;
  };
}
```

### CSS Implementation

```css
/* Popover.css */

/* Trigger */
.popover__trigger {
  display: inline-flex;
  cursor: pointer;
}

/* Content */
.popover__content {
  position: fixed;
  background-color: #ffffff;          /* $colors.white */
  border: 1px solid #e5e5e5;          /* $colors.neutral.200 */
  border-radius: 12px;                /* $borderRadius.lg */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);  /* $shadows.xl */
  padding: 16px;                      /* $spacing.4 */
  z-index: 1060;                      /* $zIndex.popover */
  max-width: 320px;
  animation: fadeIn 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Arrow */
.popover__arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  transform: rotate(45deg);
}

/* Arrow positioning */
.popover__content[data-placement^="top"] .popover__arrow {
  bottom: -4px;
  border-top: none;
  border-left: none;
}

.popover__content[data-placement^="bottom"] .popover__arrow {
  top: -4px;
  border-bottom: none;
  border-right: none;
}

.popover__content[data-placement^="left"] .popover__arrow {
  right: -4px;
  border-left: none;
  border-bottom: none;
}

.popover__content[data-placement^="right"] .popover__arrow {
  left: -4px;
  border-right: none;
  border-top: none;
}

/* Backdrop */
.popover__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1059;
}

.popover__backdrop--transparent {
  background-color: transparent;
}

.popover__backdrop--opaque {
  background-color: rgba(0, 0, 0, 0.1);
}

.popover__backdrop--blur {
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
}

/* Size Variants */
.popover__content--size-sm {
  padding: 8px;                       /* $spacing.2 */
  max-width: 240px;
}

.popover__content--size-md {
  padding: 16px;                      /* $spacing.4 */
  max-width: 320px;
}

.popover__content--size-lg {
  padding: 24px;                      /* $spacing.6 */
  max-width: 480px;
}

/* Color Variants */
.popover__content--color-primary {
  background-color: #3b82f6;          /* $colors.primary.500 */
  color: #ffffff;
  border: none;
}

.popover__content--color-primary .popover__arrow {
  background-color: #3b82f6;
  border: none;
}

.popover__content--color-success {
  background-color: #22c55e;
  color: #ffffff;
  border: none;
}

.popover__content--color-warning {
  background-color: #f59e0b;
  color: #ffffff;
  border: none;
}

.popover__content--color-danger {
  background-color: #ef4444;
  color: #ffffff;
  border: none;
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

### Usage Example

```typescript
import { Popover, PopoverTrigger, PopoverContent, Button } from "@/components";

export default function PopoverExample() {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny">This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

---

## 3. RangeCalendar Component

### Features
- **Date range selection**: Start and end dates
- **Month/Year navigation**: Navigate through time
- **Visual range indicator**: Highlight selected range
- **Keyboard navigation**: Full keyboard support
- **Disabled dates**: Prevent selection of certain dates
- **Multiple months**: Show multiple months side-by-side
- **Internationalization**: Support for different locales

### Component Props

```typescript
interface RangeCalendarProps {
  // Value
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  
  // Constraints
  minValue?: DateValue;
  maxValue?: DateValue;
  isDateUnavailable?: (date: DateValue) => boolean;
  
  // Appearance
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  visibleMonths?: number;
  
  // Behavior
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
  
  // Accessibility
  'aria-label'?: string;
  
  // Styling
  className?: string;
  classNames?: {
    base?: string;
    header?: string;
    grid?: string;
  };
}

interface DateRange {
  start: DateValue;
  end: DateValue;
}
```

### CSS Implementation

```css
/* RangeCalendar.css */

/* Container */
.range-calendar {
  background-color: #ffffff;          /* $colors.white */
  border: 1px solid #e5e5e5;          /* $colors.neutral.200 */
  border-radius: 12px;                /* $borderRadius.lg */
  padding: 16px;                      /* $spacing.4 */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);  /* $shadows.md */
}

/* Header */
.range-calendar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;                /* $spacing.4 */
  padding: 8px 0;                     /* $spacing.2 0 */
}

.range-calendar__title {
  font-size: 16px;                    /* $fontSize.base */
  font-weight: 600;                   /* $fontWeight.semibold */
  color: #171717;                     /* $colors.neutral.900 */
}

.range-calendar__nav-button {
  padding: 8px;                       /* $spacing.2 */
  border-radius: 8px;                 /* $borderRadius.md */
  background-color: transparent;
  color: #525252;                     /* $colors.neutral.600 */
  cursor: pointer;
  transition: 150ms;
  border: none;
}

.range-calendar__nav-button:hover {
  background-color: #f5f5f5;          /* $colors.neutral.100 */
}

/* Grid */
.range-calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;                           /* $spacing.1 */
}

/* Weekday Headers */
.range-calendar__weekday {
  font-size: 12px;                    /* $fontSize.xs */
  font-weight: 600;                   /* $fontWeight.semibold */
  color: #525252;                     /* $colors.neutral.600 */
  text-align: center;
  padding: 8px;                       /* $spacing.2 */
}

/* Cell */
.range-calendar__cell {
  padding: 8px;                       /* $spacing.2 */
  text-align: center;
  font-size: 14px;                    /* $fontSize.sm */
  border-radius: 8px;                 /* $borderRadius.md */
  cursor: pointer;
  transition: 150ms;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.range-calendar__cell:hover:not(.range-calendar__cell--disabled) {
  background-color: #f5f5f5;          /* $colors.neutral.100 */
}

.range-calendar__cell--today {
  font-weight: 600;                   /* $fontWeight.semibold */
  border: 1px solid #3b82f6;          /* $colors.primary.500 */
}

.range-calendar__cell--selected {
  background-color: #3b82f6;          /* $colors.primary.500 */
  color: #ffffff;
  font-weight: 500;                   /* $fontWeight.medium */
}

.range-calendar__cell--in-range {
  background-color: #dbeafe;          /* $colors.primary.100 */
  color: #1d4ed8;                     /* $colors.primary.700 */
  border-radius: 0;
}

.range-calendar__cell--range-start {
  background-color: #3b82f6;
  color: #ffffff;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.range-calendar__cell--range-end {
  background-color: #3b82f6;
  color: #ffffff;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.range-calendar__cell--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.range-calendar__cell--outside-month {
  color: #a3a3a3;                     /* $colors.neutral.400 */
}

/* Focus */
.range-calendar__cell:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  z-index: 1;
}
```

### Usage Example

```typescript
import { RangeCalendar } from "@/components";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function RangeCalendarExample() {
  return (
    <div className="flex gap-x-4">
      <RangeCalendar aria-label="Date (No Selection)" />
      
      <RangeCalendar
        aria-label="Date (Controlled)"
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone()).add({ weeks: 1 }),
        }}
      />
    </div>
  );
}
```

---

## Design System Integration

### Token Usage

| Component | Key Tokens |
|-----------|-----------|
| **Listbox** | `$colors`, `$spacing.1/2/3`, `$fontSize.xs/base`, `$borderRadius.sm/md` |
| **Popover** | `$colors.white`, `$shadows.xl`, `$borderRadius.lg`, `$zIndex.popover` |
| **RangeCalendar** | `$colors.primary`, `$spacing.2/4`, `$fontSize.sm/base`, `$borderRadius.md` |

### Accessibility Checklist

**Listbox:**
- [x] ARIA role="listbox"
- [x] Keyboard navigation (Arrow keys, Home, End)
- [x] aria-selected for selected items
- [x] aria-disabled for disabled items
- [x] Type-ahead search support

**Popover:**
- [x] ARIA role="dialog" or "menu"
- [x] aria-haspopup on trigger
- [x] Focus management
- [x] ESC key closes popover
- [x] Click outside closes

**RangeCalendar:**
- [x] ARIA role="grid"
- [x] Keyboard navigation (Arrow keys)
- [x] aria-selected for selected dates
- [x] aria-disabled for disabled dates
- [x] Proper date announcements

---

## Summary

✅ **Listbox**: Multi-select list with sections, icons, 6 variants  
✅ **Popover**: Floating content with 12 placements, backdrop, arrow  
✅ **RangeCalendar**: Date range picker with visual indicators  

All components fully integrated with design system tokens!
