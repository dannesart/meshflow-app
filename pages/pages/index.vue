<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            {{ $t('pages') }}
        </UIHeadline>
        <div class="flex gap-6">
            <ModulesFilter @filterChange="filterChange" @sortChange="sortChange"></ModulesFilter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <ModulesAdd label="Add page" type="page" @onAdd="onAdd" @onCancel="onCancel"></ModulesAdd>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" v-if="pages.length">

            <NuxtLink :to="('/pages/' + page.id)" v-for="(page, index) in pages">

                <ModulesCard :title="page.title" :body="page.status"
                    @favorite="event => updateFavorite(event, index, page.title)"></ModulesCard>
            </NuxtLink>


        </div>
        <template v-else>
            <div class="rounded-xl bg-gray-100 p-10 flex gap-6 items-center justify-between">

                No pages yet.
                Go ahead and create your first page!

                <ModulesAdd label="Add page" type="page" button-style="system" @onAdd="onAdd" @onCancel="onCancel">
                </ModulesAdd>
            </div>
        </template>


    </NuxtLayout>
</template>

<script setup lang=ts>
import { Page } from '~~/models/page';
import { usePagesStore } from '~~/stores/pages';
import { useNotificationStore } from "~~/stores/notifications";
import { storeToRefs } from 'pinia';
import { UIMessage } from '~~/.nuxt/components';

const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const pageStore = usePagesStore();
const { addPage } = pageStore
const { pages } = storeToRefs(pageStore);
const filters = ref({});
const sorts = ref({});
const router = useRouter();

const updateFavorite = (favorite: any, itemIdx: number, title: string) => {
    // const newData = [...pages.value]
    // newData[itemIdx] = { ...newData[itemIdx], favorite }
    // page = newData;
    setNotification('Pelle has liked', title, "success");
}
const filterChange = async (_filters: { [key: string]: any }) => {
    filters.value = { ...filters.value, ..._filters };
}
const sortChange = async (_sorts: { [key: string]: any }) => {
    sorts.value = { ...sorts.value, ..._sorts };
}
const onAdd = async (page: Page) => {
    const newPage = await addPage(page);
    if (newPage) {
        setNotification("Page created", "Your page was successfully created", "success");
        router.push(`/pages/${newPage.data.id || newPage.data._id}`);
    } else {
        setNotification(
            "Page not created",
            "The page could not be created!",
            "fail"
        )
    }


}
const onCancel = () => { }

</script>

