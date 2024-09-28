/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'pc': '1200px'
      },
      scrollbar: {
        hidden: 'hidden'
      }
    },
  },
  plugins: [
  ],
}

