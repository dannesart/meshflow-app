import { mount } from "@vue/test-utils";
import {
  createPinia,
  PiniaCustomStateProperties,
  setActivePinia,
  Store,
  StoreDefinition,
} from "pinia";
import { useUsersStore } from "~~/stores/users";
import UserTag from "./Index.vue";

describe("User tag", () => {
  setActivePinia(createPinia());
  let usersStore = useUsersStore();

  afterEach(() => {
    usersStore.$reset();
  });
  it("Should display a block with full name if id is provided and user exists", async () => {
    const testUser = {
      id: "324234234234",
      email: "324234234234",
      name: "Daniel Mårtensson",
    };
    usersStore.users[testUser.id] = testUser;

    const component = mount(UserTag, {
      props: {
        id: "324234234234",
      },
    });

    expect(component.find("[data-test=user-tag]").exists()).toBe(true);
    expect(component.find("[data-test=user-tag]").element.innerHTML).toBe(
      testUser.name
    );
  });
  it("Should display unknown if no user is matched", async () => {
    const component = mount(UserTag, {
      props: {
        id: "324234234234",
      },
    });

    expect(component.find("[data-test=user-tag-unknown]").exists()).toBe(true);
  });
});
