<template>
    <UIForm :class="'flex flex-col gap-4'" name="new-field-form">
        <div v-if="step === 1">
            <section class="flex gap-6 flex-col md:flex-row" name="model-types">
                <div v-for="type in ModelTypes"
                    class="p-5 md:p-10 rounded-xl gap-6 shadow-xl flex w-full hover:shadow-2xl cursor-pointer"
                    name="model-type" @click="selectType(type)">

                    <div>
                        <UIIcons :name="type.icon"></UIIcons>
                    </div>
                    <div class="flex flex-col">

                        <UIHeadline :size="'h3'">
                            {{ type.name }}
                        </UIHeadline>
                        <p class="text-sm text-gray-400">
                            {{ type.description }}
                        </p>
                    </div>
                </div>
            </section>
        </div>
        <div v-if="step === 2">
            <div class="flex gap-4 items-baseline cursor-pointer" @click="step = 1">
                <UIButton type="icon" size="small">
                    <UIIcons name="arrow-left"></UIIcons>
                </UIButton>
                <UIHeadline size="h3" name="selected-model-type">{{ field.type.name }}</UIHeadline>
            </div>
            <div class="flex gap-6 mb-6">
                <UIInput :type="'text'" :value="field.name" @value-update="e => handleOnName(e)" class="w-96">
                    Name
                </UIInput>
                <UIInput :type="'text'" :value="field.id" :disabled="true" class="w-96">
                    Id
                </UIInput>
            </div>
            <div class="mb-12" v-if="field.type.name === ModelTypes[0].name">
                <UIInput type="checkbox" name="main-title" :value="field.isMain" @value-update="e => field.isMain = e">
                    This represent main title
                </UIInput>
            </div>
            <UIHeadline size="h3">Validations</UIHeadline>
            <div class="flex flex-col gap-4">
                <UIInput type="checkbox" name="required">
                    Required
                </UIInput>

                <div class="flex flex-col gap-4" v-if="field.type.name === ModelTypes[0].name">
                    <UIInput type="checkbox" name="character-count" :value="field.validations.minMax.use"
                        @value-update="e => field.validations.minMax.use = e">
                        Limit character count
                    </UIInput>
                    <div class="flex gap-4 items-end" v-if="field.validations.minMax.use"
                        :class="{ 'bg-blue-50 p-6 rounded-xl': field.validations.minMax.use }">
                        <UIInput type="text" :value="field.validations.minMax.min"
                            @value-update="e => handleMinMax(e, true)">
                            Min
                        </UIInput>
                        <div class="pb-4">
                            -
                        </div>
                        <UIInput type="text" :value="field.validations.minMax.max"
                            @value-update="e => handleMinMax(e, false)">
                            Max
                        </UIInput>
                    </div>
                </div>

            </div>
        </div>
    </UIForm>
</template>

<script setup lang="ts">
import { ModelField, ModelFieldSchema, ModelType } from '~~/models/model';
import { ModelTypes } from "~~/constants/model";
const events = defineEmits(['valueUpdate', 'onValid', 'onError'])
const step = ref(1);

const field = ref<ModelField>({
    id: '',
    name: '',
    type: ModelTypes[0],
    isMain: false,
    validations: {
        required: false,
        minMax: {
            use: false,
            min: undefined,
            max: undefined
        }
    }
})

const handleMinMax = (value: number, isMin: boolean) => {
    if (isMin) {
        if ((field.value.validations.minMax.max || 0) < value) {
            field.value.validations.minMax.max = value < 0 ? 0 : value;
        }
        field.value.validations.minMax.min = value < 0 ? 0 : value;
    }
    if (!isMin) {
        if ((field.value.validations.minMax.min || 0) > value) {
            field.value.validations.minMax.min = value < 0 ? 0 : value;
        }
        field.value.validations.minMax.max = value < 0 ? 0 : value;

    }

}

const selectType = (type: ModelType) => {
    field.value.type = type;
    step.value = 2;
}

const handleOnName = (value: string) => {
    field.value.name = value;
    field.value.id = value.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
    checkValid();
}

const checkValid = () => {
    if (ModelFieldSchema.safeParse({ ...field.value })) {
        console.log("valid", { ...field.value })
        events('onValid', { ...field.value })
    } else {
        console.log("error", { ...field.value })
        events('onError', { ...field.value })
    }
}



</script>