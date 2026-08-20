/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        zenicorp: {
          // Core Brand Colors - Ultra Premium
          black: '#0A0A0A',
          white: '#FEFEFE',
          gold: {
            50: '#FFFDF7',
            100: '#FEF9E7',
            200: '#FDF2C7',
            300: '#FCE96A',
            400: '#FADC12',
            500: '#D4AF37', // Original Gold
            600: '#B8941F',
            700: '#9C7A0A',
            800: '#7D6208',
            900: '#654F07',
            950: '#3D2F04',
          },
          // Toiture Theme - Premium Red
          red: {
            50: '#FEF2F2',
            100: '#FEE2E2',
            200: '#FECACA',
            300: '#FCA5A5',
            400: '#F87171',
            500: '#991B1B', // Theme Principal - Rouge Sécurité
            600: '#DC2626',
            700: '#B91C1C',
            800: '#991B1B',
            900: '#7F1D1D',
            950: '#450A0A',
          },
          // Modern Grays
          gray: {
            50: '#FAFAFA',
            100: '#F4F4F5',
            200: '#E4E4E7',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
            950: '#030712',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-playfair)', 'serif'],
        mono: ['var(--font-mono)', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'roof-gradient': 'linear-gradient(135deg, #991B1B 0%, #DC2626 50%, #991B1B 100%)',
        'premium-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F4E09C 50%, #D4AF37 100%)',
        'security-gradient': 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 50%, #DC2626 100%)',
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'roof': '0 10px 25px -3px rgba(153, 27, 27, 0.1), 0 4px 6px -2px rgba(153, 27, 27, 0.05)',
        'glow-red': '0 0 20px rgba(153, 27, 27, 0.3)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-roof': 'pulseRoof 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'urgent': 'urgent 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseRoof: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        urgent: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}