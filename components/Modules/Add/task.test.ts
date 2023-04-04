import { mount } from "@vue/test-utils";
import Task from "./Task.vue";

describe("New task form", () => {
  it("Should render a form with required inputs", () => {
    const component = mount(Task);
    expect(component.findAll("input").length).toBe(1);
  });

  it("Should trigger an update event on input", async () => {
    const component = mount(Task);
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

  it("Should trigger on fail if input is invalid", async () => {
    const component = mount(Task);
    const input = component.find("input");
    expect(input.element.value).toBe("");
    await input.setValue("");

    const emitted = component.emitted();
    const onError = emitted.onError as Array<Array<Record<string, string>>>;
    expect(onError).toBeDefined();
    expect(onError[0][0].errors.length).toBe(1);
  });
});
