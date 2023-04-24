<template>
    <div class="flex flex-row gap-5 cursor-pointer">
        <div class="text-right hidden lg:block">
            <p class="text-base text-gray-400 capitalize" name="user-info-role">{{ role }}</p>
            <p class="font-medium text-lg" name="user-info-name">@{{ name }}</p>
        </div>
        <div class="text-white text-xl w-14 h-14 flex justify-center items-center uppercase rounded-full bg-blue-600 hover:shadow-xl"
            name="user-info-avatar" v-if="name && !image">
            {{ nameToShort(name) }}
        </div>
        <img :src="image" class="w-14 h-14 flex justify-center items-center rounded-full hover:shadow-xl"
            name="user-info-avatar" v-if="image" />
    </div>
</template>

<script setup lang="ts">

const { name, role, image } = defineProps(['name', 'role', 'image'])
const nameToShort = (_name: string) => _name.slice(0, 1)

</script>