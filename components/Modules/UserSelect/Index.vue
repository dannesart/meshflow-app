<template>
  <div
    tabindex="0"
    @focusin="isToggled = true"
    @focusout="handleFocusOut"
    ref="userSelectRef"
    class="py-3 px-5 border cursor-pointer rounded-lg bg-white dark:bg-primary-800 shadow-sm hover:shadow-lg relative focus-within:border-b-transparent focus-within:rounded-b-none"
  >
    <div class="flex justify-between gap-3 capitalize h-6 items-center">
      <div v-if="selectedUser" class="flex justify-between items-center gap-1">
        <UIUserTag :id="selectedUser"></UIUserTag>
        <UIButton
          type="icon"
          size="round-small"
          :class="'bg-transparent'"
          @click="clearUserOption"
        >
          <UIIcons name="close"></UIIcons>
        </UIButton>
      </div>
      <div
        v-else
        class="bg-transparent cursor-pointer outline-none absolute inset-0 py-3 px-5"
      >
        Select user
      </div>
      <div class="z-10 absolute right-5" tabindex="0">
        <UIIcons :name="isToggled ? 'chevron-up' : 'chevron-down'"> </UIIcons>
      </div>
    </div>

    <div
      v-if="isToggled"
      class="pt-1 absolute top-full m-[-1px] left-0 right-0 bg-white dark:bg-primary-800 py-3 px-5 border border-t-0 rounded-b-lg shadow-sm hover:shadow-lg z-20"
    >
      <div v-if="!usersStore.allUsers.length" class="py-1 capitalize">
        No users available
      </div>
      <div
        v-for="option in usersStore.allUsers"
        @click="(e) => selectUserOption(e, option)"
        class="cursor-pointer py-1 hover:font-bold capitalize"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "~~/stores/users";
const { value } = defineProps(["value"]);
const eventEmit = defineEmits(["valueUpdate"]);

const usersStore = useUsersStore();

const isToggled = ref(false);
const selectedUser = ref(value);
const userSelectRef = ref();

const handleFocusOut = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  isToggled.value = false;
};

const clearUserOption = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  selectedUser.value = "";
  eventEmit("valueUpdate", "");
  isToggled.value = false;
  if (userSelectRef.value) {
    userSelectRef.value.blur();
  }
};

const selectUserOption = (e: Event, option: any) => {
  e.preventDefault();
  e.stopPropagation();
  selectedUser.value = option.user_id;
  eventEmit("valueUpdate", option.user_id);
  isToggled.value = false;

  if (userSelectRef.value) {
    userSelectRef.value.blur();
  }
};
</script>
