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
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/line-clamp'),
    // require("@tailwindcss/forms"),
  ],
  daisyui: {
    darkTheme: "light",
  },
}