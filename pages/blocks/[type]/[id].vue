<template>
  <NuxtLayout>
    <template v-if="block">
      <UIHeadline
        size="h1"
        editable="true"
        :value="block.properties.title || block.properties.name"
      >
        {{ block.properties.title || block.properties.name }}
      </UIHeadline>
      Updated {{ useTimeAgo(block.updated) }}
      <div v-for="(field, idx) of model.fields">
        <ModulesInput :type="field.type.id" :value="block.properties[field.id]">
          {{ field.name }}
        </ModulesInput>
      </div>
      <footer class="flex gap-4">
        <UIButton type="add">Save</UIButton>
        <UIButton type="delete" @click="handleDeleteBlock()"> Delete </UIButton>
      </footer>

      <ModulesConfirm
        :show="showConfirm"
        @on-confirm="handleConfirmDelete"
        @on-deny="handleConfirmDeny"
      >
        <p>
          Do you really want to delete this block? It will not be able to be
          restored.
        </p>
      </ModulesConfirm>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useBlocksStore } from "~~/stores/blocks";
import { useNotificationStore } from "~~/stores/notifications";

const { id, type } = useRoute().params;
const {
  getBlockById,
  getBlocksByType,
  fetchBlocks,
  getBlockModelById,
  deleteBlock,
} = useBlocksStore();
const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const model = getBlockModelById(type);
const showConfirm = ref(false);
const router = useRouter();

if (!getBlocksByType(type as string)) fetchBlocks(type as string);

// Fetch data based on id.
const block = computed(() => getBlockById(type as string, id as string));

const handleDeleteBlock = async () => {
  showConfirm.value = true;
};
const handleConfirmDeny = async () => {
  showConfirm.value = false;
};

const handleConfirmDelete = async () => {
  showConfirm.value = false;
  if (id && type) {
    const deleted = await deleteBlock(id as string, type as string);
    if (deleted) {
      setNotification(
        "Block deleted!",
        "The block was successfully deleted",
        "success"
      );
      router.push("/blocks/" + type);
    } else {
      setNotification(
        "Block not deleted",
        "The block could not be deleted",
        "fail"
      );
    }
  } else {
    setNotification("Block could not be deleted", "Missing ID", "fail");
  }
};
</script>
