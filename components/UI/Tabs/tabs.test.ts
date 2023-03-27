import { mount } from "@vue/test-utils";
import Tabs from "./index.vue";
import { TABS_MOCK, TABS_MOCK2 } from "./tabs.mock";

describe("Tabs", () => {
  it("Should render correct amount of tabs", () => {
    const component = mount(Tabs, {
      props: {
        tabs: [TABS_MOCK, TABS_MOCK2],
      },
    });
    expect(component.findAll("[name=tab]").length).toBe(2);
    expect(component.find("[name=tab]").text()).toBe(TABS_MOCK.label);
  });

  it("Should have an active state", () => {
    const component = mount(Tabs, {
      props: {
        tabs: [TABS_MOCK, TABS_MOCK2],
        active: TABS_MOCK.name,
      },
    });
    expect(component.find("[name=tab]").classes().includes("bg-blue-600")).toBe(
      true
    );
  });
});
