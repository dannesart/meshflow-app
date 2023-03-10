<template>
    <NuxtLayout>

        <UIHeadline size="h1">
            Dashboard
        </UIHeadline>
        <div class="flex gap-5 flex-col md:flex-row">
            <ModulesStat label="Active tasks" :number="tasksStore.allTasks.length"></ModulesStat>
            <ModulesStat label="Data" number="2000" errors="3"></ModulesStat>
            <ModulesStat label="Users" number="45"></ModulesStat>
            <ModulesStat label="Rules" number="14"></ModulesStat>
        </div>

        <div class="flex gap-5 flex-col md:flex-row">
            <div class="flex flex-col gap-4 md:w-1/2">
                <UIHeadline size="h3">
                    Latest comments
                </UIHeadline>
                <div class="flex gap-4">
                    <ul class="w-full flex flex-col gap-5 p-5 rounded-lg shadow-lg bg-white">
                        <li v-for="comment in commentsStore.comments" class="border-b last:border-b-0">
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
                    <NuxtLink to="/tasks/add" class="text-blue-600">
                        + Create new task
                    </NuxtLink>
                    <!-- <Button type="link" @click="triggerAddNewTask">
                        
                    </Button> -->
                </div>
                <div class=" flex gap-5 ">
                    <ul class="w-full flex flex-col gap-4 p-5 rounded-lg shadow-lg bg-white">
                        <li v-for="task in latest" class="border-b last:border-b-0">
                            <ModulesExtendedLink :label="task.title" :sub-label="('Added by @' + task.createdBy)"
                                :route="('/tasks/' + task.id)">
                            </ModulesExtendedLink>
                        </li>
                    </ul>
                </div>
                <div class="flex justify-end">
                    <NuxtLink to="/tasks">
                        View all tasks
                    </NuxtLink>
                </div>
            </div>
        </div>

        <div class="text-xs">
            Fungus is more than just a tool to organize and publish your website's content.
            It's a powerful tool to unleash your creativity, bring your vision to life and connect with your audience in
            a meaningful way. With Fungus, the possibilities are endless: you can create engaging blog posts, dynamic
            web
            pages, and interactive experiences that captivate and inspire your audience. So dream big, let your
            imagination run wild, and use your Fungus to make a positive impact on the world, one website at a time.
        </div>
    </NuxtLayout>
</template>

<script setup>




import { useTasksStore } from "~~/stores/tasks";
import { useCommentsStore } from "~~/stores/comments";

const tasksStore = useTasksStore();
const commentsStore = useCommentsStore();
const { latest } = tasksStore;


</script>