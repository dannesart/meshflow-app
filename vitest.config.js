import vuetify from "vite-plugin-vuetify";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

const r = (p) => resolve(__dirname, p);

export default {
  root: ".",
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vuex",
        "@vueuse/core",
        "@vueuse/head",
        "vitest",
      ],
      resolvers: [ElementPlusResolver()],
      dirs: [
        "components",
        "composables",
        "components/ui",
        "components/modules",
      ],
    }),
    Components({
      dirs: [
        "components",
        "composables",
        "components/ui",
        "components/modules",
      ],
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "setup-tests.ts",
  },
  resolve: {
    alias: {
      "~~": r("."),
      "~~/": r("./"),
      "@@": r("."),
      "@@/": r("./"),
      assets: r("./assets"),
      public: r("./public"),
      "public/": r("./public/"),
      "#imports": "<rootDir>/.nuxt/imports.d.ts",
    },
  },
};
