import { mount } from "@vue/test-utils";
import { mockData } from "./dropdown.mock";
import DropDown from "./Index.vue";

describe("DropDown", () => {
  it("Should render correct, with correct data", () => {
    const component = mount(DropDown, {
      props: mockData,
    });

    expect(component.findAll(".items li").length).toBe(mockData.items.length);
  });
  it("Should be possible to check checkboxes", async () => {
    const component = mount(DropDown, {
      props: mockData,
    });
    expect(component.props().items[0].checked).toBe(false);
    await component.findAll("[data-test=checkbox]")[0].trigger("click");
    expect(component.emitted().update).toStrictEqual([
      [mockData.items[0].id, !mockData.items[0].checked],
    ]);
  });
});
