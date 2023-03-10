import { defineStore } from "pinia";
import axios from "axios";
import { TData } from "~~/models/data";
import { CONFIG } from "~~/server/api/config";

export const useDataStore = defineStore("DataStore", {
  state: () =>
    <{ _allData: TData[]; _data: TData | null; _isEditing: boolean }>{
      _isEditing: false,
      _allData: [],
      _data: null,
    },
  getters: {
    editing: (state) => state._isEditing,
    currentData: (state) => state._data,
    allData: (state) => state._allData,
    latest: (state) => {
      const latest = [...state._allData];
      latest.length = latest.length > 5 ? 5 : latest.length;
      return latest;
    },
    dataByIdx: (state) => {
      return (dataId: string) =>
        state._allData.findIndex((data) => data.id === dataId);
    },
    dataById: (state) => {
      return (dataId: string) =>
        state._allData.find((data) => data.id === dataId);
    },
  },
  actions: {
    active(open: boolean) {
      this._isEditing = open;
    },
    updateTask(data: TData, patch: { [key: string]: any }) {
      const idx = this.dataByIdx(data.id);
      const update = { ...data, ...patch };
      this.allData[idx] = update;
    },
    seTDatas(tasks: TData[]) {
      this._allData = tasks;
    },
    setCurrentData(data: TData) {
      //this.data = data;
    },

    async fetchData() {
      try {
        const response = await axios.get(CONFIG.path + "/api/data");
        this._allData = response.data;
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
