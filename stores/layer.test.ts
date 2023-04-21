import { createPinia, setActivePinia } from "pinia";
import { TLayer } from "~~/models/layer";
import { useLayerStore } from "./layer";

describe("Layer store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("Init should not contain any active layer", () => {
    const store = useLayerStore();
    expect(store.currentLayer).toBe(null);
  });

  test("Set layer should store an active layer", () => {
    const store = useLayerStore();
    const layerMock: TLayer = {
      name: "Layer 1",
      type: {
        name: "Type 1",
      },
      layers: [],
      classes: {},
    };
    store.setLayer(layerMock);
    expect(store.currentLayer?.name).toBe(layerMock.name);
  });

  test("Should not be able to add another layer if there is no active layer", () => {
    const store = useLayerStore();
    expect(store.currentLayer).toBe(null);
    store.addNewLayer();
    expect(store.currentLayer).toBe(null);
  });

  test("Should be able to add another layer if there is an active layer", () => {
    const store = useLayerStore();
    const layerMock: TLayer = {
      name: "Layer 1",
      type: {
        name: "Type 1",
      },
      layers: [],
      classes: {},
    };
    store.setLayer(layerMock);
    store.addNewLayer();
    expect(store.currentLayer?.layers?.length).toBe(1);
  });
});
