/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: { 
      center: true, 
      padding: '1.25rem' 
    },
    extend: {
      colors: {
        'bg-deep': '#05070a',
        'brand-cyan': '#00d2ff',
        'brand-magenta': '#ff6b8a',
        'muted-300': '#94a3b8'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '100': '100',
      },
      boxShadow: {
        neon: '0 12px 30px rgba(0,210,255,0.07), inset 0 -6px 30px rgba(123,107,255,0.03)',
      },
      keyframes: {
        float: { 
          '0%': { transform: 'translateY(0)' }, 
          '50%': { transform: 'translateY(-8px)' }, 
          '100%': { transform: 'translateY(0)' } 
        },
        glow: { 
          '0%': { boxShadow: '0 0 0 rgba(0,0,0,0)' }, 
          '50%': { boxShadow: '0 20px 40px rgba(0,210,255,0.06)' }, 
          '100%': { boxShadow: '0 0 0 rgba(0,0,0,0)' } 
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        glow: 'glow 8s ease-in-out infinite'
      }
    }
  },
  plugins: [],
}

