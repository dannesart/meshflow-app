<template>
  <div
    class="flex cursor-pointer"
    :class="{
      'flex-row-reverse': direction === 'right',
      'gap-5': size !== 'small',
      'gap-2': size === 'small',
    }"
  >
    <div
      class="hidden lg:block"
      :class="{
        'text-right': direction !== 'right',
        'text-left': direction === 'right',
      }"
    >
      <p
        class="text-gray-400 dark:text-primary-100 capitalize"
        :class="{ 'text-base': size !== 'small', 'text-sm': size === 'small' }"
        name="user-info-role"
      >
        {{ role || "..." }}
      </p>
      <p
        class="font-medium text-gray-800 dark:text-primary-300"
        :class="{ 'text-lg': size !== 'small', 'text-sm': size === 'small' }"
        name="user-info-name"
      >
        @{{ name }}
      </p>
    </div>
    <UIUserImage :name="name" :image="image" :size="size"></UIUserImage>
  </div>
</template>

<script setup lang="ts">
const { name, role, image, direction, size } = defineProps([
  "name",
  "role",
  "image",
  "direction",
  "size",
]);
const nameToShort = (_name: string) => _name.slice(0, 1);
</script>
