/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        sage: {
          50:  '#f4f7f4',
          100: '#e6ede6',
          200: '#cddccd',
          300: '#a9c4a9',
          400: '#7da67d',
          500: '#5a8a5a',
          600: '#456e45',
          700: '#385838',
          800: '#2e472e',
          900: '#273b27',
        },
        lavender: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
        },
        cream: {
          50:  '#fefdf8',
          100: '#fdf9ed',
          200: '#faf0d0',
          300: '#f5e4a8',
        },
      },
      animation: {
        'breathe-in':  'breatheIn 4s ease-in-out infinite alternate',
        'breathe-out': 'breatheOut 4s ease-in-out infinite alternate',
        'fade-in':     'fadeIn 0.3s ease-out',
        'slide-up':    'slideUp 0.3s ease-out',
      },
      keyframes: {
        breatheIn: {
          '0%':   { transform: 'scale(0.85)', opacity: '0.6' },
          '100%': { transform: 'scale(1.15)', opacity: '1'   },
        },
        breatheOut: {
          '0%':   { transform: 'scale(1.15)', opacity: '1'   },
          '100%': { transform: 'scale(0.85)', opacity: '0.6' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
        },
      },
      boxShadow: {
        soft:   '0 2px 16px 0 rgba(0,0,0,0.06)',
        softer: '0 1px 8px 0  rgba(0,0,0,0.04)',
        card:   '0 4px 24px 0 rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
}
