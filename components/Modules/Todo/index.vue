<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <UIHeadline size="h4">
        Todos ({{ completedTodos.length }}/{{ todos.length }})
      </UIHeadline>
      <UIButton type="icon" size="round-small-add" @click="add($event)">
        <UIIcons name="add"></UIIcons>
      </UIButton>
    </div>
    <div
      class="px-4 py-4 rounded-lg bg-white flex gap-3 items-center shadow-lg hover:shadow-xl cursor-pointer"
      v-for="(todo, index) in todos"
    >
      <ModulesInput
        type="checkbox"
        :value="todo.done"
        @click="setToDone(todo)"
      ></ModulesInput>
      <UIHeadline
        size="p"
        editable="true"
        :class="'!flex-1'"
        :value="todo?.title"
        @value-change="(e) => (todo.title = e)"
      >
        {{ todo?.title }}
      </UIHeadline>

      <UIButton
        type="icon"
        size="round-small"
        :class="'ml-auto mr-0'"
        @click="(e) => remove(e, index)"
      >
        <UIIcons name="close"></UIIcons>
      </UIButton>
    </div>
    <UIEmpty v-if="!todos.length">No todo's</UIEmpty>
  </div>
</template>

<script setup lang="ts">
const { value } = defineProps(["value"]);
const emits = defineEmits(["onAdd", "onDone", "onRemove"]);

type TTodo = {
  title: string;
  done: boolean;
};

const todos = ref<TTodo[]>(value || []);

const completedTodos = computed(() => {
  return todos.value.filter((todo) => todo.done);
});

const remove = ($event: Event, index: number) => {
  $event.preventDefault();
  todos.value.splice(index, 1);
  emits("onRemove", todos.value);
};

const add = ($event: Event) => {
  $event.preventDefault();
  (todos.value as Array<TTodo>).unshift({
    title: "Todo " + (todos.value.length + 1),
    done: false,
  });
  emits("onAdd", todos.value);
};

const setToDone = (todo: TTodo) => {
  todo.done = !todo.done;
  emits("onDone", todo, todos.value);
};
</script>
