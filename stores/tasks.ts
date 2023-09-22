import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { Task } from "~~/models/tasks";
import { useRuntimeConfig } from "#app";
import { useProjectStore } from "./projects";

type State = {
  allTasks: Task[];
  task: Task | null;
  isEditing: boolean;
  errors: string[];
  loading: boolean;
};

export const useTasksStore = defineStore("TasksStore", {
  state: () =>
    <State>{
      isEditing: false,
      loading: true,
      allTasks: [],
      task: null,
      errors: [],
    },
  getters: {
    editing: (state) => state.isEditing,
    isLoading: (state) => state.loading,
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
    async deleteTask(task: Task) {
      try {
        this.loading = true;
        const config = useRuntimeConfig();
        const response = await axios.delete(
          config.public.REDIRECT_URI + "/api/tasks/" + task.id
        );
        this.fetchTasks();
        this.loading = false;

        return true;
      } catch (error) {
        this.loading = false;
        return false;
      }
    },
    async updateTask(task: Task, patch: { [key: string]: any }) {
      try {
        this.loading = true;
        const config = useRuntimeConfig();

        const response = await axios.patch(
          config.public.REDIRECT_URI + "/api/tasks/" + task.id,
          task
        );
        this.loading = false;

        return true;
      } catch (error) {
        this.loading = false;

        return false;
      }
    },
    setTasks(tasks: Task[]) {
      this.allTasks = tasks;
    },
    setCurrentTask(task: Task) {
      this.task = task;
    },
    async addTask(task: Task) {
      try {
        this.loading = true;
        const config = useRuntimeConfig();
        const response = await axios.post(
          config.public.REDIRECT_URI + "/api/tasks",
          task
        );
        this.loading = false;
        this.loading = false;
        await this.fetchTasks();
        return true;
      } catch (error) {
        //TODO: Handle error
        this.loading = false;
        return false;
      }
    },
    async fetchTasks() {
      const { activeId } = storeToRefs(useProjectStore());
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/tasks",
          {
            params: {
              projectId: activeId.value,
            },
          }
        );
        this.loading = false;
        if (response.data) {
          if (response.data.error) {
            this.errors = [response.data.error];
            return;
          }
          this.allTasks = response.data;
        }
      } catch (error) {
        this.loading = false;
        //TODO: Handle error
      }
    },
  },
});
