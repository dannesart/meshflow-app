<template>
    <div class="flex gap-4">

        <!-- Sort -->
        <div class="relative z-20">
            <Button name="sort-btn" @click="toggleSortOptions()" type="system">
                <Icons name="sort"></Icons>
                Sort
            </Button>
            <div class="bg-white shadow-lg rounded-lg p-5 absolute top-full w-64 flex flex-col gap-4"
                name="sort-options" v-bind:class="{ 'hidden': !showingSort }">
                <label class="flex justify-center gap-2 flex-col">

                    <Input type="select" :value="sortTypes[0]" :values="sortTypes"
                        @value-update="event => setSort('type', event)">
                    <label>Sort by</label>
                    </Input>
                </label>
                <label class="flex justify-center gap-2 flex-col">

                    <Input type="select" :value="sortDirections[0]" :values="sortDirections"
                        @value-update="event => setSort('direction', event)">
                    <label>Direction</label>
                    </Input>
                </label>
            </div>
        </div>

        <!-- Filters -->
        <div class="relative z-20">
            <Button name="filter-btn" @click="toggleFilterOptions()" type="system">
                <Icons name="filter"></Icons>

                Filter
            </Button>

            <div class="bg-white shadow-lg rounded-lg p-5 absolute top-full w-64 " name="filter-options"
                v-bind:class="{ 'hidden': !showingFilter }">
                <ul>
                    <li>
                        <label class="flex items-center gap-3 cursor-pointer ">
                            <input type="checkbox" @change="setFilter('favorites', !filters.favorites)"
                                class="border-gray-300 rounded h-5 w-5" />
                            Show only favorites
                        </label>
                    </li>
                </ul>
            </div>
        </div>

        <div name="filter-backdrop" class="fixed w-full left-0 top-0 h-full bg-transparent z-10" v-if="showingFilter"
            @click="toggleFilterOptions()"></div>
        <div name="sort-backdrop" class="fixed w-full left-0 top-0 h-full bg-transparent z-10" v-if="showingSort"
            @click="toggleSortOptions()"></div>

    </div>
</template>

<script setup lang=ts>

import { Filters, Sort } from './filter.model';

const eventEmit = defineEmits(['filterChange', 'sortChange']);
const sortTypes = ['Name', 'Status', 'Updated']
const sortDirections = ['Falling', 'Rising']

// Filter state
const showingFilter = ref(false);
const toggleFilterOptions = () => {
    showingSort.value = false;
    showingFilter.value = !showingFilter.value
};
const filters = ref<Filters>({
    favorites: false
});
const setFilter = async (key: string, value: boolean) => {
    filters.value = { ...filters.value, [key]: value }
    const emitValue = toRaw(sorts.value);
    eventEmit('filterChange', emitValue)

}

// Filter state
const showingSort = ref(false);
const toggleSortOptions = () => {
    showingFilter.value = false;
    showingSort.value = !showingSort.value
};
const sorts = ref<Sort>({
    type: "name"
});
const setSort = async (key: string, target: EventTarget | null) => {

    if (target) {
        const { value } = target as { value?: string };
        sorts.value = { ...sorts.value, [key]: value }
    }
    const emitValue = toRaw(sorts.value);
    eventEmit('sortChange', emitValue)
}


</script>