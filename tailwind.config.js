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
        primary: "#4A4947",
        secondary: "ffffff",
      },
    },
  },
  plugins: [
    require('daisyui'),
    require("@tailwindcss/forms"),
  ],
}