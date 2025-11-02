/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Federal Government Theme - Gold & Navy
        primary: {
          50: '#FFFBF0',
          100: '#FFF7E0',
          200: '#FFEFC2',
          300: '#FFE7A3',
          400: '#FFDF85',
          500: '#D4A843',
          600: '#B8923A',
          700: '#9C7C31',
          800: '#806628',
          900: '#64501F',
        },
        secondary: {
          50: '#F0F4F8',
          100: '#E1E9F1',
          200: '#C3D3E3',
          300: '#A5BDD5',
          400: '#87A7C7',
          500: '#1A3A5C',
          600: '#16324E',
          700: '#122A40',
          800: '#0E2232',
          900: '#0A1A24',
        },
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
        // Semantic colors
        success: {
          DEFAULT: '#2E7D32',
          light: '#66BB6A',
          dark: '#1B5E20',
        },
        warning: {
          DEFAULT: '#F57C00',
          light: '#FF9800',
          dark: '#E65100',
        },
        error: {
          DEFAULT: '#C62828',
          light: '#EF5350',
          dark: '#B71C1C',
        },
        info: {
          DEFAULT: '#1976D2',
          light: '#42A5F5',
          dark: '#0D47A1',
        },
      },
      fontFamily: {
        primary: ['"Cairo"', '"Noto Sans Arabic"', 'sans-serif'],
        secondary: ['"Noto Sans"', 'system-ui', 'sans-serif'],
        accent: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #D4A843 0%, #1A3A5C 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1A3A5C 0%, #D4A843 50%, #1A3A5C 100%)',
        'gradient-overlay': 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(26,58,92,0.8) 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

