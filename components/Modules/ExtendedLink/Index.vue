<template>
    <NuxtLink :to="route" class=" pb-5 flex flex-row items-center justify-between border-b last:border-b-0">
        <div class="flex flex-col gap-2">
            <UIHeadline size="h4">
                {{ label }}
            </UIHeadline>
            <small>{{ subLabel }}</small>

            <slot />

            <ModulesTagsList :can-add="false" v-if="tags">
                <UITag v-for="tag in tags" class="px-2 py-0.5 text-sm">
                    {{ tag }}
                </UITag>
            </ModulesTagsList>
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