<template>
    <NuxtLayout>
        <UIHeadline size="h1">

            Edit {{ type }}
        </UIHeadline>

        <UITabs :tabs="tabs" @on-change="setActiveTab" :active="active" :class="'w-80'"></UITabs>

        <div v-if="active === 'general'">
            Edit info
        </div>

        <ModulesVisualEditor v-if="active === 'visual'"></ModulesVisualEditor>

    </NuxtLayout>
</template>


<script setup lang="ts">
import { TTab } from '~~/components/UI/Tabs/tabs.model';


const { type } = useRoute().params;
const active = ref('model');
const tabs: TTab[] = [
    {
        name: 'model',
        label: 'Model'
    }, {
        name: 'visual',
        label: 'Visual'
    }
]
const setActiveTab = (tab: TTab) => {
    active.value = tab.name;
}

</script>