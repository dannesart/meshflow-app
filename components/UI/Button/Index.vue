<template>
  <button
    class="relative flex items-center justify-center gap-3 overflow-hidden text-center hover:shadow-lg disabled:opacity-70"
    v-wave
    :class="[buttonClasses, buttonLoadingClass]"
    :name="name"
    :disabled="disabled"
  >
    <!-- <UILoader v-if="isLoading"></UILoader> -->
    <div class="loader" v-if="isLoading"></div>
    <slot />
  </button>
</template>

<script setup lang="ts">
const {
  type,
  name,
  size,
  isLoading,
  disabled,
}: {
  type?: string;
  name?: string;
  size?: string;
  isLoading?: boolean;
  disabled?: boolean;
} = defineProps(["type", "name", "size", "isLoading", "disabled"]);

type ClassType = {
  [key: string]: {
    normal: string;
    round?: string;
    inverted?: string;
    "round-small"?: string;
    "round-small-add"?: string;
    small?: string;
  };
};

const classes: ClassType = {
  nevermind: {
    normal: "border border-rose-500 text-rose-500 px-6 py-3 rounded-lg",
  },
  delete: {
    normal: "bg-transparent text-red-500 px-6 py-3 rounded-lg",
    inverted: "bg-red-500 text-white px-6 py-3 rounded-lg",
  },
  add: {
    normal: "bg-primary-900 text-white px-6 py-3 rounded-lg",
    small: "bg-primary-900 text-white px-4 py-2 rounded-lg",
  },
  love: {
    normal: "text-emerald-500 bg-emerald-200 px-6 py-3 rounded-lg",
    round: "bg-emerald-200 text-emerald-500 p-3 rounded-full",
    small: "bg-emerald-200 text-emerald-500 px-4 py-2 rounded-lg",
  },
  dead: {
    normal: "text-gray-500 bg-gray-200 px-6 py-3 rounded-lg",
    round: "text-gray-500 bg-gray-200 p-3 rounded-full",
  },
  back: {
    normal:
      "text-red-400 font-bold px-6 py-3 rounded-lg hover:shadow-none hover:text-red-300",
  },
  expand: {
    normal: "bg-fuchsia-500 text-white px-6 py-3 rounded-lg",
    inverted: "text-fuchsia-600 bg-white px-6 py-3 rounded-lg shadow-lg",
  },
  system: {
    normal:
      "bg-white dark:bg-primary-900 dark:text-primary-100 shadow-md text-slate-700 px-6 py-3 rounded-lg",
    round: "bg-slate-200 text-slate-700 px-3 py-6 rounded-full",
    small: "bg-slate-200 text-slate-700 px-4 py-2 rounded-lg",
  },
  transparent: {
    normal:
      "bg-transparent hover:bg-black/40 text-slate-700 dark:text-primary-100 px-6 py-3 rounded-lg",
    small:
      "bg-transparent hover:bg-black/40 text-slate-700 dark:text-primary-100 px-4 py-2 rounded-lg",
  },
  link: {
    normal: "text-primary-700 hover:shadow-none hover:text-primary-500",
  },
  icon: {
    normal: "bg-slate-200 text-slate-700 p-3 rounded-lg",
    round: "bg-slate-200 text-slate-700 p-3 rounded-full",
    "round-small": "bg-slate-200 text-slate-700 h-10 w-10 rounded-full",
    "round-small-add": "bg-primary-200 text-primary-700 h-10 w-10 rounded-full",
  },
};

const buttonClasses = computed(() => {
  return (classes as ClassType as any)[type || "system"]?.[size || "normal"];
});
const buttonLoadingClass = computed(() =>
  isLoading ? "text-transparent" : ""
);
</script>

<script lang="ts">
export default defineComponent({
  name: "Button",
});
</script>

<style>
.loader {
  border-radius: 50px;
  line-height: 100px;
  text-align: center;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff40;
  border-radius: 50px;
  opacity: 0;
}

.loader:before {
  transform: scale(1);
  animation: pulse 1.5s infinite linear;
}

.loader:after {
  animation: pulse 1.5s 0.75s infinite linear;
}

@keyframes pulse {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }

  33% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}
</style>
