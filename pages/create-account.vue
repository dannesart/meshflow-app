<template>
  <NuxtLayout name="auth">
    <template #header> Create account </template>
    <div class="flex flex-col gap-5">
      <UIForm @submit.prevent="signUp"
        ><ModulesInput
          type="email"
          class="mt-3"
          :disabled="loading"
          :value="email"
          @input="(e) => (email = e.target.value)"
        >
          Email
        </ModulesInput>
        <ModulesInput
          type="password"
          class="mt-3"
          :disabled="loading"
          :value="password"
          @input="(e) => (password = e.target.value)"
        >
          Password
        </ModulesInput>
        <ModulesInput
          type="password"
          class="mt-3"
          :disabled="loading"
          :value="repassword"
          @input="
            (e) => {
              repassword = e.target.value;
              errorMsg = '';
            }
          "
        >
          Re-enter Password
        </ModulesInput>
        <UIMessage type="error" v-if="errorMsg">{{ errorMsg }}</UIMessage>
        <UIMessage type="success" v-if="successMsg">{{ successMsg }}</UIMessage>
        <UIButton
          class="float-right mt-5 w-full md:w-auto"
          :disabled="loading"
          :isLoading="loading"
          type="add"
        >
          Create account
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
        Already have an account?
        <NuxtLink
          to="/log-in"
          class="underline text-primary-950 dark:text-primary-200"
          >Log in</NuxtLink
        >
      </div>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
const client = useSupabaseClient();
const router = useRouter();
const email = ref();
const password = ref();
const repassword = ref();
const errorMsg = ref();
const successMsg = ref();
const loading = ref(false);

const signUp = async () => {
  if (password.value !== repassword.value)
    return (errorMsg.value = "Password and re-password does not match.");

  loading.value = true;
  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });
    loading.value = false;
    if (error) throw error;
    successMsg.value = "Check your email to confirm your account.";
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>
