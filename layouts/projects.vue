<template>
    <div class="md:p-10 h-screen flex flex-col md:gap-12 md:justify-center md:items-center">
        <header class="px-10">
            <slot name="header" />
        </header>
        <div class="flex md:gap-12 flex-col md:flex-row justify-evenly items-center max-w-7xl ">
            <div class="flex-1 hidden md:flex justify-end">
                <slot name="left" />
            </div>
            <div class="py-4 px-4 pt-12 h-full flex flex-col gap-10 justify-center bg-slate-50 rounded-3xl relative flex-1">
                <slot name="right" />
            </div>
        </div>
    </div>
</template>

<script setup></script>