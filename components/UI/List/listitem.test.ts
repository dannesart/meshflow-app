import { mount } from "@vue/test-utils";
import ListItem from "./Item.vue";

describe("Should display a list item component", () => {
  it("Should render a li element", () => {
    const component = mount(ListItem);

    expect(component.find("li").exists()).toBe(true);
  });
});
