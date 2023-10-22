<template>
  <NuxtLayout>
    <header class="flex gap-4">
      <UIHeadline
        size="h1"
        editable="true"
        :value="task?.title"
        @value-change="(value) => (task.title = value)"
      >
        {{ task?.title }}
      </UIHeadline>
      <ModulesFavorite
        @favorite="toggleFavorite"
        :class="'relative top-auto right-auto'"
      ></ModulesFavorite>
    </header>
    <div class="flex gap-6 flex-col md:flex-row" v-if="task">
      <UIForm :class="'flex-1 flex flex-col gap-6'">
        <ModulesInput
          type="text-lg"
          :max="300"
          :value="task.description"
          @value-update="(e) => (task.description = e)"
        >
          Description
        </ModulesInput>

        <ModulesTodo
          :value="task.subTasks"
          @on-add="(e) => (task.subTasks = e)"
        ></ModulesTodo>

        <div class="flex gap-6 mt-10">
          <UIButton type="add" @click="save" :is-loading="tasksStore.isLoading">
            Save
          </UIButton>
          <UIButton type="delete" @click="handleDelete"> Delete task </UIButton>
        </div>
      </UIForm>
      <aside
        class="md:w-96 flex flex-col gap-4 bg-white shadow-xl p-6 rounded-xl"
      >
        <ModulesInput
          type="user"
          :value="task.assignedTo"
          @value-update="(event) => updateAssigned(event)"
        >
          Assigned to
        </ModulesInput>

        <ModulesInput
          type="select"
          :values="TASK_STATUSES"
          :value="task.status"
          @value-update="(event) => updateStatus(event)"
        >
          Status</ModulesInput
        >

        <ModulesInput
          type="number"
          :value="task?.estimate"
          @value-update="(event) => updateEstimate(event)"
        >
          Estimate
        </ModulesInput>

        <div class="flex gap-3 flex-col">
          <label>Tags</label>
          <ModulesTagsList color="white" can-add="true" @add="addNewTag">
            <UITag
              v-for="(tag, index) in task?.tags"
              :can-edit="true"
              :value="tag"
              @save="updateTag($event, index)"
              class="group"
            >
              {{ tag }}
              <div
                class="hidden group-hover:block cursor-pointer hover:bg-black/30 rounded-full"
                @click="(e) => removeTag(e, index)"
              >
                <UIIcons name="close"></UIIcons>
              </div>
            </UITag>
          </ModulesTagsList>
        </div>

        <ModulesInput
          type="date"
          :value="
            task?.deadline
              ? new Date(task?.deadline).toISOString().slice(0, 10)
              : ''
          "
          @value-update="(event) => updateDeadline(event)"
        >
          Deadline
        </ModulesInput>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-3">
            Created by
            <div class="flex items-center gap-3">
              <UIUserTag :id="task.createdBy"></UIUserTag>
              <UIDate :date="task.created"></UIDate>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Task, TASK_STATUSES } from "~~/models/tasks";
import { useTasksStore } from "~~/stores/tasks";
import { useNotificationStore } from "~~/stores/notifications";

const tasksStore = useTasksStore();
const notificationStore = useNotificationStore();
const { setNotification } = notificationStore;
const { taskById, updateTask, deleteTask } = tasksStore;
const { id } = useRoute().params;
const task = ref<Task>(taskById(id as string) as Task);

const toggleFavorite = () => {
  if (task.value) {
    setNotification("Liked task", "Danne liked you task", "success");
    //task.favorite = !task?.favorite;
  }
};

const updateAssigned = (userId: string) => {
  task.value.assignedTo = userId;
};

const updateStatus = (status: any) => {
  //updateTask(task.value, { status });
  task.value.status = status;
};

const updateEstimate = (estimate: number) => {
  task.value.estimate = estimate;
};

const updateDeadline = (deadline: number) => {
  task.value.deadline = deadline;
};

const updateTag = (value: string, tagIdx: number) => {
  task.value.tags[tagIdx || 0] = value;
};

const addNewTag = () => {
  task.value.tags.push("tag " + task.value.tags.length);
};

const removeTag = (e: Event, idx: number) => {
  task.value.tags.splice(idx, 1);
};

const handleDelete = async (e: Event) => {
  e.preventDefault();
  if (confirm("Are you sure you want to delete this task?")) {
    if (await deleteTask(task.value)) {
      useRouter().push("/board");
      setNotification(
        "Task deleted",
        "The task was successfully deleted!",
        "success"
      );
    } else {
      setNotification(
        "Task not deleted",
        "The task could not be deleted!",
        "fail"
      );
    }
  }
};

const save = async (e: Event) => {
  e.preventDefault();
  if (await updateTask(task.value, { ...task.value })) {
    setNotification(
      "Task updated",
      "The task was successfully updated!",
      "success"
    );
  } else {
    setNotification(
      "Task not updated",
      "The task could not be updated!",
      "fail"
    );
  }
};
</script>
