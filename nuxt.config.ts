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
  auth: {
    origin: "http://localhost:3000",
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
