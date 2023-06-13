import { defineStore } from "pinia";
import axios from "axios";
import { useRuntimeConfig } from "#app";

type State = {
  users: {
    [email: string]: {
      name: string;
    };
  };
};

export const useUsersStore = defineStore("UsersStore", {
  state: () =>
    <State>{
      users: {
        "dannesart@live.com": {
          name: "danne",
        },
      },
    },
  getters: {
    userById: (state) => {
      return (email: string) => {
        return state.users[email];
      };
    },
  },
  actions: {
    async getUserByEmail(email: string) {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/user/" + email
        );
        if (response.data) {
          if (response.data.error) {
            this.errors = [response.data.error];
            return;
          }
          debugger;
        }
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
