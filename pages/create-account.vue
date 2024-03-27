<template>
  <NuxtLayout name="auth">
    <template #header> Create account </template>
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
      {{ email }}
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
        @input="(e) => (repassword = e.target.value)"
      >
        Re-enter Password
      </ModulesInput>
      <UIMessage type="error" v-if="errorMsg">{{ errorMsg }}</UIMessage>
      <UIMessage type="success" v-if="successMsg">{{ successMsg }}</UIMessage>
      <UIButton
        class="float-right mt-5"
        :disabled="loading"
        :isLoading="loading"
      >
        Create account
      </UIButton>
    </UIForm>
    <template #footer>
      <div class="flex justify-center w-full p-3">
        Already have an account?
        <NuxtLink to="/log-in" class="underline text-sky-950">Log in</NuxtLink>
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
