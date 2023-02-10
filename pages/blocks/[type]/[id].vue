<template>
    <NuxtLayout>
        <Headline size="h1">
            {{ id }}
        </Headline>
        <div class="flex gap-6">
            Block with a type of {{ type }} and id {{ id }}
        </div>
    </NuxtLayout>
</template>

<script setup>

const { id, type } = useRoute().params;

    // Fetch data based on id.

    // Show data.

</script>