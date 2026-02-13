/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mint-whisper': '#E0F2F1',
        'royal-amethyst': '#6A0DAD',
        'deep-amethyst': '#2E0A4E',
        'dark-bg': '#1A052E',
      },
      fontFamily: {
        'premium': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}