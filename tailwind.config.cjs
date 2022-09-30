/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazirmatn", "Arial"],
      },
      colors: {
        neutrals: {
          50: "#F8FAFC",
          100: "#DEE1E5",
          200: "#C4C8CD",
          300: "#AAAEB6",
          400: "#90959F",
          500: "#777C87",
          600: "#5D6370",
          700: "#434959",
          800: "#293041",
          900: "#0F172A",
        },
        primary: {
          700: "#086788",
          500: "#24C4F9",
        },
        secondary: {
          700: "#FAE475",
          500: "#FFEDC2",
        },
        success: "#60D394",
        warning: "#FF9B85",
        error: "#FF0000",
        shades: {
          0: "#FFFFFF",
          100: "#000000",
        },
        background: {
          50: "#EDF3F5",
          100: "#E4EEF2",
          300: "#C8DDE5",
          500: "#ADCCD7",
        },
      },
    },
  },
  plugins: [],
};
