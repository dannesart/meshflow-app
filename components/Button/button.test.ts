import { mount } from "@vue/test-utils"
import Button from "./Index.vue";

describe("Button", () => {

    it("Should get correct classes if type is provided", () => {

        const component = mount(Button, {
            props: {
                type: "add"
            }
        })

        expect(component.classes()).toContain("bg-blue-600");
        expect(component.classes()).toContain("text-white");

    })

    it("Should get no special classes if type is not provided", () => {

        const component = mount(Button, {
            props: {
                type: ""
            }
        })

        expect(component.classes()).not.toContain("bg-blue-600");

    })

    it("Should get a full rounded class if size is round", () => {
        const component = mount(Button, {
            props: {
                type: "icon",
                size: 'round'
            }
        })
        expect(component.classes()).toContain('rounded-full');
    })

})