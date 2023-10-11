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
    origin: process.env.ORIGIN || "http://localhost:3000",
    enableGlobalAppMiddleware: true,
    defaultProvider: "auth0",
  },
  runtimeConfig: {
    REDIRECT_URI: process.env.REDIRECT_URI,
    mongoUrl: process.env.MONGO_URL,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    issuer: process.env.AUTH0_ISSUER,
    domain: process.env.AUTH0_DOMAIN,
    api: process.env.API,
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
