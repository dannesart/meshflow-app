// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~~/assets/css/main.css", "~~/assets/css/tailwind.css"],

  imports: {},

  modules: [
    "v-wave/nuxt",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
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
  colorMode: {
    classSuffix: "",
  },
  supabase: {
    redirect: false,
    // redirectOptions: {
    //   login: "/log-in",
    //   callback: "/",
    // },
  },
  runtimeConfig: {
    REDIRECT_URI: process.env.REDIRECT_URL,
    BASE_URL: process.env.BASE_URL,
    ORIGIN: process.env.ORIGIN,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
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
