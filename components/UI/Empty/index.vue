<template>
  <div
    class="flex items-center justify-between w-full gap-6 p-10 bg-gray-100 rounded-xl dark:bg-primary-950 dark:text-primary-200"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "Empty",
});
</script>
