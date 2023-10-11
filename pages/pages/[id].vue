<template>
    <NuxtLayout>
        <header class="flex gap-4 items-center">
            <UIHeadline size="h1" :editable="true" :value="page?.title" @value-change="(value) => page.title = value">
                {{ page?.title }}
            </UIHeadline>

        </header>
        <div class="flex gap-6 flex-col" v-if="page">

            <div class=" cursor-pointer hover:shadow-md text-sm capitalize  p-3 py-1 rounded-full w-max flex-none"
                @click="changeStatus()"
                :class="{ 'bg-red-100 text-red-400': page.status === 'private', 'bg-green-100 text-green-400': page.status === 'public' }">
                {{ page.status }}
            </div>

            <ModulesInput type="text" :value="page.slug" @value-update="updateSlug">
                Slug
            </ModulesInput>

            <div class="flex flex-col gap-6">

                <draggable :list="page.blocks" group="blocks" item-key="id" ghost-class="ghost"
                    :component-data="{ class: 'flex flex-col gap-4' }" v-if="page.blocks.length">
                    <template #item="{ element: block }">
                        <div class="flex gap-6 rounded-xl bg-white p-6 py-3 shadow-xl hover:shadow-2xl cursor-pointer">
                            <div class="flex flex-col gap-1">

                                <UIHeadline size="h4" :class="'flex gap-3 items-center'">
                                    {{ block.name }}

                                </UIHeadline>
                                <p class="text-sm text-gray-500">{{ block.description }}</p>
                            </div>
                            <div class="flex items-center justify-center mr-0 ml-auto ">
                                <ModulesEdit type="block" icon="dots" :size="4" button-style="icon">
                                </ModulesEdit>
                            </div>
                        </div>
                    </template>
                </draggable>


                <div v-else class="rounded-xl bg-gray-100 p-10 flex gap-6 items-center justify-between">
                    No blocks yet. Create or add existing one <ModulesAdd button-style="system" label="Add block"
                        select="true" type="block">

                    </ModulesAdd>
                </div>


            </div>

            <footer class="flex gap-3">
                <UIButton type="add" @click="savePage">Save</UIButton>
                <UIButton type="nevermind" @click="handleDeletePage">Delete</UIButton>
            </footer>

        </div>

        <ModulesConfirm :show="showConfirm" @on-confirm="handleConfirmDelete" @on-deny="handleConfirmDeny">
            <p>
                Do you really want to delete this page? It will not be able to be restored.
            </p>
        </ModulesConfirm>


    </NuxtLayout>
</template>

<script setup lang="ts">

import { usePagesStore } from '~~/stores/pages';
import { Page } from '~~/models/page';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '~~/stores/notifications';
import { useBlocksStore } from '~~/stores/blocks';

const { id } = useRoute().params;
const router = useRouter();
const pageStore = usePagesStore();
const notificationsStore = useNotificationStore();
const blocksStore = useBlocksStore();
const { loading } = storeToRefs(pageStore)
const { getPageById, updatePage, deletePage } = pageStore
const { setNotification } = notificationsStore;
const { fetchBlockModels } = blocksStore;
const page = ref<Page>(getPageById(id as string) as Page);
const showConfirm = ref(false);

const changeStatus = async () => {
    page.value.status = page.value.status === "private" ? 'public' : 'private';
    const updated = await updatePage(page.value);
    if (updated) {
        setNotification('Status changed!', `Status has changed to ${page.value.status}`, 'success');
    } else {
        // Handle error
        setNotification('Status not changed', 'The status could not be changed', 'fail');
        page.value.status = page.value.status === "private" ? 'public' : 'private';
    }
}

const updateTitle = async (newValue: string) => {
    page.value.title = newValue;
}

const updateSlug = async (newValue: string) => {
    page.value.slug = newValue;
}

const onAddNewBlock = async () => {

}

const handleDeletePage = async () => {
    showConfirm.value = true;
}
const handleConfirmDeny = async () => {
    showConfirm.value = false;
}
const handleConfirmDelete = async () => {
    showConfirm.value = false;
    if (page.value.id) {
        const deleted = await deletePage(page.value.id as string);
        if (deleted) {
            setNotification('Page deleted!', 'The page was successfully deleted', 'success');
            router.push('/pages')
        } else {
            // Handle error
            setNotification('Page not deleted', 'The page could not be deleted', 'fail');
        }
    }
    else {
        setNotification('Page be deleted', 'Missing ID', 'fail');
    }
}

const savePage = async () => {
    const saved = await updatePage(page.value);
    if (saved) {
        setNotification('Page saved!', 'The page was successfully saved', 'success');
    } else {
        // Handle error
        setNotification('Page not saved', 'The page could not be saved', 'fail');
    }

}
await fetchBlockModels();
    // Fetch data based on id.

    // Show data.

</script>