<template>
    <div class="p-3 py-1 rounded-full w-fit bg-blue-600 text-white inline-block" data-test="user-tag" v-if="fullUser">
        {{ fullUser.name }}
    </div>
    <div v-else class="p-3 py-1 rounded-full w-fit bg-gray-300 text-black inline-block" data-test="user-tag-unknown">
        Unknown
    </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~~/stores/users';

const { id } = defineProps(['id']);
const usersStore = useUsersStore();
const fullUser = usersStore.userById(id);


</script>