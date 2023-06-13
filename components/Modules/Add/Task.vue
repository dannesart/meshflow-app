<template>
    <UIForm :class="'flex flex-col gap-4'" name="new-task-form">
        <UIInput @valueUpdate="valueChange($event, 'title')" type="text" :min="3" :max="100" :value="newTask?.title">
            <label>
                Title
            </label>
        </UIInput>
    </UIForm>
</template>

<script setup lang="ts">
import { TaskSchema, TASK_STATUSES } from '~~/models/tasks';
import { useSession } from "#imports";
const { data } = useSession();
const events = defineEmits(['valueUpdate', 'onValid', 'onError'])
const errors = ref();
const statuses = TASK_STATUSES;

let newTask = {
    title: '',
    description: '',
    status: statuses[0],
    id: (Math.random() * 1000).toString(),
    tags: [],
    created: new Date(),
    createdBy: data.value?.user?.name || '',
    updated: new Date(),
    updatedBy: data.value?.user?.name || ''
}

const valueChange = (event: string, key: string) => {
    (newTask as any)[key] = event;
    events('valueUpdate', newTask);
    validate(newTask);
}

const validate = async (newTask: any) => {
    const validated = await TaskSchema.safeParse(newTask);

    if (!validated.success) {
        events('onError', validated.error)
    } else {
        events('onValid', validated.data)
    }
}

</script>