import { mount } from "@vue/test-utils";
import Tool from "./Tool.vue";

const radioValueMocks = ["value 1", "value 2", "value 3"];

describe("Tool", () => {
  describe("Should render correct tool with given props", () => {
    it("Should render radio tool correct", async () => {
      const component = mount(Tool, {
        props: {
          type: "radio",
          values: radioValueMocks,
        },
      });

      /**
       * At this point we should expect component to be closed and no
       * radio buttons should be shown.
       */

      expect(component.findAll("[name=radio-value]").length).toBe(0);

      /**
       * Focus on element should trigger a show state.
       */
      const radioTool = component.find("[name=radio-tool]");
      await radioTool.trigger("focusin");

      /**
       * We can then expect x amount of rendered radio button.
       */
      expect(component.findAll("[name=radio-value]").length).toBe(
        radioValueMocks.length
      );
    });

    it("Should render range tool correct", async () => {
      // TODO: Implement test when we know how this tool should work.
    });
  });

  describe("Should set a default value if provided as value in props", () => {
    it("Should render radio tool with a selected radio", async () => {
      const component = mount(Tool, {
        props: {
          type: "radio",
          values: radioValueMocks,
          value: radioValueMocks[1],
        },
      });

      /**
       * Focus on element should trigger a show state.
       */
      const radioTool = component.find("[name=radio-tool]");
      await radioTool.trigger("focusin");

      /**
       * We can then expect x amount of rendered radio button.
       */
      expect(component.findAll("[name=radio-value]").length).toBe(
        radioValueMocks.length
      );

      /**
       * Expect n to be selected
       */
      expect(
        component
          .findAll("[name=radio-value]")[1]
          .find("[name=radio-value-selected]")
          .exists()
      ).toBe(true);
    });
  });

  describe("Should change value", () => {
    it("Should set a different radio active and emit new value when user clicks on a radio", async () => {
      const component = mount(Tool, {
        props: {
          type: "radio",
          values: radioValueMocks,
          value: radioValueMocks[1],
        },
      });

      /**
       * Focus on element should trigger a show state.
       */
      const radioTool = component.find("[name=radio-tool]");
      await radioTool.trigger("focusin");

      await component.findAll("[name=radio-value]")[0].trigger("click");

      /**
       * Expect n to be selected
       */
      expect(
        component
          .findAll("[name=radio-value]")[0]
          .find("[name=radio-value-selected]")
          .exists()
      ).toBe(true);

      /**
       * Expect new value to be emitted
       */
      const emitted = component.emitted();
      const onChange = emitted.onChange as Array<Array<Record<string, string>>>;
      expect(onChange).toBeDefined();
      expect(onChange[0][0]).toBe(radioValueMocks[0]);
    });
  });
});
