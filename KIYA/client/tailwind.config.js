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
    fontSize: {
      // 35px headings for mobile and 40px for desktop
      "heading-mobile": ["35px", "50px"],
      "heading-desktop": ["40px", "60px"],
    },
    extend: {},
  },
  plugins: [],
};
