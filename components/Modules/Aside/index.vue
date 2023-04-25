<template>
    <aside
        class="h-full py-4 px-6 lg:px-10 flex flex-col gap-10 transition-transform z-40 bg-white md:inset-auto md:relative"
        v-bind:class="{ 'absolute inset-0 ': menuState }">
        <div class="w-3/4 text-green-400 h-full text-3xl font-bold md:px-4 rounded-full flex items-center">
            <button class="md:hidden px-3 py-3 -ml-3" @click="toggleMenu()">
                <UIIcons :name="menuState ? 'close' : 'menu'"></UIIcons>
            </button>
            <span class="text-xl lg:text-2xl">meshflow</span>
        </div>
        <nav class="flex flex-col gap-3" v-bind:class="{ 'hidden md:flex': !menuState }">
            <div v-for="group in Menu">
                <label v-if="group.label" class="text-sm text-gray-400 px-5 my-3 block">
                    {{ group.label }}
                </label>
                <ul>
                    <li v-for="item in group.items">
                        <NuxtLink :to=item.route v-if="(item.webOnly && settingsStore.isWeb) || !item.webOnly"
                            class="text-lg text-gray-800 rounded-lg hover:bg-gray-100 py-3 px-5 flex gap-3 items-center"
                            activeClass="font-bold text-blue-500">
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