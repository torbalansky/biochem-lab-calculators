/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
      colors: {
        neonBlue: '#94faff',
        neonPink: '#f7a3f3',
        neonOrange: '#ff914d',
      },
    },
  },
  plugins: [],
}
