import { mount } from "@vue/test-utils";
import AddPage from "./Page.vue";

describe("Add page", () => {
  it("Should be able to render correctly with a text field", () => {
    const component = mount(AddPage);
    expect(component.findAll("input").length).toBe(1);
    const input = component.find("input");
    expect(input.element.name).toBe("title");
  });

  it("Should be valid if user enters 3 or more characters", async () => {
    const component = mount(AddPage);
    const input = component.find("input");
    const text = "test";
    expect(input.element.value).toBe("");
    await input.setValue(text);

    const emitted = component.emitted();
    const valueUpdate = emitted.valueUpdate as Array<
      Array<Record<string, string>>
    >;
    expect(valueUpdate).toBeDefined();
    expect(valueUpdate[0][0].title).toBe(text);
  });
});
