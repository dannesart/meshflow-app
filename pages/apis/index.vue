<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            API's
        </UIHeadline>
        <UITabs :tabs="tabs" :active="activeTab.name" @onChange="setActiveTab" :class="'w-80'"></UITabs>
    </NuxtLayout>
</template>

<script setup lang=ts>
import { TTab } from '~~/components/UI/Tabs/tabs.model';


const tabs: TTab[] = [
    {
        name: 'config',
        label: 'Config'
    },
    {
        name: 'routes',
        label: 'Routes'
    }
];
const activeTab = ref(tabs[0]);
const setActiveTab = (tab: TTab) => {
    activeTab.value = tab;
}

</script>