<template>
    <NuxtLayout>
        <header class="flex gap-4 items-center">
            <UIHeadline size="h1">
                {{ page?.title }}
            </UIHeadline>

            <UILoader v-if="loading"></UILoader>

        </header>
        <div class="flex gap-6 flex-col" v-if="page">

            <div class=" cursor-pointer hover:shadow-md text-sm capitalize  p-3 py-1 rounded-full w-max flex-none"
                @click="changeStatus()"
                :class="{ 'bg-red-100 text-red-400': page.status === 'private', 'bg-green-100 text-green-400': page.status === 'public' }">
                {{ page.status }}
            </div>

            <UIForm>
                <ModulesInput type="text" :value="page.title" @value-update="updateTitle">
                    Title
                </ModulesInput>
            </UIForm>

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
                    No blocks yet. Create or add existing one <ModulesAdd @on-add="onAddNewBlock" type="block" select="true"
                        button-style="system" label="Add block">
                    </ModulesAdd>
                </div>

            </div>

            <footer class="flex gap-3">
                <UIButton type="add" @click="savePage">Save</UIButton>
                <UIButton type="nevermind">Delete</UIButton>
            </footer>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

import { usePagesStore } from '~~/stores/pages';
import { Page } from '~~/models/page';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '~~/stores/notifications';

const { id } = useRoute().params;
const pageStore = usePagesStore();
const notificationsStore = useNotificationStore();
const { loading } = storeToRefs(pageStore)
const { getPageById, updatePage } = pageStore
const { setNotification } = notificationsStore;
const page = ref<Page>(getPageById(id as string) as Page);

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

const onAddNewBlock = async () => {

}

const deletePage = () => {

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

    // Fetch data based on id.

    // Show data.

</script>