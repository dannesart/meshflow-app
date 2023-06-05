import { mount } from "@vue/test-utils";
import Edit from "./Index.vue";

describe("Edit entity of type X", () => {
  describe("title", () => {
    it("Should render correct form with correct title", () => {
      const component = mount(Edit, {
        props: {
          type: "Block",
        },
      });

      expect(component.find("h1").text().toLowerCase()).toContain("edit block");
    });
  });
});
