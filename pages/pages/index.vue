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
            <client-only>
                <NuxtLink :to="('/pages/' + page.id)" class="flex-1 md:max-w-md" v-for="(page, index) in pages">

                    <ModulesCard :title="page.title" :body="page.status"
                        @favorite="event => updateFavorite(event, index, page.title)"></ModulesCard>
                </NuxtLink>
            </client-only>
        </div>


    </NuxtLayout>
</template>

<script lang=ts>
import { TPage, PAGE_STATUSES } from '~~/models/page';
import { usePagesStore } from '~~/stores/pages';
import { useNotificationStore } from "~~/stores/notifications";

const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const { pages, addPage } = usePagesStore();

export default {
    data() {
        return {
            filters: ref({}),
            sorts: ref({}),
            pages,
            PAGE_STATUSES
        }
    },
    methods: {
        updateFavorite(favorite: any, itemIdx: number, title: string) {
            // const newData = [...pages.value]
            // newData[itemIdx] = { ...newData[itemIdx], favorite }
            // page = newData;
            setNotification('Pelle has liked', title, "liked");
        },
        async filterChange(_filters: { [key: string]: any }) {
            this.filters = { ...this.filters, ..._filters };
        },
        async sortChange(_sorts: { [key: string]: any }) {
            this.sorts = { ...this.sorts, ..._sorts };
        },
        onAdd: (page: TPage) => {
            setNotification("Page created", "Your page was successfully created", "success");
            addPage(page);
        },
        onCancel: () => { }
    }
}

</script>