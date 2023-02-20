import { mount } from "@vue/test-utils";
import Stat from "./Index.vue";
describe("Stat component", () => {
  it("shows a stat component with a number and text", async () => {
    const statComponent = mount(Stat, {
      props: {
        label: "Amount",
        number: 40,
      },
    });

    expect(statComponent.find("h4").text()).toContain("Amount");
    expect(statComponent.find("p").text()).toContain("40");
  });
  it("Should throw an error if text is missing", async () => {
    const statComponent = mount(Stat, {
      props: {
        number: 40,
      },
    });
    expect(statComponent.find("h4").text()).not.toContain("Amount");
  });
});
