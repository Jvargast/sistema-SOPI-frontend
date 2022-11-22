/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        das: "url('/src/assets/background.png')",
        /* logo: "url('/src/assets/DAS.png')", */
      })
    },
    screens: {
      sm:"640px"
      //@media(min-width: 640px) { ... }
    }
  },
  plugins: [],
}
