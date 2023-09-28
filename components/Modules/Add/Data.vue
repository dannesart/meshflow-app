<template>
    <UIForm :class="'flex flex-col gap-6'" name="new-data-form">

        <ModulesInput v-for="field in fields" :required="field.validations.required" :type="field.type.id" :max="50"
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
const openBlock = ref();

const toggleOpenBlock = (name: string) => {
    openBlock.value = openBlock.value === name ? '' : name;
}

const newDataForm = ref<any>({
    serviceType,
    projectId: useProjectStore().activeId
})

const valueChange = (event: string, key: string) => {
    (newDataForm as any).value[key] = event;
    events('valueUpdate', newDataForm.value);
    validate(newDataForm.value);
}



const validate = (newData: any) => {

    const schema = fieldsToSchema(fields || []);
    const validated = schema.safeParse(newData);

    if (!validated.success) {
        errors.value = [...validated.error.issues];
        events('onError', validated.error)
    } else {
        errors.value = []
        events('onValid', validated.data)
    }
}

</script>