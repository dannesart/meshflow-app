import { mount } from "@vue/test-utils";
import UserInfo from "./Index.vue";

describe("User info", () => {
  it("Should display user name and role", () => {
    const component = mount(UserInfo, {
      props: {
        name: "Daniel",
        role: "Developer",
      },
    });

    expect(component.find("[name=user-info-role]").text()).toContain(
      "Developer"
    );
    expect(component.find("[name=user-info-name]").text()).toContain("Daniel");
  });

  it("Should render the first letter of the name as 'avatar'", () => {
    const component = mount(UserInfo, {
      props: {
        name: "Daniel",
        role: "Developer",
      },
    });

    expect(component.find("[name=user-info-avatar]").text()).toContain("D");
  });

  it("Should be empty if no name was passed in", () => {
    const component = mount(UserInfo, {
      props: {
        role: "Developer",
      },
    });
    expect(component.find("[name=user-info-name]").text()).toBe("@");
  });
});
