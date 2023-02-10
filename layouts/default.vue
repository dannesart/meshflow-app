<template>
    <div class="layout">
        <Aside></Aside>
        <Header></Header>
        <main class="py-4 px-10 pt-12 mb-6 mr-6 flex flex-col gap-10  bg-slate-50 rounded-3xl relative ">
            <slot />
        </main>
        <Toaster></Toaster>
    </div>
</template>

<script setup>

</script>