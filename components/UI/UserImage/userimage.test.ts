import { mount } from "@vue/test-utils";
import UserImage from "./Index.vue";

describe("User image", () => {
  it("Should render an img tag if image prop is provided", () => {
    const component = mount(UserImage, {
      props: {
        image: "/path/to/img.png",
      },
    });

    expect(component.find("img").exists()).toBe(true);
  });

  it("Should render a div tag with first letter in first name if no image prop is provided and name is provided", () => {
    const component = mount(UserImage, {
      props: {
        name: "Joe Doe",
      },
    });

    expect(component.find("div").exists()).toBe(true);
    expect(component.find("div").element.innerHTML).toBe("J");
  });
});
