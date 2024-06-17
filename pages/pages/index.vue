<template>
  <NuxtLayout name="list">
    <template #header>
      {{ $t("pages.title") }}
    </template>
    <template #filters>
      <ModulesFilter
        @filterChange="filterChange"
        @sortChange="sortChange"
      ></ModulesFilter>
    </template>
    <template #actions>
      <ModulesAdd
        label="Add page"
        type="page"
        @onAdd="onAdd"
        @onCancel="onCancel"
      ></ModulesAdd>
    </template>
    <ClientOnly>
      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
        v-if="pages.length"
      >
        <NuxtLink
          :to="'/pages/' + page.id"
          v-for="(page, index) in pages"
          :key="index"
        >
          <ModulesCard
            :title="page.title"
            :body="`Updated ${useTimeAgo(page.updated.toString())}`"
            :badge="{
              icon: page.status === 'public' ? 'check' : 'sleep',
              theme: page.status === 'public' ? 'primary' : 'system',
            }"
          ></ModulesCard>
        </NuxtLink>
      </div>
      <UIEmpty v-else-if="!loading">
        {{ $t("pages.no_pages_yet") }}

        <ModulesAdd
          label="Add page"
          type="page"
          button-style="system"
          @onAdd="onAdd"
          @onCancel="onCancel"
        >
        </ModulesAdd>
      </UIEmpty>
      <div
        v-else
        class="flex items-center justify-center w-full p-6 bg-gray-100 dark:bg-primary-950 rounded-lg"
      >
        <UILoader></UILoader>
      </div>
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Page } from "~~/models/page";
import { usePagesStore } from "~~/stores/pages";
import { useNotificationStore } from "~~/stores/notifications";
import { storeToRefs } from "pinia";

const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const pageStore = usePagesStore();
const { addPage } = pageStore;
const { pages, loading } = storeToRefs(pageStore);
const filters = ref({});
const sorts = ref({});
const router = useRouter();

const updateFavorite = (favorite: any, itemIdx: number, title: string) => {
  // const newData = [...pages.value]
  // newData[itemIdx] = { ...newData[itemIdx], favorite }
  // page = newData;
  setNotification("Pelle has liked", title, "success");
};
const filterChange = async (_filters: { [key: string]: any }) => {
  filters.value = { ...filters.value, ..._filters };
};
const sortChange = async (_sorts: { [key: string]: any }) => {
  sorts.value = { ...sorts.value, ..._sorts };
};
const onAdd = async (page: Page) => {
  const newPage = await addPage(page);
  if (newPage) {
    setNotification(
      "Page created",
      "Your page was successfully created",
      "success"
    );
    router.push(`/pages/${newPage.data.id || newPage.data._id}`);
  } else {
    setNotification(
      "Page not created",
      "The page could not be created!",
      "fail"
    );
  }
};
const onCancel = () => {};
</script>
