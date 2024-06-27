import { badgeMock } from "./badge.mock";
import { mount } from "@vue/test-utils";
import Badge from "./Index.vue";

describe("Badge", () => {
  it("Should render correct with an icon and given text", () => {
    const component = mount(Badge, {
      props: {
        badge: badgeMock,
      },
    });
    expect(component.find("p").text()).toContain(badgeMock.value);
    expect(component.find("svg").exists()).toBe(true);
  });
});
