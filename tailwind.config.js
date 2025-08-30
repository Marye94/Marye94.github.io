module.exports = {
  content: ["./docs/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#2d3e50',
        secondary: '#3498db',
        success: '#2ecc71',
        content: '#2c3e50',
        'test-bg': '#f8f9fa'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Source Code Pro', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'progress': 'progress 1.5s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        progress: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        }
      }
    },
  },
  plugins: [],
}
