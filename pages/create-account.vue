<template>
  <NuxtLayout name="auth">
    <template #header> Create account </template>
    <template> Show create account form here </template>
    <template #footer>
      <div class="flex justify-center w-full p-3">
        Already have an account?
        <NuxtLink to="/log-in" class="underline text-sky-950">Log in</NuxtLink>
      </div>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts"></script>
