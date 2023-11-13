<template>
  <article
    class="relative flex flex-none w-10/12 gap-5 p-5 overflow-hidden bg-white rounded-lg shadow-lg md:flex-col lg:flex-row md:flex-1 snap-center"
  >
    <div class="flex flex-col flex-1 gap-3">
      <UIHeadline size="h4">
        {{ label }}
      </UIHeadline>
      <p class="text-4xl font-semibold text-sky-800">
        {{ number }} <span class="text-sm text-gray-400">/ 10</span>
      </p>
      <div
        class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white/70"
        v-if="isLoading"
      >
        <UILoader></UILoader>
      </div>
    </div>
    <ClientOnly>
      <UIDiagram :max="10" :min="0" :value="number"></UIDiagram>
    </ClientOnly>
    <div class="" v-if="errors">
      <p class="text-red-600 cursor-pointer">{{ errors }} errors</p>
    </div>
  </article>
</template>

<script setup lang="ts">
const { label, number, errors } = defineProps(["label", "number", "errors"]);
const isLoading = ref(false);
</script>

<script lang="ts">
export default defineComponent({
  name: "Stat",
});
</script>
