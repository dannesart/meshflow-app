import { defineStore } from "pinia";
import axios from "axios";

export const useSettingsStore = defineStore("SettingStore", {
  state: () => ({ web: false, dark: false }),
  getters: {
    isWeb: (state) => state.web,
    isDark: (state) => state.dark,
  },
  actions: {
    setIsWeb(open: boolean) {
      this.web = open;
    },
    setIsDark(dark: boolean) {
      this.dark = dark;
    },
    async fetchSettings() {
      try {
        const response = await axios.get("http://localhost:3000/api/settings");
        this.web = response.data.web;
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
