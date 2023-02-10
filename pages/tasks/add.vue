<template>
    <NuxtLayout>
        <Headline size="h1">
            Add new task
        </Headline>

        <AddTask></AddTask>
        <footer class="flex gap-4">
            <Button type="add">Complete</Button>
            <Button type="nevermind">Nevermind</Button>
        </footer>
    </NuxtLayout>
</template>
<script setup lang="ts"></script>