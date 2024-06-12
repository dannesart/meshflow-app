<template>
  <time class="text-gray-400">
    {{ text }}
  </time>
</template>

<script setup>
const { date } = defineProps(["date"]);
const text = useTimeAgo(date);
</script>
