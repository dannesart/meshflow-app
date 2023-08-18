<template>
    <NuxtLayout>
        <div class="flex gap-6 justify-between">
            <UIHeadline size="h1">

                Edit {{ model?.name }}
            </UIHeadline>
            <ModulesEdit icon="dots" buttonStyle="icon" :name="model?.name" :type="'block'" :value="model" size="6"
                @on-save="">
                <!-- <UIForm class="flex flex-col gap-6">
                    <ModulesInput :value="model?.name" type="text">
                        Name
                    </ModulesInput>
                    <ModulesInput :value="model?.description" type="text">
                        Description
                    </ModulesInput>
                </UIForm> -->
            </ModulesEdit>
        </div>
        <p :class="{ 'text-gray-400': !model?.description }">{{ model?.description ||
            'Description' }}</p>

        <div class="flex justify-between">
            <UITabs :tabs="tabs" @on-change="setActiveTab" :active="active" :class="'w-80'"></UITabs>

            <ModulesAdd @on-add="onAddNewField" type="field" :size="6" icon="add" v-if="active === 'model'"
                button-style="icon">
            </ModulesAdd>
        </div>
        <div v-if="active === 'model' && model">
            <div v-if="model.fields.length" class="flex flex-col gap-6">
                <draggable :list="model.fields" group="fields" item-key="id" ghost-class="ghost"
                    :component-data="{ class: 'flex flex-col gap-4' }">
                    <template #item="{ element: field }">
                        <div class="flex gap-6 rounded-xl bg-white p-6 py-3 shadow-xl hover:shadow-2xl cursor-pointer">
                            <div class="flex items-center justify-center relative">
                                <span class="text-amber-500 absolute top-1 -left-2 -rotate-45" v-if="field.isMain">
                                    <UIIcons name="crown" :size="4"></UIIcons>
                                </span>
                                <UIIcons :name="field.type.name" :size="6"></UIIcons>
                            </div>
                            <div class="flex flex-col gap-1">

                                <UIHeadline size="h4" :class="'flex gap-3 items-center'">
                                    {{ field.name }}

                                </UIHeadline>
                                <p class="text-sm text-gray-500">{{ field.type.name }}</p>
                            </div>
                            <div class="flex items-center justify-center mr-0 ml-auto ">
                                <ModulesEdit type="field" icon="dots" :size="4" button-style="icon">
                                </ModulesEdit>
                            </div>
                        </div>
                    </template>
                </draggable>
            </div>
            <div v-else class="rounded-xl bg-gray-100 p-10 flex gap-6 items-center justify-between">
                No fields yet. Create a field <ModulesAdd @on-add="onAddNewField" type="field" button-style="system"
                    label="Add field">
                </ModulesAdd>
            </div>

        </div>

        <ModulesVisualEditor v-if="active === 'visual'"></ModulesVisualEditor>
        <footer>
            <UIButton :is-loading="isLoading" type="add" @click="save()">Save</UIButton>
        </footer>
    </NuxtLayout>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { TTab } from '~~/components/UI/Tabs/tabs.model';
import { useBlocksStore } from '~~/stores/blocks';
import { useNotificationStore } from '~~/stores/notifications';

const notificationsStore = useNotificationStore();
const { type } = useRoute().params;
const blockStore = useBlocksStore();
const { setNotification } = notificationsStore;
const { getBlockById, updateBlock } = blockStore;
const { isLoading } = storeToRefs(blockStore);
const block = getBlockById(type as string);

const model = ref<any>(block)
const tabs: TTab[] = [
    {
        name: 'model',
        label: 'Model'
    }, {
        name: 'visual',
        label: 'Visual'
    }
]
const active = ref(tabs[0].name);

const onAddNewField = (args: any) => {
    model.value.fields.push(args)
}

const save = async () => {
    isLoading.value = true;
    const saved = await updateBlock(model.value);
    if (saved) {
        setNotification('Model saved!', 'The model was successfully saved', 'success');
    } else {
        // Handle error
        setNotification('Model not saved', 'The model could not be saved', 'fail');
    }
}

const setActiveTab = (tab: TTab) => {
    active.value = tab.name;
}


</script>

<style scoped>
.ghost {
    opacity: 0.5;
}
</style>