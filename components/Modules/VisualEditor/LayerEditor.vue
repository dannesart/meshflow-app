<template>

    <div class="fixed top-0 bottom-0 right-0 max-w-lg w-full p-10 bg-white shadow-xl flex flex-col gap-6 z-50 transition-transform"
        :class="{ 'translate-x-0': show, 'translate-x-full': !show }" tabindex="0">

        <UIHeadline size="h1">
            Layer {{ layer.name }}
        </UIHeadline>
        <UIHeadline size="h3">
            {{ layer.type.name }}
        </UIHeadline>
        <div class="flex flex-col gap-3 " v-if="layer.classes && availableClasses">
            <div class="flex flex-col gap-2" v-for="cssClass in availableClasses">
                <UIInput :type="cssClass.type" :values="cssClass.values"
                    :value="layer.classes[cssClass.name] || cssClass.values[0]">
                    {{ cssClass.name }}
                </UIInput>
            </div>
            <AddLayer :layers="layer.layers" :parentName="layer.name">
            </AddLayer>
            <UIButton type="delete" @click="deleteLayer">Remove layer</UIButton>
        </div>
    </div>

</template>

<script setup lang="ts">
import { classes } from "~~/constants/properties";
import AddLayer from "./AddLayer.vue";

const { show, layer } = defineProps(['show', 'layer']);
const events = defineEmits(['layerDelete', 'setClass'])

const availableClasses = classes;

const setValue = (event: Event, className: string) => {
    const { value } = event.target as HTMLInputElement;
    events('setClass', {
        name: className,
        value
    })
}

const deleteLayer = () => {
    events("layerDelete")
}

</script>