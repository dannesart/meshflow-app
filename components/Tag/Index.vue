<template>
    <div name="tag" class="px-4 py-2 w-max rounded-full hover:shadow-xl inline-flex capitalize" tabindex="0"
        @click="handleClick" :class="colors[color || 'default']">
        <input v-if="isEditing" :value="newValue" @input="handleChange" @blur="handleBlur" ref="tagEdit"
            class="appearance-none border-0 bg-transparent w-auto outline-none" />
        <div v-else>
            <slot />
        </div>
    </div>

</template>

<script setup lang="ts">
const { color, canEdit, value }: { color?: string, canEdit?: boolean, value?: string } = defineProps(['color', 'canEdit', 'value']);
const event = defineEmits(['save'])
const isEditing = ref(false);
const newValue = ref(value);
const tagEdit = ref();

const colors: { [key: string]: string } = {
    default: 'bg-slate-200 text-slate-600',
}

const handleClick = () => {
    if (!canEdit) return;
    isEditing.value = true;
    setTimeout(() => {
        tagEdit.value.focus();
    }, 10)
}

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const _value = target.value;
    newValue.value = _value;
}

const handleBlur = () => {
    isEditing.value = false;
    event('save', newValue.value)
}


</script>