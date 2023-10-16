import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { Block } from "~~/models/blocks";
import { Model } from "~~/models/model";
import { useProjectStore } from "./projects";
import { useUiStore } from "./ui";

type State = {
  isEditing: boolean;
  isLoading: boolean;
  _blockModels: Model[];
  _blocks: {
    [key: string]: Block[];
  };
};

const state = () =>
  <State>{
    isEditing: false,
    isLoading: true,
    _blockModels: [],
    _blocks: {},
  };

const getters = {
  editing: (state: State) => state.isEditing,
  loading: (state: State) => state.isLoading,
  blocks: (state: State) => state._blocks,
  getBlocksByType: (state: State) => {
    return (type: string) => {
      return state._blocks[type];
    };
  },
  blockModels: (state: State) => state._blockModels,
  getBlockById: (state: State) => {
    return (type: string, id: string) => {
      return state._blocks[type].find(() => block.id === id);
    }
  },
  getAmountOfBlockModels: (state: State) => state._blockModels.length,
  getBlockModelById: (state: State) => {
    return (id: string) => {
      return state._blockModels.find((block) => block.id === id);
    };
  },
};

export const useBlocksStore = defineStore("BlocksStore", {
  state,
  getters,
  actions: {
    async addBlock(block: {
      projectId: string;
      properties: any;
      type: string;
    }) {
      const uiStore = useUiStore();
      const { setLoading } = uiStore;

      try {
        this.isLoading = true;
        setLoading(true);
        const config = useRuntimeConfig();
        const response = await axios.post(
          config.public.REDIRECT_URI + "/api/blocks/" + block.type,
          block
        );
        this.isLoading = false;
        await this.fetchBlocks(block.type);
        setLoading(false);
        return true;
      } catch (error) {
        this.isLoading = false;
        setLoading(false);
        return false;
      }
    },

    async fetchBlocks(blockType: string) {
      const uiStore = useUiStore();
      const { setLoading } = uiStore;
      const { activeId } = storeToRefs(useProjectStore());
      try {
        this.isLoading = true;
        setLoading(true);
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/blocks/" + blockType,
          {
            params: {
              projectId: activeId.value,
            },
          }
        );
        this._blocks[blockType] = response.data;
        this.isLoading = false;
        setLoading(false);
        return true;
      } catch (error) {
        this.isLoading = false;
        setLoading(false);
        return false;
      }
    },

    async updateBlockModel(blockModel: Model) {
      try {
        this.isLoading = true;
        const config = useRuntimeConfig();
        const response = await axios.patch(
          config.public.REDIRECT_URI + "/api/blocks/" + blockModel.id,
          blockModel
        );
        this.isLoading = false;
        await this.fetchBlockModels();
        return true;
      } catch (error) {
        this.isLoading = false;
        return false;
      }
    },
    async deleteBlockModel(blockModelId: string) {
      try {
        this.isLoading = true;
        const config = useRuntimeConfig();
        const response = await axios.delete(
          config.public.REDIRECT_URI + "/api/blocks/" + blockModelId
        );
        this.isLoading = false;
        await this.fetchBlockModels();
        return true;
      } catch (error) {
        this.isLoading = false;
        return false;
      }
    },
    async addBlockModel(blockModel: Model) {
      const uiStore = useUiStore();
      const { setLoading } = uiStore;

      try {
        this.isLoading = true;
        setLoading(true);
        const config = useRuntimeConfig();
        const response = await axios.post(
          config.public.REDIRECT_URI + "/api/blocks",
          blockModel
        );
        this.isLoading = false;
        await this.fetchBlockModels();
        setLoading(false);
        return true;
      } catch (error) {
        this.isLoading = false;
        setLoading(false);
        return false;
      }
    },
    async fetchBlockModels() {
      this.isLoading = true;
      const { activeId } = storeToRefs(useProjectStore());
      try {
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
        if (response.data) {
          if (response.data.error) {
            return;
          }
          this._blockModels = response.data;
        }
      } catch (error) {
        //TODO: Handle error
        this.isLoading = false;
      }
    },
  },
});
