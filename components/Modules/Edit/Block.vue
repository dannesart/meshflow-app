<template>
    <UIForm :class="'flex flex-col gap-6'" name="new-block-form">

        <ModulesInput type="text" :max="50" :value="editBlockForm.name"
            @valueUpdate="$event => valueChange($event, 'name')">
            Name
        </ModulesInput>

        <ModulesInput type="text-lg" :max="100" :value="editBlockForm.description"
            @valueUpdate="$event => valueChange($event, 'description')">
            <label>
                Description <span class="text-sm text-gray-400">Optional</span>
            </label>
        </ModulesInput>


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

const { value } = defineProps(['value']);
const events = defineEmits(['valueUpdate', 'onValid', 'onError'])
const errors = ref();

const editBlockForm = ref(value);

const valueChange = (event: string, key: string) => {
    (editBlockForm as any).value[key] = event;
    events('valueUpdate', editBlockForm);
    validate(editBlockForm);
}

const validate = async (editBlockForm: any) => {
    const { name, description } = editBlockForm.value;
    const toBeValidated = { name, description };
    console.log(toBeValidated)
    const validated = await ModelSchema.partial({
        created: true,
        createdBy: true,
        updated: true,
        updatedBy: true,
        projectId: true,
        fields: true,
        id: true,
        serviceType: true
    }).safeParse(toBeValidated);
    if (!validated.success) {
        errors.value = [...validated.error.issues];
        events('onError', validated.error)
    } else {
        errors.value = []
        events('onValid', validated.data)
    }
}

</script>