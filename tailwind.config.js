module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        'roboto': ['Roboto',],
       },
       colors: {
        'cyan-light': '#6FFFE9',
        'green-light': '#E2FFFB',
        'cyan-dark': '#5BC0BE',
        'blue-light': '#3A506B',
        'blue-dark': '#1C2541'
      },
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    }
  },
  plugins: [],
}
