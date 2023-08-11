
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

            <div v-if="wantTo === ''">

                <UIHeadline size="h1" v-if="type" :class="'mb-6'">
                    What do you want to do?
                </UIHeadline>
                <div class="flex gap-6 flex-col md:flex-row">
                    <div class="p-5 md:p-10 rounded-xl gap-6 shadow-xl flex w-full hover:shadow-2xl cursor-pointer"
                        @click="wantTo = 'select'">
                        <div>
                            <UIIcons name="boxes"></UIIcons>
                        </div>
                        <div class="flex flex-col">

                            <UIHeadline :size="'h3'">
                                Select existing {{ type }}
                            </UIHeadline>
                            <p class="text-sm text-gray-400">
                                3 {{ type }}
                            </p>
                        </div>
                    </div>
                    <div class="p-5 md:p-10 rounded-xl gap-6 shadow-xl flex w-full hover:shadow-2xl cursor-pointer"
                        @click="wantTo = 'create'">

                        <div>
                            <UIIcons name="add"></UIIcons>
                        </div>
                        <div class="flex flex-col">

                            <UIHeadline :size="'h3'">
                                Create new {{ type }}
                            </UIHeadline>
                            <p class="text-sm text-gray-400">
                                Define a new {{ type }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="wantTo === 'create'">


                <UIHeadline size="h1" v-if="type" :class="'mb-6'">
                    Add {{ type }}
                </UIHeadline>

                <ModulesAddTask v-if="type === 'task' && showModal" @on-valid="setValid" @on-error="setInvalid">
                </ModulesAddTask>
                <ModulesAddPage v-if="type === 'page' && showModal" @on-valid="setValid" @on-error="setInvalid">
                </ModulesAddPage>
                <ModulesAddField v-if="type === 'field' && showModal" @on-valid="setValid" @on-error="setInvalid">
                </ModulesAddField>
                <ModulesAddBlock v-if="type === 'block' && showModal" @on-valid="setValid" @on-error="setInvalid">
                </ModulesAddBlock>

                <slot v-if="showModal"></slot>

                <footer class="absolute bottom-0 left-0 right-0 p-10 border-t flex gap-4">
                    <UIButton type="add" @click="complete()" :disabled="!isValid">
                        Create {{ type }}
                    </UIButton>
                    <UIButton type="nevermind" name="nevermind-button" @click="cancelNewData()">
                        Nevermind
                    </UIButton>
                </footer>

            </div>
            <div v-else>
                <UIHeadline size="h1" v-if="type" :class="'mb-6'">
                    Select {{ type }}
                </UIHeadline>
                <div v-if="type === 'block'">
                    ....
                </div>
                <div v-else>
                    Select {{ type }} is not implemented yet
                </div>

            </div>


        </UIModal>
    </div>
</template>

<script setup lang="ts">

const { type, asLink, label, buttonStyle, icon, size, select } = defineProps(['type', 'asLink', 'label', 'buttonStyle', 'icon', 'size', 'select']);
const emitEvents = defineEmits(['onAdd', 'onCancel']);
let showModal = ref(false);
let isValid = ref(false);
let addData = ref();
const wantTo = ref(select ? "" : "create");


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
    wantTo.value = "";
}
const cancelNewData = () => {
    showModal.value = false;
    emitEvents("onCancel")
    wantTo.value = "";
}

</script>