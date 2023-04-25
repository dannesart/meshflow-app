import axios from "axios";
import { defineStore } from "pinia";
import { TProject } from "~~/models/project";
import { useRuntimeConfig } from "#app";

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
    async createProject(name: string) {
      try {
        const config = useRuntimeConfig();
        const response = await axios.post(
          config.public.REDIRECT_URI + "/api/projects",
          {
            name,
          }
        );

        await this.fetchProjects();
        //this._projects = response.data;
      } catch (error) {
        //TODO: Handle error
      }
    },
    async fetchProjects() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/projects"
        );
        this._projects = response.data;
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
