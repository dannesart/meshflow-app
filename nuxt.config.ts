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
    provider: {
      type: "authjs",
      defaultProvider: "auth0",
      addDefaultCallbackUrl: true,
    },
    origin: process.env.ORIGIN,
    globalAppMiddleware: {
      isEnabled: true,
      addDefaultCallbackUrl: true,
    },
  },
  runtimeConfig: {
    REDIRECT_URI: process.env.REDIRECT_URI,
    mongoUrl: process.env.MONGO_URL,
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    auth0ClientId: process.env.AUTH0_CLIENT_ID,
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
    auth0Issuer: process.env.AUTH0_ISSUER,
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
