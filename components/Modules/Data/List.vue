<template>
    <NuxtLink :to="('/data/' + item.id)" class="flex-1 md:max-w-md" v-for="(item, index) in data">
        <ModulesCard :title="item.title" :body="item.body" :favorite="item.favorite"
            @favorite="event => updateFavorite(event, index)"></ModulesCard>
    </NuxtLink>
</template>

<script setup lang=ts>

const updateFavorite = (favorite: any, itemIdx: number) => {
    // const newData = [...data.value]
    // newData[itemIdx] = { ...newData[itemIdx], favorite }
    // data.value = newData;
}

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
</script>