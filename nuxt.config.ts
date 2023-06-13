// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~~/assets/css/main.css", "~~/assets/css/tailwind.css"],

  imports: {},

  modules: [
    [
      "@sidebase/nuxt-auth",
      {
        origin: process.env.REDIRECT_URI,
        enableGlobalAppMiddleware: true,
        defaultProvider: "auth0",
      },
    ],
    "@nuxtjs/tailwindcss",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          "defineStore",
          "acceptHMRUpdate",
          ["defineStore", "definePiniaStore"],
        ],
      },
    ],
  ],
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
    public: {
      REDIRECT_URI: process.env.REDIRECT_URI,
    },
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
