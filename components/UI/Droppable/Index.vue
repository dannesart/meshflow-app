<template>

    <div class="p-6 bg-slate-100 rounded-xl" @drop="dropEvent($event)" @dragenter="dragEnter($event)"
        @dragover="dragOver($event)" @dragleave="dragLeave($event)" @dragend="dragEnd($event)"
        @dragexit="dragExit($event)" :class="{ 'pt-20' : hoverState }">

        <slot />

    </div>

</template>

<script setup lang="ts">

type TListItem = {
    id: string;
    status: number;
}


let hoverState = ref(false);

const { list, status } = defineProps(['list', 'status']);
const updateList = defineEmits(['updateList'])


const dragOver = (event: DragEvent) => {
    event.preventDefault();


    hoverState.value = true;
}

const dragExit = (event: DragEvent) => {
    event.preventDefault();
    hoverState.value = false;
}

const dragLeave = (event: DragEvent) => {
    event.preventDefault();

    if ((event.currentTarget as any).contains(event.relatedTarget)) {
        return;
    }
    hoverState.value = false;
}

const dragEnd = (event: DragEvent) => {
    event.preventDefault();
    hoverState.value = false;
}

const dragEnter = (event: DragEvent) => {
    event.preventDefault();
    hoverState.value = true;
}


const dropEvent = (event: DragEvent) => {
    hoverState.value = false;
    const itemId = event.dataTransfer?.getData('itemId');
    const item = (list as TListItem[]).find((item) => item.id === itemId);

    if (item) {
        item.status = status;
    }
}

</script>