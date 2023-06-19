<template>
    <NuxtLayout>
        <header class="flex gap-4">
            <UIHeadline size="h1">
                {{ task?.title }}
            </UIHeadline>
            <ModulesFavorite @favorite="toggleFavorite" :class="'relative top-auto right-auto'"></ModulesFavorite>

        </header>
        <div class="flex gap-6 flex-col md:flex-row" v-if="task">
            <UIForm :class="'flex-1 flex flex-col gap-6'">

                <UIInput type="text-lg" :max="300" :value="task.description" @value-update="e => task.description = e">
                    Description
                </UIInput>

                <ModulesTodo></ModulesTodo>

                <div class="flex gap-6 mt-10">
                    <UIButton type="add" @click="save()">
                        Save
                    </UIButton>
                    <UIButton type="delete" @click="handleDelete">
                        Delete task
                    </UIButton>

                </div>
            </UIForm>
            <aside class="md:w-96 flex flex-col gap-4 bg-white shadow-xl p-6 rounded-xl">


                <UIInput type="select" :values="TASK_STATUSES" :value="task.status"
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

                <UIInput type="date" :value="task?.deadline">
                    Deadline
                </UIInput>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-3">
                        Created by
                        <div class="flex items-center gap-3">
                            <UIUserTag :id="task.createdBy"></UIUserTag>
                            <UIDate :date="task.created"></UIDate>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3">
                        Updated by
                        <div class="flex items-center gap-3">
                            <UIUserTag :id="task.updatedBy"></UIUserTag>
                            <UIDate :date="task.updated"></UIDate>
                        </div>
                    </div>
                </div>





            </aside>

        </div>




    </NuxtLayout>
</template>

<script setup lang="ts">
import { Task, TASK_STATUSES } from '~~/models/tasks';
import { useTasksStore } from "~~/stores/tasks";
import { useNotificationStore } from "~~/stores/notifications";

const tasksStore = useTasksStore();
const notificationStore = useNotificationStore();
const { setNotification } = notificationStore;
const { taskById, updateTask, deleteTask } = tasksStore;
const { id } = useRoute().params;
const task = ref<Task>(taskById(id as string) as Task);


const toggleFavorite = () => {
    if (task.value) {
        setNotification("Liked task", "Danne liked you task")
        //task.favorite = !task?.favorite;

    }
}

const updateStatus = (status: any) => {
    //updateTask(task.value, { status });
    task.value.status = status;
}

const updateTag = (value: string, tagIdx: number) => {
    task.value.tags[tagIdx || 0] = value;
}

const addNewTag = () => {
    task.value.tags.push('tag ' + task.value.tags.length)

}

const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
        await deleteTask(task.value);
        useRouter().push('/board')
    }
}

const save = async () => {
    await updateTask(task.value, { ...task });
    setNotification("Task updated", "The tasks was successfully updated!")
}



</script>