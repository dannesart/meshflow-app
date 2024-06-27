<template>
  <article
    class="relative flex flex-none w-10/12 min-h-36 gap-5 p-5 overflow-hidden bg-white dark:bg-primary-800 rounded-lg shadow-lg md:flex-col lg:flex-row md:flex-1 snap-center"
  >
    <div class="flex flex-col flex-1 gap-3">
      <UIHeadline size="h4">
        {{ label }}
      </UIHeadline>
      <p class="text-4xl font-semibold text-primary-800 dark:text-primary-100">
        {{ number }} <span class="text-sm text-gray-400">/ 10</span>
      </p>
      <div
        class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white/70"
        v-if="isLoading"
      >
        <UILoader></UILoader>
      </div>
    </div>
    <UIDiagram :max="10" :min="0" :value="number"></UIDiagram>
    <div class="" v-if="errors">
      <p class="text-rose-600 cursor-pointer">{{ errors }} errors</p>
    </div>
  </article>
</template>

<script setup lang="ts">
type Props = {
  label: string;
  number: number;
  errors: string;
};
const props = withDefaults(defineProps<Props>(), {
  label: "",
  number: 0,
  errors: "",
});
const isLoading = ref(false);
</script>

<script lang="ts">
export default defineComponent({
  name: "Stat",
});
</script>
