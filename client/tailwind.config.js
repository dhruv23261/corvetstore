/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Warm beige + taupe palette (matches provided screenshots)
        brand: {
          bg: '#F6EFE9',        // main page background
          section: '#EFE3DA',   // section background
          surface: '#FFFFFF',   // cards/nav surface
          tint: '#E7D6CB',      // subtle tinted surfaces
          border: '#DCC8BC',    // borders/dividers
          accent: '#8B776E',    // primary action / highlights
          accentDark: '#6E5B54',// hover/pressed
          text: '#3C2F2A',      // main text
          muted: '#6A5A53',     // secondary text
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
