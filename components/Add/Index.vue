
<template>

    <Button type="add" name="add-button" @click="addNewData()">
        Add
    </Button>

    <Modal :show-modal="showModal" @on-close="cancelNewData()">
        <Headline size="h1" v-if="type" :class="'mb-6'">
            Add new {{ type }}
        </Headline>
        <slot></slot>

        <AddTask v-if="type === 'task'" @on-valid="setValid" @on-error="setInvalid"></AddTask>

        <footer class="absolute bottom-0 left-0 right-0 p-10 border-t flex gap-4">
            {{ isValid }}
            <Button type="add" @click="complete()" :disabled="!isValid">
                Complete
            </Button>
            <Button type="nevermind" name="nevermind-button" @click="cancelNewData()">
                Nevermind
            </Button>
        </footer>
    </Modal>

</template>

<script setup lang="ts">


const { type } = defineProps(['type']);
const emitEvents = defineEmits(['onAdd', 'onCancel']);
let showModal = ref(false);
let isValid = false;

const setValid = (object: any) => {
    isValid = true;
}

const setInvalid = (object: any) => {
    isValid = false;
}

const addNewData = () => {
    // Do stuff.
    showModal.value = true;

}
const complete = () => {
    if (!isValid) false;
    emitEvents("onAdd")
    showModal.value = false;
}
const cancelNewData = () => {
    showModal.value = false;
    emitEvents("onCancel")
}

</script>