<template>
    <NuxtLayout>

        <UIHeadline size="h1">
            Dashboard
        </UIHeadline>
        <div class="flex gap-5 overflow-x-scroll md:overflow-x-visible flex-row scroll-smooth snap-x min-h-[8rem] ">
            <ModulesStat label="Active tasks" :number="tasksStore.allTasks.length"></ModulesStat>
            <ModulesStat label="Pages" :number="pages.length"></ModulesStat>
            <ModulesStat label="Users" :number="usersAmount"></ModulesStat>
            <ModulesStat label="Rules" number="14"></ModulesStat>
        </div>

        <div class="flex gap-5 flex-col md:flex-row">
            <div class="flex flex-col gap-4 md:w-1/2">
                <UIHeadline size="h3">
                    Latest comments
                </UIHeadline>
                <div class="flex gap-4">
                    <ul class="w-full flex flex-col gap-5 p-5 rounded-lg shadow-lg bg-white">
                        <li v-for="comment in commentsStore.comments" class="border-b pb-5 last:pb-0 last:border-b-0">
                            <ModulesExtendedLink :label="comment.message" :sub-label="('Added by @' + comment.from)"
                                :route="('/comments/' + comment.id)">
                            </ModulesExtendedLink>
                        </li>
                        <li v-if="!commentsStore.comments.length">
                            <small>
                                No comments yet
                            </small>
                        </li>
                    </ul>
                </div>
                <div class="flex justify-end">
                    <NuxtLink to="/comments">
                        View all comments
                    </NuxtLink>
                </div>
            </div>
            <div class="flex flex-col gap-4 md:w-1/2">
                <div class="flex justify-between">
                    <UIHeadline size="h3">
                        Latests tasks
                    </UIHeadline>
                    <ModulesAdd type="task" asLink="true" label="+ Create new task" @onAdd="onAdd" @onCancel="onCancel">
                    </ModulesAdd>
                </div>
                <div class=" flex gap-5">
                    <div v-if="tasksStore.isLoading">
                        <UILoader></UILoader>
                    </div>
                    <ul v-else class="w-full flex flex-col gap-4 p-5 rounded-lg shadow-lg bg-white">
                        <li v-for="task in latest" class="border-b last:border-b-0 pb-5 last:pb-0">
                            <ModulesExtendedLink :label="task.title" :sub-label="task.description" :tags="task.tags"
                                :route="('/board/' + task.id)">
                                <div class="mb-2 flex gap-3 items-center text-sm text-gray-400">
                                    Added by <UIUserTag :id="task.createdBy"></UIUserTag>
                                </div>
                            </ModulesExtendedLink>
                        </li>
                    </ul>
                </div>
                <div class="flex justify-end">
                    <NuxtLink to="/board">
                        View all tasks
                    </NuxtLink>
                </div>
            </div>
        </div>

    </NuxtLayout>
</template>

<script setup lang=ts>

import { useTasksStore } from "~~/stores/tasks";
import { usePagesStore } from "~~/stores/pages";
import { useCommentsStore } from "~~/stores/comments";
import { useUsersStore } from "~~/stores/users";
import { Task, TASK_STATUSES } from '~~/models/tasks';
import { useNotificationStore } from "~~/stores/notifications";

const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const tasksStore = useTasksStore();
const commentsStore = useCommentsStore();
const { latest, tasks, addTask } = tasksStore;
const { pages } = usePagesStore();
const { usersAmount } = useUsersStore();

const onAdd = async (task: Task) => {

    if (await addTask(task)) {

        useRouter().push('/board')
        setNotification("Task created", "Your task was successfully created", "success")
    } else {
        setNotification("Task not created", "Your task could not be created", "fail")
    }

}

const onCancel = () => {

}


</script>