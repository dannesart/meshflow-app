<template>
    <svg viewBox="0 0 36 36" class="w-14 aspect-square animated">
        <path class="stroke-blue-200" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="4" />
        <path d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" :class="'stroke-blue-500'" stroke-width="4" stroke-linecap="round"
            :stroke-dasharray="'60, 100'" />
    </svg>
</template>

<script setup lang=ts>


</script>

<style scoped>
.animated {
    animation: spinn 0.6s infinite linear;
}

@keyframes spinn {
    to {
        transform: rotate(360deg);
    }
}
</style>