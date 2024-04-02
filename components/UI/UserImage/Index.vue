<template>
  <div
    :class="{
      'w-14 h-14': size !== 'small' && size !== 'large',
      'w-20 h-20': size === 'large',
      'w-9 h-9': size === 'small',
    }"
    class="flex items-center justify-center text-xl text-white uppercase rounded-full bg-sky-600 hover:shadow-xl"
    name="user-info-avatar"
    v-if="name && !image"
  >
    {{ nameToShort(name) }}
  </div>
  <img
    :src="image"
    class="flex items-center justify-center rounded-full hover:shadow-xl"
    :class="{
      'w-14 h-14': size !== 'small' && size !== 'large',
      'w-20 h-20': size === 'large',
      'w-9 h-9': size === 'small',
    }"
    name="user-info-avatar"
    v-else
  />
</template>

<script setup lang="ts">
const { name, image, size } = defineProps(["name", "image", "size"]);
const nameToShort = (_name: string) => _name.slice(0, 1);
</script>
