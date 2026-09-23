/** @type {import('tailwindcss').Config} */
// Système « chantier numérique » partagé avec zeniva.ca.
// La couleur d'accent de la division vient de la variable CSS --accent (posée dans layout.tsx).
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        z: {
          void: '#07090E',
          noir: '#05070B',
          surface: '#0C111B',
          card: '#0E1524',
          text: '#EDF2FA',
          dim: '#A3B0C6',
          faint: '#6B7A93',
          cyan: '#3CE1FF',
          blue: '#4696FF',
          safety: '#FF6B1A',
          amber: '#FFB020',
        },
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        drift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '100%': { transform: 'translate3d(60px,40px,0) scale(1.12)' },
        },
        'dot-pulse': {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.8)' },
        },
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'none' } },
        pop: { '0%': { transform: 'scale(0.6)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        drift: 'drift 18s ease-in-out infinite alternate',
        'dot-pulse': 'dot-pulse 1.8s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both',
        pop: 'pop 0.45s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};
