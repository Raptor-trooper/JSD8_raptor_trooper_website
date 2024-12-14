/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        maitree: ['Maitree', 'serif'],
      },
      colors: {
        autofillBg: "#ffffff",
        autofillText: "#000000",
      },
    },
  },
  plugins: [
    require('daisyui'),
    // require("@tailwindcss/forms"),
  ],
}