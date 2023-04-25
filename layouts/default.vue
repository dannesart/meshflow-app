<template>
    <div class="layout">
        <ModulesAside></ModulesAside>
        <ModulesHeader></ModulesHeader>
        <main
            class="py-4 px-6 lg:px-10 pt-8 lg:pt-12 lg:mb-6 lg:mr-6 flex flex-col gap-10  bg-slate-50 rounded-3xl relative overflow-y-scroll">
            <slot />
        </main>
        <ModulesToaster></ModulesToaster>
    </div>
</template>

<script setup>

</script>