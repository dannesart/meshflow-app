import axios from "axios";
import { defineStore } from "pinia";
import { Project } from "~~/models/project";
import { useRuntimeConfig } from "#app";

type License = {
  id: string;
  created: Date;
  valid: Date;
  tier: number;
  organisation?: string;
};

type TProjectsState = {
  _activeProjectId: string | null;
  _projects: Array<Project>;
  _license: License;
};

const ACTIVE_PROJET_ID_KEY = "ACTIVE_PROJET_ID";

export const useProjectStore = defineStore("ProjectsStore", {
  state: () =>
    <TProjectsState>{
      _activeProjectId: null,
      _projects: [],
      _license: {
        id: "0",
        created: new Date("2023-01-01"),
        valid: new Date("2070-01-01"),
        tier: 0,
      },
    },
  getters: {
    activeId: (state) => state._activeProjectId,
    projects: (state) => state._projects as Array<Project>,
    getProject: (state) => {
      return (id: string) => {
        if (state._projects && state._projects.length) {
          return state._projects.find((project) => project.id === id);
        }
        return {};
      };
    },
  },
  actions: {
    initProject(id: string) {},
    setActive(id: string) {
      this._activeProjectId = id;
      localStorage.setItem(ACTIVE_PROJET_ID_KEY, id);
      this.initProject(id);
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

        this._projects = [...this._projects, response.data];
        //await this.fetchProjects();
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
        if (response.data.error) throw new Error(response.data.error);
        this._projects = response.data as Array<Project>;

        if (!this._projects || !this._projects.length) {
          return useRouter().push("/projects/create");
        }
        this.setActive(
          localStorage.getItem(ACTIVE_PROJET_ID_KEY) || this._projects[0].id
        );
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
