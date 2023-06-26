<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            {{ id }}
        </UIHeadline>


        <div class="flex flex-col gap-3 bg-white rounded-xl shadow-lg p-6">
            <label>Set system as</label>
            <ModulesInput type="select" :value="settingsStore.isWeb ? 'Web' : values[0]" :values="values"
                @value-update="updateType"></ModulesInput>

            <label>Mode</label>
            <ModulesInput type="select" :value="settingsStore.isDark ? 'Dark' : modes[0]" :values="modes"
                @value-update="updateMode"></ModulesInput>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useSettingsStore } from "~~/stores/settings";
const values = ['Data & model', 'Web']
const modes = ['Light', 'Dark']
const settingsStore = useSettingsStore();
const { id, category } = useRoute().params;

const updateType = (value: string) => {

    const isWeb = value.toLowerCase() === "web";
    settingsStore.setIsWeb(isWeb)
}

const updateMode = (value: string) => {

    const isDark = value.toLowerCase() === "dark";
    settingsStore.setIsDark(isDark)
}

</script>