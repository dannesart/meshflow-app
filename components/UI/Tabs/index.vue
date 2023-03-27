<template>
    <div class="flex rounded-lg bg-white shadow-lg overflow-hidden">
        <div v-for="tab in tabs" @click="change(tab)" name="tab"
            class="px-6 py-3 cursor-pointer flex-1 text-center border-r last:border-r-0"
            :class="{ 'text-white bg-blue-600': active === tab.name }">
            {{ tab.label }}
        </div>
    </div>
</template>

<script setup lang=ts>
import { TTab } from '~~/components/UI/Tabs/tabs.model';

const { tabs, active } = defineProps(['tabs', 'active']);

const emits = defineEmits(["onChange"]);

const change = (tab: TTab) => {
    emits("onChange", tab)
}

</script>