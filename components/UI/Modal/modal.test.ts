import { mount } from "@vue/test-utils";
import Modal from "./Index.vue";

describe("Modal", () => {
  it("Should show if passing in showModal = true", () => {
    const component = mount(Modal, {
      props: {
        showModal: true,
      },
    });

    expect(component.find("[name=backdrop-modal]").exists()).toBe(true);
  });

  it("Should hide if passing in showModal = false", () => {
    const component = mount(Modal, {
      props: {
        showModal: false,
      },
    });

    expect(component.find("[name=backdrop-modal]").exists()).toBe(false);
  });
});
