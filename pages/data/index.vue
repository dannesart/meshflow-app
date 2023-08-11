<template>
    <NuxtLayout>

        <UIHeadline size="h1">
            Data types
        </UIHeadline>
        <div class="flex gap-6">
            <ModulesFilter @filterChange="filterChange" @sortChange="sortChange">
            </ModulesFilter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <ModulesAdd type="model" label="Add type" service-type="data">

            </ModulesAdd>
        </div>
        <div class="flex md:gap-6 flex-col md:flex-row">

            <NuxtLink :to="('/data/' + item.id)" class="flex-1 md:max-w-md" v-for="(item, index) in data">
                <ModulesCard :title="item.title" :body="item.body" :favorite="item.favorite"
                    @favorite="event => updateFavorite(event, index)"></ModulesCard>
            </NuxtLink>

        </div>


    </NuxtLayout>
</template>

<script setup lang=ts>

const filters = ref({});
const sorts = ref({});
const data = ref([
    {
        title: "Project",
        body: "23",
        id: "project",
        favorite: true
    },
    {
        title: "Company",
        body: "6",
        id: "company",
        favorite: false
    }
])

const updateFavorite = (favorite: any, itemIdx: number) => {
    const newData = [...data.value]
    newData[itemIdx] = { ...newData[itemIdx], favorite }
    data.value = newData;
}

const filterChange = async (_filters: { [key: string]: any }) => {
    filters.value = { ...filters.value, ..._filters }
}

const sortChange = async (_sorts: { [key: string]: any }) => {
    sorts.value = { ...sorts.value, ..._sorts }
}

</script>