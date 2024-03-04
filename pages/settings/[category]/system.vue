<template>
  <NuxtLayout>
    <UIHeadline size="h1"> System </UIHeadline>

    <div class="flex flex-col gap-3 p-6 bg-white shadow-lg rounded-xl">
      <label>Allow services</label>
      <ModulesInput
        type="multi-select"
        :value="value"
        :values="values"
        @value-update="updateType"
      ></ModulesInput>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useSettingsStore } from "~~/stores/settings";
const values = ["Data", "Blocks", "Pages", "Storage", "Rules", "API"];
const value = [...values];
const settingsStore = useSettingsStore();

const updateType = (value: string) => {
  const isWeb = value.toLowerCase() === "web";
  settingsStore.setIsWeb(isWeb);
};
</script>
