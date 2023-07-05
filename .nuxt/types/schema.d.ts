import { NuxtModule } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["auth"]?: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["nuxt-config-schema"]?: typeof import("nuxt-config-schema").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@sidebase/nuxt-auth", NuxtConfig["auth"]] | ["@nuxtjs/tailwindcss", NuxtConfig["tailwindcss"]] | ["@pinia/nuxt", NuxtConfig["pinia"]] | ["nuxt-config-schema", NuxtConfig["nuxt-config-schema"]] | ["@nuxt/telemetry", NuxtConfig["telemetry"]])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   mongoUrl: string,

   clientId: string,

   clientSecret: string,

   issuer: string,

   domain: string,

   auth: {
      isEnabled: boolean,

      origin: any,

      basePath: string,

      trustHost: boolean,

      enableSessionRefreshPeriodically: boolean,

      enableSessionRefreshOnWindowFocus: boolean,

      enableGlobalAppMiddleware: boolean,

      defaultProvider: string,

      addDefaultCallbackUrl: boolean,

      globalMiddlewareOptions: {
         allow404WithoutAuth: boolean,

         addDefaultCallbackUrl: boolean,
      },

      isOriginSet: boolean,
   },
  }
  interface PublicRuntimeConfig {
   REDIRECT_URI: string,

   auth: {
      isEnabled: boolean,

      origin: any,

      basePath: string,

      trustHost: boolean,

      enableSessionRefreshPeriodically: boolean,

      enableSessionRefreshOnWindowFocus: boolean,

      enableGlobalAppMiddleware: boolean,

      defaultProvider: string,

      addDefaultCallbackUrl: boolean,

      globalMiddlewareOptions: {
         allow404WithoutAuth: boolean,

         addDefaultCallbackUrl: boolean,
      },
   },
  }
}