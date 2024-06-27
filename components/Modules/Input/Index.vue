<template>
  <div class="flex flex-col gap-3 relative">
    <UIHeadline size="label" v-if="type !== 'checkbox' && type !== 'switch'">
      <slot />
    </UIHeadline>

    <input
      v-if="
        type === 'text' ||
        type === 'number' ||
        type === 'email' ||
        type === 'date' ||
        type === 'password'
      "
      :required="required"
      :value="value"
      @input="updateValue($event)"
      :type="type || 'text'"
      :disabled="disabled"
      :minlength="min"
      :maxlength="max"
      class="py-3 px-5 border dark:border-primary-700 rounded-lg shadow-sm disabled:shadow-none disabled:cursor-not-allowed bg-white dark:bg-primary-950 dark:text-primary-800 disabled:bg-slate-100"
      :class="{ 'hover:shadow-lg': !disabled }"
      :name="name"
      :placeholder="exampleValue(type)"
    />

    <UIEditor
      v-if="type === 'richText'"
      :value="value"
      @value-update="updateValue($event)"
    />

    <!-- Tag modal -->
    <div class="absolute bottom-full mb-10 p-4" v-if="isTagging">
      <ModulesInput
        :name="name"
        type="text"
        @value-update="setTaggingValue($event)"
      ></ModulesInput>
      <UIButton @click="doneTagging()">Done</UIButton>
    </div>
    <textarea
      :name="name"
      ref="textAreaRef"
      :value="value"
      v-if="type === 'text-lg'"
      @keyup="checkForTagging($event)"
      @input="updateValue($event)"
      :maxlength="max"
      :minlength="min"
      class="py-3 px-5 border rounded-lg shadow-sm hover:shadow-lg"
      placeholder="ex. It was a warm summer day.."
    ></textarea>

    <div class="flex wrap gap-3" v-if="type === 'color'">
      <div
        @click="updateColor('white')"
        :name="name"
        class="w-10 h-10 cursor-pointer rounded-full bg-white shadow-lg hover:shadow-xl"
      ></div>
    </div>

    <div v-if="type === 'media'">[[Media select]]</div>

    <div v-if="type === 'range'">
      <input
        type="range"
        :name="name"
        :min="0"
        :max="values.length"
        step="1"
        :list="'markers-' + id"
        class="w-full"
        @change="updateSlider($event)"
      />
      <datalist :id="'markers-' + id">
        <option v-for="value of values" :value="value" :label="value"></option>
      </datalist>
    </div>

    <UICheckBox
      v-if="type === 'checkbox' || type === 'boolean'"
      @update="updateCheckbox(!value)"
      :value="value"
      :name="name"
      :id="id"
    >
      <slot />
    </UICheckBox>

    <div
      v-if="type === 'switch'"
      :name="name"
      class="w-14 h-8 cursor-pointer rounded-full transition-all relative p-1"
      :class="{ 'bg-gray-200': !value, 'bg-emerald-200': value }"
    >
      <div
        class="absolute h-6 w-6 top-1 rounded-full transition-all"
        :class="{
          'bg-gray-600 left-1': !value,
          'bg-emerald-600  left-full -translate-x-full -ml-1': value,
        }"
      ></div>
    </div>

    <div v-if="type === 'radio'" class="flex gap-2 flex-wrap" :name="name">
      <div
        v-for="v of values"
        :class="{ 'bg-primary-400 text-white': v === value }"
        class="px-3 py-1 rounded-lg bg-slate-100 justify-center items-center flex cursor-pointer"
        @click="updateRadio(v)"
      >
        {{ v }}
      </div>
    </div>

    <div
      v-if="type === 'multi-select'"
      :name="name"
      tabindex="0"
      @focusin="isToggled = true"
      @focusout="handleFocusOut"
      ref="selectRef"
      class="py-3 px-5 border cursor-pointer rounded-lg bg-white dark:bg-primary-800 shadow-sm hover:shadow-lg relative focus-within:border-b-transparent focus-within:rounded-b-none"
    >
      <div class="flex justify-between gap-3 capitalize">
        {{ (valueRef || []).join(", ") || "Select options" }}
        <UIIcons :name="isToggled ? 'chevron-up' : 'chevron-down'"> </UIIcons>
      </div>
      <div
        v-if="isToggled"
        class="flex flex-col gap-2 pt-1 absolute top-full m-[-1px] left-0 right-0 bg-white py-3 px-5 border border-t-0 rounded-b-lg shadow-sm hover:shadow-lg z-20"
      >
        <div
          v-for="option in values"
          @click="(e) => selectMultiOption(e, option)"
          class="cursor-pointer py-1 hover:font-bold capitalize flex gap-2"
        >
          <ModulesInput
            type="checkbox"
            :value="(valueRef || []).indexOf(option) > -1"
          >
            {{ option }}
          </ModulesInput>
        </div>
      </div>
    </div>

    <div
      class="py-3 px-5 border cursor-pointer rounded-lg bg-white dark:bg-primary-800 shadow-sm hover:shadow-lg relative focus-within:border-b-transparent focus-within:rounded-b-none"
      v-if="type === 'select'"
      :name="name"
      tabindex="0"
      @focusin="isToggled = true"
      @focusout="handleFocusOut"
      ref="selectRef"
    >
      <div class="flex justify-between gap-3 capitalize">
        {{ valueRef }}
        <UIIcons :name="isToggled ? 'chevron-up' : 'chevron-down'"> </UIIcons>
      </div>
      <div
        v-if="isToggled"
        class="pt-1 absolute top-full m-[-1px] left-0 right-0 bg-white dark:bg-primary-800 py-3 px-5 border border-t-0 rounded-b-lg shadow-sm hover:shadow-lg z-20"
      >
        <div
          v-for="option in values"
          @click="(e) => selectOption(e, option)"
          class="cursor-pointer py-1 hover:font-bold capitalize"
        >
          {{ option }}
        </div>
      </div>
    </div>

    <div class="absolute -bottom-6 text-gray-400 text-sm right-0" v-if="max">
      {{ value?.length || 0 }} / {{ max }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { type, value, values, required, name, disabled, max, min } = defineProps(
  ["type", "value", "values", "required", "name", "disabled", "max", "min"]
);

const eventEmit = defineEmits(["valueUpdate"]);
const valueRef = ref(value);
const selectRef = ref();
const isToggled = ref(false);
const isTagging = ref(false);
const id = Math.floor(Math.random() * 10000) + "";
const textAreaRef = ref();
const textAreaIdx = ref(-1);

const handleFocusOut = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  isToggled.value = false;
};

