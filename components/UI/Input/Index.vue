<template>
    <div class="flex flex-col gap-3">
        <slot />
        <input v-if="type === 'text' || type === 'number' || type === 'email' || type === 'date'" :required="required"
            :value="valueRef" @input="updateValue($event)" :type="type || 'text'"
            class="py-3 px-5 border rounded-lg shadow-sm hover:shadow-lg bg-white"
            placeholder="ex. Sunny weather or Benjamin" />

        <textarea :value="valueRef" v-if="type === 'text-lg'" @input="updateValue($event)"
            class="py-3 px-5 border rounded-lg shadow-sm hover:shadow-lg"
            placeholder="ex. It was a warm summer day.."></textarea>

        <div class v-if="type === 'color'">
            <div class="w-10 h-10 rounded-lg" :class="'bg-' + color" v-for="color in COLORS">
            </div>
        </div>

        <div v-if="type === 'range'">
            <input type="range" :min="0" :max="values.length" step="1" :list="'markers-' + id" class="w-full" />
            <datalist :id="'markers-' + id">
                <option v-for="value of values" :value="value" :label="value"></option>
            </datalist>
        </div>

        <div v-if="type === 'radio'" class="flex gap-2 flex-wrap">
            <div v-for="value of values" class="px-3 py-1 rounded-lg bg-slate-100 justify-center items-center flex">
                {{ value }}
            </div>
        </div>

        <div class="py-3 px-5 border cursor-pointer rounded-lg bg-white shadow-sm hover:shadow-lg relative focus-within:border-b-transparent focus-within:rounded-b-none"
            v-if="type === 'select'" tabindex="0" @focusin="isToggled = true" @focusout="handleFocusOut"
            ref="selectRef">

            <div class="flex justify-between gap-3 capitalize">
                {{ valueRef }}
                <UIIcons :name="isToggled ? 'chevron-up' : 'chevron-down'">
                </UIIcons>
            </div>
            <div v-if="isToggled"
                class="pt-1 absolute top-full m-[-1px] left-0 right-0 bg-white py-3 px-5 border border-t-0 rounded-b-lg shadow-sm hover:shadow-lg z-20">
                <div v-for="option in values" @click="e => selectOption(e, option)"
                    class="cursor-pointer py-1 hover:font-bold capitalize">
                    {{ option }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { COLORS } from '~~/constants/colors';


const { type, value, values, required } = defineProps(['type', 'value', 'values', 'required']);
const eventEmit = defineEmits(['valueUpdate'])
const valueRef = ref(value);
const selectRef = ref();
const isToggled = ref(false);
const id = Math.floor(Math.random() * 10000)

const handleFocusOut = (event: Event) => {
    event.preventDefault()
    event.stopPropagation();
    isToggled.value = false
}

const updateValue = (event: Event) => {
    eventEmit('valueUpdate', (event.target as { value?: string }).value)
}

const selectOption = (e: Event, option: string) => {
    e.preventDefault();
    e.stopPropagation()
    valueRef.value = option
    eventEmit('valueUpdate', option);
    isToggled.value = false;
    if (selectRef.value) {
        selectRef.value.blur();
    }
}


</script>