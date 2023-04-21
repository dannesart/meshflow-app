<template>
    <div class="relative z-10 mb-3 flex gap-3" name="tools">

        <Tool :value="layer?.classes[tool.name]" :type="tool.type" :label="tool.name" :values="tool.values"
            :icon="tool.icon" :disabled="disabled" @on-change="handleChange($event, tool.name)" v-for="tool in classes">
        </Tool>
        <slot />

    </div>
</template>

<script setup lang="ts">

import { classes } from "~~/constants/properties";
import Tool from "./Tool.vue";
const { disabled, layer } = defineProps(['disabled', 'layer']);
const events = defineEmits(['onChange'])

const handleChange = (value: any, name: string) => {
    events("onChange", { value, name });
}

</script>