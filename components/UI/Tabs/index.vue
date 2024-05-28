<template>
  <div class="flex gap-3 overflow-hidden">
    <div
      v-for="tab in tabs"
      @click="change(tab)"
      name="tab"
      class="px-6 py-3 cursor-pointer flex-1 text-center rounded-lg dark:text-primary-500"
      :class="{
        ' bg-white dark:bg-primary-800 font-semibold': active === tab.name,
      }"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TTab } from "~~/components/UI/Tabs/tabs.model";

const { tabs, active } = defineProps(["tabs", "active"]);

const emits = defineEmits(["onChange"]);

const change = (tab: TTab) => {
  emits("onChange", tab);
};
</script>

<script lang="ts">
export default defineComponent({
  name: "Tabs",
});
</script>
