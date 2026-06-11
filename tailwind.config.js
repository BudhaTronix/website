
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
