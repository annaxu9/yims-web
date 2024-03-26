/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      'sports-night': ['SFSportsNight', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      content: ['before'],
      position: ['before'],
      inset: ['before'],
      transform: ['before'],
    },
  },
  plugins: [],
}

