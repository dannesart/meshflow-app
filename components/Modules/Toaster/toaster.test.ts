import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import Toaster from "./Index.vue";
import { useNotificationStore } from "~~/stores/notifications";

describe("Toaster", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Should display a toast message if store is provided with data. If should be removed after 5 seconds", async () => {
    const component = mount(Toaster);
    const notificationStore = useNotificationStore();
    notificationStore.setNotification("Hello", "World");

    await setTimeout(() => {}, 200);
    expect(component.find("p").element.innerHTML).toBe("World");
  });
});
