<template>
    <NuxtLayout>
        <Headline size="h1">
            Pages
        </Headline>
        <div class="flex gap-6">
            <Filter @filterChange="filterChange" @sortChange="sortChange"></Filter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <Add></Add>
        </div>
        <div class="flex md:gap-6 flex-col md:flex-row">

            <NuxtLink :to="('/pages/' + item.id)" class="flex-1 md:max-w-md" v-for="(item, index) in data">
                <Card :title="item.title" :body="item.body" :favorite="item.favorite"
                    @favorite="event => updateFavorite(event, index)"></Card>
            </NuxtLink>

        </div>


    </NuxtLayout>
</template>

<script setup lang=ts>

const filters = ref({});
const sorts = ref({});
const data = ref([
    {
        title: "Projects",
        body: "23",
        id: "projects",
        favorite: true
    },
    {
        title: "Companies",
        body: "6",
        id: "companies",
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