<template>
  <UIForm :class="'flex flex-col gap-4'" name="new-field-form">
    <div v-if="step === 1">
      <section
        class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
        name="model-types"
      >
        <div
          v-for="type in ModelTypes"
          class="flex w-full gap-6 p-5 shadow-xl cursor-pointer md:p-10 rounded-xl hover:shadow-2xl"
          name="model-type"
          @click="selectType(type)"
        >
          <div>
            <UIIcons :name="type.icon"></UIIcons>
          </div>
          <div class="flex flex-col">
            <UIHeadline :size="'h3'">
              {{ type.name }}
            </UIHeadline>
            <p class="text-sm text-gray-400">
              {{ type.description }}
            </p>
          </div>
        </div>
      </section>
    </div>
    <div v-if="step === 2">
      <div class="flex items-baseline gap-4 cursor-pointer" @click="step = 1">
        <UIButton type="icon" size="small">
          <UIIcons name="arrow-left"></UIIcons>
        </UIButton>
        <UIHeadline size="h3" name="selected-model-type">{{
          field.type.name
        }}</UIHeadline>
      </div>
      <div class="flex gap-6 mb-6">
        <ModulesInput
          :type="'text'"
          :value="field.name"
          @value-update="(e) => handleOnName(e)"
          class="w-96"
        >
          Name
        </ModulesInput>
        <ModulesInput
          :type="'text'"
          :value="field.id"
          :disabled="true"
          class="w-96"
        >
          Id
        </ModulesInput>
      </div>
      <div class="mb-4" v-if="field.type.name === ModelTypes[0].name">
        <ModulesInput
          type="checkbox"
          name="main-title"
          :value="field.isMain"
          @value-update="(e) => handleIsMain(e)"
        >
          This represent main title
        </ModulesInput>
      </div>
      <div class="mb-12">
        <ModulesInput
          type="checkbox"
          name="multiple-values"
          :value="field.allowMultiple"
          @value-update="(e) => handleAllowMultiple(e)"
        >
          Multiple value
        </ModulesInput>
      </div>
      <div class="mb-12" v-if="field.type.name === ModelTypes[4].name">
        <ModulesInput
          type="multi-select"
          name="reference-types"
          :value="field.validations.allowedReferences"
          :values="blockTypes"
          @value-update="(e) => handleMultipleSelect(e)"
        >
          Select allowed reference types
        </ModulesInput>
      </div>
      <UIHeadline size="h3">Validations</UIHeadline>
      <div class="flex flex-col gap-4">
        <ModulesInput
          type="checkbox"
          name="required"
          @value-update="(e) => handleIsRequired(e)"
        >
          Required
        </ModulesInput>

        <div
          class="flex flex-col gap-4"
          v-if="field.type.name === ModelTypes[0].name"
        >
          <ModulesInput
            type="checkbox"
            name="character-count"
            :value="field.validations.minMax.use"
            @value-update="(e) => handleUseMinMax(e)"
          >
            Limit character count
          </ModulesInput>
          <div
            class="flex items-end gap-4"
            v-if="field.validations.minMax.use"
            :class="{
              'bg-sky-50 p-6 rounded-xl': field.validations.minMax.use,
            }"
          >
            <ModulesInput
              type="number"
              :value="field.validations.minMax.min"
              @value-update="(e) => handleMinMax(e, true)"
            >
              Min
            </ModulesInput>
            <div class="pb-4">-</div>
            <ModulesInput
              type="number"
              :value="field.validations.minMax.max"
              @value-update="(e) => handleMinMax(e, false)"
            >
              Max
            </ModulesInput>
          </div>
        </div>
      </div>
    </div>
  </UIForm>
</template>

<script setup lang="ts">
import { ModelField, ModelFieldSchema, ModelType } from "~~/models/model";
import { ModelTypes } from "~~/constants/model";
import { storeToRefs } from "pinia";
import { useBlocksStore } from "~~/stores/blocks";
const events = defineEmits(["valueUpdate", "onValid", "onError"]);

const { blockModels } = storeToRefs(useBlocksStore());
const blockTypes = blockModels.value.map((blockModel) => blockModel.name);
const step = ref(1);

const field = ref<ModelField>({
  id: "",
  name: "",
  type: ModelTypes[0],
  isMain: false,
  allowMultiple: false,
  validations: {
    required: false,
    allowedReferences: [],
    minMax: {
      use: false,
      min: undefined,
      max: undefined,
    },
  },
});

const handleIsMain = (e) => {
  field.value.isMain = e;
  checkValid();
};
const handleAllowMultiple = (e) => {
  field.value.allowMultiple = e;
  checkValid();
};
const handleIsRequired = (e) => {
  field.value.validations.required = e;
  checkValid();
};

const handleUseMinMax = (e) => {
  field.value.validations.minMax.use = e;
  checkValid();
};

const handleMultipleSelect = (values: string[]) => {
  field.value.allowedReferences = values;
};

const handleMinMax = (value: number, isMin: boolean) => {
  if (isMin) {
    if ((field.value.validations.minMax.max || 0) < value) {
      field.value.validations.minMax.max = value < 0 ? 0 : value;
    }
    field.value.validations.minMax.min = value < 0 ? 0 : value;
  }
  if (!isMin) {
    if ((field.value.validations.minMax.min || 0) > value) {
      field.value.validations.minMax.min = value < 0 ? 0 : value;
    }
    field.value.validations.minMax.max = value < 0 ? 0 : value;
  }
};

const selectType = (type: ModelType) => {
  field.value.type = type;
  step.value = 2;
};

const handleOnName = (value: string) => {
  field.value.name = value;
  field.value.id = value
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
  checkValid();
};

const checkValid = () => {
  if (ModelFieldSchema.safeParse({ ...field.value })) {
    events("onValid", { ...field.value });
  } else {
    events("onError", { ...field.value });
  }
};
</script>

<script lang="ts">
export default defineComponent({
  name: "AddField",
});
</script>
