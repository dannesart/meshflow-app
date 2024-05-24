/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./composables/**/*.ts",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  mode: "aot",
  theme: {
    colors: {
      primary: colors.cyan,
      secondary: colors.amber,
      amber: colors.amber,
      black: colors.black,
      white: colors.white,
      blue: colors.blue,
      indigo: colors.indigo,
      pink: colors.pink,
      sky: colors.sky,
      gray: colors.gray,
      slate: colors.slate,
    },
    extend: {
      fontFamily: {
        Kodchasan: ["'Kodchasan'", "sans-serif"],
        Rounded: ["'M PLUS Rounded 1c'", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
  safelist: [
    "safelisted",
    {
      pattern:
        /bg-(red|emerald|cyan|pink|purple|white|sky|indigo)-(400|500|300|200|600|800|950)/,
    },
    {
      pattern: /bg-(black)/,
    },
    {
      pattern: /p-(1|2|3|4|6|10)/,
    },
    {
      pattern: /rounded-(sm|md|lg|xl|2xl|full)/,
    },
    {
      pattern: /w-(1\/2|full|1\/3|1\/4)/,
    },
    {
      pattern: /(flex|block|inline-flex|grid)/,
    },
  ],
};
