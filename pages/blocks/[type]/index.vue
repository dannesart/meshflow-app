<template>
    <NuxtLayout>
        <UIHeadline size="h1">

            {{ blockType?.name }}
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
            <ModulesAdd @on-add="onAdd" :type="'data'" :service-type="blockType?.name" :fields="blockType?.fields"
                button-style="system" label="Add block">
            </ModulesAdd>
        </div>
        <div class="flex gap-6 flex-col md:flex-row">

            <NuxtLink :to="('/blocks/' + type + '/' + block.id)" class="flex-1 max-w-md" v-for="(block, index) in blocks">
                <ModulesCard :title="block.properties.title || block.properties.name" :body="block.properties.description"
                    @favorite="event => updateFavorite(event, index)">
                </ModulesCard>
            </NuxtLink>

        </div>

        <div v-if="!blocks.length" class="rounded-xl bg-gray-100 p-10 flex gap-6 items-center justify-between">
            No blocks yet. Create one
            <ModulesAdd @on-add="onAdd" :type="'data'" :service-type="blockType?.name" :fields="blockType?.fields"
                button-style="system" label="Add block">
            </ModulesAdd>
        </div>



    </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBlocksStore } from '~~/stores/blocks';

import { useNotificationStore } from '~~/stores/notifications';
const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const { type } = useRoute().params;
const blockStore = useBlocksStore();
const { getBlockModelById, addBlock, fetchBlocks, getBlocksByType } = blockStore;
const blockType = getBlockModelById(type as string);

const blocks = computed(() => {
    return getBlocksByType(blockType?.name as string)
})


const onAdd = async (data: any) => {

    console.log("DaTA", data)
    const { projectId, ...props } = data;
    const dataToBeSent = {
        projectId,
        properties: props,
        type: blockType?.name
    }
    const addedBlock = await addBlock(dataToBeSent);
    if (addedBlock) {
        setNotification("Block created", "Your block was successfully created", "success");
    } else {
        setNotification(
            "Block not created",
            "The block could not be created!",
            "fail"
        )
    }

}

// Fetch data based on type.

const updateFavorite = (event: Event, index: number) => {

}

const filterChange = () => {

}

const sortChange = () => {

}

// Show data.
const data = ref([])
const newBlockData = ref({});

const validated = computed(() => {
    const schema = fieldsToSchema(blockType?.fields || []);
    return schema.safeParse(newBlockData.value)
})

await fetchBlocks(blockType?.name as string);

</script>

<script lang="ts">
export default defineComponent({
    name: 'BlocksType'
})
</script>