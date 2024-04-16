/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      'sports-night': ['SFSportsNight', 'sans-serif'],
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif']
      },
      colors: {
        light: {
          primary: '#82AEF1',
          secondary: '#CBCBCB',
          accent: '#F7CC4F',
          background: '#A5C3F0',
          text: '#CBCBCB',
        },
        dark: {
          primary: '#3A58BD',
          secondary: '#82AEF1',
          accent: '#F7CC4F',
          background: '#333333',
          text: '#E0E0E0',
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

