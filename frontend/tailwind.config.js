/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
      },
      colors: {
        background: '#0E0E10',
        foreground: '#ffffff',
        card: {
          DEFAULT: '#1A1A2E',
          foreground: '#ffffff',
        },
        popover: {
          DEFAULT: '#1A1A2E',
          foreground: '#ffffff',
        },
        primary: {
          DEFAULT: '#F4258C',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#00FF94',
          foreground: '#0E0E10',
        },
        accent: {
          DEFAULT: '#BFFF00',
          foreground: '#0E0E10',
        },
        destructive: {
          DEFAULT: '#FF3333',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#2A2A3E',
          foreground: '#888899',
        },
        border: '#2A2A3E',
        input: '#2A2A3E',
        ring: '#F4258C',
        'panel-dark': '#12121A',
        'user-lime': '#BFFF00',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
