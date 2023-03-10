<template>
    <NuxtLayout>
        <UIHeadline size="h1">

            Edit {{ type }}
        </UIHeadline>

        <div class="flex gap-4">
            <UIButton :type="active === 'general' ? 'expand' : 'system'" @click="active = 'general'">
                General
            </UIButton>
            <UIButton :type="active === 'visual' ? 'expand' : 'system'" @click="active = 'visual'">
                Visual
            </UIButton>
        </div>

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