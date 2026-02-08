import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      backgroundImage: {
        footerBg: 'url(../src/assets/Union.jpg)',
      },
      animation: {
        beat: 'beat 0.7s infinite ease-in-out',
      },
      keyframes: {
        beat: {
          '0%, 100%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      colors: {
        primary: {
          900: 'var(--primary-900)',
          800: 'var(--primary-800)',
          700: 'var(--primary-700)',
          600: 'var(--primary-600)',
          500: 'var(--primary-500)',
          400: 'var(--primary-400)',
          300: 'var(--primary-300)',
          200: 'var(--primary-200)',
          100: 'var(--primary-100)',
          50: 'var(--primary-50)',
        },
        secondary: {
          900: 'var(--secondary-900)',
          800: 'var(--secondary-800)',
          700: 'var(--secondary-700)',
          600: 'var(--secondary-600)',
          500: 'var(--secondary-500)',
          400: 'var(--secondary-400)',
          300: 'var(--secondary-300)',
          200: 'var(--secondary-200)',
          100: 'var(--secondary-100)',
          50: 'var(--secondary-50)',
        },
        neutral: {
          900: 'var(--neutral-900)',
          800: 'var(--neutral-800)',
          700: 'var(--neutral-700)',
          600: 'var(--neutral-600)',
          500: 'var(--neutral-500)',
          400: 'var(--neutral-400)',
          300: 'var(--neutral-300)',
          200: 'var(--neutral-200)',
          100: 'var(--neutral-100)',
          50: 'var(--neutral-50)',
        },
        error: {
          900: 'var(--error-900)',
          800: 'var(--error-800)',
          700: 'var(--error-700)',
          600: 'var(--error-600)',
          500: 'var(--error-500)',
          400: 'var(--error-400)',
          300: 'var(--error-300)',
          200: 'var(--error-200)',
          100: 'var(--error-100)',
          50: 'var(--error-50)',
        },
        warning: {
          900: 'var(--warning-900)',
          800: 'var(--warning-800)',
          700: 'var(--warning-700)',
          600: 'var(--warning-600)',
          500: 'var(--warning-500)',
          400: 'var(--warning-400)',
          300: 'var(--warning-300)',
          200: 'var(--warning-200)',
          100: 'var(--warning-100)',
          50: 'var(--warning-50)',
        },
        success: {
          900: 'var(--success-900)',
          800: 'var(--success-800)',
          700: 'var(--success-700)',
          600: 'var(--success-600)',
          500: 'var(--success-500)',
          400: 'var(--success-400)',
          300: 'var(--success-300)',
          200: 'var(--success-200)',
          100: 'var(--success-100)',
          50: 'var(--success-50)',
        },
      },

      borderWidth: {
        sm: '1.5px',
      },
      fontSize: {
        '2xs': '10px',
        xs: '12px',
        sm: '14px',
        base: '1rem',
        lg: '16px',
        xl: '18px',
        '2xl': '20px',
      },
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
      },
      borderRadius: {
        none: '0',
        xs: '4px',
        sm: '6px',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        iran: ['IranSans', 'sans-serif'],
      },
    },
  },
}
export default config
