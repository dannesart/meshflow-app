import { mount } from "@vue/test-utils";
import List from "./Index.vue";
import Item from "./Item.vue";

describe("Should display a list component", () => {
  it("Should render a ul element", () => {
    const component = mount(List);

    expect(component.find("ul").exists()).toBe(true);
  });
  it("Should contain zero items if none is provided", () => {
    const component = mount(List);
    expect(component.find("li").exists()).toBe(false);
  });

  it("Should contain one item if provided as slot", () => {
    const component = mount(List, {
      slots: {
        default: Item,
      },
    });
    expect(component.find("li").exists()).toBe(true);
  });
});
