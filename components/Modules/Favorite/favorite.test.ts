import { mount } from "@vue/test-utils";
import Favorite from "./index.vue";

const activeClass = "bg-green-200";

describe("Favorite", () => {
  it("Should render a component with icon", () => {
    const component = mount(Favorite, {
      props: {
        favorite: false,
        size: "small",
      },
    });
    expect(component.find("button").exists()).toBe(true);
    expect(component.find("svg").exists()).toBe(true);
  });

  it("Should have an active state if passed in as favorite", () => {
    const component = mount(Favorite, {
      props: {
        favorite: true,
        size: "small",
      },
    });
    expect(component.find("button").classes().includes(activeClass)).toBe(true);
  });

  it("Should change the state when get clicked on", async () => {
    const component = mount(Favorite, {
      props: {
        favorite: false,
      },
    });

    await component.trigger("click");

    expect(component.find("button").classes().includes(activeClass)).toBe(true);
  });
});
