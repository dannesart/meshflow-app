<template>
  <NuxtLayout name="auth">
    <div :class="'fixed top-5 right-5'">
      <UIButton size="small" type="system">Create account</UIButton>
    </div>
    <template #header> Log in </template>

    <div class="flex flex-col gap-5">
      <UIForm>
        <ModulesInput type="email" class="mt-3" disabled> Email </ModulesInput>
        <ModulesInput type="password" class="mt-3" disabled>
          Password
        </ModulesInput>
        <UIButton class="float-right mt-5" disabled> Sign in </UIButton>
      </UIForm>
      <div class="relative my-1">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t"></span>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="px-2 bg-white"> Or continue with </span>
        </div>
      </div>
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
          <UIIcons name="github" />Github
        </UIButton>
      </div>
    </div>

    <template #footer></template>
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
