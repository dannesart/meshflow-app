<template>
    <article
        class="w-full p-5 flex flex-none md:flex-1 snap-center gap-5 flex-col md:flex-row rounded-lg shadow-lg bg-white relative overflow-hidden">
        <div class="flex flex-col gap-3 flex-1 ">

            <UIHeadline size="h4">
                {{ label }}
            </UIHeadline>
            <p class="text-4xl font-semibold text-sky-800">
                {{ number }}
            </p>
            <div class="absolute top-0 left-0 right-0 bottom-0 bg-white/70 flex items-center justify-center"
                v-if="isLoading">
                <UILoader></UILoader>
            </div>
        </div>

        <div class="" v-if="errors">
            <p class="text-red-600 cursor-pointer">{{ errors }} errors</p>
        </div>

    </article>
</template>

<script setup>
const { label, number, errors } = defineProps(["label", "number", "errors"]);
const isLoading = ref(false);

</script>