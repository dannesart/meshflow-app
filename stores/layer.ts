import { defineStore } from 'pinia'
import { TLayer } from '~~/models/layer';

export const useLayerStore = defineStore('LayerStore', {
  state: () => ({ isEditing: false, layer: {} }),
  getters: {
    editing: (state) => state.isEditing,
    currentLayer: (state) => state.layer,
  },
  actions: {
    active(open: boolean) {
      this.isEditing = open;
    },
    setLayer(layer: TLayer){
      this.layer = layer;
    }
  },
});