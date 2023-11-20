<template>
  <NuxtLayout>
    <UIHeadline size="h1"> User </UIHeadline>
    <UIHeadline size="h2"> Basic </UIHeadline>
    <UIList>
      <UIListItem> <strong>Name</strong> {{ user?.name }} </UIListItem>
      <UIListItem>
        <strong>Email</strong> {{ user?.email }}
        <UIIcons
          v-if="user?.email_verified"
          name="check-badge"
          :class="'text-emerald-500'"
        >
        </UIIcons>
      </UIListItem>
    </UIList>
    <UIHeadline size="h2"> Info </UIHeadline>
    <UIList>
      <UIListItem>
        <strong>Last login</strong> {{ user?.last_login }}
      </UIListItem>
      <UIListItem> <strong>ID</strong> {{ user?.user_id }} </UIListItem>
    </UIList>
    <UIHeadline size="h2"> Personal settings </UIHeadline>
    <section
      class="flex flex-col gap-6 p-6 bg-white shadow-lg dark:bg-indigo-950 dark:text-pink-300 rounded-xl"
    >
      <UIHeadline size="label"> Dark mode </UIHeadline>
      <ModulesInput
        type="switch"
        :value="$colorMode.preference === 'dark'"
        @click="
          () => toggleTheme($colorMode.preference === 'dark' ? 'light' : 'dark')
        "
      >
      </ModulesInput>
      <ModulesInput
        :values="['sv', 'en']"
        :value="userSettings.language"
        type="select"
      >
        Language
      </ModulesInput>
    </section>
    <UIHeadline size="h2"> Other </UIHeadline>
    <section
      class="flex flex-col gap-6 p-6 bg-white shadow-lg dark:bg-indigo-950 dark:text-pink-300 rounded-xl"
    >
      <UIHeadline size="label"> I quit </UIHeadline>
      <p class="text-sm text-gray-400">
        Please remove me as a user from meshflow for ever. <br />
        This means, that you will be removed from every project you are part of.
        <br />
        And removed as a user in meshflow. You'll however be able to join again
        in the future if you should change your mind.
      </p>
      <div>
        <UIButton type="nevermind">Goodbye</UIButton>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";
import { useUsersStore } from "~~/stores/users";

type Themes = "dark" | "light";
const { data, signOut } = useAuth();
const authStore = useAuthStore();
const usersStore = useUsersStore();
const user = usersStore.userById(authStore.currentUser.sub || "") || {};
const userSettings = ref({
  darkmode: false,
  language: "en",
});

const toggleTheme = (theme: Themes) => {
  useColorMode().preference = theme;
};
</script>
