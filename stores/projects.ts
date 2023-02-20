import axios from "axios";
import { defineStore } from "pinia";
import { TProject } from "~~/models/project";
import { CONFIG } from "~~/server/api/config";

type TProjectsState = {
  _activeProjectId: string | null;
  _projects: TProject[];
};

export const useProjectStore = defineStore("ProjectsStore", {
  state: () => <TProjectsState>{ _activeProjectId: null, _projects: [] },
  getters: {
    activeId: (state) => state._activeProjectId,
    projects: (state) => state._projects,
  },
  actions: {
    setActive(id: string) {
      this._activeProjectId = id;
    },
    async fetchProjects() {
      try {
        const response = await axios.get(CONFIG.path + "/api/projects");
        this._projects = response.data;
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
