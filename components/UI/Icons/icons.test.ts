import { mount } from "@vue/test-utils"
import Icons from "./Index.vue";

describe("Icons module", () => {

    it("Should render with correct classes when passing in valid size", async () => {

        const component = mount(Icons, {
            props: {
                size: 6,
                name: 'heart'
            }
        })
        expect(component.find("svg").classes()).toContain("w-6");
        

    })

    it("Should not render with correct classes when passing in invalid size", async () => {

        const component = mount(Icons, {
            props: {
                size: 5,
                name: 'heart'
            }
        })
        expect(component.find("svg").classes()).not.toContain("w-5");
        

    })

})