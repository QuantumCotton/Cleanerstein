/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cleanerstein Brand Colors
        'cleanerstein-blue': '#2563EB',
        'cleanerstein-blue-light': '#3B82F6',
        'cleanerstein-blue-dark': '#1E40AF',
        'cleanerstein-green': '#10B981',
        'cleanerstein-green-dark': '#059669',
        // Legacy aliases (for gradual migration)
        'esh-gold': '#2563EB',
        'esh-gold-light': '#3B82F6',
        'esh-gold-dark': '#1E40AF',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '0.3em',
      },
    },
  },
  plugins: [],
};
