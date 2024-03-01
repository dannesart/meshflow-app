<template>
  <NuxtLayout>
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <UIHeadline
          size="h1"
          :value="model?.name"
          :editable="true"
          class="flex gap-3 capitalize"
          @value-change="($event) => (model.name = $event)"
        >
          {{ model?.name }}
        </UIHeadline>

        <UIHeadline
          size="h4"
          class="!w-auto"
          :editable="true"
          :value="model?.description"
          @value-change="($event) => (model.description = $event)"
        >
          {{ model?.description || "Description" }}
        </UIHeadline>
      </div>
    </div>

    <div class="flex justify-between">
      <UITabs
        :tabs="tabs"
        @on-change="setActiveTab"
        :active="active"
        :class="'w-80'"
      ></UITabs>

      <ModulesAdd
        @on-add="onAddNewField"
        type="field"
        :size="6"
        icon="add"
        v-if="active === 'model'"
        button-style="icon"
      >
      </ModulesAdd>
    </div>
    <div v-if="active === 'model' && model">
      <div v-if="model.fields.length" class="flex flex-col gap-6">
        <draggable
          :list="model.fields"
          group="fields"
          item-key="id"
          ghost-class="ghost"
          :component-data="{ class: 'flex flex-col gap-4' }"
        >
          <template #item="{ element: field, index }">
            <div
              class="flex gap-6 p-6 py-3 bg-white shadow-xl cursor-pointer rounded-xl hover:shadow-2xl"
            >
              <div class="relative flex items-center justify-center">
                <span
                  class="absolute -rotate-45 text-amber-500 top-1 -left-2"
                  v-if="field.isMain"
                >
                  <UIIcons name="crown" :size="4"></UIIcons>
                </span>
                <UIIcons
                  :name="field.type.icon"
                  :class="'text-black'"
                  :size="6"
                ></UIIcons>
              </div>
              <div class="flex flex-col gap-1">
                <UIHeadline
                  size="h4"
                  :class="'flex gap-3 items-center capitalize'"
                >
                  {{ field.name }}
                </UIHeadline>
                <p class="text-sm text-gray-500">{{ field.type.name }}</p>
              </div>
              <div class="flex items-center justify-center ml-auto mr-0">
                <UIButton
                  type="icon"
                  size="round-small"
                  class="bg-transparent"
                  @click="onRemoveField(index)"
                >
                  <UIIcons name="close"></UIIcons>
                </UIButton>
                <ModulesEdit
                  type="field"
                  icon="dots"
                  :value="field"
                  :size="4"
                  button-style="icon"
                  @on-save="(newValue) => updateBlock(newValue, index)"
                >
                </ModulesEdit>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <div
        v-else
        class="flex items-center justify-between gap-6 p-10 bg-gray-100 rounded-xl"
      >
        No fields yet. Create a field
        <ModulesAdd
          @on-add="onAddNewField"
          type="field"
          button-style="system"
          label="Add field"
        >
        </ModulesAdd>
      </div>
    </div>

    <ModulesVisualEditor v-if="active === 'visual'"></ModulesVisualEditor>
    <footer class="flex gap-3">
      <UIButton :is-loading="isLoading" type="add" @click="save()"
        >Save</UIButton
      >
      <UIButton
        :is-loading="isLoading"
        type="nevermind"
        @click="handleDeleteBlock()"
        >Delete</UIButton
      >
    </footer>

    <ModulesConfirm
      :show="showConfirm"
      @on-confirm="handleConfirmDelete"
      @on-deny="handleConfirmDeny"
    >
      <p>
        Do you really want to delete this block type? It will not be able to be
        restored.
      </p>
    </ModulesConfirm>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBlocksStore } from "~~/stores/blocks";
import { useNotificationStore } from "~~/stores/notifications";
import type { TTab } from "~~/components/UI/Tabs/tabs.model";
import type { Model, ModelField } from "~~/models/model";

const notificationsStore = useNotificationStore();
const { type } = useRoute().params;
const blockStore = useBlocksStore();
const router = useRouter();
const { setNotification } = notificationsStore;
const { getBlockModelById, updateBlockModel, deleteBlockModel } = blockStore;
const { isLoading } = storeToRefs(blockStore);
const block = getBlockModelById(type as string);
const showConfirm = ref(false);
const editingText = ref<string>();
const nameRef = ref();
const descriptionRef = ref();

const model = ref<Model>(block);
const tabs: TTab[] = [
  {
    name: "model",
    label: "Model",
  },
  {
    name: "visual",
    label: "Visual",
  },
];
const active = ref(tabs[0].name);

const setNewValues = (newValues: any) => {
  model.value = { ...model.value, ...newValues };
};
const onRemoveField = (index: number) => {
  model.value.fields.splice(index, 1);
};

const onAddNewField = (args: any) => {
  model.value.fields.push(args);
};

const handleDeleteBlock = async () => {
  showConfirm.value = true;
};
const handleConfirmDeny = async () => {
  showConfirm.value = false;
};

const handleConfirmDelete = async () => {
  showConfirm.value = false;
  if (model.value.id) {
    const deleted = await deleteBlockModel(model.value.id as string);
    if (deleted) {
      setNotification(
        "Block type deleted!",
        "The block type was successfully deleted",
        "success"
      );
      router.push("/blocks");
    } else {
      setNotification(
        "Block type not deleted",
        "The block could not be deleted",
        "fail"
      );
    }
  } else {
    setNotification("Block type could not be deleted", "Missing ID", "fail");
  }
};

const editText = (field: string) => {
  editingText.value = field;
  setTimeout(() => {
    if (field === "name") {
      nameRef.value.focus();
    } else {
      descriptionRef.value.focus();
    }
  });
};
const stopEditing = () => {
  editingText.value = "";
};

const updateBlock = (newValue: ModelField, fieldIdx: number) => {
  if (!model.value?.fields && !model.value?.fields.length) return;
  model.value.fields[fieldIdx] = newValue;
};

const save = async () => {
  isLoading.value = true;
  const saved = await updateBlockModel(model.value);
  if (saved) {
    setNotification(
      "Model saved!",
      "The model was successfully saved",
      "success"
    );
  } else {
    // Handle error
    setNotification("Model not saved", "The model could not be saved", "fail");
  }
};

const setActiveTab = (tab: TTab) => {
  active.value = tab.name;
};
</script>

<style scoped>
.ghost {
  opacity: 0.5;
}
</style>

<script lang="ts">
export default defineComponent({
  name: "BlocksTypeEdit",
});
</script>
