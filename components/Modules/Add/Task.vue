<template>
    <UIForm :class="'flex flex-col gap-4'" name="new-task-form">
        <UIInput @valueUpdate="valueChange($event, 'title')" type="text" :value="newTask.title">
            <label>
                Title
            </label>
        </UIInput>
    </UIForm>

</template>

<script setup lang="ts">
import { TaskValidator, TASK_STATUSES, TTask } from '~~/models/task';
const events = defineEmits(['valueUpdate', 'onValid', 'onError'])
const errors = ref();
const statuses = TASK_STATUSES;

let newTask: TTask = {
    title: '',
    description: '',
    status: statuses[0],
    id: '324234',
    favorite: false,
    created: new Date(),
    createdBy: 'Daniel'
}


const valueChange = (event: string, key: string) => {
    (newTask as any)[key] = event;
    events('valueUpdate', newTask);
    validate(newTask);
}

const validate = async (newTask: TTask) => {
    const { error, value } = await TaskValidator.validate(newTask);
    if (error && error.details && error.details.length) {
        events('onError', error)
    } else {
        events('onValid')
    }
}

</script>