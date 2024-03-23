<template>
  <NuxtLayout name="auth"> Create account </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
</script>
