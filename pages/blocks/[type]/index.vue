<template>
    <NuxtLayout>
        <UIHeadline size="h1">

            {{ blockType?.name }}
        </UIHeadline>
        <div class="flex gap-6">
            <ModulesFilter @filterChange="filterChange" @sortChange="sortChange">
            </ModulesFilter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <NuxtLink :to="('/blocks/' + type + '/edit')"
                class="px-6 py-3 rounded-lg flex items-center gap-3 hover:shadow-lg bg-white shadow-md text-slate-700">
                <UIIcons name="setting">
                </UIIcons>
                Edit
            </NuxtLink>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <ModulesAdd :type="blockType?.name">
            </ModulesAdd>
        </div>
        <div class="flex gap-6 flex-col md:flex-row">

            <NuxtLink :to="('/blocks/' + type + '/' + item.id)" class="flex-1 max-w-md" v-for="(item, index) in data">
                <ModulesCard :title="item.title" :body="item.body" @favorite="event => updateFavorite(event, index)">
                </ModulesCard>
            </NuxtLink>

        </div>

        <div class="rounded-xl bg-gray-100 p-10 flex gap-6 items-center justify-between">
            No blocks yet. Create one <ModulesAdd @on-add="onAdd" :type="blockType?.name" button-style="system"
                label="Add block">
            </ModulesAdd>
        </div>



    </NuxtLayout>
</template>

<script setup>
import { useBlocksStore } from '~~/stores/blocks';


const { type } = useRoute().params;
const blockStore = useBlocksStore();
const { getBlockById } = blockStore;
const blockType = getBlockById(type);

// Fetch data based on type.

const updateFavorite = (event, index) => {

}

const filterChange = () => {

}

const sortChange = () => {

}

// Show data.
const data = ref([])

</script>