<template>
    <NuxtLayout>
        <UIHeadline size="h1">

            Edit {{ type }}
        </UIHeadline>
        <UIHeadline size="h5">
            Block type
        </UIHeadline>

        <UITabs :tabs="tabs" @on-change="setActiveTab" :active="active" :class="'w-80'"></UITabs>

        <div v-if="active === 'model'">
            <UIForm>
                <UIInput :type="'text'">
                    <label>Name</label>
                </UIInput>
            </UIForm>
        </div>

        <ModulesVisualEditor v-if="active === 'visual'"></ModulesVisualEditor>
        <footer>
            <UIButton :is-loading="isLoading" type="add" @click="save()">Save</UIButton>
        </footer>
    </NuxtLayout>
</template>


<script setup lang="ts">
import { TTab } from '~~/components/UI/Tabs/tabs.model';

const isLoading = ref(false);
const { type } = useRoute().params;
const tabs: TTab[] = [
    {
        name: 'model',
        label: 'Model'
    }, {
        name: 'visual',
        label: 'Visual'
    }
]
const active = ref(tabs[1].name);

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