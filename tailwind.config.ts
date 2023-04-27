import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#1E1E1E',
        red: '#FF4545'
      }
    }
  },
  plugins: []
} satisfies Config
