/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        zenicorp: {
          black: '#000000',
          silver: '#C0C0C0',
          gold: '#C2410C',
          goldLight: '#F97316',
          goldDark: '#9A3412',
          white: '#FFFFFF',
          darkGray: '#1A1A1A',
          mediumGray: '#333333',
          lightGray: '#F5F5F5',
          border: '#E0E0E0',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}