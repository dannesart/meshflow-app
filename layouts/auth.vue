<template>
  <div class="w-screen h-screen dark:bg-indigo-950">
    <UILoadBar v-if="loading"></UILoadBar>
    <main class="flex flex-col w-full h-full">
      <div class="flex-1 h-full p-10 bg-emerald-950">
        <UILogo :size="30" />
      </div>
      <div class="flex-1 h-full p-10 bg-white">
        <slot />
      </div>
    </main>
    <ModulesToaster></ModulesToaster>
  </div>
</template>

<script setup></script>
