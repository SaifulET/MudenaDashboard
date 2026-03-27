/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF0099",
        "primary-dark": "#CC007A",
        "primary-soft": "#FFF0F8",
      },
    },
  },
  plugins: [],
}
