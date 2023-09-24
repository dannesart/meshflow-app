<template>
    <NuxtLayout>

        <UIHeadline size="h1">
            Dashboard
        </UIHeadline>
        <div class="flex gap-5 overflow-x-scroll md:overflow-x-visible flex-row scroll-smooth snap-x min-h-[8rem] ">
            <ModulesStat label="Active tasks" :number="allTasks.length"></ModulesStat>
            <ModulesStat label="Pages" :number="pages.length"></ModulesStat>
            <ModulesStat label="Users" :number="usersAmount"></ModulesStat>
            <ModulesStat label="Rules" :number="rules"></ModulesStat>
        </div>

        <div class="flex gap-5 flex-col md:flex-row">
            <div class="flex flex-col gap-4 md:w-1/2 h-full justify-between">
                <div class="flex flex-col gap-4">
                    <UIHeadline size="h3">
                        Latest sign in
                    </UIHeadline>
                    <div class="flex gap-5">
                        <ul class="w-full flex gap-5 overflow-x-scroll md:overflow-x-visible scroll-smooth snap-x ">
                            <li v-for="(user, userId) in allUsers" class="snap-center">
                                <ModulesUserCard :user="user" :userId="userId"></ModulesUserCard>
                            </li>
                            <li v-if="!usersAmount">
                                <small>
                                    No activity yet
                                </small>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex justify-end items-end">
                    <NuxtLink to="/">
                        View latest activity
                    </NuxtLink>
                </div>
            </div>
            <div class="flex flex-col gap-4 md:w-1/2 h-full justify-between">
                <div class="flex flex-col gap-4">
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
                </div>
                <div class="flex justify-end items-end">
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
import { useUsersStore } from "~~/stores/users";
import { useCommentsStore } from "~~/stores/comments";
import { Task } from '~~/models/tasks';
import { useNotificationStore } from "~~/stores/notifications";
import { storeToRefs } from "pinia";

const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const { comments } = storeToRefs(useCommentsStore());
const tasksStore = useTasksStore();
const { addTask } = tasksStore;
const { latest, allTasks } = storeToRefs(tasksStore);
const { pages } = storeToRefs(usePagesStore());
const { usersAmount, allUsers } = useUsersStore();

const rules = 0;

const onAdd = async (task: Task) => {

    if (await addTask(task)) {
        setNotification(
            "Task added",
            "The task was successfully added!",
            "success"
        )
        useRouter().push('/board')
    } else {
        setNotification(
            "Task not added",
            "The task could not be added!",
            "fail"
        );
    }

}

const onCancel = () => {

}


</script>