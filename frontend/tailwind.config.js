/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'forest-green-600': '#228B22', // Dark forest green
        'forest-green-700': '#1E8A1E', // Slightly lighter forest green
      },
    },
  },
  plugins: [],
};
