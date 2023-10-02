<template>
    <svg viewBox="0 0 36 36" class="w-28 aspect-square">
        <path class="stroke-gray-200" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="3" />
        <path d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" :class="getColor()" stroke-width="3" stroke-linecap="round"
            :stroke-dasharray="dasharray" />
        <text x="18" y="20.35" class="text-[7px] fill-gray-500" text-anchor="middle">{{ percent }}%</text>
    </svg>
</template>

<script setup>

const { min, max, value } = defineProps(['min', 'max', 'value'])
const percent = (value / max) * 100;
const dasharray = computed(() => `${percent || 0}, 100`)

const getColor = () => {
    if (percent >= 80) return 'stroke-red-500';
    if (percent >= 50) return 'stroke-orange-500';
    return 'stroke-green-500';
}

</script>


<style scoped>
path {
    animation: progress 1s ease-out forwards;
}

@keyframes progress {
    0% {
        stroke-dasharray: 0 100;
    }
}
</style>
