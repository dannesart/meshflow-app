<template>

    <button class=" flex items-center gap-3 hover:shadow-lg disabled:opacity-70 text-center justify-center"
        :class="getClasses(type, size || 'normal')" :name="name" :disabled="disabled">
        <UILoader v-if="isLoading"></UILoader>
        <slot v-else />

    </button>

</template>


<script setup lang="ts">

const { type, name, size, isLoading, disabled }: { type?: string, name?: string, size?: string, isLoading?: boolean, disabled?: boolean } = defineProps(["type", "name", "size", "isLoading", "disabled"]);

type TClassType = {
    [key: string]: { normal: string, round?: string, inverted?: string }
}

const classes: TClassType = {
    nevermind: {
        normal: "border border-red-500 text-red-500 px-6 py-3 rounded-lg"
    },
    delete: {
        normal: 'bg-transparent text-red-500 px-6 py-3 rounded-lg'
    },
    add: {
        normal: "bg-blue-600 text-white px-6 py-3 rounded-lg"
    },
    love: {
        normal: "text-green-500 bg-green-200 px-6 py-3 rounded-lg",
        round: "bg-green-200 text-green-500 p-3 rounded-full"
    },
    dead: {
        normal: "text-gray-500 bg-gray-200 px-6 py-3 rounded-lg",
        round: "text-gray-500 bg-gray-200 p-3 rounded-full"
    },
    back: {
        normal: "text-red-400 font-bold px-6 py-3 rounded-lg hover:shadow-none hover:text-red-300"
    },
    expand: {
        normal: "bg-fuchsia-500 text-white px-6 py-3 rounded-lg",
        inverted: "text-fuchsia-600 bg-white px-6 py-3 rounded-lg shadow-lg",
    },
    system: {
        normal: "bg-white shadow-md text-slate-700 px-6 py-3 rounded-lg",
        round: "bg-slate-200 text-slate-700 px-3 py-6 rounded-full",
    },
    link: {
        normal: 'text-blue-700 hover:shadow-none hover:text-blue-500'
    },
    icon: {
        normal: "bg-slate-200 text-slate-700 p-3 rounded-lg",
        round: "bg-slate-200 text-slate-700 p-3 rounded-full"
    }
}

const getClasses = (type: string, size: string) => {
    if (!type) return ''
    return (classes as TClassType as any)[type][size];
}


</script>