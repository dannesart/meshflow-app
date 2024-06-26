<template>
  <aside
    class="z-40 flex flex-col h-full gap-8 px-6 py-4 transition-transform bg-white dark:bg-primary-950 lg:px-10 md:inset-auto md:relative"
    v-bind:class="{ 'absolute inset-0 ': menuState }"
  >
    <div
      class="flex items-center flex-none w-3/4 text-3xl font-bold rounded-full md:px-4 h-14"
    >
      <NuxtLink to="/">
        <UILogo :size="30" :full="true" :can-go-dark="true" />
      </NuxtLink>
      <button
        class="px-3 py-3 ml-3 md:hidden text-primary-950 dark:text-secondary-200"
        @click="toggleMenu()"
      >
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
          class="block my-3 text-sm text-secondary-500 md:px-5"
        >
          {{ group.label }}
        </label>
        <ul class="flex flex-col gap-1">
          <li v-if="isEmptyGroup(group)">
            <p
              class="flex items-center gap-3 py-3 text-2xl rounded-lg text-primary-950 dark:text-primary-200 md:text-lg md:dark:hover:bg-primary-800 md:px-5"
            >
              No services activated
            </p>
          </li>
          <template v-for="item in group.items" :key="item.route">
            <li
              v-if="
                !item.isService ||
                (item.isService && settingsStore.isServiceActive(item.label))
              "
            >
              <NuxtLink
                :to="item.route"
                v-wave
                class="flex items-center gap-3 py-3 text-2xl rounded-lg text-primary-950 dark:text-primary-200 md:text-lg md:hover:bg-secondary-100 md:dark:hover:bg-primary-800 hover:text-secondary-700 hover:dark:text-primary-200 md:px-5"
                activeClass="font-bold text-secondary-700 md:bg-secondary-100 dark:text-primary-200 md:dark:bg-primary-800"
                router-link-active="font-bold text-secondary-700 bg-secondary-100 dark:text-primary-200 md:dark:bg-primary-800"
              >
                <UIIcons
                  :name="item.icon"
                  v-if="item.icon && showIcons"
                ></UIIcons>
                {{ item.label }}
              </NuxtLink>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { Menu, type MenuGroup } from "@/constants";
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();
const showIcons = true;

const isEmptyGroup = (group: MenuGroup) => {
  return (
    group.items.some(
      (item) => !item.isService || settingsStore.isServiceActive(item.label)
    ) === false
  );
};

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
