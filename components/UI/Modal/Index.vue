<template>
    <div name="backdrop-modal" v-if="showModal" @click="events('onClose')"
        class="fixed w-full h-full bg-blue-600/50 top-0 left-0 z-40"></div>
    <div name="add-modal"
        class="fixed w-4/5 h-full bg-white shadow-lg z-50 right-0 top-1/2 -translate-y-1/2 rounded-l-xl p-10 transition-transform gap-6"
        v-bind:class="{ 'translate-x-full': !showModal }">
        <slot />
    </div>

</template>

<script setup lang="ts">

const { showModal } = defineProps(['showModal']);
const events = defineEmits(['onClose']);

</script>