<template>
    <UIForm :class="'flex flex-col gap-4'" name="new-page-form">

        <ModulesInput @valueUpdate="valueChange($event, 'title')" :name="'title'" type="text" :value="newPage?.title">
            <label>
                Title
            </label>
        </ModulesInput>

        <div class="p-3 px-4 rounded-lg bg-gray-100">This will not be public once it's created</div>
    </UIForm>
</template>

<script setup lang="ts">
import { PageSchema, PAGE_STATUSES, Page } from '~~/models/page';
const events = defineEmits(['valueUpdate', 'onValid', 'onError'])
const errors = ref();
const statuses = PAGE_STATUSES;

let newPage: Page = {
    title: '',
    status: statuses[1],
    id: (Math.random() * 1000).toString(),
    tags: [],
    blocks: [],
    slug: '',
    created: new Date(),
    createdBy: '',
    updated: new Date(),
    updatedBy: ''
}

const valueChange = (event: string, key: string) => {

    if (key === "title") {
        (newPage as any).title = event;
        (newPage as any).slug = typeof event === "string" ? '/' + event.split(' ').map((str) => { return str.charAt(0).toUpperCase() + str.slice(1) }).join('') : event;
    } else {
        (newPage as any)[key] = event;
    }
    events('valueUpdate', newPage);
    validate(newPage);
}

const validate = async (_newPage: Page) => {
    const validated = await PageSchema.safeParse(_newPage);

    if (!validated.success) {
        events('onError', validated.error)
    } else {
        events('onValid', validated.data)
    }
}

</script>