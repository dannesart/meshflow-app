<template>
    <NuxtLayout>

        <UIHeadline size="h1">
            Block types
        </UIHeadline>
        <div class="flex gap-6">
            <ModulesFilter @filterChange="filterChange" @sortChange="sortChange"></ModulesFilter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <ModulesAdd type="model" label="Add type" service-type="block" @onAdd="onAdd" @onCancel="onCancel"></ModulesAdd>
        </div>
        <ClientOnly>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" v-if="blockModels.length">
                <NuxtLink :to="('/blocks/' + item.id)" class="flex-1" v-for="(item, index) in blockModels">
                    <ModulesCard :title="item.name" :body="item.description" :tags="item.tags" :favorite="false"
                        @favorite="event => updateFavorite(event, index)"></ModulesCard>
                </NuxtLink>
            </div>
            <UIEmpty v-else-if="!loading">
                No block types yet. Create one <ModulesAdd @on-add="onAdd" type="model" service-type="block"
                    button-style="system" label="Add block type">
                </ModulesAdd>
            </UIEmpty>
        </ClientOnly>


    </NuxtLayout>
</template>

<script setup lang=ts>
import { BlockModel } from '~~/models/blocks';
import { useBlocksStore } from '~~/stores/blocks';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '~~/stores/notifications';
const notificationsStore = useNotificationStore();
const blockStore = useBlocksStore();
const { setNotification } = notificationsStore;
const { loading, blockModels } = storeToRefs(blockStore)
const { addBlockModel } = blockStore;
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

const onAdd = async (blockModel: BlockModel) => {

    if (await addBlockModel(blockModel)) {
        setNotification("Block created", "Your block was successfully created", "success");
    } else {
        setNotification(
            "Block not created",
            "The block could not be created!",
            "fail"
        )
    }


}
const onCancel = () => {
    console.log("Cancel new block")
}

</script>

<script lang="ts">
export default defineComponent({
    name: 'Blocks'
})
</script>