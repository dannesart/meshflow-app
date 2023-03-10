<template>



</template>

<script setup lang=ts>


type TTodo = {
    title: string;
    done: boolean;
}

const todos: Array<TTodo> = ref([]);

const add = () => {
    todos.push({
        title: '',
        done: false
    })
}

</script>