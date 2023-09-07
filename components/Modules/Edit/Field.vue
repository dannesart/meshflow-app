<template>
    <div class="flex gap-6 mb-6">
        <ModulesInput :type="'text'" :value="field.name" @value-update="e => handleOnName(e)" class="w-96">
            Name
        </ModulesInput>
        <ModulesInput :type="'text'" :value="field.id" :disabled="true" class="w-96">
            Id
        </ModulesInput>
    </div>
    <div class="mb-12" v-if="field.type.name === ModelTypes[0].name">
        <ModulesInput type="checkbox" name="main-title" :value="field.isMain" @value-update="e => field.isMain = e">
            This represent main title
        </ModulesInput>
    </div>
    <div class="mb-12" v-if="field.type.name === ModelTypes[4].name">
        <ModulesInput type="multi-select" name="reference-types" :value="field.validations.allowedReferences"
            :values="blockTypes">
            Select allowed reference types
        </ModulesInput>
    </div>
    <UIHeadline size="h3">Validations</UIHeadline>
    <div class="flex flex-col gap-4">
        <ModulesInput type="checkbox" name="required">
            Required
        </ModulesInput>

        <div class="flex flex-col gap-4" v-if="field.type.name === ModelTypes[0].name">
            <ModulesInput type="checkbox" name="character-count" :value="field.validations.minMax.use"
                @value-update="e => field.validations.minMax.use = e">
                Limit character count
            </ModulesInput>
            <div class="flex gap-4 items-end" v-if="field.validations.minMax.use"
                :class="{ 'bg-blue-50 p-6 rounded-xl': field.validations.minMax.use }">
                <ModulesInput type="text" :value="field.validations.minMax.min" @value-update="e => handleMinMax(e, true)">
                    Min
                </ModulesInput>
                <div class="pb-4">
                    -
                </div>
                <ModulesInput type="text" :value="field.validations.minMax.max" @value-update="e => handleMinMax(e, false)">
                    Max
                </ModulesInput>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ModelTypes } from "~~/constants/model";
import { ModelFieldSchema } from "~~/models/model";
import { useBlocksStore } from "~~/stores/blocks";

const { value } = defineProps(['value'])
const field = ref({ ...value });
const { blocks } = storeToRefs(useBlocksStore());
const blockTypes = blocks.value.map((block) => block.name);
const events = defineEmits(['onError', 'onValid']);

const handleMinMax = (value: number, isMin: boolean) => {
    // if (isMin) {
    //     if ((field.value.validations.minMax.max || 0) < value) {
    //         field.value.validations.minMax.max = value < 0 ? 0 : value;
    //     }
    //     field.value.validations.minMax.min = value < 0 ? 0 : value;
    // }
    // if (!isMin) {
    //     if ((field.value.validations.minMax.min || 0) > value) {
    //         field.value.validations.minMax.min = value < 0 ? 0 : value;
    //     }
    //     field.value.validations.minMax.max = value < 0 ? 0 : value;

    // }

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

<script lang="ts">
export default defineComponent({
    name: 'EditField'
})
</script>