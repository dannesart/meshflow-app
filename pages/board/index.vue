<template>
  <NuxtLayout name="list">
    <template #header> Board </template>

    <template #filters>
      <ModulesFilter @filterChange="filterChange" @sortChange="sortChange">
      </ModulesFilter>
    </template>
    <template #actions>
      <ModulesAdd
        type="task"
        :label="'Add task'"
        @onAdd="onAdd"
        @onCancel="onCancel"
      >
      </ModulesAdd>
    </template>

    <div
      class="flex flex-col pb-4 overflow-x-scroll md:gap-6 scroll-smooth snap-x md:flex-row"
    >
      <div
        v-for="status in TASK_STATUSES"
        :key="status"
        class="relative flex flex-col flex-none gap-3 w-96 snap-center"
      >
        <UIHeadline
          size="h3"
          :class="{
            capitalize: true,
          }"
        >
          {{ status }}
        </UIHeadline>

        <draggable
          :list="(tasksStore.tasks || []).filter((a) => a.status === status)"
          group="tasks"
          :component-data="{
            class: 'flex flex-col gap-4 h-full flex-1',
          }"
          item-key="id"
          @change="dragChange($event, status)"
          @end="dragEnd($event, status)"
        >
          <template #item="{ element: task }">
            <NuxtLink :to="'/board/' + task.id" class="md:max-w-xl">
              <ModulesCard
                :title="task.title"
                :tags="task.tags"
                :user="task.assignedTo"
                :badge="{
                  icon: '',
                  value: task.estimate,
                  theme: useColorByEstimate(task.estimate),
                }"
                :class="'mb-0'"
              ></ModulesCard>
            </NuxtLink>
          </template>
        </draggable>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { type Task, TASK_STATUSES } from "~~/models/tasks";
import { useTasksStore } from "~~/stores/tasks";
import { useNotificationStore } from "~~/stores/notifications";

const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const tasksStore = useTasksStore();
const { addTask, updateTask } = tasksStore;
const filters = ref({});
const sorts = ref({});

const dragChange = async (event: any, status: string) => {
  if (event.added) {
    event.added.element.status = status;
    await updateTask(event.added.element, {});
  }
};
const dragEnd = async (event: any, status: string) => {};
const filterChange = async (_filters: { [key: string]: any }) => {
  filters.value = { ...filters.value, ..._filters };
};
const sortChange = async (_sorts: { [key: string]: any }) => {
  sorts.value = { ...sorts.value, ..._sorts };
};
const onAdd = async (task: Task) => {
  if (await addTask(task)) {
    setNotification(
      "Task created",
      "Your task was successfully created",
      "success"
    );
  } else {
    setNotification(
      "Task not created",
      "Your task could not be created",
      "fail"
    );
  }
};
const onCancel = async () => {};
</script>
