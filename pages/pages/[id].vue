<template>
    <NuxtLayout>
        <header class="flex gap-4">
            <UIHeadline size="h1">
                {{ page?.title }}
            </UIHeadline>

        </header>
        <div class="flex gap-6 flex-col md:flex-row" v-if="page">


            <div class="flex gap-6">
                {{ page.status }}
            </div>

            <footer class="flex gap-3">
                <UIButton type="add">Save</UIButton>
                <UIButton type="nevermind">Delete</UIButton>
            </footer>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

import { usePagesStore } from '~~/stores/pages';
import { Page } from '~~/models/page';

const { id } = useRoute().params;
const { getPageById } = usePagesStore()
const page = ref<Page>(getPageById(id as string) as Page);

const deletePage = () => {

}

    // Fetch data based on id.

    // Show data.

</script>