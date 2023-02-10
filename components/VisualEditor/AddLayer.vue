<template>
    
    <Button type="icon" @click="addNewLayer" >
        <Icons name="add"></Icons> Add layer
    </Button>

</template>

<script setup lang="ts">

import { defaultUtility } from '~~/constants/block';
import { TLayer } from '~~/models/layer';

const { layers, parentName }: { layers?: TLayer[], parentName?: string } = defineProps(['layers', 'parentName']);
const addNewLayer = ($event: MouseEvent) => {
    $event.stopPropagation();
    $event.preventDefault();
    if(layers){
        layers.push({
            name: `${parentName}.${layers.length + 1}`,
            type: defaultUtility,
            layers: [],
            classes: {}
        })
    }else {
        throw new Error("Missing layer property");
    }
}
</script>