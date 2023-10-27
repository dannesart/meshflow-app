<template>
  <div
    class="flex gap-6 rounded-xl bg-white p-6 py-3 shadow-xl hover:shadow-2xl cursor-pointer"
  >
    <div class="flex flex-col gap-1">
      <UIHeadline size="h4" :class="'flex gap-3 items-center'">
        {{ block.properties.name || block.properties.title }}
        <span
          class="text-sm"
          :class="{
            'text-emerald-400': block.status === 'public',
            'text-red-400': block.status === 'private',
          }"
        >
          {{ block.status }}
        </span>
      </UIHeadline>
      <p class="text-sm text-gray-500">
        {{ getBlockModelById(block?.type)?.name }}
      </p>
    </div>
    <div class="flex items-center justify-center mr-0 ml-auto">
      <UIButton
        type="icon"
        size="round-small"
        class="bg-transparent"
        @click="emits('remove')"
      >
        <UIIcons name="close"></UIIcons>
      </UIButton>
      <ModulesEdit type="block" icon="dots" :size="4" button-style="icon">
      </ModulesEdit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBlocksStore } from "~~/stores/blocks";

const { id, type, data } = defineProps(["id", "type", "data"]);
const emits = defineEmits(["remove"]);
const blocksStore = useBlocksStore();
const { fetchBlockModels, getBlockModelById } = blocksStore;
const { getBlockById } = storeToRefs(blocksStore);
const block = computed(() => {
  return data ? data : getBlockById.value(type, id);
});
</script>

<script lang="ts">
export default defineComponent({
  name: "Entity",
});
</script>
