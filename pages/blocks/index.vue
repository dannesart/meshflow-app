<template>
  <NuxtLayout name="list">
    <template #header> Block types </template>
    <template #filters>
      <ModulesFilter
        @filterChange="filterChange"
        @sortChange="sortChange"
      ></ModulesFilter>
    </template>
    <template #actions>
      <ModulesAdd
        type="model"
        label="Add type"
        service-type="block"
        @onAdd="onAdd"
        @onCancel="onCancel"
      ></ModulesAdd>
    </template>
    <ClientOnly>
      <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        v-if="blockModels.length"
      >
        <NuxtLink
          :to="'/blocks/' + item.id"
          class="flex-1"
          v-for="(item, index) in blockModels"
        >
          <ModulesCard
            :title="item.name"
            :body="item.description"
            :tags="item.tags"
          ></ModulesCard>
        </NuxtLink>
      </div>
      <UIEmpty v-else-if="!loading">
        No block types yet. Create one
        <ModulesAdd
          @on-add="onAdd"
          type="model"
          service-type="block"
          button-style="system"
          label="Add block type"
        >
        </ModulesAdd>
      </UIEmpty>
    </ClientOnly>

    <div
      v-if="loading"
      class="w-full flex items-center justify-center bg-gray-100 rounded-lg p-6"
    >
      <UILoader></UILoader>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { BlockModel } from "~~/models/blocks";
import { useBlocksStore } from "~~/stores/blocks";
import { storeToRefs } from "pinia";
import { useNotificationStore } from "~~/stores/notifications";
const notificationsStore = useNotificationStore();
const blockStore = useBlocksStore();
const { setNotification } = notificationsStore;
const { loading, blockModels } = storeToRefs(blockStore);
const { addBlockModel } = blockStore;
const filters = ref({});
const sorts = ref({});

const updateFavorite = (favorite: any, itemIdx: number) => {
  // const newData = [...data.value]
  // newData[itemIdx] = { ...newData[itemIdx], favorite }
  // data.value = newData;
};

const filterChange = async (_filters: { [key: string]: any }) => {
  filters.value = { ...filters.value, ..._filters };
};

const sortChange = async (_sorts: { [key: string]: any }) => {
  sorts.value = { ...sorts.value, ..._sorts };
};

const onAdd = async (blockModel: BlockModel) => {
  if (await addBlockModel(blockModel)) {
    setNotification(
      "Block type created",
      "Your block type was successfully created",
      "success"
    );
  } else {
    setNotification(
      "Block type not created",
      "The block type could not be created!",
      "fail"
    );
  }
};
const onCancel = () => {
  console.log("Cancel new block");
};
</script>

<script lang="ts">
export default defineComponent({
  name: "Blocks",
});
</script>
