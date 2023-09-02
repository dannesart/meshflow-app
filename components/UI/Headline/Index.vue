<template>
    <component :is="size" v-bind="$attrs" :class="cssClasses[size]" @click="editField()" v-if="!isEditing">
        <slot />
    </component>
    <div v-else class="relative pr-24 w-full" tabindex="0">
        <input type="text" ref="fieldRef" class="w-full" :class="cssClasses[size]" :value="valueRef"
            @input="valueRef = $event.target?.value" />
        <div class="absolute right-0 top-0 bottom-0 items-center justify-center flex gap-2">
            <button tabindex="0" @click="acceptEdit"
                class="aspect-square h-8 rounded-lg bg-green-200 flex justify-center items-center">
                <UIIcons :name="'check'"></UIIcons>
            </button>
            <button @click="denyEdit" class="aspect-square h-8 rounded-lg bg-red-200 flex justify-center items-center">
                <UIIcons :name="'close'"></UIIcons>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const { size, editable, value }: { size?: string; editable?: boolean; value?: string } = defineProps(["size", "editable", "value"]);
const emits = defineEmits(['valueChange']);
const valueRef = ref(value);

const fieldRef = ref();
const isEditing = ref(false);
const editField = () => {
    if (editable) {
        isEditing.value = true;
        setTimeout(() => {
            fieldRef.value.focus();
            console.log("focus")
        })
    }
}
const stopEditField = () => { if (editable) { isEditing.value = false; } }

const acceptEdit = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
    emits('valueChange', valueRef.value);
    stopEditField();
}
const denyEdit = () => {
    stopEditField();

}

const editableCssClasses = 'hover:bg-pink-100 cursor-text';
const cssClasses: { [key: string]: string } = {
    h1: `text-5xl font-bold text-sky-900 first-letter:capitalize ${editable ? editableCssClasses : ''}`,
    h2: `text-slate-500 text-2xl first-letter:capitalize ${editable ? editableCssClasses : ''}`,
    h3: `text-slate-600 text-xl font-bold mb-4 first-letter:capitalize ${editable ? editableCssClasses : ''}`,
    h4: `text-slate-600 text-lg font-semibold first-letter:capitalize ${editable ? editableCssClasses : ''}`,
    h5: `text-slate-600 font-semibold first-letter:capitalize ${editable ? editableCssClasses : ''}`,
}

</script>