/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6f4e37', // Elegant brown
          light: '#8b654b',
          dark: '#543b29',
        },
        secondary: {
          DEFAULT: '#e8c5c8', // Soft pastel pink
          light: '#f2dcdd',
          dark: '#cfadb0',
        },
        cream: {
          DEFAULT: '#faf6f0', // Luxury off-white/cream background
          dark: '#f0e6da', // Slightly darker cream for cards
        },
        mocha: '#4a3525',
        charcoal: '#222222',
        accent: '#d4af37', // Gold highlight
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(111, 78, 55, 0.12)',
        'premium-hover': '0 20px 40px -15px rgba(111, 78, 55, 0.2)',
      },
      borderRadius: {
        'premium': '20px',
      }
    },
  },
  plugins: [],
}
