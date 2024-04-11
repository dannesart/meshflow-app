<template>
  <div class="flex items-center self-start gap-4">
    <div
      class="flex items-center justify-center p-3 text-xl text-primary-900 dark:text-secondary-200 bg-secondary-200 dark:bg-primary-900 rounded-xl"
      v-if="!textOnly"
    >
      MF
    </div>
    <span
      class="hidden text-xl font-extrabold md:block lg:text-2xl font-Rounded text-blue-950"
      :class="classes"
      v-if="full"
      >meshflow</span
    >
  </div>
</template>

<script setup>
const { animate, size, full, canGoDark, textOnly } = defineProps([
  "animate",
  "size",
  "full",
  "canGoDark",
  "textOnly",
]);
const classes = computed(() => ({
  "dark:text-amber-200": canGoDark,
}));
</script>

<style scoped></style>
