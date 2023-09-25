<template>
    <div class="rounded-xl w-full bg-gray-100 p-10 flex gap-6 items-center justify-between">
        <slot />
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'Empty'
})
</script>
