<template>
    <div class="layout">
        <ModulesAside></ModulesAside>
        <ModulesHeader></ModulesHeader>
        <main class="py-4 px-10 pt-12 mb-6 mr-6 flex flex-col gap-10  bg-slate-50 rounded-3xl relative ">
            <slot />
        </main>
        <ModulesToaster></ModulesToaster>
    </div>
</template>

<script setup>

</script>