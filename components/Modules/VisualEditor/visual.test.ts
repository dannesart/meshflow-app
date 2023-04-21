import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useLayerStore } from "~~/stores/layer";
import Editor from "./Index.vue";

describe("Visual editor", () => {
  describe("Initial component", () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });
    it("Should have a single layer with a layer name as default", () => {
      const component = mount(Editor);
      expect(component.findAll("[name=layer]").length).toBe(1);
      expect(component.find("[name=layer]").text()).toContain("Layer 1");
    });

    it("Should render tools", () => {
      const component = mount(Editor);
      expect(component.find("[name=tools]").exists()).toBe(true);
    });

    it("Should render two color tools", () => {
      const component = mount(Editor);
      expect(component.findAll("[name=color-tool]").length).toBe(2);
    });

    it("Should add first layer as active layer to store", () => {
      const store = useLayerStore();
      const component = mount(Editor);

      expect(store.currentLayer).toBeDefined();
    });
  });
});
