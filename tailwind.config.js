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
    
    // require("@tailwindcss/forms"),
  ],
  daisyui: {
    themes: ["light", "dark"], // กำหนดธีมที่สามารถใช้ได้
    darkTheme: "light",       // บังคับให้ "light" เป็นค่าของ Dark Mode
  },
}