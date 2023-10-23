<template>
  <div class="flex flex-col gap-6">
    <div
      v-for="(invite, index) in inviteList"
      :key="index"
      class="flex items-end gap-3"
    >
      <ModulesInput
        type="email"
        :class="'flex-1'"
        :max="50"
        :value="invite.email"
        @valueUpdate="($event) => valueChange($event, index)"
      >
        Email
      </ModulesInput>
      <UIButton
        v-if="inviteList.length > 1"
        type="icon"
        size="round-small"
        :class="'flex-none'"
        @click="removeEmail(index)"
      >
        <UIIcons name="close"></UIIcons>
      </UIButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const events = defineEmits(["valueUpdate", "onValid", "onError"]);

const inviteList = ref([
  {
    email: "",
  },
]);

const addEmail = () => {
  inviteList.value.push({ email: "" });
};
const removeEmail = (index: number) => {
  inviteList.value.splice(index, 1);
};

const valueChange = (event: string, index: number) => {
  events("valueUpdate", inviteList);
};
</script>
