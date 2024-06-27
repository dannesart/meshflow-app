import { mount } from "@vue/test-utils";
import Checkbox from "./Index.vue";
import { checkboxMock } from "./checkbox.mock";

describe("Checkbox", () => {
  describe("An unchecked checkbox", () => {
    let component;
    beforeEach(() => {
      component = mount(Checkbox, {
        props: {
          ...checkboxMock,
        },
      });
    });
    it("Should render a checkbox component that is not checked", () => {
      expect(component.find("icon").exists()).toBe(false);
    });
    it("Should be possible to check an unchecked checkbox", async () => {
      expect(component.find("icon").exists()).toBe(false);
      await component.find("[data-test=checkbox]").trigger("click");
      expect(component.emitted().update.flat(2)).toStrictEqual([
        checkboxMock.id,
        true,
      ]);
    });
  });

  describe("A checked checkbox", () => {
    let component;
    beforeEach(() => {
      component = mount(Checkbox, {
        props: {
          ...checkboxMock,
          value: true,
        },
      });
    });
    it("Should render a checkbox component that is checked", () => {
      expect(component.find("icon").exists()).toBe(true);
    });

    it("Should be possible to uncheck a checked checkbox", async () => {
      expect(component.find("icon").exists()).toBe(true);
      await component.find("[data-test=checkbox]").trigger("click");
      expect(component.emitted().update.flat(2)).toStrictEqual([
        checkboxMock.id,
        false,
      ]);
    });
  });
});
