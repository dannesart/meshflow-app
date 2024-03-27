<template>
  <div
    class="bg-white rounded-xl p-4 px-8 shadow-xl transition-transform flex gap-3 items-center"
  >
    <div
      class="w-10 h-10 rounded-lg flex items-center justify-center"
      :class="{
        'bg-red-100 text-red-500': type === 'error',
        'bg-emerald-100 text-emerald-500': type === 'success',
      }"
    >
      <UIIcons name="rocket" v-if="type === 'success'"></UIIcons>
      <UIIcons name="close" v-if="type === 'error'"></UIIcons>
    </div>

    <div class="">
      <p>
        <slot />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { type } = defineProps(["type"]);
</script>

<script lang="ts">
export default defineComponent({
  name: "message",
});
</script>
