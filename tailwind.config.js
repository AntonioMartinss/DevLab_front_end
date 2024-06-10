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
        'background': "#222328",
        'deep-black': '#191B1F',
        'dark-slate-gray': '#31363F',
        'sky-blue': '#91D2F2',
        'text': '#F5F5F5',
        'text-dark': '#2D2E34'
      }
    },
  },
  plugins: [],
}
