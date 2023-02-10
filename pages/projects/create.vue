<template>

    <NuxtLayout :name="layout">
        <template #header>
            <Headline size="h1">
                Create new project
            </Headline>
        </template>
        <template #left>
            <div class="flex gap-4">
                <img src="~~/assets/images/team.svg" class=" bg-white rounded-xl p-6 h-full" />
            </div>
        </template>
        <template #right>
            <div class="w-96 flex flex-col gap-6 px-6 self-center justify-self-center place-self-center">
                <Input>
                Project name
                </Input>

                <Button type="add">
                    Create
                </Button>
                <NuxtLink to="/" class="px-6 py-3 text-center text-red-600">
                    Nevermind
                </NuxtLink>
            </div>
        </template>

    </NuxtLayout>

</template>
<script setup lang="ts">
const layout = "projects";
</script>