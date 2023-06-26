import { mount, VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import AddBlock from "./Block.vue";

describe("Add block", () => {
  setActivePinia(createPinia());

  let component: VueWrapper;
  beforeEach(() => {
    component = mount(AddBlock);
  });
  it("Should be able to render correctly with fields for creating a new type block", () => {
    expect(component.findAll("input").length).toBe(1);
    expect(component.findAll("textarea").length).toBe(1);
  });

  it("Should show error if input name is more than 0 and less than 3 letters", async () => {
    await component.find("input").setValue("Yo");
    expect(component.findAll("[name=new-block-error]").length).toBe(1);
  });

  it("Should show error if input name is more than 0 and less than 3 letters. And then dissapear when typing 3 or more letters", async () => {
    const input = component.find("input");
    await input.setValue("Yo");
    expect(component.findAll("[name=new-block-error]").length).toBe(1);
    await input.setValue("Hello");
    expect(component.findAll("[name=new-block-error]").length).toBe(0);
  });

  it("Should emit a onError event if there is an error", async () => {
    const input = component.find("input");
    await input.setValue("Yo");
    const emitted = component.emitted();
    const onError = emitted.onError as Array<Array<Record<string, string>>>;
    expect(onError).toBeDefined();
    expect(onError[0][0].errors.length).toBe(1);
  });

  it("Should emit a onValid event if there is no errors", async () => {
    const input = component.find("input");
    await input.setValue("Hello");
    const emitted = component.emitted();
    const onValid = emitted.onValid as Array<Array<Record<string, string>>>;
    expect(onValid).toBeDefined();
  });
});
