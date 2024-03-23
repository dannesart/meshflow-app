<template>
  <NuxtLayout name="auth">
    <div class="flex items-center justify-center w-screen h-screen">
      <div class="flex items-center justify-center">
        <UILoader />
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
// definePageMeta({
//   auth: {
//     unauthenticatedOnly: true,
//     navigateAuthenticatedTo: "/",
//   },
// });
// if (process.client) {
//   const { signIn } = useAuth();
//   signIn("auth0");
// }
</script>
