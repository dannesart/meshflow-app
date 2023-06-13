import { defineStore } from "pinia";
import axios from "axios";
import { Task } from "~~/models/tasks";
import { useRuntimeConfig } from "#app";

type State = {
  allTasks: Task[];
  task: Task | null;
  isEditing: boolean;
  errors: string[];
};

export const useTasksStore = defineStore("TasksStore", {
  state: () =>
    <State>{
      isEditing: false,
      allTasks: [],
      task: null,
      errors: [],
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
    updateTask(task: Task, patch: { [key: string]: any }) {
      const idx = this.taskByIdx(task.id);
      const update = { ...task, ...patch };
      this.allTasks[idx] = update;
    },
    setTasks(tasks: Task[]) {
      this.allTasks = tasks;
    },
    setCurrentTask(task: Task) {
      this.task = task;
    },
    async addTask(task: Task) {
      try {
        const config = useRuntimeConfig();
        const response = await axios.post(
          config.public.REDIRECT_URI + "/api/tasks",
          task
        );
        await this.fetchTasks();
      } catch (error) {
        //TODO: Handle error
      }
    },

    async fetchTasks() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/tasks"
        );
        if (response.data) {
          if (response.data.error) {
            this.errors = [response.data.error];
            return;
          }
          this.allTasks = response.data;
        }
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
