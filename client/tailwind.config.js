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
        // New Palette requested by user
        custom: {
          light: '#FFF8F6',    // Warm white / Main background
          base: '#FFF0EC',     // Light peach / UI backgrounds
          accent: '#F2C4C8',   // Light pink / Borders, Secondary backgrounds
          dark: '#D4868C',     // Soft rose / Buttons, Accents
          text: '#5C3D42',     // Deep rose / Primary text
        }
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
