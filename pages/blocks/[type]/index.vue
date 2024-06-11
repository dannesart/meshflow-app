<template>
  <NuxtLayout name="list">
    <template #header>
      {{ blockType?.name || "Getting block types..." }}
    </template>
    <template #filters>
      <ModulesFilter @filterChange="filterChange" @sortChange="sortChange">
      </ModulesFilter>
    </template>
    <template #actions>
      <NuxtLink
        :to="'/blocks/' + type + '/edit'"
        class="flex items-center gap-3 px-6 py-3 bg-white dark:bg-primary-900 dark:text-white rounded-lg shadow-md hover:shadow-lg text-slate-700"
      >
        <UIIcons name="setting"> </UIIcons>
        <span class="hidden sm:block">Edit</span>
      </NuxtLink>
      <div class="w-[1px] h-5/6 my-auto bg-slate-300"></div>
      <ModulesAdd
        type="data"
        :service-type="blockType?.name"
        button-style="icon"
        icon="add"
        class="block sm:hidden"
        @onAdd="onAdd"
        @onCancel="onCancel"
      ></ModulesAdd>
      <ModulesAdd
        @on-add="onAdd"
        :type="'data'"
        :service-type="blockType?.name"
        :fields="blockType?.fields"
        class="hidden sm:block"
        label="Add block"
      >
      </ModulesAdd>
    </template>
    <ClientOnly>
      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
        v-if="blocks && blocks.length"
      >
        <NuxtLink
          :to="'/blocks/' + type + '/' + block.id"
          class="flex-1 max-w-md"
          v-for="(block, index) in blocks"
          :key="block.id"
        >
          <ModulesCard
            :title="
              block.properties.title ||
              block.properties.name ||
              `${blockType?.name} #${index}`
            "
            :badge="{
              icon: 'check',
              theme: block.status === 'public' ? 'primary' : 'system',
            }"
            :body="
              block.properties.description ||
              `Updated ${useTimeAgo(block.updated)}`
            "
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
    <UIEmpty v-if="!blockType" class="!justify-center flex">
      <UILoader />
    </UIEmpty>
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
  return getBlocksByType(type as string);
});

const onAdd = async (data: any) => {
  const { projectId, ...props } = data;
  const dataToBeSent = {
    projectId,
    properties: props,
    type: type,
    status: "private",
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
await fetchBlocks(type as string);
</script>

<script lang="ts">
export default defineComponent({
  name: "BlocksType",
});
</script>
