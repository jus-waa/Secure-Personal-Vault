/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Verdana', 'sans-serif'],
      },
      colors: {
        navlight: '#595959',
        }
    },
  },
  plugins: [],
}