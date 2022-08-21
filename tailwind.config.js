/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/*"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#aa076b",
        darkBg: "#222222",
      },
    },
  },
  plugins: [],
};
