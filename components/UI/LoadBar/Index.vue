<template>
  <div class="fixed top-0 left-0 right-0 h-1 bg-primary-100 z-50">
    <div class="load-bar bg-primary-600"></div>
  </div>
</template>

<script setup></script>

<style>
.load-bar {
  height: 100%;
  width: 600px;
  animation: moveLoadBar infinite 2s ease-in-out;
}

@keyframes moveLoadBar {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100vw);
  }
}
</style>
