import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import FilterComponent from "./Index.vue";
import { FiltersData } from "./filter.data";

describe("Filter component", async () => {
  const component: VueWrapper = mount(FilterComponent, {
    props: {},
  });
  const filter: DOMWrapper<Element> = component.find("[test=filter]");
  const sort: DOMWrapper<Element> = component.find("[test=sort]");
  it("Should render a menu with sorting and filter options", () => {
    expect(filter).toBeTruthy();
    expect(sort).toBeTruthy();
  });

  it("Should emit events when updating filters", async () => {
    const filter = component.find("[data-test=filter]");
    await filter.findAll("[data-test=checkbox]")[0].trigger("click");
    const emitted = component.emitted().filterChange;
    expect(emitted.flat(2)).toStrictEqual([FiltersData[0]]);
  });
});
