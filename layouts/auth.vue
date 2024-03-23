<template>
  <div class="w-screen h-screen dark:bg-indigo-900">
    <UILoadBar v-if="loading"></UILoadBar>
    <main class="flex flex-col w-full h-full md:flex-row">
      <div class="md:flex-1 md:h-full p-10 bg-emerald-950">
        <div class="flex gap-4 items-center">
          <UILogo :size="30" />
          <span
            class="hidden text-xl font-extrabold md:block lg:text-2xl font-Rounded text-white"
            >meshflow</span
          >
        </div>
      </div>
      <div
        class="md:flex-1 h-full flex justify-center items-center p-10 bg-white"
      >
        <div class="flex flex-col gap-5 flex-1 max-w-[500px]">
          <UIHeadline size="h1">
            <slot name="header" />
          </UIHeadline>
          <div>
            <slot />
          </div>
          <footer>
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </main>
    <ModulesToaster></ModulesToaster>
  </div>
</template>

<script setup></script>
