
<template>
    <div>
        <UIButton :type="asLink ? 'link' : buttonStyle || 'add'" name="add-button"
            :size="buttonStyle === 'icon' ? 'round' : 'normal'" @click="addNewData()">

            <UIIcons v-if="icon && buttonStyle === 'icon'" :size="size || 6" :name="icon"></UIIcons>
            <span v-else>
                {{ label || 'Add' }}
            </span>
        </UIButton>

        <UIModal :show-modal="showModal" @on-close="cancelNewData()">


            <UIHeadline size="h1" v-if="type" :class="'mb-6'">
                {{ type === "block" ? '' : 'New' }} {{ type === 'model' ? `${serviceType} type` : type === 'data' ?
                    `${serviceType}` : type }}
            </UIHeadline>

            <ModulesAddTask v-if="type === 'task' && showModal" @on-valid="setValid" @on-error="setInvalid">
            </ModulesAddTask>
            <ModulesAddPage v-if="type === 'page' && showModal" @on-valid="setValid" @on-error="setInvalid">
            </ModulesAddPage>
            <ModulesAddField v-if="type === 'field' && showModal" @on-valid="setValid" @on-error="setInvalid">
            </ModulesAddField>
            <ModulesAddBlock v-if="type === 'block' && showModal" :select="select" @on-valid="setValid"
                @on-error="setInvalid">
            </ModulesAddBlock>
            <ModulesAddData v-if="type === 'data' && showModal" :service-type="serviceType" :fields="fields"
                @on-valid="setValid" @on-error="setInvalid"></ModulesAddData>
            <ModulesAddModel v-if="type === 'model' && showModal" :service-type="serviceType" @on-valid="setValid"
                @on-error="setInvalid"></ModulesAddModel>

            <slot v-if="showModal"></slot>

            <footer class="absolute bottom-0 left-0 right-0 p-10 border-t flex gap-4">
                <ClientOnly>
                    <UIButton type="add" @click="complete()" :disabled="!isValid" v-if="!select">
                        Add {{ serviceType || type }} {{ type === "model" ? 'type' : '' }}
                    </UIButton>
                    <UIButton type="nevermind" name="nevermind-button" @click="cancelNewData()">
                        Nevermind
                    </UIButton>
                </ClientOnly>
            </footer>



        </UIModal>
    </div>
</template>

<script setup lang="ts">
import { useProjectStore } from '~~/stores/projects';


const projectStore = useProjectStore();
const { activeId } = projectStore;
const { type, asLink, label, buttonStyle, icon, size, select, serviceType, fields } = defineProps(['type', 'asLink', 'label', 'buttonStyle', 'icon', 'size', 'select', 'serviceType', 'fields']);
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
    addData.value.projectId = activeId;
    emitEvents("onAdd", addData.value)
    showModal.value = false;
}
const cancelNewData = () => {
    showModal.value = false;
    emitEvents("onCancel")
}

</script>

<script lang="ts">
export default defineComponent({
    name: 'Add'
})
</script>