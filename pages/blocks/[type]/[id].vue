<template>
  <NuxtLayout>
    <template v-if="block && block.properties">
      <header class="flex items-center justify-between gap-4">
        <UIHeadline
          size="h1"
          editable="true"
          :value="block.properties.title || block.properties.name"
        >
          {{ block.properties.title || block.properties.name }}
        </UIHeadline>
        <div class="flex items-center gap-2" v-if="block">
          <label class="text-sm capitalize text-slate-500">{{
            block.status || "private"
          }}</label>
          <ModulesInput
            type="switch"
            :value="block.status === 'public'"
            @click="changeStatus()"
          />
        </div>
      </header>
      <p>
        <span class="inline-block font-bold text-primary-700">{{
          model?.name
        }}</span>
        | Updated
        {{ useTimeAgo(block?.updated.toString()) }}
      </p>
      <div v-for="(field, idx) of model?.fields" :key="idx">
        <ModulesInput :type="field.type.id" :value="block.properties[field.id]">
          {{ field.name }}
        </ModulesInput>
      </div>
      <footer class="flex gap-4">
        <UIButton type="add" @click="handleUpdateBlock()">Save</UIButton>
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
    <UIEmpty v-if="!block" class="!justify-center flex">
      <UILoader />
    </UIEmpty>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Block } from "~~/models/blocks";
import { useBlocksStore } from "~~/stores/blocks";
import { useNotificationStore } from "~~/stores/notifications";

const { id, type } = useRoute().params;
const {
  getBlockById,
  getBlocksByType,
  fetchBlocks,
  updateBlock,
  getBlockModelById,
  deleteBlock,
} = useBlocksStore();
const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const model = getBlockModelById(type as string);
const showConfirm = ref(false);
const router = useRouter();

if (!getBlocksByType(type as string)) fetchBlocks(type as string);

// Fetch data based on id.
const block = computed(
  () => getBlockById(type as string, id as string) || ({} as Block)
);

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

const handleUpdateBlock = async () => {
  const updated = await updateBlock(id as string, type as string, block.value);
  if (updated) {
    setNotification(
      "Status changed!",
      `Status has changed to ${block.value.status}`,
      "success"
    );
    return true;
  } else {
    // Handle error
    setNotification(
      "Status not changed",
      "The status could not be changed",
      "fail"
    );
    return false;
  }
};

const changeStatus = async () => {
  const isPrivate =
    block.value.status === "private" ||
    !block.value.status ||
    block.value.status === "";
  block.value.status = isPrivate ? "public" : "private";
  const updatedBlock = await handleUpdateBlock();
  if (!updatedBlock) {
    block.value.status =
      block.value.status === "private" ? "public" : "private";
  }
};
</script>
