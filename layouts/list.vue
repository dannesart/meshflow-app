<template>
  <div class="layout">
    <UILoadBar v-if="loading"></UILoadBar>

    <ModulesAside></ModulesAside>
    <ModulesHeader></ModulesHeader>
    <main
      class="overscroll-contain py-4 px-6 lg:px-10 pt-8 lg:pt-12 lg:mb-10 lg:mr-10 flex flex-col gap-10 bg-slate-50 rounded-3xl relative overflow-y-scroll"
    >
      <UIHeadline size="h1">
        <slot name="header" />
      </UIHeadline>
      <div class="flex gap-6">
        <slot name="filters" />
        <div class="w-[1px] h-5/6 my-auto bg-slate-300"></div>
        <slot name="actions" />
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
