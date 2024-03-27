<template>
  <div class="w-screen h-screen dark:bg-indigo-900">
    <UILoadBar v-if="loading"></UILoadBar>
    <main class="flex flex-col w-full h-full md:flex-row">
      <div class="px-10 py-2 md:flex-1 md:h-full md:py-10 bg-emerald-950">
        <div class="flex items-center gap-4">
          <UILogo :size="30" />
          <span
            class="hidden text-xl font-extrabold text-white md:block lg:text-2xl font-Rounded"
            >meshflow</span
          >
        </div>
      </div>
      <div
        class="flex items-center justify-center h-full p-10 bg-white md:flex-1"
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
