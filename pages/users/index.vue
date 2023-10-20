<template>
  <NuxtLayout>
    <UIHeadline size="h1"> Users </UIHeadline>
    <div class="flex gap-6">
      <ModulesFilter
        @filterChange="filterChange"
        @sortChange="sortChange"
      ></ModulesFilter>
      <div class="w-[1px] h-5/6 my-auto bg-slate-300"></div>
      <ModulesAdd
        label="Invite user"
        type="user"
        @onAdd="onAdd"
        @onCancel="onCancel"
      ></ModulesAdd>
    </div>
    <ul class="w-full flex gap-5">
      <li v-for="(user, userId) in allUsers">
        <ModulesUserCard :user="user" :userId="userId"></ModulesUserCard>
      </li>
    </ul>
  </NuxtLayout>
</template>

<script setup>
import { useUsersStore } from "~~/stores/users";

const { allUsers } = useUsersStore();

const filterChange = () => {};
const sortChange = () => {};
const onAdd = () => {};
const onCancel = () => {};
</script>
