<template>
    <div class="p-3 py-1 rounded-full w-fit bg-blue-600 text-white inline-block">
        {{ fullUser.name }}
    </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~~/stores/users';

const { id } = defineProps(['id']);
const usersStore = useUsersStore();
const fullUser = usersStore.userById(id);


</script>