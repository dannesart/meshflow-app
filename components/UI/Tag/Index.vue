<template>
  <div
    name="tag"
    class="inline-flex px-4 py-2 capitalize rounded-full w-max hover:shadow-xl"
    tabindex="0"
    @click="handleClick"
    :class="colors[color || 'default']"
  >
    <input
      v-if="isEditing"
      :value="newValue"
      @input="handleChange"
      @blur="handleBlur"
      ref="tagEdit"
      class="appearance-none border-0 bg-transparent w-auto outline-none max-w-[60px]"
    />
    <div v-else class="flex gap-3">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  color,
  canEdit,
  value,
}: { color?: string; canEdit?: boolean; value?: string } = defineProps([
  "color",
  "canEdit",
  "value",
]);
const event = defineEmits(["save"]);
const isEditing = ref(false);
const newValue = ref(value);
const tagEdit = ref();

const colors: { [key: string]: string } = {
  default: "bg-slate-200 text-slate-600 dark:bg-black/60 dark:text-indigo-200",
};

const handleClick = () => {
  if (!canEdit) return;
  isEditing.value = true;
  setTimeout(() => {
    tagEdit.value.focus();
  }, 10);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const _value = target.value;
  newValue.value = _value;
};

const handleBlur = () => {
  isEditing.value = false;
  event("save", newValue.value);
};
</script>
