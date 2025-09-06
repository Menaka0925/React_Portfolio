/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      keyframes: {
        walkstep: {
          '0%': { opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { opacity: 1 }, 
        },
      },
      animation: {
        walkstep: 'walkstep 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

