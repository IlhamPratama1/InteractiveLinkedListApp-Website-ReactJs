module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '82': '20.5rem',
        '100': '27.5rem',
        '173': '73rem',
        'screen-xl': '120vw'
      },
      height: {
        '18': '4.5rem',
        '82': '22rem',
        '83': '23.5rem',
        '96': '28.625rem',
        '138': '38.5rem',
        'screen-lg': '92.5vh'
      },
      fontFamily: {
        'roboto': ['Roboto',],
      },
      colors: {
        'slate-gray': '#FAFAFA',
        'white-gray': '#FCFCFC',
        'cyan-light': '#6FFFE9',
        'cyan-dark': '#5BC0BE',
        'green-light': '#E2FFFB',
        'green-dark': '#9DD9D8',
        'blue-light': '#3A506B',
        'blue-dark': '#1C2541',
        'orange': '#F57359',
        'red': '#EE3625',
        'yellow': '#FFE779'
      },
      dropShadow: {
        '3xl': '0 16px 40px rgba(246, 250, 249, 1)',
        '4xl': '0 2px 40px rgba(217, 235, 232, 1)',
        '5xl': '0 2px 40px rgba(230, 230, 230, 1)',
        '6xl': '0 20px 16px rgba(233, 233, 233, 1)',
        '7xl': '0 4px 24px rgba(233, 233, 233, 1)',
        '8xl': '0 4px 10px rgba(244, 244, 244, 1)',
        '9xl': '0 20px 20px rgba(241, 241, 241, 1)',
      },
      animation: {
        fade: 'fadeIn 0.5s, fadeOut 0.5s 1.5s',
      },

      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        }
      }),
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    }
  },
  plugins: [],
}
