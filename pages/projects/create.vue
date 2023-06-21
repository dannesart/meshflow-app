<template>
    <NuxtLayout :name="layout">
        <template #header>

        </template>
        <template #left>
            <div class="flex gap-4 scale-90 ">
                <img src="~~/assets/images/city-wallpaper.png" class=" bg-white rounded-xl h-full " />
            </div>
        </template>
        <template #right>
            <div class="w-full flex flex-col gap-6 px-6 self-center justify-self-center place-self-center justify-center ">
                <UIHeadline size="h1" class="mb-6">
                    New project
                </UIHeadline>
                <ModulesInput type="text" @value-update="updateName">
                    Project name
                </ModulesInput>

                <UIButton type="add" @click="createNewProject">
                    Create
                </UIButton>
                <NuxtLink to="/" class="px-6 py-3 text-center text-red-600">
                    Nevermind
                </NuxtLink>
            </div>
        </template>

    </NuxtLayout>
</template>
<script setup lang="ts">
import { useProjectStore } from '~~/stores/projects';

const projectStore = useProjectStore();
const layout = "projects";
const projectName = ref();
const updateName = (value: string) => {
    projectName.value = value;
}
const createNewProject = async () => {
    try {
        await projectStore.createProject(projectName.value);
        await navigateTo('/pages');
    } catch (error) {
        console.log("Could not create")
    }
}
</script>