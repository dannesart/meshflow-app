<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            Tasks
        </UIHeadline>

        <div class="flex gap-6">
            <ModulesFilter @filterChange="filterChange" @sortChange="sortChange">
            </ModulesFilter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <ModulesAdd type="task" @onAdd="onAdd" @onCancel="onCancel">
            </ModulesAdd>
        </div>

        <div class="flex md:gap-6 flex-col md:flex-row">
            <div class="flex-1 flex flex-col gap-3" v-for="status in TASK_STATUSES">
                <UIHeadline size="h3" :class="{ 'capitalize': true }">
                    {{ status }}
                </UIHeadline>
                <UIDroppable :status=status :list="tasks">
                    <NuxtLink :to="('/tasks/' + task.id)" class="flex-1 md:max-w-xl"
                        v-for="(task, index) in tasks.filter((task) => task.status === status)" draggable="true"
                        @dragstart="startDrag($event, task)">
                        <ModulesCard :title="task.title" :body="task.description"
                            @favorite="handleFavorite($event, task.title)"></ModulesCard>
                    </NuxtLink>
                </UIDroppable>
            </div>
        </div>
    </NuxtLayout>
</template>


<script setup lang="ts">

import { TTask, TASK_STATUSES } from '~~/models/task';
import { useTasksStore } from "~~/stores/tasks";
import { useNotificationStore } from "~~/stores/notifications";

const { setNotification } = useNotificationStore();
const tasksStore = useTasksStore();
const { tasks } = tasksStore;

const handleFavorite = (isFavorite: boolean, title: string) => {
    console.log(isFavorite)
    if (isFavorite) {
        setNotification('Pelle has liked', title)
    }
}

const startDrag = (event: DragEvent, item: TTask) => {
    const { id } = item;
    if (event) {
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('itemId', id);
        }
    }
}

const filters = ref({});
const sorts = ref({});

const filterChange = async (_filters: { [key: string]: any }) => {
    filters.value = { ...filters.value, ..._filters }
}

const sortChange = async (_sorts: { [key: string]: any }) => {
    sorts.value = { ...sorts.value, ..._sorts }
}


const onAdd = () => {

}

const onCancel = () => {

}


</script>