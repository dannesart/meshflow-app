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
            Tasks
        </UIHeadline>
        <section class="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg">
            <div class="flex flex-col gap-3">
                <label>Statuses</label>
                <ModulesTagsList color="white" can-add="true" @add="addNewTag">
                    <UITag v-for="(status, idx) in taskStatuses" class="cursor-pointer" can-edit="true" :value="status"
                        @save="event => updateTag(event, idx)">{{
    status
                        }}</UITag>
                </ModulesTagsList>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">

import { useSettingsStore } from "~~/stores/settings";
import { TASK_STATUSES } from "~~/models/task";

const values = ['Data & model', 'Web']
const settingsStore = useSettingsStore();
let taskStatuses = ref([...TASK_STATUSES]);

const updateTag = (value: string, tagIdx: number) => {
    taskStatuses.value[tagIdx] = value;
}

const addNewTag = () => {
    taskStatuses.value.push('tag ' + taskStatuses.value.length)
}


</script>