<template>
  <aside
    class="z-40 flex flex-col h-full gap-8 px-6 py-4 transition-transform bg-white dark:bg-indigo-950 lg:px-10 md:inset-auto md:relative"
    v-bind:class="{ 'absolute inset-0 ': menuState }"
  >
    <div
      class="flex items-center flex-none w-3/4 text-3xl font-bold rounded-full text-emerald-400 md:px-4 h-14"
    >
      <NuxtLink to="/" class="flex items-center gap-6">
        <UILogo :size="30" />
        <span
          class="hidden text-xl font-extrabold md:block lg:text-2xl font-Rounded"
          >meshflow</span
        >
      </NuxtLink>
      <button class="px-3 py-3 ml-3 md:hidden" @click="toggleMenu()">
        <UIIcons :name="menuState ? 'close' : 'menu'" :size="8"></UIIcons>
      </button>
    </div>
    <nav
      class="flex flex-col gap-3"
      v-bind:class="{ 'hidden md:flex': !menuState }"
    >
      <div v-for="group in Menu" :key="group.label">
        <label
          v-if="group.label"
          class="block my-3 text-sm text-gray-400 md:px-5"
        >
          {{ group.label }}
        </label>
        <ul class="flex flex-col gap-1">
          <li v-for="item in group.items" :key="item.route">
            <NuxtLink
              :to="item.route"
              v-if="(item.webOnly && settingsStore.isWeb) || !item.webOnly"
              class="flex items-center gap-3 py-3 text-2xl text-gray-800 rounded-lg dark:text-indigo-100 md:text-lg md:hover:bg-emerald-100 md:dark:hover:bg-indigo-400 hover:text-emerald-700 hover:dark:text-indigo-950 md:px-5"
              activeClass="font-bold text-emerald-700 md:bg-emerald-100 "
              router-link-active="font-bold text-emerald-700 bg-emerald-100"
            >
              <UIIcons
                :name="item.icon"
                v-if="item.icon && showIcons"
              ></UIIcons>
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { Menu } from "~~/constants";
import { useSettingsStore } from "~~/stores/settings";
const settingsStore = useSettingsStore();
const showIcons = true;

const Notifications = {
  Tasks: 3,
};

const menuState = ref(false);
const toggleMenu = () => {
  menuState.value = !menuState.value;
};
</script>

<script lang="ts">
export default defineComponent({
  name: "Aside",
});
</script>
