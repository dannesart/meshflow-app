<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            {{ user.name }}
        </UIHeadline>
        <p>
            Last logged in <strong>{{ useTimeAgo(user.last_login) }}</strong>
        </p>
    </NuxtLayout>
</template>

<script setup>

import { useUsersStore } from "~~/stores/users";

const { id } = useRoute().params;
const { userById } = useUsersStore();
const user = userById(id);
</script>