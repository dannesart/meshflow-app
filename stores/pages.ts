import axios from "axios";
import { defineStore } from "pinia";
import { Page } from "~~/models/page";

type State = {
  isEditing: boolean;
  loading: boolean;
  allPages: Page[];
};

const state = () =>
  <State>{
    isEditing: false,
    loading: true,
    allPages: [],
  };

const getters = {
  editing: (state: State) => state.isEditing,
  pages: (state: State) => state.allPages,
  getAmountOfPages: (state: State) => state.allPages.length,
  getPageById: (state: State) => {
    return (id: string) => {
      return state.allPages.find((page) => page.id === id);
    };
  },
};

export const usePagesStore = defineStore("PagesStore", {
  state,
  getters,
  actions: {
    async addPage(page: Page) {
      try {
        this.loading = true;
        const config = useRuntimeConfig();
        const response = await axios.post(
          config.public.REDIRECT_URI + "/api/pages",
          page
        );
        this.loading = false;
        await this.fetchPages();
      } catch (error) {
        //TODO: Handle error
      }
    },
    async fetchPages() {
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/pages"
        );
        this.loading = false;
        if (response.data) {
          if (response.data.error) {
            return;
          }
          this.allPages = response.data;
        }
      } catch (error) {
        //TODO: Handle error
        this.loading = false;
      }
    },
  },
});
