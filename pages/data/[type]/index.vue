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
        <div class="flex md:gap-6 flex-col md:flex-row">

            <NuxtLink :to="('/data/' + type + '/' + item.id)" class="flex-1 max-w-md" v-for="(item, index) in data">
                <ModulesCard :title="item.title" :body="item.body" :favorite="item.favorite"
                    @favorite="event => updateFavorite(event, index)"></ModulesCard>
            </NuxtLink>

        </div>



    </NuxtLayout>
</template>

<script setup lang=ts>

const { type } = useRoute().params;
const filters = ref({});
const sorts = ref({});

// Fetch data based on type.

// Show data.
const data = ref([
    {
        title: "Title 1",
        body: "Body 1",
        id: "34DA424",
        favorite: true
    },
    {
        title: "Title 2",
        body: "Body 2",
        id: "80AF823",
        favorite: false
    }
])

const filterChange = async (_filters: { [key: string]: any }) => {
    filters.value = { ...filters.value, ..._filters }
}

const sortChange = async (_sorts: { [key: string]: any }) => {
    sorts.value = { ...sorts.value, ..._sorts }
}

const updateFavorite = (favorite: any, itemIdx: number) => {
    const newData = [...data.value]
    newData[itemIdx] = { ...newData[itemIdx], favorite }
    data.value = newData;
}

</script>