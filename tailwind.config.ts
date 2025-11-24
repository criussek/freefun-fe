import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'walden-green': '#2d5016',
        'walden-dark': '#1a1a1a',
        'walden-gray': '#f5f5f5',
        'walden-text': '#333333',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      spacing: {
        'page': '3vw',
        'section': '80px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
