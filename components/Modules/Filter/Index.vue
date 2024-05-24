<template>
  <div class="flex gap-4">
    <!-- Sort -->
    <div
      class="relative"
      :class="{ 'z-30': showingSort, 'z-20': !showingSort }"
    >
      <UIButton name="sort-btn" @click="toggleSortOptions()" type="system">
        <UIIcons name="sort"></UIIcons>
        <span class="hidden lg:block">Sort</span>
      </UIButton>
      <div
        class="fixed z-50 bottom-0 h-5/6 md:h-auto flex flex-col gap-4 p-5 bg-white rounded-lg shadow-lg dark:bg-primary-900 dark:text-primary-100 md:absolute left-4 right-4 md:left-auto md:right-auto md:bottom-auto md:top-full md:w-64"
        name="sort-options"
        v-bind:class="{ hidden: !showingSort }"
      >
        <label class="flex flex-col justify-center gap-2">
          <ModulesInput
            type="select"
            :value="sortTypes[0]"
            :values="sortTypes"
            @value-update="(event) => setSort('type', event)"
          >
            <label>Sort by</label>
          </ModulesInput>
        </label>
        <label class="flex flex-col justify-center gap-2">
          <ModulesInput
            type="select"
            :value="sortDirections[0]"
            :values="sortDirections"
            @value-update="(event) => setSort('direction', event)"
          >
            <label>Direction</label>
          </ModulesInput>
        </label>
        <UIButton
          name="sort-close-btn"
          class="lg:hidden"
          @click="toggleSortOptions()"
          type="nevermind"
        >
          <label>Close</label>
        </UIButton>
      </div>
    </div>

    <!-- Filters -->
    <div
      class="relative"
      :class="{ 'z-30': showingFilter, 'z-20': !showingFilter }"
    >
      <UIButton name="filter-btn" @click="toggleFilterOptions()" type="system">
        <UIIcons name="filter"></UIIcons>

        <span class="hidden lg:block">Filter</span>
      </UIButton>

      <div
        class="fixed z-50 bottom-0 h-5/6 md:h-auto flex flex-col gap-4 p-5 bg-white rounded-lg shadow-lg dark:bg-primary-900 dark:text-primary-100 md:absolute left-4 right-4 md:left-auto md:right-auto md:bottom-auto md:top-full md:w-64"
        name="filter-options"
        v-bind:class="{ hidden: !showingFilter }"
      >
        <ul>
          <li>
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                @change="setFilter('favorites', !filters.favorites)"
                class="w-5 h-5 border-gray-300 rounded"
              />
              Show only favorites
            </label>
          </li>
        </ul>
        <UIButton
          name="sort-close-btn"
          class="lg:hidden"
          @click="toggleSortOptions()"
          type="nevermind"
        >
          <label>Close</label>
        </UIButton>
      </div>
    </div>

    <div
      name="filter-backdrop"
      class="fixed top-0 left-0 z-10 w-full h-full bg-transparent"
      v-if="showingFilter"
      @click="toggleFilterOptions()"
    ></div>
    <div
      name="sort-backdrop"
      class="fixed top-0 left-0 z-10 w-full h-full bg-transparent"
      v-if="showingSort"
      @click="toggleSortOptions()"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { Filters, Sort } from "./filter.model";

const eventEmit = defineEmits(["filterChange", "sortChange"]);
const sortTypes = ["Name", "Status", "Updated"];
const sortDirections = ["Falling", "Rising"];

// Filter state
const showingFilter = ref(false);
const toggleFilterOptions = () => {
  showingSort.value = false;
  showingFilter.value = !showingFilter.value;
};
const filters = ref({
  favorites: false,
});
const setFilter = async (key: string, value: boolean) => {
  filters.value = { ...filters.value, [key]: value };
  const emitValue = toRaw(sorts.value);
  eventEmit("filterChange", emitValue);
};

// Filter state
const showingSort = ref(false);
const toggleSortOptions = () => {
  showingFilter.value = false;
  showingSort.value = !showingSort.value;
};
const sorts = ref<Sort>({
  type: "name",
});
const setSort = async (key: string, target: EventTarget | null) => {
  if (target) {
    const { value } = target as { value?: string };
    sorts.value = { ...sorts.value, [key]: value };
  }
  const emitValue = toRaw(sorts.value);
  eventEmit("sortChange", emitValue);
};
</script>
