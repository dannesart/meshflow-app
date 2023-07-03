<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            User with id {{ id }}
        </UIHeadline>
        ...
    </NuxtLayout>
</template>

<script setup>
const { id } = useRoute().params;
</script>