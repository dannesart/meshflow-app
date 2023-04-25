<template>
    <NuxtLayout>
        <UIHeadline size="h1" v-if="page">
            {{ page.title }}
        </UIHeadline>


        <div class="flex gap-6" v-if="page">
            {{ page.status }}
        </div>

    </NuxtLayout>
</template>

<script setup>

import { usePagesStore } from '~~/stores/pages';

const { id } = useRoute().params;
const { getPageById } = usePagesStore()
const page = getPageById(id);

    // Fetch data based on id.

    // Show data.

</script>