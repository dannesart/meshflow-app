<template>
  <li
    class="flex gap-3 p-4 px-6 bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg dark:bg-primary-950 dark:text-primary-200"
  >
    <slot />
  </li>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default defineComponent({
  name: "ListItem",
});
</script>
