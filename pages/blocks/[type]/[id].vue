<template>
  <NuxtLayout>
    <template v-if="block">
      <header class="flex items-center gap-4 justify-between">
        <UIHeadline
          size="h1"
          editable="true"
          :value="block.properties.title || block.properties.name"
        >
          {{ block.properties.title || block.properties.name }}
        </UIHeadline>
        <div class="flex gap-2 items-center" v-if="block">
          <label class="text-sm text-slate-500 capitalize">{{
            block.status
          }}</label>
          <ModulesInput
            type="switch"
            :value="block.status === 'public'"
            @click="changeStatus()"
          />
        </div>
      </header>
      <p>
        <span class="font-bold inline-block text-sky-700">{{
          model.name
        }}</span>
        | Updated
        {{ useTimeAgo(block.updated) }}
      </p>
      <div v-for="(field, idx) of model.fields">
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

const handleUpdateBlock = async () => {
  const updated = await updateBlock(id, type, block.value);
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
  block.value.status = block.value.status === "private" ? "public" : "private";
  const updatedBlock = await handleUpdateBlock();
  if (!updatedBlock) {
    block.value.status =
      block.value.status === "private" ? "public" : "private";
  }
};
</script>
