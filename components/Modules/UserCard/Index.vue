<template>
  <NuxtLink :to="'/users/' + userId">
    <article
      class="flex flex-col items-center gap-3 p-5 py-8 bg-white border-b rounded-lg shadow-lg last:border-b-0 dark:bg-indigo-950 w-52"
    >
      <div class="mx-auto mb-3">
        <UIUserImage
          :name="user.name"
          :image="user.picture"
          :size="'large'"
        ></UIUserImage>
      </div>
      <UIHeadline :size="'h4'">
        {{ user.name }}
      </UIHeadline>
      <p class="text-sm text-gray-500">
        {{ useTimeAgo(user.last_login) }}
      </p>
    </article>
  </NuxtLink>
</template>

<script setup>
const { user, userId } = defineProps(["user", "userId"]);
</script>
