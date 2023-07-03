<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            Users
        </UIHeadline>
        <ul class="w-full flex gap-5">
            <li v-for="(user, userId) in allUsers">

                <ModulesUserCard :user="user" :userId="userId"></ModulesUserCard>
            </li>
        </ul>
    </NuxtLayout>
</template>

<script setup>
import { useUsersStore } from "~~/stores/users";

const { allUsers } = useUsersStore();
</script>