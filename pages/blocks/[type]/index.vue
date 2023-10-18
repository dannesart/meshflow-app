<template>
  <NuxtLayout>
    <UIHeadline size="h1">
      {{ blockType?.name }}
    </UIHeadline>
    <div class="flex gap-6">
      <ModulesFilter @filterChange="filterChange" @sortChange="sortChange">
      </ModulesFilter>
      <div class="w-[1px] h-5/6 my-auto bg-slate-300"></div>
      <NuxtLink
        :to="'/blocks/' + type + '/edit'"
        class="flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg text-slate-700"
      >
        <UIIcons name="setting"> </UIIcons>
        Edit
      </NuxtLink>
      <div class="w-[1px] h-5/6 my-auto bg-slate-300"></div>
      <ModulesAdd
        @on-add="onAdd"
        :type="'data'"
        :service-type="blockType?.name"
        :fields="blockType?.fields"
        label="Add block"
      >
      </ModulesAdd>
    </div>

    <ClientOnly>
      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
        v-if="blocks.length"
      >
        <NuxtLink
          :to="'/blocks/' + type + '/' + block.id"
          class="flex-1 max-w-md"
          v-for="(block, index) in blocks"
          :key="block.id"
        >
          <ModulesCard
            :title="block.properties.title || block.properties.name"
            :body="block.properties.description"
            @favorite="(event) => updateFavorite(event, index)"
          >
          </ModulesCard>
        </NuxtLink>
      </div>
      <UIEmpty v-else>
        No blocks yet. Create one
        <ModulesAdd
          @on-add="onAdd"
          :type="'data'"
          :service-type="blockType?.name"
          :fields="blockType?.fields"
          button-style="system"
          label="Add block"
        >
        </ModulesAdd>
      </UIEmpty>
    </ClientOnly>
    <div
      v-if="loading"
      class="flex items-center justify-center w-full p-6 bg-gray-100 rounded-lg"
    >
      <UILoader></UILoader>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBlocksStore } from "~~/stores/blocks";

import { useNotificationStore } from "~~/stores/notifications";
const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const { type } = useRoute().params;
const blockStore = useBlocksStore();
const { getBlockModelById, addBlock, fetchBlocks, getBlocksByType } =
  blockStore;
const { loading } = storeToRefs(blockStore);

const blockType = computed(() => getBlockModelById(type as string));
const blocks = computed(() => {
  return getBlocksByType(blockType.value?.name as string);
});

const onAdd = async (data: any) => {
  const { projectId, ...props } = data;
  const dataToBeSent = {
    projectId,
    properties: props,
    type: blockType?.id,
  };
  const addedBlock = await addBlock(dataToBeSent);
  if (addedBlock) {
    setNotification(
      "Block created",
      "Your block was successfully created",
      "success"
    );
  } else {
    setNotification(
      "Block not created",
      "The block could not be created!",
      "fail"
    );
  }
};

// Fetch data based on type.

const updateFavorite = (event: Event, index: number) => {};

const filterChange = () => {};

const sortChange = () => {};

// Show data.
const data = ref([]);
const newBlockData = ref({});

const validated = computed(() => {
  const schema = fieldsToSchema(blockType.value?.fields || []);
  return schema.safeParse(newBlockData.value);
});
await fetchBlocks(blockType.value?.id as string);
</script>

<script lang="ts">
export default defineComponent({
  name: "BlocksType",
});
</script>
