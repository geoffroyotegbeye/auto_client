/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nouvelle palette
        'vm-dark': '#1a1a1f',          // Sombre doux (au lieu de #18171b)
        'vm-dark-soft': '#25252b',     // Sombre très doux pour cartes
        'vm-red': '#f82200',
        'vm-gray': '#54565c',
        'vm-white': '#ffffff',
        
        // Variantes pour dark mode
        'vm-dark-lighter': '#2f2f37',
        'vm-dark-card': '#25252b',
        'vm-red-light': '#ff4d2e',
        'vm-red-dark': '#d11d00',
        'vm-gray-light': '#8a8c92',
        'vm-gray-dark': '#3d3f44',
        
        // Variantes pour light mode
        'vm-light-bg': '#ffffff',
        'vm-light-card': '#f8f9fa',
        'vm-light-border': '#e9ecef',
        'vm-light-text': '#1a1a1f',
        'vm-light-muted': '#6c757d',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.3em',
        'widest-3': '0.4em',
      },
      animation: {
        'marquee': 'marquee-scroll 28s linear infinite',
        'float': 'float-gentle 6s ease-in-out infinite',
        'float-2': 'float-gentle-2 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        'hero-gradient': 'linear-gradient(135deg, #18171b 0%, #2a2930 40%, #18171b 100%)',
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}