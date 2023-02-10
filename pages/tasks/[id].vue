<template>
    <NuxtLayout>
        <header class="flex gap-4">
            <Headline size="h1">
                {{ task?.title }}
            </Headline>
            <Button data-favorite :type="task?.favorite ? 'love' : 'dead'" size="round"
                @click="event => toggleFavorite()">
                <Icons name="heart"></Icons>
            </Button>

        </header>
        <div class="flex gap-6">
            <Form :class="'flex-1'">
                <Input type="text-lg" :value="task.description">
                Description
                </Input>
            </Form>
            <aside class="w-96 flex flex-col gap-4 bg-white shadow-xl p-6 rounded-xl">
                <Input type="select" :values="TASK_STATUSES" :value="task?.status"
                    @value-update="event => updateStatus(event)">
                Status</Input>

                <div class="flex gap-3 flex-col">
                    <label>Tags</label>
                    <TagsList color="white" can-add="true" @add="addNewTag">
                        <Tag v-for="(tag, index) in task?.tags" :can-edit="true" :value="tag"
                            @save="updateTag($event, index)">
                            {{ tag }}
                        </Tag>
                    </TagsList>
                </div>

                <Input type="date" :value="task.deadline">
                Deadline
                </Input>



            </aside>

        </div>

        <footer>
            <Button type="add">
                Save
            </Button>
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