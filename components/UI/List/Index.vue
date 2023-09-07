<template>
    <ul class="flex flex-col gap-3">
        <slot />
    </ul>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default defineComponent({
    name: 'List'
})
</script>