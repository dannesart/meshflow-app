<template>
    <NuxtLayout>
        <UIHeadline size="h1">
            Users
        </UIHeadline>
        <ul class="w-full flex gap-5">
            <li v-for="(user, userId) in allUsers" class="border-b last:border-b-0 bg-white shadow-lg rounded-lg p-5 w-52 ">

                <ModulesExtendedLink :label="user.name" :style="'small'" :sub-label="useTimeAgo(user.last_login)"
                    :route="('/users/' + userId)" :image="user.picture">
                </ModulesExtendedLink>
            </li>
        </ul>
    </NuxtLayout>
</template>

<script setup>
import { useUsersStore } from "~~/stores/users";

const { allUsers } = useUsersStore();
</script>