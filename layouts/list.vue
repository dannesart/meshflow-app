<template>
  <div class="layout dark:bg-primary-950">
    <UILoadBar v-if="loading"></UILoadBar>

    <ModulesAside></ModulesAside>
    <ModulesHeader></ModulesHeader>
    <main
      class="relative flex flex-col gap-10 px-6 py-4 pt-8 overflow-y-scroll overscroll-contain lg:px-10 lg:pt-12 lg:mb-10 lg:mr-10 bg-gray-50 dark:bg-black/20 rounded-3xl"
    >
      <div class="flex flex-col justify-between gap-10 md:flex-row">
        <UIHeadline size="h1">
          <slot name="header" />
        </UIHeadline>
        <div class="flex gap-6 justify-between">
          <slot name="filters" />
          <div class="w-[1px] h-5/6 my-auto bg-slate-300 hidden sm:block"></div>
          <slot name="actions" />
        </div>
      </div>
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
