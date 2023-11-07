import { defineStore } from "pinia";

export const useUiStore = defineStore("UiStore", {
  state: () => ({
    isLoading: false,
  }),
  getters: {
    loading: (state) => state.isLoading,
  },
  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
  },
});
