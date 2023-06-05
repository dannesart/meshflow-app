import { mount, VueWrapper } from "@vue/test-utils";
import { Model } from "mongoose";
import { ModelTypes } from "~~/constants/model";
import AddField from "./Field.vue";

describe("Add field", () => {
  let component: VueWrapper;
  beforeEach(() => {
    component = mount(AddField);
  });
  it("Should be able to render correctly with a selection of model types", () => {
    expect(component.findAll("[name=model-type]").length).toBe(
      ModelTypes.length
    );
  });

  it("Should go to next step and set selected type to active", async () => {
    await component.findAll("[name=model-type]")[0].trigger("click");
    const props = component.props("field");
    expect(component.find("[name=selected-model-type]").element.innerHTML).toBe(
      ModelTypes[0].name
    );
  });
});
