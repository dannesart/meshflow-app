<template>
    <div ref="editor">
        <Tools :layer="layerStore.layer" @onChange="setClass">

            <div class="ml-auto flex gap-3">
                <p class="flex items-center p-3 text-sm text-slate-300">
                    Selected layer: {{ layerStore.layer?.name }}
                </p>
                <UIButton type="icon" size="round-small" @click="addNewLayer()">
                    <UIIcons name="add"></UIIcons>
                </UIButton>
                <UIButton type="icon" size="round-small" @click="toggleLayerNames()">
                    <UIIcons :name="layerStore.showingLayerNames ? 'show' : 'hide'"></UIIcons>
                </UIButton>
            </div>
        </Tools>
        <div class="bg-slate-100 p-10 flex-1 rounded-lg relative">

            <Layer v-for="layer in layers" :layer="layer"></Layer>
        </div>

    </div>
</template>


<script setup lang="ts">

import { defaultUtility } from "~~/constants/services/blocks";
import { TLayer } from "~~/models/layer";
import Tools from "./Tools.vue";
import Layer from "./Layer.vue";
import { useLayerStore } from "~~/stores/layer";
import { COLORS } from "~~/constants/colors";

const editor = ref()
const layerStore = useLayerStore()

const { component } = defineProps(['component']);
const layers = ref<TLayer[]>([
    component?.layers ||
    {
        type: defaultUtility,
        name: '1',
        layers: [],
        classes: {
            "Background": `bg-${COLORS[0]}`,
            "Text": `text-${COLORS[4]}`,
            "Padding": "p-5",
            "Round": "rounded-xl",
            "Display": "block"
        }
    }
]);

const setClass = ({ name, value }: { name: string, value: string }) => {
    const layer = { ...layerStore.layer } as TLayer;
    layer.classes[name] = value;
    layerStore.setLayer(layer);
}

const toggleLayerNames = () => {
    layerStore.toggleShowLayerNames();
    layerStore.toggleShowLayerBorders();
}

const addNewLayer = () => {
    layerStore.addNewLayer();
}

const initLayer = () => {

    layerStore.setLayer(layers.value[0]);


}
initLayer();


</script>