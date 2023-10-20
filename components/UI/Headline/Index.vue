<template>
  <component
    :is="size"
    v-bind="$attrs"
    :class="cssClasses[size]"
    @click="editField"
    v-if="!isEditing"
  >
    <slot />
  </component>
  <div
    v-else
    class="relative z-50 flex-none w-auto"
    tabindex="0"
    ref="fieldContainerRef"
  >
    <input
      type="text"
      ref="fieldRef"
      :class="cssClasses[size]"
      :value="valueRef"
      @keyup.enter="acceptEdit"
      @blur="acceptEdit"
      @input="valueRef = $event.target?.value"
    />
  </div>
</template>

<script setup lang="ts">
const {
  size,
  editable,
  value,
}: { size?: string; editable?: boolean; value?: string } = defineProps([
  "size",
  "editable",
  "value",
]);
const emits = defineEmits(["valueChange"]);
const valueRef = ref(value);
const inFocus = ref(false);
const fieldRef = ref();
const fieldContainerRef = ref();
const isEditing = ref(false);
const editField = (e: Event) => {
  if (editable) {
    isEditing.value = true;
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      fieldRef.value.focus();
    });
  }
};
const stopEditField = ($event: Event) => {
  if ($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
  if (editable) {
    isEditing.value = false;
    if (valueRef.value !== value) valueRef.value = value;
  }
};

const acceptEdit = (event: Event) => {
  event.stopPropagation();
  event.preventDefault();
  emits("valueChange", valueRef.value);
  isEditing.value = false;
};
const denyEdit = ($event: Event) => {
  stopEditField($event);
};

const editableCssClasses =
  "hover:bg-sky-100 cursor-text p-0 appearance-none outline-none bg-transparent";
const cssClasses: { [key: string]: string } = {
  h1: `text-5xl leading-10 font-bold text-sky-900 first-letter:capitalize ${
    editable ? editableCssClasses : ""
  }`,
  h2: `text-slate-500 text-2xl first-letter:capitalize ${
    editable ? editableCssClasses : ""
  }`,
  h3: `text-slate-600 text-xl font-bold mb-4 first-letter:capitalize ${
    editable ? editableCssClasses : ""
  }`,
  h4: `text-slate-600 text-lg font-semibold first-letter:capitalize ${
    editable ? editableCssClasses : ""
  }`,
  h5: `text-slate-600 font-semibold first-letter:capitalize ${
    editable ? editableCssClasses : ""
  }`,
  label: `text-slate-600 first-letter:capitalize ${
    editable ? editableCssClasses : ""
  }`,
};
</script>

<script lang="ts">
export default defineComponent({
  name: "Headline",
});
</script>
