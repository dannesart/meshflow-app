<template>
  <div
    class="w-12 h-12 flex items-center justify-center rounded-full"
    :class="themes[badge.theme || 'primary']"
    v-if="badge.icon || badge.value"
  >
    <UIIcons v-if="badge.icon" :name="badge.icon"></UIIcons>
    <p v-if="badge.value">{{ badge.value }}</p>
  </div>
</template>

<script setup lang="ts">
const { badge } = defineProps(["badge"]);

const themes = {
  primary: "text-emerald-500 bg-emerald-200",
  error: "text-rose-500 bg-rose-200 ",
  secondary: "text-sky-500 bg-sky-200 ",
  warning: "text-orange-500 bg-orange-200",
  system: "text-gray-500 bg-gray-200",
};
</script>

<script lang="ts">
export default defineComponent({
  name: "Badge",
});
</script>
