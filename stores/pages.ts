import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { Page } from "~~/models/page";
import { useProjectStore } from "./projects";
import { useUiStore } from "./ui";

type State = {
  isEditing: boolean;
  isLoading: boolean;
  allPages: Page[];
};

const state = () =>
  <State>{
    isEditing: false,
    isLoading: true,
    allPages: [],
  };

const getters = {
  editing: (state: State) => state.isEditing,
  loading: (state: State) => state.isLoading,
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
    async updatePage(page: Page) {
      try {
        this.isLoading = true;
        const config = useRuntimeConfig();
        const response = await axios.patch(
          config.public.REDIRECT_URI + "/api/pages/" + page.id,
          page
        );
        this.isLoading = false;
        await this.fetchPages();
        return true;
      } catch (error) {
        this.isLoading = false;
        return false;
      }
    },
    async addPage(page: Page) {
      const uiStore = useUiStore();
      try {
        uiStore.setLoading(true);
        this.isLoading = true;
        const config = useRuntimeConfig();
        const response = await axios.post(
          config.public.REDIRECT_URI + "/api/pages",
          page
        );
        this.isLoading = false;
        uiStore.setLoading(false);
        await this.fetchPages();
        return response;
      } catch (error) {
        this.isLoading = false;
        uiStore.setLoading(false);
        return false;
      }
    },
    async deletePage(id: string) {
      const uiStore = useUiStore();
      try {
        this.isLoading = true;
        uiStore.setLoading(true);
        const config = useRuntimeConfig();
        const response = await axios.delete(
          config.public.REDIRECT_URI + "/api/pages/" + id
        );
        this.isLoading = false;
        await this.fetchPages();
        uiStore.setLoading(false);
        return true;
      } catch (error) {
        this.isLoading = false;
        uiStore.setLoading(false);
        return false;
      }
    },
    async fetchPages() {
      const uiStore = useUiStore();
      const { activeId } = storeToRefs(useProjectStore());

      try {
        this.isLoading = true;
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/pages",
          {
            params: {
              projectId: activeId.value,
            },
          }
        );
        this.isLoading = false;
        if (response.data) {
          if (response.data.error) {
            return;
          }
          this.allPages = response.data;
        }
      } catch (error) {
        //TODO: Handle error
        this.isLoading = false;
        uiStore.setLoading(false);
      }
    },
  },
});
