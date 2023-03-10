<template>
    <div class="flex flex-col gap-3">
        <slot />
        <input v-if="type === 'text' || type === 'number' || type === 'email' || type === 'date'" :required="required"
            :value="value" @input="updateValue($event)" :type="type || 'text'"
            class="py-3 px-5 border rounded-lg shadow-sm hover:shadow-lg bg-white"
            placeholder="ex. Sunny weather or Benjamin" />

        <textarea :value="value" v-if="type === 'text-lg'" @input="updateValue($event)"
            class="py-3 px-5 border rounded-lg shadow-sm hover:shadow-lg"
            placeholder="ex. It was a warm summer day.."></textarea>

        <div class v-if="type === 'color'">
            <div class="w-10 h-10 rounded-lg" :class="'bg-' + color" v-for="color in COLORS">
            </div>
        </div>

        <div class="py-3 px-5 border cursor-pointer rounded-lg bg-white shadow-sm hover:shadow-lg relative focus-within:border-b-transparent focus-within:rounded-b-none"
            v-if="type === 'select'" tabindex="0" @focusin="isToggled = true" @focusout="isToggled = false"
            ref="selectRef">

            <div class="flex justify-between gap-3 capitalize">
                {{ value }}
                <UIIcons :name="isToggled ? 'chevron-up' : 'chevron-down'">
                </UIIcons>
            </div>
            <div v-if="isToggled"
                class="pt-1 absolute top-full m-[-1px] left-0 right-0 bg-white py-3 px-5 border border-t-0 rounded-b-lg shadow-sm hover:shadow-lg z-20">
                <div v-for="option in values" @click="selectOption(option); value = option"
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
const selectRef = ref();
const isToggled = ref(false);


const updateValue = (event: Event) => {
    eventEmit('valueUpdate', (event.target as { value?: string }).value)
}

const selectOption = (option: string) => {
    eventEmit('valueUpdate', option);
    isToggled.value = false;
    if (selectRef.value) {
        selectRef.value.blur();
    }
}


</script>