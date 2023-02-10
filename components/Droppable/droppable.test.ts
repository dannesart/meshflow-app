import { mount } from "@vue/test-utils";
import Droppable from "./Index.vue";
import { DroppableMock, DropEventMock }  from "./droppable.mock";


describe("A droppable container", () => {

    it("Keep track of a list and status of a specific container", () => {

        const component = mount(Droppable, {
            props: DroppableMock
        });
        expect(component.props().list[1].status).toBe(1);
        component.find("div").trigger("drop", DropEventMock)
        expect(component.props().list[1].status).toBe(0);

    })


})