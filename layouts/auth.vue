<template>
  <div class="w-screen h-screen dark:bg-indigo-900">
    <main class="flex flex-col w-full h-full md:flex-row">
      <div class="p-4 md:flex-1 md:h-full md:p-10 bg-amber-200">
        <div class="flex items-center gap-4">
          <UILogo :size="30" />
          <span
            class="hidden text-xl font-extrabold text-blue-950 md:block lg:text-2xl font-Rounded"
            >meshflow</span
          >
        </div>
      </div>
      <div
        class="flex justify-center h-full px-4 py-10 md:items-center md:px-10 bg-amber-200 md:bg-white md:flex-1"
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
