<template>
  <div
    class="fixed z-[100] left-5 right-5 md:right-auto md:left-1/2 md:-translate-x-1/2 bg-white rounded-xl p-4 px-8 shadow-xl transition-transform flex gap-3"
    :class="{
      'translate-y-0': notificationStore.notification,
      'translate-y-full': !notificationStore.notification,
      'bottom-4': notificationStore.notification,
      '-bottom-full': !notificationStore.notification,
    }"
  >
    <div
      class="w-10 h-10 rounded-lg flex items-center justify-center"
      :class="{
        'bg-rose-100 text-rose-500':
          notificationStore.notification?.type === 'fail',
        'bg-emerald-100 text-emerald-500':
          notificationStore.notification?.type === 'success',
      }"
    >
      <UIIcons name="tasks"></UIIcons>
    </div>

    <div class="">
      <UIHeadline size="h3">
        {{ notificationStore.notification?.title }}
      </UIHeadline>
      <p>
        {{ notificationStore.notification?.body }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "~~/stores/notifications";

const notificationStore = useNotificationStore();
</script>
