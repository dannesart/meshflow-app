<template>
    <NuxtLayout>
        <UIHeadline size="h1">

            Edit {{ type }}
        </UIHeadline>

        <div v-if="active === 'general'">
            Edit info
        </div>

        <ModulesVisualEditor v-if="active === 'visual'"></ModulesVisualEditor>

    </NuxtLayout>
</template>


<script setup lang="ts">

const { type } = useRoute().params;
const active = ref('general');

</script>