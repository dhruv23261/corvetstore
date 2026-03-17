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
          light: '#F5F5F5',    // Off-white / Main background
          base: '#F0E6DB',     // Light beige / UI backgrounds
          accent: '#E6D5C5',   // Dusty beige / Borders, Secondary backgrounds
          dark: '#8B7874',     // Muted taupe / Text, Buttons, Accents
          text: '#4A3B39',     // Deeper shade of taupe for primary text (derived from #8B7874 for better contrast)
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
