/**
 * Federal Government Design System
 * Theme: Gold & Navy
 * Context: Government officials, federal agencies
 */

export const federalTheme = {
  name: 'Federal Government',
  slug: 'federal',
  
  colors: {
    // Primary - Gold
    primary: {
      50: '#FFFBF0',
      100: '#FFF7E0',
      200: '#FFEFC2',
      300: '#FFE7A3',
      400: '#FFDF85',
      500: '#D4A843', // Main gold
      600: '#B8923A',
      700: '#9C7C31',
      800: '#806628',
      900: '#64501F',
    },
    
    // Secondary - Navy
    secondary: {
      50: '#F0F4F8',
      100: '#E1E9F1',
      200: '#C3D3E3',
      300: '#A5BDD5',
      400: '#87A7C7',
      500: '#1A3A5C', // Main navy
      600: '#16324E',
      700: '#122A40',
      800: '#0E2232',
      900: '#0A1A24',
    },
    
    // Accent - White/Cream
    accent: {
      50: '#FFFFFF',
      100: '#FEFEFE',
      200: '#FCFCFC',
      300: '#FAF9F7',
      400: '#F8F7F5',
      500: '#F5F3F0',
      600: '#E8E6E3',
      700: '#DBD9D6',
      800: '#CECCC9',
      900: '#C1BFBC',
    },
    
    // Neutral - Grays
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    
    // Semantic colors
    success: '#2E7D32',
    warning: '#F57C00',
    error: '#C62828',
    info: '#1976D2',
  },
  
  typography: {
    fonts: {
      primary: '"Cairo", "Noto Sans Arabic", sans-serif',
      secondary: '"Noto Sans", system-ui, sans-serif',
      accent: '"Space Grotesk", "Inter", sans-serif',
      mono: '"JetBrains Mono", "Courier New", monospace',
    },
    
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
    },
    
    weights: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  },
  
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    11: '2.75rem',    // 44px
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    44: '11rem',      // 176px
    48: '12rem',      // 192px
    52: '13rem',      // 208px
    56: '14rem',      // 224px
    60: '15rem',      // 240px
    64: '16rem',      // 256px
    72: '18rem',      // 288px
    80: '20rem',      // 320px
    96: '24rem',      // 384px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #D4A843 0%, #1A3A5C 100%)',
    hero: 'linear-gradient(135deg, #1A3A5C 0%, #D4A843 50%, #1A3A5C 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(26,58,92,0.8) 100%)',
  },
};

export type FederalTheme = typeof federalTheme;

