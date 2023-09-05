
<template>
    <div>
        <UIButton :type="asLink ? 'link' : buttonStyle || 'add'" name="edit-button" :class="['bg-transparent']"
            :size="buttonStyle === 'icon' ? 'round' : 'normal'" @click="editData()">

            <UIIcons v-if="icon && buttonStyle === 'icon'" :size="size || 6" :name="icon"></UIIcons>
            <span v-else>
                {{ label || 'Edit' }}
            </span>
        </UIButton>

        <UIModal :show-modal="showModal" @on-close="cancelEditData()">
            <UIHeadline size="h1" v-if="type" :class="'mb-6'">
                Edit {{ type }}
            </UIHeadline>
            <ModulesEditBlock v-if="type === 'block' && showModal" :value="value" @on-valid="setValid"
                @on-error="setInvalid">
            </ModulesEditBlock>
            <slot v-if="showModal"></slot>

            <footer class="absolute bottom-0 left-0 right-0 p-10 border-t flex gap-4">
                <UIButton type="add" @click="complete()" :disabled="!isValid">
                    Save {{ type }}
                </UIButton>
                <UIButton type="nevermind" name="nevermind-button" @click="cancelEditData()">
                    Nevermind
                </UIButton>
            </footer>
        </UIModal>
    </div>
</template>

<script setup lang="ts">

const { type, name, asLink, label, buttonStyle, icon, size, value } = defineProps(['type', 'name', 'asLink', 'label', 'buttonStyle', 'icon', 'size', 'value']);
const emitEvents = defineEmits(['onSave', 'onCancel']);
let showModal = ref(false);
let isValid = ref(true);
const toBeChanged = ref(value);
const newValue = ref();

const setValid = (validData: any) => {
    isValid.value = true;
    newValue.value = validData;
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
    emitEvents("onSave", newValue.value)
    showModal.value = false;
}
const cancelEditData = () => {
    showModal.value = false;
    newValue.value = {};
    emitEvents("onCancel")
}

</script>