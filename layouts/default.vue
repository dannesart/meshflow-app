<template>
  <div class="layout dark:bg-blue-950">
    <UILoadBar v-if="loading"></UILoadBar>

    <ModulesAside></ModulesAside>
    <ModulesHeader></ModulesHeader>
    <main
      class="relative flex flex-col gap-10 px-6 py-4 pt-8 overflow-y-scroll overscroll-contain lg:px-10 lg:pt-12 lg:mb-10 lg:mr-10 bg-slate-50 dark:bg-black/20 rounded-3xl"
    >
      <slot />
    </main>
    <ModulesToaster></ModulesToaster>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUiStore } from "~~/stores/ui";
const uiStore = useUiStore();
const { loading } = storeToRefs(uiStore);
</script>
