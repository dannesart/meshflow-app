<template>
    <div name="layer" :class="{
        [cssClasses(layer.type.defaultClasses, layer.classes)]: true,
        'hover:border-sky-600': layerStore.currentLayer?.name !== layer.name,
        'border-emerald-300': layerStore.currentLayer?.name === layer.name,
        'border-none': !layerStore.showingLayerBorders,
        'border-white': layerStore.currentLayer?.name !== layer.name
    }" class="relative border-2  cursor-pointer" tabindex="0" @click="setFocus($event)">
        <div v-if="layerStore.showingLayerNames" class="text-xs p-1 px-2 rounded-md text-slate-400 inline-flex">
            {{ `Layer ` + layer.name }}
        </div>

        <Layer v-for="sublayer in layer.layers" :layer="sublayer" :class="'z-index-40'"></Layer>

    </div>
</template>

<script setup lang="ts">

import { useLayerStore } from "~~/stores/layer";

const { layer } = defineProps(['layer']);
const layerStore = useLayerStore()

const cssClasses = (defaults: string, selectedClasses: { [name: string]: string }) => {
    let cssClasses: string[] = [];
    Object.keys(selectedClasses).forEach((value) => {
        cssClasses.push(selectedClasses[value]);
    })
    return [...defaults.split(" "), ...cssClasses].join(" ");
}

const setFocus = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    layerStore.active(true);
    layerStore.setLayer(layer);

}




</script>