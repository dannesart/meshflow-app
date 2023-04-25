import axios from "axios";
import { defineStore } from "pinia";
import { TPage } from "~~/models/page";

type TState = {
  isEditing: boolean;
  allPages: TPage[];
};

const state = () =>
  <TState>{
    isEditing: false,
    allPages: [],
  };

const getters = {
  editing: (state: TState) => state.isEditing,
  pages: (state: TState) => state.allPages,
  getAmountOfPages: (state: TState) => state.allPages.length,
  getPageById: (state: TState) => {
    return (id: string) => {
      return state.allPages.find((page) => page.id === id);
    };
  },
};

export const usePagesStore = defineStore("PagesStore", {
  state,
  getters,
  actions: {
    async addPage(page: TPage) {
      // Stuff
      this.allPages.push(page);
    },
    async fetchPages() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/pages"
        );
        this.allPages = response.data;
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
