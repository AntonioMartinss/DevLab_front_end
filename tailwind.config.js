/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx}",
    './components/**/*.{html,js,jsx}',
    './pages/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'JetBrains': ['JetBrains'], 
      },
      colors:{
        'dark-blue-gray': "#222831",
        'dark-slate-gray': '#31363F',
        'light-gray': '#EEEEEE'
      }
    },
  },
  plugins: [],
}
