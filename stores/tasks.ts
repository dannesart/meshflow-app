import { defineStore } from "pinia";
import axios from "axios";
import { TTask } from "~~/models/task";
import { useRuntimeConfig } from "#app";

type TState = {
  allTasks: TTask[];
  task: TTask | null;
  isEditing: boolean;
};

export const useTasksStore = defineStore("TasksStore", {
  state: () =>
    <TState>{
      isEditing: false,
      allTasks: [],
      task: null,
    },
  getters: {
    editing: (state) => state.isEditing,
    currentTask: (state) => state.task,
    tasks: (state) => state.allTasks,
    latest: (state) => {
      const latest = [...state.allTasks];
      latest.length = latest.length > 5 ? 5 : latest.length;
      return latest;
    },
    taskByIdx: (state) => {
      return (taskId: string) =>
        state.allTasks.findIndex((task) => task.id === taskId);
    },
    taskById: (state) => {
      return (taskId: string) =>
        state.allTasks.find((task) => task.id === taskId);
    },
  },
  actions: {
    active(open: boolean) {
      this.isEditing = open;
    },
    updateTask(task: TTask, patch: { [key: string]: any }) {
      const idx = this.taskByIdx(task.id);
      const update = { ...task, ...patch };
      this.allTasks[idx] = update;
    },
    setTasks(tasks: TTask[]) {
      this.allTasks = tasks;
    },
    setCurrentTask(task: TTask) {
      this.task = task;
    },
    addTask(task: TTask) {
      this.allTasks.push(task);
    },

    async fetchTasks() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/tasks"
        );
        this.allTasks = response.data;
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
