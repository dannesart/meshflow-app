import {DOMWrapper, mount, VueWrapper} from '@vue/test-utils'
import Filter from "./Index.vue";

describe('Filter component', async () => {
    let component: VueWrapper;
    let filterButton: DOMWrapper<Element>;
    let sortButton: DOMWrapper<Element>;
    let filterOptions: DOMWrapper<Element>;
    let sortOptions: DOMWrapper<Element>;
    
    beforeEach( async() => {
        component = mount(Filter, {
            props: {}
        });
        filterButton = component.find('[name=filter-btn]');
        sortButton = component.find('[name=sort-btn]');
        filterOptions = component.find('[name=filter-options]');
        sortOptions = component.find('[name=sort-options]')
    })

    it("Should render a menu with sorting and filter options", async () => {

        expect(filterButton).toBeTruthy();
        expect(sortButton).toBeTruthy();

    })

    it("Should be able to click on the filter button to expand a filter option menu", async () => {
        await filterButton.trigger("click");
        expect(filterOptions.classes()).not.toContain('hidden');
        const filterBackdrop = component.find('[name=filter-backdrop]')
        expect(filterBackdrop).toBeTruthy();
    })

    it("Should be possible to close the filter if user clicks outside", async () => {
        await filterButton.trigger("click");

        expect(filterOptions.classes()).not.toContain('hidden');
        const filterBackdrop = component.find('[name=filter-backdrop]')
        await filterBackdrop.trigger("click");

        expect(filterOptions.classes()).toContain("hidden");
        
    })

    it("Should be able to click on the sort button to expand a sort option menu", async () => {
        await sortButton.trigger("click");
        expect(sortOptions.classes()).not.toContain('hidden');
        const sortBackdrop = component.find('[name=sort-backdrop]')
        expect(sortBackdrop).toBeTruthy();
    })

})