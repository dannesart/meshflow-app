<template>
    <UIForm :class="'flex flex-col gap-4'" name="new-task-form">

        <ModulesInput @valueUpdate="$event => valueChange($event, 'title')" type="text" :min="3" :max="100"
            :value="newTask?.title">
            <label>
                Title
            </label>
        </ModulesInput>
    </UIForm>
</template>

<script setup lang="ts">
import { TaskSchema, TASK_STATUSES } from '~~/models/tasks';
import { useSession } from "#imports";
import { useProjectStore } from '~~/stores/projects';
const { data } = useSession();
const events = defineEmits(['valueUpdate', 'onValid', 'onError'])
const errors = ref();
const statuses = TASK_STATUSES;

const newTask = ref({
    title: '',
    description: '',
    status: statuses[0],
    tags: [],
    projectId: useProjectStore().activeId,
    created: new Date(),
    createdBy: data.value?.user?.name || '',
    updated: new Date(),
    updatedBy: data.value?.user?.name || ''
})

const valueChange = (event: string, key: string) => {
    (newTask as any).value[key] = event;
    events('valueUpdate', newTask.value);
    validate(newTask);
}

const validate = async (newTask: any) => {
    const validated = await TaskSchema.safeParse(newTask.value);
    if (!validated.success) {
        events('onError', validated.error)
    } else {
        events('onValid', validated.data)
    }
}

</script>