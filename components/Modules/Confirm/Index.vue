<template>
  <div v-if="show">
    <div
      class="fixed z-50 flex flex-col gap-6 p-6 -translate-x-1/2 -translate-y-1/2 bg-white w-96 rounded-2xl top-1/2 left-1/2"
    >
      <UIHeadline size="h1"> Confirm </UIHeadline>

      <slot />

      <div class="flex gap-6">
        <UIButton @click="handleConfirm" type="delete" size="inverted">
          Confirm
        </UIButton>
        <UIButton @click="handleDeny" type="nevermind"> Nevermind </UIButton>
      </div>
    </div>
    <div
      class="fixed top-0 left-0 z-40 w-full h-full transition-all bg-red-600/50 backdrop-blur-sm"
      @click="handleDeny"
    ></div>
  </div>
</template>
<script setup lang="ts">
const { show } = defineProps(["show"]);
const events = defineEmits(["onConfirm", "onDeny"]);

const handleConfirm = () => {
  events("onConfirm");
};
const handleDeny = () => {
  events("onDeny");
};
</script>
