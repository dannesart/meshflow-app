<template>
    <div class="flex  cursor-pointer "
        :class="{ 'flex-row-reverse': direction === 'right', 'gap-5': size !== 'small', 'gap-2': size === 'small' }">
        <div class="hidden lg:block" :class="{ 'text-right': direction !== 'right', 'text-left': direction === 'right' }">
            <p class=" text-gray-400 capitalize" :class="{ 'text-base': size !== 'small', 'text-sm': size === 'small' }"
                name="user-info-role">{{ role }}</p>
            <p class="font-medium text-gray-800" :class="{ 'text-lg': size !== 'small', 'text-sm': size === 'small' }"
                name="user-info-name">@{{ name }}</p>
        </div>
        <div :class="{ 'w-14 h-14': size !== 'small', 'w-8 h-8': size === 'small' }"
            class="text-white text-xl flex justify-center items-center uppercase rounded-full bg-blue-600 hover:shadow-xl"
            name="user-info-avatar" v-if="name && !image">
            {{ nameToShort(name) }}
        </div>
        <img :src="image" class="flex justify-center items-center rounded-full hover:shadow-xl"
            :class="{ 'w-14 h-14': size !== 'small', 'w-8 h-8': size === 'small' }" name="user-info-avatar" v-if="image" />
    </div>
</template>

<script setup lang="ts">

const { name, role, image, direction, size } = defineProps(['name', 'role', 'image', 'direction', 'size'])
const nameToShort = (_name: string) => _name.slice(0, 1);


</script>