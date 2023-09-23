import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend:{
      animation:{
        scale: "scale 2s linear infinite forwards",
      },
      keyframes:{
          scale: {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.25)' },
            '100%': { transform: 'scale(1)' },
          }
      }
    }
  },
  plugins: [],
}
export default config
