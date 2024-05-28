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
        'mid-night': "#27374D",
        'slate-gray': '#526D82'
      }
    },
  },
  plugins: [],
}
