<template>
    <NuxtLayout>

        <UIHeadline size="h1">
            {{ id }}
        </UIHeadline>
        <div class="flex gap-6">
            Data with an type and id {{ id }} {{ type }}
        </div>
    </NuxtLayout>
</template>

<script setup>

const { id, type } = useRoute().params;

    // Fetch data based on id.

    // Show data.

</script>