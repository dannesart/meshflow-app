<template>
    <NuxtLayout>
        <UIHeadline size="h1">

            Edit {{ type }}
        </UIHeadline>
        <p :class="{ 'text-gray-400': !model.description }">{{ model.description || 'Description' }}</p>

        <div class="flex justify-between">
            <UITabs :tabs="tabs" @on-change="setActiveTab" :active="active" :class="'w-80'"></UITabs>
            <div>
                <ModulesAdd @on-add="onAddNewField" type="field" :size="6" icon="add" v-if="active === 'model'"
                    button-style="icon">
                </ModulesAdd>
            </div>
        </div>
        <div v-if="active === 'model'">
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
                                <ModulesEdit type="block" icon="dots" :size="4" button-style="icon">
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
import { TTab } from '~~/components/UI/Tabs/tabs.model';
import { Model } from '~~/models/model';

const dragging = ref(false)
const isLoading = ref(false);
const { type } = useRoute().params;

const model = ref<any>({
    name: type as string,
    id: (Math.floor(Math.random() * 100000000) + 1) + "",
    description: '',
    fields: [],
    created: new Date(),
    createdBy: 'Me',
    updated: new Date(),
    updatedBy: 'Me'
})
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

const save = () => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 3000)
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