<template>
    <NuxtLayout>
        <header class="flex gap-4">
            <UIHeadline size="h1">
                {{ task?.title }}
            </UIHeadline>
            <UIButton data-favorite :type="task?.favorite ? 'love' : 'dead'" size="round"
                @click="event => toggleFavorite()">
                <UIIcons name="heart">
                </UIIcons>
            </UIButton>

        </header>
        <div class="flex gap-6">
            <UIForm :class="'flex-1'">
                <UIInput type="text-lg" :value="task.description">
                    Description
                </UIInput>

                <ModulesTodo></ModulesTodo>
            </UIForm>
            <aside class="w-96 flex flex-col gap-4 bg-white shadow-xl p-6 rounded-xl">
                <UIInput type="select" :values="TASK_STATUSES" :value="task?.status"
                    @value-update="event => updateStatus(event)">
                    Status</UIInput>

                <div class="flex gap-3 flex-col">
                    <label>Tags</label>
                    <ModulesTagsList color="white" can-add="true" @add="addNewTag">
                        <UITag v-for="(tag, index) in task?.tags" :can-edit="true" :value="tag"
                            @save="updateTag($event, index)">
                            {{ tag }}
                        </UITag>
                    </ModulesTagsList>
                </div>

                <UIInput type="date" :value="task.deadline">
                    Deadline
                </UIInput>



            </aside>

        </div>

        <footer>
            <UIButton type="add">
                Save
            </UIButton>
        </footer>




    </NuxtLayout>
</template>

<script setup lang="ts">
import { TTask, TASK_STATUSES } from '~~/models/task';
import { useTasksStore } from "~~/stores/tasks";

const tasksStore = useTasksStore();
const { taskById, updateTask } = tasksStore;
const { id } = useRoute().params;
const task: TTask = taskById(id as string) as TTask;

const toggleFavorite = () => {
    if (task) {
        task.favorite = !task?.favorite;
    }
}

const updateStatus = (status: any) => {
    updateTask(task, { status });
}

const updateTag = (value: string, tagIdx: number) => {
    if (!task.tags) task.tags = [];
    task.tags[tagIdx || 0] = value;
}

const addNewTag = () => {
    if (!task.tags) task.tags = [];

    task.tags.push('tag ' + task.tags.length)

}



</script>