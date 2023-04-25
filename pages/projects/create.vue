<template>
    <NuxtLayout :name="layout">
        <template #header>
            <UIHeadline size="h1">
                Create new project
            </UIHeadline>
        </template>
        <template #left>
            <div class="flex gap-4">
                <img src="~~/assets/images/team.svg" class=" bg-white rounded-xl p-6 h-full" />
            </div>
        </template>
        <template #right>
            <div class="w-96 flex flex-col gap-6 px-6 self-center justify-self-center place-self-center">
                <UIInput type="text" @value-update="updateName">
                    Project name
                </UIInput>

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