<template>
  <NuxtLayout name="list">
    <template #header> Data types </template>
    <template #filters>
      <ModulesFilter @filterChange="filterChange" @sortChange="sortChange">
      </ModulesFilter>
    </template>
    <template #actions>
      <ModulesAdd type="model" label="Add type" service-type="data">
      </ModulesAdd>
    </template>
    <ClientOnly>
      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
        v-if="dataModels.length"
      >
        <NuxtLink
          :to="'/data/' + item.id"
          class="flex-1"
          v-for="(item, index) in dataModels"
          :key="index"
        >
          <ModulesCard
            :title="item.name"
            :body="item.description"
            :tags="item.tags"
          ></ModulesCard>
        </NuxtLink>
      </div>
      <UIEmpty v-else-if="!loading">
        No data types yet. Create one
        <ModulesAdd
          @on-add="onAdd"
          type="model"
          service-type="data"
          button-style="system"
          label="Add data type"
        >
        </ModulesAdd>
      </UIEmpty>
    </ClientOnly>

    <div
      v-if="loading"
      class="flex items-center justify-center w-full p-6 bg-gray-100 dark:bg-primary-950 rounded-lg"
    >
      <UILoader></UILoader>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDataStore } from "~~/stores/data";
import type { DataModel } from "~~/models/data";
import { useNotificationStore } from "~~/stores/notifications";

const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const dataStore = useDataStore();
const { loading, dataModels } = storeToRefs(dataStore);
const { addDataModel } = dataStore;

const filters = ref({});
const sorts = ref({});

const filterChange = async (_filters: { [key: string]: any }) => {
  filters.value = { ...filters.value, ..._filters };
};

const sortChange = async (_sorts: { [key: string]: any }) => {
  sorts.value = { ...sorts.value, ..._sorts };
};

const onAdd = async (dataModel: DataModel) => {
  if (await addDataModel(dataModel)) {
    setNotification(
      "Data type created",
      "Your data type was successfully created",
      "success"
    );
  } else {
    setNotification(
      "Data type not created",
      "The data type could not be created!",
      "fail"
    );
  }
};
const onCancel = () => {
  console.log("Cancel new data");
};
</script>
