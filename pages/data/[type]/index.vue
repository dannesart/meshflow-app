<template>
    <NuxtLayout>

        <UIHeadline size="h1">
            {{ type }}
        </UIHeadline>
        <div class="flex gap-6">
            <ModulesFilter @filterChange="filterChange" @sortChange="sortChange">
            </ModulesFilter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <NuxtLink :to="('/data/' + type + '/edit')"
                class="px-6 py-3 rounded-lg flex items-center gap-3 hover:shadow-lg bg-white shadow-md text-slate-700">
                <UIIcons name="setting">
                </UIIcons>
                Edit model
            </NuxtLink>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <ModulesAdd :type="type">
            </ModulesAdd>
        </div>
        <ClientOnly>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" v-if="!data.length">

                <NuxtLink :to="('/data/' + type + '/' + item.id)" class="flex-1 max-w-md" v-for="(item, index) in data">
                    <ModulesCard :title="item.properties.title || item.properties.name" :body="item.updated"></ModulesCard>
                </NuxtLink>

            </div>
            <UIEmpty v-else>
                No blocks yet. Create one
                <ModulesAdd @on-add="onAdd" :type="'data'" :service-type="'Data type'" :fields="[]" button-style="system"
                    label="Add block">
                </ModulesAdd>
            </UIEmpty>
        </ClientOnly>

        <div v-if="loading" class="w-full flex items-center justify-center bg-gray-100 rounded-lg p-6">
            <UILoader></UILoader>
        </div>



    </NuxtLayout>
</template>

<script setup lang=ts>
import { storeToRefs } from 'pinia';
import { useDataStore } from '~~/stores/data';


const dataStore = useDataStore();
const { loading, dataByType } = storeToRefs(dataStore);
const { fetchDataByType } = dataStore;
const { type } = useRoute().params;
const filters = ref({});
const sorts = ref({});

// Fetch data based on type.
await fetchDataByType(type as string);

const data = computed(() => {
    return dataByType.value(type as string);
})

const filterChange = async (_filters: { [key: string]: any }) => {
    filters.value = { ...filters.value, ..._filters }
}

const sortChange = async (_sorts: { [key: string]: any }) => {
    sorts.value = { ...sorts.value, ..._sorts }
}

const onAdd = () => { }

</script>