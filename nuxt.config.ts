// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~~/assets/css/main.css", "~~/assets/css/tailwind.css"],
  imports: {},

  modules: [
    "@sidebase/nuxt-auth",
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
    public: {
      REDIRECT_URI: process.env.REDIRECT_URI,
    },
  },
  auth: {
    origin: process.env.REDIRECT_URI,
    enableGlobalAppMiddleware: true,
    defaultProvider: "auth0",
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
