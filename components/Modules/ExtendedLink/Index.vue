<template>
    <NuxtLink :to="route" class=" flex flex-row items-center justify-between">
        <div class="flex flex-col gap-2">
            <UIHeadline size="h4">
                {{ label }}

            </UIHeadline>


            <small>{{ subLabel }}</small>

            <div class="flex gap-10">

                <slot />
            </div>
        </div>
        <div class="">
            <button class="w-8 h-8 bg-blue-600 flex justify-center items-center rounded-full text-white">
                <UIIcons name="arrow-right"></UIIcons>

            </button>
        </div>
    </NuxtLink>
</template>

<script setup>
const { label, subLabel, route, isLast, tags } = defineProps(['label', 'subLabel', 'route', 'isLast', 'tags']);

</script>