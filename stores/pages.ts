import axios from "axios";
import { defineStore } from "pinia";

type TState = {
  isEditing: boolean;
  pages: any[];
};

const state = () =>
  <TState>{
    isEditing: false,
    pages: [],
  };

const getters = {
  editing: (state: TState) => state.isEditing,
  getPages: (state: TState) => state.pages,
  getAmountOfPages: (state: TState) => state.pages.length,
  getPageById: (state: TState) => {
    return (id: string) => {
      return state.pages.find((page) => page.id === id);
    };
  },
};

export const usePagesStore = defineStore("PagesStore", {
  state,
  getters,
  actions: {
    async fetchPages() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/pages"
        );
        this.pages = response.data;
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
