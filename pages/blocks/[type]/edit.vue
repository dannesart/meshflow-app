<template>
    <NuxtLayout>
        <div class="flex flex-col gap-2">
            <UIHeadline size="h1" :editable="true" :value="model?.name" class="!w-auto"
                @value-change="$event => model.name = $event">
                Edit {{ model?.name }}
            </UIHeadline>
            <UIHeadline size="h4" class="!w-auto" :editable="true" :value="model?.description"
                @value-change="$event => model.description = $event">
                {{ model?.description || 'Description' }}
            </UIHeadline>
        </div>

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
                                <UIIcons :name="field.type.icon" :class="'text-black'" :size="6"></UIIcons>
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
        <footer class="flex gap-3">
            <UIButton :is-loading="isLoading" type="add" @click="save()">Save</UIButton>
            <UIButton :is-loading="isLoading" type="nevermind" @click="handleDeleteBlock()">Delete</UIButton>
        </footer>

        <ModulesConfirm :show="showConfirm" @on-confirm="handleConfirmDelete" @on-deny="handleConfirmDeny">
            <p>
                Do you really want to delete this block? It will not be able to be restored.
            </p>
        </ModulesConfirm>
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
const showConfirm = ref(false);
const editingText = ref<string>();
const nameRef = ref();
const descriptionRef = ref();

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

const handleDeleteBlock = async () => {
    showConfirm.value = true;
}
const handleConfirmDeny = async () => {
    showConfirm.value = false;
}

const handleConfirmDelete = async () => {
    showConfirm.value = false;
    if (model.value.id) {
        // const deleted = await deletePage(page.value.id as string);
        // if (deleted) {
        //     setNotification('Page deleted!', 'The page was successfully deleted', 'success');
        //     router.push('/pages')
        // } else {
        // Handle error
        setNotification('Block not deleted', 'This is not implemented yet', 'fail');
        //}
    }
    else {
        setNotification('Block be deleted', 'Missing ID', 'fail');
    }
}

const editText = (field: string) => {
    editingText.value = field;
    setTimeout(() => {
        if (field === "name") {
            nameRef.value.focus();
        }
        else {
            descriptionRef.value.focus();
        }
    })
}
const stopEditing = () => {
    editingText.value = '';
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