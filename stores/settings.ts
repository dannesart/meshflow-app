import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { useUiStore } from "./ui";
import { useProjectStore } from "./projects";

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
  isEditing: boolean;
  isLoading: boolean;
};

export const useSettingsStore = defineStore("SettingStore", {
  state: () =>
    <State>{
      activeServices: [],
      useSprints: false,
      isEditing: false,
      isLoading: true,
    },
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
    async saveSettings() {
      const uiStore = useUiStore();
      const { activeId } = storeToRefs(useProjectStore());
      try {
        this.isLoading = true;
        uiStore.setLoading(true);
        const config = useRuntimeConfig();
        const response = await axios.patch(
          config.public.REDIRECT_URI + "/api/settings/",
          {
            projectId: activeId.value,
            settings: {
              useSprints: this.useSprints,
              activeServices: this.activeServices,
            },
          }
        );
        await this.fetchSettings();
        this.isLoading = false;
        uiStore.setLoading(false);
        return true;
      } catch (error) {
        this.isLoading = false;
        uiStore.setLoading(false);
        return false;
      }
    },
    async fetchSettings() {
      const uiStore = useUiStore();
      const { activeId } = storeToRefs(useProjectStore());
      try {
        this.isLoading = true;
        uiStore.setLoading(true);
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/settings",
          {
            params: {
              projectId: activeId.value,
            },
          }
        );
        if (response.data) {
          const { activeServices, useSprints } = response.data.settings;
          this.activeServices = activeServices;
          this.useSprints = useSprints;
          this.isLoading = false;
          uiStore.setLoading(false);
        }
      } catch (error) {
        //TODO: Handle error
        this.isLoading = false;
        uiStore.setLoading(false);
      }
    },
  },
});
