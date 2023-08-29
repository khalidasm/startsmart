/** @type {import('tailwindcss').Config} */
import formsPlugin from "@tailwindcss/forms";
import RTL from "tailwindcss-rtl";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        primary: "#b5da32",
        secondary: "#0d97ae",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [formsPlugin, RTL],
};
