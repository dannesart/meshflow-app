import { defineStore } from "pinia";
import axios from "axios";
import { useRuntimeConfig } from "#app";
import { useProjectStore } from "./projects";
import { Project } from "~~/models/project";

type State = {
  token: string | null;
  loading: boolean;
  users: { [id: string]: any };
};

export const useUsersStore = defineStore("UsersStore", {
  state: () =>
    <State>{
      token: null,
      loading: true,
      users: {},
    },
  getters: {
    userById: (state) => {
      return (id: string) => {
        return state.users[id];
      };
    },
    userByEmail: (state) => {
      return (email: string) => {
        return state.users[email];
      };
    },
    isLoading: (state) => state.loading,
    usersAmount: (state) => {
      return Object.keys(state.users).length;
    },
    allUsers: (state) => state.users,
    usersToList: (state) =>
      Object.keys(state.users).map(
        (key) =>
          state.users[key].nickname ||
          state.users[key].name ||
          state.users[key].fullname
      ),
  },
  actions: {
    async getToken() {
      if (this.token) return this.token;
      try {
        const response: { data: { access_token: string; token_type: string } } =
          await axios.post("https://meshflow.eu.auth0.com/oauth/token", {
            client_id: "hxatYZ5ZU9wzNRplTMDf3NTKpR7Zzksc",
            client_secret:
              "dtEaosZMuW09biS1i0j_wfh0j53XoJ4scMnll6Azd1wpcErGxGuDddHPiOS-sknb",
            audience: "https://meshflow.eu.auth0.com/api/v2/",
            grant_type: "client_credentials",
          });
        if (response && response.data && response.data.access_token) {
          this.token = response.data.access_token;
          return this.token;
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserById(id: string) {
      try {
        const token = await this.getToken();

        var options = {
          method: "GET",
          url: "https://meshflow.eu.auth0.com/api/v2/users/" + id,
          headers: { authorization: `Bearer ${token}` },
        };
        try {
          const user = (await axios.request(options)) as any;

          this.users[user.data.user_id] = user.data;
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        //TODO: Handle error
      }
    },
    async fetchUserByEmail(email: string) {
      try {
        const token = await this.getToken();

        var options = {
          method: "GET",
          url: "https://meshflow.eu.auth0.com/api/v2/users-by-email",
          params: { email: email },
          headers: { authorization: `Bearer ${token}` },
        };
        try {
          const user = (await axios.request(options)) as any;
          this.users[user.user_id] = user;
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        //TODO: Handle error
      }
    },
    async fetchUserMap() {
      try {
        // FIX THIS. Get from api
        // const token = await this.getToken();
        this.loading = true;
        const projectStore = useProjectStore();
        const { activeId, getProject } = projectStore;
        const activeProject = getProject(activeId || "") as Project;
        // if (activeProject) {
        //   const userIds = activeProject.users;
        //   for (let i = 0; i < userIds.length; i++) {
        //     await this.fetchUserById(userIds[i]);
        //   }
        // }
        this.loading = false;

        // var options = {
        //   method: "GET",
        //   url: "https://meshflow.eu.auth0.com/api/v2/users",
        //   headers: { authorization: `Bearer ${token}` },
        // };
        // try {
        //   const response = await axios.request(options);
        //   response.data.map((user: any) => {
        //     this.users[user.user_id] = user;
        //   });
        // } catch (error) {
        //   console.log(error);
        // }
      } catch (error) {
        //TODO: Handle error
        this.loading = false;
      }
    },
  },
});
