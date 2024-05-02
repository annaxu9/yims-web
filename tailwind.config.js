/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sport': ['SFSportsNight', 'sans-serif'],
      },
      colors: {
        light: {
          primary_blue: '#4267E6',
          primary_yellow: '#FFD65F',
          neutral_blue: '#C0E1FF',
          neutral_grey: '#EEEEEE',
          accent_orange: '#F98030',
        },
      },
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

