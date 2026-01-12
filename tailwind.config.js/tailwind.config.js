/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        monteverde: '#00A878',
        azulprofundo: '#005B96',
        grismet: '#4D4D4D',
        naranjavivo: '#F5A623',
        blancopuro: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
