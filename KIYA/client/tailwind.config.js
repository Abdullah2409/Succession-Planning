/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: "#73BEB7",
      secondary: "#F4978F",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      alerta: ["Alerta", "sans-serif"],
    },
    padding: {
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
      sd: "46px", // used for side padding of every page
    },
    extend: {},
  },
  plugins: [],
};
