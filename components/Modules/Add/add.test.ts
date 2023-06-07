import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import Add from "./Index.vue";

describe("Add new entity of type X", () => {
  describe("title", () => {
    it("Should render correct form with correct title", () => {
      const component = mount(Add, {
        props: {
          type: "Block",
        },
      });

      expect(component.find("h1").text().toLowerCase()).toContain(
        "add new block"
      );
    });

    it("Should not be correct with incorrect type", () => {
      const component = mount(Add, {
        props: {
          type: "None exisiting type",
        },
      });

      expect(component.find("h1").text().toLowerCase()).not.toContain(
        "add new block"
      );
    });

    it("Should not be found if missing type", () => {
      const component = mount(Add, {
        props: {
          type: null,
        },
      });
      expect(component.find("h2").exists()).toBe(false);
    });

    it("Should render a task form if type is task and user clicks on add new data button", async () => {
      const component = mount(Add, {
        props: {
          type: "task",
        },
      });

      await component.find("[name=add-button]").trigger("click");
      expect(component.find("form[name=new-task-form]").exists()).toBe(true);
    });
  });

  describe("Show modal", () => {
    let component: VueWrapper;
    let addButton: DOMWrapper<Element>;
    let addModal: DOMWrapper<Element>;
    let nevermindButton: DOMWrapper<Element>;

    beforeAll(() => {
      component = mount(Add, {
        props: {
          type: "Block",
        },
      });

      addButton = component.find("[name=add-button]");
      addModal = component.find("[name=add-modal]");
      nevermindButton = component.find("[name=nevermind-button]");
    });

    afterEach(async () => {
      await nevermindButton.trigger("click");
    });

    it("Should show modal when clicking on the add button", async () => {
      await addButton.trigger("click");
      expect(addModal.classes()).not.toContain("translate-x-full");
      expect(addModal.classes()).toContain("-translate-y-1/2");
    });

    it("Should hide modal when clicking on the nevermind button", async () => {
      await addButton.trigger("click");
      expect(addModal.classes()).not.toContain("translate-x-full");
      await nevermindButton.trigger("click");
      expect(addModal.classes()).toContain("translate-x-full");
    });

    it("Should hide modal when clicking on the backdrop", async () => {
      await addButton.trigger("click");
      expect(addModal.classes()).not.toContain("translate-x-full");
      const backdrop = component.find("[name=backdrop-modal]");
      await backdrop.trigger("click");
      expect(addModal.classes()).toContain("translate-x-full");
    });
  });
});
