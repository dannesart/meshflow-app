<template>
    <NuxtLayout>
        <UIHeadline size="h1">

            {{ type }}
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
            <ModulesAdd :type="type">
            </ModulesAdd>
        </div>
        <div class="flex md:gap-6 flex-col md:flex-row">

            <NuxtLink :to="('/blocks/' + type + '/' + item.id)" class="flex-1 max-w-md" v-for="(item, index) in data">
                <Card :title="item.title" :body="item.body" :favorite="item.favorite"
                    @favorite="event => updateFavorite(event, index)"></Card>
            </NuxtLink>

        </div>



    </NuxtLayout>
</template>

<script setup>

const { type } = useRoute().params;

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

</script>