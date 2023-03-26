/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'toxicpurple' :  "rgb(147 51 234)",
      }
    },
  },
  plugins: [],
}