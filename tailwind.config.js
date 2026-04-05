/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg:      '#FAF7F2',
        bg2:     '#F3EFEA',
        bg3:     '#FFFFFF',
        orange:  '#FF6A00',
        purple:  '#4B3F72',
        ink:     '#1A1A1A',
        muted:   '#6B6B6B',
        glass:   '#FFFFFF',
        'glass-border': 'rgba(75,63,114,0.10)',
        spotify: '#1DB954',
      },
      backgroundImage: {
        'grad-main':    'linear-gradient(135deg, #FF6A00, #FF8C3A)',
        'grad-hot':     'linear-gradient(135deg, #FF6A00, #FF8C3A)',
        'grad-electric':'linear-gradient(135deg, #FF6A00, #FF8C3A)',
        'grad-cyan':    'linear-gradient(135deg, #4B3F72, #6B5FA8)',
        'grad-spotify': 'linear-gradient(135deg, #1DB954, #00a846)',
        'hero-glow':    'radial-gradient(ellipse at center, rgba(255,106,0,0.10) 0%, transparent 65%)',
      },
      animation: {
        'float':       'float 8s ease-in-out infinite',
        'float-slow':  'float 12s ease-in-out infinite reverse',
        'pulse-glow':  'pulseGlow 2.5s ease-in-out infinite',
        'fade-up':     'fadeUp 0.7s ease forwards',
        'ticker':      'ticker 30s linear infinite',
        'spin-slow':   'spin 20s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float:      { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-24px)' } },
        pulseGlow:  { '0%,100%':{ boxShadow:'0 4px 20px rgba(255,106,0,0.28)' }, '50%':{ boxShadow:'0 8px 40px rgba(255,106,0,0.45)' } },
        fadeUp:     { from:{ opacity:'0', transform:'translateY(32px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        ticker:     { '0%':{ transform:'translateX(0)' }, '100%':{ transform:'translateX(-50%)' } },
        bounceSoft: { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-6px)' } },
      },
      boxShadow: {
        'glow-orange': '0 4px 20px rgba(255,106,0,0.28)',
        'glow-green':  '0 4px 20px rgba(29,185,84,0.25)',
      },
    },
  },
  plugins: [],
}
