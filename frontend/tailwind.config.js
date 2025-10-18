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
          '25%': { transform: 'translate(0px, 40px)' }, // up & right
          '50%': { transform: 'translate(0px, 80px)' },     // back to baseline
          '75%': { transform: 'translate(0px, 120px)' }, // up & right again
          '100%': { transform: 'translate(120px, 0)' },
        },
      },
      animation: {
        bounceCustom: 'bounceCustom 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}