import { mount } from "@vue/test-utils";
import DateComponent from "./Index.vue";

describe("Date", () => {
  it("Should render correct", () => {
    const date = new Date("2024-06-12").toString();
    const component = mount(DateComponent, {
      props: {
        date,
      },
    });
    const expectedText = useTimeAgo(date).value;
    const acctualText = component.find("time").text();
    expect(acctualText).toContain(expectedText);
  });
});
