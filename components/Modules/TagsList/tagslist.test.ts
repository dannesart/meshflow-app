import { mount } from "@vue/test-utils";
import TagList from "./Index.vue";

describe("Tags list", () => {
  it("Should render a add tag button if add props is set to true", () => {
    const component = mount(TagList, {
      props: {
        canAdd: true,
      },
    });

    expect(component.find("[name=add-tag]").exists()).toBe(true);
  });
});
