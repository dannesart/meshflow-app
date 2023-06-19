import { defineStore } from "pinia";
import axios from "axios";
import { useRuntimeConfig } from "#app";

type State = {
  token: string | null;
  users: { [id: string]: any };
};

export const useUsersStore = defineStore("UsersStore", {
  state: () =>
    <State>{
      token: null,
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
          const response = await axios.request(options);
          this.users.push(response.data);
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
          const response = await axios.request(options);
          this.users = response.data;
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        //TODO: Handle error
      }
    },
    async fetchUserMap() {
      try {
        const token = await this.getToken();

        var options = {
          method: "GET",
          url: "https://meshflow.eu.auth0.com/api/v2/users",
          headers: { authorization: `Bearer ${token}` },
        };
        try {
          const response = await axios.request(options);
          response.data.map((user: any) => {
            this.users[user.user_id] = user;
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
