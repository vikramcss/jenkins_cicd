const colors = require('tailwindcss/colors')

// tailwind.config.cjs
module.exports = {
  mode: 'jit',
  // you dont need `purge: enabled: production` because you are using jit
  purge: [
    "./src/**/*.svelte",
    "./src/**/*.html",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',      // => @media (min-width: 640px) { ... }
      'md': '768px',      // => @media (min-width: 768px) { ... }
      'lg': '1024px',     // => @media (min-width: 1024px) { ... }
      'xl': '1280px',     // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',    // => @media (min-width: 1536px) { ... }
    },
    
    colors: {
      black: colors.black,
      white: colors.white,
      rose: colors.rose,
      pink: colors.pink,
      fuchsia: colors.fuchsia,
      purple: colors.purple,
      violet: colors.violet,
      indigo: colors.indigo,
      blue: colors.blue, // colors.lightBlue,
      cyan: colors.cyan,
      teal: colors.teal,
      emerald: colors.emerald,
      green: colors.green,
      lime: colors.lime,
      yellow: colors.yellow,
      amber: colors.amber,
      orange: colors.orange,
      red: colors.red,
      gray: colors.gray, // warmGray, trueGray, coolGray, blueGray
    },
    extend: {
      colors: {
        lemon: {
          '50': '#fbfaf3',
          '100': '#f8f0b3',
          '200': '#f0df72',
          '300': '#d8bc43',
          '400': '#b39222',
          '500': '#917410',
          '600': '#755a0a',
          '700': '#59440a',
          '800': '#3c2e09',
          '900': '#291c07',
        },
        navy: {
          '50': '#f5f8f9',
          '100': '#e1f1f9',
          '200': '#bee0f2',
          '300': '#8dc0df',
          '400': '#589bc6',
          '500': '#427aae',
          '600': '#365f93',
          '700': '#2c4772',
          '800': '#1f3050',
          '900': '#131d34',
        },
        blue: {
          '50': '#f6f9fb',
          '100': '#e3f0fd',
          '200': '#c5d9fa',
          '300': '#9db5f3',
          '400': '#798eea',
          '500': '#6269e3',
          '600': '#514dd6',
          '700': '#3e39b6',
          '800': '#3301a6',
          '900': '#181956',
        },
        // orange: {
        //   '50' : '#ffba46',
        //   '100': '#fe9a0d',
        //   '200': '#ffa632',
        //   '300': '#ff9c28',
        //   '400': '#fb921e',
        //   '500': '#f18814',
        //   '600': '#e77e0a',
        //   '700': '#dd7400',
        //   '800': '#d36a00',
        //   '900': '#c96000'
        // },
        'orange': {
          '50': '#fef9ee',
          '100': '#fef2d6',
          '200': '#fbe0ad',
          '300': '#f9c978',
          '400': '#f5a842',
          '500': '#f18813',
          '600': '#e37213',
          '700': '#bc5712',
          '800': '#964516',
          '900': '#793b15',
      },
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
  corePlugins: {
    outline: false,
  }
}