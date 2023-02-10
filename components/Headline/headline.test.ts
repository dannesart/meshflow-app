import { mount } from "@vue/test-utils"
import Headline from "./Index.vue";

describe("Headline", () => {
    it("Should render a headline based on size", () => {

        const component = mount(Headline, {
            props: {
                size: 'h1'
            },
            slots: {
                default: "My headline"
            }
        })
        expect(component.find("h1").text()).toContain("My headline");
        expect(component.find("h1").text()).not.to.be.empty;
        expect(component.find("h2").exists()).to.be.false;
        expect(component.find("h3").exists()).to.be.false;
    })

    it("Should render a headline based on size", () => {

        const component = mount(Headline, {
            props: {
                size: 'h2'
            },
            slots: {
                default: "My headline"
            }
        })
        expect(component.find("h2").text()).toContain("My headline");
        expect(component.find("h2").text()).not.to.be.empty;
        expect(component.find("h1").exists()).to.be.false;
        expect(component.find("h3").exists()).to.be.false;
    })
})