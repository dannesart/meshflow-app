import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { Data } from "~~/models/data";
import { useRuntimeConfig } from "#app";
import { Model } from "~~/models/model";
import { useUiStore } from "./ui";
import { useProjectStore } from "./projects";

type State = {
  _dataModels: Model[];
  _data: { [type: string]: Data[] };
  _isEditing: boolean;
  _loading: boolean;
};

export const useDataStore = defineStore("DataStore", {
  state: () =>
    <State>{
      _isEditing: false,
      _dataModels: [],
      _data: {},
      _loading: true,
    },
  getters: {
    editing: (state) => state._isEditing,
    currentData: (state) => state._data,
    dataModels: (state) => state._dataModels,
    loading: (state) => state._loading,
    latest: (state) => {
      const latest = [...state._dataModels];
      latest.length = latest.length > 5 ? 5 : latest.length;
      return latest;
    },
    dataModelById: (state) => {
      return (id: string) => state._dataModels.find((model) => model.id === id);
    },
    dataByType: (state) => {
      return (type: string) => state._data[type] || [];
    },
    dataById: (state) => {
      return (type: string, id: string) => {};
    },
  },
  actions: {
    active(open: boolean) {
      this._isEditing = open;
    },

    async fetchDataByType(type: string) {
      // Do request
      const response: Data[] = [];
      this._data[type] = response;
    },

    async fetchDataModels() {
      const uiStore = useUiStore();
      const { setLoading } = uiStore;
      const { activeId } = storeToRefs(useProjectStore());
      try {
        this._loading = true;
        setLoading(true);
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/data",
          {
            params: {
              projectId: activeId.value,
            },
          }
        );
        this._dataModels = response.data;
        this._loading = false;
        setLoading(false);
      } catch (error) {
        //TODO: Handle error
        this._loading = false;
        setLoading(false);
      }
    },
  },
});
