<template>
    <li class="p-4 px-6 flex gap-3 rounded-xl shadow-md cursor-pointer hover:shadow-lg bg-white">
        <slot />
    </li>
</template>

<script setup lang="ts">
</script>

<script lang="ts">
export default defineComponent({
    name: 'ListItem'
})
</script>