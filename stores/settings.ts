import { defineStore } from "pinia";
import axios from "axios";
import { useRuntimeConfig } from "#app";

export const availableServices = [
  "Data",
  "Blocks",
  "Pages",
  "Storage",
  "Rules",
  "API",
];

type State = {
  activeServices: string[];
  useSprints: boolean;
};

export const useSettingsStore = defineStore("SettingStore", {
  state: () => <State>{ activeServices: [], useSprints: false },
  getters: {
    isUsingSprints: (state) => state.useSprints,
    allActiveServices: (state) => state.activeServices,
    isServiceActive: (state) => {
      return (service: string) => state.activeServices.indexOf(service) > -1;
    },
  },
  actions: {
    setUseSprints(use: boolean) {
      this.useSprints = use;
    },
    setActiveServices(services: string[]) {
      this.activeServices = [...services];
    },
    async fetchSettings() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/settings"
        );
        if (response.data) {
          const { activeServices, useSprints } = response.data;
          this.activeServices = activeServices;
          this.useSprints = useSprints;
        }
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
