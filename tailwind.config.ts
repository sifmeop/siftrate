import { nextui } from '@nextui-org/react'
import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: [
    './src/**/*.tsx',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#b93753',
        secondary: '#717794',
        gray: '#393b4a',
        red: '#FF4545',
        black: '#1e1e1e',
        box: '#111217',
        bgcolor: 'var(--bgcolor)'
      },
      fontFamily: {
        montserrat: ['Montserrat', ...fontFamily.sans]
      }
    },
    screens: {
      mobile: { max: '600px' }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
} satisfies Config
