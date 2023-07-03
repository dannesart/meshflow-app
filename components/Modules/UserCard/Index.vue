<template>
    <NuxtLink :to="'/users/' + userId">
        <article
            class="border-b last:border-b-0 bg-white shadow-lg rounded-lg p-5 py-8 w-52 flex flex-col gap-3 items-center">
            <div class="mx-auto mb-3">
                <UIUserImage :name="user.name" :image="user.picture" :size="'large'"></UIUserImage>
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

const { user, userId } = defineProps(['user', 'userId'])

</script>