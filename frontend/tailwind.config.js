/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       keyframes: {
        bounceCustom: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(2px, 10px)' },     // back to baseline
        },
      },
      animation: {
        bounceCustom: 'bounceCustom 2s ease-in-out  infinite',
      },
    },
  },
  plugins: [],
}