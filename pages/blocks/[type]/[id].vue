<template>
  <NuxtLayout>
    <template v-if="block">
      <UIHeadline
        size="h1"
        editable="true"
        :value="block.properties.title || block.properties.name"
      >
        {{ block.properties.title || block.properties.name }}
      </UIHeadline>
      Updated {{ useTimeAgo(block.updated) }}
      <div v-for="(field, idx) of model.fields">
        <ModulesInput :type="field.type.id" :value="block.properties[field.id]">
          {{ field.name }}
        </ModulesInput>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useBlocksStore } from "~~/stores/blocks";
const { id, type } = useRoute().params;
const { getBlockById, getBlocksByType, fetchBlocks, getBlockModelById } =
  useBlocksStore();
const model = getBlockModelById(type);
if (!getBlocksByType(type as string)) fetchBlocks(type as string);

// Fetch data based on id.
const block = computed(() => getBlockById(type as string, id as string));

// Show data.
</script>
