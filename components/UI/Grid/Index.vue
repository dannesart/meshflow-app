<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%, 180px),1fr))]">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default defineComponent({
  name: "Grid",
});
</script>
