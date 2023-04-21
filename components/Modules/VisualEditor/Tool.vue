<template>
    <div class="relative">
        <!-- Color -->
        <div v-if="type === 'text-color' || type === 'bg-color'" class="relative inline-flex  rounded-xl"
            @focusin="setFocus()" @blur="setBlured()" tabindex="0" ref="input" name="color-tool">
            <div class="w-10 h-10 border-2 border-white rounded-full cursor-pointer flex items-center justify-center"
                :class="`bg-${valueRef}`">
                <p class="text-sm">
                    {{ type === "text-color" ? 'txt' : 'bg' }}
                </p>
            </div>
            <div class="absolute top-full mt-2 flex flex-col gap-3 p-3 bg-white shadow-xl rounded-lg" v-if="inputFocused">
                <p class="flex-none w-full text-xs text-slate-300">{{ label }}</p>
                <div class="flex gap-3">
                    <div v-for="color in COLORS" class="w-7 h-7 shadow-lg rounded-full cursor-pointer"
                        :class="{ 'border-2 border-blue-500': ((type === 'text-color' ? 'text-' : 'bg-') + color) === valueRef, [`bg-${color}`]: true }"
                        @click="pickColor(color)">
                    </div>
                </div>
            </div>
        </div>


        <!-- Range -->
        <div v-else-if="type === 'range'" name="range-tool" class="relative inline-flex rounded-xl"
            @focusin="setRangeFocus()" tabindex="0" ref="input">
            <div class="w-10 h-10 flex items-center justify-center bg-white rounded-full cursor-pointer">
                <UIIcons name="range"></UIIcons>
            </div>
            <div class="absolute top-full mt-2 flex flex-col gap-3 p-3 bg-white shadow-xl rounded-lg" v-if="inputFocused">
                <p class="flex-none w-full text-xs text-slate-300">{{ label }}</p>
                <input type="range" :max="max" :min="min" tabindex="0" @blur="setBlured()" ref="rangeInput" />
            </div>
        </div>

        <!-- Radio -->
        <div v-else-if="type === 'radio'" name="radio-tool" class="relative inline-flex rounded-xl" @focusin="setFocus()"
            @blur="setBlured()" tabindex="0" ref="input">
            <div class="w-10 h-10 flex items-center justify-center bg-white rounded-full cursor-pointer">
                <UIIcons :name="icon || 'options'"></UIIcons>
            </div>
            <div class="absolute top-full mt-2 flex flex-col gap-3 p-3 bg-white shadow-xl rounded-lg" v-if="inputFocused">

                <p class="flex-none w-full text-xs text-slate-300">{{ label }}</p>
                <div class="flex gap-3 w-40 flex-col flex-wrap">
                    <div v-for="value in values" class="flex gap-3 cursor-pointer items-center text-sm capitalize"
                        @click="pickRadioValue(value, label)">
                        <div class="w-7 h-7 shadow-lg rounded-full flex items-center justify-center">
                            <div class="w-4 h-4 bg-blue-600 rounded-full" v-if="value === valueRef"></div>
                        </div>
                        {{ value }}
                    </div>
                </div>
            </div>
        </div>

        <div v-else name="missing-tool"
            class="relative inline-flex rounded-xl h-10 bg-white items-center justify-center px-3 text-red-400">
            [Missing tool: {{ type }}]
        </div>
    </div>
</template>

<script setup lang="ts">
import { COLORS } from "~~/constants/colors";
const { type, value, values, disabled, max, min, label, icon } = defineProps(['type', 'value', 'values', 'disabled', 'max', 'min', 'label', 'icon']);

const events = defineEmits(["onChange"])
const valueRef = ref(value);
const inputFocused = ref(false);
const input = ref();
const rangeInput = ref();
const setFocus = () => {
    inputFocused.value = true;
}
const setRangeFocus = () => {
    setFocus();
    setTimeout(() => {
        if (rangeInput && rangeInput.value)
            rangeInput.value.focus();
    }, 100)

}
const setBlured = () => {
    inputFocused.value = false;
}
const pickColor = (color: string) => {
    valueRef.value = color;
    input.value.blur();
    events("onChange", `${type === 'text-color' ? 'text-' : 'bg-'}${color}`)
}
const pickValue = (value: string, key: string) => {
    valueRef.value = value;
    input.value.blur()
    events("onChange", value)
}
const pickRadioValue = (value: string, key: string) => {
    valueRef.value = value;
    events("onChange", value)
}
</script>