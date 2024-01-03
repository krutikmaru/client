/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-primary": "#121316",
        "black-secondary": "#434343",
        "blue-button": "#0d99ff",
        "black-navbar": "#19191c",
        "black-menu-item-text": "#767575",
        "black-menu-item-hover": "#1f1f21",
        "display-pink": "#CB6CE6",
        "display-green": "#8eff38",
        "display-blue": "#0CC0DF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
