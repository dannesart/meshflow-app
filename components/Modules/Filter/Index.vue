<template>
  <div class="flex gap-4">
    <!-- Sort -->
    <UIDropDown icon="sort" data-test="sort">
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
    </UIDropDown>

    <!-- Filters -->
    <div data-test="filter">
      <UIDropDown icon="filter" :items="filters" @update="setFilter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FiltersData } from "./filter.data";

const eventEmit = defineEmits(["filterChange", "sortChange"]);
const sortTypes = ["Name", "Status", "Updated"];
const sortDirections = ["Falling", "Rising"];

// Filter state
const showingFilter = ref(false);
const toggleFilterOptions = () => {
  showingSort.value = false;
  showingFilter.value = !showingFilter.value;
};
const filters = ref(FiltersData);
const setFilter = async (key: string, value: boolean) => {
  const idx = filters.value.findIndex((filter) => filter.id === key);
  filters.value[idx].checked = value;
  const emitValue = toRaw(filters.value);
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
