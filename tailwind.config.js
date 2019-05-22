const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      padding: {
        '11': '2.75rem'
      },
      colors: {
        brand: { ...defaultTheme.colors.red }
      },
      opacity: {
        10: '.1'
      },
      boxShadow: theme => ({
        outline: `0 0 0 3px ${theme('colors.brand.500')}5c`
      })
    }
  },
  variants: {},
  plugins: []
}
