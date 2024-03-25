<template>
  <NuxtLayout name="auth">
    <div :class="'fixed top-5 right-5'">
      <UIButton size="small" type="system">Create account</UIButton>
    </div>
    <template #header> Log in </template>

    <div class="flex flex-col gap-5">
      <UIForm>
        <ModulesInput type="email" disabled> Email </ModulesInput>
        <ModulesInput type="password" disabled> Password </ModulesInput>
        <UIButton class="float-right mt-5" disabled> Sign in </UIButton>
      </UIForm>
      <!-- <div class="h-[1px] bg-slate-400"></div> -->
      <div class="flex justify-center">or</div>
      <div class="flex gap-5">
        <UIButton @click="loginSocial('google')" type="icon" :class="'flex-1'">
          <UIIcons name="google" />Google
        </UIButton>

        <UIButton
          @click="loginSocial('github')"
          type="icon"
          disabled
          :class="'flex-1'"
        >
          <UIIcons name="google" />Github
        </UIButton>
      </div>
    </div>

    <template #footer> {{ status }} </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/", // Where the user should be redirected if not logged in
  },
});

const { auth } = useSupabaseClient();

const loginSocial = async (action: string) => {
  await auth({ provider: action, options: { redirectTo: "/" } });
};
</script>