const updateCheckbox = (checked: boolean) => {
  eventEmit("valueUpdate", checked);
};

const updateSlider = (event: Event) => {
  const valueIdxString = (event.target as { value?: string }).value;
  const valueIdx = Number(valueIdxString);
  const value = (values as string[])[valueIdx || 0];
  eventEmit("valueUpdate", value);
};

const updateRadio = (value: string) => {
  eventEmit("valueUpdate", value);
};

const updateColor = (value: string) => {
  eventEmit("valueUpdate", value);
};

const updateValue = (event: Event) => {
  const newValue = (event.target as { value?: string }).value;
  eventEmit("valueUpdate", newValue);
};

const exampleValue = (type: string) => {
  switch (type) {
    case "text":
      return "ex. Sunny weather or Benjamin";
    case "number":
      return "ex. 1, 12 or 100";
    case "email":
      return "ex. john.doe@work.com";
    case "Date":
      return "ex. July 12th";
    default:
      return "ex. Hello world";
  }
};

const selectOption = (e: Event, option: string) => {
  e.preventDefault();
  e.stopPropagation();
  valueRef.value = option;
  eventEmit("valueUpdate", option);
  isToggled.value = false;
  if (selectRef.value) {
    console.log("Trigger blur");
    selectRef.value.blur();
  }
};

const selectMultiOption = (e: Event, option: string) => {
  e.preventDefault();
  e.stopPropagation();
  if (!valueRef.value) valueRef.value = [];
  if (valueRef.value.indexOf(option) > -1) {
    const idx = valueRef.value.indexOf(option);
    valueRef.value.splice(idx, 1);
  } else {
    valueRef.value.push(option);
  }
  eventEmit("valueUpdate", valueRef.value);
};

type KeyEvent = { key: string } & Event;
const checkForTagging = ($event: KeyEvent) => {
  const isAt = $event.key === "@";

  if (isAt) {
    const index = textAreaRef.value.selectionStart;
    isTagging.value = true;
    textAreaIdx.value = index;
  }
};
const doneTagging = () => {
  isTagging.value = false;
};
const setTaggingValue = (tagValue: string) => {
  const splitValue = valueRef.value.split(textAreaIdx.value);
  const newSplitValue = [splitValue[0], tagValue, splitValue[1]];
  const newValue = newSplitValue.join("");
  valueRef.value = newValue;
};
</script>

<script lang="ts">
export default defineComponent({
  name: "Input",
});
</script>
