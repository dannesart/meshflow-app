<template>
    <div class="p-10 h-screen flex flex-col gap-6">
        <header class="px-10">
            <slot name="header" />
        </header>
        <div class="flex gap-6">
            <div class="flex-1">
                <slot name="left" />
            </div>
            <div
                class="py-4 px-10 pt-12 h-full flex flex-col gap-10 justify-center bg-slate-50 rounded-3xl relative flex-1">
                <slot name="right" />
            </div>
        </div>
    </div>
</template>

<script setup></script>