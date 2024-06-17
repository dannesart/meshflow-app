<template>
  <NuxtLayout :name="layout">
    <template #header> New project </template>
    <div class="flex flex-col gap-5">
      <UIForm>
        <ModulesInput class="mt-3" type="text" @value-update="updateName">
          Project name
        </ModulesInput>
        <UIButton
          class="float-right w-full mt-5 md:w-auto"
          type="add"
          @click="createNewProject"
        >
          Create
        </UIButton>
      </UIForm>
      <NuxtLink
        to="/"
        v-if="projectStore.projects.length"
        class="px-6 py-3 mt-3 text-center text-rose-600 hover:bg-rose-50 transition-all rounded-lg"
      >
        Nevermind
      </NuxtLink>
    </div>
    <template #footer> </template>
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
