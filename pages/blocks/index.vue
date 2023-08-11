<template>
    <NuxtLayout>

        <UIHeadline size="h1">
            Block types
        </UIHeadline>
        <div class="flex gap-6">
            <ModulesFilter @filterChange="filterChange" @sortChange="sortChange"></ModulesFilter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <ModulesAdd type="block" label="Add type" @onAdd="onAdd" @onCancel="onCancel">

            </ModulesAdd>
        </div>
        <div class="flex gap-6 flex-col md:flex-row">

            <NuxtLink :to="('/blocks/' + item.id)" class="flex-1 md:max-w-md" v-for="(item, index) in blocks">
                <ModulesCard :title="item.title" :body="item.status" :tags="item.tags" :favorite="false"
                    @favorite="event => updateFavorite(event, index)"></ModulesCard>
            </NuxtLink>


        </div>
        <div v-if="!blocks.length" class="rounded-xl bg-gray-100 p-10 flex gap-6 items-center justify-between">
            No blocks yet. Create or add existing one <ModulesAdd @on-add="onAdd" type="block" button-style="system"
                label="Add block">
            </ModulesAdd>
        </div>


    </NuxtLayout>
</template>

<script setup lang=ts>
import { Block } from '~~/models/blocks';
import { useBlocksStore } from '~~/stores/blocks';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '~~/stores/notifications';
const notificationsStore = useNotificationStore();
const blockStore = useBlocksStore();
const { setNotification } = notificationsStore;
const { loading, blocks } = storeToRefs(blockStore)
const { addBlock } = blockStore;
const filters = ref({});
const sorts = ref({});


const updateFavorite = (favorite: any, itemIdx: number) => {
    // const newData = [...data.value]
    // newData[itemIdx] = { ...newData[itemIdx], favorite }
    // data.value = newData;
}

const filterChange = async (_filters: { [key: string]: any }) => {
    filters.value = { ...filters.value, ..._filters }
}

const sortChange = async (_sorts: { [key: string]: any }) => {
    sorts.value = { ...sorts.value, ..._sorts }
}

const onAdd = async (block: Block) => {

    if (await addBlock(block)) {
        setNotification("Page created", "Your page was successfully created", "success");
    } else {
        setNotification(
            "Page not created",
            "The page could not be created!",
            "fail"
        )
    }


}
const onCancel = () => {
    console.log("Cancel new block")
}

</script>