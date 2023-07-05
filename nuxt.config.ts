// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~~/assets/css/main.css", "~~/assets/css/tailwind.css"],

  imports: {},

  modules: [
    [
      "@sidebase/nuxt-auth",
      {
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
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    issuer: process.env.AUTH0_ISSUER,
    domain: process.env.AUTH0_DOMAIN,
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
