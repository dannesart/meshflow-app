<template>
  <!-- <svg viewBox="0 0 36 36" class="w-14 aspect-square animated">
       <path class="stroke-secondary-500" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="4" />
        <path d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" :class="'stroke-secondary-300'" stroke-width="4" stroke-linecap="round"
            :stroke-dasharray="'60, 100'" /> 

    </svg>-->
  <svg viewBox="0 0 50 50" class="w-14 aspect-square animated">
    <circle
      cx="25"
      cy="25"
      fill="none"
      r="20"
      stroke-width="7"
      class="stroke-secondary-500"
      stroke-dasharray="90"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts"></script>

<style scoped>
.animated {
  animation: spinn 2s infinite linear;
}

@keyframes spinn {
  to {
    transform: rotate(360deg);
  }
}
</style>
