<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            Settings
        </UIHeadline>

        <UIHeadline size="h2">
            General
        </UIHeadline>
        <section class="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg">

            <ModulesExtendedLink :label="'System'" :sub-label="('Set system as web or data/model')"
                :route="('/settings/general/system')">
            </ModulesExtendedLink>

            <ModulesExtendedLink :label="'Grejs'" :sub-label="('Set system as web or data/model')"
                :route="('/settings/general/system')">
            </ModulesExtendedLink>


        </section>
        <UIHeadline size="h2">
            Board
        </UIHeadline>
        <section class="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg">
            <div class="flex flex-col gap-3">
                <label>Statuses</label>
                <ModulesTagsList color="white" can-add="true" @add="addNewTag">
                    <draggable :list="taskStatuses" item-key="id" :component-data="{ class: 'flex gap-3' }">
                        <template #item="{ element: status }">
                            <UITag class="cursor-pointer" can-edit="true" :value="status" @save="event => updateTag(event)">
                                {{
                                    status
                                }}</UITag>
                        </template>
                    </draggable>
                </ModulesTagsList>
            </div>
            <div class="flex flex-col gap-3">
                <label>Sprints</label>
                <ModulesInput type="checkbox" name="allow-sprints" :value="settingsStore.isUsingSprints"
                    @value-update="e => settingsStore.setUseSprints(e)">
                    Allow sprints
                </ModulesInput>
            </div>
        </section>
        <UIHeadline size="h2">
            Shut down
        </UIHeadline>
        <section class="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg">
            <div class="flex flex-col gap-3">
                <label>Leave this project</label>
                <p class="text-sm text-gray-400">
                    Leaving this project means that the project will stay alive. <br />You can't leave if you are the
                    creator of
                    this project.
                    <br />But you can transfer the ownership to any other user.
                </p>
                <div>

                    <UIButton type="nevermind" class="flex-0">Leave</UIButton>
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <label>Delete this project</label>
                <p class="text-sm text-gray-400">
                    Deleting this project will remove all data connected to this project.
                    <br />Users, data, blocks, pages,
                    settings, rules, roles and storage.
                </p>
                <div>

                    <UIButton type="nevermind" class="flex-0">Delete</UIButton>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">

import { useSettingsStore } from "~~/stores/settings";
import { TASK_STATUSES } from "~~/models/tasks";

const values = ['Data & model', 'Web']
const settingsStore = useSettingsStore();
let taskStatuses = ref([...TASK_STATUSES]);

const updateTag = (value: string) => {
    //taskStatuses.value[tagIdx] = value;
}

const addNewTag = () => {
    taskStatuses.value.push('tag ' + taskStatuses.value.length)
}


</script>