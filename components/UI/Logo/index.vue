<template>
    <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" viewBox="0 0 91 93"
        :width="size || 91" :height="size || 93" :class="{ 'animate-logo': animate }" id="LogoFrame">
        <g id="Logo">
            <path id="line-3"
                d="M15.4388 31.7781C14.8283 33.0178 15.3367 34.5168 16.5743 35.1261C17.812 35.7353 19.3102 35.2242 19.9207 33.9844L15.4388 31.7781ZM19.9207 33.9844C23.4923 26.7313 29.9268 20.9283 38.2492 18.3987L36.8036 13.6122C27.1005 16.5615 19.5962 23.3352 15.4388 31.7781L19.9207 33.9844ZM38.2492 18.3987C47.363 15.6285 56.7683 17.3844 64.0687 22.3891L66.8967 18.2604C58.4017 12.4368 47.4321 10.3816 36.8036 13.6122L38.2492 18.3987Z" />
            <path id="line-2"
                d="M81.097 33.1194C80.3538 31.9552 78.8082 31.6136 77.6449 32.3563C76.4816 33.0991 76.141 34.6449 76.8843 35.8091L81.097 33.1194ZM76.8843 35.8091C81.2317 42.6189 82.8624 51.1412 80.7187 59.5973L85.5646 60.8294C88.0609 50.9822 86.1578 41.0464 81.097 33.1194L76.8843 35.8091ZM80.7187 59.5973C78.3712 68.8577 72.0058 76.0277 63.9586 79.7119L66.0414 84.2593C75.4073 79.9714 82.8301 71.6158 85.5646 60.8294L80.7187 59.5973Z" />
            <path id="line-1"
                d="M47.6523 89.0798C49.0298 89.0189 50.0972 87.8499 50.0364 86.4687C49.9757 85.0875 48.8096 84.0171 47.4321 84.078L47.6523 89.0798ZM47.4321 84.078C39.3736 84.4341 31.2025 81.5757 24.9831 75.4794L21.4926 79.0594C28.7402 86.1635 38.2718 89.4943 47.6523 89.0798L47.4321 84.078ZM24.9831 75.4794C18.1721 68.8033 15.1785 59.6906 16.0375 50.8642L11.0677 50.3777C10.0681 60.6493 13.5537 71.2778 21.4926 79.0594L24.9831 75.4794Z" />
            <circle id="ball-3" cx="53" cy="15" r="15" />
            <circle id="ball-1" cx="15" cy="63" r="15" />
            <circle id="ball-2" cx="76" cy="74" r="15" />
        </g>
    </svg>
</template>


<script setup>

const { animate, size } = defineProps(['animate', 'size']);

</script>

<style scoped>
#LogoFrame {
    display: flex;
    align-items: center;
    justify-content: center;
}

.animate-logo {
    transform-origin: center;
    animation: rotate 1.5s ease infinite;
}

@keyframes rotate {
    0% {
        animation-timing-function: ease-out;
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        animation-timing-function: ease-in;
        transform: rotate(360deg);
    }
}
</style>