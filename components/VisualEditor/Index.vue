<template>
    <div ref="editor">
        <div class="bg-slate-100 p-10 flex-1 rounded-lg relative">

            <Layer v-for="layer in layers" :layer="layer"></Layer>
        </div>

        <LayerEditor :show="layerStore.editing" :layer="layerStore.layer" v-if="layerStore.layer && layerStore.layer.type" @set-class="setClass"></LayerEditor>
    </div>


</template>

<script setup lang="ts">

import { defaultUtility } from "~~/constants/block";
import { TLayer } from "~~/models/layer";
import LayerEditor from "./LayerEditor.vue";
import Layer from "./Layer.vue";
import { useLayerStore } from "~~/stores/layer";

const editor = ref()
const layerStore = useLayerStore()

const { component } = defineProps(['component']);
const layers = ref<TLayer[]>([
    component?.layers ||
    {
        type: defaultUtility,
        name: '1',
        layers: [],
        classes: {}
    }
]);

const setClass = ({ name, value }: { name: string, value: string }) => {
    const layer = { ...layerStore.layer } as TLayer;
    layer.classes[name] = value;
    layerStore.setLayer(layer);
}

const addOutsideClick = () => {


    document.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLInputElement;
        const wrapper = editor.value as HTMLInputElement;
        if (wrapper) {
            if (!wrapper.contains(target)) {
                layerStore.active(false);
            }
        }
    })

}

addOutsideClick();


</script>