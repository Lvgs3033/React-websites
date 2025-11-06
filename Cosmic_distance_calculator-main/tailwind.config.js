/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#EDC7B7',
        secondary: '#EEE2DC',
        accent: '#AC3B61',
        navy: '#123C69',
        gray: '#BAB2B5',
      },
    },
  },
  plugins: [],
};