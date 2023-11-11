import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["auth"]?: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@sidebase/nuxt-auth", Exclude<NuxtConfig["auth"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   REDIRECT_URI: string,

   mongoUrl: string,

   nextAuthSecret: string,

   auth0ClientId: string,

   auth0ClientSecret: string,

   auth0Issuer: string,

   domain: string,

   api: string,

   auth: {
      isEnabled: boolean,

      origin: any,

      basePath: string,

      trustHost: boolean,

      enableSessionRefreshPeriodically: boolean,

      enableSessionRefreshOnWindowFocus: boolean,

      enableGlobalAppMiddleware: boolean,

      defaultProvider: any,

      addDefaultCallbackUrl: boolean,

      globalMiddlewareOptions: {
         allow404WithoutAuth: boolean,

         addDefaultCallbackUrl: boolean,
      },

      provider: {
         type: string,

         defaultProvider: string,

         addDefaultCallbackUrl: boolean,
      },

      globalAppMiddleware: {
         isEnabled: boolean,

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

      defaultProvider: any,

      addDefaultCallbackUrl: boolean,

      globalMiddlewareOptions: {
         allow404WithoutAuth: boolean,

         addDefaultCallbackUrl: boolean,
      },

      provider: {
         type: string,

         defaultProvider: string,

         addDefaultCallbackUrl: boolean,
      },

      globalAppMiddleware: {
         isEnabled: boolean,

         addDefaultCallbackUrl: boolean,
      },
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }