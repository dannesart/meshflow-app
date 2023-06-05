
<template>
    <UIButton :type="asLink ? 'link' : buttonStyle || 'add'" name="edit-button" :class="['bg-transparent']"
        :size="buttonStyle === 'icon' ? 'round' : 'normal'" @click="editData()">

        <UIIcons v-if="icon && buttonStyle === 'icon'" :size="size || 6" :name="icon"></UIIcons>
        <span v-else>
            {{ label || 'Add' }}
        </span>
    </UIButton>

    <UIModal :show-modal="showModal" @on-close="cancelEditData()">
        <UIHeadline size="h1" v-if="type" :class="'mb-6'">
            Edit {{ type }}
        </UIHeadline>
        <slot></slot>

        <footer class="absolute bottom-0 left-0 right-0 p-10 border-t flex gap-4">
            <UIButton type="add" @click="complete()" :disabled="!isValid">
                Save {{ type }}
            </UIButton>
            <UIButton type="nevermind" name="nevermind-button" @click="cancelEditData()">
                Nevermind
            </UIButton>
        </footer>
    </UIModal>
</template>

<script setup lang="ts">



const { type, asLink, label, buttonStyle, icon, size } = defineProps(['type', 'asLink', 'label', 'buttonStyle', 'icon', 'size']);
const emitEvents = defineEmits(['onEdit', 'onCancel']);
let showModal = ref(false);
let isValid = ref(false);

const setValid = (validData: any) => {
    isValid.value = true;
}

const setInvalid = (object: any) => {
    isValid.value = false;
}

const editData = () => {
    // Do stuff.
    showModal.value = true;

}
const complete = () => {
    if (!isValid) false;
    emitEvents("onEdit")
    showModal.value = false;
}
const cancelEditData = () => {
    showModal.value = false;
    emitEvents("onCancel")
}

</script>