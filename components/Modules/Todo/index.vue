<template>
    <div class="flex flex-col gap-3">

        <UIHeadline size="h4">
            Todos
        </UIHeadline>
        <div class="px-4 py-4 rounded-lg bg-white flex gap-3 items-center shadow-lg hover:shadow-xl cursor-pointer"
            @click="setToDone(todo)" v-for="todo in todos">
            <UIInput type="checkbox" :value="todo.done"></UIInput>
            {{ todo?.title }}

        </div>
        <p class="bg-white px-4 py-2 rounded-lg" v-if="!todos.length">No todo's</p>

        <footer class="flex justify-end">
            <UIButton type="system" size="small" @click="add($event)">Add new todo</UIButton>
        </footer>

    </div>
</template>

<script setup lang=ts>



type TTodo = {
    title: string;
    done: boolean;
}

const todos = ref<TTodo[]>([]);

const add = ($event: Event) => {
    $event.preventDefault();
    (todos.value as Array<TTodo>).push({
        title: 'Todo ' + (todos.value.length + 1),
        done: false
    })
}

const setToDone = (todo: TTodo) => {
    todo.done = !todo.done
}

</script>