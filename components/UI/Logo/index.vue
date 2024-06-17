<template>
  <div class="flex items-center self-start gap-4 group">
    <div
      class="flex font-Oswald font-bold items-center h-14 aspect-square justify-center text-4xl text-secondary-950/60 dark:text-secondary-200 bg-secondary-200 dark:bg-primary-900 rounded-xl"
      v-if="!textOnly"
    >
      <div class="group-hover:scale-75 transition-transform">MF</div>
    </div>
    <span
      class="text-2xl font-extrabold lg:text-2xl font-Rounded text-primary-950"
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
  "dark:text-secondary-200": canGoDark,
  "hidden md:block": !textOnly,
}));
</script>

<style scoped></style>
