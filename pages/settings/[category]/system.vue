<template>
  <NuxtLayout>
    <UIHeadline size="h1"> System </UIHeadline>

    <div class="flex flex-col gap-3 p-6 bg-white shadow-lg rounded-xl">
      <label>Allow services</label>
      <ModulesInput
        type="multi-select"
        :value="allActiveServices"
        :values="availableServices"
        @value-update="setActiveServices"
      ></ModulesInput>
    </div>
    <footer class="flex gap-4">
      <UIButton type="add" @click="saveSettings()">Save</UIButton>
    </footer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useSettingsStore, availableServices } from "~~/stores/settings";
import { useNotificationStore } from "~~/stores/notifications";
import { storeToRefs } from "pinia";

const settingsStore = useSettingsStore();
const { setActiveServices } = settingsStore;
const { allActiveServices } = storeToRefs(settingsStore);
const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;

const saveSettings = () => {};
</script>
