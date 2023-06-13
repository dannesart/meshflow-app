import { defineStore } from "pinia";
import axios from "axios";
import { useRuntimeConfig } from "#app";

export const useSettingsStore = defineStore("SettingStore", {
  state: () => ({ web: false, dark: false, useSprints: false }),
  getters: {
    isWeb: (state) => state.web,
    isDark: (state) => state.dark,
    isUsingSprints: (state) => state.useSprints,
  },
  actions: {
    setIsWeb(open: boolean) {
      this.web = open;
    },
    setIsDark(dark: boolean) {
      this.dark = dark;
    },
    setUseSprints(use: boolean) {
      this.useSprints = use;
    },
    async fetchSettings() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/settings"
        );
        this.web = response.data.web;
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
