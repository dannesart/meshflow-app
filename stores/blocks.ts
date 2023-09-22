import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { Block } from "~~/models/blocks";
import { useProjectStore } from "./projects";
import { useUiStore } from "./ui";

type State = {
  isEditing: boolean;
  isLoading: boolean;
  allBlocks: Block[];
};

const state = () =>
  <State>{
    isEditing: false,
    isLoading: true,
    allBlocks: [],
  };

const getters = {
  editing: (state: State) => state.isEditing,
  loading: (state: State) => state.isLoading,
  blocks: (state: State) => state.allBlocks,
  getAmountOfBlocks: (state: State) => state.allBlocks.length,
  getBlockById: (state: State) => {
    return (id: string) => {
      return state.allBlocks.find((block) => block.id === id);
    };
  },
};

export const useBlocksStore = defineStore("BlocksStore", {
  state,
  getters,
  actions: {
    async updateBlock(block: Block) {
      try {
        this.isLoading = true;
        const config = useRuntimeConfig();
        const response = await axios.patch(
          config.public.REDIRECT_URI + "/api/blocks/" + block.id,
          block
        );
        this.isLoading = false;
        await this.fetchBlocks();
        return true;
      } catch (error) {
        this.isLoading = false;
        return false;
      }
    },
    async deleteBlock(blockId: string) {
      try {
        this.isLoading = true;
        const config = useRuntimeConfig();
        const response = await axios.delete(
          config.public.REDIRECT_URI + "/api/blocks/" + blockId
        );
        this.isLoading = false;
        await this.fetchBlocks();
        return true;
      } catch (error) {
        this.isLoading = false;
        return false;
      }
    },
    async addBlock(block: Block) {
      try {
        this.isLoading = true;
        const config = useRuntimeConfig();
        const response = await axios.post(
          config.public.REDIRECT_URI + "/api/blocks",
          block
        );
        this.isLoading = false;
        await this.fetchBlocks();
        return true;
      } catch (error) {
        this.isLoading = false;
        return false;
      }
    },
    async fetchBlocks() {
      this.isLoading = true;
      const uiStore = useUiStore();
      const { activeId } = storeToRefs(useProjectStore());
      try {
        uiStore.setLoading(true);
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/blocks",
          {
            params: {
              projectId: activeId.value,
            },
          }
        );
        this.isLoading = false;
        uiStore.setLoading(false);
        if (response.data) {
          if (response.data.error) {
            return;
          }
          this.allBlocks = response.data;
        }
      } catch (error) {
        //TODO: Handle error
        this.isLoading = false;
        uiStore.setLoading(false);
      }
    },
  },
});
