<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default defineComponent({
  name: "Grid",
});
</script>
