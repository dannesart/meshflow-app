<template>

    <UIButton type="icon" @click="addNewLayer">
        <UIIcons name="add"></UIIcons> Add layer
    </UIButton>

</template>

<script setup lang="ts">

import { defaultUtility } from '~~/constants/services/blocks';
import { TLayer } from '~~/models/layer';

const { layers, parentName }: { layers?: TLayer[], parentName?: string } = defineProps(['layers', 'parentName']);
const addNewLayer = ($event: MouseEvent) => {
    $event.stopPropagation();
    $event.preventDefault();
    if (layers) {
        layers.push({
            name: `${parentName}.${layers.length + 1}`,
            type: defaultUtility,
            layers: [],
            classes: {}
        })
    } else {
        throw new Error("Missing layer property");
    }
}
</script>