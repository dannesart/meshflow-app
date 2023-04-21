<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            User
        </UIHeadline>
        <UIHeadline size="h2">
            Basic
        </UIHeadline>
        <UIList>
            <UIListItem>
                <strong>Name</strong> {{ data?.user?.name }}
            </UIListItem>
            <UIListItem>
                <strong>Email</strong> {{ data?.user?.email }}
            </UIListItem>
        </UIList>

    </NuxtLayout>
</template>

<script setup lang="ts">

const { data, signOut } = useSession()

</script>