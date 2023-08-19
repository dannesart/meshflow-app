<template>
    <div v-if="show">
        <div
            class="fixed w-96 bg-white p-6 rounded-2xl z-50 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-6">
            <UIHeadline size="h1">
                Confirm
            </UIHeadline>

            <slot />

            <div class="flex gap-6">

                <UIButton @click="handleConfirm" type="delete" size="inverted">
                    Confirm
                </UIButton>
                <UIButton @click="handleDeny" type="nevermind">
                    Nevermind
                </UIButton>
            </div>
        </div>
        <div class="fixed w-full h-full bg-red-600/50 top-0 left-0 z-40" @click="handleDeny"></div>
    </div>
</template>
<script setup lang="ts">

const { show } = defineProps(['show']);
const events = defineEmits(['onConfirm', 'onDeny']);

const handleConfirm = () => {
    events("onConfirm");
}
const handleDeny = () => {
    events("onDeny");
}
</script>
