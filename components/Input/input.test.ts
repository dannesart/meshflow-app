import { mount } from "@vue/test-utils"
import Input from "./Index.vue";

describe('Input', () => {
    it("Should render a textarea if passing in type text-lg", () => {

        const component = mount(Input, {
            props: {
                type: 'text-lg',
                value: 'Example'
            }
        })

        expect(component.find('textarea').exists()).toBe(true);
        expect(component.find('textarea').element.value).toBe('Example')

    })

    it("Should render an input of type number if passing in type number", () => {

        const component = mount(Input, {
            props: {
                type: 'number',
                value: 1
            }
        })

        expect(component.find('input[type=number]').exists()).toBe(true);
        expect(component.find('input').element.value).toBe('1');

    })
})