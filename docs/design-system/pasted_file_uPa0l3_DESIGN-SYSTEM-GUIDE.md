# UI Design System Guide

## What is this?

This is a JSON-based design system that defines how all your UI components should look and behave. Think of it as a recipe book for building consistent, beautiful user interfaces.

## What's Inside?

### 1. **Design Tokens** (The Building Blocks)
These are reusable values that ensure consistency across your entire UI:

- **Colors**: Primary, secondary, success, warning, error, info, and neutral palettes
- **Spacing**: Consistent padding and margins (4px, 8px, 16px, etc.)
- **Border Radius**: Rounded corners (small, medium, large, full circle)
- **Typography**: Font sizes, weights, and line heights
- **Shadows**: Different shadow depths for elevation
- **Transitions**: Animation speeds and timing
- **Z-Index**: Layering order for overlapping elements

### 2. **Components** (The UI Elements)

Each component has multiple variants for different use cases:

#### **Modal/Dialog**
- Default, Small, Large, and Fullscreen sizes
- Includes backdrop, header, body, footer, and close button styles

#### **Select/Dropdown**
- Default, Small, and Large sizes
- Trigger button, dropdown menu, and option item styles
- Hover and selected states

#### **Badge**
- Default, Primary, Success, Warning, Error, Info variants
- Outline and Solid styles
- Perfect for status indicators and labels

#### **Tag**
- Similar to badges but with optional remove button
- Primary and Success color variants
- Removable variant for interactive tags

#### **Alert**
- Default, Success, Warning, Error, and Info types
- Includes icon, title, description, and close button
- Great for inline messages

#### **Notification (Toast)**
- Similar to alerts but for floating messages
- Multiple position options (top-right, top-left, bottom-right, etc.)
- Includes animations

#### **Loading**
- Spinner: Classic rotating circle
- Dots: Animated bouncing dots
- Bar: Progress bar with animation
- Small and Large size variants

#### **Skeleton**
- Default, Text, Title, Avatar, Image, and Card variants
- Used for loading placeholders
- Pulse animation included

#### **Tooltip**
- Default (dark) and Light variants
- Four positions: top, bottom, left, right
- Includes arrow pointer

#### **Checkbox**
- Default, Small, and Large sizes
- Hover, checked, and disabled states
- Includes checkmark styling

#### **Radio**
- Default, Small, and Large sizes
- Hover, checked, and disabled states
- Circular with center dot when selected

#### **Table**
- Default, Striped, Compact, and Bordered variants
- Header, body, and footer sections
- Row hover effects

## How to Use This

### Understanding the Syntax

Values that start with `$` are **references** to design tokens. For example:
- `"$colors.primary.500"` → refers to the primary blue color (#3b82f6)
- `"$spacing.4"` → refers to 16px spacing
- `"$borderRadius.md"` → refers to 8px border radius

### Example: Using a Button Color

```json
"backgroundColor": "$colors.primary.500"
```

This means: use the primary color at shade 500, which is defined in the tokens as `#3b82f6`.

### Example: Building a Modal

To create a modal, you would:
1. Look at `components.modal.variants.default`
2. Use the backdrop styles for the dark overlay
3. Use the container styles for the white dialog box
4. Use the header, body, and footer styles for the content sections

## Customization

You can easily customize this system by:
1. **Changing colors**: Modify the color palettes in the tokens section
2. **Adding variants**: Create new component variants by copying existing ones
3. **Adjusting spacing**: Change spacing values to make things tighter or more spacious
4. **Creating new components**: Follow the same structure as existing components

## Next Steps

When you're ready to provide your component code, I can:
1. Show you how to map this design system to your specific code
2. Generate CSS or styling code from these definitions
3. Create component examples using these styles
4. Help you extend or modify the system

## Notes

- All colors use a scale from 50 (lightest) to 900 (darkest)
- Spacing follows a 4px base unit system (multiples of 4)
- Animations are defined with keyframes that can be applied to components
- Z-index values ensure proper layering (tooltips appear above modals, etc.)

Feel free to ask me questions about any specific component or how to apply these styles to your code!
