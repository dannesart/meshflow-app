import { defineStore } from "pinia";
import axios from "axios";
import { TTask, TASK_STATUSES } from "~~/models/task";
import { CONFIG } from "~~/server/api/config";

const MOCK_TASK: TTask = {
  title: "Ge anna rätt roll",
  description: "Hon ska ha admin",
  status: TASK_STATUSES[0],
  id: "3244324",
  favorite: false,
  created: new Date(),
  createdBy: "danne",
};

export const useTasksStore = defineStore("TasksStore", {
  state: () =>
    <{ allTasks: TTask[]; task: TTask | null; isEditing: boolean }>{
      isEditing: false,
      allTasks: [MOCK_TASK],
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

    async fetchTasks() {
      try {
        const response = await axios.get(CONFIG.path + "/api/tasks");
        this.allTasks = response.data;
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
