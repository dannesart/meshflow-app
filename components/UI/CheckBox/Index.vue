<template>
  <div
    class="flex w-full gap-3 items-center cursor-pointer"
    data-test="checkbox"
    @click="emits('update', id, !value)"
  >
    <div
      class="w-6 h-6 rounded-lg cursor-pointer"
      :class="{ 'bg-primary-400 text-white': value, 'bg-slate-200': !value }"
      :name="name"
      :id="id"
    >
      <Icon name="mdi:check" color="white" size="24" v-if="value" />
    </div>
    <label class="cursor-pointer first-letter:capitalize">
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
type Props = {
  value?: any;
  name?: string;
  id?: string;
};

const props = withDefaults(defineProps<Props>(), {
  name: "",
  id: "",
});

const emits = defineEmits(["update"]);
</script>
