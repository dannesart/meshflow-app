<template>
  <UIForm :class="'flex flex-col gap-6'" name="new-block-form" v-if="!select">
    <ModulesInput
      type="text"
      :max="50"
      :value="newBlockForm.name"
      @valueUpdate="($event) => valueChange($event, 'name')"
    >
      Name
    </ModulesInput>

    <ModulesInput
      type="text-lg"
      :max="100"
      :value="newBlockForm.description"
      @valueUpdate="($event) => valueChange($event, 'description')"
    >
      <label>
        Description <span class="text-sm text-gray-400">Optional</span>
      </label>
    </ModulesInput>

    <div
      name="new-block-error"
      class="flex gap-4 p-4 mt-6 rounded-lg bg-red-50"
      v-for="error in errors"
      :key="error.path"
    >
      <span class="font-bold capitalize">
        {{ error.path.join("/") }}
      </span>
      <span>
        {{ error.message }}
      </span>
    </div>
  </UIForm>
  <div v-else class="flex flex-col gap-6">
    <p>Pick from the list of block types</p>

    <div
      v-for="blockModel of blockModels"
      :key="blockModel.id"
      class="flex flex-col w-full gap-6 p-5 cursor-pointer bg-slate-100 px-7 rounded-xl"
    >
      <div @click="toggleOpenBlock(blockModel.id)" class="flex w-full">
        <div class="flex flex-col">
          <UIHeadline :size="'h3'">
            {{ blockModel.name }}
          </UIHeadline>
          <p class="text-sm text-gray-400">
            {{ blockModel.description }}
          </p>
        </div>
        <div class="ml-auto mr-0">
          <UIIcons
            :name="
              openBlock === blockModel.name ? 'chevron-up' : 'chevron-down'
            "
          ></UIIcons>
        </div>
      </div>
      <div
        class="grid grid-cols-1 gap-6 p-3 md:grid-cols-2 xl:grid-cols-4"
        v-if="openBlock === blockModel.id"
      >
        <template
          v-for="block in getBlocksByType(blockModel.id)"
          :key="block.id"
        >
          <div
            class="p-5 bg-white rounded-lg shadow-xl px-7"
            @click="blockSelect(block.id, blockModel.id)"
          >
            <UIHeadline :size="'h3'">
              {{ block.properties.title || block.properties.name }}
            </UIHeadline>
            <p class="text-gray-400">Updated {{ useTimeAgo(block.updated) }}</p>
          </div>
        </template>
        <template v-if="!getBlocksByType(blockModel.id).length">
          <UIEmpty :class="'bg-white  md:col-span-2 xl:col-span-4'">
            No blocks yet for this type.
            <UIButton type="link" @click="goToType(blockModel.id)"
              >Go to block type</UIButton
            >
          </UIEmpty>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { Model } from "~~/models/model";
import { ModelSchema } from "~~/models/model";
import { useBlocksStore } from "~~/stores/blocks";
import { useProjectStore } from "~~/stores/projects";

const router = useRouter();
const blockStore = useBlocksStore();
const { fetchBlocks } = blockStore;
const { blocks, blockModels, getBlocksByType } = storeToRefs(blockStore);
const { select } = defineProps(["select"]);
const events = defineEmits(["valueUpdate", "onValid", "onError", "onSelect"]);
const errors = ref();
const openBlock = ref();

const toggleOpenBlock = async (typeId: string) => {
  if (!getBlocksByType.value(typeId)) await fetchBlocks(typeId);

  openBlock.value = openBlock.value === typeId ? "" : typeId;
};

const newBlockForm = ref({
  name: "",
  description: "",
  fields: [],
  serviceType: "block",
  projectId: useProjectStore().activeId,
});

const goToType = async (id: string) => {
  router.push(`/blocks/${id}`);
};

const blockSelect = (id: string, type: string) => {
  events("onValid", { id, type });
  events("onSelect", { id, type });
};

const valueChange = (event: string, key: string) => {
  (newBlockForm as any).value[key] = event;
  events("valueUpdate", newBlockForm);
  validate(newBlockForm);
};

const validate = async (newBlockForm: any) => {
  const validated = await ModelSchema.partial({
    created: true,
    createdBy: true,
    updated: true,
    updatedBy: true,
    projectId: true,
    id: true,
  }).safeParse(newBlockForm.value);

  if (!validated.success) {
    errors.value = [...validated.error.issues];
    events("onError", validated.error);
  } else {
    errors.value = [];
    events("onValid", validated.data);
  }
};
</script>
