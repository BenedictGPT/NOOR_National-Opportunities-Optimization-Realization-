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
        // NOOR Brand Colors - Layer 1 (Individual)
        'noor-l1': {
          primary: '#1E3A8A',    // Deep Blue
          secondary: '#3B82F6',  // Sky Blue
          accent: '#FBBF24',     // Amber
          text: '#1F2937',       // Dark Gray
          bg: '#F9FAFB',         // Light Gray
        },
        // Layer 2 (Institutional)
        'noor-l2': {
          primary: '#047857',    // Emerald
          secondary: '#10B981',  // Green
          accent: '#F59E0B',     // Orange
          text: '#1F2937',
          bg: '#F0FDF4',         // Light Green
        },
        // Layer 3 (Federal)
        'noor-l3': {
          primary: '#7C3AED',    // Purple
          secondary: '#A78BFA',  // Light Purple
          accent: '#EC4899',     // Pink
          text: '#1F2937',
          bg: '#FAF5FF',         // Light Purple
        },
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        // English fonts
        'mono': ['Space Mono', 'monospace'],
        'sans': ['Hammersmith One', 'sans-serif'],
        // Arabic fonts
        'arabic': ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'noor': '0 4px 6px -1px rgba(30, 58, 138, 0.1), 0 2px 4px -1px rgba(30, 58, 138, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  // RTL support
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

