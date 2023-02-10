import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "projects"
declare module "/Users/Daniel/Documents/GitHub/fungus/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}