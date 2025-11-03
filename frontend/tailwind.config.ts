import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Federal Government Theme
        federal: {
          gold: "#D4A843",
          navy: "#1A3A5C",
          cream: "#F5F1E8",
        },
        // Individual/Citizens Theme
        individual: {
          red: "#CC0000",
          beige: "#D4A574",
          cream: "#F9F6F0",
        },
        // Institutional/Employers Theme
        institutional: {
          blue: "#2E5984",
          silver: "#8AA0B0",
          cream: "#F0F4F7",
        },
      },
      fontFamily: {
        // Federal fonts
        cairo: ["Cairo", "sans-serif"],
        noto: ["Noto Sans", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
        // Individual fonts
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
        crimson: ["Crimson Text", "serif"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "loading-bar": {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(250%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "loading-bar": "loading-bar 1.5s ease-in-out infinite",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
