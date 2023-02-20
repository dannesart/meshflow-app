import { mount } from "@vue/test-utils";
import { defaultUtility } from "~~/constants/services/blocks";
import { setActivePinia, createPinia } from "pinia";
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
  });
});
