<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            Pages
        </UIHeadline>
        <div class="flex gap-6">
            <ModulesFilter @filterChange="filterChange" @sortChange="sortChange"></ModulesFilter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <ModulesAdd label="Add new page" type="page"></ModulesAdd>
        </div>
        <div class="flex md:gap-6 flex-col md:flex-row">

            <NuxtLink :to="('/pages/' + page.id)" class="flex-1 md:max-w-md" v-for="(page, index) in pages">
                <ModulesCard :title="page.title" :body="page.body" :favorite="page.favorite"
                    @favorite="event => updateFavorite(event, index)"></ModulesCard>
            </NuxtLink>

        </div>


    </NuxtLayout>
</template>

<script setup lang=ts>

import { usePagesStore } from '~~/stores/pages';

const filters = ref({});
const sorts = ref({});
const { pages } = usePagesStore();

const updateFavorite = (favorite: any, itemIdx: number) => {
    // const newData = [...pages.value]
    // newData[itemIdx] = { ...newData[itemIdx], favorite }
    // page = newData;
}

const filterChange = async (_filters: { [key: string]: any }) => {
    filters.value = { ...filters.value, ..._filters }
}

const sortChange = async (_sorts: { [key: string]: any }) => {
    sorts.value = { ...sorts.value, ..._sorts }
}

</script>