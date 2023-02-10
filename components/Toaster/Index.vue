<template>
    <div class="fixed  z-[100] left-1/2 -translate-x-1/2 bg-white rounded-xl p-4 px-8 shadow-xl transition-transform"
        :class="{ 'translate-y-0': notification, 'translate-y-full': !notification, 'bottom-4': notification, '-bottom-full': !notification }">
        <Headline size="h3">
            {{ notification?.title }}
        </Headline>
        <p>
            {{ notification?.body }}
        </p>
    </div>
</template>

<script setup lang="ts">

import { useNotificationStore } from "~~/stores/notifications";

const { notification } = useNotificationStore();

</script>