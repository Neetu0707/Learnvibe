/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['"Comfortaa"', "cursive"], // Add Comfortaa here
      },
      screens: {
        'xs': '480px', // Extra small screens (mobile)
        'sm': '640px', // Small screens (mobile tablets)
        'md': '768px', // Medium screens (tablets)
        'lg': '1024px', // Large screens (desktops)
        'xl': '1280px', // Extra large screens (large desktops)
        '2xl': '1536px', // 2x extra large screens (large monitors)
      },
    },
  },
  plugins: [],
}
