<template>
    <NuxtLayout>

        <Headline size="h1">
            {{ type }}
        </Headline>
        <div class="flex gap-6">
            <Filter @filterChange="filterChange" @sortChange="sortChange"></Filter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <Add :type="type"></Add>
        </div>
        <div class="flex md:gap-6 flex-col md:flex-row">

            <NuxtLink :to="('/data/' + type + '/' + item.id)" class="flex-1 max-w-md" v-for="(item, index) in data">
                <Card :title="item.title" :body="item.body" :favorite="item.favorite"
                    @favorite="event => updateFavorite(event, index)"></Card>
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