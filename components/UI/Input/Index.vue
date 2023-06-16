<template>
    <div class="flex flex-col gap-3 relative">
        <slot v-if="type !== 'checkbox'" />
        <input v-if="type === 'text' || type === 'number' || type === 'email' || type === 'date'" :required="required"
            :value="value" @input="updateValue($event)" :type="type || 'text'" :disabled="disabled" :minlength="min"
            :maxlength="max" class="py-3 px-5 border rounded-lg shadow-sm  bg-white disabled:bg-slate-100"
            :class="{ 'hover:shadow-lg': !disabled }" :name="name" placeholder="ex. Sunny weather or Benjamin" />

        <!-- Tag modal -->
        <div class="absolute bottom-full mb-10 p-4" v-if="isTagging">
            <UIInput :name="name" type="text" @value-update="setTaggingValue($event)"></UIInput>
            <UIButton @click="doneTagging()">Done</UIButton>
        </div>
        <textarea :name="name" ref="textAreaRef" :value="value" v-if="type === 'text-lg'" @keyup="checkForTagging($event)"
            @input="updateValue($event);" :maxlength="max" :minlength="min"
            class="py-3 px-5 border rounded-lg shadow-sm hover:shadow-lg"
            placeholder="ex. It was a warm summer day.."></textarea>

        <div class="flex wrap gap-3" v-if="type === 'color'">
            <div @click=" updateColor('white')" :name="name"
                class="w-10 h-10 cursor-pointer rounded-full bg-white shadow-lg hover:shadow-xl"></div>
        </div>

        <div v-if="type === 'range'">
            <input type="range" :name="name" :min="0" :max="values.length" step="1" :list="'markers-' + id" class="w-full"
                @change=" updateSlider($event)" />
            <datalist :id="'markers-' + id">
                <option v-for="   value    of    values   " :value="value" :label="value"></option>
            </datalist>
        </div>

        <div v-if="type === 'checkbox'" class="flex gap-3 items-center cursor-pointer">
            <input type="checkbox" class="w-6 h-6 rounded-lg cursor-pointer" :name="name" :checked="value" :id="id"
                @change="updateCheckbox" />
            <label :for="id" class="cursor-pointer">
                <slot />
            </label>
        </div>

        <div v-if="type === 'radio'" class="flex gap-2 flex-wrap" :name="name">
            <div v-for="   v    of    values   " :class="{ 'bg-blue-400 text-white': v === value }"
                class="px-3 py-1 rounded-lg bg-slate-100 justify-center items-center flex cursor-pointer"
                @click=" updateRadio(v)">
                {{ v }}
            </div>
        </div>

        <div class="py-3 px-5 border cursor-pointer rounded-lg bg-white shadow-sm hover:shadow-lg relative focus-within:border-b-transparent focus-within:rounded-b-none"
            v-if="type === 'select'" :name="name" tabindex="0" @focusin=" isToggled = true" @focusout="handleFocusOut"
            ref="selectRef">

            <div class="flex justify-between gap-3 capitalize">
                {{ valueRef }}
                <UIIcons :name="isToggled ? 'chevron-up' : 'chevron-down'">
                </UIIcons>
            </div>
            <div v-if="isToggled"
                class="pt-1 absolute top-full m-[-1px] left-0 right-0 bg-white py-3 px-5 border border-t-0 rounded-b-lg shadow-sm hover:shadow-lg z-20">
                <div v-for="   option    in    values   " @click="e => selectOption(e, option)"
                    class="cursor-pointer py-1 hover:font-bold capitalize">
                    {{ option }}
                </div>
            </div>
        </div>

        <div class="absolute -bottom-6 text-gray-400 text-sm right-0" v-if="max">
            {{ value?.length || 0 }} / {{ max }}
        </div>
    </div>
</template>

<script setup lang="ts">
const { type, value, values, required, name, disabled, max, min } = defineProps(['type', 'value', 'values', 'required', 'name', 'disabled', 'max', 'min']);
const eventEmit = defineEmits(['valueUpdate'])
const valueRef = ref(value);
const selectRef = ref();
const isToggled = ref(false);
const isTagging = ref(false);
const id = Math.floor(Math.random() * 10000) + "";
const textAreaRef = ref();
const textAreaIdx = ref(-1)


const handleFocusOut = (event: Event) => {
    event.preventDefault()
    event.stopPropagation();
    isToggled.value = false
}

const updateCheckbox = (event: Event) => {
    const newValue = (event.target as { checked?: boolean }).checked
    eventEmit('valueUpdate', newValue)
}

const updateSlider = (event: Event) => {

    const valueIdxString = (event.target as { value?: string }).value;
    const valueIdx = Number(valueIdxString);
    const value = (values as string[])[valueIdx || 0];
    eventEmit('valueUpdate', value)
}

const updateRadio = (value: string) => {
    eventEmit('valueUpdate', value)
}

const updateColor = (value: string) => {
    eventEmit('valueUpdate', value)
}

const updateValue = (event: Event) => {
    const newValue = (event.target as { value?: string }).value;
    console.log(newValue)
    eventEmit('valueUpdate', newValue);
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
type KeyEvent = { key: string } & Event;
const checkForTagging = ($event: KeyEvent) => {
    const isAt = ($event.key === "@")

    if (isAt) {
        const index = textAreaRef.value.selectionStart;
        isTagging.value = true;
        textAreaIdx.value = index;
    }

}
const doneTagging = () => {
    isTagging.value = false;
}
const setTaggingValue = (tagValue: string) => {
    const splitValue = valueRef.value.split(textAreaIdx.value);
    const newSplitValue = [splitValue[0], tagValue, splitValue[1]];
    const newValue = newSplitValue.join("");
    valueRef.value = newValue;
}


</script>