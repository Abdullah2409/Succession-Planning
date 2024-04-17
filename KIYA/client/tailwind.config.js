/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "600px",
      md: "800px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      alerta: ["Allerta", "sans-serif"],
    },
    extend: {
      padding: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
        sd: "46px", // used for side padding of every page
        tb: "50px", // used for top and bottom padding of every page
      },
      colors: {
        primary: "#73BEB7",
        secondary: "#F4978F",
      },
      fontSize: {
        // 35px headings for mobile and 40px for desktop
        "heading-mobile": ["35px", "50px"],
        "heading-desktop": ["40px", "60px"],
      },
    },
  },
  plugins: [],
};
