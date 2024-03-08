<template>
  <NuxtLayout>
    <header class="flex items-center justify-between gap-4">
      <UIHeadline
        size="h1"
        :editable="true"
        :class="'!w-auto'"
        :value="page?.title"
        @value-change="(value) => (page.title = value)"
      >
        {{ page?.title || $t("pages.getting_page") }}
      </UIHeadline>
      <div class="flex items-center gap-2" v-if="page && page.status">
        <label class="text-sm capitalize text-slate-500">{{
          page.status
        }}</label>
        <ModulesInput
          type="switch"
          :value="page.status === 'public'"
          @click="changeStatus()"
        />
      </div>
    </header>
    <p v-if="page?.updated">
      {{ $t("updated") }}
      {{ useTimeAgo(page.updated) }}
    </p>
    <div class="flex flex-col gap-6" v-if="page">
      <ModulesInput type="text" :value="page.slug" @value-update="updateSlug">
        {{ $t("slug") }}
      </ModulesInput>
      <div class="flex items-center justify-between">
        <UIHeadline size="label"> {{ $t("blocks.title") }} </UIHeadline>
        <ModulesAdd
          @on-add="onBlockAdd"
          select="true"
          type="block"
          :size="6"
          icon="add"
          button-style="icon"
        >
        </ModulesAdd>
      </div>

      <div class="flex flex-col gap-6">
        <draggable
          :list="page.blocks"
          group="blocks"
          item-key="id"
          ghost-class="ghost"
          :component-data="{ class: 'flex flex-col gap-4' }"
          v-if="page.blocks?.length"
        >
          <template #item="{ element: block, index }">
            <ModulesEntity
              :data="block"
              @remove="onBlockRemove(index)"
              v-if="block?.properties"
            ></ModulesEntity>
            <ModulesEntity
              :id="block.id"
              @remove="onBlockRemove(index)"
              :type="block.type"
              v-else
            ></ModulesEntity>
          </template>
        </draggable>

        <div
          v-else
          class="flex items-center justify-between gap-6 p-10 bg-gray-100 rounded-xl"
        >
          {{ $t("blocks.no_blocks_yet") }}
          <ModulesAdd
            button-style="system"
            label="Add block"
            select="true"
            type="block"
            @on-add="onBlockAdd"
          >
          </ModulesAdd>
        </div>
      </div>
    </div>

    <footer class="flex gap-3">
      <UIButton type="add" @click="savePage">Save</UIButton>
      <UIButton type="nevermind" @click="handleDeletePage">Delete</UIButton>
    </footer>

    <UIEmpty v-if="!page" class="!justify-center flex">
      <UILoader />
    </UIEmpty>

    <ModulesConfirm
      :show="showConfirm"
      @on-confirm="handleConfirmDelete"
      @on-deny="handleConfirmDeny"
    >
      <p>
        {{ $t("pages.confirm_delete_message") }}
      </p>
    </ModulesConfirm>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { usePagesStore } from "~~/stores/pages";
import { Page } from "~~/models/page";
import { storeToRefs } from "pinia";
import { useNotificationStore } from "~~/stores/notifications";
import { useBlocksStore } from "~~/stores/blocks";

const { id } = useRoute().params;
const router = useRouter();
const pageStore = usePagesStore();
const notificationsStore = useNotificationStore();
const blocksStore = useBlocksStore();
const { loading } = storeToRefs(pageStore);
const { updatePage, deletePage, getPageById } = pageStore;
const { setNotification } = notificationsStore;
const { fetchBlockModels, getBlockModelById } = blocksStore;
const { getBlockById } = storeToRefs(blocksStore);
const page = ref<Page>(getPageById(id as string) as Page);
const showConfirm = ref(false);

const onBlockAdd = (selected: { id: string; projectId: string; type }) => {
  if (!page.value.blocks) page.value.blocks = [];
  page.value.blocks.push({ id: selected.id, type: selected.type });
};

const onBlockRemove = (idx: number) => {
  page.value.blocks.splice(idx, 1);
};

const changeStatus = async () => {
  page.value.status = page.value.status === "private" ? "public" : "private";
  const updated = await updatePage(page.value);
  if (updated) {
    setNotification(
      "Status changed!",
      `Status has changed to ${page.value.status}`,
      "success"
    );
  } else {
    // Handle error
    setNotification(
      "Status not changed",
      "The status could not be changed",
      "fail"
    );
    page.value.status = page.value.status === "private" ? "public" : "private";
  }
};

const updateTitle = async (newValue: string) => {
  page.value.title = newValue;
};

const updateSlug = async (newValue: string) => {
  page.value.slug = newValue;
};

const onAddNewBlock = async () => {};

const handleDeletePage = async () => {
  showConfirm.value = true;
};
const handleConfirmDeny = async () => {
  showConfirm.value = false;
};
const handleConfirmDelete = async () => {
  showConfirm.value = false;
  if (page.value.id) {
    const deleted = await deletePage(page.value.id as string);
    if (deleted) {
      setNotification(
        "Page deleted!",
        "The page was successfully deleted",
        "success"
      );
      router.push("/pages");
    } else {
      // Handle error
      setNotification(
        "Page not deleted",
        "The page could not be deleted",
        "fail"
      );
    }
  } else {
    setNotification("Page be deleted", "Missing ID", "fail");
  }
};

const savePage = async () => {
  const valueToBeSaved = { ...page.value };
  valueToBeSaved.blocks = valueToBeSaved.blocks.map((block) => {
    return block._id || block.id;
  });
  const saved = await updatePage(valueToBeSaved);

  if (saved) {
    setNotification(
      "Page saved!",
      "The page was successfully saved",
      "success"
    );
  } else {
    // Handle error
    setNotification("Page not saved", "The page could not be saved", "fail");
  }
};
await fetchBlockModels();
// Fetch data based on id.

// Show data.
</script>
