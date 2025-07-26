/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Couleurs inspirées du Niger
        sand: {
          50: '#fefcf3',
          100: '#fef7e6',
          200: '#fcecbf',
          300: '#f9dc99',
          400: '#f4c14c',
          500: '#f0a500',
          600: '#d69400',
          700: '#b37c00',
          800: '#8f6400',
          900: '#755100',
        },
        sahara: {
          50: '#faf8f3',
          100: '#f5f0e6',
          200: '#e6d9bf',
          300: '#d7c299',
          400: '#b8924c',
          500: '#996200',
          600: '#8a5800',
          700: '#734a00',
          800: '#5c3b00',
          900: '#4b3100',
        },
        niger: {
          50: '#f0f9f0',
          100: '#e1f2e1',
          200: '#c3e6c3',
          300: '#a4d9a4',
          400: '#68c068',
          500: '#2ca72c',
          600: '#279627',
          700: '#207e20',
          800: '#1a651a',
          900: '#155315',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};