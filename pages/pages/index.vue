<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            Pages
        </UIHeadline>
        <div class="flex gap-6">
            <ModulesFilter @filterChange="filterChange" @sortChange="sortChange"></ModulesFilter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <ModulesAdd label="Add page" type="page" @onAdd="onAdd" @onCancel="onCancel"></ModulesAdd>
        </div>
        <div class="flex gap-6 flex-col md:flex-row">

            <NuxtLink :to="('/pages/' + page.id)" class="flex-1 md:max-w-md md:min-w-max " v-for="(page, index) in pages">

                <ModulesCard :title="page.title" :body="page.status"
                    @favorite="event => updateFavorite(event, index, page.title)"></ModulesCard>
            </NuxtLink>
        </div>


    </NuxtLayout>
</template>

<script setup lang=ts>
import { Page, PAGE_STATUSES } from '~~/models/page';
import { usePagesStore } from '~~/stores/pages';
import { useNotificationStore } from "~~/stores/notifications";
import { storeToRefs } from 'pinia';

const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const pageStore = usePagesStore();
const { addPage } = pageStore
const { pages } = storeToRefs(pageStore);
const filters = ref({});
const sorts = ref({});

const updateFavorite = (favorite: any, itemIdx: number, title: string) => {
    // const newData = [...pages.value]
    // newData[itemIdx] = { ...newData[itemIdx], favorite }
    // page = newData;
    setNotification('Pelle has liked', title, "liked");
}
const filterChange = async (_filters: { [key: string]: any }) => {
    filters.value = { ...filters.value, ..._filters };
}
const sortChange = async (_sorts: { [key: string]: any }) => {
    sorts.value = { ...sorts.value, ..._sorts };
}
const onAdd = async (page: Page) => {

    if (await addPage(page)) {
        setNotification("Page created", "Your page was successfully created", "success");
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