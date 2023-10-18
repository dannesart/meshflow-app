<template>
  <NuxtLayout>
    <UIHeadline size="h1">
      {{ id }}
    </UIHeadline>
    <div class="flex gap-6">
      Block with a type of {{ type }} and id {{ id }}
      <div v-if="block">
        {{ block }}
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useBlocksStore } from "~~/stores/blocks";
import { storeToRefs } from "pinia";
const { id, type } = useRoute().params;
const { getBlockById, getBlocksByType, fetchBlocks, getBlockModelById } =
  useBlocksStore();
const blockType = computed(() => getBlockModelById(type as string));

if (!getBlocksByType(blockType.value?.id)) fetchBlocks(blockType.value?.id);

// Fetch data based on id.
const block = computed(() =>
  getBlockById(blockType.value?.id as string, id as string)
);

// Show data.
</script>
