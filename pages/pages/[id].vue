<template>
    <NuxtLayout>

        <UIHeadline size="h1" v-if="page">
            {{ page.title }}
        </UIHeadline>

        <div class="flex gap-6" v-if="page">
            {{ page.status }}
        </div>

        <footer class="flex gap-3">
            <UIButton type="add">Save</UIButton>
            <UIButton type="nevermind">Delete</UIButton>
        </footer>
    </NuxtLayout>
</template>

<script setup>

import { usePagesStore } from '~~/stores/pages';

const { id } = useRoute().params;
const { getPageById } = usePagesStore()
const page = getPageById(id);

const deletePage = () => {

}

    // Fetch data based on id.

    // Show data.

</script>