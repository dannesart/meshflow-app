import { defineStore } from "pinia";
import { TLayer } from "~~/models/layer";

type TState = {
  isEditing: boolean;
  layer: TLayer | null;
  showingLayerNames: boolean;
  showingLayerBorders: boolean;
};

const state = () =>
  <TState>{
    isEditing: false,
    layer: null,
    showingLayerNames: true,
    showingLayerBorders: true,
  };

const getters = {
  editing: (state: TState) => state.isEditing,
  currentLayer: (state: TState) => state.layer,
  showLayerNames: (state: TState) => state.showingLayerNames,
  showLayeBorders: (state: TState) => state.showingLayerBorders,
};

export const useLayerStore = defineStore("LayerStore", {
  state,
  getters,
  actions: {
    active(open: boolean) {
      this.isEditing = open;
    },
    setLayer(layer: TLayer) {
      this.layer = layer;
    },
    toggleShowLayerNames() {
      this.showingLayerNames = !this.showingLayerNames;
    },
    toggleShowLayerBorders() {
      this.showingLayerBorders = !this.showingLayerBorders;
    },
    addNewLayer() {
      if (!this.layer) return;
      this.layer?.layers?.push({
        name: this.layer.name + "." + (this.layer.layers.length + 1),
        type: {
          name: "",
          defaultClasses: "",
        },
        layers: [],
        classes: {},
      });
    },
  },
});
