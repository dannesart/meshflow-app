<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            {{ id }}
        </UIHeadline>
        <div class="flex gap-6">
            Block with a type of {{ type }} and id {{ id }}
            <div v-if="block">
                {{block}}
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { useBlocksStore } = from '~~/stores/blocks';
import { storeToRefs } from 'pinia';
const { id, type } = useRoute().params;

    // Fetch data based on id.
    const block = computed(() => getBlockById(type as string, id as string));

    // Show data.

</script>
