<template>
  <NuxtLayout :name="layout">
    <template #header> </template>
    <div
      class="flex flex-col self-center justify-center w-full gap-6 px-6 justify-self-center place-self-center"
    >
      <UIHeadline size="h1" class="mb-6"> New project </UIHeadline>
      <ModulesInput type="text" @value-update="updateName">
        Project name
      </ModulesInput>

      <footer class="flex flex-col gap-4 md:flex-row">
        <UIButton type="add" @click="createNewProject"> Create </UIButton>
        <NuxtLink to="/" class="px-6 py-3 text-center text-red-600">
          Nevermind
        </NuxtLink>
      </footer>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useProjectStore } from "~~/stores/projects";

const projectStore = useProjectStore();
const layout = "projects";
const projectName = ref();
const updateName = (value: string) => {
  projectName.value = value;
};
const createNewProject = async () => {
  try {
    await projectStore.createProject(projectName.value);
    await navigateTo("/pages");
  } catch (error) {
    console.log("Could not create");
  }
};
</script>
