<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            Add new task
        </UIHeadline>

        <ModulesAddTask>
        </ModulesAddTask>
        <footer class="flex gap-4">
            <UIButton type="add">Complete</UIButton>
            <UIButton type="nevermind">Nevermind</UIButton>
        </footer>
    </NuxtLayout>
</template>
<script setup lang="ts"></script>