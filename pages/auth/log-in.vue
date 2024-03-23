<template>
  <NuxtLayout name="auth">
    <div :class="'fixed top-5 right-5'">
      <UIButton size="small" type="system">Create account</UIButton>
    </div>
    <template #header> Log in </template>

    <div class="flex flex-col gap-5">
      <UIForm>
        <ModulesInput type="email"> Email </ModulesInput>
        <ModulesInput type="password"> Password </ModulesInput>
        <UIButton class="float-right mt-5"> Sign in </UIButton>
      </UIForm>
      <!-- <div class="h-[1px] bg-slate-400"></div> -->
      <div class="justify-center flex">or</div>
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

    <template #footer> License </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/", // Where the user should be redirected if not logged in
  },
});

const { signIn } = useAuth();

const loginSocial = async (action: string) => {
  await signIn(action, { redirect: false });
};
</script>
