<template>
  <NuxtLink
    :to="route"
    class="relative flex flex-row items-center justify-between"
  >
    <div class="flex gap-6" :class="{ 'flex-col': style === 'small' }">
      <div
        v-if="image"
        class="aspect-square overflow-hidden rounded-full"
        :class="{
          'w-12': style !== 'small',
          'w-20 mx-auto': style === 'small',
        }"
      >
        <img :src="image" />
      </div>
      <div class="flex flex-col gap-2">
        <UIHeadline size="h4">
          {{ label }}
        </UIHeadline>

        <small>{{ subLabel }}</small>

        <div class="flex gap-10">
          <slot />
        </div>
      </div>
    </div>
    <div class="" :class="{ 'absolute top-0 right-0': style === 'small' }">
      <button
        class="w-8 h-8 bg-primary-600 flex justify-center items-center rounded-full text-white"
      >
        <UIIcons name="arrow-right"></UIIcons>
      </button>
    </div>
  </NuxtLink>
</template>

<script setup>
const { label, subLabel, route, isLast, tags, image, style } = defineProps([
  "label",
  "subLabel",
  "route",
  "isLast",
  "tags",
  "image",
  "style",
]);
</script>
