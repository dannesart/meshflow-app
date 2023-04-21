/** @type {import('tailwindcss').Config} */
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
    extend: {},
  },
  plugins: [],
  safelist: [
    "safelisted",
    {
      pattern: /bg-(red|green|blue|purple|black|white)-(400)/,
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
