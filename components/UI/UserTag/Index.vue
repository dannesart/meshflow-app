<template>
  <div class="relative">
    <template v-if="size !== 'small' && fullUser">
      <div
        class="absolute bottom-full transition-all p-4 py-2 rounded-lg bg-white shadow-lg min-w-min"
        :class="{
          '-translate-y-2 opacity-100': hovering,
          '-translate-y-10 opacity-0 -z-10': !hovering,
        }"
      >
        <UIUserInfo
          :name="fullUser.nickname"
          :image="fullUser.picture"
          :direction="'right'"
          :size="'small'"
          role="Developer"
        ></UIUserInfo>
      </div>
      <div
        class="p-3 py-1 rounded-full w-fit text-sky-600 bg-sky-100 inline-block hover:cursor-pointer"
        data-test="user-tag"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        {{ fullUser.name }}
      </div>
    </template>
    <div
      v-else-if="size !== 'small' && !fullUser"
      class="p-3 py-1 rounded-full w-fit bg-gray-300 text-black inline-block"
      data-test="user-tag-unknown"
    >
      Unknown
    </div>
    <UIUserImage
      :name="fullUser.name"
      :image="fullUser.image"
      :size="'small'"
      v-else-if="fullUser"
    ></UIUserImage>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "~~/stores/users";

const { id, size } = defineProps(["id", "size"]);
const usersStore = useUsersStore();
const fullUser = usersStore.userById(id);
const hovering = ref(false);
</script>
