<template>
    <NuxtLayout>
        <Headline size="h1">

            Edit {{ type }}
        </Headline>

        <div class="flex gap-4">
            <Button :type="active === 'general' ? 'expand' : 'system'" @click="active = 'general'">
                General
            </Button>
            <Button :type="active === 'visual' ? 'expand' : 'system'" @click="active = 'visual'">
                Visual
            </Button>
        </div>

        <div v-if="active === 'general'">
            Edit info
        </div>

        <VisualEditor v-if="active === 'visual'"></VisualEditor>

    </NuxtLayout>
</template>


<script setup lang="ts">

const { type } = useRoute().params;
const active = ref('general');

</script>