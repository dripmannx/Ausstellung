/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00584d",
        secondary: "#ffffff",
        accent: "#C40F51",
        danger: "#ff0000",
        warning: "#ffcc00",
        base: {
          dark: "#9ca3af",
          light: "#1f2937",
        },

        dark: {
          primary: "#222222 ",
          secondary: "#1E1E1E",
          text: { hover: "#e5e7eb", base: "#9ca3af" },
        },
        light: {
          primary: "#ffffff ",
          secondary: "#ECEFF1",
          text: "#1f2937",
        },
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
};
