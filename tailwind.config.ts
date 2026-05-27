import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}', './stores/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#171717',
        cloud: '#D1D1D1',
        line: '#E7E3DD',
        paper: '#FFFFFF',
        brand: {
          50: '#FFF2EA',
          100: '#FFE2D0',
          500: '#F36B21',
          600: '#D95113',
          700: '#A33D0E'
        },
        mint: {
          100: '#DDF7E8',
          600: '#168A4A'
        },
        amber: {
          100: '#FFF2CC',
          700: '#9A6700'
        },
        rose: {
          100: '#FFE4E6',
          700: '#BE123C'
        }
      },
      boxShadow: {
        soft: '0 18px 45px rgba(23, 23, 23, 0.08)',
        card: '0 8px 24px rgba(23, 23, 23, 0.06)'
      }
    }
  },
  plugins: []
};

export default config;
