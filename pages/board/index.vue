<template>
  <NuxtLayout>
    <UIHeadline size="h1"> Board </UIHeadline>

    <div class="flex gap-6">
      <ModulesFilter @filterChange="filterChange" @sortChange="sortChange">
      </ModulesFilter>
      <div class="w-[1px] h-5/6 my-auto bg-slate-300"></div>
      <ModulesAdd
        type="task"
        :label="'Add task'"
        @onAdd="onAdd"
        @onCancel="onCancel"
      >
      </ModulesAdd>
    </div>

    <div
      class="flex md:gap-6 flex-col overflow-x-scroll pb-4 scroll-smooth snap-x md:flex-row"
    >
      <div
        class="w-96 flex flex-col gap-3 flex-none snap-center relative"
        v-for="status in TASK_STATUSES"
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
            <NuxtLink :to="'/board/' + task.id" class="flex-1 md:max-w-xl">
              <ModulesCard
                :title="task.title"
                :body="task.description || '-'"
                :tags="task.tags"
                :user="task.assignedTo"
                :class="'mb-0'"
                @favorite="handleFavorite($event, task.title)"
              ></ModulesCard>
            </NuxtLink>
          </template>
        </draggable>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
import { Task, TASK_STATUSES } from "~~/models/tasks";
import { useTasksStore } from "~~/stores/tasks";
import { useNotificationStore } from "~~/stores/notifications";

const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const tasksStore = useTasksStore();
const { addTask } = tasksStore;

export default {
  data() {
    return {
      filters: ref({}),
      sorts: ref({}),
      tasksStore,
      TASK_STATUSES,
    };
  },
  methods: {
    handleFavorite: (isFavorite: boolean, title: string) => {
      if (!isFavorite) {
        setNotification("Pelle has liked", title, "success");
      }
    },
    async dragChange(event: any, status: string) {
      if (event.added) {
        event.added.element.status = status;
        await this.tasksStore.updateTask(event.added.element, {});
      }
    },
    dragEnd(event: any, status: string) {
      //this.tasks[event.newIndex].status = status;
      //this.move(this.tasks, event.oldIndex, event.newIndex);
    },
    async filterChange(_filters: { [key: string]: any }) {
      this.filters = { ...this.filters, ..._filters };
    },
    async sortChange(_sorts: { [key: string]: any }) {
      this.sorts = { ...this.sorts, ..._sorts };
    },
    async onAdd(task: Task) {
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
    },
    onCancel: () => {},
  },
};
</script>
