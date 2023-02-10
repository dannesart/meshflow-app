<template>
    <div class="flex gap-3">
        <slot />
        <Tag :color="color || 'red'" class="cursor-pointer" v-if="canAdd" @click="events('add')">
            <Icons name="add"></Icons>
        </Tag>
    </div>
</template>

<script setup lang="ts">
const { canAdd, color } = defineProps(['canAdd', 'color'])
const events = defineEmits(['add']);
</script>