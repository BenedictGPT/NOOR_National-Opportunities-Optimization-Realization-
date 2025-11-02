# NOOR Developer Implementation Guide

This guide provides instructions for developers on how to implement the NOOR brand system using the provided CSS framework and other assets.

## 1. CSS Framework

The `noor-framework.css` file contains all the necessary CSS variables for colors and typography. Link this file in the `<head>` of your HTML documents:

```html
<link rel="stylesheet" href="path/to/noor-framework.css">
```

## 2. Color Usage

Use the CSS variables defined in the framework to apply colors. For example:

```css
.my-element {
  background-color: var(--noor-blue);
  color: var(--off-white);
}
```

## 3. Typography

The framework sets the base font styles for headings and body text. Use the appropriate HTML tags (`<h1>`, `<h2>`, `<body>`, etc.) to apply the styles. For specific typography styles, use the provided classes:

```html
<p class="body-large">This is a large body text.</p>
<p class="caption">This is a caption.</p>
```

## 4. Iconography

Icons are available in SVG format in the `/assets/icons/` directory. Use an `<img>` tag or an inline SVG to display icons. To control the color of the icons, use the `fill` property in your CSS:

```css
.my-icon {
  fill: var(--noor-blue);
}
```

## 5. RTL Support

To enable RTL support, add the `dir="rtl"` attribute to the `<html>` tag:

```html
<html dir="rtl">
```

The CSS framework will automatically adjust the layout and typography for RTL languages.

