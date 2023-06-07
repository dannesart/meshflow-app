<template>
    <div name="backdrop-modal" v-if="showModal" @click="events('onClose')"
        class="fixed w-full h-full bg-blue-600/50 top-0 left-0 z-40"></div>
    <div name="add-modal"
        class="  bg-white shadow-lg z-50 right-0 top-1/2 -translate-y-1/2 rounded-l-xl transition-transform gap-6"
        v-bind:class="{ 'h-0 w-0 overflow-hidden translate-x-full opacity-0 static p-0': !showModal, 'p-10 h-full opacity-100 w-4/5 fixed': showModal }">
        <slot />
    </div>
</template>

<script setup lang="ts">

const { showModal } = defineProps(['showModal']);
const events = defineEmits(['onClose']);

</script>

