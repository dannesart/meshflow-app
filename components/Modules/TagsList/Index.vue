<template>
    <div class="flex gap-3">
        <slot />
        <UITag :color="color || 'red'" class="cursor-pointer" name="add-tag" v-if="canAdd" @click="events('add')">
            <UIIcons name="add"></UIIcons>
        </UITag>
    </div>
</template>

<script setup lang="ts">
const { canAdd, color } = defineProps(['canAdd', 'color'])
const events = defineEmits(['add']);
</script>