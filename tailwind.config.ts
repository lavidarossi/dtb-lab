import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        base: '#1b1f29',
        surface: '#373f52',
        'surface-2': '#2a3040',
        accent: '#34F3FF',
        'accent-dim': '#44ACCA',
        cream: '#f0e8d0',
        'cream-dim': '#c8b99a',
        status: '#34F3FF',
        'status-dim': '#44ACCA',
        border: '#2e3547',
      },
      fontFamily: {
        mono: ['var(--font-space-mono)', 'Space Mono', 'monospace'],
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem,8vw,7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem,5vw,4.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem,3.5vw,3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        blink: 'blink 1s step-end infinite',
        'scan-line': 'scan-line 6s linear infinite',
        ticker: 'ticker 30s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'blueprint-grid':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23ffffff08' stroke-width='0.5'/%3E%3C/svg%3E\")",
        'dot-grid':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23ffffff10'/%3E%3C/svg%3E\")",
        'scanlines':
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
      },
      boxShadow: {
        'glow-accent': '0 0 20px rgba(52,243,255,0.3), 0 0 60px rgba(52,243,255,0.12)',
        'glow-status': '0 0 20px rgba(52,243,255,0.35)',
        'glow-cream': '0 0 30px rgba(240,232,208,0.15)',
        'crt': 'inset 0 0 60px rgba(0,0,0,0.5), 0 0 40px rgba(52,243,255,0.15)',
      },
      transitionTimingFunction: {
        'lab': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce-lab': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'sharp': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
