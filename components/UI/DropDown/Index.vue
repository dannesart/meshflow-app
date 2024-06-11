<template>
  <div class="relative dropdown">
    <UIButton :type="styleType">
      <UIIcons :name="icon" v-if="icon"></UIIcons>
      <span class="hidden lg:block" v-if="label">{{ label }}</span>
    </UIButton>
    <div class="items" tabindex="0">
      <ul class="w-full" v-if="items && items.length">
        <li v-for="item in items">
          <UICheckBox
            @update="emits('update', item.id, !item.checked)"
            :value="item.checked"
            :name="item.label"
            :id="item.id"
          >
            {{ item.label }}
          </UICheckBox>
        </li>
      </ul>
      <slot v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  label?: string;
  icon?: string;
  styleType?: string;
  multiSelect?: boolean;
  items: Array<{
    label: string;
    id: string;
    checked?: boolean;
  }>;
};

const props = withDefaults(defineProps<Props>(), {
  label: "",
  icon: "",
  styleType: "system",
  multiSelect: false,
  items: [],
});

const emits = defineEmits(["update"]);
</script>

<style>
.dropdown:focus .items,
.dropdown:focus-within .items {
  display: block;
  animation: showing 0.5s;
}
.items {
  --translate-x: 0;
  --translate-y: 0.5rem;
  @apply left-0 top-full;
  @apply min-w-52;
  @apply p-4 absolute rounded-lg bg-white hidden origin-top z-50 shadow-lg;
  translate: var(--translate-x) var(--translate-y);
  animation: hiding 0.5s;
}
@keyframes showing {
  from {
    @apply opacity-0 hidden;
    translate: var(--translate-x) calc(var(--translate-y) * -1);
  }
  to {
    @apply opacity-100 block;
    translate: var(--translate-x) var(--translate-y);
  }
}
@keyframes hiding {
  from {
    @apply opacity-100 block;
    translate: var(--translate-x) var(--translate-y);
  }
  to {
    @apply opacity-0 hidden;
    translate: var(--translate-x) calc(var(--translate-y) * -1);
  }
}
</style>
