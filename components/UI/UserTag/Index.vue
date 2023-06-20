<template>
    <div class="relative">
        <div class=" absolute bottom-full transition-all p-4 py-2 rounded-lg bg-white shadow-lg min-w-min" v-if="fullUser"
            :class="{ '-translate-y-2 opacity-100': hovering, '-translate-y-10 opacity-0 -z-10': !hovering }">

            <UIUserInfo :name="fullUser.nickname" :image="fullUser.picture" :direction="'right'" :size="'small'"
                role="Developer"></UIUserInfo>
        </div>
        <div class="p-3 py-1 rounded-full w-fit text-blue-600 bg-blue-100 inline-block hover:cursor-pointer "
            data-test="user-tag" v-if="fullUser" @mouseenter="hovering = true" @mouseleave="hovering = false">
            {{ fullUser.name }}
        </div>

        <div v-else class="p-3 py-1 rounded-full w-fit bg-gray-300 text-black inline-block" data-test="user-tag-unknown">
            Unknown
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~~/stores/users';

const { id } = defineProps(['id']);
const usersStore = useUsersStore();
const fullUser = usersStore.userById(id);
const hovering = ref(false);


</script>