<template>
  <NuxtLayout>
    <UIHeadline size="h1"> Dashboard </UIHeadline>
    <div
      class="flex gap-5 overflow-x-scroll md:overflow-x-visible flex-row scroll-smooth snap-x snap-mandatory min-h-[8rem]"
    >
      <ModulesStat
        label="Active tasks"
        :number="amountActiveTasks"
      ></ModulesStat>
      <ModulesStat label="Pages" :number="pages.length"></ModulesStat>
      <ModulesStat label="Users" :number="usersAmount"></ModulesStat>
      <ModulesStat label="Rules" :number="rules"></ModulesStat>
    </div>

    <div class="flex flex-col gap-5 md:flex-row">
      <div class="flex flex-col justify-between h-full gap-4 md:w-1/2">
        <div class="flex flex-col gap-4">
          <UIHeadline size="h3"> Latest sign in </UIHeadline>
          <div class="flex gap-5">
            <div
              v-if="usersStore.isLoading"
              class="w-full flex items-center justify-center bg-gray-100 rounded-lg p-6"
            >
              <UILoader></UILoader>
            </div>

            <ul
              v-else-if="usersAmount"
              class="flex w-full gap-5 overflow-x-scroll md:overflow-x-visible scroll-smooth snap-x snap-mandatory"
            >
              <li
                v-for="(user, userId) in allUsers"
                :key="userId"
                class="snap-center"
              >
                <ModulesUserCard
                  :user="user"
                  :userId="userId"
                ></ModulesUserCard>
              </li>
            </ul>
            <UIEmpty v-else> No activity yet </UIEmpty>
          </div>
        </div>
        <div class="flex items-end justify-end">
          <NuxtLink to="/"> View latest activity </NuxtLink>
        </div>
      </div>
      <div class="flex flex-col justify-between h-full gap-4 md:w-1/2">
        <div class="flex flex-col gap-4">
          <div class="flex justify-between">
            <UIHeadline size="h3"> Latests tasks </UIHeadline>
            <ModulesAdd
              type="task"
              asLink="true"
              label="+ Create new task"
              @onAdd="onAdd"
              @onCancel="onCancel"
            >
            </ModulesAdd>
          </div>
          <div class="flex gap-5">
            <div
              v-if="tasksStore.isLoading"
              class="w-full flex items-center justify-center bg-gray-100 rounded-lg p-6"
            >
              <UILoader></UILoader>
            </div>

            <ul
              v-else-if="latest.length"
              class="flex flex-col w-full gap-4 p-5 bg-white rounded-lg shadow-lg"
            >
              <li
                v-for="task in latest"
                :key="task.id"
                class="pb-5 border-b last:border-b-0 last:pb-0"
              >
                <ModulesExtendedLink
                  :label="task.title"
                  :tags="task.tags"
                  :route="'/board/' + task.id"
                >
                  <div
                    class="flex items-center gap-3 mb-2 text-sm text-gray-400"
                  >
                    Added by <UIUserTag :id="task.createdBy"></UIUserTag>
                  </div>
                </ModulesExtendedLink>
              </li>
            </ul>
            <UIEmpty v-else>
              No tasks yet, create one
              <ModulesAdd
                @on-add="onAdd"
                type="task"
                button-style="system"
                label="Add task"
              >
              </ModulesAdd>
            </UIEmpty>
          </div>
        </div>
        <div class="flex items-end justify-end">
          <NuxtLink to="/board"> View all tasks </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useTasksStore } from "~~/stores/tasks";
import { usePagesStore } from "~~/stores/pages";
import { useUsersStore } from "~~/stores/users";
import { useCommentsStore } from "~~/stores/comments";
import { Task } from "~~/models/tasks";
import { useNotificationStore } from "~~/stores/notifications";
import { storeToRefs } from "pinia";

const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const { comments } = storeToRefs(useCommentsStore());
const tasksStore = useTasksStore();
const { addTask } = tasksStore;
const { latest, allTasks, amountActiveTasks } = storeToRefs(tasksStore);
const { pages } = storeToRefs(usePagesStore());
const usersStore = useUsersStore();
const { usersAmount, allUsers } = storeToRefs(usersStore);

const rules = 0;

const onAdd = async (task: Task) => {
  if (await addTask(task)) {
    setNotification(
      "Task added",
      "The task was successfully added!",
      "success"
    );
    useRouter().push("/board");
  } else {
    setNotification("Task not added", "The task could not be added!", "fail");
  }
};

const onCancel = () => {};
</script>
