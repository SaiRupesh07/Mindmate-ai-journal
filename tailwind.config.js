/** @type {import('tailwindcss').Config} */
module.exports = {
  // ✅ Enable dark mode via class strategy (set <html class="dark">)
  darkMode: 'class',

  // ✅ Tailwind will scan these folders for class usage
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      // 🎨 Extend with CSS variables if using them for dark mode themes
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      zIndex: {
        60: '60', // 🟦 For floating ChatBot or layered modals
      },
    },
  },

  plugins: [],
};
