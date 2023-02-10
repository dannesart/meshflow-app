import { mount } from "@vue/test-utils";
import Task from "./Task.vue";

describe("New task form", () => {
  it("Should render a form with required inputs", () => {
    const component = mount(Task);
    expect(component.findAll("input").length).toBe(1);
  });
});
