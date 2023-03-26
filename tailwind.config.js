/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'toxicpurple' :  "#69369E",
        'navbar' : '#111111',
        'steam' : '#4a6d9a',
        'twitter' : '#00acee',
        'discord' : '#7289da',
        'twitch' : '#6441a4',
      }
    },
  },
  plugins: [],
}