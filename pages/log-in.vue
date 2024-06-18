<template>
  <NuxtLayout name="auth">
    <template #header> Log in </template>

    <div class="flex flex-col gap-5">
      <UIForm>
        <ModulesInput type="email" class="mt-3" disabled> Email </ModulesInput>
        <ModulesInput type="password" class="mt-3" disabled>
          Password
        </ModulesInput>
        <UIButton class="float-right mt-5 w-full md:w-auto" disabled type="add">
          Sign in
        </UIButton>
      </UIForm>
      <div class="relative my-1">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t dark:border-t-0"></span>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="px-2 bg-white dark:bg-black/0 dark:text-white">
            Or continue with
          </span>
        </div>
      </div>
      <div class="flex gap-5 flex-col md:flex-row">
        <UIButton @click="loginSocial('google')" type="icon" :class="'flex-1'">
          <UIIcons name="google" />Google
        </UIButton>

        <UIButton @click="loginSocial('github')" type="icon" :class="'flex-1'">
          <UIIcons name="github" />Github
        </UIButton>
      </div>
    </div>

    <template #footer>
      <div
        class="flex flex-col sm:flex-row justify-center w-full gap-1 p-3 dark:text-white"
      >
        Don't have an account?
        <NuxtLink
          to="/create-account"
          class="underline text-primary-950 dark:text-primary-200"
          >Create one here</NuxtLink
        >
      </div>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient();

const loginSocial = async (action: string) => {
  await supabase.auth.signInWithOAuth({
    provider: action,
    options: { redirectTo: "/" },
  });
};
</script>
