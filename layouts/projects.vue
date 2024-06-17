<template>
  <div class="w-screen h-screen">
    <UILoadBar v-if="loading"></UILoadBar>
    <div class="fixed top-0 right-0 z-50">
      <ModulesHeader :slim="!projectStore.projects.length"></ModulesHeader>
    </div>
    <main class="flex flex-col w-full h-full md:flex-row">
      <div class="flex gap-4 p-4 md:flex-1 md:h-full md:p-10 bg-secondary-200">
        <UILogo
          :size="30"
          :full="true"
          :can-go-dark="false"
          :text-only="true"
        />
        <UIHeadline size="h4" class="self-center md:hidden text-primary-950">
          <slot name="header" />
        </UIHeadline>
      </div>
      <div
        class="flex justify-center h-full px-4 py-10 md:items-center md:px-10 bg-secondary-200 md:bg-white md:flex-1"
      >
        <div class="flex flex-col gap-5 flex-1 max-w-[500px]">
          <UIHeadline size="h1" class="hidden md:block">
            <slot name="header" />
          </UIHeadline>
          <div>
            <slot />
          </div>
          <footer>
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </main>
    <ModulesToaster></ModulesToaster>
  </div>
</template>

<script setup>
import { useProjectStore } from "~~/stores/projects";

const projectStore = useProjectStore();
const loading = false;
</script>
