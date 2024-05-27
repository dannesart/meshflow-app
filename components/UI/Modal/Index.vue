<template>
  <div
    name="backdrop-modal"
    v-if="showModal"
    @click="events('onClose')"
    class="fixed top-0 left-0 z-40 w-full h-full transition-all bg-secondary-300/30 dark:bg-primary-300/30 backdrop-blur-sm"
  ></div>
  <div
    name="add-modal"
    class="right-0 z-50 flex flex-col gap-6 transition-transform -translate-y-1/2 bg-white shadow-lg dark:bg-primary-900 top-1/2 md:rounded-l-xl"
    v-bind:class="{
      'h-0 w-0 overflow-hidden translate-x-full opacity-0 static p-0':
        !showModal,
      'p-10 h-full w-full opacity-100 md:w-4/5 fixed': showModal,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const { showModal } = defineProps(["showModal"]);
const events = defineEmits(["onClose"]);
</script>
