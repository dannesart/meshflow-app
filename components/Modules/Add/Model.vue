<template>
  <UIForm :class="'flex flex-col gap-6'" name="new-model-form">
    <ModulesInput
      type="text"
      :max="50"
      :value="newModelForm.name"
      @valueUpdate="($event) => valueChange($event, 'name')"
    >
      Name
    </ModulesInput>

    <ModulesInput
      type="text-lg"
      :max="100"
      :value="newModelForm.description"
      @valueUpdate="($event) => valueChange($event, 'description')"
    >
      <label>
        Description <span class="text-sm text-gray-400">Optional</span>
      </label>
    </ModulesInput>

    <div
      name="new-model-error"
      class="flex gap-4 bg-rose-50 p-4 rounded-lg mt-6"
      v-for="error in errors"
    >
      <span class="font-bold capitalize">
        {{ error.path.join("/") }}
      </span>
      <span>
        {{ error.message }}
      </span>
    </div>
  </UIForm>
</template>

<script setup lang="ts">
import type { Model } from "~~/models/model";
import { ModelSchema } from "~~/models/model";

const { serviceType } = defineProps(["serviceType"]);

const events = defineEmits(["valueUpdate", "onValid", "onError"]);
const errors = ref();

const newModelForm = ref({
  name: "",
  description: "",
  fields: [],
  serviceType,
});

const valueChange = (event: string, key: string) => {
  (newModelForm as any).value[key] = event;
  events("valueUpdate", newModelForm);
  validate(newModelForm);
};

const validate = async (newModelForm: any) => {
  const validated = await ModelSchema.partial({
    created: true,
    createdBy: true,
    updated: true,
    updatedBy: true,
    projectId: true,
    id: true,
  }).safeParse(newModelForm.value);

  if (!validated.success) {
    errors.value = [...validated.error.issues];
    events("onError", validated.error);
  } else {
    errors.value = [];
    events("onValid", validated.data);
  }
};
</script>
