import { mount } from "@vue/test-utils"
import { ExtendedLinkMock } from "./extendedlink.mock";

import ExtendedLink from "./Index.vue";

describe("Extended link", () => {

    it("Should render component with a link, provided by param", async () => {
        const component = mount(ExtendedLink, {
            props: ExtendedLinkMock
        });
        const link = component.attributes().to;
        expect(link).toMatch(component.props().route);
    })

   

})