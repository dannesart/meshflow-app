<template>
    <h1 v-if="size === 'h1'" v-bind="$attrs" class="text-5xl font-bold text-sky-900 first-letter:capitalize">
        <slot />
    </h1>

    <h2 v-if="size === 'h2'" v-bind="$attrs" class="text-slate-500 text-2xl first-letter:capitalize">
        <slot />
    </h2>

    <h3 v-if="size === 'h3'" class="text-slate-600 text-xl font-bold mb-4 first-letter:capitalize" v-bind="$attrs">
        <slot />
    </h3>

    <h4 v-if="size === 'h4'" class="text-slate-600 font-semibold first-letter:capitalize" v-bind="$attrs">
        <slot />
    </h4>
</template>

<script setup lang="ts">
const { size } = defineProps(["size"]);
</script>