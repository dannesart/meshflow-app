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
    <TransitionGroup
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform scale-50 opacity-0"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="transform scale-50 opacity-0"
    >
      <div
        class="px-4 py-4 rounded-lg bg-white flex gap-3 items-center shadow-lg hover:shadow-xl cursor-pointer"
        v-for="(todo, index) in todos"
        :key="index"
      >
        <ModulesInput
          type="checkbox"
          :value="todo.done"
          @click="setToDone(todo, index)"
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
    </TransitionGroup>
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
  (todos.value as Array<TTodo>).push({
    title: "Todo " + (todos.value.length + 1),
    done: false,
  });
  emits("onAdd", todos.value);
};

const setToDone = (todo: TTodo, index: number) => {
  todo.done = !todo.done;
  emits("onDone", todo, todos.value);
};
</script>
