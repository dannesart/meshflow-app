import { mount } from "@vue/test-utils";
import Tag from "./Index.vue";

describe("Tags", () => {
  it("Should render a tag component", () => {
    const component = mount(Tag);
    expect(component.find("[name=tag]").classes()).toContain("bg-slate-200");
  });
});
