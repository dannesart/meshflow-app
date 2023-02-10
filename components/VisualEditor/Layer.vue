<template>
    <div name="layer" :class="{ [cssClasses(layer.type.defaultClasses, layer.classes)] : true }" class="relative border border-white hover:border-cyan-600 focus:border-red-300" tabindex="0" @click="setFocus($event)">
        {{ layer.layers.length ? '' : `Layer ` + layer.name }}
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
        layerStore.setLayer(layer)
    }

    


</script>