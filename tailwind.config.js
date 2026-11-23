/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#07080B',
        abyss: '#0D1017',
        surface: '#131822',
        surfaceLight: '#1C2333',
        gold: {
          light: '#F5E6BE',
          DEFAULT: '#D4AF37',
          dark: '#997D21',
        },
        titanium: {
          light: '#F8FAFC',
          DEFAULT: '#E2E8F0',
          dark: '#64748B',
        },
        breguet: '#38BDF8',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.25em',
        astral: '.4em',
      },
    },
  },
  plugins: [],
}
