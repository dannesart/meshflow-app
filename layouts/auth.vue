<template>
  <div class="w-screen h-screen dark:bg-indigo-900">
    <UILoadBar v-if="loading"></UILoadBar>
    <main class="flex w-full h-full">
      <div class="flex-1 h-full p-10 bg-emerald-950">
        <div class="flex gap-4 items-center">
          <UILogo :size="30" />
          <span
            class="hidden text-xl font-extrabold md:block lg:text-2xl font-Rounded text-white"
            >meshflow</span
          >
        </div>
      </div>
      <div class="flex-1 h-full p-10 bg-white">
        <slot />
      </div>
    </main>
    <ModulesToaster></ModulesToaster>
  </div>
</template>

<script setup></script>
