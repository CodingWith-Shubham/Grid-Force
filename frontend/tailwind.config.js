export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gaming: {
          dark: '#0a0e27',
          darker: '#050709',
          card: '#0f1419',
          border: '#1a202c',
          fire: '#ff6b35',
          fireAlt: '#ff8c42',
          red: '#d32f2f',
          neon: '#00ff88',
          cyan: '#00d9ff',
          purple: '#b024d9',
          gold: '#ffd700'
        },
        grid: {
          bg: '#0f1419',
          border: '#ff6b35',
          hover: '#1a202c',
          claimed: '#ff6b35'
        }
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        flicker: 'flicker 3s ease-in-out infinite',
        ripple: 'ripple 0.6s ease-out',
        shockwave: 'shockwave 0.8s ease-out',
        slideInUp: 'slideInUp 0.6s ease-out',
        fadeIn: 'fadeIn 0.8s ease-out',
        bounce: 'bounce 1s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 107, 53, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.8)' }
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 }
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(2)', opacity: 0 }
        },
        shockwave: {
          '0%': { transform: 'scale(0.8)', opacity: 1 },
          '100%': { transform: 'scale(1.2)', opacity: 0 }
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      },
      backdropFilter: {
        'glass': 'blur(10px)'
      },
      fontFamily: {
        gaming: ['Orbitron', 'Exo', 'Rajdhani', 'monospace']
      }
    }
  },
  plugins: []
}
