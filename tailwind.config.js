export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Base palette colors
        'space-cadet': '#2e294e',
        'fairy-tale': '#3c82f6',
        lilac: '#3c82f6',
        amethyst: '#8661c1',
        charcoal: '#4b5267',

        // Semantic color system
        primary: '#0c0c0cf2',
        accent: '#3c82f6',
        surface: '#3c82f6',
        muted: '#8661c1',

        // Light theme semantic colors
        'bg-primary': '#ffffff',
        'bg-secondary': '#f8f9fa',
        'text-primary': '#000000',
        'text-secondary': '#666666',
        'text-muted': '#999999',
        'border-color': '#e5e7eb',

        // Dark theme semantic colors
        'dark-bg-primary': '#000000',
        'dark-bg-secondary': '#1a1a1a',
        'dark-text-primary': '#ffffff',
        'dark-text-secondary': '#cccccc',
        'dark-text-muted': '#999999',
        'dark-border-color': '#333333',
      },
      fontFamily: {
        sans: [
          'Calibre',
          'Inter',
          'San Francisco',
          'SF Pro Text',
          '-apple-system',
          'system-ui',
          'sans-serif',
        ],
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        xs: '12px',
        sm: '13px',
        base: '14px',
        lg: '16px',
        xl: '18px',
        '2xl': '20px',
        '3xl': '22px',
        '4xl': '24px',
        '5xl': '32px',
        '6xl': '48px',
        '7xl': '80px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
