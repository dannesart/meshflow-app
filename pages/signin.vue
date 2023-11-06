<template>
  <div class="flex items-center justify-center w-screen h-screen bg-slate-50">
    <div
      class="relative flex flex-col gap-6 p-10 py-8 mb-0 bg-white shadow-lg rounded-xl"
    >
      <div class="flex items-center gap-6 text-3xl font-bold text-emerald-400">
        <UILogo :size="40" />
        <span
          class="hidden text-xl font-extrabold md:block lg:text-2xl font-Rounded"
          >meshflow</span
        >
      </div>
      <div class="flex items-center justify-center">
        <UILoader />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
// if (process.client) {
//   const { signIn } = useAuth();
//   signIn("auth0");
// }
</script>
