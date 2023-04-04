<template>
    <NuxtLayout>



        <UIHeadline size="h1">
            Block types
        </UIHeadline>
        <div class="flex gap-6">
            <ModulesFilter @filterChange="filterChange" @sortChange="sortChange"></ModulesFilter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <ModulesAdd type="block" @onAdd="onAdd" @onCancel="onCancel">
                <UIForm>
                    <UIInput type="text" :value="newBlockForm.name" @valueUpdate="newBlockForm.name = $event">
                        Name
                    </UIInput>
                </UIForm>
            </ModulesAdd>
        </div>
        <div class="flex md:gap-6 flex-col md:flex-row">

            <NuxtLink :to="('/blocks/' + item.id)" class="flex-1 md:max-w-md" v-for="(item, index) in data">
                <ModulesCard :title="item.title" :body="item.body" :favorite="item.favorite"
                    @favorite="event => updateFavorite(event, index)"></ModulesCard>
            </NuxtLink>

        </div>


    </NuxtLayout>
</template>

<script setup lang=ts>

const filters = ref({});
const sorts = ref({});
const newBlockForm = ref({
    name: ''
})

const data = ref([
    {
        title: "Projects",
        body: "23 active projects",
        id: "projects",
        favorite: true
    },
    {
        title: "Companies",
        body: "6 active companies",
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

const onAdd = () => {
    console.log("Add new block", newBlockForm.value)
}
const onCancel = () => {
    console.log("Cancel new block")
}

</script>