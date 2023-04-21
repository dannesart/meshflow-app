import { mount } from "@vue/test-utils";
import Loader from "./Index.vue";

describe("Loader", () => {
  test("Should render with prefered accepted size", () => {
    const props = {
      size: "base",
    };
    const component = mount(Loader, {
      props,
    });
    expect(component.find("svg").exists()).toBe(true);
  });
});
