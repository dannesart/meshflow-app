<template>
    <aside
        class="h-full py-4 px-6 lg:px-10 flex flex-col gap-8 transition-transform z-40 bg-white md:inset-auto md:relative"
        v-bind:class="{ 'absolute inset-0 ': menuState }">
        <div class="w-3/4 text-green-400 text-3xl font-bold md:px-4 rounded-full flex items-center flex-none h-14">
            <NuxtLink to="/" class="flex gap-6 items-center">

                <UILogo :size="50"></UILogo>
                <span class="hidden md:block text-xl lg:text-2xl">meshflow</span>
            </NuxtLink>
            <button class="md:hidden px-3 py-3 ml-3" @click="toggleMenu()">
                <UIIcons :name="menuState ? 'close' : 'menu'" :size="8"></UIIcons>
            </button>


        </div>
        <nav class="flex flex-col gap-3" v-bind:class="{ 'hidden md:flex': !menuState }">
            <div v-for="group in Menu">
                <label v-if="group.label" class="text-sm text-gray-400 px-5 my-3 block">
                    {{ group.label }}
                </label>
                <ul class="flex flex-col gap-1">
                    <li v-for="item in group.items">
                        <NuxtLink :to=item.route v-if="(item.webOnly && settingsStore.isWeb) || !item.webOnly"
                            class="text-2xl md:text-lg text-gray-800 rounded-lg hover:bg-green-100 hover:text-green-700 py-3 px-5 flex gap-3 items-center"
                            activeClass="font-bold text-green-700 bg-green-100"
                            router-link-active="font-bold text-green-700 bg-green-100">
                            <UIIcons :name="item.icon" v-if="item.icon && showIcons"></UIIcons>
                            {{ item.label }}

                        </NuxtLink>
                    </li>
                </ul>
            </div>

        </nav>
    </aside>
</template>

<script setup>
import { Menu } from '~~/constants';
import { useSettingsStore } from "~~/stores/settings";
const settingsStore = useSettingsStore()
const showIcons = true;

const Notifications = {
    Tasks: 3
}

const menuState = ref(false);
const toggleMenu = () => {
    menuState.value = !menuState.value;
}

</script>