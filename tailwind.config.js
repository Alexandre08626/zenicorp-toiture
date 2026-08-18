/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        zenicorp: {
          black: '#000000',
          silver: '#C0C0C0',
          gold: '#991B1B',
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