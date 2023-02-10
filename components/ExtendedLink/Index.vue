<template>
    <NuxtLink :to="route" class=" pb-5 flex flex-row items-center justify-between border-b last:border-b-0">
        <div class="flex flex-col gap-2">
            <strong>
                {{ label }}
            </strong>
            <small>{{ subLabel }}</small>
        </div>
        <div class="">
            <button class="w-8 h-8 bg-blue-600 flex justify-center items-center rounded-full text-white">
                <Icons name="arrow-right"></Icons>

            </button>
        </div>
    </NuxtLink>

</template>

<script setup>
const { label, subLabel, route, isLast } = defineProps(['label', 'subLabel', 'route', 'isLast']);

</script>