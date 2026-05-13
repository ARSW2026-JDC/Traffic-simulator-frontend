/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#FFFFFF',
        card: '#f1e9e1',
        border: '#b39c6c',
        muted: '#64748b',
        dark: {
          surface: '#1A1A1A',
          card: '#2D2D2D',
          border: '#4A4A4A',
          muted: '#94A3B8',
        },
      },
    },
  },
  plugins: [],
};
