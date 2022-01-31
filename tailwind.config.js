module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '7xl': '85rem',
       },
       fontFamily: {
        'playfair': ['"Playfair Display"',],
        'source': ['"Source Sans Pro"'],
       },
       colors: {
         'black-main': '#000000',
         'black-second': '#141414',
         'black-third': '#1B1B1B',
         'white-main': '#FFFFFF',
         'white-second': '#F3F3F3',
         'white-third': '#E1E1E1',
         'orange-main': '#F4A03B',
         'yellow-main': '#F7D439',
         'yellow-second' : '#FDE16C',
         'purple-main' : '#8424BD',
         'purple-second': '#CB9CE0',
         'purple-third': '#E2C5ED',
       },
       width: {
         '84': '28rem',
         '96': '36rem',
         '120': '125rem',
       },
       fontSize: {
         'xxs': '0.65rem',
         '4xl': '2.4rem',
        }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'orange': '#F4A03B',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'yellow': '#F7D439',
    })
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    }
  },
  plugins: [],
}
