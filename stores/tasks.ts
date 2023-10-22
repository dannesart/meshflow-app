import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { Task } from "~~/models/tasks";
import { useRuntimeConfig } from "#app";
import { useProjectStore } from "./projects";
import { useUiStore } from "./ui";

type State = {
  allTasks: Task[];
  task: Task | null;
  isEditing: boolean;
  errors: string[];
  loading: boolean;
};
const taskActiveStatuses = ["todo", "doing", "reviewing", "testing"];
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
      const latest = [
        ...state.allTasks.filter(
          (task) => taskActiveStatuses.indexOf(task.status) > -1
        ),
      ];
      latest.length = latest.length > 2 ? 2 : latest.length;
      return latest;
    },
    taskByIdx: (state) => {
      return (taskId: string) =>
        state.allTasks.findIndex((task) => task.id === taskId);
    },
    getActiveTasks: (state) =>
      state.allTasks.filter(
        (task) => taskActiveStatuses.indexOf(task.status) > -1
      ),
    amountActiveTasks: (state) =>
      state.allTasks.filter(
        (task) => taskActiveStatuses.indexOf(task.status) > -1
      ).length,
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
      const uiStore = useUiStore();
      const { setLoading } = uiStore;
      try {
        setLoading(true);
        this.loading = true;
        const config = useRuntimeConfig();
        const response = await axios.post(
          config.public.REDIRECT_URI + "/api/tasks",
          task
        );
        await this.fetchTasks();
        this.loading = false;
        setLoading(false);
        return true;
      } catch (error) {
        //TODO: Handle error
        this.loading = false;
        setLoading(false);
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
