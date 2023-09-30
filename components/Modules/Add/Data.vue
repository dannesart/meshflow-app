<template>
    <UIForm :class="'flex flex-col gap-6'" name="new-data-form">

        <ModulesInput v-for="field in fields" :required="field.validations.required" :type="field.type.id"
            :value="newDataForm[field.id]" @valueUpdate="$event => valueChange($event, field.id)">
            {{ field.name }}
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
import { useProjectStore } from '~~/stores/projects';

const { fields, serviceType } = defineProps(['fields', 'serviceType']);
const events = defineEmits(['valueUpdate', 'onValid', 'onError'])
const errors = ref();


const newDataForm = ref<any>({
    serviceType,
    projectId: useProjectStore().activeId
})

const valueChange = (event: string, key: string) => {
    (newDataForm as any).value[key] = event;
    events('valueUpdate', newDataForm.value);
    const isValid = valid.value;
    if (!isValid.success) {
        errors.value = [...isValid.error.issues];
        events('onError', isValid.error)
    }
    else {
        errors.value = []
        events('onValid', isValid.data)
    }
}
const schema = fieldsToSchema(fields || []);
const valid = computed(() => {
    const validated = schema.safeParse(newDataForm.value);
    return validated;
})
if (valid.value.success) {
    events('onValid', valid.value)
}

</script>