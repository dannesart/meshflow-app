<template>
  <NuxtLayout name="auth">
    <div :class="'fixed top-12 right-8 md:top-5 md:right-5'">
      <UIButton size="small" type="transparent" @click="goToLogin"
        >Log in</UIButton
      >
    </div>
    <template #header> Create account </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
const router = useRouter();
const goToLogin = () => {
  router.push("/log-in");
};
</script>
