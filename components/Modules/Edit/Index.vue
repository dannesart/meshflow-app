
<template>
    <UIButton :type="asLink ? 'link' : 'add'" name="add-button" @click="addNewData()">
        {{ label || 'Add' }}
    </UIButton>

    <UIModal :show-modal="showModal" @on-close="cancelNewData()">
        <UIHeadline size="h1" v-if="type" :class="'mb-6'">
            Add new {{ type }}
        </UIHeadline>
        <slot></slot>

        <ModulesAddTask v-if="type === 'task'" @on-valid="setValid" @on-error="setInvalid"></ModulesAddTask>
        <ModulesAddPage v-if="type === 'page'" @on-valid="setValid" @on-error="setInvalid"></ModulesAddPage>
        <ModulesAddField v-if="type === 'field'" @on-valid="setValid" @on-error="setInvalid">
        </ModulesAddField>

        <footer class="absolute bottom-0 left-0 right-0 p-10 border-t flex gap-4">
            <UIButton type="add" @click="complete()" :disabled="!isValid">
                Create {{ type }}
            </UIButton>
            <UIButton type="nevermind" name="nevermind-button" @click="cancelNewData()">
                Nevermind
            </UIButton>
        </footer>
    </UIModal>
</template>

<script setup lang="ts">



const { type, asLink, label } = defineProps(['type', 'asLink', 'label']);
const emitEvents = defineEmits(['onAdd', 'onCancel']);
let showModal = ref(false);
let isValid = ref(false);
let addData = ref();

const setValid = (validData: any) => {
    isValid.value = true;
    addData.value = validData
}

const setInvalid = (object: any) => {
    isValid.value = false;
}

const addNewData = () => {
    // Do stuff.
    showModal.value = true;

}
const complete = () => {
    if (!isValid) false;
    emitEvents("onAdd", addData.value)
    showModal.value = false;
}
const cancelNewData = () => {
    showModal.value = false;
    emitEvents("onCancel")
}

</script>