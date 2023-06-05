<template>
    <UIForm :class="'flex flex-col gap-6'" name="new-block-form">

        <UIInput type="text" :max="50" :value="newBlockForm.name" @valueUpdate="$event => valueChange($event, 'name')">
            Name
        </UIInput>

        <UIInput type="text-lg" :max="100" :value="newBlockForm.description"
            @valueUpdate="$event => valueChange($event, 'description')">
            <label>
                Description <span class="text-sm text-gray-400">Optional</span>
            </label>
        </UIInput>


        <div name="new-block-error" class="flex gap-4 bg-red-50 p-4 rounded-lg mt-6" v-for="error in errors">
            <span class="font-bold capitalize">
                {{ error.path.join("/") }}
            </span>
            <span>
                {{ error.message }}
            </span>
        </div>
    </UIForm>
</template>

<script setup lang="ts">
import { Model, ModelSchema } from '~~/models/model';
import { useSession } from "#imports";
const { data } = useSession();
const events = defineEmits(['valueUpdate', 'onValid', 'onError'])
const errors = ref();

const newBlockForm = ref({
    name: '',
    description: '',
    fields: [],
    serviceType: 'block'
})

const valueChange = (event: string, key: string) => {
    (newBlockForm as any).value[key] = event;
    events('valueUpdate', newBlockForm);
    validate(newBlockForm);
}

const validate = async (newBlockForm: any) => {
    const validated = await ModelSchema.partial({
        created: true,
        createdBy: true,
        updated: true,
        updatedBy: true,
        projectId: true,
        id: true
    }).safeParse(newBlockForm.value);

    if (!validated.success) {
        errors.value = [...validated.error.issues];
        events('onError', validated.error)
    } else {
        errors.value = []
        events('onValid', validated.data)
    }
}

</script>