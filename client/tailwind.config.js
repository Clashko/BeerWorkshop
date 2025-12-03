import { mtConfig } from "@material-tailwind/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "t-sm": "0 -1px 2px 0 rgba(0, 0, 0, 0.05)",
        "t-md":
          "0 -4px 6px -px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "t-lg":
          "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "t-xl":
          "0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "t-2xl": "0 -25px 50px -12px rgba(0, 0, 0, 0.25)",
        "t-3xl": "0 -35px 60px -15px rgba(0, 0, 0, 0.3)",
        "b-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "b-md":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
        "b-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
        "b-xl":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04)",
        "b-2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "b-3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        "l-sm": "-1px 0 2px 0 rgba(0, 0, 0, 0.05)",
        "l-md":
          "-4px 0 6px -1px rgba(0, 0, 0, 0.1), 2px 0 4px -1px rgba(0, 0, 0, 0.06)",
        "l-lg":
          "-10px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -2px rgba(0, 0, 0, 0.05)",
        "l-xl":
          "-20px 0 25px -5px rgba(0, 0, 0, 0.1), 10px 0 10px -5px rgba( 0, 0, 0, 0.04)",
        "l-2xl": "-25px 0 50px -12px rgba(0, 0, 0, 0.25)",
        "l-3xl": "-35px 0 60px -15px rgba(0, 0, 0, 0.3)",
        "r-sm": "1px 0 2px 0 rgba(0, 0, 0, 0.05)",
        "r-md":
          "4px 0 6px -1px rgba(0, 0, 0, 0.1), -2px 0 4px -1px rgba(0, 0, 0, 0.06)",
        "r-lg":
          "10px 0 15px -3px rgba(0, 0, 0, 0.1), -4px 0 6px -2px rgba(0, 0, 0, 0.05)",
        "r-xl":
          "20px 0 25px -5px rgba(0, 0, 0, 0.1), -10px 0 10px -5px rgba(0, 0, 0, 0.04)",
        "r-2xl": "25px 0 50px -12px rgba(0, 0, 0, 0.25)",
        "r-3xl": "35px 0 60px -15px rgba(0, 0, 0, 0.3)",
        "all-sm": "0 0 2px 0 rgba(0, 0, 0, 0.05)",
        "all-md":
          "0 0 6px -1px rgba(0, 0, 0, 0.1), 0 0 4px -1px rgba(0, 0, 0, 0.06)",
        "all-lg":
          "0 0 15px -3px rgba(0, 0, 0, 0.1), 0 0 6px -2px rgba(0, 0, 0, 0.05)",
        "all-xl":
          "0 0 25px -5px rgba(0, 0, 0, 0.1), 0 0 10px -5px rgba(0, 0, 0, 0.04)",
        "all-2xl": "0 0 50px -12px rgba(0, 0, 0, 0.25)",
        "all-3xl": "0 0 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms"),
    mtConfig({
      colors: {
        // Светлая тема
        background: "#FFFFFF", // чистый белый фон
        foreground: "#0D3B66", // глубокий синий текст

        surface: {
          default: "#F2F2F2", // выраженные серые поверхности
          dark: "#E0E0E0",
          light: "#FAFAFA",
          foreground: "#0D3B66",
        },

        primary: {
          default: "#0D3B66",
          dark: "#082B4C",
          light: "#145DA0",
          foreground: "#FFFFFF",
        },

        secondary: {
          default: "#F4A300",
          dark: "#D48800",
          light: "#FFB700",
          foreground: "#1A1A1A",
        },
      },

      darkColors: {
        // Тёмная тема
        background: "#020B16", // максимально глубокий тёмно-синий
        foreground: "#95AFCF", // белый текст для контраста

        surface: {
          default: "#0A1624", // чуть светлее фона, но очень близко
          dark: "#081220", // почти сливается с фоном
          light: "#12263A", // слегка выделяется для карточек
          foreground: "#FFFFFF",
        },

        primary: {
          default: "#0D3B66", // фирменный глубокий синий
          dark: "#082B4C",
          light: "#145DA0",
          foreground: "#FFFFFF",
        },

        secondary: {
          default: "#F4A300", // акцентный жёлтый
          dark: "#D48800",
          light: "#FFB700",
          foreground: "#1A1A1A",
        },
      },

      // colors: {
      //   primary: {
      //     DEFAULT: "#0D3B66", // насыщенный синий
      //     light: "#145DA0",
      //     dark: "#082B4C",
      //   },
      //   accent: {
      //     DEFAULT: "#F4A300", // тёплый оранжевый
      //     light: "#FFB700",
      //     dark: "#D48800",
      //   },
      //   surface: {
      //     light: "#F9F9F9", // светлый фон
      //     dark: "#1A1A1A", // тёмный фон
      //   },
      //   text: {
      //     light: "#1A1A1A", // текст на светлой теме
      //     dark: "#F9F9F9", // текст на тёмной теме
      //   },
      // },
      // colors: {
      //   background: "#fafafa",
      //   foreground: "#546e7a",
      //   surface: {
      //     default: "#e6e6e6",
      //     dark: "#cccccc",
      //     light: "#fafafa",
      //     foreground: "#546e7a",
      //   },
      //   primary: {
      //     default: "#546e7a",
      //     dark: "#455a64",
      //     light: "#78909c",
      //     foreground: "#cfd8dc",
      //   },
      //   primary: {
      //     default: "#ff7806",
      //     dark: "#b35000",
      //     light: "#ff811a",
      //     foreground: "#c6d8d5",
      //   },
      // },
      // darkColors: {
      //   background: "#261E35",
      //   foreground: "#D8BCFF",
      //   surface: {
      //     default: "#3C354A",
      //     dark: "#cccccc",
      //     light: "#fafafa",
      //     foreground: "#FFFFFF",
      //   },
      //   primary: {
      //     default: "#546e7a",
      //     dark: "#455a64",
      //     light: "#78909c",
      //     foreground: "#cfd8dc",
      //   },
      //   primary: {
      //     default: "#ff7806",
      //     dark: "#b35000",
      //     light: "#ff811a",
      //     foreground: "#c6d8d5",
      //   },
      // },
    }),
  ],
};
